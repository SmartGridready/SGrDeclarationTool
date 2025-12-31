import { FunctionalProfileIdentification, FunctionalProfileCategory, LevelOfOperation, VersionNumber } from "@/models";
import { getStringValue, getTypedValue, getNumberValue, getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML functionalProfileIdentification to FunctionalProfileIdentification model
 */
export function mapProfileIdentification(identificationXml: Xml2JsObject | undefined): FunctionalProfileIdentification {
  const identification: FunctionalProfileIdentification = {
    specificationOwnerIdentification: getStringValue(identificationXml, "specificationOwnerIdentification"),
    functionalProfileCategory: getTypedValue<FunctionalProfileCategory>(
      identificationXml,
      "functionalProfileCategory",
      "Battery"
    ),
    functionalProfileType: getStringValue(identificationXml, "functionalProfileType"),
    levelOfOperation: getTypedValue<LevelOfOperation>(identificationXml, "levelOfOperation", "1"),
    versionNumber: mapVersionNumber(getFirstElement(identificationXml, "versionNumber")),
  };

  return identification;
}

/**
 * Maps XML versionNumber to VersionNumber model
 */
function mapVersionNumber(versionNumberXml: Xml2JsObject | undefined): VersionNumber {
  if (!versionNumberXml) {
    return {
      primaryVersionNumber: 0,
      secondaryVersionNumber: 0,
      subReleaseVersionNumber: 0,
    };
  }

  return {
    primaryVersionNumber: getNumberValue(versionNumberXml, "primaryVersionNumber", 0),
    secondaryVersionNumber: getNumberValue(versionNumberXml, "secondaryVersionNumber", 0),
    subReleaseVersionNumber: getNumberValue(versionNumberXml, "subReleaseVersionNumber", 0),
  };
}
