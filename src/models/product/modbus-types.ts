/**
 * Modbus auxiliary types (Product)
 * Äquivalent to ModbusTypes.xsd
 */

import {
  ScalingFactor,
  UnsignedIntParameter,
  SerialInterfaceCapability,
  Enum,
  BitmapProduct,
  EmptyType,
} from "@/models/generic";

export interface ModbusAttributes {
  scalingFactor?: ScalingFactor;
  stepByIncrement?: number;
  sunssf?: number;
  pollingLatencyMs?: number;
  accessProtection?: AccessProtectionEnabled;
  layer6Deviation?: ModbusLayer6Deviation;
}

export interface TimeSyncBlockNotification {
  blockCacheIdentification: string;
  firstAddress: number;
  size: number;
  registerType: RegisterType;
  timeToLiveMs: number;
}

export interface ModbusInterfaceDescription {
  modbusInterfaceSelection: ModbusInterfaceSelection;
  modbusTcp?: ModbusTcp;
  modbusRtu?: ModbusRtu;
  firstRegisterAddressIsOne: boolean;
  bitOrder: BitOrder;
  masterFunctionsSupportedList?: MasterFunctionsSupportedList;
}

export const MODBUS_INTERFACE_SELECTION_VALUES = [
  "RTU",
  "TCPIP",
  "UDPIP",
  "RTU-ASCII",
  "TCPIP-ASCII",
  "UDPIP-ASCII",
  "RTU-TCPIP",
] as const;
export type ModbusInterfaceSelection = (typeof MODBUS_INTERFACE_SELECTION_VALUES)[number];

export interface ModbusDataPointConfiguration {
  modbusDataType: ModbusDataType;
  address: number;
  bitRank?: BitRank;
  registerType: RegisterType;
  numberOfRegisters: number;
}

export interface MasterFunctionsSupportedList {
  masterFunctionsSupported: MasterFunctionsSupported[]; // maxOccurs="unbounded"
}

export const MASTER_FUNCTIONS_SUPPORTED_VALUES = [
  "Primitives",
  "ReadDiscreteInputs",
  "ReadCoils",
  "WriteSingleCoil",
  "WriteMultipleCoils",
  "ReadInputRegisters",
  "ReadMultipleHoldingRegisters",
  "WriteSingleHoldingRegister",
  "WriteMultipleHoldingRegisters",
  "ReadWriteMultipleRegisters",
  "MaskWriteRegister",
  "ReadFIFOQueue",
  "ReadFileRecord",
  "WriteFileRecord",
  "ReadExceptionStatus",
  "Diagnostic",
  "GetComEventCounter",
  "GetComEventLog",
  "ReportSlaveID",
  "ReadDeviceIdentification",
] as const;
export type MasterFunctionsSupported = (typeof MASTER_FUNCTIONS_SUPPORTED_VALUES)[number];

export interface AccessProtectionEnabled {
  modbusExceptionCode: ModbusExceptionCode[]; // maxOccurs="unbounded", minOccurs="1"
  isEnabled: boolean;
}

export const MODBUS_LAYER6_DEVIATION_VALUES = ["2RegBase1000_L2H", "2RegBase1000_H2L"] as const;
export type ModbusLayer6Deviation = (typeof MODBUS_LAYER6_DEVIATION_VALUES)[number];

export interface ModbusTcp {
  port: UnsignedIntParameter;
  address: ModbusIpAddress;
  slaveId: UnsignedIntParameter;
}

export type ModbusIpAddress = string; // pattern: \d+\.\d+\.\d+\.\d+|\{\{.*\}\}

export const BIT_ORDER_VALUES = [
  "BigEndian",
  "ChangeDWordOrder",
  "ChangeWordOrder",
  "ChangeByteOrder",
  "ChangeBitOrder",
] as const;
export type BitOrder = (typeof BIT_ORDER_VALUES)[number];

export const REGISTER_TYPE_VALUES = ["Coil", "DiscreteInput", "InputRegister", "HoldRegister"] as const;
export type RegisterType = (typeof REGISTER_TYPE_VALUES)[number];

export type BitRank = number; // 0..15

export const MODBUS_EXCEPTION_CODE_VALUES = [
  "IllegalFunction",
  "IllegalAddress",
  "IllegalDataValue",
  "SlaveFailure",
  "ACK",
  "SlaveBusy",
  "NACK",
  "MemoryParityErr",
  "GtwyPathErr",
  "GtwyTargetErr",
] as const;
export type ModbusExceptionCode = (typeof MODBUS_EXCEPTION_CODE_VALUES)[number];

export interface ModbusRtu {
  slaveAddr: UnsignedIntParameter;
  portName: string;
  baudRateSelected: string; // BaudRateParameter pattern enforced externally
  byteLenSelected: string; // ByteLengthParameter
  paritySelected: string; // ParityParameter
  stopBitLenSelected: string; // StopBitLengthParameter
  serialInterfaceCapability: SerialInterfaceCapability;
}

// ModbusBoolean represents a choice: either trueValue, falseValue, or neither (empty)
export type ModbusBoolean = EmptyType | { trueValue: number } | { falseValue: number };

export const MODBUS_DATA_TYPE_VALUES = [
  "boolean",
  "int8",
  "int16",
  "int32",
  "int64",
  "int8U",
  "int16U",
  "int32U",
  "int64U",
  "float32",
  "float64",
  "dateTime",
  "string",
  "enum",
  "bitmap",
] as const;

export type ModbusDataType =
  | { boolean: ModbusBoolean }
  | { int8: EmptyType }
  | { int16: EmptyType }
  | { int32: EmptyType }
  | { int64: EmptyType }
  | { int8U: EmptyType }
  | { int16U: EmptyType }
  | { int32U: EmptyType }
  | { int64U: EmptyType }
  | { float32: EmptyType }
  | { float64: EmptyType }
  | { dateTime: EmptyType }
  | { string: EmptyType }
  | { enum: Enum }
  | { bitmap: BitmapProduct };
