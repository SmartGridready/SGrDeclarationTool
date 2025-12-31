import { MessagingFunctionalProfile, MessagingFunctionalProfileList } from "@/models/product/messaging-interface";
import { wrapInArray } from "@/utils/builder-utils";
import { buildFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-builder";
import { buildMessagingDataPointList } from "./data-point-list/messaging-data-point-list-builder";
import { validateMessagingFunctionalProfileList } from "./messaging-functional-profile-list-schema";

/**
 * Builds XML object for functionalProfileListElement from MessagingFunctionalProfile model
 */
function buildMessagingFunctionalProfile(functionalProfile: MessagingFunctionalProfile): Record<string, unknown> {
  // Build the base functional profile properties
  const baseFunctionalProfileXml = buildFunctionalProfileBase(functionalProfile);

  // Build the data point list
  const dataPointListXml = buildMessagingDataPointList(functionalProfile.dataPointList);

  return {
    ...baseFunctionalProfileXml,
    dataPointList: wrapInArray(dataPointListXml),
  };
}

/**
 * Builds XML object for functionalProfileList from MessagingFunctionalProfileList model
 * @throws Error if required fields are missing
 */
export function buildMessagingFunctionalProfileList(
  functionalProfileList: MessagingFunctionalProfileList
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateMessagingFunctionalProfileList(functionalProfileList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for messaging functional profile list";
    throw new Error(errorMessage);
  }

  return {
    functionalProfileListElement: functionalProfileList.functionalProfileListElement.map(
      buildMessagingFunctionalProfile
    ),
  };
}
