import { MessagingValueMapping } from "@/models/product/messaging-types";
import { ValueMapping } from "@/models/generic";
import { getStringValue, mapArray, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML valueMapping to ValueMapping model
 */
export function mapValueMapping(valueMappingXml: Xml2JsObject): ValueMapping {
  return {
    genericValue: getStringValue(valueMappingXml, "genericValue"),
    deviceValue: getStringValue(valueMappingXml, "deviceValue"),
  };
}

/**
 * Maps XML messagingValueMapping to MessagingValueMapping model
 */
export function mapMessagingValueMapping(valueMappingXml: Xml2JsObject | undefined): MessagingValueMapping | undefined {
  if (!valueMappingXml) {
    return undefined;
  }

  const mappings = mapArray(valueMappingXml, "mapping", mapValueMapping);
  if (mappings.length === 0) {
    return undefined;
  }

  return { mapping: mappings };
}
