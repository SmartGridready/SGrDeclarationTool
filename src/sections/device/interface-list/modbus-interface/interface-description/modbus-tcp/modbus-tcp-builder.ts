import { ModbusTcp } from "@/models/product/modbus-types";
import { wrapInArray } from "@/utils/builder-utils";

/**
 * Builds XML object for modbusTcp from ModbusTcp model
 */
export function buildModbusTcp(modbusTcp: ModbusTcp): Record<string, unknown> {
  const modbusTcpXml: Record<string, unknown> = {
    port: wrapInArray(modbusTcp.port),
    address: wrapInArray(modbusTcp.address),
    slaveId: wrapInArray(modbusTcp.slaveId),
  };

  return modbusTcpXml;
}
