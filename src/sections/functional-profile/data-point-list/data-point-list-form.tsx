import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { TextareaField } from "@/sections/shared/components/forms/textarea-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { useFormSection } from "@/sections/shared/hooks/use-form-section";
import {
  FunctionalProfileDataPoint,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  Units,
  Language,
  LegibleDescription,
} from "@/models";
import {
  DATA_DIRECTION_OPTIONS,
  PRESENCE_LEVEL_OPTIONS,
  DATA_TYPE_OPTIONS,
  UNIT_OPTIONS,
} from "@/sections/functional-profile/data-point-list/data-point-list-form-options";
import { LANGUAGE_OPTIONS } from "@/sections/functional-profile/legible-description/legible-description-form-options";
import {
  isEnumDataType,
  isBitmapDataType,
  isJsonDataType,
  getDataTypeStringValue,
  createDataTypeFromString,
} from "@/sections/functional-profile/data-point-list/data-type-utils";
import { EnumForm } from "@/sections/functional-profile/data-point-list/enum/enum-form";
import { BitmapForm } from "@/sections/functional-profile/data-point-list/bitmap/bitmap-form";
import { JsonForm } from "@/sections/functional-profile/data-point-list/json/json-form";
import { JsonSlice } from "@/sections/functional-profile/data-point-list/json/json-slice";

