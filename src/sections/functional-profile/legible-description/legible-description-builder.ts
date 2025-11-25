import { LegibleDescription } from "@/models";
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
    // Zod always provides error messages, so this should always be defined
    const errorMessage =
      firstError?.message || "Validation failed for legible descriptions";
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
    // Zod always provides error messages, so this should always be defined
    const errorMessage =
      firstError?.message || "Validation failed for legible description";
    throw new Error(errorMessage);
  }

  const itemXml: any = {
    // Pass text directly - xml2js Builder with cdata: true will automatically
    // wrap in CDATA when it detects HTML or special characters
    textElement: [description.textElement],
    language: [description.language],
  };

  // Include optional URI if present
  if (description.uri) {
    itemXml.uri = [description.uri];
  }

  return itemXml;
}
