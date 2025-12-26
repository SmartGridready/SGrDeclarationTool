"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import {
  MasterFunctionsSupported,
  MASTER_FUNCTIONS_SUPPORTED_VALUES,
} from "@/models/product/modbus-types";
import { createFormOptions } from "@/models/form-options-helper";

const MASTER_FUNCTIONS_SUPPORTED_OPTIONS = createFormOptions(MASTER_FUNCTIONS_SUPPORTED_VALUES);

export function MasterFunctionsSupportedListForm() {
  const { useDeviceState, useValidation, masterFunctionsSupportedListActions, pathPrefix } =
    useDeviceFormContext();

  const masterFunctionsSupportedList = useDeviceState(
    (d) =>
      d?.interfaceList?.modbusInterface?.modbusInterfaceDescription?.masterFunctionsSupportedList
  );
  const { getError } = useValidation();

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(
      pathPrefix,
      `interfaceList.modbusInterface.modbusInterfaceDescription.masterFunctionsSupportedList.${field}`
    );

  return (
    <FormSection
      title="Master Functions Supported List"
      description="Configure the list of supported Modbus master functions"
      required={false}
      isAdded={!!masterFunctionsSupportedList}
      onAdd={() => masterFunctionsSupportedListActions.addMasterFunctionsSupportedList()}
      onRemove={() => masterFunctionsSupportedListActions.removeMasterFunctionsSupportedList()}
      nested={true}
    >
      {masterFunctionsSupportedList && (
        <ArrayField
          label="Master Functions Supported"
          items={masterFunctionsSupportedList.masterFunctionsSupported}
          onAdd={() => {
            // Add the first available function that's not already in the list
            const existing = masterFunctionsSupportedList.masterFunctionsSupported || [];
            const available = MASTER_FUNCTIONS_SUPPORTED_VALUES.find(
              (func) => !existing.includes(func)
            );
            if (available) {
              masterFunctionsSupportedListActions.addMasterFunctionSupported(available);
            }
          }}
          onRemove={(index) =>
            masterFunctionsSupportedListActions.removeMasterFunctionSupported(index)
          }
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
                  masterFunctionsSupportedListActions.updateMasterFunctionSupported(
                    index,
                    value as MasterFunctionsSupported
                  );
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
