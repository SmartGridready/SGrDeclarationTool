"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { DynamicParameterDescriptionList } from "@/models";
import { DATA_TYPE_OPTIONS } from "@/sections/functional-profile/data-point-list/data-point-list-form-options";
import {
  getDataTypeProductStringValue,
  createDataTypeProductFromString,
  isEnumDataTypeProduct,
  isBitmapDataTypeProduct,
} from "@/sections/shared/data-type-product/data-type-product-utils";
import { DynamicParameterListSlice } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";
import { DynamicParameterDescriptionsForm } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-descriptions/parameter-descriptions-form";
import { DynamicParameterListEnumForm } from "@/sections/shared/dynamic-parameter-list/data-types/enum/enum-form";
import { DynamicParameterListBitmapForm } from "@/sections/shared/dynamic-parameter-list/data-types/bitmap/bitmap-form";

interface DynamicParameterListFormProps {
  dataPointIndex: number;
  parameterList: DynamicParameterDescriptionList | undefined;
  actions: DynamicParameterListSlice;
  getError: (path: string) => string | undefined;
  fieldPathPrefix: string;
  title?: string;
  description?: string;
  onAdd?: () => void;
  onRemove?: () => void;
}

export function DynamicParameterListForm({
  dataPointIndex,
  parameterList,
  actions,
  getError,
  fieldPathPrefix,
  title = "Parameter List",
  description = "Dynamic parameters that must be provided to execute read/write operations for this data point",
  onAdd,
  onRemove,
}: DynamicParameterListFormProps) {
  const handleAdd = onAdd ?? (() => actions.addParameterList(dataPointIndex));
  const handleRemove = onRemove ?? (() => actions.removeParameterList(dataPointIndex));

  return (
    <FormSection
      title={title}
      description={description}
      required={false}
      isAdded={!!parameterList}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested
    >
      <ArrayField
        label="Parameters"
        items={parameterList?.parameterListElement}
        onAdd={() => actions.addParameterListElement(dataPointIndex)}
        onRemove={(paramIndex) => actions.removeParameterListElement(dataPointIndex, paramIndex)}
        emptyMessage="No parameters added"
        renderItem={(param, paramIndex) => (
          <>
            <FormGroup columns={3}>
              <InputField
                label="Parameter Name"
                name={`${fieldPathPrefix}-${dataPointIndex}-param-${paramIndex}-name`}
                type="text"
                value={param.name}
                onChange={(value) =>
                  actions.updateParameterListElementName(dataPointIndex, paramIndex, value)
                }
                placeholder="Enter parameter name"
                required={true}
                error={getError(`${fieldPathPrefix}.parameterListElement.${paramIndex}.name`)}
              />
              <SelectField
                label="Data Type"
                name={`${fieldPathPrefix}-${dataPointIndex}-param-${paramIndex}-dataType`}
                options={DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
                value={getDataTypeProductStringValue(param.dataType)}
                onChange={(value) => {
                  const newDataType = createDataTypeProductFromString(value);
                  if (value === "enum" && !isEnumDataTypeProduct(param.dataType)) {
                    actions.setParameterListEnumDataType(dataPointIndex, paramIndex, {
                      enumEntry: [],
                    });
                  } else if (value === "bitmap" && !isBitmapDataTypeProduct(param.dataType)) {
                    actions.setParameterListBitmapDataType(dataPointIndex, paramIndex, {
                      bitmapEntry: [],
                    });
                  } else {
                    actions.updateParameterListElementDataType(
                      dataPointIndex,
                      paramIndex,
                      newDataType
                    );
                  }
                }}
                required={true}
                error={getError(`${fieldPathPrefix}.parameterListElement.${paramIndex}.dataType`)}
              />
              <InputField
                label="Default Value"
                name={`${fieldPathPrefix}-${dataPointIndex}-param-${paramIndex}-defaultValue`}
                type="text"
                value={param.defaultValue || ""}
                onChange={(value) =>
                  actions.updateParameterListElementDefaultValue(
                    dataPointIndex,
                    paramIndex,
                    value || undefined
                  )
                }
                placeholder="Enter default value"
                required={false}
                error={getError(
                  `${fieldPathPrefix}.parameterListElement.${paramIndex}.defaultValue`
                )}
              />
            </FormGroup>

            {isEnumDataTypeProduct(param.dataType) && (
              <DynamicParameterListEnumForm
                dataPointIndex={dataPointIndex}
                paramIndex={paramIndex}
                enumMap={param.dataType.enum}
                actions={actions}
                fieldPathPrefix={fieldPathPrefix}
              />
            )}

            {isBitmapDataTypeProduct(param.dataType) && (
              <DynamicParameterListBitmapForm
                dataPointIndex={dataPointIndex}
                paramIndex={paramIndex}
                bitmap={param.dataType.bitmap}
                actions={actions}
                fieldPathPrefix={fieldPathPrefix}
              />
            )}

            <DynamicParameterDescriptionsForm
              dataPointIndex={dataPointIndex}
              paramIndex={paramIndex}
              parameterDescriptions={param.parameterDescription}
              actions={actions}
              getError={getError}
              fieldPathPrefix={fieldPathPrefix}
            />
          </>
        )}
      />
    </FormSection>
  );
}
