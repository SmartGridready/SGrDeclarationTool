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
import { ParameterListEnumForm } from "@/sections/functional-profile/data-point-list/parameter-list/data-types/enum/enum-form";
import { ParameterListBitmapForm } from "@/sections/functional-profile/data-point-list/parameter-list/data-types/bitmap/bitmap-form";

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
              <ParameterListEnumForm
                dataPointIndex={dataPointIndex}
                paramIndex={paramIndex}
                enumMap={param.dataType.enum}
                enumSlice={parameterListSlice}
              />
            )}

            {/* Bitmap Data Type Configuration for Parameter */}
            {isBitmapDataTypeProduct(param.dataType) && (
              <ParameterListBitmapForm
                dataPointIndex={dataPointIndex}
                paramIndex={paramIndex}
                bitmap={param.dataType.bitmap}
                bitmapSlice={parameterListSlice}
              />
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
