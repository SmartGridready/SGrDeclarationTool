import { z } from "zod";
import { InterfaceList } from "@/models/product/product";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { modbusInterfaceSchema } from "./modbus-interface/modbus-interface-schema";
import { restApiInterfaceSchema } from "./rest-api-interface/rest-api-interface-schema";
import { messagingInterfaceSchema } from "./messaging-interface/messaging-interface-schema";
import { contactInterfaceSchema } from "./contact-interface/contact-interface-schema";
import { genericInterfaceSchema } from "./generic-interface/generic-interface-schema";

/**
 * Interface List validation schemas and validators
 * Supports modbusInterface OR restApiInterface OR messagingInterface OR contactInterface OR genericInterface (union type)
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

// Contact Interface variant
const contactInterfaceListSchema = z.object({
  contactInterface: contactInterfaceSchema,
});

// Generic Interface variant
const genericInterfaceListSchema = z.object({
  genericInterface: genericInterfaceSchema,
});

// Union of all interface types
export const interfaceListSchema = z.union([
  modbusInterfaceListSchema,
  restApiInterfaceListSchema,
  messagingInterfaceListSchema,
  contactInterfaceListSchema,
  genericInterfaceListSchema,
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
