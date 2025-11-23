import { useMemo } from "react";
import { useProfileStore } from "@/store/profile-store";
import { useValidationStore } from "@/store/validation-store";
import { validateFunctionalProfileFrame } from "@/lib/validation/validators/functional-profile-frame-validator";
import { getFieldError, hasFieldError } from "@/lib/utils/validation-utils";

/**
 * Hook to get validation errors for the current profile
 * Returns field-level errors that can be used to highlight invalid fields
 * Only shows errors when validation has been attempted (e.g., on export)
 */
export function useProfileValidation() {
  const profile = useProfileStore((state) => state.profile);
  const validationAttempted = useValidationStore(
    (state) => state.validationAttempted
  );

  const validation = useMemo(() => {
    if (!profile) {
      return {
        isValid: false,
        fieldErrors: {},
      };
    }

    const result = validateFunctionalProfileFrame(profile);
    return {
      isValid: result.success,
      fieldErrors: result.fieldErrors || {},
    };
  }, [profile]);

  /**
   * Gets the error message for a specific field path
   * Only returns error if validation has been attempted
   * @param fieldPath - The path to the field (e.g., "functionalProfile.functionalProfileIdentification.specificationOwnerIdentification")
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
