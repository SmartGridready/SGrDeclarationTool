"use client";

import { ReleaseNotesForm } from "@/sections/functional-profile/release-notes/release-notes-form";
import { ProfileIdentificationForm } from "@/sections/functional-profile/profile-identification/profile-identification-form";
import { AlternativeNamesForm } from "@/sections/functional-profile/alternative-names/alternative-names-form";
import { LegibleDescriptionForm } from "@/sections/functional-profile/legible-description/legible-description-form";
import { GenericAttributeListForm } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-form";
import { DataPointListForm } from "@/sections/functional-profile/data-point-list/data-point-list-form";

/**
 * Shared Functional Profile Form
 * This form can be used both in standalone FunctionalProfile editor
 * and embedded within a Device editor.
 *
 * It requires a FunctionalProfileFormContext to be provided by a parent component.
 */
export function FunctionalProfileForm() {
  return (
    <div className="space-y-6">
      <ReleaseNotesForm />
      <ProfileIdentificationForm />
      <AlternativeNamesForm />
      <LegibleDescriptionForm />
      <GenericAttributeListForm />
      <DataPointListForm />
    </div>
  );
}
