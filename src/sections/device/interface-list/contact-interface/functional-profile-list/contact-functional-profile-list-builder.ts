import { ContactFunctionalProfileList, ContactFunctionalProfile } from "@/models/product/contact-interface";
import { buildFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-builder";
import { buildContactDataPointList } from "./data-point-list/contact-data-point-list-builder";
import { wrapInArray } from "@/utils/builder-utils";
import {
  validateContactFunctionalProfileList,
  validateContactFunctionalProfile,
} from "./contact-functional-profile-list-schema";

/**
 * Builds XML object for functionalProfileList from ContactFunctionalProfileList model
 * @throws Error if required fields are missing
 */
export function buildContactFunctionalProfileList(
  functionalProfileList: ContactFunctionalProfileList
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateContactFunctionalProfileList(functionalProfileList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Contact functional profile list";
    throw new Error(errorMessage);
  }

  const listXml: Record<string, unknown> = {
    functionalProfileListElement: functionalProfileList.functionalProfileListElement.map((functionalProfile) =>
      buildContactFunctionalProfile(functionalProfile)
    ),
  };

  return listXml;
}

/**
 * Builds XML object for functionalProfileListElement from ContactFunctionalProfile model
 * @throws Error if required fields are missing
 */
function buildContactFunctionalProfile(functionalProfile: ContactFunctionalProfile): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateContactFunctionalProfile(functionalProfile);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Contact functional profile";
    throw new Error(errorMessage);
  }

  // Start with the base functional profile structure
  const functionalProfileBaseXml = buildFunctionalProfileBase(functionalProfile);
  const functionalProfileXml = functionalProfileBaseXml;

  // Add required dataPointList
  functionalProfileXml.dataPointList = wrapInArray(buildContactDataPointList(functionalProfile.dataPointList));

  return functionalProfileXml;
}
