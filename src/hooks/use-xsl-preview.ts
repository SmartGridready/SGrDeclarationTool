import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { ValidationResult, getFirstFieldError } from "@/utils/validation-utils";

export function useXslPreview<T>({
  builder,
  data,
  errorMessage = ERROR_MESSAGES.FILE_EXPORT.NO_DATA,
  validator,
}: {
  builder: (data: T) => Promise<string>;
  data: T | null | undefined;
  errorMessage?: string;
  validator?: (data: T) => ValidationResult<T>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const resolveXslIncludes = useCallback(
    async (xslText: string, basePath = "/xsl/", visited = new Set<string>()): Promise<string> => {
      const parser = new DOMParser();
      const xslDoc = parser.parseFromString(xslText, "text/xml");

      // Check for parsing errors
      const parserError = xslDoc.querySelector("parsererror");
      if (parserError) {
        const errorText = parserError.textContent || "Invalid XSL";
        throw new Error(`XSL Parse Error: ${errorText}`);
      }

      const includes = Array.from(xslDoc.querySelectorAll("xsl\\:include, include"));
      await Promise.all(
        includes.map(async (include) => {
          const href = include.getAttribute("href");
          if (!href) return;

          const path = href.startsWith("/") ? href : `${basePath}${href}`.replace(/\/+/g, "/");

          // Prevent circular includes
          if (visited.has(path)) {
            include.remove();
            return;
          }
          visited.add(path);

          try {
            const response = await fetch(path);
            if (!response.ok) {
              throw new Error(`Failed to load XSL include: ${path} (${response.status} ${response.statusText})`);
            }

            const includedText = await response.text();
            const resolved = await resolveXslIncludes(
              includedText,
              path.substring(0, path.lastIndexOf("/") + 1),
              visited
            );

            const includedDoc = parser.parseFromString(resolved, "text/xml");
            const includeError = includedDoc.querySelector("parsererror");
            if (includeError) {
              const errorText = includeError.textContent || "Invalid XSL";
              throw new Error(`XSL Include Parse Error in ${path}: ${errorText}`);
            }

            const fragment = xslDoc.createDocumentFragment();
            Array.from(includedDoc.documentElement.childNodes).forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as Element;
                if (!["include", "import", "output"].includes(el.localName)) {
                  fragment.appendChild(xslDoc.importNode(node, true));
                }
              }
            });

            include.replaceWith(fragment);
          } catch (error) {
            throw new Error(error instanceof Error ? error.message : `Failed to process XSL include: ${path}`);
          }
        })
      );

      return new XMLSerializer().serializeToString(xslDoc);
    },
    []
  );

  const transformXmlWithXsl = useCallback(
    async (xmlString: string): Promise<string> => {
      const xslText = await resolveXslIncludes(await (await fetch("/xsl/SGr.xsl")).text(), "/xsl/");

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      const xslDoc = parser.parseFromString(xslText, "text/xml");

      // Check for XML parsing errors
      const xmlError = xmlDoc.querySelector("parsererror");
      if (xmlError) {
        const errorText = xmlError.textContent || "Invalid XML";
        throw new Error(`XML Parse Error: ${errorText}`);
      }

      // Check for XSL parsing errors
      const xslError = xslDoc.querySelector("parsererror");
      if (xslError) {
        const errorText = xslError.textContent || "Invalid XSL";
        throw new Error(`XSL Parse Error: ${errorText}`);
      }

      const processor = new XSLTProcessor();
      processor.importStylesheet(xslDoc);
      const result = processor.transformToDocument(xmlDoc);

      if (!result?.documentElement) {
        throw new Error("XSLT Transformation failed: No document element in result");
      }

      let html = new XMLSerializer().serializeToString(result.documentElement);

      // Decode HTML entities in script tags to ensure JavaScript functions work correctly
      // XSL uses XML entities (&lt; instead of <) which need to be decoded for JavaScript
      // Order matters: &amp; must be decoded first to avoid double-decoding
      html = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (match, scriptContent) => {
        const decoded = scriptContent
          .replace(/&amp;/g, "&") // Must be first to avoid double-decoding
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&#x27;/g, "'") // Hex entity for apostrophe
          .replace(/&#x2F;/g, "/"); // Hex entity for slash
        return match.replace(scriptContent, decoded);
      });

      // Decode HTML entities in event handler attributes (onclick, onchange, etc.)
      // Handle both single and double quotes
      html = html.replace(/(on\w+)=(["'])([^"']*)\2/gi, (match, eventName, quote, handler) => {
        const decoded = handler
          .replace(/&amp;/g, "&") // Must be first
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&#x27;/g, "'")
          .replace(/&#x2F;/g, "/");
        return `${eventName}=${quote}${decoded}${quote}`;
      });

      // Fix paths for iframe srcDoc context - convert absolute paths to full URLs
      // This is necessary because srcDoc creates an about:blank context where absolute paths don't work
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const fixPath = (path: string, prefix: string) => {
        // Already a full URL, keep it
        if (path.startsWith("http://") || path.startsWith("https://")) {
          return path;
        }
        // Absolute path starting with / - convert to full URL for iframe srcDoc
        if (path.startsWith("/")) {
          return `${origin}${path}`;
        }
        // Relative path (e.g., "ressources/fp_product_to_ems.svg") - add prefix and convert to full URL
        return `${origin}${prefix}${path}`;
      };

      // Fix CSS file paths
      html = html.replace(/href=["']([^"']*\.css)["']/gi, (_, p) => `href="${fixPath(p, "/xsl/")}"`);

      // Fix image and resource paths in src attributes
      html = html.replace(/src=["']([^"']*)["']/gi, (_, p) => {
        // Skip data URIs and already absolute URLs
        if (p.startsWith("data:") || p.startsWith("http://") || p.startsWith("https://")) {
          return `src="${p}"`;
        }
        return `src="${fixPath(p, "/xsl/")}"`;
      });

      // Fix CSS url() paths - handle both quoted and unquoted URLs
      html = html.replace(/url\(["']?([^"')]+)["']?\)/gi, (match, p) => {
        const trimmed = p.trim();
        // Skip data URIs and already absolute URLs
        if (trimmed.startsWith("data:") || trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
          return match;
        }
        const fixed = fixPath(trimmed, "/xsl/");
        // Preserve original quote style if present
        const hasQuotes = match.includes('"') || match.includes("'");
        return hasQuotes ? match.replace(trimmed, fixed) : `url("${fixed}")`;
      });

      return html;
    },
    [resolveXslIncludes]
  );

  const generatePreview = useCallback(async (): Promise<string | null> => {
    if (!data) {
      toast.error("Preview failed", { description: errorMessage });
      return null;
    }

    if (validator) {
      const validation = validator(data);
      if (!validation.success) {
        const firstFieldError = getFirstFieldError(validation);
        const errorMessageText = firstFieldError || "Please fix validation errors before previewing.";

        toast.error("Preview failed", {
          description: errorMessageText,
          duration: 5000,
        });
        return null;
      }
    }

    setIsLoading(true);
    try {
      const html = await transformXmlWithXsl(await builder(data));
      setPreviewHtml(html);
      return html;
    } catch (error) {
      toast.error("Preview failed", {
        description: error instanceof Error ? error.message : "Failed to generate preview",
        duration: 5000,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [builder, data, errorMessage, validator, transformXmlWithXsl]);

  return { generatePreview, previewHtml, isLoading, setPreviewHtml };
}
