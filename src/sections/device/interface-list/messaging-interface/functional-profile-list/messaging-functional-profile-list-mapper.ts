import {
  MessagingFunctionalProfile,
  MessagingFunctionalProfileList,
} from "@/models/product/messaging-interface";
import { mapArray, getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-mapper";
import { mapMessagingDataPointList } from "./data-point-list/messaging-data-point-list-mapper";

/**
 * Maps XML functionalProfileListElement to MessagingFunctionalProfile model
 */
function mapMessagingFunctionalProfile(xml: Xml2JsObject): MessagingFunctionalProfile {
  // Map the base functional profile properties
  const baseFunctionalProfile = mapFunctionalProfileBase(xml);

  // Map the data point list
  const dataPointListXml = getFirstElement(xml, "dataPointList");

  return {
    ...baseFunctionalProfile,
    dataPointList: mapMessagingDataPointList(dataPointListXml),
  };
}

/**
 * Maps XML functionalProfileList to MessagingFunctionalProfileList model
 */
export function mapMessagingFunctionalProfileList(
  xml: Xml2JsObject | undefined
): MessagingFunctionalProfileList {
  if (!xml) {
    return { functionalProfileListElement: [] };
  }

  return {
    functionalProfileListElement: mapArray(
      xml,
      "functionalProfileListElement",
      mapMessagingFunctionalProfile
    ),
  };
}
