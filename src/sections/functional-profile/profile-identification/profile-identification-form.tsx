"use client";

import { ProfileIdentificationForm as SharedProfileIdentificationForm } from "@/sections/shared/profile-identification/profile-identification-form";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { StoreState } from "@/sections/functional-profile/functional-profile-store";

/**
 * Functional Profile specific profile identification form.
 * Uses the FunctionalProfileFormContext to connect to the store.
 */
export function ProfileIdentificationForm() {
  const { useProfileState, useValidation, profileIdentificationActions } =
    useFunctionalProfileFormContext();

  // Create a store hook adapter
  const useStore = <TSelected,>(selector: (store: StoreState) => TSelected): TSelected => {
    const profile = useProfileState((p) => p);
    const adaptedStore = {
      profile,
      ...profileIdentificationActions,
    } as StoreState;
    return selector(adaptedStore);
  };

  return (
    <SharedProfileIdentificationForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        functionalProfileIdentification:
          store.profile?.functionalProfile?.functionalProfileIdentification,
      })}
      fieldPathPrefix="functionalProfile.functionalProfileIdentification"
    />
  );
}
