import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { ValidationResult } from "@/utils/validation-utils";

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
      if (xslDoc.querySelector("parsererror")) {
        throw new Error("Invalid XSL");
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

          const response = await fetch(path);
          if (!response.ok) throw new Error(`Failed to load: ${path}`);

          const resolved = await resolveXslIncludes(
            await response.text(),
            path.substring(0, path.lastIndexOf("/") + 1),
            visited
          );
          const includedDoc = parser.parseFromString(resolved, "text/xml");
          if (includedDoc.querySelector("parsererror")) throw new Error(`Invalid XSL: ${path}`);

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

      if (xmlDoc.querySelector("parsererror") || xslDoc.querySelector("parsererror")) {
        throw new Error("Invalid XML or XSL");
      }

      const processor = new XSLTProcessor();
      processor.importStylesheet(xslDoc);
      const result = processor.transformToDocument(xmlDoc);

      if (!result?.documentElement) {
        throw new Error("Transformation failed");
      }

      let html = new XMLSerializer().serializeToString(result.documentElement);

      // Fix relative paths, but preserve absolute URLs and paths starting with /
      const fixPath = (path: string, prefix: string) => {
        if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
          return path;
        }
        return `${prefix}${path}`;
      };

      html = html.replace(/href="([^"]*\.css)"/g, (_, p) => `href="${fixPath(p, "/xsl/")}"`);
      html = html.replace(/src="([^"]*)"/g, (_, p) => `src="${fixPath(p, "/xsl/")}"`);
      html = html.replace(
        /url\(([^)]*)\)/g,
        (_, p) => `url(${fixPath(p.trim().replace(/["']/g, ""), "/xsl/")})`
      );

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
        toast.error("Preview failed", {
          description: "Please fix validation errors before previewing.",
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
