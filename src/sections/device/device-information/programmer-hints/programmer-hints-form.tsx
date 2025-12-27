"use client";

import { LegibleDescriptionForm as SharedLegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { DeviceFrame } from "@/models";

/**
 * Device specific programmer hints form.
 * Uses the DeviceFormContext to connect to the store.
 * Programmer hints use the same structure as legible descriptions,
 * so we reuse the LegibleDescriptionForm with an adapter.
 */
export function ProgrammerHintsForm() {
  const { useDeviceState, useValidation, deviceInformationActions, pathPrefix } =
    useDeviceFormContext();

  // Create a store hook adapter that maps ProgrammerHintsSlice to LegibleDescriptionSlice interface
  const useStore = <TSelected,>(
    selector: (store: { device?: DeviceFrame } & LegibleDescriptionSlice) => TSelected
  ): TSelected => {
    const device = useDeviceState((d) => d);

    // Map programmer hints actions to LegibleDescriptionSlice interface
    const adaptedStore: { device?: DeviceFrame } & LegibleDescriptionSlice = {
      device,
      addLegibleDescription: deviceInformationActions.addProgrammerHint,
      removeLegibleDescription: deviceInformationActions.removeProgrammerHint,
      removeAllLegibleDescriptions: deviceInformationActions.removeAllProgrammerHints,
      updateTextElement: deviceInformationActions.updateProgrammerHintTextElement,
      updateLanguage: deviceInformationActions.updateProgrammerHintLanguage,
      updateUri: deviceInformationActions.updateProgrammerHintUri,
      addEmptyLegibleDescription: deviceInformationActions.addEmptyProgrammerHint,
    };

    return selector(adaptedStore);
  };

  const fieldPathPrefix = buildDeviceFieldPath(pathPrefix, "deviceInformation.programmerHints");

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
