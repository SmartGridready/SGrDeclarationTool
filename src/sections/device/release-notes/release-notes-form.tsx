"use client";

import { ReleaseNotesForm as SharedReleaseNotesForm } from "@/sections/shared/release-notes/release-notes-form";
import { useDeviceFormContext } from "@/context/device-form-context";
import { DeviceStoreState } from "@/sections/device/device-store";

/**
 * Device specific release notes form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function ReleaseNotesForm() {
  const { useDeviceState, useValidation, releaseNotesActions } = useDeviceFormContext();

  // Create a store hook adapter
  const useStore = <TSelected,>(selector: (store: DeviceStoreState) => TSelected): TSelected => {
    const device = useDeviceState((d) => d);
    const adaptedStore = {
      device,
      ...releaseNotesActions,
    } as DeviceStoreState;
    return selector(adaptedStore);
  };

  return (
    <SharedReleaseNotesForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        releaseState: store.device?.releaseNotes?.state,
        remarks: store.device?.releaseNotes?.remarks,
        changeLogs: store.device?.releaseNotes?.changeLog,
      })}
      isAddedSelector={(store) => !!store.device?.releaseNotes}
      fieldPathPrefix="releaseNotes"
      required={true}
    />
  );
}
