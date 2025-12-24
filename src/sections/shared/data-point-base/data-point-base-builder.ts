import { DataPointBase, DataPointDescription } from "@/models";
import {
  validateDataPointBase,
  validateDataPointDescription,
} from "@/sections/shared/data-point-base/data-point-base-schema";
import { buildAlternativeNames } from "@/sections/shared/alternative-names/alternative-names-builder";
import { buildLegibleDescription } from "@/sections/shared/legible-description/legible-description-builder";
import { buildGenericAttributeListProduct } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-builder";
import { buildDynamicParameterList } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-builder";
import { buildDataTypeProduct } from "@/sections/shared/data-type-product/data-type-product-builder";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";

/**
 * Builds XML object for dataPointBase from DataPointBase model
 * @throws Error if required fields are missing
 */
export function buildDataPointBase(dataPoint: DataPointBase): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateDataPointBase(dataPoint);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for data point base";
    throw new Error(errorMessage);
  }

  const dataPointBaseXml: Record<string, unknown> = {
    dataPoint: wrapInArray(buildDataPointDescription(dataPoint.dataPoint)),
  };

  // Include optional genericAttributeList if present
  if (dataPoint.genericAttributeList) {
    dataPointBaseXml.genericAttributeList = wrapInArray(
      buildGenericAttributeListProduct(dataPoint.genericAttributeList)
    );
  }

  return dataPointBaseXml;
}

/**
 * Builds XML object for dataPointDescription from DataPointDescription model
 * @throws Error if required fields are missing
 */
export function buildDataPointDescription(
  description: DataPointDescription
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateDataPointDescription(description);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for data point description";
    throw new Error(errorMessage);
  }

  const descriptionXml: Record<string, unknown> = {
    dataPointName: wrapInArray(description.dataPointName),
    dataDirection: wrapInArray(description.dataDirection),
    dataType: wrapInArray(buildDataTypeProduct(description.dataType)),
    unit: wrapInArray(description.unit),
  };

  // Include optional fields
  setOptionalXmlField(descriptionXml, "value", description.value);
  setOptionalXmlField(descriptionXml, "arrayLength", description.arrayLength);
  setOptionalXmlField(descriptionXml, "minimumValue", description.minimumValue);
  setOptionalXmlField(descriptionXml, "maximumValue", description.maximumValue);
  setOptionalXmlField(
    descriptionXml,
    "unitConversionMultiplicator",
    description.unitConversionMultiplicator
  );

  // Include optional parameterList if present
  if (description.parameterList) {
    descriptionXml.parameterList = wrapInArray(
      buildDynamicParameterList(description.parameterList)
    );
  }

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
