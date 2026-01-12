import { useMemo } from "react";
import { useDeviceStore } from "@/sections/device/device-store";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useValidationStore } from "@/sections/shared/validation-store";
import { validateDeviceFrame } from "@/sections/device/device-schema";
import { validateFunctionalProfileFrame } from "@/sections/functional-profile/functional-profile-schema";
import { getFieldError, hasFieldError, ValidationResult } from "@/utils/validation-utils";

/**
 * Generic validation hook that works with any data type and validator function.
 * Returns field-level errors that can be used to highlight invalid fields.
 * Only shows errors when validation has been attempted (e.g., on export).
 */
function useValidation<T>(data: T | undefined, validator: (data: T) => ValidationResult<T>) {
  const validationAttempted = useValidationStore((state) => state.validationAttempted);

  // Only run expensive validation if validation has been attempted.
  // This prevents validation from running on every keystroke.
  const validation = useMemo(() => {
    if (!data) {
      return {
        isValid: false,
        fieldErrors: {},
      };
    }

    // Skip validation if it hasn't been attempted yet - saves performance on every keystroke
    if (!validationAttempted) {
      return {
        isValid: true,
        fieldErrors: {},
      };
    }

    const result = validator(data);
    return {
      isValid: result.success,
      fieldErrors: result.fieldErrors || {},
    };
  }, [data, validationAttempted, validator]);

  /**
   * Gets the error message for a specific field path
   * Only returns error if validation has been attempted
   */
  const getError = (fieldPath: string): string | undefined => {
    if (!validationAttempted) {
      return undefined;
    }
    return getFieldError(validation.fieldErrors, fieldPath);
  };

  /**
   * Checks if a field has an error
   * Only returns true if validation has been attempted
   */
  const hasError = (fieldPath: string): boolean => {
    if (!validationAttempted) {
      return false;
    }
    return hasFieldError(validation.fieldErrors, fieldPath);
  };

  return {
    isValid: validation.isValid,
    fieldErrors: validationAttempted ? validation.fieldErrors : {},
    getError,
    hasError,
    validationAttempted,
  };
}

/**
 * Hook to get validation errors for the current device
 * Returns field-level errors that can be used to highlight invalid fields
 * Only shows errors when validation has been attempted (e.g., on export)
 */
export function useDeviceValidation() {
  const device = useDeviceStore((state) => state.device);
  return useValidation(device, validateDeviceFrame);
}

/**
 * Hook to get validation errors for the current profile
 * Returns field-level errors that can be used to highlight invalid fields
 * Only shows errors when validation has been attempted (e.g., on export)
 */
export function useProfileValidation() {
  const profile = useProfileStore((state) => state.profile);
  return useValidation(profile, validateFunctionalProfileFrame);
}
