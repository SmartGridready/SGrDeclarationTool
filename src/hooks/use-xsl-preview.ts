import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { useValidationStore } from "@/sections/shared/validation-store";
import { ValidationResult, getFirstFieldError } from "@/utils/validation-utils";

/**
 * Hook for generating XSL-transformed HTML previews from XML data.
 * @param options - Configuration with builder, data, and optional validator
 * @returns Object with generatePreview function, preview HTML, and loading state
 */
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
  const setValidationAttempted = useValidationStore((state) => state.setValidationAttempted);

  /**
   * Recursively resolves xsl:include directives in XSL stylesheets.
   */
  const resolveXslIncludes = useCallback(
    async (xslText: string, basePath = "/xsl/", visited = new Set<string>()): Promise<string> => {
      const parser = new DOMParser();
      const xslDoc = parser.parseFromString(xslText, "text/xml");

      const parserError = xslDoc.querySelector("parsererror");
      if (parserError) {
        throw new Error(`XSL Parse Error: ${parserError.textContent || "Invalid XSL"}`);
      }

      const includes = Array.from(xslDoc.querySelectorAll("xsl\\:include, include"));
      await Promise.all(
        includes.map(async (include) => {
          const href = include.getAttribute("href");
          if (!href) return;

          const path = href.startsWith("/") ? href : `${basePath}${href}`.replace(/\/+/g, "/");

          if (visited.has(path)) {
            include.remove();
            return;
          }
          visited.add(path);

          try {
            const response = await fetch(path);
            if (!response.ok) {
              throw new Error(`Failed to load XSL include: ${path}`);
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
              throw new Error(`XSL Include Parse Error in ${path}: ${includeError.textContent || "Invalid XSL"}`);
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

  /**
   * Transforms XML string to HTML using XSL stylesheet.
   */
  const transformXmlWithXsl = useCallback(
    async (xmlString: string): Promise<string> => {
      const parser = new DOMParser();

      const xslResponse = await fetch("/xsl/SGr.xsl");
      if (!xslResponse.ok) {
        throw new Error("Failed to load XSL file");
      }
      const xslText = await resolveXslIncludes(await xslResponse.text(), "/xsl/");

      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      const xslDoc = parser.parseFromString(xslText, "text/xml");

      const xmlError = xmlDoc.querySelector("parsererror");
      if (xmlError) {
        throw new Error(`XML Parse Error: ${xmlError.textContent || "Invalid XML"}`);
      }

      const xslError = xslDoc.querySelector("parsererror");
      if (xslError) {
        throw new Error(`XSL Parse Error: ${xslError.textContent || "Invalid XSL"}`);
      }

      const processor = new XSLTProcessor();
      processor.importStylesheet(xslDoc);
      const result = processor.transformToDocument(xmlDoc);

      if (!result?.documentElement) {
        throw new Error("XSLT Transformation failed: No document element in result");
      }

      const htmlDoc = parser.parseFromString(
        new XMLSerializer().serializeToString(result.documentElement),
        "text/html"
      );

      const htmlError = htmlDoc.querySelector("parsererror");
      if (htmlError) {
        const htmlString = new XMLSerializer().serializeToString(result.documentElement);
        return htmlString;
      }

      const escapedHtml = htmlDoc.getElementsByClassName("renderhtml");
      for (let i = escapedHtml.length - 1; i >= 0; i--) {
        const el = escapedHtml[i];

        const hasElementChildren = Array.from(el.childNodes).some((n) => n.nodeType === Node.ELEMENT_NODE);
        if (hasElementChildren) continue;

        el.innerHTML = el.textContent ?? "";
      }

      htmlDoc.querySelectorAll("img[src]").forEach((img) => {
        const src = img.getAttribute("src");
        if (src && src.startsWith("ressources/")) {
          img.setAttribute("src", `/xsl/ressources/${src.substring("ressources/".length)}`);
        }
      });

      return htmlDoc.documentElement.outerHTML;
    },
    [resolveXslIncludes]
  );

  /**
   * Generates the HTML preview from current data.
   */
  const generatePreview = useCallback(async (): Promise<string | null> => {
    if (!data) {
      toast.error("Preview failed", { description: errorMessage });
      return null;
    }

    if (validator) {
      const validation = validator(data);

      setValidationAttempted(true);

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
  }, [builder, data, errorMessage, validator, transformXmlWithXsl, setValidationAttempted]);

  return { generatePreview, previewHtml, isLoading, setPreviewHtml };
}
