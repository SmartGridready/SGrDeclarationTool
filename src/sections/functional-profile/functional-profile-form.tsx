"use client";

import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { ReleaseNotesForm } from "@/sections/functional-profile/release-notes/release-notes-form";
import { ProfileIdentificationForm } from "@/sections/functional-profile/profile-identification/profile-identification-form";
import { AlternativeNamesForm } from "@/sections/functional-profile/alternative-names/alternative-names-form";

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
