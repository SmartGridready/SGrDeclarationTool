import {
  GenericFunctionalProfileList,
  GenericFunctionalProfile,
} from "@/models/product/generic-interface";
import { getFirstElement, mapArray, Xml2JsObject } from "@/utils/mapper-utils";
import { mapFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-mapper";
import { mapGenericDataPointList } from "./data-point-list/generic-data-point-list-mapper";

/**
 * Maps XML functionalProfileList to GenericFunctionalProfileList model
 */
export function mapGenericFunctionalProfileList(
  functionalProfileListXml: Xml2JsObject | undefined
): GenericFunctionalProfileList {
  if (!functionalProfileListXml) {
    throw new Error("functionalProfileList is required");
  }

  return {
    functionalProfileListElement: mapArray(
      functionalProfileListXml,
      "functionalProfileListElement",
      mapGenericFunctionalProfile,
      []
    ),
  };
}

/**
 * Maps XML functionalProfileListElement to GenericFunctionalProfile model
 */
function mapGenericFunctionalProfile(elementXml: Xml2JsObject): GenericFunctionalProfile {
  // Map the base functional profile (functionalProfile and optional genericAttributeList)
  const functionalProfileBase = mapFunctionalProfileBase(elementXml);

  // Map required dataPointList
  const dataPointListXml = getFirstElement(elementXml, "dataPointList");
  if (!dataPointListXml) {
    throw new Error("dataPointList is required in functionalProfileListElement");
  }

  const genericFunctionalProfile: GenericFunctionalProfile = {
    ...functionalProfileBase,
    dataPointList: mapGenericDataPointList(dataPointListXml),
  };

  return genericFunctionalProfile;
}
