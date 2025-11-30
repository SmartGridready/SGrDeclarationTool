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
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";
import {
  DATA_DIRECTION_OPTIONS,
  PRESENCE_LEVEL_OPTIONS,
  DATA_TYPE_OPTIONS,
  UNIT_OPTIONS,
} from "@/sections/functional-profile/data-point-list/data-point-list-form-options";
import { LANGUAGE_OPTIONS } from "@/sections/shared/sections/legible-description/legible-description-form-options";
import {
  isEnumDataType,
  isBitmapDataType,
  isJsonDataType,
  getDataTypeStringValue,
  createDataTypeFromString,
  getDataTypeProductStringValue,
  createDataTypeProductFromString,
  isEnumDataTypeProduct,
  isBitmapDataTypeProduct,
} from "@/sections/functional-profile/data-point-list/data-type-utils";
import { EnumForm } from "@/sections/functional-profile/data-point-list/enum/enum-form";
import { BitmapForm } from "@/sections/functional-profile/data-point-list/bitmap/bitmap-form";
import { JsonForm } from "@/sections/functional-profile/data-point-list/json/json-form";
import { JsonSlice } from "@/sections/functional-profile/data-point-list/json/json-slice";
import { DataPointAlternativeNamesForm } from "@/sections/functional-profile/data-point-list/alternative-names/alternative-names-form";

