import { ContactFunctionalProfileList, ContactFunctionalProfile } from "@/models/product/contact-interface";
import { getFirstElement, mapArray, Xml2JsObject } from "@/utils/mapper-utils";
import { mapFunctionalProfileBase } from "@/sections/shared/functional-profile-base/functional-profile-base-mapper";
import { mapContactDataPointList } from "./data-point-list/contact-data-point-list-mapper";

/**
 * Maps XML functionalProfileList to ContactFunctionalProfileList model
 */
export function mapContactFunctionalProfileList(
  functionalProfileListXml: Xml2JsObject | undefined
): ContactFunctionalProfileList {
  if (!functionalProfileListXml) {
    throw new Error("functionalProfileList is required");
  }

  return {
    functionalProfileListElement: mapArray(
      functionalProfileListXml,
      "functionalProfileListElement",
      mapContactFunctionalProfile,
      []
    ),
  };
}

/**
 * Maps XML functionalProfileListElement to ContactFunctionalProfile model
 */
function mapContactFunctionalProfile(elementXml: Xml2JsObject): ContactFunctionalProfile {
  // Map the base functional profile (functionalProfile and optional genericAttributeList)
  const functionalProfileBase = mapFunctionalProfileBase(elementXml);

  // Map required dataPointList
  const dataPointListXml = getFirstElement(elementXml, "dataPointList");
  if (!dataPointListXml) {
    throw new Error("dataPointList is required in functionalProfileListElement");
  }

  const contactFunctionalProfile: ContactFunctionalProfile = {
    ...functionalProfileBase,
    dataPointList: mapContactDataPointList(dataPointListXml),
  };

  return contactFunctionalProfile;
}
