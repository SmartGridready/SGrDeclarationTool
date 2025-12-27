import { ModbusRtu } from "@/models/product/modbus-types";
import { buildSerialInterfaceCapability } from "./serial-interface-capability/serial-interface-capability-builder";
import { wrapInArray } from "@/utils/builder-utils";

/**
 * Builds XML object for modbusRtu from ModbusRtu model
 */
export function buildModbusRtu(modbusRtu: ModbusRtu): Record<string, unknown> {
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
