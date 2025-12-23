/**
 * Modbus Interface types (Product)
 * Äquivalent to ModbusInterface.xsd
 */

import { FunctionalProfileBase, DataPointBase } from "@/models/generic";
import {
  ModbusAttributes,
  ModbusDataPointConfiguration,
  TimeSyncBlockNotification,
  ModbusInterfaceDescription,
} from "./ModbusTypes";

export interface ModbusDataPoint extends DataPointBase {
  modbusDataPointConfiguration?: ModbusDataPointConfiguration;
  blockCacheIdentification?: string; // refers to TimeSyncBlockNotification.blockCacheIdentification
  modbusAttributes?: ModbusAttributes;
}

export interface ModbusDataPointList {
  dataPointListElement: ModbusDataPoint[]; // maxOccurs="unbounded"
}

export interface ModbusFunctionalProfile extends FunctionalProfileBase {
  modbusAttributes?: ModbusAttributes;
  dataPointList: ModbusDataPointList;
}

export interface ModbusFunctionalProfileList {
  functionalProfileListElement: ModbusFunctionalProfile[]; // maxOccurs="unbounded"
}

export interface ModbusInterface {
  modbusInterfaceDescription: ModbusInterfaceDescription;
  modbusAttributes?: ModbusAttributes;
  functionalProfileList: ModbusFunctionalProfileList;
  timeSyncBlockNotification?: TimeSyncBlockNotification[]; // maxOccurs="unbounded"
}
