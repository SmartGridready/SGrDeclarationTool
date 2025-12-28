/**
 * REST API Interface types (Product)
 * Generated from RestApiInterface.xsd
 */

import { FunctionalProfileBase, DataPointBase } from "@/models/generic";
import {
  RestApiDataPointConfiguration,
  RestApiInterfaceDescription,
} from "@/models/product/rest-api-types";

export interface RestApiDataPoint extends DataPointBase {
  restApiDataPointConfiguration?: RestApiDataPointConfiguration;
}

export interface RestApiDataPointList {
  dataPointListElement: RestApiDataPoint[]; // maxOccurs="unbounded"
}

export interface RestApiFunctionalProfile extends FunctionalProfileBase {
  dataPointList: RestApiDataPointList;
}

export interface RestApiFunctionalProfileList {
  functionalProfileListElement: RestApiFunctionalProfile[]; // maxOccurs="unbounded"
}

export interface RestApiInterface {
  restApiInterfaceDescription: RestApiInterfaceDescription;
  functionalProfileList: RestApiFunctionalProfileList;
}
