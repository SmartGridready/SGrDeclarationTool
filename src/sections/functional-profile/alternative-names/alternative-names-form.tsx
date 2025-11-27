import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { useFormSection } from "@/sections/shared/hooks/use-form-section";

export function AlternativeNamesForm() {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } =
    useFormSection({
      stateSelector: (store) => ({
        alternativeNames: store.profile?.functionalProfile?.alternativeNames,
      }),
      actionsSelector: (store) => ({
        updateSLV1Name: store.updateSLV1Name,
        updateWorkName: store.updateWorkName,
        updateManufName: store.updateManufName,
        updateIec61850Name: store.updateIec61850Name,
        updateSarefName: store.updateSarefName,
        updateEebusName: store.updateEebusName,
        updateSunSpecName: store.updateSunSpecName,
        updateHpBwpName: store.updateHpBwpName,
        updateEn17609Name: store.updateEn17609Name,
        addAlternativeNames: store.addAlternativeNames,
        removeAlternativeNames: store.removeAlternativeNames,
      }),
      isAddedSelector: (store) =>
        !!store.profile?.functionalProfile?.alternativeNames,
      onAdd: (actions) => actions.addAlternativeNames(),
      onRemove: (actions) => actions.removeAlternativeNames(),
    });

  const altNames = state.alternativeNames;

  return (
    <FormSection
      title={"Alternative Names"}
      description={"Alternative naming conventions for the functional profile"}
      required={false}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
    >
      <FormGroup columns={2}>
        <InputField
          label={"SLV1 Name"}
          name={"sLV1Name"}
          required={false}
          type="text"
          value={altNames?.sLV1Name}
          onChange={(value) => actions.updateSLV1Name(value || undefined)}
          error={getError("functionalProfile.alternativeNames.sLV1Name")}
        />
        <InputField
          label={"Work Name"}
          name={"workName"}
          required={false}
          type="text"
          value={altNames?.workName}
          onChange={(value) => actions.updateWorkName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.workName")}
        />
      </FormGroup>

      <FormGroup columns={2}>
        <InputField
          label={"Manufacturer Name"}
          name={"manufName"}
          required={false}
          type="text"
          value={altNames?.manufName}
          onChange={(value) => actions.updateManufName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.manufName")}
        />
        <InputField
          label={"IEC 61850 Name"}
          name={"iec61850Name"}
          required={false}
          type="text"
          value={altNames?.iec61850Name}
          onChange={(value) => actions.updateIec61850Name(value || undefined)}
          error={getError("functionalProfile.alternativeNames.iec61850Name")}
        />
      </FormGroup>

      <FormGroup columns={2}>
        <InputField
          label={"SAREF Name"}
          name={"sarefName"}
          required={false}
          type="text"
          value={altNames?.sarefName}
          onChange={(value) => actions.updateSarefName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.sarefName")}
        />
        <InputField
          label={"EEBus Name"}
          name={"eebusName"}
          required={false}
          type="text"
          value={altNames?.eebusName}
          onChange={(value) => actions.updateEebusName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.eebusName")}
        />
      </FormGroup>

      <FormGroup columns={2}>
        <InputField
          label={"SunSpec Name"}
          name={"sunSpecName"}
          required={false}
          type="text"
          value={altNames?.sunSpecName}
          onChange={(value) => actions.updateSunSpecName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.sunSpecName")}
        />
        <InputField
          label={"HP/BWP Name"}
          name={"hpBwpName"}
          required={false}
          type="text"
          value={altNames?.hpBwpName}
          onChange={(value) => actions.updateHpBwpName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.hpBwpName")}
        />
      </FormGroup>

      <FormGroup columns={2}>
        <InputField
          label={"EN 17609 Name"}
          name={"en17609Name"}
          required={false}
          type="text"
          value={altNames?.en17609Name}
          onChange={(value) => actions.updateEn17609Name(value || undefined)}
          error={getError("functionalProfile.alternativeNames.en17609Name")}
        />
      </FormGroup>
    </FormSection>
  );
}
