import { ReleaseNotesForm as SharedReleaseNotesForm } from "@/sections/shared/sections/release-notes/release-notes-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/sections/shared/hooks/use-device-validation";

export function ReleaseNotesForm() {
  return (
    <SharedReleaseNotesForm
      useStore={useDeviceStore}
      useValidation={useDeviceValidation}
      stateSelector={(store) => ({
        releaseState: store.device?.releaseNotes?.state,
        remarks: store.device?.releaseNotes?.remarks,
        changeLogs: store.device?.releaseNotes?.changeLog,
      })}
      // DeviceFrame requires releaseNotes, so it's always present and cannot be added/removed
      required={true}
      fieldPathPrefix="releaseNotes"
    />
  );
}
