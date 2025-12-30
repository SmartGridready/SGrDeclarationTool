import { ContactInterface } from "@/models/product/contact-interface";
import { buildContactInterfaceDescription } from "./interface-description/interface-description-builder";
import { buildContactFunctionalProfileList } from "./functional-profile-list/contact-functional-profile-list-builder";
import { wrapInArray } from "@/utils/builder-utils";
import { validateContactInterface } from "./contact-interface-schema";

/**
 * Builds XML object for contactInterface from ContactInterface model
 * @throws Error if required fields are missing
 */
export function buildContactInterface(contactInterface: ContactInterface): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateContactInterface(contactInterface);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Contact interface";
    throw new Error(errorMessage);
  }

  const contactInterfaceXml: Record<string, unknown> = {
    contactInterfaceDescription: wrapInArray(
      buildContactInterfaceDescription(contactInterface.contactInterfaceDescription)
    ),
  };

  // Add required functionalProfileList
  contactInterfaceXml.functionalProfileList = wrapInArray(
    buildContactFunctionalProfileList(contactInterface.functionalProfileList)
  );

  return contactInterfaceXml;
}
