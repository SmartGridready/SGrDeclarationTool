"use client";

import { useEffect, useState } from "react";
import { EditorActions } from "@/sections/shared/components/editor/editor-actions";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useValidationStore } from "@/sections/shared/validation-store";
import { FunctionalProfileForm } from "@/sections/functional-profile/functional-profile-form";
import { Button } from "@/sections/shared/components/shadcn/button";
import { ConfirmationDialog } from "@/sections/shared/components/editor/confirmation-dialog";
import { useFileImport } from "@/sections/shared/hooks/use-file-import";
import { useFileExport } from "@/sections/shared/hooks/use-file-export";
import { parseFunctionalProfile } from "@/sections/functional-profile/functional-profile-mapper";
import { buildFunctionalProfileToXml } from "@/sections/functional-profile/functional-profile-builder";
import { DEBUG } from "@/debug-config";
import { ERROR_MESSAGES } from "@/sections/functional-profile/functional-profile-error-messages";
import { INFO_MESSAGES } from "@/sections/functional-profile/functional-profile-info-messages";
import { toast } from "sonner";

export default function FunctionalProfileEditor() {
  const { profile, createNew, createEmpty, clear, setProfile } =
    useProfileStore();
  const resetValidation = useValidationStore((state) => state.resetValidation);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showLoadEmptyDialog, setShowLoadEmptyDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);

  // Reset validation when profile changes
  useEffect(() => {
    resetValidation();
  }, [profile, resetValidation]);

  const { importFile, inputRef, handleFileChange, accept } = useFileImport({
    parser: parseFunctionalProfile,
    onSuccess: setProfile,
    accept: ".xml",
  });

  const { exportFile } = useFileExport({
    builder: buildFunctionalProfileToXml,
    data: profile,
    filename: "functional-profile.xml",
    errorMessage: ERROR_MESSAGES.FILE_EXPORT.PROFILE_REQUIRED,
  });

  const handleImport = () => {
    if (profile) {
      setShowImportDialog(true);
    } else {
      importFile();
    }
  };

  const confirmImport = () => {
    setShowImportDialog(false);
    importFile();
  };

  const handleEmptyProfile = () => {
    if (profile) {
      setShowLoadEmptyDialog(true);
    } else {
      createEmpty();
      toast.info(INFO_MESSAGES.PROFILE.EMPTY_LOADED);
    }
  };

  const confirmLoadEmpty = () => {
    createEmpty();
    toast.info(INFO_MESSAGES.PROFILE.EMPTY_LOADED);
    setShowLoadEmptyDialog(false);
  };

  const handleClear = () => {
    if (profile) {
      setShowClearDialog(true);
    } else {
      clear();
    }
  };

  const confirmClear = () => {
    clear();
    setShowClearDialog(false);
  };

  const handleDebugPrint = () => {
    if (profile) {
      const jsonString = JSON.stringify(profile, null, 2);
      console.log("Current Profile:", jsonString);
      console.log("Profile Object:", profile);
    } else {
      console.log("No profile loaded");
    }
  };

  return (
    <div className="space-y-6">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        aria-label="Import XML file"
      />
      <EditorActions
        title="Functional Profile Editor"
        onEmpty={handleEmptyProfile}
        onClear={handleClear}
        onImportFromFilesystem={handleImport}
        onExport={exportFile}
        emptyButtonLabel="Load Empty Profile"
      />

      <ConfirmationDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        title="Clear Profile"
        description="Current profile will not be saved. Are you sure you want to clear the current profile?"
        confirmLabel="Clear"
        onConfirm={confirmClear}
      />

      <ConfirmationDialog
        open={showLoadEmptyDialog}
        onOpenChange={setShowLoadEmptyDialog}
        title="Load Empty Profile"
        description="Current profile will not be saved. Are you sure you want to load an empty profile?"
        confirmLabel="Load Empty"
        onConfirm={confirmLoadEmpty}
      />

      <ConfirmationDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        title="Import Profile"
        description="Current profile will not be saved. Are you sure you want to import a new profile?"
        confirmLabel="Import"
        onConfirm={confirmImport}
      />

      {profile ? (
        <FunctionalProfileForm />
      ) : (
        <div className="text-center text-muted-foreground py-12">
          No Profile loaded.
        </div>
      )}

      {DEBUG && (
        <div className="fixed bottom-4 right-4 z-50 shadow-lg">
          <Button onClick={createNew} size="sm">
            Load Sample Profile
          </Button>
          <Button onClick={handleDebugPrint} size="sm" className="ml-2">
            Debug JSON
          </Button>
        </div>
      )}
    </div>
  );
}
