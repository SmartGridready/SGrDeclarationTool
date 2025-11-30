"use client";

import { useState } from "react";
import { EditorActions } from "@/sections/shared/components/editor/editor-actions";
import { useDeviceStore } from "@/sections/device/device-store";
import { useValidationStore } from "@/sections/shared/validation-store";
import { DeviceForm } from "@/sections/device/device-form";
import { Button } from "@/sections/shared/components/shadcn/button";
import { ConfirmationDialog } from "@/sections/shared/components/editor/confirmation-dialog";
import { DEBUG } from "@/debug-config";
import { INFO_MESSAGES } from "@/sections/shared/constants/info-messages";
import { DeviceFrame } from "@/models/product/product";
import { toast } from "sonner";

export default function DeviceEditor() {
  const { device, createNew, createEmpty, clear, setDevice } = useDeviceStore();
  const resetValidation = useValidationStore((state) => state.resetValidation);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showLoadEmptyDialog, setShowLoadEmptyDialog] = useState(false);

  const handleSetDevice = (newDevice: DeviceFrame) => {
    setDevice(newDevice);
    resetValidation();
  };

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
    setShowClearDialog(false);
  };

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

      {device ? (
        <DeviceForm />
      ) : (
        <div className="text-center text-muted-foreground py-12">No Device loaded.</div>
      )}

      {DEBUG && (
        <div className="fixed bottom-4 right-4 z-50 shadow-lg">
          <Button
            onClick={() => {
              createNew();
              resetValidation();
            }}
            size="sm"
          >
            Load Sample Device
          </Button>
          <Button onClick={handleDebugPrint} size="sm" className="ml-2">
            Debug JSON
          </Button>
        </div>
      )}
    </div>
  );
}
