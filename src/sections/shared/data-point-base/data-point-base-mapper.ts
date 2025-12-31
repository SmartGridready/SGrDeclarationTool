import { DataPointBase, DataPointDescription } from "@/models";
import { mapAlternativeNames } from "@/sections/shared/alternative-names/alternative-names-mapper";
import { mapLegibleDescription } from "@/sections/shared/legible-description/legible-description-mapper";
import { mapGenericAttributeListProduct } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-mapper";
import { mapDynamicParameterList } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-mapper";
import { mapDataTypeProduct } from "@/sections/shared/data-type-product/data-type-product-mapper";
import {
  getStringValue,
  getFirstElement,
  getOptionalStringValue,
  getOptionalNumberValue,
  Xml2JsObject,
} from "@/utils/mapper-utils";

/**
 * Maps XML dataPointBase to DataPointBase model
 */
export function mapDataPointBase(dataPointBaseXml: Xml2JsObject | undefined): DataPointBase {
  const dataPointXml = getFirstElement(dataPointBaseXml, "dataPoint");
  if (!dataPointXml) {
    throw new Error("dataPoint is required in dataPointBase");
  }

  const dataPointBase: DataPointBase = {
    dataPoint: mapDataPointDescription(dataPointXml),
  };

  // Map optional genericAttributeList if present
  const genericAttributeListXml = getFirstElement(dataPointBaseXml, "genericAttributeList");
  if (genericAttributeListXml) {
    dataPointBase.genericAttributeList = mapGenericAttributeListProduct(genericAttributeListXml);
  }

  return dataPointBase;
}

/**
 * Maps XML dataPointDescription to DataPointDescription model
 */
export function mapDataPointDescription(descriptionXml: Xml2JsObject | undefined): DataPointDescription {
  if (!descriptionXml) {
    throw new Error("dataPointDescription is required");
  }

  const description: DataPointDescription = {
    dataPointName: getStringValue(descriptionXml, "dataPointName"),
    dataDirection: getStringValue(descriptionXml, "dataDirection") as DataPointDescription["dataDirection"],
    dataType: mapDataTypeProduct(getFirstElement(descriptionXml, "dataType")),
    unit: getStringValue(descriptionXml, "unit") as DataPointDescription["unit"],
  };

  // Map optional fields
  const value = getOptionalStringValue(descriptionXml, "value");
  if (value !== undefined) {
    description.value = value;
  }

  const arrayLength = getOptionalNumberValue(descriptionXml, "arrayLength");
  if (arrayLength !== undefined) {
    description.arrayLength = arrayLength;
  }

  const minimumValue = getOptionalNumberValue(descriptionXml, "minimumValue");
  if (minimumValue !== undefined) {
    description.minimumValue = minimumValue;
  }

  const maximumValue = getOptionalNumberValue(descriptionXml, "maximumValue");
  if (maximumValue !== undefined) {
    description.maximumValue = maximumValue;
  }

  const unitConversionMultiplicator = getOptionalNumberValue(descriptionXml, "unitConversionMultiplicator");
  if (unitConversionMultiplicator !== undefined) {
    description.unitConversionMultiplicator = unitConversionMultiplicator;
  }

  // Map optional parameterList if present
  const parameterListXml = getFirstElement(descriptionXml, "parameterList");
  if (parameterListXml) {
    description.parameterList = mapDynamicParameterList(parameterListXml);
  }

  // Map optional alternativeNames if present
  const alternativeNamesXml = getFirstElement(descriptionXml, "alternativeNames");
  if (alternativeNamesXml) {
    description.alternativeNames = mapAlternativeNames(alternativeNamesXml);
  }

  // Map optional legibleDescription array if present
  const legibleDescriptionXml = descriptionXml.legibleDescription;
  if (legibleDescriptionXml) {
    description.legibleDescription = mapLegibleDescription(legibleDescriptionXml);
  }

  // Map optional programmerHints array if present
  const programmerHintsXml = descriptionXml.programmerHints;
  if (programmerHintsXml) {
    description.programmerHints = mapLegibleDescription(programmerHintsXml);
  }

  return description;
}
