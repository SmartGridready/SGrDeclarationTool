"use client";

import { useState, useEffect } from "react";
import { EditorActions } from "@/sections/shared/components/editor/editor-actions";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useValidationStore } from "@/sections/shared/validation-store";
import { FunctionalProfileForm } from "@/sections/functional-profile/functional-profile-form";
import { Button } from "@/sections/shared/components/shadcn/button";
import { ConfirmationDialog } from "@/sections/shared/components/editor/confirmation-dialog";
import { LibraryImportModal } from "@/sections/shared/components/editor/library-import-modal";
import { useFileImport } from "@/sections/shared/hooks/use-file-import";
import { useFileExport } from "@/sections/shared/hooks/use-file-export";
import { parseFunctionalProfile } from "@/sections/functional-profile/functional-profile-mapper";
import { buildFunctionalProfileToXml } from "@/sections/functional-profile/functional-profile-builder";
import {
  fetchFunctionalProfiles,
  fetchFunctionalProfileXml,
  LibraryItem,
} from "@/sections/shared/utils/library-api";
import { DEBUG } from "@/debug-config";
import { ERROR_MESSAGES } from "@/sections/shared/constants/error-messages";
import { SUCCESS_MESSAGES } from "@/sections/shared/constants/success-messages";
import { INFO_MESSAGES } from "@/sections/shared/constants/info-messages";
import { FunctionalProfileFrame } from "@/models";
import { toast } from "sonner";

export default function FunctionalProfileEditor() {
  const { profile, createNew, createEmpty, clear, setProfile } = useProfileStore();
  const resetValidation = useValidationStore((state) => state.resetValidation);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showLoadEmptyDialog, setShowLoadEmptyDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showLibraryImportDialog, setShowLibraryImportDialog] = useState(false);
  const [showLibraryImportConfirmation, setShowLibraryImportConfirmation] = useState(false);
  const [libraryProfiles, setLibraryProfiles] = useState<LibraryItem[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState<string | null>(null);

  const handleSetProfile = (newProfile: FunctionalProfileFrame) => {
    setProfile(newProfile);
    resetValidation();
  };

  const { importFile, inputRef, handleFileChange, accept } = useFileImport({
    parser: parseFunctionalProfile,
    onSuccess: handleSetProfile,
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

  const handleLibraryImport = () => {
    if (profile) {
      setShowLibraryImportConfirmation(true);
    } else {
      setShowLibraryImportDialog(true);
      loadLibraryProfiles();
    }
  };

  const confirmLibraryImport = () => {
    setShowLibraryImportConfirmation(false);
    setShowLibraryImportDialog(true);
    loadLibraryProfiles();
  };

  const loadLibraryProfiles = async () => {
    setLibraryLoading(true);
    setLibraryError(null);
    try {
      const profiles = await fetchFunctionalProfiles();
      setLibraryProfiles(profiles);
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

  const handleLibraryProfileSelect = async (selectedItem: LibraryItem) => {
    const loadingToast = toast.loading("Importing from library...", {
      description: "Fetching and parsing profile",
    });

    try {
      // Fetch XML from API using identifier
      const xmlSource = await fetchFunctionalProfileXml(selectedItem.identifier);

      // Parse and set profile
      const parsedProfile = await parseFunctionalProfile(xmlSource);
      handleSetProfile(parsedProfile);

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

  // Load profiles when library dialog opens
  useEffect(() => {
    if (
      showLibraryImportDialog &&
      libraryProfiles.length === 0 &&
      !libraryLoading &&
      !libraryError
    ) {
      loadLibraryProfiles();
    }
  }, [showLibraryImportDialog]);

  const handleEmptyProfile = () => {
    if (profile) {
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
    if (profile) {
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
        onImportFromLibrary={handleLibraryImport}
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

      <ConfirmationDialog
        open={showLibraryImportConfirmation}
        onOpenChange={setShowLibraryImportConfirmation}
        title="Import from Library"
        description="Current profile will not be saved. Are you sure you want to import a profile from the library?"
        confirmLabel="Import"
        onConfirm={confirmLibraryImport}
      />

      <LibraryImportModal
        open={showLibraryImportDialog}
        onOpenChange={setShowLibraryImportDialog}
        title="Import from Library"
        description="Select a functional profile from the library to import"
        profiles={libraryProfiles}
        loading={libraryLoading}
        error={libraryError}
        onSelect={handleLibraryProfileSelect}
        confirmLabel="Import"
        searchPlaceholder="Search functional profiles..."
      />

      {profile ? (
        <FunctionalProfileForm />
      ) : (
        <div className="text-center text-muted-foreground py-12">No Profile loaded.</div>
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
