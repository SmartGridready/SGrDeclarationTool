"use client";

import { EditorActions } from "@/components/editor/components/editor-actions";
import { useProfileStore } from "@/store/profile-store";
import { FunctionalProfileForm } from "../forms/functional-profile-form";

export default function FunctionalProfileEditor() {
  const { profile, createNew, clear } = useProfileStore();

  return (
    <div className="space-y-6">
      <EditorActions
        title="Functional Profile Editor"
        onNew={createNew}
        onClear={clear}
        newButtonLabel="Load Empty Profile"
      />

      {profile ? (
        <FunctionalProfileForm />
      ) : (
        <div className="text-center text-muted-foreground py-12">
          No Profile loaded.
        </div>
      )}
    </div>
  );
}
