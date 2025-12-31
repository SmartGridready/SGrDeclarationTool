import { RestApiFunctionalProfileList, RestApiFunctionalProfile } from "@/models/product/rest-api-interface";
import { buildFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-builder";
import { buildRestApiDataPointList } from "./data-point-list/rest-api-data-point-list-builder";
import { wrapInArray } from "@/utils/builder-utils";
import {
  validateRestApiFunctionalProfileList,
  validateRestApiFunctionalProfile,
} from "./rest-api-functional-profile-list-schema";

/**
 * Builds XML object for functionalProfileList from RestApiFunctionalProfileList model
 * @throws Error if required fields are missing
 */
export function buildRestApiFunctionalProfileList(
  functionalProfileList: RestApiFunctionalProfileList
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateRestApiFunctionalProfileList(functionalProfileList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for REST API functional profile list";
    throw new Error(errorMessage);
  }

  const listXml: Record<string, unknown> = {
    functionalProfileListElement: functionalProfileList.functionalProfileListElement.map((functionalProfile) =>
      buildRestApiFunctionalProfile(functionalProfile)
    ),
  };

  return listXml;
}

/**
 * Builds XML object for functionalProfileListElement from RestApiFunctionalProfile model
 * @throws Error if required fields are missing
 */
function buildRestApiFunctionalProfile(functionalProfile: RestApiFunctionalProfile): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateRestApiFunctionalProfile(functionalProfile);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for REST API functional profile";
    throw new Error(errorMessage);
  }

  // Start with the base functional profile structure
  const functionalProfileBaseXml = buildFunctionalProfileBase(functionalProfile);
  const functionalProfileXml = functionalProfileBaseXml;

  // Add required dataPointList
  functionalProfileXml.dataPointList = wrapInArray(buildRestApiDataPointList(functionalProfile.dataPointList));

  return functionalProfileXml;
}
