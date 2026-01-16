import { ModbusTcp } from "@/models/product/modbus-types";
import { wrapInArray } from "@/utils/builder-utils";
import { validateModbusTcp } from "./modbus-tcp-schema";

/**
 * Builds XML object for modbusTcp from ModbusTcp model
 * @throws Error if required fields are missing
 */
export function buildModbusTcp(modbusTcp: ModbusTcp): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateModbusTcp(modbusTcp);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for modbus TCP";
    throw new Error(errorMessage);
  }
  const modbusTcpXml: Record<string, unknown> = {
    port: wrapInArray(modbusTcp.port),
    address: wrapInArray(modbusTcp.address),
    slaveId: wrapInArray(modbusTcp.slaveId),
  };

  // Only include timeout if it's defined (it's optional)
  if (modbusTcp.timeout !== undefined) {
    modbusTcpXml.timeout = wrapInArray(modbusTcp.timeout);
  }

  return modbusTcpXml;
}
