import { FunctionalProfileFrame } from "@/models";
import { functionalProfileFrameSchema } from "@/sections/functional-profile/functional-profile-schema";
import {
  ValidationResult,
  validateWithSchema,
} from "@/sections/shared/validation-utils";

/**
 * Validates a FunctionalProfileFrame and returns detailed field-level errors
 */
export function validateFunctionalProfileFrame(
  frame: FunctionalProfileFrame
): ValidationResult<FunctionalProfileFrame> {
  const result = validateWithSchema(functionalProfileFrameSchema, frame);
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as FunctionalProfileFrame,
    } as ValidationResult<FunctionalProfileFrame>;
  }
  return result as ValidationResult<FunctionalProfileFrame>;
}
