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

export type ReleaseState = "Draft" | "Review" | "Published" | "Revoked";

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

export type Language = "de" | "en" | "fr" | "it";

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

export type DataDirectionFunctionalProfile = "R" | "W" | "RW";
export type PresenceLevel = "M" | "R" | "O";

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

export type Units =
  | "AMPERES"
  | "BARS"
  | "CUBIC_METERS"
  | "CUBIC_METERS_PER_SECOND"
  | "DEGREES_CELSIUS"
  | "DEGREES_KELVIN"
  | "DEGREES_PHASE"
  | "HERTZ"
  | "HOURS"
  | "JOULES"
  | "KILOGRAMS"
  | "KILOVOLT_AMPERES"
  | "KILOVOLT_AMPERE_HOURS"
  | "KILOVOLT_AMPERES_REACTIVE"
  | "KILOVOLT_AMPERES_REACTIVE_HOURS"
  | "KILOWATT_HOURS"
  | "KILOWATTS"
  | "METERS"
  | "METERS_PER_SECOND"
  | "METERS_PER_SECOND_PER_SECOND"
  | "MINUTES"
  | "NO_UNITS"
  | "OHMS"
  | "PARTS_PER_MILLION"
  | "PASCALS"
  | "PER_HOUR"
  | "PERCENT"
  | "PERCENT_RELATIVE_HUMIDITY"
  | "POWER_FACTOR"
  | "RADIANS"
  | "RADIANS_PER_SECOND"
  | "REVOLUTIONS_PER_MINUTE"
  | "SECONDS"
  | "SQUARE_METERS"
  | "VOLT_AMPERES"
  | "VOLT_AMPERES_REACTIVE"
  | "VOLTS"
  | "WATT_HOURS"
  | "WATTS"
  | "WATTS_PER_SQUARE_METER"
  | "MEGAWATT_HOURS"
  | "NONE";
