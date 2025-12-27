import { z } from "zod";
import { InterfaceList } from "@/models/product/product";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { modbusInterfaceSchema } from "./modbus-interface/modbus-interface-schema";

/**
 * Interface List validation schemas and validators
 * Currently only supports modbusInterface, but structured to allow other interface types
 */

export const interfaceListSchema = z.object({
  modbusInterface: modbusInterfaceSchema,
});

// Type exports for TypeScript inference
export type InterfaceListInput = z.input<typeof interfaceListSchema>;

// Validators
export function validateInterfaceList(
  interfaceList: InterfaceList
): ValidationResult<InterfaceList> {
  const result = validateWithSchema(interfaceListSchema, interfaceList);
  return result as ValidationResult<InterfaceList>;
}
