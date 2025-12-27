import { ModbusRtu } from "@/models/product/modbus-types";
import { buildSerialInterfaceCapability } from "./serial-interface-capability/serial-interface-capability-builder";
import { wrapInArray } from "@/utils/builder-utils";
import { validateModbusRtu } from "./modbus-rtu-schema";

/**
 * Builds XML object for modbusRtu from ModbusRtu model
 * @throws Error if required fields are missing
 */
export function buildModbusRtu(modbusRtu: ModbusRtu): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateModbusRtu(modbusRtu);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for modbus RTU";
    throw new Error(errorMessage);
  }
  const modbusRtuXml: Record<string, unknown> = {
    slaveAddr: wrapInArray(modbusRtu.slaveAddr),
    portName: wrapInArray(modbusRtu.portName),
    baudRateSelected: wrapInArray(modbusRtu.baudRateSelected),
    byteLenSelected: wrapInArray(modbusRtu.byteLenSelected),
    paritySelected: wrapInArray(modbusRtu.paritySelected),
    stopBitLenSelected: wrapInArray(modbusRtu.stopBitLenSelected),
    serialInterfaceCapability: wrapInArray(
      buildSerialInterfaceCapability(modbusRtu.serialInterfaceCapability)
    ),
  };

  return modbusRtuXml;
}
