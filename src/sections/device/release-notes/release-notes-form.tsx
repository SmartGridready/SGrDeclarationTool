"use client";

import { ReleaseNotesForm as SharedReleaseNotesForm } from "@/sections/shared/release-notes/release-notes-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useShallow } from "zustand/react/shallow";

/**
 * Device specific release notes form.
 * Uses the device store directly.
 */
export function ReleaseNotesForm() {
  const device = useDeviceStore(useShallow((state) => state.device));
  const store = useDeviceStore.getState();
  const useStore = createDeviceStoreAdapter(device, store);
  const useValidation = useDeviceValidation;

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
