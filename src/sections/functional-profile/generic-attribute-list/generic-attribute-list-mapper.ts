import { GenericAttributeListFunctionalProfile } from "@/models";

/**
 * Maps XML genericAttributeList to GenericAttributeListFunctionalProfile model
 */
export function mapGenericAttributeList(
  genericAttributeListXml: any
): GenericAttributeListFunctionalProfile {
  const genericAttributeListElement =
    genericAttributeListXml.genericAttributeListElement;

  if (!Array.isArray(genericAttributeListElement)) {
    return { genericAttributeListElement: [] };
  }

  return {
    genericAttributeListElement: genericAttributeListElement.map(
      (item: any) => ({
        name: item.name?.[0] || "",
      })
    ),
  };
}
