"use client";

import { EditorActions } from "@/components/editor/components/editor-actions";
import { useProfileStore } from "@/store/profile-store";
import { FunctionalProfileForm } from "../forms/functional-profile-form";
import { Button } from "@/components/ui/button";

export default function FunctionalProfileEditor() {
  const { profile, createNew, createEmpty, clear } = useProfileStore();

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
      <EditorActions
        title="Functional Profile Editor"
        onNew={createNew}
        onEmpty={createEmpty}
        onClear={clear}
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
