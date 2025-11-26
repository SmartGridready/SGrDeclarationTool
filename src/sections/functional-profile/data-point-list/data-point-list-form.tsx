import { useShallow } from "zustand/react/shallow";
import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { TextareaField } from "@/sections/shared/components/forms/textarea-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import {
  FunctionalProfileDataPoint,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  DataTypeFunctionalProfile,
  Units,
  Language,
  LegibleDescription,
} from "@/models";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";
import {
  DATA_DIRECTION_OPTIONS,
  PRESENCE_LEVEL_OPTIONS,
  DATA_TYPE_OPTIONS,
  UNIT_OPTIONS,
} from "./data-point-list-form-options";
import { LANGUAGE_OPTIONS } from "@/sections/functional-profile/legible-description/legible-description-form-options";

function useDataPointList() {
  return useProfileStore(
    useShallow((state) => ({
      dataPoints: state.profile?.dataPointList?.dataPointListElement,
      hasDataPointList: !!state.profile?.dataPointList,
      addEmptyDataPoint: state.addEmptyDataPoint,
      removeDataPoint: state.removeDataPoint,
      removeAllDataPoints: state.removeAllDataPoints,
      updateDataPointName: state.updateDataPointName,
      updateDataDirection: state.updateDataDirection,
      updatePresenceLevel: state.updatePresenceLevel,
      updateDataType: state.updateDataType,
      updateUnit: state.updateUnit,
      addEmptyDataPointLegibleDescription:
        state.addEmptyDataPointLegibleDescription,
      removeDataPointLegibleDescription:
        state.removeDataPointLegibleDescription,
      updateDataPointLegibleDescriptionText:
        state.updateDataPointLegibleDescriptionText,
      updateDataPointLegibleDescriptionLanguage:
        state.updateDataPointLegibleDescriptionLanguage,
    }))
  );
}

export function DataPointListForm() {
  const {
    dataPoints,
    hasDataPointList,
    addEmptyDataPoint,
    removeDataPoint,
    removeAllDataPoints,
    updateDataPointName,
    updateDataDirection,
    updatePresenceLevel,
    updateDataType,
    updateUnit,
    addEmptyDataPointLegibleDescription,
    removeDataPointLegibleDescription,
    updateDataPointLegibleDescriptionText,
    updateDataPointLegibleDescriptionLanguage,
  } = useDataPointList();

  const { getError } = useProfileValidation();

  return (
    <FormSection
      title="Data Point List"
      description="Define the data points for this functional profile"
      required={false}
      isAdded={hasDataPointList}
      onAdd={addEmptyDataPoint}
      onRemove={removeAllDataPoints}
    >
      <ArrayField<FunctionalProfileDataPoint>
        label="Data Points"
        items={dataPoints}
        onAdd={addEmptyDataPoint}
        onRemove={removeDataPoint}
        emptyMessage="No data points added"
        renderItem={(item, index) => (
          <div className="space-y-4">
            <InputField
              label="Data Point Name"
              name={`dataPoint-${index}-name`}
              value={item.dataPoint.dataPointName}
              onChange={(value) => updateDataPointName(index, value)}
              placeholder="Enter data point name"
              required={true}
              error={getError(
                `dataPointList.dataPointListElement.${index}.dataPoint.dataPointName`
              )}
            />

            <FormGroup columns={2}>
              <SelectField
                label="Data Direction"
                name={`dataPoint-${index}-direction`}
                options={
                  DATA_DIRECTION_OPTIONS as unknown as {
                    value: string;
                    label: string;
                  }[]
                }
                value={item.dataPoint.dataDirection}
                onChange={(value) =>
                  updateDataDirection(
                    index,
                    value as DataDirectionFunctionalProfile
                  )
                }
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${index}.dataPoint.dataDirection`
                )}
              />
              <SelectField
                label="Presence Level"
                name={`dataPoint-${index}-presence`}
                options={
                  PRESENCE_LEVEL_OPTIONS as unknown as {
                    value: string;
                    label: string;
                  }[]
                }
                value={item.dataPoint.presenceLevel}
                onChange={(value) =>
                  updatePresenceLevel(index, value as PresenceLevel)
                }
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${index}.dataPoint.presenceLevel`
                )}
              />
            </FormGroup>

            <FormGroup columns={2}>
              <SelectField
                label="Data Type"
                name={`dataPoint-${index}-dataType`}
                options={
                  DATA_TYPE_OPTIONS as unknown as {
                    value: string;
                    label: string;
                  }[]
                }
                value={item.dataPoint.dataType}
                onChange={(value) =>
                  updateDataType(index, value as DataTypeFunctionalProfile)
                }
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${index}.dataPoint.dataType`
                )}
              />
              <SelectField
                label="Unit"
                name={`dataPoint-${index}-unit`}
                options={
                  UNIT_OPTIONS as unknown as { value: string; label: string }[]
                }
                value={item.dataPoint.unit}
                onChange={(value) => updateUnit(index, value as Units)}
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${index}.dataPoint.unit`
                )}
              />
            </FormGroup>

            {/* Nested Legible Descriptions */}
            <div className="border-t pt-4 mt-4">
              <ArrayField<LegibleDescription>
                label="Descriptions"
                items={item.dataPoint.legibleDescription}
                onAdd={() => addEmptyDataPointLegibleDescription(index)}
                onRemove={(descIndex) =>
                  removeDataPointLegibleDescription(index, descIndex)
                }
                emptyMessage="No descriptions added"
                maxItems={4}
                renderItem={(desc, descIndex) => (
                  <div className="space-y-3">
                    <TextareaField
                      label="Text"
                      name={`dataPoint-${index}-desc-${descIndex}-text`}
                      value={desc.textElement}
                      onChange={(value) =>
                        updateDataPointLegibleDescriptionText(
                          index,
                          descIndex,
                          value
                        )
                      }
                      placeholder="Enter description"
                      required={true}
                      rows={3}
                      error={getError(
                        `dataPointList.dataPointListElement.${index}.dataPoint.legibleDescription.${descIndex}.textElement`
                      )}
                    />
                    <SelectField
                      label="Language"
                      name={`dataPoint-${index}-desc-${descIndex}-lang`}
                      options={LANGUAGE_OPTIONS}
                      value={desc.language}
                      onChange={(value) =>
                        updateDataPointLegibleDescriptionLanguage(
                          index,
                          descIndex,
                          value as Language
                        )
                      }
                      required={true}
                      error={getError(
                        `dataPointList.dataPointListElement.${index}.dataPoint.legibleDescription.${descIndex}.language`
                      )}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        )}
      />
    </FormSection>
  );
}
