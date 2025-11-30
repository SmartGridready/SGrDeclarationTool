import { FormSection } from "@/sections/shared/components/forms/form-section";
import { InputField } from "@/sections/shared/components/forms/input-field";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { ArrayField } from "@/sections/shared/components/forms/array-field";
import { FormGroup } from "@/sections/shared/components/forms/form-group";
import { DynamicParameterDescriptionListElement } from "@/models";
import { DATA_TYPE_OPTIONS } from "@/sections/functional-profile/data-point-list/data-point-list-form-options";
import {
  getDataTypeProductStringValue,
  createDataTypeProductFromString,
  isEnumDataTypeProduct,
  isBitmapDataTypeProduct,
} from "@/sections/functional-profile/data-point-list/data-type-utils";
import { ParameterListSlice } from "@/sections/functional-profile/data-point-list/parameter-list/parameter-list-slice";
import { ParameterDescriptionsForm } from "@/sections/functional-profile/data-point-list/parameter-list/parameter-descriptions/parameter-descriptions-form";

interface ParameterListFormProps {
  dataPointIndex: number;
  parameterList: { parameterListElement?: DynamicParameterDescriptionListElement[] } | undefined;
  parameterListSlice: ParameterListSlice;
  getError: (path: string) => string | undefined;
  onAdd: () => void;
  onRemove: () => void;
}

