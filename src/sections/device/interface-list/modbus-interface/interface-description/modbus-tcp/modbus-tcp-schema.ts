import { z } from "zod";
import { ModbusTcp, ModbusIpAddress } from "@/models/product/modbus-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Modbus TCP validation schemas and validators
 */

export const modbusTcpSchema = z.object({
  port: z.string({ message: "Port is required" }).min(1),
  address: z.string({ message: "IP address is required" }).min(1), // Pattern validation would be done separately
  slaveId: z.string({ message: "Slave ID is required" }).min(1),
});

// Type exports for TypeScript inference
export type ModbusTcpInput = z.input<typeof modbusTcpSchema>;

// Validators
export function validateModbusTcp(tcp: ModbusTcp): ValidationResult<ModbusTcp> {
  const result = validateWithSchema(modbusTcpSchema, tcp);
  return result as ValidationResult<ModbusTcp>;
}
