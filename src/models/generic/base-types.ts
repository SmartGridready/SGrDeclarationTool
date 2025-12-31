/**
 * Generic types
 * Äquivalent to BaseTypes.xsd
 */

import { LevelOfOperation } from "@/models/generic/base-type-level-of-operation-type";
import { FunctionalProfileCategory } from "@/models/generic/base-type-functional-profile-category";

// ============================================================================
// Release Management
// ============================================================================

export interface ReleaseNotes {
  state: ReleaseState;
  remarks?: string;
  changeLog?: ChangeLog[];
}

export const RELEASE_STATE_VALUES = ["Draft", "Review", "Published", "Revoked"] as const;
export type ReleaseState = (typeof RELEASE_STATE_VALUES)[number];

export interface ChangeLog {
  version: string;
  date: string; // ISO date string
  author: string;
  comment: string;
}

// ============================================================================
// Functional Profile Identification
// ============================================================================

export interface FunctionalProfileIdentification {
  specificationOwnerIdentification: SpecificationOwnerIdentification;
  functionalProfileCategory: FunctionalProfileCategory;
  functionalProfileType: string;
  levelOfOperation: LevelOfOperation;
  versionNumber: VersionNumber;
}

export type SpecificationOwnerIdentification = string;

export interface VersionNumber {
  primaryVersionNumber: number;
  secondaryVersionNumber: number;
  subReleaseVersionNumber: number;
}

// ============================================================================
// Descriptions and Names
// ============================================================================

export interface LegibleDescription {
  textElement: string; // max 4000 characters
  language: Language;
  uri?: string;
}

export const LANGUAGE_VALUES = ["de", "en", "fr", "it"] as const;
export type Language = (typeof LANGUAGE_VALUES)[number];

export interface AlternativeNames {
  sLV1Name?: string;
  workName?: string;
  manufName?: string;
  iec61850Name?: string;
  sarefName?: string;
  eebusName?: string;
  sunSpecName?: string;
  hpBwpName?: string;
  en17609Name?: string;
}

// ============================================================================
// Generic Attributes
// ============================================================================

export interface GenericAttributeFunctionalProfile {
  name: string;
}

export interface GenericAttributeListFunctionalProfile {
  genericAttributeListElement: GenericAttributeFunctionalProfile[];
}

// ============================================================================
// Data Types - Common
// ============================================================================

export type EmptyValue = "";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EmptyType {}

export const DATA_TYPE_CHOICE_VALUES = [
  "boolean",
  "int8",
  "int16",
  "int32",
  "int64",
  "int8U",
  "int16U",
  "int32U",
  "int64U",
  "float32",
  "float64",
  "dateTime",
  "string",
] as const;

export type DataTypeChoice =
  | { boolean: EmptyType }
  | { int8: EmptyType }
  | { int16: EmptyType }
  | { int32: EmptyType }
  | { int64: EmptyType }
  | { int8U: EmptyType }
  | { int16U: EmptyType }
  | { int32U: EmptyType }
  | { int64U: EmptyType }
  | { float32: EmptyType }
  | { float64: EmptyType }
  | { dateTime: EmptyType }
  | { string: EmptyType };

// ============================================================================
// Data Types - Functional Profile
// ============================================================================

export const DATA_DIRECTION_FUNCTIONAL_PROFILE_VALUES = ["R", "W", "RW"] as const;
export type DataDirectionFunctionalProfile = (typeof DATA_DIRECTION_FUNCTIONAL_PROFILE_VALUES)[number];

export const PRESENCE_LEVEL_VALUES = ["M", "R", "O"] as const;
export type PresenceLevel = (typeof PRESENCE_LEVEL_VALUES)[number];

export const DATA_TYPE_FUNCTIONAL_PROFILE_EXTENDED_VALUES = [
  ...DATA_TYPE_CHOICE_VALUES,
  "enum",
  "bitmap",
  "json",
] as const;

export type DataTypeFunctionalProfile =
  | { enum: EnumMapFunctionalProfile }
  | { bitmap: BitmapFunctionalProfile }
  | { json: JSonOutputFunctionalProfile }
  | DataTypeChoice;

// Enum for Functional Profile
export interface EnumMapFunctionalProfile {
  enumEntry?: EnumEntryRecordFunctionalProfile[];
  hexMask?: string; // hexBinary
}

export interface EnumEntryRecordFunctionalProfile {
  literal: string;
  description?: string;
}

// Bitmap for Functional Profile
export interface BitmapFunctionalProfile {
  bitmapEntry?: BitmapEntryFunctionalProfile[];
}

export interface BitmapEntryFunctionalProfile {
  literal: string;
  description?: string;
}

// JSON for Functional Profile
export interface JSonOutputFunctionalProfile {
  items?: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[];
}

export interface JSonArrayOutputFunctionalProfile {
  name?: string;
  items?: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[];
}

