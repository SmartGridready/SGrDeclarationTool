import { ModbusDataPointConfiguration } from "@/models/product/modbus-types";
import { buildModbusDataType } from "./modbus-data-type-builder";
import { wrapInArray } from "@/utils/builder-utils";
import { validateModbusDataPointConfiguration } from "./modbus-data-point-configuration-schema";

/**
 * Builds XML object for modbusDataPointConfiguration from ModbusDataPointConfiguration model
 * @throws Error if required fields are missing
 */
export function buildModbusDataPointConfiguration(
  configuration: ModbusDataPointConfiguration
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateModbusDataPointConfiguration(configuration);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || "Validation failed for modbus data point configuration";
    throw new Error(errorMessage);
  }
  const configurationXml: Record<string, unknown> = {
    modbusDataType: wrapInArray(buildModbusDataType(configuration.modbusDataType)),
    address: wrapInArray(configuration.address),
  };

  // Include optional bitRank (must come after address, before registerType)
  if (configuration.bitRank !== undefined) {
    configurationXml.bitRank = wrapInArray(configuration.bitRank);
  }

  // Required fields (must come after bitRank)
  configurationXml.registerType = wrapInArray(configuration.registerType);
  configurationXml.numberOfRegisters = wrapInArray(configuration.numberOfRegisters);

  return configurationXml;
}
