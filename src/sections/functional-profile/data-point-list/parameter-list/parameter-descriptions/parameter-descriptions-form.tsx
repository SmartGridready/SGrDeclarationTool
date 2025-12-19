"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { DynamicParameterDescription, Language } from "@/models";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { LANGUAGE_OPTIONS } from "@/sections/shared/legible-description/legible-description-form-options";

interface ParameterDescriptionsFormProps {
  dataPointIndex: number;
  paramIndex: number;
  parameterDescriptions: DynamicParameterDescription[] | undefined;
  getError: (path: string) => string | undefined;
}

export function ParameterDescriptionsForm({
  dataPointIndex,
  paramIndex,
  parameterDescriptions,
  getError,
}: ParameterDescriptionsFormProps) {
  const { dataPointListActions } = useFunctionalProfileFormContext();

  return (
    <FormSection title="Parameter Descriptions" nested>
      <ArrayField
        label="Descriptions"
        items={parameterDescriptions}
        onAdd={() =>
          dataPointListActions.addEmptyDataPointParameterDescription(dataPointIndex, paramIndex)
        }
        onRemove={(descIndex) =>
          dataPointListActions.removeDataPointParameterDescription(
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
                dataPointListActions.updateDataPointParameterDescriptionText(
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
                  dataPointListActions.updateDataPointParameterDescriptionLanguage(
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
                  dataPointListActions.updateDataPointParameterDescriptionUri(
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
                  dataPointListActions.updateDataPointParameterDescriptionLabel(
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
