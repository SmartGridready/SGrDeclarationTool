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
 * Formats a Zod error path array into a string with bracket notation for array indices.
 * Example: ["field", 0, "subfield"] -> "field[0].subfield"
 */
function formatZodPath(pathArray: readonly (string | number)[]): string {
  return pathArray.reduce<string>((acc, segment, index) => {
    if (typeof segment === "number") {
      // Use bracket notation for array indices
      return `${acc}[${segment}]`;
    } else if (index === 0) {
      // First segment, no prefix
      return String(segment);
    } else {
      // String segment, use dot notation
      return `${acc}.${String(segment)}`;
    }
  }, "");
}

/**
 * Formats Zod errors into a flat object keyed by field path
 * Example: { "functionalProfile.functionalProfileIdentification.specificationOwnerIdentification": ["is required"] }
 * Array indices use bracket notation: { "items[0].name": ["is required"] }
 */
export function formatFieldErrors(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  error.issues.forEach((err) => {
    // Zod path is (string | number)[] but TypeScript sees it as PropertyKey[]
    const path = formatZodPath(err.path as (string | number)[]);
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
 * Gets the first field error message from validation result with full path
 * Returns a user-friendly message showing which field is missing/invalid
 * Format: "fieldPath: error message" (e.g., "deviceFrame.deviceName: is required")
 */
export function getFirstFieldError<T>(validation: ValidationResult<T>): string | undefined {
  if (validation.success) return undefined;

  // Try to get the first field error from fieldErrors
  if (validation.fieldErrors) {
    const firstFieldPath = Object.keys(validation.fieldErrors)[0];
    if (firstFieldPath) {
      const firstError = validation.fieldErrors[firstFieldPath]?.[0];
      if (firstError) {
        return `${firstFieldPath}: ${firstError}`;
      }
    }
  }

  // Fallback to first error from issues
  if (validation.errors?.issues?.[0]) {
    return validation.errors.issues[0].message;
  }

  return undefined;
}

/**
 * Generic validation function that wraps schema validation
 */
export function validateWithSchema<T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> {
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
