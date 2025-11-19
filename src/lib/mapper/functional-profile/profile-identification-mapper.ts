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

  // Map specificationOwnerIdentification (required)
  if (!identificationXml.specificationOwnerIdentification?.[0]) {
    throw new Error(
      "FunctionalProfileIdentification must have a 'specificationOwnerIdentification' field"
    );
  }
  identification.specificationOwnerIdentification =
    identificationXml.specificationOwnerIdentification[0];

  // Map functionalProfileCategory (required)
  if (!identificationXml.functionalProfileCategory?.[0]) {
    throw new Error(
      "FunctionalProfileIdentification must have a 'functionalProfileCategory' field"
    );
  }
  identification.functionalProfileCategory = identificationXml
    .functionalProfileCategory[0] as FunctionalProfileCategory;

  // Map functionalProfileType (required)
  if (!identificationXml.functionalProfileType?.[0]) {
    throw new Error(
      "FunctionalProfileIdentification must have a 'functionalProfileType' field"
    );
  }
  identification.functionalProfileType =
    identificationXml.functionalProfileType[0];

  // Map levelOfOperation (required)
  if (!identificationXml.levelOfOperation?.[0]) {
    throw new Error(
      "FunctionalProfileIdentification must have a 'levelOfOperation' field"
    );
  }
  identification.levelOfOperation = identificationXml
    .levelOfOperation[0] as LevelOfOperation;

  // Map versionNumber (required)
  if (!identificationXml.versionNumber?.[0]) {
    throw new Error(
      "FunctionalProfileIdentification must have a 'versionNumber' field"
    );
  }
  identification.versionNumber = mapVersionNumber(
    identificationXml.versionNumber[0]
  );

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

  if (!versionNumberXml.primaryVersionNumber?.[0]) {
    throw new Error("VersionNumber must have a 'primaryVersionNumber' field");
  }
  versionNumber.primaryVersionNumber = parseInt(
    versionNumberXml.primaryVersionNumber[0],
    10
  );

  if (!versionNumberXml.secondaryVersionNumber?.[0]) {
    throw new Error("VersionNumber must have a 'secondaryVersionNumber' field");
  }
  versionNumber.secondaryVersionNumber = parseInt(
    versionNumberXml.secondaryVersionNumber[0],
    10
  );

  if (!versionNumberXml.subReleaseVersionNumber?.[0]) {
    throw new Error(
      "VersionNumber must have a 'subReleaseVersionNumber' field"
    );
  }
  versionNumber.subReleaseVersionNumber = parseInt(
    versionNumberXml.subReleaseVersionNumber[0],
    10
  );

  return versionNumber;
}
