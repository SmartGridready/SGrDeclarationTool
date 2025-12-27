import { ModbusDataPointConfiguration } from "@/models/product/modbus-types";
import { buildModbusDataType } from "./modbus-data-type-builder";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";

/**
 * Builds XML object for modbusDataPointConfiguration from ModbusDataPointConfiguration model
 */
export function buildModbusDataPointConfiguration(
  configuration: ModbusDataPointConfiguration
): Record<string, unknown> {
  const configurationXml: Record<string, unknown> = {
    modbusDataType: wrapInArray(buildModbusDataType(configuration.modbusDataType)),
    address: wrapInArray(configuration.address),
    registerType: wrapInArray(configuration.registerType),
    numberOfRegisters: wrapInArray(configuration.numberOfRegisters),
  };

  // Include optional bitRank
  setOptionalXmlField(configurationXml, "bitRank", configuration.bitRank);

  return configurationXml;
}
