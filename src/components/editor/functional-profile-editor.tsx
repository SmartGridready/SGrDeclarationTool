"use client";

import { EditorActions } from "@/components/editor/components/editor-actions";
import { useProfileStore } from "@/store/profile-store";
import { FunctionalProfileForm } from "../forms/functional-profile-form";
import { Button } from "@/components/ui/button";
import { useFileImport } from "@/hooks/use-file-import";
import { useFileExport } from "@/hooks/use-file-export";
import { parseFunctionalProfile } from "@/lib/mapper/functional-profile-mapper";
import { buildFunctionalProfileToXml } from "@/lib/builder/functional-profile-builder";

export default function FunctionalProfileEditor() {
  const { profile, createNew, createEmpty, clear, setProfile } =
    useProfileStore();

  const { importFile, inputRef, handleFileChange, accept } = useFileImport({
    parser: parseFunctionalProfile,
    onSuccess: setProfile,
    accept: ".xml",
  });

  const { exportFile } = useFileExport({
    builder: buildFunctionalProfileToXml,
    data: profile,
    filename: "functional-profile.xml",
    errorMessage: "Please load or create a profile first.",
  });

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
        onNew={createNew}
        onEmpty={createEmpty}
        onClear={clear}
        onImportFromFilesystem={importFile}
        onExport={exportFile}
        newButtonLabel="Load Sample Profile"
        emptyButtonLabel="Load Empty Profile"
      />

      {profile ? (
        <FunctionalProfileForm />
      ) : (
        <div className="text-center text-muted-foreground py-12">
          No Profile loaded.
        </div>
      )}

      <Button
        onClick={handleDebugPrint}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 shadow-lg"
      >
        Debug JSON
      </Button>
    </div>
  );
}
