import { z } from "zod";
import { ModbusTcp } from "@/models/product/modbus-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Modbus TCP validation schemas and validators
 */

// IP address pattern from XSD: \d+\.\d+\.\d+\.\d+|\{\{.*\}\}
const IP_ADDRESS_PATTERN = /^(\d+\.\d+\.\d+\.\d+|\{\{.*\}\})$/;

export const modbusTcpSchema = z.object({
  port: z.string({ message: "Port is required" }).min(1, "Port cannot be empty"),
  address: z
    .string({ message: "IP address is required" })
    .min(1, "IP address cannot be empty")
    .regex(IP_ADDRESS_PATTERN, "Must be a valid IP address (e.g., 192.168.1.1) or variable (e.g., {{ip}})"),
  slaveId: z.string({ message: "Slave ID is required" }).min(1, "Slave ID cannot be empty"),
  timeout: z.string().optional(), // type="unsignedIntParameter" minOccurs="0" in XSD
});

// Type exports for TypeScript inference
export type ModbusTcpInput = z.input<typeof modbusTcpSchema>;

// Validators
export function validateModbusTcp(tcp: ModbusTcp): ValidationResult<ModbusTcp> {
  const result = validateWithSchema(modbusTcpSchema, tcp);
  return result as ValidationResult<ModbusTcp>;
}
