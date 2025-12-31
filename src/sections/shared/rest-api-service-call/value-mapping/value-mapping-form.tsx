"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { ArrayField } from "@/components/forms/array-field";
import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { ValueMappingSlice } from "./value-mapping-slice";

interface ValueMappingFormProps {
  serviceCall: RestApiServiceCall;
  actions: ValueMappingSlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function ValueMappingForm({ serviceCall, actions, fieldPathPrefix, getError }: ValueMappingFormProps) {
  return (
    <FormSection
      title="Value Mapping"
      description="Map generic values to device-specific values"
      required={false}
      isAdded={!!serviceCall.valueMapping}
      onAdd={() => actions.addValueMapping()}
      onRemove={() => actions.removeValueMapping()}
      nested={true}
    >
      {serviceCall.valueMapping && (
        <ArrayField
          label="Value Mappings"
          items={serviceCall.valueMapping.mapping}
          onAdd={() => actions.addValueMappingEntry()}
          onRemove={(index) => actions.removeValueMappingEntry(index)}
          emptyMessage="No value mappings added"
          renderItem={(mapping, index) => (
            <FormGroup columns={2}>
              <InputField
                label="Generic Value"
                name={`${fieldPathPrefix}-valueMapping-${index}-genericValue`}
                type="text"
                value={mapping.genericValue}
                onChange={(value) => actions.updateValueMappingEntryGenericValue(index, value)}
                placeholder="Enter generic value"
                required={true}
                error={getError(`${fieldPathPrefix}.valueMapping.mapping[${index}].genericValue`)}
              />
              <InputField
                label="Device Value"
                name={`${fieldPathPrefix}-valueMapping-${index}-deviceValue`}
                type="text"
                value={mapping.deviceValue}
                onChange={(value) => actions.updateValueMappingEntryDeviceValue(index, value)}
                placeholder="Enter device value"
                required={true}
                error={getError(`${fieldPathPrefix}.valueMapping.mapping[${index}].deviceValue`)}
              />
            </FormGroup>
          )}
        />
      )}
    </FormSection>
  );
}
