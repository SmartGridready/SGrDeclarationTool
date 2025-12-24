import { FunctionalProfileBase, FunctionalProfileDescription } from "@/models";
import {
  validateFunctionalProfileBase,
  validateFunctionalProfileDescription,
} from "@/sections/shared/functional-profile-base/functional-profile-base-schema";
import { buildProfileIdentification } from "@/sections/shared/profile-identification/profile-identification-builder";
import { buildAlternativeNames } from "@/sections/shared/alternative-names/alternative-names-builder";
import { buildLegibleDescription } from "@/sections/shared/legible-description/legible-description-builder";
import { buildGenericAttributeListProduct } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-builder";
import { wrapInArray } from "@/utils/builder-utils";

/**
 * Builds XML object for functionalProfileBase from FunctionalProfileBase model
 * @throws Error if required fields are missing
 */
export function buildFunctionalProfileBase(
  functionalProfile: FunctionalProfileBase
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateFunctionalProfileBase(functionalProfile);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for functional profile base";
    throw new Error(errorMessage);
  }

  const functionalProfileBaseXml: Record<string, unknown> = {
    functionalProfile: wrapInArray(
      buildFunctionalProfileDescription(functionalProfile.functionalProfile)
    ),
  };

  // Include optional genericAttributeList if present
  if (functionalProfile.genericAttributeList) {
    functionalProfileBaseXml.genericAttributeList = wrapInArray(
      buildGenericAttributeListProduct(functionalProfile.genericAttributeList)
    );
  }

  return functionalProfileBaseXml;
}

/**
 * Builds XML object for functionalProfileDescription from FunctionalProfileDescription model
 * @throws Error if required fields are missing
 */
export function buildFunctionalProfileDescription(
  description: FunctionalProfileDescription
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateFunctionalProfileDescription(description);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || "Validation failed for functional profile description";
    throw new Error(errorMessage);
  }

  const descriptionXml: Record<string, unknown> = {
    functionalProfileName: wrapInArray(description.functionalProfileName),
    functionalProfileIdentification: wrapInArray(
      buildProfileIdentification(description.functionalProfileIdentification)
    ),
  };

  // Include optional alternativeNames if present
  if (description.alternativeNames) {
    descriptionXml.alternativeNames = wrapInArray(
      buildAlternativeNames(description.alternativeNames)
    );
  }

  // Include optional legibleDescription array if present
  if (description.legibleDescription && description.legibleDescription.length > 0) {
    descriptionXml.legibleDescription = buildLegibleDescription(description.legibleDescription);
  }

  // Include optional programmerHints array if present
  if (description.programmerHints && description.programmerHints.length > 0) {
    descriptionXml.programmerHints = buildLegibleDescription(description.programmerHints);
  }

  return descriptionXml;
}
