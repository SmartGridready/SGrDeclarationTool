import { DynamicParameterDescriptionList, DynamicParameterDescriptionListElement } from "@/models";
import { validateDynamicParameterList } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-schema";
import { buildLegibleDescriptionItem } from "@/sections/shared/legible-description/legible-description-builder";
import { buildDataTypeProduct } from "@/sections/shared/data-type-product/data-type-product-builder";
import { wrapInArray, setOptionalXmlField, setOptionalXmlArray } from "@/utils/builder-utils";

/**
 * Builds XML object for parameterList from DynamicParameterDescriptionList model
 */
export function buildDynamicParameterList(parameterList: DynamicParameterDescriptionList): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateDynamicParameterList(parameterList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for parameter list";
    throw new Error(errorMessage);
  }

  const parameterListXml: Record<string, unknown> = {};

  // Add optional parameterListElement array
  if (parameterList.parameterListElement && parameterList.parameterListElement.length > 0) {
    parameterListXml.parameterListElement = parameterList.parameterListElement.map((element) =>
      buildParameterListElement(element)
    );
  }

  return parameterListXml;
}

/**
 * Builds XML object for parameterListElement from DynamicParameterDescriptionListElement model
 */
function buildParameterListElement(element: DynamicParameterDescriptionListElement): Record<string, unknown> {
  const elementXml: Record<string, unknown> = {
    name: wrapInArray(element.name),
    dataType: wrapInArray(buildDataTypeProduct(element.dataType)),
  };

  // Add optional defaultValue - preserve empty strings as empty elements
  if (element.defaultValue !== undefined && element.defaultValue !== null) {
    elementXml.defaultValue = wrapInArray(element.defaultValue);
  }

  // Add optional parameterDescription array
  setOptionalXmlArray(
    elementXml,
    "parameterDescription",
    element.parameterDescription?.map((desc) => buildLegibleDescriptionItem(desc))
  );

  return elementXml;
}
