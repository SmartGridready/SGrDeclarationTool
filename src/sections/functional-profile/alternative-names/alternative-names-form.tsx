import { useShallow } from "zustand/react/shallow";
import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";

/**
 * Selects alternative names state and actions with shallow comparison to prevent infinite loops.
 * (Prevents unnecessary re-renders)
 */
function useAlternativeNames() {
  return useProfileStore(
    useShallow((state) => ({
      // State
      sLV1Name: state.profile?.functionalProfile?.alternativeNames?.sLV1Name,
      workName: state.profile?.functionalProfile?.alternativeNames?.workName,
      manufName: state.profile?.functionalProfile?.alternativeNames?.manufName,
      iec61850Name:
        state.profile?.functionalProfile?.alternativeNames?.iec61850Name,
      sarefName: state.profile?.functionalProfile?.alternativeNames?.sarefName,
      eebusName: state.profile?.functionalProfile?.alternativeNames?.eebusName,
      sunSpecName:
        state.profile?.functionalProfile?.alternativeNames?.sunSpecName,
      hpBwpName: state.profile?.functionalProfile?.alternativeNames?.hpBwpName,
      en17609Name:
        state.profile?.functionalProfile?.alternativeNames?.en17609Name,
      hasAlternativeNames: !!state.profile?.functionalProfile?.alternativeNames,
      // Actions
      updateSLV1Name: state.updateSLV1Name,
      updateWorkName: state.updateWorkName,
      updateManufName: state.updateManufName,
      updateIec61850Name: state.updateIec61850Name,
      updateSarefName: state.updateSarefName,
      updateEebusName: state.updateEebusName,
      updateSunSpecName: state.updateSunSpecName,
      updateHpBwpName: state.updateHpBwpName,
      updateEn17609Name: state.updateEn17609Name,
      addAlternativeNames: state.addAlternativeNames,
      removeAlternativeNames: state.removeAlternativeNames,
    }))
  );
}

export function AlternativeNamesForm() {
  const {
    sLV1Name,
    workName,
    manufName,
    iec61850Name,
    sarefName,
    eebusName,
    sunSpecName,
    hpBwpName,
    en17609Name,
    hasAlternativeNames,
    updateSLV1Name,
    updateWorkName,
    updateManufName,
    updateIec61850Name,
    updateSarefName,
    updateEebusName,
    updateSunSpecName,
    updateHpBwpName,
    updateEn17609Name,
    addAlternativeNames,
    removeAlternativeNames,
  } = useAlternativeNames();

  const { getError } = useProfileValidation();

  const handleAdd = () => {
    // Initialize alternative names with empty object
    addAlternativeNames();
  };

  const handleRemove = () => {
    // Remove alternative names from profile
    removeAlternativeNames();
  };

  return (
    <FormSection
      title={"Alternative Names"}
      description={"Alternative naming conventions for the functional profile"}
      required={false}
      isAdded={hasAlternativeNames}
      onAdd={handleAdd}
      onRemove={handleRemove}
    >
      <FormGroup columns={2}>
        <InputField
          label={"SLV1 Name"}
          name={"sLV1Name"}
          required={false}
          type="text"
          value={sLV1Name}
          onChange={(value) => updateSLV1Name(value || undefined)}
          error={getError("functionalProfile.alternativeNames.sLV1Name")}
        />
        <InputField
          label={"Work Name"}
          name={"workName"}
          required={false}
          type="text"
          value={workName}
          onChange={(value) => updateWorkName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.workName")}
        />
      </FormGroup>

      <FormGroup columns={2}>
        <InputField
          label={"Manufacturer Name"}
          name={"manufName"}
          required={false}
          type="text"
          value={manufName}
          onChange={(value) => updateManufName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.manufName")}
        />
        <InputField
          label={"IEC 61850 Name"}
          name={"iec61850Name"}
          required={false}
          type="text"
          value={iec61850Name}
          onChange={(value) => updateIec61850Name(value || undefined)}
          error={getError("functionalProfile.alternativeNames.iec61850Name")}
        />
      </FormGroup>

      <FormGroup columns={2}>
        <InputField
          label={"SAREF Name"}
          name={"sarefName"}
          required={false}
          type="text"
          value={sarefName}
          onChange={(value) => updateSarefName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.sarefName")}
        />
        <InputField
          label={"EEBus Name"}
          name={"eebusName"}
          required={false}
          type="text"
          value={eebusName}
          onChange={(value) => updateEebusName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.eebusName")}
        />
      </FormGroup>

      <FormGroup columns={2}>
        <InputField
          label={"SunSpec Name"}
          name={"sunSpecName"}
          required={false}
          type="text"
          value={sunSpecName}
          onChange={(value) => updateSunSpecName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.sunSpecName")}
        />
        <InputField
          label={"HP/BWP Name"}
          name={"hpBwpName"}
          required={false}
          type="text"
          value={hpBwpName}
          onChange={(value) => updateHpBwpName(value || undefined)}
          error={getError("functionalProfile.alternativeNames.hpBwpName")}
        />
      </FormGroup>

      <FormGroup columns={2}>
        <InputField
          label={"EN 17609 Name"}
          name={"en17609Name"}
          required={false}
          type="text"
          value={en17609Name}
          onChange={(value) => updateEn17609Name(value || undefined)}
          error={getError("functionalProfile.alternativeNames.en17609Name")}
        />
      </FormGroup>
    </FormSection>
  );
}
