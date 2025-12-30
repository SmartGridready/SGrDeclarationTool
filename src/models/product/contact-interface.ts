/**
 * Contact Interface types (Product)
 * Generated from ContactInterface.xsd
 */

import { FunctionalProfileBase, DataPointBase } from "../generic";

export interface ContactsDataPointList {
  dataPointListElement: DataPointBase[]; // maxOccurs="unbounded"
}

export interface ContactFunctionalProfile extends FunctionalProfileBase {
  dataPointList: ContactsDataPointList;
}

export interface ContactFunctionalProfileList {
  functionalProfileListElement: ContactFunctionalProfile[]; // maxOccurs="unbounded"
}

export interface ContactInterfaceDescription {
  numberOfContacts: number;
  contactStabilisationTimeMs: number;
}

export interface ContactInterface {
  contactInterfaceDescription: ContactInterfaceDescription;
  functionalProfileList: ContactFunctionalProfileList;
}
