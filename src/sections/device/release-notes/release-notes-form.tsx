"use client";

import { ReleaseNotesForm as SharedReleaseNotesForm } from "@/sections/shared/release-notes/release-notes-form";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";

/**
 * Device specific release notes form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function ReleaseNotesForm() {
  const { useDeviceState, useValidation, releaseNotesActions, pathPrefix } = useDeviceFormContext();

  const device = useDeviceState((d) => d);
  const useStore = createDeviceStoreAdapter(device, releaseNotesActions);

  const fieldPathPrefix = buildDeviceFieldPath(pathPrefix, "releaseNotes");

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
      fieldPathPrefix={fieldPathPrefix}
      required={true}
    />
  );
}
