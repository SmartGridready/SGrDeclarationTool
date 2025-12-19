"use client";

import { createContext, useContext, ReactNode } from "react";
import { FunctionalProfileFrame, FunctionalProfileDataPoint } from "@/models";

// Re-export slice types for consumers (all from shared)
export type { DataPointListSlice } from "@/sections/functional-profile/data-point-list/data-point-list-slice";
export type { GenericAttributeListSlice } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-slice";
export type { FunctionalProfileIdentificationSlice } from "@/sections/shared/profile-identification/profile-identification-slice";
export type { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
export type { AlternativeNamesSlice } from "@/sections/shared/alternative-names/alternative-names-slice";
export type { ReleaseNotesSlice } from "@/sections/shared/release-notes/release-notes-slice";

import type { DataPointListSlice } from "@/sections/functional-profile/data-point-list/data-point-list-slice";
import type { GenericAttributeListSlice } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-slice";
import type { FunctionalProfileIdentificationSlice } from "@/sections/shared/profile-identification/profile-identification-slice";
import type { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import type { AlternativeNamesSlice } from "@/sections/shared/alternative-names/alternative-names-slice";
import type { ReleaseNotesSlice } from "@/sections/shared/release-notes/release-notes-slice";

/**
 * Context value for functional profile forms.
 * This allows the same form components to work both:
 * 1. In standalone FunctionalProfile editor
 * 2. Embedded within a Device editor (at a specific functional profile index)
 */
export interface FunctionalProfileFormContextValue {
  /**
   * Hook to select state from the functional profile.
   * The selector receives the FunctionalProfileFrame (or undefined if not loaded).
   */
  useProfileState: <T>(selector: (profile: FunctionalProfileFrame | undefined) => T) => T;

  /**
   * Hook to get validation errors.
   * Returns an object with getError method that accepts a field path.
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };

  /**
   * Path prefix for validation error field paths.
   * Empty string for standalone profile, or path like
   * "interfaceList.genericInterface.functionalProfileList.functionalProfileListElement.0"
   * for embedded profiles.
   */
  pathPrefix: string;

  /**
   * Release notes actions, already bound to the correct path.
   */
  releaseNotesActions: ReleaseNotesSlice;

  /**
   * Profile identification actions, already bound to the correct path.
   */
  profileIdentificationActions: FunctionalProfileIdentificationSlice;

  /**
   * Alternative names actions (profile-level), already bound to the correct path.
   */
  alternativeNamesActions: AlternativeNamesSlice;

  /**
   * Legible description actions (profile-level), already bound to the correct path.
   */
  legibleDescriptionActions: LegibleDescriptionSlice;

  /**
   * All generic attribute list actions (profile-level), already bound to the correct path.
   */
  genericAttributeListActions: GenericAttributeListSlice;

  /**
   * All data point list actions, already bound to the correct path.
   */
  dataPointListActions: DataPointListSlice;
}

const FunctionalProfileFormContext = createContext<FunctionalProfileFormContextValue | null>(null);

/**
 * Hook to access the functional profile form context.
 * Must be used within a FunctionalProfileFormProvider.
 */
export function useFunctionalProfileFormContext(): FunctionalProfileFormContextValue {
  const context = useContext(FunctionalProfileFormContext);
  if (!context) {
    throw new Error(
      "useFunctionalProfileFormContext must be used within a FunctionalProfileFormProvider"
    );
  }
  return context;
}

/**
 * Provider props
 */
export interface FunctionalProfileFormProviderProps {
  children: ReactNode;
  value: FunctionalProfileFormContextValue;
}

/**
 * Provider component for functional profile form context.
 */
export function FunctionalProfileFormProvider({
  children,
  value,
}: FunctionalProfileFormProviderProps) {
  return (
    <FunctionalProfileFormContext.Provider value={value}>
      {children}
    </FunctionalProfileFormContext.Provider>
  );
}

/**
 * Helper to build a prefixed field path for validation errors.
 */
export function buildProfileFieldPath(prefix: string, fieldPath: string): string {
  if (!prefix) return fieldPath;
  if (!fieldPath) return prefix;
  return `${prefix}.${fieldPath}`;
}

/**
 * Helper to get a data point from the profile.
 */
export function getDataPointFromProfile(
  profile: FunctionalProfileFrame | undefined,
  index: number
): FunctionalProfileDataPoint | undefined {
  return profile?.dataPointList?.dataPointListElement?.[index];
}
