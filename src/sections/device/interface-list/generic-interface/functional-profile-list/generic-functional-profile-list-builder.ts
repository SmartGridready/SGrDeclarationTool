import { GenericFunctionalProfileList, GenericFunctionalProfile } from "@/models/product/generic-interface";
import { buildFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-builder";
import { buildGenericDataPointList } from "./data-point-list/generic-data-point-list-builder";
import { wrapInArray } from "@/utils/builder-utils";
import {
  validateGenericFunctionalProfileList,
  validateGenericFunctionalProfile,
} from "./generic-functional-profile-list-schema";

/**
 * Builds XML object for functionalProfileList from GenericFunctionalProfileList model
 * @throws Error if required fields are missing
 */
export function buildGenericFunctionalProfileList(
  functionalProfileList: GenericFunctionalProfileList
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateGenericFunctionalProfileList(functionalProfileList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Generic functional profile list";
    throw new Error(errorMessage);
  }

  const listXml: Record<string, unknown> = {
    functionalProfileListElement: functionalProfileList.functionalProfileListElement.map((functionalProfile) =>
      buildGenericFunctionalProfile(functionalProfile)
    ),
  };

  return listXml;
}

/**
 * Builds XML object for functionalProfileListElement from GenericFunctionalProfile model
 * @throws Error if required fields are missing
 */
function buildGenericFunctionalProfile(functionalProfile: GenericFunctionalProfile): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateGenericFunctionalProfile(functionalProfile);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Generic functional profile";
    throw new Error(errorMessage);
  }

  // Start with the base functional profile structure
  const functionalProfileBaseXml = buildFunctionalProfileBase(functionalProfile);
  const functionalProfileXml = functionalProfileBaseXml;

  // Add required dataPointList
  functionalProfileXml.dataPointList = wrapInArray(buildGenericDataPointList(functionalProfile.dataPointList));

  return functionalProfileXml;
}
