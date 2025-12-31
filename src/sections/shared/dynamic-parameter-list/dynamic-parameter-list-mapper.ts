import {
  DynamicParameterDescriptionList,
  DynamicParameterDescriptionListElement,
  DynamicParameterDescription,
} from "@/models";
import {
  mapOptionalArray,
  getStringValue,
  getFirstElement,
  getOptionalStringValue,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";
import { mapLegibleDescriptionItem } from "@/sections/shared/legible-description/legible-description-mapper";
import { mapDataTypeProduct } from "@/sections/shared/data-type-product/data-type-product-mapper";

/**
 * Maps XML parameterList to DynamicParameterDescriptionList model
 */
export function mapDynamicParameterList(parameterListXml: Xml2JsObject | undefined): DynamicParameterDescriptionList {
  if (!parameterListXml) {
    return {};
  }

  const parameterList: DynamicParameterDescriptionList = {};

  // Map optional parameterListElement
  setOptionalField(
    parameterList,
    "parameterListElement",
    mapOptionalArray(parameterListXml, "parameterListElement", mapParameterListElement)
  );

  return parameterList;
}

/**
 * Maps a single XML parameterListElement to DynamicParameterDescriptionListElement model
 */
function mapParameterListElement(elementXml: Xml2JsObject): DynamicParameterDescriptionListElement {
  const element: DynamicParameterDescriptionListElement = {
    name: getStringValue(elementXml, "name"),
    dataType: mapDataTypeProduct(getFirstElement(elementXml, "dataType")),
  };

  // Map optional defaultValue
  setOptionalField(element, "defaultValue", getOptionalStringValue(elementXml, "defaultValue"));

  // Map optional parameterDescription
  if (elementXml.parameterDescription && Array.isArray(elementXml.parameterDescription)) {
    element.parameterDescription = (elementXml.parameterDescription as Xml2JsObject[]).map((desc) =>
      mapParameterDescription(desc)
    );
  }

  return element;
}

/**
 * Maps XML parameterDescription to DynamicParameterDescription model
 * Uses the shared mapLegibleDescriptionItem which already handles label
 */
function mapParameterDescription(descXml: Xml2JsObject): DynamicParameterDescription {
  // mapLegibleDescriptionItem already handles label field for descriptions that extend LegibleDescription
  return mapLegibleDescriptionItem(descXml) as DynamicParameterDescription;
}
