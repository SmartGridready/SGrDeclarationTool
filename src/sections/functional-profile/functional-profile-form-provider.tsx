"use client";

import { ReactNode, useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  FunctionalProfileFormProvider,
  FunctionalProfileFormContextValue,
} from "@/context/functional-profile-form-context";
import { useProfileStore, ProfileStoreState } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";

interface StandaloneFunctionalProfileFormProviderProps {
  children: ReactNode;
}

/**
 * Custom hook for standalone profile state selection with shallow comparison.
 * Uses useShallow to prevent infinite loops when selectors return objects.
 * Defined at module level so it's a stable reference.
 */
function useStandaloneProfileState<T>(selector: (profile: ProfileStoreState["profile"]) => T): T {
  // Use useShallow to do shallow comparison of returned objects
  return useProfileStore(useShallow((state) => selector(state.profile)));
}

/**
 * Provider for standalone FunctionalProfile editor.
 * Wraps the useProfileStore to provide the FunctionalProfileFormContext.
 */
export function StandaloneFunctionalProfileFormProvider({ children }: StandaloneFunctionalProfileFormProviderProps) {
  // Get the store instance once and cache it in a ref.
  // Actions are stable function references in Zustand, so we only need to get them once.
  // Using getState() doesn't subscribe to changes, preventing re-renders on state updates.
  const storeRef = useRef<ProfileStoreState | null>(null);
  if (!storeRef.current) {
    storeRef.current = useProfileStore.getState();
  }
  const store = storeRef.current;

  // Create the context value - pass store slices directly instead of explicit action mapping
  // Store actions are stable, so this memo will only recreate if the store reference changes (which it won't)
  const contextValue = useMemo<FunctionalProfileFormContextValue>(() => {
    return {
      // State selector hook - stable reference defined at module level
      useProfileState: useStandaloneProfileState,

      // Validation hook
      useValidation: useProfileValidation,

      // No prefix for standalone profile
      pathPrefix: "",

      // Pass store slices directly - store already implements these interfaces
      // Actions are stable function references, so passing the store object is safe
      releaseNotesActions: store,
      profileIdentificationActions: store,
      alternativeNamesActions: store,
      legibleDescriptionActions: store,
      genericAttributeListActions: store,
      dataPointListActions: store,
    };
  }, [store]);

  return <FunctionalProfileFormProvider value={contextValue}>{children}</FunctionalProfileFormProvider>;
}
