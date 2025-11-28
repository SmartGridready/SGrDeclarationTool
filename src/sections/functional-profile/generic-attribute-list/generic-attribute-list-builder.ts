import { GenericAttributeListFunctionalProfile } from "@/models";
import { validateGenericAttributeList } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-schema";
import { wrapInArray } from "@/sections/shared/utils/builder-utils";

/**
 * Builds XML object for genericAttributeList from GenericAttributeListFunctionalProfile model
 */
export function buildGenericAttributeList(
  attributeList: GenericAttributeListFunctionalProfile
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateGenericAttributeList(attributeList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for generic attribute list";
    throw new Error(errorMessage);
  }

  return {
    genericAttributeListElement: attributeList.genericAttributeListElement.map((attr) => ({
      name: wrapInArray(attr.name),
    })),
  };
}
