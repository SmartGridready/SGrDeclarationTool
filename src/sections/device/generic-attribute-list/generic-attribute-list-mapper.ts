import {
  GenericAttributeListProduct,
  GenericAttributeProduct,
  GenericAttributeListProductEnd,
  GenericAttributeProductEnd,
  Units,
} from "@/models";
import {
  mapArray,
  getStringValue,
  getTypedValue,
  getFirstElement,
  Xml2JsObject,
} from "@/utils/mapper-utils";
import { mapDataTypeProduct } from "@/sections/shared/data-type-product/data-type-product-mapper";

/**
 * Maps XML genericAttributeList to GenericAttributeListProduct model
 */
export function mapGenericAttributeListProduct(
  genericAttributeListXml: Xml2JsObject | undefined
): GenericAttributeListProduct {
  return {
    genericAttributeListElement: mapArray(
      genericAttributeListXml,
      "genericAttributeListElement",
      mapGenericAttributeProduct
    ),
  };
}

/**
 * Maps a single XML genericAttributeListElement to GenericAttributeProduct model
 * Can be either a simple attribute (with dataType, value, unit) or nested (with genericAttributeList)
 */
function mapGenericAttributeProduct(elementXml: Xml2JsObject): GenericAttributeProduct {
  const name = getStringValue(elementXml, "name");

  // Check if it's a nested attribute (has genericAttributeList)
  const nestedListXml = getFirstElement(elementXml, "genericAttributeList");
  if (nestedListXml) {
    return {
      name,
      genericAttributeList: mapGenericAttributeListProductEnd(nestedListXml),
    };
  }

  // Otherwise it's a simple attribute (has dataType, value, unit)
  const dataTypeXml = getFirstElement(elementXml, "dataType");
  if (!dataTypeXml) {
    throw new Error(
      "genericAttributeListElement must have either dataType or genericAttributeList"
    );
  }

  return {
    name,
    dataType: mapDataTypeProduct(dataTypeXml),
    value: getStringValue(elementXml, "value"),
    unit: getTypedValue<Units>(elementXml, "unit", "NO_UNITS"),
  };
}

/**
 * Maps XML genericAttributeList (nested) to GenericAttributeListProductEnd model
 */
function mapGenericAttributeListProductEnd(
  genericAttributeListXml: Xml2JsObject
): GenericAttributeListProductEnd {
  return {
    genericAttributeListElement: mapArray(
      genericAttributeListXml,
      "genericAttributeListElement",
      mapGenericAttributeProductEnd
    ),
  };
}

/**
 * Maps a single XML genericAttributeListElement (nested) to GenericAttributeProductEnd model
 */
function mapGenericAttributeProductEnd(elementXml: Xml2JsObject): GenericAttributeProductEnd {
  const dataTypeXml = getFirstElement(elementXml, "dataType");
  if (!dataTypeXml) {
    throw new Error("genericAttributeListElement must have dataType");
  }

  return {
    name: getStringValue(elementXml, "name"),
    dataType: mapDataTypeProduct(dataTypeXml),
    value: getStringValue(elementXml, "value"),
    unit: getTypedValue<Units>(elementXml, "unit", "NO_UNITS"),
  };
}
