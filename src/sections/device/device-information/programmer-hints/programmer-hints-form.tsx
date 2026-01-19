"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { DeviceFrame } from "@/models";
import { useHasDevice, useDeviceField } from "@/hooks/use-store-field";

/**
 * Device specific programmer hints form.
 * Uses the device store directly.
 * Programmer hints use the same structure as legible descriptions,
 * so we reuse the LegibleDescriptionForm with an adapter.
 */
export function ProgrammerHintsForm() {
  const hasDevice = useHasDevice();
  // Subscribe only to programmerHints section for targeted re-renders
  const programmerHints = useDeviceField((d) => d?.deviceInformation?.programmerHints);

  // Create a store hook adapter that maps ProgrammerHintsSlice to LegibleDescriptionSlice interface
  const useStore = <TSelected,>(
    selector: (store: { device?: DeviceFrame } & LegibleDescriptionSlice) => TSelected
  ): TSelected => {
    const store = useDeviceStore.getState();

    // Map programmer hints actions to LegibleDescriptionSlice interface
    const adaptedStore: { device?: DeviceFrame } & LegibleDescriptionSlice = {
      device: store.device,
      addLegibleDescription: store.addProgrammerHint,
      removeLegibleDescription: store.removeProgrammerHint,
      removeAllLegibleDescriptions: store.removeAllProgrammerHints,
      updateTextElement: store.updateProgrammerHintTextElement,
      updateLanguage: store.updateProgrammerHintLanguage,
      updateUri: store.updateProgrammerHintUri,
      addEmptyLegibleDescription: store.addEmptyProgrammerHint,
    };

    return selector(adaptedStore);
  };

  void programmerHints;

  const useValidation = useDeviceValidation;
  const fieldPathPrefix = "deviceInformation.programmerHints";

  if (!hasDevice) {
    return null;
  }

  return (
    <SharedLegibleDescriptionForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        legibleDescriptions: store.device?.deviceInformation?.programmerHints,
      })}
      isAddedSelector={(store) => !!store.device?.deviceInformation?.programmerHints}
      fieldPathPrefix={fieldPathPrefix}
      required={false}
      title="Programmer Hints"
      description="Technical hints for programmers implementing this device (max 4)"
      nested={true}
      maxItems={4}
    />
  );
}
