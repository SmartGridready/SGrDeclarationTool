"use client";

import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useShallow } from "zustand/react/shallow";
import { ReleaseNotesForm } from "@/sections/functional-profile/release-notes/release-notes-form";
import { ProfileIdentificationForm } from "@/sections/functional-profile/profile-identification/profile-identification-form";
import { AlternativeNamesForm } from "@/sections/functional-profile/alternative-names/alternative-names-form";
import { LegibleDescriptionForm } from "@/sections/functional-profile/legible-description/legible-description-form";
import { GenericAttributeListForm } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-form";
import { DataPointListForm } from "@/sections/functional-profile/data-point-list/data-point-list-form";

/**
 * Standalone Functional Profile Form
 * Uses the profile store directly.
 */
export function FunctionalProfileForm() {
  const profile = useProfileStore(useShallow((state) => state.profile));

  if (!profile) {
    return null;
  }

  return (
    <>
      <ReleaseNotesForm />
      <ProfileIdentificationForm />
      <AlternativeNamesForm />
      <LegibleDescriptionForm />
      <GenericAttributeListForm />
      <DataPointListForm />
    </>
  );
}
