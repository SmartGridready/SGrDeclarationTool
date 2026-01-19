import { GenericAttributeListFunctionalProfile } from "@/models";
import { mapArray, getStringValue, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML genericAttributeList to GenericAttributeListFunctionalProfile model
 */
export function mapGenericAttributeList(genericAttributeListXml: Xml2JsObject): GenericAttributeListFunctionalProfile {
  return {
    genericAttributeListElement: mapArray(
      genericAttributeListXml,
      "genericAttributeListElement",
      (item: Xml2JsObject) => ({
        name: getStringValue(item, "name"),
      })
    ),
  };
}
