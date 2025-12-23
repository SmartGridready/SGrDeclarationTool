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

export type ModbusInterfaceSelection =
  | "RTU"
  | "TCPIP"
  | "UDPIP"
  | "RTU-ASCII"
  | "TCPIP-ASCII"
  | "UDPIP-ASCII"
  | "RTU-TCPIP";

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

export type MasterFunctionsSupported =
  | "Primitives"
  | "ReadDiscreteInputs"
  | "ReadCoils"
  | "WriteSingleCoil"
  | "WriteMultipleCoils"
  | "ReadInputRegisters"
  | "ReadMultipleHoldingRegisters"
  | "WriteSingleHoldingRegister"
  | "WriteMultipleHoldingRegisters"
  | "ReadWriteMultipleRegisters"
  | "MaskWriteRegister"
  | "ReadFIFOQueue"
  | "ReadFileRecord"
  | "WriteFileRecord"
  | "ReadExceptionStatus"
  | "Diagnostic"
  | "GetComEventCounter"
  | "GetComEventLog"
  | "ReportSlaveID"
  | "ReadDeviceIdentification";

export interface AccessProtectionEnabled {
  modbusExceptionCode: ModbusExceptionCode[]; // maxOccurs="unbounded", minOccurs="1"
  isEnabled: boolean;
}

export type ModbusLayer6Deviation = "2RegBase1000_L2H" | "2RegBase1000_H2L";

export interface ModbusTcp {
  port: UnsignedIntParameter;
  address: ModbusIpAddress;
  slaveId: UnsignedIntParameter;
}

export type ModbusIpAddress = string; // pattern: \d+\.\d+\.\d+\.\d+|\{\{.*\}\}

export type BitOrder =
  | "BigEndian"
  | "ChangeDWordOrder"
  | "ChangeWordOrder"
  | "ChangeByteOrder"
  | "ChangeBitOrder";

export type RegisterType = "Coil" | "DiscreteInput" | "InputRegister" | "HoldRegister";

export type BitRank = number; // 0..15

export type ModbusExceptionCode =
  | "IllegalFunction"
  | "IllegalAddress"
  | "IllegalDataValue"
  | "SlaveFailure"
  | "ACK"
  | "SlaveBusy"
  | "NACK"
  | "MemoryParityErr"
  | "GtwyPathErr"
  | "GtwyTargetErr";

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
