import { GenericInterface } from "@/models/product/generic-interface";
import { getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapGenericFunctionalProfileList } from "./functional-profile-list/generic-functional-profile-list-mapper";

/**
 * Maps XML genericInterface to GenericInterface model
 */
export function mapGenericInterface(
  genericInterfaceXml: Xml2JsObject | undefined
): GenericInterface {
  if (!genericInterfaceXml) {
    throw new Error("genericInterface is required");
  }

  const genericInterface: GenericInterface = {
    functionalProfileList: mapGenericFunctionalProfileList(
      getFirstElement(genericInterfaceXml, "functionalProfileList")
    ),
  };

  return genericInterface;
}
