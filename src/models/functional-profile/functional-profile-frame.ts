/**
 * Functional Profile Frame
 * Äquivalent to FunctionalProfileFrame.xsd
 */

import {
  ReleaseNotes,
  FunctionalProfileIdentification,
  AlternativeNames,
} from "@/models/generic";

export interface FunctionalProfileFrame {
  releaseNotes?: ReleaseNotes;
  functionalProfile: {
    functionalProfileIdentification: FunctionalProfileIdentification;
    alternativeNames?: AlternativeNames;
    // legibleDescription?: LegibleDescription[]; // maxOccurs="4"
  };
  // genericAttributeList?: GenericAttributeListFunctionalProfile;
  // dataPointList?: FunctionalProfileDataPointList;
}
