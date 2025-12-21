import {
  DeviceInformation,
  DeviceCategory,
  TestState,
  LevelOfOperation,
  PowerSource,
} from "@/models";
import {
  getStringValue,
  getTypedValue,
  getOptionalStringValue,
  getFirstElement,
  getNumberValue,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";
import { mapAlternativeNames } from "@/sections/shared/alternative-names/alternative-names-mapper";
import { mapLegibleDescription } from "@/sections/shared/legible-description/legible-description-mapper";
import { mapLegibleDescriptionItem } from "@/sections/shared/legible-description/legible-description-mapper";

/**
 * Maps XML deviceInformation to DeviceInformation model
 */
export function mapDeviceInformation(
  deviceInformationXml: Xml2JsObject | undefined
): DeviceInformation {
  if (!deviceInformationXml) {
    throw new Error("deviceInformation is required");
  }

  const deviceInformation: DeviceInformation = {
    deviceCategory: getTypedValue<DeviceCategory>(
      deviceInformationXml,
      "deviceCategory",
      "SubMeterElectricity"
    ),
    isLocalControl: getStringValue(deviceInformationXml, "isLocalControl") === "true",
  };

  // Map optional fields
  const alternativeNamesXml = getFirstElement(deviceInformationXml, "alternativeNames");
  setOptionalField(
    deviceInformation,
    "alternativeNames",
    alternativeNamesXml && mapAlternativeNames(alternativeNamesXml)
  );

  // Map optional legibleDescription
  if (
    deviceInformationXml.legibleDescription &&
    Array.isArray(deviceInformationXml.legibleDescription) &&
    deviceInformationXml.legibleDescription.length > 0
  ) {
    const mappedLegibleDescription = mapLegibleDescription(deviceInformationXml.legibleDescription);
    setOptionalField(
      deviceInformation,
      "legibleDescription",
      mappedLegibleDescription.length > 0 ? mappedLegibleDescription : undefined
    );
  }

  setOptionalField(
    deviceInformation,
    "softwareRevision",
    getOptionalStringValue(deviceInformationXml, "softwareRevision")
  );
  setOptionalField(
    deviceInformation,
    "hardwareRevision",
    getOptionalStringValue(deviceInformationXml, "hardwareRevision")
  );
  setOptionalField(
    deviceInformation,
    "brandName",
    getOptionalStringValue(deviceInformationXml, "brandName")
  );
  const powerSourceValue = getOptionalStringValue(deviceInformationXml, "powerSource");
  setOptionalField(
    deviceInformation,
    "powerSource",
    powerSourceValue ? (powerSourceValue as PowerSource) : undefined
  );
  setOptionalField(
    deviceInformation,
    "nominalPower",
    getOptionalStringValue(deviceInformationXml, "nominalPower")
  );
  setOptionalField(
    deviceInformation,
    "manufacturerSpecificationIdentification",
    getOptionalStringValue(deviceInformationXml, "manufacturerSpecificationIdentification")
  );
  setOptionalField(
    deviceInformation,
    "manufacturerLabel",
    getOptionalStringValue(deviceInformationXml, "manufacturerLabel")
  );
  setOptionalField(
    deviceInformation,
    "generalRemarks",
    getOptionalStringValue(deviceInformationXml, "generalRemarks")
  );
  const levelOfOperationValue = getOptionalStringValue(deviceInformationXml, "levelOfOperation");
  setOptionalField(
    deviceInformation,
    "levelOfOperation",
    levelOfOperationValue ? (levelOfOperationValue as LevelOfOperation) : undefined
  );

  // Map optional versionNumber
  const versionNumberXml = getFirstElement(deviceInformationXml, "versionNumber");
  if (versionNumberXml) {
    deviceInformation.versionNumber = {
      primaryVersionNumber: getNumberValue(versionNumberXml, "primaryVersionNumber", 0),
      secondaryVersionNumber: getNumberValue(versionNumberXml, "secondaryVersionNumber", 0),
      subReleaseVersionNumber: getNumberValue(versionNumberXml, "subReleaseVersionNumber", 0),
    };
  }

  const testStateValue = getOptionalStringValue(deviceInformationXml, "testState");
  setOptionalField(
    deviceInformation,
    "testState",
    testStateValue ? (testStateValue as TestState) : undefined
  );

  // Map optional programmerHints
  if (
    deviceInformationXml.programmerHints &&
    Array.isArray(deviceInformationXml.programmerHints) &&
    deviceInformationXml.programmerHints.length > 0
  ) {
    const mappedProgrammerHints = deviceInformationXml.programmerHints.map((hint: Xml2JsObject) =>
      mapLegibleDescriptionItem(hint)
    );
    setOptionalField(
      deviceInformation,
      "programmerHints",
      mappedProgrammerHints.length > 0 ? mappedProgrammerHints : undefined
    );
  }

  return deviceInformation;
}
