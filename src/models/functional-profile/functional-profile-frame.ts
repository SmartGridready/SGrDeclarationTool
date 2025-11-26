/**
 * Functional Profile Frame
 * Äquivalent to FunctionalProfileFrame.xsd
 */

import {
  ReleaseNotes,
  FunctionalProfileIdentification,
  AlternativeNames,
  LegibleDescription,
  GenericAttributeListFunctionalProfile,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  DataTypeFunctionalProfile,
  Units,
} from "@/models/generic";

export interface FunctionalProfileDataPoint {
  dataPoint: {
    dataPointName: string;
    dataDirection: DataDirectionFunctionalProfile;
    presenceLevel: PresenceLevel;
    dataType: DataTypeFunctionalProfile;
    unit: Units;
    arrayLength?: number;
    alternativeNames?: AlternativeNames;
    legibleDescription?: LegibleDescription[];
  };
  genericAttributeList?: GenericAttributeListFunctionalProfile;
}

export interface FunctionalProfileDataPointList {
  dataPointListElement: FunctionalProfileDataPoint[];
}

export interface FunctionalProfileFrame {
  releaseNotes?: ReleaseNotes;
  functionalProfile: {
    functionalProfileIdentification: FunctionalProfileIdentification;
    alternativeNames?: AlternativeNames;
    legibleDescription?: LegibleDescription[]; // maxOccurs="4"
  };
  genericAttributeList?: GenericAttributeListFunctionalProfile;
  dataPointList?: FunctionalProfileDataPointList;
}
