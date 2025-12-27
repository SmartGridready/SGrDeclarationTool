import { z } from "zod";
import { ModbusRtu } from "@/models/product/modbus-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { serialInterfaceCapabilitySchema } from "./serial-interface-capability/serial-interface-capability-schema";

/**
 * Modbus RTU validation schemas and validators
 */

export const modbusRtuSchema = z.object({
  slaveAddr: z.string({ message: "Slave address is required" }).min(1),
  portName: z.string({ message: "Port name is required" }).min(1),
  baudRateSelected: z.string({ message: "Baud rate selected is required" }).min(1),
  byteLenSelected: z.string({ message: "Byte length selected is required" }).min(1),
  paritySelected: z.string({ message: "Parity selected is required" }).min(1),
  stopBitLenSelected: z.string({ message: "Stop bit length selected is required" }).min(1),
  serialInterfaceCapability: serialInterfaceCapabilitySchema,
});

// Type exports for TypeScript inference
export type ModbusRtuInput = z.input<typeof modbusRtuSchema>;

// Validators
export function validateModbusRtu(rtu: ModbusRtu): ValidationResult<ModbusRtu> {
  const result = validateWithSchema(modbusRtuSchema, rtu);
  return result as ValidationResult<ModbusRtu>;
}
