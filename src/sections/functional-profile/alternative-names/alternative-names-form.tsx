"use client";

import { AlternativeNamesForm as SharedAlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { StoreState } from "@/sections/functional-profile/functional-profile-store";

/**
 * Functional Profile specific alternative names form.
 * Uses the FunctionalProfileFormContext to connect to the store.
 */
export function AlternativeNamesForm() {
  const { useProfileState, useValidation, alternativeNamesActions } =
    useFunctionalProfileFormContext();

  // Create a store hook adapter
  const useStore = <TSelected,>(selector: (store: StoreState) => TSelected): TSelected => {
    const profile = useProfileState((p) => p);
    const adaptedStore = {
      profile,
      ...alternativeNamesActions,
    } as StoreState;
    return selector(adaptedStore);
  };

  return (
    <SharedAlternativeNamesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        alternativeNames: store.profile?.functionalProfile?.alternativeNames,
      })}
      isAddedSelector={(store) => !!store.profile?.functionalProfile?.alternativeNames}
      fieldPathPrefix="functionalProfile.alternativeNames"
      required={false}
      title="Alternative Names"
      description="Alternative naming conventions for the functional profile"
    />
  );
}
