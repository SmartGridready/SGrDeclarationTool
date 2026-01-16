"use client";

import { ReleaseNotesForm as SharedReleaseNotesForm } from "@/sections/shared/release-notes/release-notes-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useHasDevice, useDeviceField } from "@/hooks/use-store-field";

/**
 * Device specific release notes form.
 * Uses the device store directly.
 *
 * Note: This form uses the adapter pattern which requires the device object.
 * The granular selector is used for the null check only.
 */
export function ReleaseNotesForm() {
  const hasDevice = useHasDevice();
  // For adapter pattern, we still need to subscribe to relevant section
  // to trigger re-renders when release notes change
  const releaseNotes = useDeviceField((d) => d?.releaseNotes);
  const store = useDeviceStore.getState();
  const device = store.device;
  const useStore = createDeviceStoreAdapter(device, store);
  const useValidation = useDeviceValidation;

  // Force re-render when releaseNotes changes by using it in render
  void releaseNotes;

  if (!hasDevice) {
    return null;
  }

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
