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
  DynamicParameterDescriptionList,
} from "@/models/generic";

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

export interface FunctionalProfileDataPointList {
  dataPointListElement: FunctionalProfileDataPoint[];
}
export interface FunctionalProfileDataPoint {
  dataPoint: {
    dataPointName: string;
    dataDirection: DataDirectionFunctionalProfile;
    presenceLevel: PresenceLevel;
    dataType: DataTypeFunctionalProfile;
    unit: Units;
    arrayLength?: number;
    parameterList?: DynamicParameterDescriptionList;
    alternativeNames?: AlternativeNames;
    legibleDescription?: LegibleDescription[]; // maxOccurs="4"
  };
  // TODO: Partially implemented - mapper and builder exist, but form UI is not yet implemented
  genericAttributeList?: GenericAttributeListFunctionalProfile;
}
