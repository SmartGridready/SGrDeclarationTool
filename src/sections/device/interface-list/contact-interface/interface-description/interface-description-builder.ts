import { ContactInterfaceDescription } from "@/models/product/contact-interface";
import { wrapInArray } from "@/utils/builder-utils";
import { validateContactInterfaceDescription } from "./interface-description-schema";

/**
 * Builds XML object for contactInterfaceDescription from ContactInterfaceDescription model
 * @throws Error if required fields are missing
 */
export function buildContactInterfaceDescription(description: ContactInterfaceDescription): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateContactInterfaceDescription(description);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Contact interface description";
    throw new Error(errorMessage);
  }

  const descriptionXml: Record<string, unknown> = {
    numberOfContacts: wrapInArray(description.numberOfContacts),
    contactStabilisationTimeMs: wrapInArray(description.contactStabilisationTimeMs),
  };

  return descriptionXml;
}
