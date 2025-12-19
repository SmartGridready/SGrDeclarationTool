import { useMemo } from "react";
import { useDeviceStore } from "@/sections/device/device-store";
import { useValidationStore } from "@/sections/shared/validation-store";

import { getFieldError, hasFieldError } from "@/utils/validation-utils";

/**
 * Hook to get validation errors for the current device
 * Returns field-level errors that can be used to highlight invalid fields
 * Only shows errors when validation has been attempted (e.g., on export)
 *
 * Note: Device validation schema is not yet implemented, so this currently
 * returns empty errors. This hook is provided for consistency with useProfileValidation.
 */
export function useDeviceValidation() {
  const device = useDeviceStore((state) => state.device);
  const validationAttempted = useValidationStore((state) => state.validationAttempted);

  const validation = useMemo(() => {
    if (!device) {
      return {
        isValid: false,
        fieldErrors: {},
      };
    }

    // TODO: Implement device validation schema
    // const result = validateDeviceFrame(device);
    // For now, return empty errors
    return {
      isValid: true,
      fieldErrors: {},
    };
  }, [device]);

  /**
   * Gets the error message for a specific field path
   * Only returns error if validation has been attempted
   * @param fieldPath - The path to the field (e.g., "deviceName")
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
