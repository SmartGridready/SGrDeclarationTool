"use client";

import { useProfileStore } from "@/sections/funcitional-profiles/functional-profile-store";
import { ReleaseNotesForm } from "@/sections/funcitional-profiles/release-notes/release-notes-form";
import { ProfileIdentificationForm } from "@/sections/funcitional-profiles/profile-identification/profile-identification-form";
import { AlternativeNamesForm } from "@/sections/funcitional-profiles/alternative-names/alternative-names-form";

export function FunctionalProfileForm() {
  const { profile } = useProfileStore();

  if (!profile) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ReleaseNotesForm />
      <ProfileIdentificationForm />
      <AlternativeNamesForm />
    </div>
  );
}
