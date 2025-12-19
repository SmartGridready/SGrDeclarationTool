import {
  AlternativeNames,
  DataTypeProduct,
  DeviceCategory,
  LegibleDescription,
  LevelOfOperation,
  PowerSource,
  ReleaseNotes,
  SpecificationOwnerIdentification,
  VersionNumber,
} from "@/models/generic";

export interface DeviceFrame {
  deviceName: string;
  manufacturerName?: string;
  specificationOwnerIdentification: SpecificationOwnerIdentification;
  releaseNotes: ReleaseNotes;
  deviceInformation: DeviceInformation;
  configurationList?: ConfigurationList;
  // genericAttributeList?: GenericAttributeListProduct;
  // interfaceList: InterfaceList;
}

export interface DeviceInformation {
  alternativeNames?: AlternativeNames;
  legibleDescription?: LegibleDescription[]; // maxOccurs="4"
  deviceCategory: DeviceCategory;
  isLocalControl: boolean;
  softwareRevision?: string;
  hardwareRevision?: string;
  brandName?: string;
  powerSource?: PowerSource;
  nominalPower?: string;
  manufacturerSpecificationIdentification?: string;
  manufacturerLabel?: string;
  generalRemarks?: string;
  levelOfOperation?: LevelOfOperation;
  versionNumber?: VersionNumber;
  testState?: TestState;
  programmerHints?: LegibleDescription[]; // maxOccurs="4"
}

export type TestState = "None" | "Tested" | "Confirmed" | "Verified";

export interface ConfigurationList {
  configurationListElement: ConfigurationListElement[]; // minOccurs=1, maxOccurs=unbounded
}

export interface ConfigurationListElement {
  name: string;
  dataType: DataTypeProduct; // sgr:DataTypeProduct
  defaultValue?: string;
  configurationDescription?: ConfigurationDescription[]; // maxOccurs="4"
}

export interface ConfigurationDescription extends LegibleDescription {
  label?: string;
}
