"use client";

import { ReactNode, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  FunctionalProfileFormProvider,
  FunctionalProfileFormContextValue,
} from "@/context/functional-profile-form-context";
import {
  useProfileStore,
  StoreState,
} from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-profile-validation";

interface StandaloneFunctionalProfileFormProviderProps {
  children: ReactNode;
}

/**
 * Custom hook for standalone profile state selection with shallow comparison.
 * Uses useShallow to prevent infinite loops when selectors return objects.
 * Defined at module level so it's a stable reference.
 */
function useStandaloneProfileState<T>(selector: (profile: StoreState["profile"]) => T): T {
  // Use useShallow to do shallow comparison of returned objects
  return useProfileStore(useShallow((state) => selector(state.profile)));
}

/**
 * Provider for standalone FunctionalProfile editor.
 * Wraps the useProfileStore to provide the FunctionalProfileFormContext.
 */
export function StandaloneFunctionalProfileFormProvider({
  children,
}: StandaloneFunctionalProfileFormProviderProps) {
  // Get actions from the store (these are stable references)
  const store = useProfileStore();

  // Create the context value with memoization for actions only
  const contextValue = useMemo<FunctionalProfileFormContextValue>(() => {
    return {
      // State selector hook - stable reference defined at module level
      useProfileState: useStandaloneProfileState,

      // Validation hook
      useValidation: useProfileValidation,

      // No prefix for standalone profile
      pathPrefix: "",

      // Release notes actions
      releaseNotesActions: {
        addReleaseNotes: store.addReleaseNotes,
        removeReleaseNotes: store.removeReleaseNotes,
        updateReleaseState: store.updateReleaseState,
        updateRemarks: store.updateRemarks,
        addChangeLog: store.addChangeLog,
        removeChangeLog: store.removeChangeLog,
        updateChangeLogField: store.updateChangeLogField,
        addEmptyChangeLog: store.addEmptyChangeLog,
      },

      // Profile identification actions
      profileIdentificationActions: {
        updateSpecificationOwnerIdentification: store.updateSpecificationOwnerIdentification,
        updateFunctionalProfileCategory: store.updateFunctionalProfileCategory,
        updateFunctionalProfileType: store.updateFunctionalProfileType,
        updateLevelOfOperation: store.updateLevelOfOperation,
        updatePrimaryVersionNumber: store.updatePrimaryVersionNumber,
        updateSecondaryVersionNumber: store.updateSecondaryVersionNumber,
        updateSubReleaseVersionNumber: store.updateSubReleaseVersionNumber,
      },

      // Alternative names actions (profile level)
      alternativeNamesActions: {
        addAlternativeNames: store.addAlternativeNames,
        removeAlternativeNames: store.removeAlternativeNames,
        updateSLV1Name: store.updateSLV1Name,
        updateWorkName: store.updateWorkName,
        updateManufName: store.updateManufName,
        updateIec61850Name: store.updateIec61850Name,
        updateSarefName: store.updateSarefName,
        updateEebusName: store.updateEebusName,
        updateSunSpecName: store.updateSunSpecName,
        updateHpBwpName: store.updateHpBwpName,
        updateEn17609Name: store.updateEn17609Name,
      },

      // Legible description actions (profile level)
      legibleDescriptionActions: {
        addLegibleDescription: store.addLegibleDescription,
        removeLegibleDescription: store.removeLegibleDescription,
        removeAllLegibleDescriptions: store.removeAllLegibleDescriptions,
        updateTextElement: store.updateTextElement,
        updateLanguage: store.updateLanguage,
        updateUri: store.updateUri,
        addEmptyLegibleDescription: store.addEmptyLegibleDescription,
      },

      // Generic attribute list actions (profile level)
      genericAttributeListActions: {
        addGenericAttribute: store.addGenericAttribute,
        removeGenericAttribute: store.removeGenericAttribute,
        removeAllGenericAttributes: store.removeAllGenericAttributes,
        updateGenericAttributeName: store.updateGenericAttributeName,
        addEmptyGenericAttribute: store.addEmptyGenericAttribute,
      },

      // Data point list actions
      dataPointListActions: {
        addDataPoint: store.addDataPoint,
        removeDataPoint: store.removeDataPoint,
        removeAllDataPoints: store.removeAllDataPoints,
        updateDataPointName: store.updateDataPointName,
        updateDataDirection: store.updateDataDirection,
        updatePresenceLevel: store.updatePresenceLevel,
        updateDataType: store.updateDataType,
        updateUnit: store.updateUnit,
        updateArrayLength: store.updateArrayLength,
        addEmptyDataPoint: store.addEmptyDataPoint,
        // Enum slice
        setEnumDataType: store.setEnumDataType,
        addEnumEntry: store.addEnumEntry,
        removeEnumEntry: store.removeEnumEntry,
        updateEnumEntryLiteral: store.updateEnumEntryLiteral,
        updateEnumEntryDescription: store.updateEnumEntryDescription,
        updateEnumHexMask: store.updateEnumHexMask,
        addEmptyEnumEntry: store.addEmptyEnumEntry,
        // Bitmap slice
        setBitmapDataType: store.setBitmapDataType,
        addBitmapEntry: store.addBitmapEntry,
        removeBitmapEntry: store.removeBitmapEntry,
        updateBitmapEntryLiteral: store.updateBitmapEntryLiteral,
        updateBitmapEntryDescription: store.updateBitmapEntryDescription,
        addEmptyBitmapEntry: store.addEmptyBitmapEntry,
        // JSON slice
        setJsonDataType: store.setJsonDataType,
        addJsonItem: store.addJsonItem,
        removeJsonItem: store.removeJsonItem,
        updateJsonArrayItem: store.updateJsonArrayItem,
        updateJsonElemItem: store.updateJsonElemItem,
        addJsonItemAtPath: store.addJsonItemAtPath,
        removeJsonItemAtPath: store.removeJsonItemAtPath,
        updateJsonArrayItemAtPath: store.updateJsonArrayItemAtPath,
        updateJsonElemItemAtPath: store.updateJsonElemItemAtPath,
        addJsonNestedItem: store.addJsonNestedItem,
        removeJsonNestedItem: store.removeJsonNestedItem,
        updateJsonNestedArrayItem: store.updateJsonNestedArrayItem,
        updateJsonNestedElemItem: store.updateJsonNestedElemItem,
        // DataPoint AlternativeNames slice
        addDataPointAlternativeNames: store.addDataPointAlternativeNames,
        removeDataPointAlternativeNames: store.removeDataPointAlternativeNames,
        updateDataPointSLV1Name: store.updateDataPointSLV1Name,
        updateDataPointWorkName: store.updateDataPointWorkName,
        updateDataPointManufName: store.updateDataPointManufName,
        updateDataPointIec61850Name: store.updateDataPointIec61850Name,
        updateDataPointSarefName: store.updateDataPointSarefName,
        updateDataPointEebusName: store.updateDataPointEebusName,
        updateDataPointSunSpecName: store.updateDataPointSunSpecName,
        updateDataPointHpBwpName: store.updateDataPointHpBwpName,
        updateDataPointEn17609Name: store.updateDataPointEn17609Name,
        // DataPoint LegibleDescription slice
        addDataPointLegibleDescription: store.addDataPointLegibleDescription,
        removeDataPointLegibleDescription: store.removeDataPointLegibleDescription,
        removeAllDataPointLegibleDescriptions: store.removeAllDataPointLegibleDescriptions,
        updateDataPointLegibleDescriptionText: store.updateDataPointLegibleDescriptionText,
        updateDataPointLegibleDescriptionLanguage: store.updateDataPointLegibleDescriptionLanguage,
        updateDataPointLegibleDescriptionUri: store.updateDataPointLegibleDescriptionUri,
        // ParameterList slice (from shared DynamicParameterListSlice)
        addParameterList: store.addParameterList,
        removeParameterList: store.removeParameterList,
        addParameterListElement: store.addParameterListElement,
        removeParameterListElement: store.removeParameterListElement,
        updateParameterListElementName: store.updateParameterListElementName,
        updateParameterListElementDataType: store.updateParameterListElementDataType,
        updateParameterListElementDefaultValue: store.updateParameterListElementDefaultValue,
        // ParameterList Descriptions slice
        addParameterDescription: store.addParameterDescription,
        removeParameterDescription: store.removeParameterDescription,
        updateParameterDescriptionText: store.updateParameterDescriptionText,
        updateParameterDescriptionLanguage: store.updateParameterDescriptionLanguage,
        updateParameterDescriptionUri: store.updateParameterDescriptionUri,
        updateParameterDescriptionLabel: store.updateParameterDescriptionLabel,
        addEmptyParameterDescription: store.addEmptyParameterDescription,
        // ParameterList Enum slice
        setParameterListEnumDataType: store.setParameterListEnumDataType,
        addParameterListEnumEntry: store.addParameterListEnumEntry,
        removeParameterListEnumEntry: store.removeParameterListEnumEntry,
        updateParameterListEnumEntryLiteral: store.updateParameterListEnumEntryLiteral,
        updateParameterListEnumEntryOrdinal: store.updateParameterListEnumEntryOrdinal,
        updateParameterListEnumEntryDescription: store.updateParameterListEnumEntryDescription,
        updateParameterListEnumHexMask: store.updateParameterListEnumHexMask,
        addEmptyParameterListEnumEntry: store.addEmptyParameterListEnumEntry,
        // ParameterList Bitmap slice
        setParameterListBitmapDataType: store.setParameterListBitmapDataType,
        addParameterListBitmapEntry: store.addParameterListBitmapEntry,
        removeParameterListBitmapEntry: store.removeParameterListBitmapEntry,
        updateParameterListBitmapEntryLiteral: store.updateParameterListBitmapEntryLiteral,
        updateParameterListBitmapEntryHexMask: store.updateParameterListBitmapEntryHexMask,
        updateParameterListBitmapEntryDescription: store.updateParameterListBitmapEntryDescription,
        addEmptyParameterListBitmapEntry: store.addEmptyParameterListBitmapEntry,
        // DataPoint GenericAttributeList slice
        addDataPointGenericAttributeList: store.addDataPointGenericAttributeList,
        removeDataPointGenericAttributeList: store.removeDataPointGenericAttributeList,
        addDataPointGenericAttribute: store.addDataPointGenericAttribute,
        removeDataPointGenericAttribute: store.removeDataPointGenericAttribute,
        updateDataPointGenericAttributeName: store.updateDataPointGenericAttributeName,
      },
    };
  }, [store]);

  return (
    <FunctionalProfileFormProvider value={contextValue}>{children}</FunctionalProfileFormProvider>
  );
}
