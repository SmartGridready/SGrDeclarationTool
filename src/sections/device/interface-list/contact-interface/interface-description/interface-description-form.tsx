"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";

export function ContactInterfaceDescriptionForm() {
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  // Granular selector
  const description = useDeviceField((d) => d?.interfaceList?.contactInterface?.contactInterfaceDescription);

  const fieldPath = (field: string) => `interfaceList.contactInterface.contactInterfaceDescription.${field}`;

  if (!description) {
    return null;
  }

  return (
    <FormSection
      title="Interface Description"
      description="Configure the contact interface description"
      required={true}
      nested={true}
    >
      <FormGroup columns={2}>
        <InputField
          label="Number of Contacts"
          name="numberOfContacts"
          type="number"
          required={true}
          value={description.numberOfContacts?.toString() || ""}
          onChange={(value) => store.updateNumberOfContacts(value ? parseInt(value, 10) : 0)}
          error={getError(fieldPath("numberOfContacts"))}
        />
        <InputField
          label="Contact Stabilisation Time (ms)"
          name="contactStabilisationTimeMs"
          type="number"
          required={true}
          value={description.contactStabilisationTimeMs?.toString() || ""}
          onChange={(value) => store.updateContactStabilisationTimeMs(value ? parseInt(value, 10) : 0)}
          error={getError(fieldPath("contactStabilisationTimeMs"))}
        />
      </FormGroup>
    </FormSection>
  );
}
