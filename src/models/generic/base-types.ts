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

export interface GenericAttributeListFunctionalProfile {
  genericAttributeListElement: GenericAttributeFunctionalProfile[];
}

export interface GenericAttributeFunctionalProfile {
  name: string;
}
