import { z } from "zod";
import { ModbusFunctionalProfileList, ModbusFunctionalProfile } from "@/models/product/modbus-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { functionalProfileBaseSchema } from "@/sections/shared/functional-profile-base/functional-profile-base-schema";
import { modbusAttributesSchema } from "@/sections/shared/modbus-attributes/modbus-attributes-schema";
import { modbusDataPointListSchema } from "./data-point-list/modbus-data-point-list-schema";

/**
 * Modbus Functional Profile List validation schemas and validators
 */

// Modbus Functional Profile Schema (extends FunctionalProfileBase)
export const modbusFunctionalProfileSchema = functionalProfileBaseSchema.extend({
  modbusAttributes: modbusAttributesSchema.optional(),
  dataPointList: modbusDataPointListSchema,
});

// Modbus Functional Profile List Schema
// functionalProfileListElement has maxOccurs="unbounded" with no minOccurs (defaults to 1), so at least one entry is required
export const modbusFunctionalProfileListSchema = z.object({
  functionalProfileListElement: z
    .array(modbusFunctionalProfileSchema)
    .min(1, "At least one functional profile is required"),
});

// Type exports for TypeScript inference
export type ModbusFunctionalProfileInput = z.input<typeof modbusFunctionalProfileSchema>;
export type ModbusFunctionalProfileListInput = z.input<typeof modbusFunctionalProfileListSchema>;

// Validators
export function validateModbusFunctionalProfile(
  functionalProfile: ModbusFunctionalProfile
): ValidationResult<ModbusFunctionalProfile> {
  const result = validateWithSchema(modbusFunctionalProfileSchema, functionalProfile);
  return result as ValidationResult<ModbusFunctionalProfile>;
}

export function validateModbusFunctionalProfileList(
  functionalProfileList: ModbusFunctionalProfileList
): ValidationResult<ModbusFunctionalProfileList> {
  const result = validateWithSchema(modbusFunctionalProfileListSchema, functionalProfileList);
  return result as ValidationResult<ModbusFunctionalProfileList>;
}
