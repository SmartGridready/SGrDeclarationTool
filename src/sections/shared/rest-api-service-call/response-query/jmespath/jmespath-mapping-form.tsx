"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { FormGroup } from "@/components/forms/form-group";
import { ArrayField } from "@/components/forms/array-field";
import { ResponseQuery, JMESPathMappingRecord } from "@/models/generic";
import { JmesPathMappingSlice } from "./jmespath-mapping-slice";

interface JmesPathMappingFormProps {
  responseQuery: ResponseQuery;
  actions: JmesPathMappingSlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function JmesPathMappingForm({
  responseQuery,
  actions,
  fieldPathPrefix,
  getError,
}: JmesPathMappingFormProps) {
  const hasJmesPathMappings = responseQuery !== undefined && "jmesPathMappings" in responseQuery;

  return (
    <FormSection
      title="JMESPath Mappings"
      description="Map source paths to target paths"
      required={false}
      isAdded={hasJmesPathMappings}
      onAdd={() => actions.addResponseQueryJmesPathMapping()}
      onRemove={() => actions.removeResponseQueryJmesPathMapping()}
      nested={true}
    >
      {hasJmesPathMappings && (
        <ArrayField<JMESPathMappingRecord>
          label="Mappings"
          items={responseQuery.jmesPathMappings.mapping}
          onAdd={() => actions.addResponseQueryJmesPathMappingRecord()}
          onRemove={(index) => actions.removeResponseQueryJmesPathMappingRecord(index)}
          emptyMessage="No mappings added"
          renderItem={(mapping, index) => (
            <FormGroup columns={3}>
              <InputField
                label="From"
                name={`${fieldPathPrefix}-jmespath-${index}-from`}
                type="text"
                value={mapping.from}
                onChange={(value) =>
                  actions.updateResponseQueryJmesPathMappingRecordFrom(index, value)
                }
                placeholder="Enter source path"
                required={true}
                error={getError(
                  `${fieldPathPrefix}.responseQuery.jmesPathMappings.mapping[${index}].from`
                )}
              />
              <InputField
                label="To"
                name={`${fieldPathPrefix}-jmespath-${index}-to`}
                type="text"
                value={mapping.to}
                onChange={(value) =>
                  actions.updateResponseQueryJmesPathMappingRecordTo(index, value)
                }
                placeholder="Enter target path"
                required={true}
                error={getError(
                  `${fieldPathPrefix}.responseQuery.jmesPathMappings.mapping[${index}].to`
                )}
              />
              <InputField
                label="Name (Optional)"
                name={`${fieldPathPrefix}-jmespath-${index}-name`}
                type="text"
                value={mapping.name || ""}
                onChange={(value) =>
                  actions.updateResponseQueryJmesPathMappingRecordName(index, value || undefined)
                }
                placeholder="Enter mapping name"
                required={false}
                error={getError(
                  `${fieldPathPrefix}.responseQuery.jmesPathMappings.mapping[${index}].name`
                )}
              />
            </FormGroup>
          )}
        />
      )}
    </FormSection>
  );
}
