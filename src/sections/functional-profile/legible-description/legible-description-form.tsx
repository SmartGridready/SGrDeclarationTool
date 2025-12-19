"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { StoreState } from "@/sections/functional-profile/functional-profile-store";

/**
 * Functional Profile specific legible description form.
 * Uses the FunctionalProfileFormContext to connect to the store.
 */
export function LegibleDescriptionForm() {
  const { useProfileState, useValidation, legibleDescriptionActions } =
    useFunctionalProfileFormContext();

  // Create a store hook adapter
  const useStore = <TSelected,>(selector: (store: StoreState) => TSelected): TSelected => {
    const profile = useProfileState((p) => p);
    const adaptedStore = {
      profile,
      ...legibleDescriptionActions,
    } as StoreState;
    return selector(adaptedStore);
  };

  return (
    <SharedLegibleDescriptionForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        legibleDescriptions: store.profile?.functionalProfile?.legibleDescription,
      })}
      isAddedSelector={(store) => !!store.profile?.functionalProfile?.legibleDescription}
      fieldPathPrefix="functionalProfile.legibleDescription"
      required={false}
      title="Legible Description"
      description="Human-readable descriptions for the functional profile (max 4)"
      maxItems={4}
    />
  );
}
