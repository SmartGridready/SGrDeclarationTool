"use client";

import { useState, useEffect } from "react";

import { useDeviceStore } from "@/sections/device/device-store";
import { useValidationStore } from "@/sections/shared/validation-store";
import { DeviceForm } from "@/sections/device/device-form";

import { fetchDevices, fetchDeviceXml, LibraryItem } from "@/utils/library-api";
import { DeviceFrame } from "@/models";
import { DEBUG } from "@/debug-config";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { SUCCESS_MESSAGES } from "@/constants/success-messages";
import { INFO_MESSAGES } from "@/constants/info-messages";
import { toast } from "sonner";
import { EditorActions } from "@/components/editor/editor-actions";
import { ConfirmationDialog } from "@/components/editor/confirmation-dialog";
import { LibraryImportModal } from "@/components/editor/library-import-modal";
import { Button } from "@/components/shadcn/button";

// Placeholder function for device parsing - to be implemented when device mapper is created
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function parseDevice(_xmlString: string): Promise<DeviceFrame> {
  // TODO: Implement device mapper similar to parseFunctionalProfile
  throw new Error("Device mapper not yet implemented. Please use filesystem import for now.");
}

export default function DeviceEditor() {
  const { device, createEmpty, clear, setDevice } = useDeviceStore();
  const resetValidation = useValidationStore((state) => state.resetValidation);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showLoadEmptyDialog, setShowLoadEmptyDialog] = useState(false);
  const [showLibraryImportDialog, setShowLibraryImportDialog] = useState(false);
  const [showLibraryImportConfirmation, setShowLibraryImportConfirmation] = useState(false);
  const [libraryDevices, setLibraryDevices] = useState<LibraryItem[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState<string | null>(null);
  const [deviceIdentifier, setDeviceIdentifier] = useState<string | null>(null);

  const handleEmptyDevice = () => {
    if (device) {
      setShowLoadEmptyDialog(true);
    } else {
      createEmpty();
      resetValidation();
      toast.info(INFO_MESSAGES.PROFILE.EMPTY_LOADED);
    }
  };

  const confirmLoadEmpty = () => {
    createEmpty();
    resetValidation();
    toast.info(INFO_MESSAGES.PROFILE.EMPTY_LOADED);
    setShowLoadEmptyDialog(false);
  };

  const handleClear = () => {
    if (device) {
      setShowClearDialog(true);
    } else {
      clear();
      resetValidation();
    }
  };

  const confirmClear = () => {
    clear();
    resetValidation();
    setDeviceIdentifier(null);
    setShowClearDialog(false);
  };

  const handleLibraryImport = () => {
    if (device) {
      setShowLibraryImportConfirmation(true);
    } else {
      setShowLibraryImportDialog(true);
      loadLibraryDevices();
    }
  };

  const confirmLibraryImport = () => {
    setShowLibraryImportConfirmation(false);
    setShowLibraryImportDialog(true);
    loadLibraryDevices();
  };

  const loadLibraryDevices = async () => {
    setLibraryLoading(true);
    setLibraryError(null);
    try {
      const devices = await fetchDevices();
      setLibraryDevices(devices);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setLibraryError(message);
      toast.error(ERROR_MESSAGES.FILE_IMPORT.FAILED, {
        description: message,
      });
    } finally {
      setLibraryLoading(false);
    }
  };

  const handleLibraryDeviceSelect = async (selectedItem: LibraryItem) => {
    const loadingToast = toast.loading("Importing from library...", {
      description: "Fetching and parsing device",
    });

    try {
      // Fetch XML from API using identifier
      const xmlSource = await fetchDeviceXml(selectedItem.identifier);

      // Parse and set device
      const parsedDevice = await parseDevice(xmlSource);
      setDevice(parsedDevice);
      resetValidation();
      setDeviceIdentifier(selectedItem.identifier);

      toast.dismiss(loadingToast);
      toast.success(SUCCESS_MESSAGES.FILE_IMPORT.SUCCESS, {
        description: `Imported ${selectedItem.identifier} from library`,
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error instanceof Error ? error.message : ERROR_MESSAGES.FILE_IMPORT.UNKNOWN_ERROR;
      toast.error(ERROR_MESSAGES.FILE_IMPORT.FAILED, {
        description: errorMessage,
        duration: 5000,
      });
    }
  };

  // Load devices when library dialog opens
  useEffect(() => {
    if (
      showLibraryImportDialog &&
      libraryDevices.length === 0 &&
      !libraryLoading &&
      !libraryError
    ) {
      loadLibraryDevices();
    }
  }, [showLibraryImportDialog, libraryDevices.length, libraryLoading, libraryError]);

  const handleDebugPrint = () => {
    if (device) {
      const jsonString = JSON.stringify(device, null, 2);
      console.log("Current Device:", jsonString);
      console.log("Device Object:", device);
    } else {
      console.log("No device loaded");
    }
  };

  return (
    <div className="space-y-6">
      <EditorActions
        title="Device Editor"
        onEmpty={handleEmptyDevice}
        onClear={handleClear}
        onImportFromFilesystem={() => {
          toast.info("Import functionality will be implemented with mapper");
        }}
        onImportFromLibrary={handleLibraryImport}
        onExport={() => {
          toast.info("Export functionality will be implemented with builder");
        }}
        emptyButtonLabel="Load Empty Device"
      />

      <ConfirmationDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        title="Clear Device"
        description="Current device will not be saved. Are you sure you want to clear the current device?"
        confirmLabel="Clear"
        onConfirm={confirmClear}
      />

      <ConfirmationDialog
        open={showLoadEmptyDialog}
        onOpenChange={setShowLoadEmptyDialog}
        title="Load Empty Device"
        description="Current device will not be saved. Are you sure you want to load an empty device?"
        confirmLabel="Load Empty"
        onConfirm={confirmLoadEmpty}
      />

      <ConfirmationDialog
        open={showLibraryImportConfirmation}
        onOpenChange={setShowLibraryImportConfirmation}
        title="Import from Library"
        description="Current device will not be saved. Are you sure you want to import a device from the library?"
        confirmLabel="Import"
        onConfirm={confirmLibraryImport}
      />

      <LibraryImportModal
        open={showLibraryImportDialog}
        onOpenChange={setShowLibraryImportDialog}
        title="Import from Library"
        description="Select a device from the library to import"
        profiles={libraryDevices}
        loading={libraryLoading}
        error={libraryError}
        onSelect={handleLibraryDeviceSelect}
        confirmLabel="Import"
        searchPlaceholder="Search devices..."
      />

      {deviceIdentifier && (
        <div className="text-center text-muted-foreground py-2">{deviceIdentifier}</div>
      )}

      {device ? (
        <DeviceForm />
      ) : (
        <div className="text-center text-muted-foreground py-12">No Device loaded.</div>
      )}

      {DEBUG && (
        <div className="fixed bottom-4 right-4 z-50 shadow-lg">
          <Button onClick={handleDebugPrint} size="sm" className="ml-2">
            Debug JSON
          </Button>
        </div>
      )}
    </div>
  );
}
