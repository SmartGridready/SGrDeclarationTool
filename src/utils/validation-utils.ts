import { z } from "zod";

/**
 * Validation result with field-level error information.
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Formats a Zod error path array into a dot-notation string.
 */
function formatZodPath(pathArray: readonly (string | number)[]): string {
  return pathArray.reduce<string>((acc, segment, index) => {
    if (typeof segment === "number") {
      return `${acc}[${segment}]`;
    } else if (index === 0) {
      return String(segment);
    } else {
      return `${acc}.${String(segment)}`;
    }
  }, "");
}

/**
 * Formats Zod errors into a flat object keyed by field path.
 * @param error - The Zod error object
 * @returns Object mapping field paths to error messages
 */
export function formatFieldErrors(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  error.issues.forEach((err) => {
    const path = formatZodPath(err.path as (string | number)[]);
    if (!fieldErrors[path]) {
      fieldErrors[path] = [];
    }
    fieldErrors[path].push(err.message);
  });

  return fieldErrors;
}

/**
 * Gets the first error message for a specific field path.
 * @param fieldErrors - The field errors object
 * @param fieldPath - The path to the field
 * @returns The first error message or undefined
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
 * Checks if a field has an error.
 */
export function hasFieldError(fieldErrors: Record<string, string[]> | undefined, fieldPath: string): boolean {
  return getFieldError(fieldErrors, fieldPath) !== undefined;
}

/**
 * Gets the first field error with its full path from a validation result.
 * @param validation - The validation result
 * @returns Formatted error string or undefined
 */
export function getFirstFieldError<T>(validation: ValidationResult<T>): string | undefined {
  if (validation.success) return undefined;

  if (validation.fieldErrors) {
    const firstFieldPath = Object.keys(validation.fieldErrors)[0];
    if (firstFieldPath) {
      const firstError = validation.fieldErrors[firstFieldPath]?.[0];
      if (firstError) {
        return `${firstFieldPath}: ${firstError}`;
      }
    }
  }

  if (validation.errors?.issues?.[0]) {
    return validation.errors.issues[0].message;
  }

  return undefined;
}

/**
 * Validates data against a Zod schema.
 * @param schema - The Zod schema
 * @param data - The data to validate
 * @returns Validation result with success status and errors
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
