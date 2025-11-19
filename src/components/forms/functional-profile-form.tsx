"use client";

import { useProfileStore } from "@/store/profile-store";
import { ReleaseNotesForm } from "./components/release-notes-form";
import { ProfileIdentificationForm } from "./components/profile-identification-form";

export function FunctionalProfileForm() {
  const { profile } = useProfileStore();

  if (!profile) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ReleaseNotesForm />
      <ProfileIdentificationForm />
    </div>
  );
}
