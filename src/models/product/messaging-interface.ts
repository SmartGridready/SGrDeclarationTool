/**
 * Messaging Interface types (Product)
 * Generated from MessagingInterface.xsd
 */

import { FunctionalProfileBase, DataPointBase } from "@/models/generic";
import {
  MessagingDataPointConfiguration,
  MessagingInterfaceDescription,
} from "@/models/product/messaging-types";

export interface MessagingDataPoint extends DataPointBase {
  messagingDataPointConfiguration: MessagingDataPointConfiguration;
}

export interface MessageDataPointList {
  dataPointListElement: MessagingDataPoint[]; // maxOccurs="unbounded"
}

export interface MessagingFunctionalProfile extends FunctionalProfileBase {
  dataPointList: MessageDataPointList;
}

export interface MessagingFunctionalProfileList {
  functionalProfileListElement: MessagingFunctionalProfile[]; // maxOccurs="unbounded"
}

export interface MessagingInterface {
  messagingInterfaceDescription: MessagingInterfaceDescription;
  functionalProfileList: MessagingFunctionalProfileList;
}
