import { z } from "zod";
import { MasterFunctionsSupportedList, MASTER_FUNCTIONS_SUPPORTED_VALUES } from "@/models/product/modbus-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Master Functions Supported List validation schemas and validators
 */

// Extract enum values from constants
const MASTER_FUNCTIONS_SUPPORTED_VALUES_ARRAY = MASTER_FUNCTIONS_SUPPORTED_VALUES as unknown as [string, ...string[]];

export const masterFunctionsSupportedListSchema = z.object({
  masterFunctionsSupported: z.array(z.enum(MASTER_FUNCTIONS_SUPPORTED_VALUES_ARRAY)),
});

// Type exports for TypeScript inference
export type MasterFunctionsSupportedListInput = z.input<typeof masterFunctionsSupportedListSchema>;

// Validators
export function validateMasterFunctionsSupportedList(
  list: MasterFunctionsSupportedList
): ValidationResult<MasterFunctionsSupportedList> {
  const result = validateWithSchema(masterFunctionsSupportedListSchema, list);
  return result as ValidationResult<MasterFunctionsSupportedList>;
}
