"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { ModbusExceptionCode, MODBUS_EXCEPTION_CODE_VALUES } from "@/models/product/modbus-types";
import { BOOLEAN_OPTIONS } from "@/models/generic";
import { createFormOptions } from "@/models/form-options-helper";

const MODBUS_EXCEPTION_CODE_OPTIONS = createFormOptions(MODBUS_EXCEPTION_CODE_VALUES);

interface AccessProtectionFormProps {
  accessProtection: { modbusExceptionCode: ModbusExceptionCode[]; isEnabled: boolean } | undefined;
  fieldPathPrefix: string;
  onAdd: () => void;
  onRemove: () => void;
}

export function AccessProtectionForm({
  accessProtection,
  fieldPathPrefix,
  onAdd,
  onRemove,
}: AccessProtectionFormProps) {
  const { useValidation, accessProtectionActions, pathPrefix } = useDeviceFormContext();
  const { getError } = useValidation();

  const fieldPath = (field: string) =>
    buildDeviceFieldPath(pathPrefix, `${fieldPathPrefix}.accessProtection.${field}`);

  return (
    <FormSection
      title="Access Protection"
      description="Configure access protection settings"
      required={false}
      isAdded={!!accessProtection}
      onAdd={onAdd}
      onRemove={onRemove}
      nested={true}
    >
      {accessProtection && (
        <>
          <FormGroup>
            <SelectField
              label="Is Enabled"
              name="accessProtectionIsEnabled"
              required={true}
              options={BOOLEAN_OPTIONS}
              value={accessProtection.isEnabled.toString()}
              onChange={(value) => accessProtectionActions.updateIsEnabled(value === "true")}
              error={getError(fieldPath("isEnabled"))}
            />
          </FormGroup>

          <ArrayField
            label="Modbus Exception Codes"
            items={accessProtection.modbusExceptionCode || []}
            onAdd={() => {
              const existing = accessProtection.modbusExceptionCode || [];
              const available = MODBUS_EXCEPTION_CODE_VALUES.find(
                (code) => !existing.includes(code)
              );
              if (available) {
                accessProtectionActions.addModbusExceptionCode(available);
              }
            }}
            onRemove={(index) => {
              // minOccurs="1" - prevent removing the last item
              if (accessProtection.modbusExceptionCode.length > 1) {
                accessProtectionActions.removeModbusExceptionCode(index);
              }
            }}
            emptyMessage="No exception codes added"
            renderItem={(code, index) => (
              <FormGroup>
                <SelectField
                  label="Modbus Exception Code"
                  name={`modbusExceptionCode-${index}`}
                  required={true}
                  options={MODBUS_EXCEPTION_CODE_OPTIONS}
                  value={code}
                  onChange={(value) => {
                    accessProtectionActions.updateModbusExceptionCode(
                      index,
                      value as ModbusExceptionCode
                    );
                  }}
                  error={getError(`modbusExceptionCode.${index}`)}
                />
              </FormGroup>
            )}
          />
        </>
      )}
    </FormSection>
  );
}