export function DataPointListForm() {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } =
    useFormSection({
      stateSelector: (store) => ({
        dataPoints: store.profile?.dataPointList?.dataPointListElement,
      }),
      actionsSelector: (store) => ({
        addEmptyDataPoint: store.addEmptyDataPoint,
        removeDataPoint: store.removeDataPoint,
        removeAllDataPoints: store.removeAllDataPoints,
        updateDataPointName: store.updateDataPointName,
        updateDataDirection: store.updateDataDirection,
        updatePresenceLevel: store.updatePresenceLevel,
        updateDataType: store.updateDataType,
        updateUnit: store.updateUnit,
        updateArrayLength: store.updateArrayLength,
        addEmptyDataPointLegibleDescription:
          store.addEmptyDataPointLegibleDescription,
        removeDataPointLegibleDescription:
          store.removeDataPointLegibleDescription,
        updateDataPointLegibleDescriptionText:
          store.updateDataPointLegibleDescriptionText,
        updateDataPointLegibleDescriptionLanguage:
          store.updateDataPointLegibleDescriptionLanguage,
        // Enum methods
        setEnumDataType: store.setEnumDataType,
        addEnumEntry: store.addEnumEntry,
        removeEnumEntry: store.removeEnumEntry,
        updateEnumEntryLiteral: store.updateEnumEntryLiteral,
        updateEnumEntryDescription: store.updateEnumEntryDescription,
        updateEnumHexMask: store.updateEnumHexMask,
        addEmptyEnumEntry: store.addEmptyEnumEntry,
        // Bitmap methods
        setBitmapDataType: store.setBitmapDataType,
        addBitmapEntry: store.addBitmapEntry,
        removeBitmapEntry: store.removeBitmapEntry,
        updateBitmapEntryLiteral: store.updateBitmapEntryLiteral,
        updateBitmapEntryDescription: store.updateBitmapEntryDescription,
        addEmptyBitmapEntry: store.addEmptyBitmapEntry,
        // JSON methods
        setJsonDataType: store.setJsonDataType,
        addJsonItem: store.addJsonItem,
        removeJsonItem: store.removeJsonItem,
        updateJsonArrayItem: store.updateJsonArrayItem,
        updateJsonElemItem: store.updateJsonElemItem,
        addJsonItemAtPath: store.addJsonItemAtPath,
        removeJsonItemAtPath: store.removeJsonItemAtPath,
        updateJsonArrayItemAtPath: store.updateJsonArrayItemAtPath,
        updateJsonElemItemAtPath: store.updateJsonElemItemAtPath,
        addJsonNestedItem: store.addJsonNestedItem,
        removeJsonNestedItem: store.removeJsonNestedItem,
        updateJsonNestedArrayItem: store.updateJsonNestedArrayItem,
        updateJsonNestedElemItem: store.updateJsonNestedElemItem,
      }),
      isAddedSelector: (store) => !!store.profile?.dataPointList,
      onAdd: (actions) => actions.addEmptyDataPoint(),
      onRemove: (actions) => actions.removeAllDataPoints(),
    });

  return (
    <FormSection
      title="Data Point List"
      description="Define the data points for this functional profile"
      required={false}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
    >
      <ArrayField<FunctionalProfileDataPoint>
        label="Data Points"
        items={state.dataPoints}
        onAdd={actions.addEmptyDataPoint}
        onRemove={actions.removeDataPoint}
        emptyMessage="No data points added"
        renderItem={(item, index) => (
          <>
            <InputField
              label="Data Point Name"
              name={`dataPoint-${index}-name`}
              value={item.dataPoint.dataPointName}
              onChange={(value) => actions.updateDataPointName(index, value)}
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
                  actions.updateDataDirection(
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
                  actions.updatePresenceLevel(index, value as PresenceLevel)
                }
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${index}.dataPoint.presenceLevel`
                )}
              />
            </FormGroup>

            <FormGroup columns={3}>
              <SelectField
                label="Data Type"
                name={`dataPoint-${index}-dataType`}
                options={
                  DATA_TYPE_OPTIONS as unknown as {
                    value: string;
                    label: string;
                  }[]
                }
                value={getDataTypeStringValue(item.dataPoint.dataType)}
                onChange={(value) => {
                  const newDataType = createDataTypeFromString(value);
                  // If switching to enum/bitmap/json, initialize empty structure
                  if (value === "enum" && !isEnumDataType(newDataType)) {
                    actions.setEnumDataType(index, {});
                  } else if (
                    value === "bitmap" &&
                    !isBitmapDataType(newDataType)
                  ) {
                    actions.setBitmapDataType(index, {});
                  } else if (value === "json" && !isJsonDataType(newDataType)) {
                    actions.setJsonDataType(index, {});
                  } else {
                    actions.updateDataType(index, newDataType);
                  }
                }}
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
                onChange={(value) => actions.updateUnit(index, value as Units)}
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${index}.dataPoint.unit`
                )}
              />
              <InputField
                label="Array Length"
                name={`dataPoint-${index}-arrayLength`}
                type="number"
                value={item.dataPoint.arrayLength?.toString() || ""}
                onChange={(value) =>
                  actions.updateArrayLength(
                    index,
                    value ? parseInt(value, 10) : undefined
                  )
                }
                placeholder="Enter array length"
                error={getError(
                  `dataPointList.dataPointListElement.${index}.dataPoint.arrayLength`
                )}
              />
            </FormGroup>

            {/* Enum Data Type Configuration */}
            {isEnumDataType(item.dataPoint.dataType) && (
              <EnumForm
                dataPointIndex={index}
                enumMap={item.dataPoint.dataType.enum}
                enumSlice={{
                  setEnumDataType: actions.setEnumDataType,
                  addEnumEntry: actions.addEnumEntry,
                  removeEnumEntry: actions.removeEnumEntry,
                  updateEnumEntryLiteral: actions.updateEnumEntryLiteral,
                  updateEnumEntryDescription:
                    actions.updateEnumEntryDescription,
                  updateEnumHexMask: actions.updateEnumHexMask,
                  addEmptyEnumEntry: actions.addEmptyEnumEntry,
                }}
              />
            )}

            {/* Bitmap Data Type Configuration */}
            {isBitmapDataType(item.dataPoint.dataType) && (
              <BitmapForm
                dataPointIndex={index}
                bitmap={item.dataPoint.dataType.bitmap}
                bitmapSlice={{
                  setBitmapDataType: actions.setBitmapDataType,
                  addBitmapEntry: actions.addBitmapEntry,
                  removeBitmapEntry: actions.removeBitmapEntry,
                  updateBitmapEntryLiteral: actions.updateBitmapEntryLiteral,
                  updateBitmapEntryDescription:
                    actions.updateBitmapEntryDescription,
                  addEmptyBitmapEntry: actions.addEmptyBitmapEntry,
                }}
              />
            )}

            {/* JSON Data Type Configuration */}
            {isJsonDataType(item.dataPoint.dataType) && (
              <JsonForm
                dataPointIndex={index}
                items={item.dataPoint.dataType.json.items}
                jsonSlice={
                  {
                    setJsonDataType: actions.setJsonDataType,
                    addJsonItem: actions.addJsonItem,
                    removeJsonItem: actions.removeJsonItem,
                    updateJsonArrayItem: actions.updateJsonArrayItem,
                    updateJsonElemItem: actions.updateJsonElemItem,
                    addJsonItemAtPath: actions.addJsonItemAtPath,
                    removeJsonItemAtPath: actions.removeJsonItemAtPath,
                    updateJsonArrayItemAtPath:
                      actions.updateJsonArrayItemAtPath,
                    updateJsonElemItemAtPath: actions.updateJsonElemItemAtPath,
                    addJsonNestedItem: actions.addJsonNestedItem,
                    removeJsonNestedItem: actions.removeJsonNestedItem,
                    updateJsonNestedArrayItem:
                      actions.updateJsonNestedArrayItem,
                    updateJsonNestedElemItem: actions.updateJsonNestedElemItem,
                  } as JsonSlice
                }
              />
            )}

            {/* Nested Legible Descriptions */}
            <FormSection title="Descriptions" nested>
              <ArrayField<LegibleDescription>
                label="Descriptions"
                items={item.dataPoint.legibleDescription}
                onAdd={() => actions.addEmptyDataPointLegibleDescription(index)}
                onRemove={(descIndex) =>
                  actions.removeDataPointLegibleDescription(index, descIndex)
                }
                emptyMessage="No descriptions added"
                maxItems={4}
                renderItem={(desc, descIndex) => (
                  <>
                    <TextareaField
                      label="Text"
                      name={`dataPoint-${index}-desc-${descIndex}-text`}
                      value={desc.textElement}
                      onChange={(value) =>
                        actions.updateDataPointLegibleDescriptionText(
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
                        actions.updateDataPointLegibleDescriptionLanguage(
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
                  </>
                )}
              />
            </FormSection>
          </>
        )}
      />
    </FormSection>
  );
}
