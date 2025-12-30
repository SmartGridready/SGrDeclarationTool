import { z } from "zod";
import { InterfaceList } from "@/models/product/product";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { modbusInterfaceSchema } from "./modbus-interface/modbus-interface-schema";
import { restApiInterfaceSchema } from "./rest-api-interface/rest-api-interface-schema";
import { messagingInterfaceSchema } from "./messaging-interface/messaging-interface-schema";

/**
 * Interface List validation schemas and validators
 * Supports modbusInterface OR restApiInterface OR messagingInterface (union type)
 */

// Modbus Interface variant
const modbusInterfaceListSchema = z.object({
  modbusInterface: modbusInterfaceSchema,
});

// REST API Interface variant
const restApiInterfaceListSchema = z.object({
  restApiInterface: restApiInterfaceSchema,
});

// Messaging Interface variant
const messagingInterfaceListSchema = z.object({
  messagingInterface: messagingInterfaceSchema,
});

// Union of all interface types
export const interfaceListSchema = z.union([
  modbusInterfaceListSchema,
  restApiInterfaceListSchema,
  messagingInterfaceListSchema,
]);

// Type exports for TypeScript inference
export type InterfaceListInput = z.input<typeof interfaceListSchema>;

// Validators
export function validateInterfaceList(
  interfaceList: InterfaceList
): ValidationResult<InterfaceList> {
  const result = validateWithSchema(interfaceListSchema, interfaceList);
  return result as ValidationResult<InterfaceList>;
}
