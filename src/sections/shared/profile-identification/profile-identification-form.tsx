"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import {
  PROFILE_IDENTIFICATION_CATEGORY,
  LEVEL_OF_OPERATION,
} from "@/sections/shared/profile-identification/profile-identification-form-options";
import {
  FunctionalProfileCategory,
  LevelOfOperation,
  SpecificationOwnerIdentification,
} from "@/models";
import { FunctionalProfileIdentificationSlice } from "@/sections/shared/profile-identification/profile-identification-slice";
import { useFormSection } from "@/hooks/use-form-section";

interface ProfileIdentificationFormProps<TStoreState extends FunctionalProfileIdentificationSlice> {
  /**
   * Store hook function (e.g., useProfileStore, useDeviceStore)
   */
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  /**
   * Validation hook function that returns an object with getError method
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  /**
   * Selector to get profile identification state from the store
   */
  stateSelector: (store: TStoreState) => {
    specificationOwnerIdentification?: SpecificationOwnerIdentification;
    functionalProfileCategory?: FunctionalProfileCategory;
    functionalProfileType?: string;
    levelOfOperation?: LevelOfOperation;
    primaryVersionNumber?: number;
    secondaryVersionNumber?: number;
    subReleaseVersionNumber?: number;
  };
  /**
   * Field path prefix for validation errors
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
}

export function ProfileIdentificationForm<
  TStoreState extends FunctionalProfileIdentificationSlice,
>({
  useStore,
  useValidation,
  stateSelector,
  fieldPathPrefix = "functionalProfile.functionalProfileIdentification",
  title = "Functional Profile Identification",
  description = "Basic identification data of the functional profile",
}: ProfileIdentificationFormProps<TStoreState>) {
  const { state, actions, getError } = useFormSection<
    TStoreState,
    {
      specificationOwnerIdentification?: SpecificationOwnerIdentification;
      functionalProfileCategory?: FunctionalProfileCategory;
      functionalProfileType?: string;
      levelOfOperation?: LevelOfOperation;
      primaryVersionNumber?: number;
      secondaryVersionNumber?: number;
      subReleaseVersionNumber?: number;
    },
    FunctionalProfileIdentificationSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => ({
      updateSpecificationOwnerIdentification: store.updateSpecificationOwnerIdentification,
      updateFunctionalProfileCategory: store.updateFunctionalProfileCategory,
      updateFunctionalProfileType: store.updateFunctionalProfileType,
      updateLevelOfOperation: store.updateLevelOfOperation,
      updatePrimaryVersionNumber: store.updatePrimaryVersionNumber,
      updateSecondaryVersionNumber: store.updateSecondaryVersionNumber,
      updateSubReleaseVersionNumber: store.updateSubReleaseVersionNumber,
    }),
  });

  const getFieldError = (field: string) => getError(`${fieldPathPrefix}.${field}`);

  return (
    <FormSection title={title} description={description} required={true}>
      <FormGroup>
        <InputField
          label="Specification Owner Identification"
          name="specificationOwnerIdentification"
          required={true}
          type="text"
          value={state.specificationOwnerIdentification}
          onChange={(value) => actions.updateSpecificationOwnerIdentification(value)}
          error={getFieldError("specificationOwnerIdentification")}
        />
        <SelectField
          label="Functional Profile Category"
          name="functionalProfileCategory"
          options={PROFILE_IDENTIFICATION_CATEGORY}
          required={true}
          value={state.functionalProfileCategory}
          onChange={(value) =>
            actions.updateFunctionalProfileCategory(value as FunctionalProfileCategory)
          }
          error={getFieldError("functionalProfileCategory")}
        />
      </FormGroup>

      <FormGroup>
        <InputField
          label="Functional Profile Type"
          name="functionalProfileType"
          required={true}
          type="text"
          value={state.functionalProfileType}
          onChange={(value) => actions.updateFunctionalProfileType(value)}
          error={getFieldError("functionalProfileType")}
        />
        <SelectField
          label="Level of Operation"
          name="levelOfOperation"
          options={LEVEL_OF_OPERATION}
          required={true}
          value={state.levelOfOperation}
          onChange={(value) => actions.updateLevelOfOperation(value as LevelOfOperation)}
          error={getFieldError("levelOfOperation")}
        />
      </FormGroup>

      <FormGroup columns={3} header="Version Number">
        <InputField
          label="Primary Version Number"
          name="primaryVersionNumber"
          type="number"
          required={true}
          value={state.primaryVersionNumber?.toString()}
          onChange={(value) => actions.updatePrimaryVersionNumber(value ? parseInt(value, 10) : 0)}
          error={getFieldError("versionNumber.primaryVersionNumber")}
        />
        <InputField
          label="Secondary Version Number"
          name="secondaryVersionNumber"
          type="number"
          required={true}
          value={state.secondaryVersionNumber?.toString()}
          onChange={(value) =>
            actions.updateSecondaryVersionNumber(value ? parseInt(value, 10) : 0)
          }
          error={getFieldError("versionNumber.secondaryVersionNumber")}
        />
        <InputField
          label="Sub Release Version Number"
          name="subReleaseVersionNumber"
          type="number"
          required={true}
          value={state.subReleaseVersionNumber?.toString()}
          onChange={(value) =>
            actions.updateSubReleaseVersionNumber(value ? parseInt(value, 10) : 0)
          }
          error={getFieldError("versionNumber.subReleaseVersionNumber")}
        />
      </FormGroup>
    </FormSection>
  );
}
