/**
 * Generic Interface types (Product)
 * Generated from GenericInterface.xsd
 */

import { FunctionalProfileBase, DataPointBase } from "../generic";

export interface GenericDataPointList {
  dataPointListElement: DataPointBase[]; // maxOccurs="unbounded"
}

export interface GenericFunctionalProfile extends FunctionalProfileBase {
  dataPointList: GenericDataPointList;
}

export interface GenericFunctionalProfileList {
  functionalProfileListElement: GenericFunctionalProfile[]; // maxOccurs="unbounded"
}

export interface GenericInterface {
  functionalProfileList: GenericFunctionalProfileList;
}
