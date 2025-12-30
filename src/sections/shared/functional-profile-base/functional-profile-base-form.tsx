"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { useFormSection } from "@/hooks/use-form-section";
import { FunctionalProfileBaseSlice } from "@/sections/shared/functional-profile-base/functional-profile-base-slice";
import { ProfileIdentificationForm } from "@/sections/shared/profile-identification/profile-identification-form";
import { AlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { LegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { GenericAttributeListProductForm } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-form";
import { FunctionalProfileBase, FunctionalProfileDescription } from "@/models";

interface FunctionalProfileBaseFormProps<TStoreState extends FunctionalProfileBaseSlice> {
  /**
   * Store hook function (e.g., useProfileStore, useDeviceStore)
   */
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  /**
   * Validation hook function that returns an object with getError method
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  /**
   * Selector to get functionalProfileBase state from the store
   */
  stateSelector: (store: TStoreState) => {
    functionalProfile?: FunctionalProfileDescription;
    genericAttributeList?: FunctionalProfileBase["genericAttributeList"];
  };
  /**
   * Field path prefix for validation errors (e.g., "functionalProfile" or "device.interfaceList.modbusInterface.functionalProfileList.functionalProfileListElement[0]")
   */
  fieldPathPrefix?: string;
  /**
   * Title for the form section
   */
  title?: string;
  /**
   * Description for the form section
   */
  description?: string;
  /**
   * Whether this is a nested section (affects styling)
   */
  nested?: boolean;
}

export function FunctionalProfileBaseForm<TStoreState extends FunctionalProfileBaseSlice>({
  useStore,
  useValidation,
  stateSelector,
  fieldPathPrefix = "functionalProfile",
  title = "Functional Profile",
  description = "Functional profile information",
  nested = false,
}: FunctionalProfileBaseFormProps<TStoreState>) {
  const { state, actions, getError } = useFormSection<
    TStoreState,
    {
      functionalProfile?: FunctionalProfileDescription;
      genericAttributeList?: FunctionalProfileBase["genericAttributeList"];
    },
    FunctionalProfileBaseSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => store as FunctionalProfileBaseSlice & Record<string, unknown>,
  });

  const functionalProfile = state.functionalProfile;

  if (!functionalProfile) {
    return null;
  }

  // Note: Schema nests fields under "functionalProfile", so we need to include it in the path
  const getFieldError = (field: string) =>
    getError(`${fieldPathPrefix}.functionalProfile.${field}`);

  return (
    <FormSection title={title} description={description} nested={nested} required={true}>
      <div className="space-y-6">
        {/* Functional Profile Name */}
        <InputField
          label="Functional Profile Name"
          name="functionalProfileName"
          required={true}
          type="text"
          value={functionalProfile.functionalProfileName}
          onChange={(value) => actions.updateFunctionalProfileName(value)}
          error={getFieldError("functionalProfileName")}
        />

        {/* Profile Identification */}
        <ProfileIdentificationForm
          useStore={useStore}
          useValidation={useValidation}
          stateSelector={() => ({
            functionalProfileIdentification: functionalProfile.functionalProfileIdentification,
          })}
          isAddedSelector={() => !!functionalProfile.functionalProfileIdentification}
          fieldPathPrefix={`${fieldPathPrefix}.functionalProfile.functionalProfileIdentification`}
          required={true}
          nested={true}
        />

        {/* Alternative Names */}
        <AlternativeNamesForm
          useStore={useStore}
          useValidation={useValidation}
          stateSelector={() => ({
            alternativeNames: functionalProfile.alternativeNames,
          })}
          isAddedSelector={() => !!functionalProfile.alternativeNames}
          fieldPathPrefix={`${fieldPathPrefix}.functionalProfile.alternativeNames`}
          required={false}
          nested={true}
        />

        {/* Legible Description */}
        <LegibleDescriptionForm
          useStore={useStore}
          useValidation={useValidation}
          stateSelector={() => ({
            legibleDescriptions: functionalProfile.legibleDescription,
          })}
          isAddedSelector={() => !!functionalProfile.legibleDescription}
          fieldPathPrefix={`${fieldPathPrefix}.functionalProfile.legibleDescription`}
          required={false}
          nested={true}
          maxItems={4}
        />

        {/* Programmer Hints */}
        <LegibleDescriptionForm
          useStore={(selector) => {
            // Use the adapter from the slice that exposes programmer hints as LegibleDescriptionSlice
            const programmerHintsSlice = actions.getProgrammerHintsLegibleDescriptionSlice();
            return selector(programmerHintsSlice as unknown as TStoreState);
          }}
          useValidation={useValidation}
          stateSelector={() => ({
            legibleDescriptions: functionalProfile.programmerHints,
          })}
          isAddedSelector={() => !!functionalProfile.programmerHints}
          fieldPathPrefix={`${fieldPathPrefix}.functionalProfile.programmerHints`}
          required={false}
          title="Programmer Hints"
          description="Programmer hints for the functional profile (max 4)"
          nested={true}
          maxItems={4}
        />

        {/* Generic Attribute List */}
        <GenericAttributeListProductForm
          useStore={useStore}
          useValidation={useValidation}
          stateSelector={() => ({
            genericAttributeList: state.genericAttributeList,
          })}
          isAddedSelector={() => !!state.genericAttributeList}
          fieldPathPrefix={`${fieldPathPrefix}.genericAttributeList`}
          required={false}
          nested={true}
        />
      </div>
    </FormSection>
  );
}
