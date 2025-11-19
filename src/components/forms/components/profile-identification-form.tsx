import { FormSection } from "@/components/ui/forms/form-section";
import { SelectField } from "@/components/ui/forms/select-field";
import { FormGroup } from "@/components/ui/forms/form-group";
import {
  PROFILE_IDENTIFICATION_CATEGORY,
  LEVEL_OF_OPERATION,
} from "@/lib/constants/form-options";
import { InputField } from "@/components/ui/forms/input-field";
import { useProfileStore } from "@/store/profile-store";
import { useShallow } from "zustand/shallow";
import { FunctionalProfileCategory, LevelOfOperation } from "@/lib/models";

function useProfileIdentification() {
  return useProfileStore(
    useShallow((state) => ({
      // State
      specificationOwnerIdentification:
        state.profile?.functionalProfile?.functionalProfileIdentification
          ?.specificationOwnerIdentification,
      functionalProfileCategory:
        state.profile?.functionalProfile?.functionalProfileIdentification
          ?.functionalProfileCategory,
      functionalProfileType:
        state.profile?.functionalProfile?.functionalProfileIdentification
          ?.functionalProfileType,
      levelOfOperation:
        state.profile?.functionalProfile?.functionalProfileIdentification
          ?.levelOfOperation,
      primaryVersionNumber:
        state.profile?.functionalProfile?.functionalProfileIdentification
          ?.versionNumber?.primaryVersionNumber,
      secondaryVersionNumber:
        state.profile?.functionalProfile?.functionalProfileIdentification
          ?.versionNumber?.secondaryVersionNumber,
      subReleaseVersionNumber:
        state.profile?.functionalProfile?.functionalProfileIdentification
          ?.versionNumber?.subReleaseVersionNumber,
      // Actions
      updateSpecificationOwnerIdentification:
        state.updateSpecificationOwnerIdentification,
      updateFunctionalProfileCategory: state.updateFunctionalProfileCategory,
      updateFunctionalProfileType: state.updateFunctionalProfileType,
      updateLevelOfOperation: state.updateLevelOfOperation,
      updatePrimaryVersionNumber: state.updatePrimaryVersionNumber,
      updateSecondaryVersionNumber: state.updateSecondaryVersionNumber,
      updateSubReleaseVersionNumber: state.updateSubReleaseVersionNumber,
    }))
  );
}

export function ProfileIdentificationForm() {
  const {
    specificationOwnerIdentification,
    functionalProfileCategory,
    functionalProfileType,
    levelOfOperation,
    primaryVersionNumber,
    secondaryVersionNumber,
    subReleaseVersionNumber,
    updateSpecificationOwnerIdentification,
    updateFunctionalProfileCategory,
    updateFunctionalProfileType,
    updateLevelOfOperation,
    updatePrimaryVersionNumber,
    updateSecondaryVersionNumber,
    updateSubReleaseVersionNumber,
  } = useProfileIdentification();
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
          value={specificationOwnerIdentification}
          onChange={(value) => updateSpecificationOwnerIdentification(value)}
        />
        <SelectField
          label={"Functional Profile Category"}
          name={"functionalProfileCategory"}
          options={PROFILE_IDENTIFICATION_CATEGORY}
          required={true}
          value={functionalProfileCategory}
          onChange={(value) =>
            updateFunctionalProfileCategory(value as FunctionalProfileCategory)
          }
        />
      </FormGroup>

      <FormGroup>
        <InputField
          label={"Functional Profile Type"}
          name={"functionalProfileType"}
          required={true}
          type="text"
          value={functionalProfileType}
          onChange={(value) => updateFunctionalProfileType(value)}
        />
        <SelectField
          label={"Level of Operation"}
          name={"levelOfOperation"}
          options={LEVEL_OF_OPERATION}
          required={true}
          value={levelOfOperation}
          onChange={(value) =>
            updateLevelOfOperation(value as LevelOfOperation)
          }
        />
      </FormGroup>

      <FormGroup columns={3} header="Version Number">
        <InputField
          label={"Primary Version Number"}
          name={"primaryVersionNumber"}
          type="number"
          required={true}
          value={primaryVersionNumber?.toString()}
          onChange={(value) =>
            updatePrimaryVersionNumber(value ? parseInt(value, 10) : undefined)
          }
        />
        <InputField
          label={"Secondary Version Number"}
          name={"secondaryVersionNumber"}
          type="number"
          required={true}
          value={secondaryVersionNumber?.toString()}
          onChange={(value) =>
            updateSecondaryVersionNumber(
              value ? parseInt(value, 10) : undefined
            )
          }
        />
        <InputField
          label={"Sub Release Version Number"}
          name={"subReleaseVersionNumber"}
          type="number"
          required={true}
          value={subReleaseVersionNumber?.toString()}
          onChange={(value) =>
            updateSubReleaseVersionNumber(
              value ? parseInt(value, 10) : undefined
            )
          }
        />
      </FormGroup>
    </FormSection>
  );
}
