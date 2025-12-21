import {
  GenericAttributeListProduct,
  GenericAttributeProduct,
  GenericAttributeListProductEnd,
  GenericAttributeProductEnd,
} from "@/models";
import { validateGenericAttributeListProduct } from "@/sections/device/generic-attribute-list/generic-attribute-list-schema";
import { buildDataTypeProduct } from "@/sections/shared/data-type-product/data-type-product-builder";
import { wrapInArray } from "@/utils/builder-utils";

/**
 * Builds XML object for genericAttributeList from GenericAttributeListProduct model
 */
export function buildGenericAttributeListProduct(
  attributeList: GenericAttributeListProduct
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateGenericAttributeListProduct(attributeList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for generic attribute list";
    throw new Error(errorMessage);
  }

  return {
    genericAttributeListElement: attributeList.genericAttributeListElement.map((attr) =>
      buildGenericAttributeProduct(attr)
    ),
  };
}

/**
 * Builds XML object for a single genericAttributeListElement
 * Can be either a simple attribute (with dataType, value, unit) or nested (with genericAttributeList)
 */
function buildGenericAttributeProduct(attr: GenericAttributeProduct): Record<string, unknown> {
  const elementXml: Record<string, unknown> = {
    name: wrapInArray(attr.name),
  };

  // Check if it's a nested attribute
  if ("genericAttributeList" in attr) {
    elementXml.genericAttributeList = wrapInArray(
      buildGenericAttributeListProductEnd(attr.genericAttributeList)
    );
  } else {
    // Simple attribute
    elementXml.dataType = wrapInArray(buildDataTypeProduct(attr.dataType));
    elementXml.value = wrapInArray(attr.value);
    elementXml.unit = wrapInArray(attr.unit);
  }

  return elementXml;
}

/**
 * Builds XML object for nested genericAttributeList (GenericAttributeListProductEnd)
 */
function buildGenericAttributeListProductEnd(
  nestedList: GenericAttributeListProductEnd
): Record<string, unknown> {
  return {
    genericAttributeListElement: nestedList.genericAttributeListElement.map((attr) =>
      buildGenericAttributeProductEnd(attr)
    ),
  };
}

/**
 * Builds XML object for a single nested genericAttributeListElement (GenericAttributeProductEnd)
 */
function buildGenericAttributeProductEnd(
  attr: GenericAttributeProductEnd
): Record<string, unknown> {
  return {
    name: wrapInArray(attr.name),
    dataType: wrapInArray(buildDataTypeProduct(attr.dataType)),
    value: wrapInArray(attr.value),
    unit: wrapInArray(attr.unit),
  };
}
