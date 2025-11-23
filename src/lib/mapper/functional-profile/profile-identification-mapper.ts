import {
  FunctionalProfileIdentification,
  FunctionalProfileCategory,
  LevelOfOperation,
  VersionNumber,
} from "@/lib/models";

/**
 * Maps XML functionalProfileIdentification to FunctionalProfileIdentification model
 */
export function mapProfileIdentification(
  identificationXml: any
): FunctionalProfileIdentification {
  const identification: FunctionalProfileIdentification = {
    specificationOwnerIdentification: "",
    functionalProfileCategory: "Battery",
    functionalProfileType: "",
    levelOfOperation: "1",
    versionNumber: {
      primaryVersionNumber: 0,
      secondaryVersionNumber: 0,
      subReleaseVersionNumber: 0,
    },
  };

  // Map specificationOwnerIdentification
  if (identificationXml.specificationOwnerIdentification?.[0]) {
    identification.specificationOwnerIdentification =
      identificationXml.specificationOwnerIdentification[0];
  }

  // Map functionalProfileCategory
  if (identificationXml.functionalProfileCategory?.[0]) {
    identification.functionalProfileCategory = identificationXml
      .functionalProfileCategory[0] as FunctionalProfileCategory;
  }

  // Map functionalProfileType
  if (identificationXml.functionalProfileType?.[0]) {
    identification.functionalProfileType =
      identificationXml.functionalProfileType[0];
  }

  // Map levelOfOperation
  if (identificationXml.levelOfOperation?.[0]) {
    identification.levelOfOperation = identificationXml
      .levelOfOperation[0] as LevelOfOperation;
  }

  // Map versionNumber
  if (identificationXml.versionNumber?.[0]) {
    identification.versionNumber = mapVersionNumber(
      identificationXml.versionNumber[0]
    );
  }

  return identification;
}

/**
 * Maps XML versionNumber to VersionNumber model
 */
function mapVersionNumber(versionNumberXml: any): VersionNumber {
  const versionNumber: VersionNumber = {
    primaryVersionNumber: 0,
    secondaryVersionNumber: 0,
    subReleaseVersionNumber: 0,
  };

  if (versionNumberXml.primaryVersionNumber?.[0]) {
    versionNumber.primaryVersionNumber = parseInt(
      versionNumberXml.primaryVersionNumber[0],
      10
    );
  }

  if (versionNumberXml.secondaryVersionNumber?.[0]) {
    versionNumber.secondaryVersionNumber = parseInt(
      versionNumberXml.secondaryVersionNumber[0],
      10
    );
  }

  if (versionNumberXml.subReleaseVersionNumber?.[0]) {
    versionNumber.subReleaseVersionNumber = parseInt(
      versionNumberXml.subReleaseVersionNumber[0],
      10
    );
  }

  return versionNumber;
}
