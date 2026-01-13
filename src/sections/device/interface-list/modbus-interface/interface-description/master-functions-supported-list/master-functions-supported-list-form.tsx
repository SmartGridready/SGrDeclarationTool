"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useShallow } from "zustand/react/shallow";
import { MasterFunctionsSupported, MASTER_FUNCTIONS_SUPPORTED_VALUES } from "@/models/product/modbus-types";
import { createFormOptions } from "@/utils/form-options-utils";

const MASTER_FUNCTIONS_SUPPORTED_OPTIONS = createFormOptions(MASTER_FUNCTIONS_SUPPORTED_VALUES);

export function MasterFunctionsSupportedListForm() {
  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();

  const masterFunctionsSupportedList = useDeviceStore(
    useShallow(
      (state) => state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription?.masterFunctionsSupportedList
    )
  );

  return (
    <FormSection
      title="Master Functions Supported List"
      description="Configure the list of supported Modbus master functions"
      required={false}
      isAdded={!!masterFunctionsSupportedList}
      onAdd={() => store.addMasterFunctionsSupportedList()}
      onRemove={() => store.removeMasterFunctionsSupportedList()}
      nested={true}
    >
      {masterFunctionsSupportedList && (
        <ArrayField
          label="Master Functions Supported"
          items={masterFunctionsSupportedList.masterFunctionsSupported}
          onAdd={() => {
            // Add the first available function that's not already in the list
            const existing = masterFunctionsSupportedList.masterFunctionsSupported || [];
            const available = MASTER_FUNCTIONS_SUPPORTED_VALUES.find((func) => !existing.includes(func));
            if (available) {
              store.addMasterFunctionSupported(available);
            }
          }}
          onRemove={(index) => store.removeMasterFunctionSupported(index)}
          emptyMessage="No master functions added"
          renderItem={(func, index) => (
            <FormGroup>
              <SelectField
                label="Master Function"
                name={`masterFunction-${index}`}
                required={true}
                options={MASTER_FUNCTIONS_SUPPORTED_OPTIONS}
                value={func}
                onChange={(value) => {
                  store.updateMasterFunctionSupported(index, value as MasterFunctionsSupported);
                }}
                error={getError(`masterFunctionsSupported.${index}`)}
              />
            </FormGroup>
          )}
        />
      )}
    </FormSection>
  );
}
