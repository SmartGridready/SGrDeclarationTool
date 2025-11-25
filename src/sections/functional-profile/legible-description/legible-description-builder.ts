import { LegibleDescription } from "@/models";
import { ERROR_MESSAGES } from "./legible-description-error-messages";
import {
  validateLegibleDescription,
  validateLegibleDescriptionArray,
} from "./legible-description-validator";

/**
 * Builds XML object for legibleDescription array from LegibleDescription[] model
 * Uses CDATA for textElement to preserve HTML content and special characters
 */
export function buildLegibleDescription(
  legibleDescriptions: LegibleDescription[]
): any[] {
  // Validate using validation layer
  const validation = validateLegibleDescriptionArray(legibleDescriptions);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message ||
      ERROR_MESSAGES.LEGIBLE_DESCRIPTION.MAX_DESCRIPTIONS_EXCEEDED;
    throw new Error(errorMessage);
  }

  return legibleDescriptions.map((description) =>
    buildLegibleDescriptionItem(description)
  );
}

/**
 * Builds XML object for a single legibleDescription item
 * Uses CDATA for textElement to preserve HTML content and special characters
 */
function buildLegibleDescriptionItem(description: LegibleDescription): any {
  // Validate using validation layer
  const validation = validateLegibleDescription(description);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message ||
      ERROR_MESSAGES.LEGIBLE_DESCRIPTION.MISSING_TEXT_ELEMENT;
    throw new Error(errorMessage);
  }

  const itemXml: any = {
    // Use CDATA format for textElement to preserve HTML and special characters
    // xml2js Builder will wrap this in CDATA when cdata option is enabled
    textElement: [
      {
        _cdata: description.textElement,
      },
    ],
    language: [description.language],
  };

  // Include optional URI if present
  if (description.uri) {
    itemXml.uri = [description.uri];
  }

  return itemXml;
}