export function ParameterListForm({
  dataPointIndex,
  parameterList,
  parameterListSlice,
  getError,
  onAdd,
  onRemove,
}: ParameterListFormProps) {
  return (
    <FormSection
      title="Parameter List"
      description="Dynamic parameters that must be provided to execute read/write operations for this data point"
      required={false}
      isAdded={!!parameterList}
      onAdd={onAdd}
      onRemove={onRemove}
      nested
    >
      <ArrayField
        label="Parameters"
        items={parameterList?.parameterListElement}
        onAdd={() => parameterListSlice.addDataPointParameterListElement(dataPointIndex)}
        onRemove={(paramIndex) =>
          parameterListSlice.removeDataPointParameterListElement(dataPointIndex, paramIndex)
        }
        emptyMessage="No parameters added"
        renderItem={(param, paramIndex) => (
          <>
            <FormGroup columns={3}>
              <InputField
                label="Parameter Name"
                name={`dataPoint-${dataPointIndex}-param-${paramIndex}-name`}
                type="text"
                value={param.name}
                onChange={(value) =>
                  parameterListSlice.updateDataPointParameterListElementName(
                    dataPointIndex,
                    paramIndex,
                    value
                  )
                }
                placeholder="Enter parameter name"
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList.parameterListElement.${paramIndex}.name`
                )}
              />
              <SelectField
                label="Data Type"
                name={`dataPoint-${dataPointIndex}-param-${paramIndex}-dataType`}
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
                    parameterListSlice.setParameterListEnumDataType(dataPointIndex, paramIndex, {
                      enumEntry: [],
                    });
                  } else if (value === "bitmap" && !isBitmapDataTypeProduct(param.dataType)) {
                    parameterListSlice.setParameterListBitmapDataType(dataPointIndex, paramIndex, {
                      bitmapEntry: [],
                    });
                  } else {
                    parameterListSlice.updateDataPointParameterListElementDataType(
                      dataPointIndex,
                      paramIndex,
                      newDataType
                    );
                  }
                }}
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList.parameterListElement.${paramIndex}.dataType`
                )}
              />
              <InputField
                label="Default Value"
                name={`dataPoint-${dataPointIndex}-param-${paramIndex}-defaultValue`}
                type="text"
                value={param.defaultValue || ""}
                onChange={(value) =>
                  parameterListSlice.updateDataPointParameterListElementDefaultValue(
                    dataPointIndex,
                    paramIndex,
                    value || undefined
                  )
                }
                placeholder="Enter default value"
                required={false}
                error={getError(
                  `dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList.parameterListElement.${paramIndex}.defaultValue`
                )}
              />
            </FormGroup>

            {/* Enum Data Type Configuration for Parameter */}
            {isEnumDataTypeProduct(param.dataType) && (
              <FormSection title="Enum Configuration" nested>
                <InputField
                  label="Hex Mask"
                  name={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum-hexMask`}
                  value={param.dataType.enum.hexMask || ""}
                  onChange={(value) =>
                    parameterListSlice.updateParameterListEnumHexMask(
                      dataPointIndex,
                      paramIndex,
                      value || undefined
                    )
                  }
                  placeholder="Enter hex mask (e.g., 0xFF)"
                />
                <ArrayField
                  label="Enum Entries"
                  items={param.dataType.enum.enumEntry}
                  onAdd={() =>
                    parameterListSlice.addEmptyParameterListEnumEntry(dataPointIndex, paramIndex)
                  }
                  onRemove={(entryIndex) =>
                    parameterListSlice.removeParameterListEnumEntry(
                      dataPointIndex,
                      paramIndex,
                      entryIndex
                    )
                  }
                  emptyMessage="No enum entries added"
                  renderItem={(entry, entryIndex) => (
                    <>
                      <InputField
                        label="Literal"
                        name={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum-${entryIndex}-literal`}
                        value={entry.literal}
                        onChange={(value) =>
                          parameterListSlice.updateParameterListEnumEntryLiteral(
                            dataPointIndex,
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
                        name={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum-${entryIndex}-ordinal`}
                        type="number"
                        value={entry.ordinal?.toString() || ""}
                        onChange={(value) =>
                          parameterListSlice.updateParameterListEnumEntryOrdinal(
                            dataPointIndex,
                            paramIndex,
                            entryIndex,
                            value ? parseInt(value, 10) : undefined
                          )
                        }
                        placeholder="Enter ordinal number"
                      />
                      <InputField
                        label="Description"
                        name={`dataPoint-${dataPointIndex}-param-${paramIndex}-enum-${entryIndex}-description`}
                        value={entry.description || ""}
                        onChange={(value) =>
                          parameterListSlice.updateParameterListEnumEntryDescription(
                            dataPointIndex,
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
                  onAdd={() =>
                    parameterListSlice.addEmptyParameterListBitmapEntry(dataPointIndex, paramIndex)
                  }
                  onRemove={(entryIndex) =>
                    parameterListSlice.removeParameterListBitmapEntry(
                      dataPointIndex,
                      paramIndex,
                      entryIndex
                    )
                  }
                  emptyMessage="No bitmap entries added"
                  renderItem={(entry, entryIndex) => (
                    <>
                      <InputField
                        label="Literal"
                        name={`dataPoint-${dataPointIndex}-param-${paramIndex}-bitmap-${entryIndex}-literal`}
                        value={entry.literal}
                        onChange={(value) =>
                          parameterListSlice.updateParameterListBitmapEntryLiteral(
                            dataPointIndex,
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
                        name={`dataPoint-${dataPointIndex}-param-${paramIndex}-bitmap-${entryIndex}-hexMask`}
                        value={entry.hexMask}
                        onChange={(value) =>
                          parameterListSlice.updateParameterListBitmapEntryHexMask(
                            dataPointIndex,
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
                        name={`dataPoint-${dataPointIndex}-param-${paramIndex}-bitmap-${entryIndex}-description`}
                        value={entry.description || ""}
                        onChange={(value) =>
                          parameterListSlice.updateParameterListBitmapEntryDescription(
                            dataPointIndex,
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
            <ParameterDescriptionsForm
              dataPointIndex={dataPointIndex}
              paramIndex={paramIndex}
              parameterDescriptions={param.parameterDescription}
              parameterDescriptionsSlice={parameterListSlice}
              getError={getError}
            />
          </>
        )}
      />
    </FormSection>
  );
}
