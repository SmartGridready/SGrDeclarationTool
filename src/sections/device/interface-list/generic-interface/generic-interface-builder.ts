import { GenericInterface } from "@/models/product/generic-interface";
import { buildGenericFunctionalProfileList } from "./functional-profile-list/generic-functional-profile-list-builder";
import { wrapInArray } from "@/utils/builder-utils";
import { validateGenericInterface } from "./generic-interface-schema";

/**
 * Builds XML object for genericInterface from GenericInterface model
 * @throws Error if required fields are missing
 */
export function buildGenericInterface(genericInterface: GenericInterface): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateGenericInterface(genericInterface);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Generic interface";
    throw new Error(errorMessage);
  }

  const genericInterfaceXml: Record<string, unknown> = {};

  // Add required functionalProfileList
  genericInterfaceXml.functionalProfileList = wrapInArray(
    buildGenericFunctionalProfileList(genericInterface.functionalProfileList)
  );

  return genericInterfaceXml;
}
