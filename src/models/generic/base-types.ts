/**
 * Generic types
 * Äquivalent to BaseTypes.xsd
 */

import { LevelOfOperation } from "@/models/generic/base-type-level-of-operation-type";
import { FunctionalProfileCategory } from "@/models/generic/base-type-functional-profile-category";

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

export interface GenericAttributeFunctionalProfile {
  name: string;
}

export interface GenericAttributeListFunctionalProfile {
  genericAttributeListElement: GenericAttributeFunctionalProfile[];
}

// Data Point types for Functional Profile
export type DataDirectionFunctionalProfile = "R" | "W" | "RW";
export type PresenceLevel = "M" | "R" | "O";

export type DataTypeFunctionalProfile =
  | "boolean"
  | "int8"
  | "int16"
  | "int32"
  | "int64"
  | "int8U"
  | "int16U"
  | "int32U"
  | "int64U"
  | "float32"
  | "float64"
  | "dateTime"
  | "string";

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
