import { GenericAttributeListFunctionalProfile } from "@/models";
import { mapArray, getStringValue } from "@/utils/mapper-utils";

/**
 * Maps XML genericAttributeList to GenericAttributeListFunctionalProfile model
 */
export function mapGenericAttributeList(
  genericAttributeListXml: any
): GenericAttributeListFunctionalProfile {
  return {
    genericAttributeListElement: mapArray(
      genericAttributeListXml,
      "genericAttributeListElement",
      (item: any) => ({
        name: getStringValue(item, "name"),
      })
    ),
  };
}