export type JSonElemFunctionalProfile =
  | (JSonElemFunctionalProfileBase & { date: EmptyValue })
  | (JSonElemFunctionalProfileBase & { string: EmptyValue })
  | (JSonElemFunctionalProfileBase & { number: EmptyValue });

interface JSonElemFunctionalProfileBase {
  key: string;
}

// ============================================================================
// Data Types - Product
// ============================================================================

export const DATA_DIRECTION_PRODUCT_VALUES = ["C", "R", "W", "RW", "RWP"] as const; // Constant, Read, Write, Read-Write, Read-Write-Persistent
export type DataDirectionProduct = (typeof DATA_DIRECTION_PRODUCT_VALUES)[number];

export const DATA_TYPE_PRODUCT_EXTENDED_VALUES = [...DATA_TYPE_CHOICE_VALUES, "enum", "bitmap", "json"] as const;

export type DataTypeProduct =
  | { enum: EnumMapProduct }
  | { bitmap: BitmapProduct }
  | { json: EmptyValue }
  | DataTypeChoice;

// Enum for Product
export interface EnumMapProduct {
  enumEntry: EnumEntryProductRecord[];
  hexMask?: string; // hexBinary
}

export interface EnumEntryProductRecord {
  literal: string;
  ordinal?: number;
  description?: string;
}

// Bitmap for Product
export interface BitmapProduct {
  bitmapEntry: BitmapEntryProduct[];
}

export interface BitmapEntryProduct {
  literal: string;
  hexMask: string; // hexBinary
  description?: string;
}

// ============================================================================
// Dynamic Parameters
// ============================================================================

export interface DynamicParameterDescriptionList {
  parameterListElement?: DynamicParameterDescriptionListElement[];
}

export interface DynamicParameterDescriptionListElement {
  name: string;
  dataType: DataTypeProduct;
  defaultValue?: string;
  parameterDescription?: DynamicParameterDescription[];
}

export interface DynamicParameterDescription extends LegibleDescription {
  label?: string;
}

// ============================================================================
// Units
// ============================================================================

export const UNITS_VALUES = [
  "AMPERES",
  "BARS",
  "CUBIC_METERS",
  "CUBIC_METERS_PER_SECOND",
  "DEGREES_CELSIUS",
  "DEGREES_KELVIN",
  "DEGREES_PHASE",
  "HERTZ",
  "HOURS",
  "JOULES",
  "KILOGRAMS",
  "KILOVOLT_AMPERES",
  "KILOVOLT_AMPERE_HOURS",
  "KILOVOLT_AMPERES_REACTIVE",
  "KILOVOLT_AMPERES_REACTIVE_HOURS",
  "KILOWATT_HOURS",
  "KILOWATTS",
  "METERS",
  "METERS_PER_SECOND",
  "METERS_PER_SECOND_PER_SECOND",
  "MINUTES",
  "NO_UNITS",
  "OHMS",
  "PARTS_PER_MILLION",
  "PASCALS",
  "PER_HOUR",
  "PERCENT",
  "PERCENT_RELATIVE_HUMIDITY",
  "POWER_FACTOR",
  "RADIANS",
  "RADIANS_PER_SECOND",
  "REVOLUTIONS_PER_MINUTE",
  "SECONDS",
  "SQUARE_METERS",
  "VOLT_AMPERES",
  "VOLT_AMPERES_REACTIVE",
  "VOLTS",
  "WATT_HOURS",
  "WATTS",
  "WATTS_PER_SQUARE_METER",
  "MEGAWATT_HOURS",
  "NONE",
] as const;
export type Units = (typeof UNITS_VALUES)[number];

// Device categories
export const DEVICE_CATEGORY_VALUES = [
  "Battery",
  "Compressor",
  "DeviceInformation",
  "DHWCircuit",
  "DHWStorage",
  "Dishwasher",
  "Dryer",
  "ElectricalImmersionHeater",
  "Fan",
  "GasHeatingAppliance",
  "Generic",
  "HeatingBufferStorage",
  "HeatingCircuit",
  "HeatingObject",
  "HeatingZone",
  "HeatPumpAppliance",
  "HeatSinkCircuit",
  "HeatSourceCircuit",
  "HeatSourceUnit",
  "HVACController",
  "HVACRoom",
  "InstantDHWHeater",
  "Inverter",
  "OilHeatingAppliance",
  "Pump",
  "RefrigerantCircuit",
  "SmartEnergyAppliance",
  "SolarDHWStorage",
  "SolarThermalCircuit",
  "SubMeterElectricity",
  "TemperatureSensor",
  "Washer",
  "BatterySystem",
  "ElectricityGenerationSystem",
  "ElectricityStorageSystem",
  "SGCP",
  "Household",
  "PVSystem",
  "EV",
  "EVSE",
  "ChargingStation",
  "Actuator",
  "CEM",
] as const;
export type DeviceCategory = (typeof DEVICE_CATEGORY_VALUES)[number];

