import {
  RestApiFunctionalProfileList,
  RestApiFunctionalProfile,
} from "@/models/product/rest-api-interface";
import { getFirstElement, mapArray, Xml2JsObject } from "@/utils/mapper-utils";
import { mapFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-mapper";
import { mapRestApiDataPointList } from "./data-point-list/rest-api-data-point-list-mapper";

/**
 * Maps XML functionalProfileList to RestApiFunctionalProfileList model
 */
export function mapRestApiFunctionalProfileList(
  functionalProfileListXml: Xml2JsObject | undefined
): RestApiFunctionalProfileList {
  if (!functionalProfileListXml) {
    throw new Error("functionalProfileList is required");
  }

  return {
    functionalProfileListElement: mapArray(
      functionalProfileListXml,
      "functionalProfileListElement",
      mapRestApiFunctionalProfile,
      []
    ),
  };
}

/**
 * Maps XML functionalProfileListElement to RestApiFunctionalProfile model
 */
function mapRestApiFunctionalProfile(elementXml: Xml2JsObject): RestApiFunctionalProfile {
  // Map the base functional profile (functionalProfile and optional genericAttributeList)
  const functionalProfileBase = mapFunctionalProfileBase(elementXml);

  // Map required dataPointList
  const dataPointListXml = getFirstElement(elementXml, "dataPointList");
  if (!dataPointListXml) {
    throw new Error("dataPointList is required in functionalProfileListElement");
  }

  const restApiFunctionalProfile: RestApiFunctionalProfile = {
    ...functionalProfileBase,
    dataPointList: mapRestApiDataPointList(dataPointListXml),
  };

  return restApiFunctionalProfile;
}
