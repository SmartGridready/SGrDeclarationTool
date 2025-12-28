import {
  AlternativeNames,
  DataTypeProduct,
  DeviceCategory,
  GenericAttributeListProduct,
  LegibleDescription,
  LevelOfOperation,
  PowerSource,
  ReleaseNotes,
  SpecificationOwnerIdentification,
  VersionNumber,
} from "@/models/generic";
import { ModbusInterface } from "@/models/product/modbus-interface";
import { RestApiInterface } from "@/models/product/rest-api-interface";

export interface DeviceFrame {
  deviceName: string;
  manufacturerName?: string;
  specificationOwnerIdentification: SpecificationOwnerIdentification;
  releaseNotes: ReleaseNotes;
  deviceInformation: DeviceInformation;
  configurationList?: ConfigurationList;
  genericAttributeList?: GenericAttributeListProduct;
  interfaceList: InterfaceList;
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

export const TEST_STATE_VALUES = ["None", "Tested", "Confirmed", "Verified"] as const;
export type TestState = (typeof TEST_STATE_VALUES)[number];

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

// Product core: Interfaces list

export type InterfaceList =
  | { modbusInterface: ModbusInterface }
  | { restApiInterface: RestApiInterface };
//  | { contactInterface: ContactInterface }
//  | { genericInterface: GenericInterface }
//  | { messagingInterface: MessagingInterface };

export const INTERFACE_TYPE_VALUES = [
  "modbusInterface",
  "restApiInterface",
  "contactInterface",
  "genericInterface",
  "messagingInterface",
] as const;
export type InterfaceType = (typeof INTERFACE_TYPE_VALUES)[number];
