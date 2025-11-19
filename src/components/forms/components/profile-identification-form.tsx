import { FormSection } from "@/components/ui/forms/form-section";
import { SelectField } from "@/components/ui/forms/select-field";
import { FormGroup } from "@/components/ui/forms/form-group";
import {
  PROFILE_IDENTIFICATION_CATEGORY,
  LEVEL_OF_OPERATION,
} from "@/lib/constants/form-options";
import { InputField } from "@/components/ui/forms/input-field";

export function ProfileIdentificationForm() {
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
        />
        <SelectField
          label={"Functional Profile Category"}
          name={"functionalProfileCategory"}
          options={PROFILE_IDENTIFICATION_CATEGORY}
          required={true}
        />
      </FormGroup>

      <FormGroup>
        <InputField
          label={"Functional Profile Type"}
          name={"functionalProfileType"}
          required={true}
          type="text"
        />
        <SelectField
          label={"Level of Operation"}
          name={"levelOfOperation"}
          options={LEVEL_OF_OPERATION}
          required={true}
        />
      </FormGroup>

      <FormGroup columns={3} header="Version Number">
        <InputField
          label={"Primary Version Number"}
          name={"primaryVersionNumber"}
          type="number"
          required={true}
        />
        <InputField
          label={"Secondary Version Number"}
          name={"secondaryVersionNumber"}
          type="number"
          required={true}
        />
        <InputField
          label={"Sub Release Version Number"}
          name={"subReleaseVersionNumber"}
          type="number"
          required={true}
        />
      </FormGroup>
    </FormSection>
  );
}
