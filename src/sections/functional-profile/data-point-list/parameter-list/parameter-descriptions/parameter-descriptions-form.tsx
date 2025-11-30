import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { TextareaField } from "@/sections/shared/components/forms/textarea-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { DynamicParameterDescription, Language } from "@/models";
import { ParameterDescriptionsSlice } from "@/sections/functional-profile/data-point-list/parameter-list/parameter-descriptions/parameter-descriptions-slice";
import { LANGUAGE_OPTIONS } from "@/sections/shared/sections/legible-description/legible-description-form-options";

interface ParameterDescriptionsFormProps {
  dataPointIndex: number;
  paramIndex: number;
  parameterDescriptions: DynamicParameterDescription[] | undefined;
  parameterDescriptionsSlice: ParameterDescriptionsSlice;
  getError: (path: string) => string | undefined;
}

export function ParameterDescriptionsForm({
  dataPointIndex,
  paramIndex,
  parameterDescriptions,
  parameterDescriptionsSlice,
  getError,
}: ParameterDescriptionsFormProps) {
  return (
    <FormSection title="Parameter Descriptions" nested>
      <ArrayField
        label="Descriptions"
        items={parameterDescriptions}
        onAdd={() =>
          parameterDescriptionsSlice.addEmptyDataPointParameterDescription(
            dataPointIndex,
            paramIndex
          )
        }
        onRemove={(descIndex) =>
          parameterDescriptionsSlice.removeDataPointParameterDescription(
            dataPointIndex,
            paramIndex,
            descIndex
          )
        }
        emptyMessage="No descriptions added"
        renderItem={(desc, descIndex) => (
          <>
            <TextareaField
              label="Text"
              name={`dataPoint-${dataPointIndex}-param-${paramIndex}-desc-${descIndex}-text`}
              value={desc.textElement}
              onChange={(value) =>
                parameterDescriptionsSlice.updateDataPointParameterDescriptionText(
                  dataPointIndex,
                  paramIndex,
                  descIndex,
                  value
                )
              }
              placeholder="Enter description"
              required={true}
              rows={3}
              error={getError(
                `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList.parameterListElement.${paramIndex}.parameterDescription.${descIndex}.textElement`
              )}
            />
            <FormGroup columns={3}>
              <SelectField
                label="Language"
                name={`dataPoint-${dataPointIndex}-param-${paramIndex}-desc-${descIndex}-lang`}
                options={LANGUAGE_OPTIONS}
                value={desc.language}
                onChange={(value) =>
                  parameterDescriptionsSlice.updateDataPointParameterDescriptionLanguage(
                    dataPointIndex,
                    paramIndex,
                    descIndex,
                    value as Language
                  )
                }
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList.parameterListElement.${paramIndex}.parameterDescription.${descIndex}.language`
                )}
              />
              <InputField
                label="URI"
                name={`dataPoint-${dataPointIndex}-param-${paramIndex}-desc-${descIndex}-uri`}
                type="text"
                value={desc.uri || ""}
                onChange={(value) =>
                  parameterDescriptionsSlice.updateDataPointParameterDescriptionUri(
                    dataPointIndex,
                    paramIndex,
                    descIndex,
                    value || undefined
                  )
                }
                placeholder="Enter URI"
                required={false}
                error={getError(
                  `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList.parameterListElement.${paramIndex}.parameterDescription.${descIndex}.uri`
                )}
              />
              <InputField
                label="Label"
                name={`dataPoint-${dataPointIndex}-param-${paramIndex}-desc-${descIndex}-label`}
                type="text"
                value={desc.label || ""}
                onChange={(value) =>
                  parameterDescriptionsSlice.updateDataPointParameterDescriptionLabel(
                    dataPointIndex,
                    paramIndex,
                    descIndex,
                    value || undefined
                  )
                }
                placeholder="Enter label"
                required={false}
                error={getError(
                  `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList.parameterListElement.${paramIndex}.parameterDescription.${descIndex}.label`
                )}
              />
            </FormGroup>
          </>
        )}
      />
    </FormSection>
  );
}
