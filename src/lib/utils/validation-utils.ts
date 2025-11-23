import { z } from "zod";

/**
 * Validation result type that provides field-level error information
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Formats Zod errors into a flat object keyed by field path
 * Example: { "functionalProfile.functionalProfileIdentification.specificationOwnerIdentification": ["is required"] }
 */
export function formatFieldErrors(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  error.issues.forEach((err) => {
    const path = err.path.join(".");
    if (!fieldErrors[path]) {
      fieldErrors[path] = [];
    }
    fieldErrors[path].push(err.message);
  });

  return fieldErrors;
}

/**
 * Gets a field error message for a specific field path
 * @param fieldErrors - The field errors object from validation result
 * @param fieldPath - The path to the field (e.g., "functionalProfile.functionalProfileIdentification.specificationOwnerIdentification")
 * @returns The first error message for the field, or undefined if no error
 */
export function getFieldError(
  fieldErrors: Record<string, string[]> | undefined,
  fieldPath: string
): string | undefined {
  if (!fieldErrors) return undefined;
  const errors = fieldErrors[fieldPath];
  return errors && errors.length > 0 ? errors[0] : undefined;
}

/**
 * Checks if a field has an error
 */
export function hasFieldError(
  fieldErrors: Record<string, string[]> | undefined,
  fieldPath: string
): boolean {
  return getFieldError(fieldErrors, fieldPath) !== undefined;
}

/**
 * Generic validation function that wraps schema validation
 */
export function validateWithSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const result = schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data as T,
      };
    }

    return {
      success: false,
      errors: result.error,
      fieldErrors: formatFieldErrors(result.error),
    };
  } catch (error) {
    return {
      success: false,
      errors: error instanceof z.ZodError ? error : undefined,
      fieldErrors: {},
    };
  }
}
