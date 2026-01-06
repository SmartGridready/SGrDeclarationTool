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

      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const baseUrl = `${origin}/xsl/`;

      /**
       * Fallback function to prepare HTML string for iframe when DOM parsing fails
       * This handles edge cases where the XSLT output might not be valid HTML
       */
      const prepareHtmlForIframe = (htmlString: string): string => {
        // Wrap in proper HTML structure if needed
        if (!htmlString.includes("<html")) {
          htmlString = `<!DOCTYPE html><html><head><base href="${baseUrl}"></head><body>${htmlString}</body></html>`;
        } else if (!htmlString.includes("<base")) {
          // Inject base tag into existing HTML
          htmlString = htmlString.replace(/(<head[^>]*>)/i, `$1<base href="${baseUrl}">`);
        }

        // Fix absolute paths (base tag handles relative paths)
        htmlString = htmlString.replace(/(href|src)=(["'])(\/)([^"']+)\2/gi, (match, attr, quote, slash, path) => {
          return `${attr}=${quote}${origin}${slash}${path}${quote}`;
        });

        return htmlString;
      };

      // Parse the result as HTML to properly handle entities and DOM manipulation
      // The browser's HTML parser automatically decodes entities, so we don't need manual regex replacements
      const htmlDoc = parser.parseFromString(
        new XMLSerializer().serializeToString(result.documentElement),
        "text/html"
      );

      // Check for parsing errors
      const htmlError = htmlDoc.querySelector("parsererror");
      if (htmlError) {
        // If HTML parsing fails, fall back to treating it as XML/HTML fragment
        // This can happen with certain XSLT outputs
        const htmlString = new XMLSerializer().serializeToString(result.documentElement);
        return prepareHtmlForIframe(htmlString);
      }

      // Inject base tag to fix relative paths in iframe srcDoc context
      // This is much cleaner than manually fixing each path with regex
      let head = htmlDoc.querySelector("head");
      if (!head) {
        head = htmlDoc.createElement("head");
        htmlDoc.documentElement.insertBefore(head, htmlDoc.documentElement.firstChild);
      }

      // Remove existing base tag if present
      const existingBase = head.querySelector("base");
      if (existingBase) {
        existingBase.remove();
      }

      // Add base tag at the beginning of head to ensure it's processed first
      const baseTag = htmlDoc.createElement("base");
      baseTag.setAttribute("href", baseUrl);
      head.insertBefore(baseTag, head.firstChild);

      // Convert absolute paths (starting with /) to full URLs for iframe compatibility
      // The base tag handles relative paths, but absolute paths need explicit conversion
      const fixAbsolutePaths = (element: Element, attribute: string) => {
        const value = element.getAttribute(attribute);
        if (value && value.startsWith("/") && !value.startsWith("//")) {
          element.setAttribute(attribute, `${origin}${value}`);
        }
      };

      // Fix absolute paths in common attributes
      htmlDoc.querySelectorAll("link[href], img[src], script[src], source[src]").forEach((el) => {
        if (el.hasAttribute("href")) fixAbsolutePaths(el, "href");
        if (el.hasAttribute("src")) fixAbsolutePaths(el, "src");
      });

      // Fix absolute paths in style attributes and style tags
      htmlDoc.querySelectorAll("[style]").forEach((el) => {
        const style = el.getAttribute("style");
        if (style && style.includes("url(/")) {
          el.setAttribute("style", style.replace(/url\((\/)([^)]+)\)/g, `url(${origin}$1$2)`));
        }
      });

      htmlDoc.querySelectorAll("style").forEach((styleEl) => {
        const styleText = styleEl.textContent || "";
        if (styleText.includes("url(/")) {
          styleEl.textContent = styleText.replace(/url\((\/)([^)]+)\)/g, `url(${origin}$1$2)`);
        }
      });

      // Serialize the properly manipulated DOM
      // The browser's HTML parser automatically decodes entities, so we don't need manual regex replacements
      return htmlDoc.documentElement.outerHTML;
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
