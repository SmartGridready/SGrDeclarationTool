import { DeviceInformation, VersionNumber } from "@/models";
import { validateDeviceInformation } from "@/sections/device/device-information/device-information-schema";
import { validateVersionNumber } from "@/sections/shared/profile-identification/profile-identification-schema";
import { buildAlternativeNames } from "@/sections/shared/alternative-names/alternative-names-builder";
import { buildLegibleDescription } from "@/sections/shared/legible-description/legible-description-builder";
import { wrapInArray, setOptionalXmlField, setOptionalXmlArray } from "@/utils/builder-utils";

/**
 * Builds XML object for deviceInformation from DeviceInformation model
 * @throws Error if required fields are missing
 */
export function buildDeviceInformation(
  deviceInformation: DeviceInformation
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateDeviceInformation(deviceInformation);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for device information";
    throw new Error(errorMessage);
  }

  const deviceInformationXml: Record<string, unknown> = {};

  // Build optional alternativeNames (must come first according to model)
  if (deviceInformation.alternativeNames) {
    deviceInformationXml.alternativeNames = wrapInArray(
      buildAlternativeNames(deviceInformation.alternativeNames)
    );
  }

  // Build optional legibleDescription (must come after alternativeNames, before deviceCategory)
  setOptionalXmlArray(
    deviceInformationXml,
    "legibleDescription",
    deviceInformation.legibleDescription && deviceInformation.legibleDescription.length > 0
      ? buildLegibleDescription(deviceInformation.legibleDescription)
      : undefined
  );

  // Required fields (must come after optional alternativeNames and legibleDescription)
  deviceInformationXml.deviceCategory = wrapInArray(deviceInformation.deviceCategory);
  deviceInformationXml.isLocalControl = wrapInArray(String(deviceInformation.isLocalControl));

  // Add optional string fields
  setOptionalXmlField(deviceInformationXml, "softwareRevision", deviceInformation.softwareRevision);
  setOptionalXmlField(deviceInformationXml, "hardwareRevision", deviceInformation.hardwareRevision);
  setOptionalXmlField(deviceInformationXml, "brandName", deviceInformation.brandName);
  setOptionalXmlField(deviceInformationXml, "powerSource", deviceInformation.powerSource);
  setOptionalXmlField(deviceInformationXml, "nominalPower", deviceInformation.nominalPower);
  setOptionalXmlField(
    deviceInformationXml,
    "manufacturerSpecificationIdentification",
    deviceInformation.manufacturerSpecificationIdentification
  );
  setOptionalXmlField(
    deviceInformationXml,
    "manufacturerLabel",
    deviceInformation.manufacturerLabel
  );
  setOptionalXmlField(deviceInformationXml, "generalRemarks", deviceInformation.generalRemarks);
  setOptionalXmlField(deviceInformationXml, "levelOfOperation", deviceInformation.levelOfOperation);

  // Build optional versionNumber
  if (deviceInformation.versionNumber) {
    deviceInformationXml.versionNumber = wrapInArray(
      buildVersionNumber(deviceInformation.versionNumber)
    );
  }

  setOptionalXmlField(deviceInformationXml, "testState", deviceInformation.testState);

  // Build optional programmerHints
  setOptionalXmlArray(
    deviceInformationXml,
    "programmerHints",
    deviceInformation.programmerHints && deviceInformation.programmerHints.length > 0
      ? buildLegibleDescription(deviceInformation.programmerHints)
      : undefined
  );

  return deviceInformationXml;
}

/**
 * Builds XML object for versionNumber from VersionNumber model
 * @throws Error if required fields are missing
 */
function buildVersionNumber(versionNumber: VersionNumber): Record<string, unknown> {
  // Validate using validation layer (versionNumberSchema is shared)
  const validation = validateVersionNumber(versionNumber);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for version number";
    throw new Error(errorMessage);
  }

  return {
    primaryVersionNumber: wrapInArray(versionNumber.primaryVersionNumber),
    secondaryVersionNumber: wrapInArray(versionNumber.secondaryVersionNumber),
    subReleaseVersionNumber: wrapInArray(versionNumber.subReleaseVersionNumber),
  };
}
