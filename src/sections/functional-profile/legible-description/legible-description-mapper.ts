import { LegibleDescription, Language } from "@/models";

/**
 * Maps XML legibleDescription array to LegibleDescription[] model
 */
export function mapLegibleDescription(
  legibleDescriptionXml: any
): LegibleDescription[] {
  if (!Array.isArray(legibleDescriptionXml)) {
    return [];
  }

  return legibleDescriptionXml.map((item: any) =>
    mapLegibleDescriptionItem(item)
  );
}

/**
 * Maps a single XML legibleDescription item to LegibleDescription model
 */
export function mapLegibleDescriptionItem(itemXml: any): LegibleDescription {
  const legibleDescription: LegibleDescription = {
    textElement: itemXml.textElement?.[0] || "",
    language: (itemXml.language?.[0] as Language) || "en",
  };

  // Map optional URI
  if (itemXml.uri?.[0]) {
    legibleDescription.uri = itemXml.uri[0];
  }

  return legibleDescription;
}
