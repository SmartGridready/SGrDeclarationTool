/**
 * Functional Profile base types for SmartGridReady specifications
 * Äquivalent to FunctionalProfile.xsd
 */

import {
  FunctionalProfileIdentification,
  AlternativeNames,
  LegibleDescription,
  GenericAttributeListProduct,
} from "@/models/generic/base-types";

export interface FunctionalProfileBase {
  functionalProfile: FunctionalProfileDescription;
  genericAttributeList?: GenericAttributeListProduct;
}

export interface FunctionalProfileDescription {
  functionalProfileName: string;
  functionalProfileIdentification: FunctionalProfileIdentification;
  alternativeNames?: AlternativeNames;
  legibleDescription?: LegibleDescription[]; // maxOccurs="4"
  programmerHints?: LegibleDescription[]; // maxOccurs="4"
}
