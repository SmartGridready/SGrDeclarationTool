import { FunctionalProfileIdentification, VersionNumber } from "@/lib/models";

/**
 * Builds XML object for functionalProfileIdentification from FunctionalProfileIdentification model
 */
export function buildProfileIdentification(
  identification: FunctionalProfileIdentification
): any {
  const identificationXml: any = {
    specificationOwnerIdentification: [
      identification.specificationOwnerIdentification,
    ],
    functionalProfileCategory: [identification.functionalProfileCategory],
    functionalProfileType: [identification.functionalProfileType],
    levelOfOperation: [identification.levelOfOperation],
    versionNumber: [buildVersionNumber(identification.versionNumber)],
  };

  return identificationXml;
}

/**
 * Builds XML object for versionNumber from VersionNumber model
 */
function buildVersionNumber(versionNumber: VersionNumber): any {
  return {
    primaryVersionNumber: [versionNumber.primaryVersionNumber],
    secondaryVersionNumber: [versionNumber.secondaryVersionNumber],
    subReleaseVersionNumber: [versionNumber.subReleaseVersionNumber],
  };
}
