import { useMemo } from "react";
import { useDeviceStore } from "@/sections/device/device-store";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useValidationStore } from "@/sections/shared/validation-store";
import { validateDeviceFrame } from "@/sections/device/device-schema";
import { validateFunctionalProfileFrame } from "@/sections/functional-profile/functional-profile-schema";
import { getFieldError, hasFieldError, ValidationResult } from "@/utils/validation-utils";

/**
 * Generic validation hook that provides field-level errors.
 * Only runs validation after it has been attempted (e.g., on export).
 */
function useValidation<T>(data: T | undefined, validator: (data: T) => ValidationResult<T>) {
  const validationAttempted = useValidationStore((state) => state.validationAttempted);

  const validation = useMemo(() => {
    if (!data) {
      return {
        isValid: false,
        fieldErrors: {},
      };
    }

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
   * Gets the error message for a specific field path.
   */
  const getError = (fieldPath: string): string | undefined => {
    if (!validationAttempted) {
      return undefined;
    }
    return getFieldError(validation.fieldErrors, fieldPath);
  };

  /**
   * Checks if a field has an error.
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
 * Hook to get validation errors for the current device.
 */
export function useDeviceValidation() {
  const device = useDeviceStore((state) => state.device);
  return useValidation(device, validateDeviceFrame);
}

/**
 * Hook to get validation errors for the current profile.
 */
export function useProfileValidation() {
  const profile = useProfileStore((state) => state.profile);
  return useValidation(profile, validateFunctionalProfileFrame);
}
