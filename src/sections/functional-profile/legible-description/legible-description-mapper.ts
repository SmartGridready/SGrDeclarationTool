import { LegibleDescription, Language } from "@/models";
import {
  getStringValue,
  getTypedValue,
  getOptionalStringValue,
  setOptionalField,
} from "@/sections/shared/utils/mapper-utils";

/**
 * Maps XML legibleDescription array to LegibleDescription[] model
 */
export function mapLegibleDescription(
  legibleDescriptionXml: any
): LegibleDescription[] {
  if (!Array.isArray(legibleDescriptionXml)) {
    return [];
  }
  return legibleDescriptionXml.map(mapLegibleDescriptionItem);
}

/**
 * Maps a single XML legibleDescription item to LegibleDescription model
 */
export function mapLegibleDescriptionItem(itemXml: any): LegibleDescription {
  const legibleDescription: LegibleDescription = {
    textElement: getStringValue(itemXml, "textElement"),
    language: getTypedValue<Language>(itemXml, "language", "en"),
  };

  // Map optional URI
  setOptionalField(
    legibleDescription,
    "uri",
    getOptionalStringValue(itemXml, "uri")
  );

  return legibleDescription;
}