export function DataPointListForm() {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection({
    useStore: useProfileStore,
    useValidation: useProfileValidation,
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
      addEmptyDataPointLegibleDescription: store.addEmptyDataPointLegibleDescription,
      removeDataPointLegibleDescription: store.removeDataPointLegibleDescription,
      updateDataPointLegibleDescriptionText: store.updateDataPointLegibleDescriptionText,
      updateDataPointLegibleDescriptionLanguage: store.updateDataPointLegibleDescriptionLanguage,
      // AlternativeNames methods
      addDataPointAlternativeNames: store.addDataPointAlternativeNames,
      removeDataPointAlternativeNames: store.removeDataPointAlternativeNames,
      updateDataPointSLV1Name: store.updateDataPointSLV1Name,
      updateDataPointWorkName: store.updateDataPointWorkName,
      updateDataPointManufName: store.updateDataPointManufName,
      updateDataPointIec61850Name: store.updateDataPointIec61850Name,
      updateDataPointSarefName: store.updateDataPointSarefName,
      updateDataPointEebusName: store.updateDataPointEebusName,
      updateDataPointSunSpecName: store.updateDataPointSunSpecName,
      updateDataPointHpBwpName: store.updateDataPointHpBwpName,
      updateDataPointEn17609Name: store.updateDataPointEn17609Name,
      // ParameterList methods
      addDataPointParameterList: store.addDataPointParameterList,
      removeDataPointParameterList: store.removeDataPointParameterList,
      addDataPointParameterListElement: store.addDataPointParameterListElement,
      removeDataPointParameterListElement: store.removeDataPointParameterListElement,
      updateDataPointParameterListElementName: store.updateDataPointParameterListElementName,
      updateDataPointParameterListElementDataType:
        store.updateDataPointParameterListElementDataType,
      updateDataPointParameterListElementDefaultValue:
        store.updateDataPointParameterListElementDefaultValue,
      addEmptyDataPointParameterDescription: store.addEmptyDataPointParameterDescription,
      removeDataPointParameterDescription: store.removeDataPointParameterDescription,
      updateDataPointParameterDescriptionText: store.updateDataPointParameterDescriptionText,
      updateDataPointParameterDescriptionLanguage:
        store.updateDataPointParameterDescriptionLanguage,
      updateDataPointParameterDescriptionUri: store.updateDataPointParameterDescriptionUri,
      updateDataPointParameterDescriptionLabel: store.updateDataPointParameterDescriptionLabel,
      // ParameterList Enum methods
      setParameterListEnumDataType: store.setParameterListEnumDataType,
      addParameterListEnumEntry: store.addParameterListEnumEntry,
      removeParameterListEnumEntry: store.removeParameterListEnumEntry,
      updateParameterListEnumEntryLiteral: store.updateParameterListEnumEntryLiteral,
      updateParameterListEnumEntryOrdinal: store.updateParameterListEnumEntryOrdinal,
      updateParameterListEnumEntryDescription: store.updateParameterListEnumEntryDescription,
      updateParameterListEnumHexMask: store.updateParameterListEnumHexMask,
      addEmptyParameterListEnumEntry: store.addEmptyParameterListEnumEntry,
      // ParameterList Bitmap methods
      setParameterListBitmapDataType: store.setParameterListBitmapDataType,
      addParameterListBitmapEntry: store.addParameterListBitmapEntry,
      removeParameterListBitmapEntry: store.removeParameterListBitmapEntry,
      updateParameterListBitmapEntryLiteral: store.updateParameterListBitmapEntryLiteral,
      updateParameterListBitmapEntryHexMask: store.updateParameterListBitmapEntryHexMask,
      updateParameterListBitmapEntryDescription: store.updateParameterListBitmapEntryDescription,
      addEmptyParameterListBitmapEntry: store.addEmptyParameterListBitmapEntry,
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
                  actions.updateDataDirection(index, value as DataDirectionFunctionalProfile)
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
                onChange={(value) => actions.updatePresenceLevel(index, value as PresenceLevel)}
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
                  } else if (value === "bitmap" && !isBitmapDataType(newDataType)) {
                    actions.setBitmapDataType(index, {});
                  } else if (value === "json" && !isJsonDataType(newDataType)) {
                    actions.setJsonDataType(index, {});
                  } else {
                    actions.updateDataType(index, newDataType);
                  }
                }}
                required={true}
                error={getError(`dataPointList.dataPointListElement.${index}.dataPoint.dataType`)}
              />
              <SelectField
                label="Unit"
                name={`dataPoint-${index}-unit`}
                options={UNIT_OPTIONS as unknown as { value: string; label: string }[]}
                value={item.dataPoint.unit}
                onChange={(value) => actions.updateUnit(index, value as Units)}
                required={true}
                error={getError(`dataPointList.dataPointListElement.${index}.dataPoint.unit`)}
              />
              <InputField
                label="Array Length"
                name={`dataPoint-${index}-arrayLength`}
                type="number"
                value={item.dataPoint.arrayLength?.toString() || ""}
                onChange={(value) =>
                  actions.updateArrayLength(index, value ? parseInt(value, 10) : undefined)
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
                  updateEnumEntryDescription: actions.updateEnumEntryDescription,
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
                  updateBitmapEntryDescription: actions.updateBitmapEntryDescription,
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
                    updateJsonArrayItemAtPath: actions.updateJsonArrayItemAtPath,
                    updateJsonElemItemAtPath: actions.updateJsonElemItemAtPath,
                    addJsonNestedItem: actions.addJsonNestedItem,
                    removeJsonNestedItem: actions.removeJsonNestedItem,
                    updateJsonNestedArrayItem: actions.updateJsonNestedArrayItem,
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
                        actions.updateDataPointLegibleDescriptionText(index, descIndex, value)
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

            {/* Alternative Names */}
            <DataPointAlternativeNamesForm dataPointIndex={index} />

            {/* Parameter List */}
            <FormSection
              title="Parameter List"
              description="Dynamic parameters that must be provided to execute read/write operations for this data point"
              required={false}
              isAdded={!!item.dataPoint.parameterList}
              onAdd={() => actions.addDataPointParameterList(index)}
              onRemove={() => actions.removeDataPointParameterList(index)}
              nested
            >
              <ArrayField
                label="Parameters"
                items={item.dataPoint.parameterList?.parameterListElement}
                onAdd={() => actions.addDataPointParameterListElement(index)}
                onRemove={(paramIndex) =>
                  actions.removeDataPointParameterListElement(index, paramIndex)
                }
                emptyMessage="No parameters added"
                renderItem={(param, paramIndex) => (
                  <>
                    <FormGroup columns={3}>
                      <InputField
                        label="Parameter Name"
                        name={`dataPoint-${index}-param-${paramIndex}-name`}
                        type="text"
                        value={param.name}
                        onChange={(value) =>
                          actions.updateDataPointParameterListElementName(index, paramIndex, value)
                        }
                        placeholder="Enter parameter name"
                        required={true}
                        error={getError(
                          `dataPointList.dataPointListElement.${index}.dataPoint.parameterList.parameterListElement.${paramIndex}.name`
                        )}
                      />
                      <SelectField
                        label="Data Type"
                        name={`dataPoint-${index}-param-${paramIndex}-dataType`}
                        options={
                          DATA_TYPE_OPTIONS as unknown as {
                            value: string;
                            label: string;
                          }[]
                        }
                        value={getDataTypeProductStringValue(param.dataType)}
                        onChange={(value) => {
                          const newDataType = createDataTypeProductFromString(value);
                          // If switching to enum/bitmap, initialize empty structure
                          if (value === "enum" && !isEnumDataTypeProduct(param.dataType)) {
                            actions.setParameterListEnumDataType(index, paramIndex, {
                              enumEntry: [],
                            });
                          } else if (
                            value === "bitmap" &&
                            !isBitmapDataTypeProduct(param.dataType)
                          ) {
                            actions.setParameterListBitmapDataType(index, paramIndex, {
                              bitmapEntry: [],
                            });
                          } else {
                            actions.updateDataPointParameterListElementDataType(
                              index,
                              paramIndex,
                              newDataType
                            );
                          }
                        }}
                        required={true}
                        error={getError(
                          `dataPointList.dataPointListElement.${index}.dataPoint.parameterList.parameterListElement.${paramIndex}.dataType`
                        )}
                      />
                      <InputField
                        label="Default Value"
                        name={`dataPoint-${index}-param-${paramIndex}-defaultValue`}
                        type="text"
                        value={param.defaultValue || ""}
                        onChange={(value) =>
                          actions.updateDataPointParameterListElementDefaultValue(
                            index,
                            paramIndex,
                            value || undefined
                          )
                        }
                        placeholder="Enter default value"
                        required={false}
                        error={getError(
                          `dataPointList.dataPointListElement.${index}.dataPoint.parameterList.parameterListElement.${paramIndex}.defaultValue`
                        )}
                      />
                    </FormGroup>

                    {/* Enum Data Type Configuration for Parameter */}
                    {isEnumDataTypeProduct(param.dataType) && (
                      <FormSection title="Enum Configuration" nested>
                        <InputField
                          label="Hex Mask"
                          name={`dataPoint-${index}-param-${paramIndex}-enum-hexMask`}
                          value={param.dataType.enum.hexMask || ""}
                          onChange={(value) =>
                            actions.updateParameterListEnumHexMask(
                              index,
                              paramIndex,
                              value || undefined
                            )
                          }
                          placeholder="Enter hex mask (e.g., 0xFF)"
                        />
                        <ArrayField
                          label="Enum Entries"
                          items={param.dataType.enum.enumEntry}
                          onAdd={() => actions.addEmptyParameterListEnumEntry(index, paramIndex)}
                          onRemove={(entryIndex) =>
                            actions.removeParameterListEnumEntry(index, paramIndex, entryIndex)
                          }
                          emptyMessage="No enum entries added"
                          renderItem={(entry, entryIndex) => (
                            <>
                              <InputField
                                label="Literal"
                                name={`dataPoint-${index}-param-${paramIndex}-enum-${entryIndex}-literal`}
                                value={entry.literal}
                                onChange={(value) =>
                                  actions.updateParameterListEnumEntryLiteral(
                                    index,
                                    paramIndex,
                                    entryIndex,
                                    value
                                  )
                                }
                                placeholder="Enter enum literal"
                                required={true}
                              />
                              <InputField
                                label="Ordinal"
                                name={`dataPoint-${index}-param-${paramIndex}-enum-${entryIndex}-ordinal`}
                                type="number"
                                value={entry.ordinal?.toString() || ""}
                                onChange={(value) =>
                                  actions.updateParameterListEnumEntryOrdinal(
                                    index,
                                    paramIndex,
                                    entryIndex,
                                    value ? parseInt(value, 10) : undefined
                                  )
                                }
                                placeholder="Enter ordinal number"
                              />
                              <InputField
                                label="Description"
                                name={`dataPoint-${index}-param-${paramIndex}-enum-${entryIndex}-description`}
                                value={entry.description || ""}
                                onChange={(value) =>
                                  actions.updateParameterListEnumEntryDescription(
                                    index,
                                    paramIndex,
                                    entryIndex,
                                    value || undefined
                                  )
                                }
                                placeholder="Enter description"
                              />
                            </>
                          )}
                        />
                      </FormSection>
                    )}

                    {/* Bitmap Data Type Configuration for Parameter */}
                    {isBitmapDataTypeProduct(param.dataType) && (
                      <FormSection title="Bitmap Configuration" nested>
                        <ArrayField
                          label="Bitmap Entries"
                          items={param.dataType.bitmap.bitmapEntry}
                          onAdd={() => actions.addEmptyParameterListBitmapEntry(index, paramIndex)}
                          onRemove={(entryIndex) =>
                            actions.removeParameterListBitmapEntry(index, paramIndex, entryIndex)
                          }
                          emptyMessage="No bitmap entries added"
                          renderItem={(entry, entryIndex) => (
                            <>
                              <InputField
                                label="Literal"
                                name={`dataPoint-${index}-param-${paramIndex}-bitmap-${entryIndex}-literal`}
                                value={entry.literal}
                                onChange={(value) =>
                                  actions.updateParameterListBitmapEntryLiteral(
                                    index,
                                    paramIndex,
                                    entryIndex,
                                    value
                                  )
                                }
                                placeholder="Enter bitmap literal"
                                required={true}
                              />
                              <InputField
                                label="Hex Mask"
                                name={`dataPoint-${index}-param-${paramIndex}-bitmap-${entryIndex}-hexMask`}
                                value={entry.hexMask}
                                onChange={(value) =>
                                  actions.updateParameterListBitmapEntryHexMask(
                                    index,
                                    paramIndex,
                                    entryIndex,
                                    value
                                  )
                                }
                                placeholder="Enter hex mask (e.g., 0xFF)"
                                required={true}
                              />
                              <InputField
                                label="Description"
                                name={`dataPoint-${index}-param-${paramIndex}-bitmap-${entryIndex}-description`}
                                value={entry.description || ""}
                                onChange={(value) =>
                                  actions.updateParameterListBitmapEntryDescription(
                                    index,
                                    paramIndex,
                                    entryIndex,
                                    value || undefined
                                  )
                                }
                                placeholder="Enter description"
                              />
                            </>
                          )}
                        />
                      </FormSection>
                    )}

                    {/* Parameter Descriptions */}
                    <FormSection title="Parameter Descriptions" nested>
                      <ArrayField
                        label="Descriptions"
                        items={param.parameterDescription}
                        onAdd={() =>
                          actions.addEmptyDataPointParameterDescription(index, paramIndex)
                        }
                        onRemove={(descIndex) =>
                          actions.removeDataPointParameterDescription(index, paramIndex, descIndex)
                        }
                        emptyMessage="No descriptions added"
                        renderItem={(desc, descIndex) => (
                          <>
                            <TextareaField
                              label="Text"
                              name={`dataPoint-${index}-param-${paramIndex}-desc-${descIndex}-text`}
                              value={desc.textElement}
                              onChange={(value) =>
                                actions.updateDataPointParameterDescriptionText(
                                  index,
                                  paramIndex,
                                  descIndex,
                                  value
                                )
                              }
                              placeholder="Enter description"
                              required={true}
                              rows={3}
                              error={getError(
                                `dataPointList.dataPointListElement.${index}.dataPoint.parameterList.parameterListElement.${paramIndex}.parameterDescription.${descIndex}.textElement`
                              )}
                            />
                            <FormGroup columns={3}>
                              <SelectField
                                label="Language"
                                name={`dataPoint-${index}-param-${paramIndex}-desc-${descIndex}-lang`}
                                options={LANGUAGE_OPTIONS}
                                value={desc.language}
                                onChange={(value) =>
                                  actions.updateDataPointParameterDescriptionLanguage(
                                    index,
                                    paramIndex,
                                    descIndex,
                                    value as Language
                                  )
                                }
                                required={true}
                                error={getError(
                                  `dataPointList.dataPointListElement.${index}.dataPoint.parameterList.parameterListElement.${paramIndex}.parameterDescription.${descIndex}.language`
                                )}
                              />
                              <InputField
                                label="URI"
                                name={`dataPoint-${index}-param-${paramIndex}-desc-${descIndex}-uri`}
                                type="text"
                                value={desc.uri || ""}
                                onChange={(value) =>
                                  actions.updateDataPointParameterDescriptionUri(
                                    index,
                                    paramIndex,
                                    descIndex,
                                    value || undefined
                                  )
                                }
                                placeholder="Enter URI"
                                required={false}
                                error={getError(
                                  `dataPointList.dataPointListElement.${index}.dataPoint.parameterList.parameterListElement.${paramIndex}.parameterDescription.${descIndex}.uri`
                                )}
                              />
                              <InputField
                                label="Label"
                                name={`dataPoint-${index}-param-${paramIndex}-desc-${descIndex}-label`}
                                type="text"
                                value={desc.label || ""}
                                onChange={(value) =>
                                  actions.updateDataPointParameterDescriptionLabel(
                                    index,
                                    paramIndex,
                                    descIndex,
                                    value || undefined
                                  )
                                }
                                placeholder="Enter label"
                                required={false}
                                error={getError(
                                  `dataPointList.dataPointListElement.${index}.dataPoint.parameterList.parameterListElement.${paramIndex}.parameterDescription.${descIndex}.label`
                                )}
                              />
                            </FormGroup>
                          </>
                        )}
                      />
                    </FormSection>
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
