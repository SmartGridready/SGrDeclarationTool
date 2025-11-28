import { FormSection } from "@/sections/shared/components/forms/form-section";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import {
  PROFILE_IDENTIFICATION_CATEGORY,
  LEVEL_OF_OPERATION,
} from "@/sections/functional-profile/profile-identification/profile-identification-form-options";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { useFormSection } from "@/sections/shared/hooks/use-form-section";
import { FunctionalProfileCategory, LevelOfOperation } from "@/models";

export function ProfileIdentificationForm() {
  const { state, actions, getError } = useFormSection({
    stateSelector: (store) => ({
      specificationOwnerIdentification:
        store.profile?.functionalProfile?.functionalProfileIdentification
          ?.specificationOwnerIdentification,
      functionalProfileCategory:
        store.profile?.functionalProfile?.functionalProfileIdentification
          ?.functionalProfileCategory,
      functionalProfileType:
        store.profile?.functionalProfile?.functionalProfileIdentification?.functionalProfileType,
      levelOfOperation:
        store.profile?.functionalProfile?.functionalProfileIdentification?.levelOfOperation,
      primaryVersionNumber:
        store.profile?.functionalProfile?.functionalProfileIdentification?.versionNumber
          ?.primaryVersionNumber,
      secondaryVersionNumber:
        store.profile?.functionalProfile?.functionalProfileIdentification?.versionNumber
          ?.secondaryVersionNumber,
      subReleaseVersionNumber:
        store.profile?.functionalProfile?.functionalProfileIdentification?.versionNumber
          ?.subReleaseVersionNumber,
    }),
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

  return (
    <FormSection
      title={"Functional Profile Identification"}
      description={"Basic identification data of the functional profile"}
      required={true}
    >
      <FormGroup>
        <InputField
          label={"Specification Owner Identification"}
          name={"specificationOwnerIdentification"}
          required={true}
          type="text"
          value={state.specificationOwnerIdentification}
          onChange={(value) => actions.updateSpecificationOwnerIdentification(value)}
          error={getError(
            "functionalProfile.functionalProfileIdentification.specificationOwnerIdentification"
          )}
        />
        <SelectField
          label={"Functional Profile Category"}
          name={"functionalProfileCategory"}
          options={PROFILE_IDENTIFICATION_CATEGORY}
          required={true}
          value={state.functionalProfileCategory}
          onChange={(value) =>
            actions.updateFunctionalProfileCategory(value as FunctionalProfileCategory)
          }
          error={getError(
            "functionalProfile.functionalProfileIdentification.functionalProfileCategory"
          )}
        />
      </FormGroup>

      <FormGroup>
        <InputField
          label={"Functional Profile Type"}
          name={"functionalProfileType"}
          required={true}
          type="text"
          value={state.functionalProfileType}
          onChange={(value) => actions.updateFunctionalProfileType(value)}
          error={getError(
            "functionalProfile.functionalProfileIdentification.functionalProfileType"
          )}
        />
        <SelectField
          label={"Level of Operation"}
          name={"levelOfOperation"}
          options={LEVEL_OF_OPERATION}
          required={true}
          value={state.levelOfOperation}
          onChange={(value) => actions.updateLevelOfOperation(value as LevelOfOperation)}
          error={getError("functionalProfile.functionalProfileIdentification.levelOfOperation")}
        />
      </FormGroup>

      <FormGroup columns={3} header="Version Number">
        <InputField
          label={"Primary Version Number"}
          name={"primaryVersionNumber"}
          type="number"
          required={true}
          value={state.primaryVersionNumber?.toString()}
          onChange={(value) => actions.updatePrimaryVersionNumber(value ? parseInt(value, 10) : 0)}
          error={getError(
            "functionalProfile.functionalProfileIdentification.versionNumber.primaryVersionNumber"
          )}
        />
        <InputField
          label={"Secondary Version Number"}
          name={"secondaryVersionNumber"}
          type="number"
          required={true}
          value={state.secondaryVersionNumber?.toString()}
          onChange={(value) =>
            actions.updateSecondaryVersionNumber(value ? parseInt(value, 10) : 0)
          }
          error={getError(
            "functionalProfile.functionalProfileIdentification.versionNumber.secondaryVersionNumber"
          )}
        />
        <InputField
          label={"Sub Release Version Number"}
          name={"subReleaseVersionNumber"}
          type="number"
          required={true}
          value={state.subReleaseVersionNumber?.toString()}
          onChange={(value) =>
            actions.updateSubReleaseVersionNumber(value ? parseInt(value, 10) : 0)
          }
          error={getError(
            "functionalProfile.functionalProfileIdentification.versionNumber.subReleaseVersionNumber"
          )}
        />
      </FormGroup>
    </FormSection>
  );
}
