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
import {
  isEnumDataType,
  isBitmapDataType,
  isJsonDataType,
  getDataTypeStringValue,
  createDataTypeFromString,
} from "./data-type-utils";
import { EnumForm } from "./enum/enum-form";
import { BitmapForm } from "./bitmap/bitmap-form";
import { JsonForm } from "./json/json-form";
import { JsonSlice } from "./json/json-slice";
import { FormSubSection } from "@/sections/shared/components/forms/form-subsection";

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
      updateArrayLength: state.updateArrayLength,
      addEmptyDataPointLegibleDescription:
        state.addEmptyDataPointLegibleDescription,
      removeDataPointLegibleDescription:
        state.removeDataPointLegibleDescription,
      updateDataPointLegibleDescriptionText:
        state.updateDataPointLegibleDescriptionText,
      updateDataPointLegibleDescriptionLanguage:
        state.updateDataPointLegibleDescriptionLanguage,
      // Enum methods
      setEnumDataType: state.setEnumDataType,
      addEnumEntry: state.addEnumEntry,
      removeEnumEntry: state.removeEnumEntry,
      updateEnumEntryLiteral: state.updateEnumEntryLiteral,
      updateEnumEntryDescription: state.updateEnumEntryDescription,
      updateEnumHexMask: state.updateEnumHexMask,
      addEmptyEnumEntry: state.addEmptyEnumEntry,
      // Bitmap methods
      setBitmapDataType: state.setBitmapDataType,
      addBitmapEntry: state.addBitmapEntry,
      removeBitmapEntry: state.removeBitmapEntry,
      updateBitmapEntryLiteral: state.updateBitmapEntryLiteral,
      updateBitmapEntryDescription: state.updateBitmapEntryDescription,
      addEmptyBitmapEntry: state.addEmptyBitmapEntry,
      // JSON methods
      setJsonDataType: state.setJsonDataType,
      addJsonItem: state.addJsonItem,
      removeJsonItem: state.removeJsonItem,
      updateJsonArrayItem: state.updateJsonArrayItem,
      updateJsonElemItem: state.updateJsonElemItem,
      addJsonItemAtPath: state.addJsonItemAtPath,
      removeJsonItemAtPath: state.removeJsonItemAtPath,
      updateJsonArrayItemAtPath: state.updateJsonArrayItemAtPath,
      updateJsonElemItemAtPath: state.updateJsonElemItemAtPath,
      addJsonNestedItem: state.addJsonNestedItem,
      removeJsonNestedItem: state.removeJsonNestedItem,
      updateJsonNestedArrayItem: state.updateJsonNestedArrayItem,
      updateJsonNestedElemItem: state.updateJsonNestedElemItem,
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
    updateArrayLength,
    addEmptyDataPointLegibleDescription,
    removeDataPointLegibleDescription,
    updateDataPointLegibleDescriptionText,
    updateDataPointLegibleDescriptionLanguage,
    setEnumDataType,
    addEnumEntry,
    removeEnumEntry,
    updateEnumEntryLiteral,
    updateEnumEntryDescription,
    updateEnumHexMask,
    addEmptyEnumEntry,
    setBitmapDataType,
    addBitmapEntry,
    removeBitmapEntry,
    updateBitmapEntryLiteral,
    updateBitmapEntryDescription,
    addEmptyBitmapEntry,
    setJsonDataType,
    addJsonItem,
    removeJsonItem,
    updateJsonArrayItem,
    updateJsonElemItem,
    addJsonItemAtPath,
    removeJsonItemAtPath,
    updateJsonArrayItemAtPath,
    updateJsonElemItemAtPath,
    addJsonNestedItem,
    removeJsonNestedItem,
    updateJsonNestedArrayItem,
    updateJsonNestedElemItem,
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
          <>
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
                    setEnumDataType(index, {});
                  } else if (
                    value === "bitmap" &&
                    !isBitmapDataType(newDataType)
                  ) {
                    setBitmapDataType(index, {});
                  } else if (value === "json" && !isJsonDataType(newDataType)) {
                    setJsonDataType(index, {});
                  } else {
                    updateDataType(index, newDataType);
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
                onChange={(value) => updateUnit(index, value as Units)}
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
                  updateArrayLength(
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
                  setEnumDataType,
                  addEnumEntry,
                  removeEnumEntry,
                  updateEnumEntryLiteral,
                  updateEnumEntryDescription,
                  updateEnumHexMask,
                  addEmptyEnumEntry,
                }}
              />
            )}

            {/* Bitmap Data Type Configuration */}
            {isBitmapDataType(item.dataPoint.dataType) && (
              <BitmapForm
                dataPointIndex={index}
                bitmap={item.dataPoint.dataType.bitmap}
                bitmapSlice={{
                  setBitmapDataType,
                  addBitmapEntry,
                  removeBitmapEntry,
                  updateBitmapEntryLiteral,
                  updateBitmapEntryDescription,
                  addEmptyBitmapEntry,
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
                    setJsonDataType,
                    addJsonItem,
                    removeJsonItem,
                    updateJsonArrayItem,
                    updateJsonElemItem,
                    addJsonItemAtPath,
                    removeJsonItemAtPath,
                    updateJsonArrayItemAtPath,
                    updateJsonElemItemAtPath,
                    addJsonNestedItem,
                    removeJsonNestedItem,
                    updateJsonNestedArrayItem,
                    updateJsonNestedElemItem,
                  } as JsonSlice
                }
              />
            )}

            {/* Nested Legible Descriptions */}
            <FormSubSection title="Descriptions">
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
                  <>
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
                  </>
                )}
              />
            </FormSubSection>
          </>
        )}
      />
    </FormSection>
  );
}
