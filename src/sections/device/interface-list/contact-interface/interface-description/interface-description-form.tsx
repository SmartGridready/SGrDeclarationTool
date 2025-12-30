"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { InterfaceList } from "@/models";
import { ContactInterface } from "@/models/product/contact-interface";

/**
 * Type guard to check if interface list is Contact interface
 */
function isContactInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { contactInterface: ContactInterface } {
  return interfaceList !== undefined && "contactInterface" in interfaceList;
}

export function ContactInterfaceDescriptionForm() {
  const { useDeviceState, useValidation, contactInterfaceDescriptionActions, pathPrefix } =
    useDeviceFormContext();

  const { getError } = useValidation();

  const interfaceList = useDeviceState((d) => d?.interfaceList);
  const contactInterface = isContactInterface(interfaceList)
    ? interfaceList.contactInterface
    : undefined;

  const description = contactInterface?.contactInterfaceDescription;

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(
      pathPrefix,
      `interfaceList.contactInterface.contactInterfaceDescription.${field}`
    );

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
          onChange={(value) =>
            contactInterfaceDescriptionActions.updateNumberOfContacts(
              value ? parseInt(value, 10) : 0
            )
          }
          error={getError(fieldPath("numberOfContacts"))}
        />
        <InputField
          label="Contact Stabilisation Time (ms)"
          name="contactStabilisationTimeMs"
          type="number"
          required={true}
          value={description.contactStabilisationTimeMs?.toString() || ""}
          onChange={(value) =>
            contactInterfaceDescriptionActions.updateContactStabilisationTimeMs(
              value ? parseInt(value, 10) : 0
            )
          }
          error={getError(fieldPath("contactStabilisationTimeMs"))}
        />
      </FormGroup>
    </FormSection>
  );
}
