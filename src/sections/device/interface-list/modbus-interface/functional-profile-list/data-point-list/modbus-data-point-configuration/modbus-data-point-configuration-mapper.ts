import {
  ModbusDataPointConfiguration,
  ModbusDataType,
  RegisterType,
  BitRank,
} from "@/models/product/modbus-types";
import {
  getNumberValue,
  getOptionalNumberValue,
  getTypedValue,
  getFirstElement,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";
import { mapModbusDataType } from "./modbus-data-type-mapper";

/**
 * Maps XML modbusDataPointConfiguration to ModbusDataPointConfiguration model
 */
export function mapModbusDataPointConfiguration(
  configurationXml: Xml2JsObject | undefined
): ModbusDataPointConfiguration {
  if (!configurationXml) {
    throw new Error("modbusDataPointConfiguration is required");
  }

  const modbusDataTypeXml = getFirstElement(configurationXml, "modbusDataType");
  if (!modbusDataTypeXml) {
    throw new Error("modbusDataType is required in modbusDataPointConfiguration");
  }

  const configuration: ModbusDataPointConfiguration = {
    modbusDataType: mapModbusDataType(modbusDataTypeXml),
    address: getNumberValue(configurationXml, "address", 0),
    registerType: getTypedValue<RegisterType>(configurationXml, "registerType", "HoldRegister"),
    numberOfRegisters: getNumberValue(configurationXml, "numberOfRegisters", 1),
  };

  // Map optional bitRank
  setOptionalField(
    configuration,
    "bitRank",
    getOptionalNumberValue(configurationXml, "bitRank") as BitRank | undefined
  );

  return configuration;
}
