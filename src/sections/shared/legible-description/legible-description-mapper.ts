import { LegibleDescription, Language } from "@/models";
import {
  getStringValue,
  getTypedValue,
  getOptionalStringValue,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";

/**
 * Maps XML legibleDescription array to LegibleDescription[] model
 */
export function mapLegibleDescription(legibleDescriptionXml: unknown): LegibleDescription[] {
  if (!Array.isArray(legibleDescriptionXml)) {
    return [];
  }
  return legibleDescriptionXml.map(mapLegibleDescriptionItem);
}

/**
 * Maps a single XML legibleDescription item to LegibleDescription model
 */
export function mapLegibleDescriptionItem(itemXml: unknown): LegibleDescription {
  const xml = itemXml as Xml2JsObject | undefined;
  const legibleDescription: LegibleDescription = {
    textElement: getStringValue(xml, "textElement"),
    language: getTypedValue<Language>(xml, "language", "en"),
  };

  // Map optional URI
  setOptionalField(legibleDescription, "uri", getOptionalStringValue(xml, "uri"));

  // Map optional label (for descriptions that extend legible descriptions with a label)
  // Use type assertion since label only exists on types that extend LegibleDescription
  const labelValue = getOptionalStringValue(xml, "label");
  if (labelValue !== undefined) {
    (legibleDescription as { label?: string }).label = labelValue;
  }

  return legibleDescription;
}