export const POWER_SOURCE_VALUES = [
  "unknown",
  "mains1Phase",
  "mains3Phase",
  "mains1Phase, mains3Phase",
  "battery",
  "dc",
] as const;
export type PowerSource = (typeof POWER_SOURCE_VALUES)[number];

export interface GenericAttributeListProduct {
  genericAttributeListElement: GenericAttributeProduct[];
}

// Union type for the two possible configurations
export type GenericAttributeProduct =
  | (GenericAttributeProductBase & {
      dataType: DataTypeProduct;
      value: string;
      unit: Units;
    })
  | (GenericAttributeProductBase & {
      genericAttributeList: GenericAttributeListProductEnd;
    });

// Base interface for GenericAttributeProduct
interface GenericAttributeProductBase {
  name: string;
}

export interface GenericAttributeListProductEnd {
  genericAttributeListElement: GenericAttributeProductEnd[];
}

export interface GenericAttributeProductEnd {
  name: string;
  dataType: DataTypeProduct;
  value: string;
  unit: Units;
}

// ============================================================================
// Modbus and Serial Interface Types
// ============================================================================

export interface ScalingFactor {
  multiplicator: number;
  powerof10: number;
}

export type UnsignedIntParameter = string; // Pattern: \{\{.+\}\}|\d+
export type BooleanParameter = string; // Pattern: \{\{.+\}\}|true|false
export type AnyUri = string; // XML Schema anyURI type - represents a valid URI

// Enum for Product (used in Modbus)
export interface Enum {
  enumEntry: EnumEntry[];
  hexMask?: string; // hexBinary
}

export interface EnumEntry {
  literal: string;
  ordinal: number;
  description?: string;
}

// Serial Interface Capability
export const BAUD_RATE_VALUES = [
  "300",
  "600",
  "1200",
  "2400",
  "4800",
  "5600",
  "9600",
  "14400",
  "19200",
  "38400",
  "57600",
  "115200",
  "128000",
  "230400",
  "256000",
] as const;
export type BaudRate = (typeof BAUD_RATE_VALUES)[number];

export type BaudRateParameter = string; // Pattern: {{.+}}|300|600|...|256000

export const BYTE_LENGTH_VALUES = ["7", "8"] as const;
export type ByteLength = (typeof BYTE_LENGTH_VALUES)[number];
export type ByteLengthParameter = string; // Pattern: {{.+}}|7|8

export const PARITY_VALUES = ["EVEN", "ODD", "NONE"] as const;
export type Parity = (typeof PARITY_VALUES)[number];
export type ParityParameter = string; // Pattern: ({{.+}})|(^\d+$)|EVEN|ODD|NONE

export const STOP_BIT_LENGTH_VALUES = ["1", "1.5", "2"] as const;
export type StopBitLength = (typeof STOP_BIT_LENGTH_VALUES)[number];
export type StopBitLengthParameter = string; // Pattern: ({{.+}})|0|1|1.5|2

export interface SerialInterfaceCapability {
  baudRatesSupported: BaudRate[]; // maxOccurs="unbounded"
  byteLenSupported: ByteLength[]; // maxOccurs="unbounded"
  paritySupported: Parity[]; // maxOccurs="unbounded"
  stopBitLenSupported: StopBitLength[]; // maxOccurs="unbounded"
}

export interface ValueMapping {
  genericValue: string;
  deviceValue: string;
}

export const BOOLEAN_OPTIONS = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
] as const;

// Union type for the two possible optional configurations
export type ResponseQuery =
  | ResponseQueryBase
  | (ResponseQueryBase & {
      query: string;
    })
  | (ResponseQueryBase & {
      jmesPathMappings: JMESPathMapping;
    });

// Base interface for ResponseQuery
interface ResponseQueryBase {
  queryType: ResponseQueryType;
}

export const RESPONSE_QUERY_TYPE_VALUES = [
  "JMESPathExpression",
  "XPathExpression",
  "RegularExpression",
  "JMESPathMapping",
  "JSONataExpression",
] as const;
export type ResponseQueryType = (typeof RESPONSE_QUERY_TYPE_VALUES)[number];

export interface JMESPathMapping {
  mapping: JMESPathMappingRecord[];
}

// Message filtering and querying types
export interface JMESPathMappingRecord {
  from: string;
  to: string;
  name?: string;
}

export type MessageFilter =
  | { plaintextFilter: PlaintextFilterType }
  | { jmespathFilter: JMESPathFilterType }
  | { xpathFilter: XPathFilterType }
  | { regexFilter: RegexFilterType }
  | { jsonataFilter: JSONataFilterType };

export interface PlaintextFilterType {
  matchesRegex: string;
}

export interface JMESPathFilterType {
  query: string;
  matchesRegex: string;
}

export interface XPathFilterType {
  query: string;
  matchesRegex: string;
}

export interface JSONataFilterType {
  query: string;
  matchesRegex: string;
}

export interface RegexFilterType {
  query: string;
  matchesRegex: string;
}
