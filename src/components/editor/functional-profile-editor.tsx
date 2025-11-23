"use client";

import { useEffect } from "react";
import { EditorActions } from "@/components/editor/components/editor-actions";
import { useProfileStore } from "@/store/profile-store";
import { useValidationStore } from "@/store/validation-store";
import { FunctionalProfileForm } from "../forms/functional-profile-form";
import { Button } from "@/components/ui/button";
import { useFileImport } from "@/hooks/use-file-import";
import { useFileExport } from "@/hooks/use-file-export";
import { parseFunctionalProfile } from "@/lib/mapper/functional-profile-mapper";
import { buildFunctionalProfileToXml } from "@/lib/builder/functional-profile-builder";
import { DEBUG } from "../../../debug-config";
import { ERROR_MESSAGES } from "@/lib/constants/error-messages";
import { INFO_MESSAGES } from "@/lib/constants/info-messages";
import { toast } from "sonner";

export default function FunctionalProfileEditor() {
  const { profile, createNew, createEmpty, clear, setProfile } =
    useProfileStore();
  const resetValidation = useValidationStore((state) => state.resetValidation);

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

  const handleEmptyProfile = () => {
    createEmpty();
    toast.info(INFO_MESSAGES.PROFILE.EMPTY_LOADED);
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
        onClear={clear}
        onImportFromFilesystem={importFile}
        onExport={exportFile}
        emptyButtonLabel="Load Empty Profile"
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
