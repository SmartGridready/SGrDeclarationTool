"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { DynamicParameterDescriptionList, DATA_TYPE_PRODUCT_EXTENDED_VALUES } from "@/models";
import { createFormOptions } from "@/models/form-options-helper";

const DATA_TYPE_OPTIONS = createFormOptions(DATA_TYPE_PRODUCT_EXTENDED_VALUES);
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
import { useFormSection } from "@/hooks/use-form-section";

interface DynamicParameterListFormProps<TStoreState extends DynamicParameterListSlice> {
  /**
   * Store hook function (e.g., useProfileStore, useDeviceStore)
   */
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  /**
   * Validation hook function that returns an object with getError method
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  /**
   * Selector to get parameterList state from the store
   */
  stateSelector: (store: TStoreState) => {
    parameterList?: DynamicParameterDescriptionList;
  };
  /**
   * Selector to check if parameterList exists (for optional parameterList)
   */
  isAddedSelector?: (store: TStoreState) => boolean;
  /**
   * Field path prefix for validation errors (e.g., "dataPointList.dataPointListElement.0.dataPoint.parameterList")
   */
  fieldPathPrefix?: string;
  /**
   * List index for this parameter list (used for actions)
   */
  listIndex: number;
  /**
   * Whether parameter list is required (if true, add/remove buttons are hidden)
   */
  required?: boolean;
  /**
   * Title for the form section
   */
  title?: string;
  /**
   * Description for the form section
   */
  description?: string;
  /**
   * Whether this is a nested section (affects styling)
   */
  nested?: boolean;
}

export function DynamicParameterListForm<TStoreState extends DynamicParameterListSlice>({
  useStore,
  useValidation,
  stateSelector,
  isAddedSelector,
  fieldPathPrefix = "parameterList",
  listIndex,
  required = false,
  title = "Parameter List",
  description = "Dynamic parameters that must be provided to execute read/write operations for this data point",
  nested = true,
}: DynamicParameterListFormProps<TStoreState>) {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection<
    TStoreState,
    {
      parameterList?: DynamicParameterDescriptionList;
    },
    DynamicParameterListSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => ({
      // Main list actions
      addParameterList: store.addParameterList,
      removeParameterList: store.removeParameterList,
      addParameterListElement: store.addParameterListElement,
      removeParameterListElement: store.removeParameterListElement,
      updateParameterListElementName: store.updateParameterListElementName,
      updateParameterListElementDataType: store.updateParameterListElementDataType,
      updateParameterListElementDefaultValue: store.updateParameterListElementDefaultValue,
      // Enum actions
      setParameterListEnumDataType: store.setParameterListEnumDataType,
      addParameterListEnumEntry: store.addParameterListEnumEntry,
      removeParameterListEnumEntry: store.removeParameterListEnumEntry,
      updateParameterListEnumEntryLiteral: store.updateParameterListEnumEntryLiteral,
      updateParameterListEnumEntryOrdinal: store.updateParameterListEnumEntryOrdinal,
      updateParameterListEnumEntryDescription: store.updateParameterListEnumEntryDescription,
      updateParameterListEnumHexMask: store.updateParameterListEnumHexMask,
      addEmptyParameterListEnumEntry: store.addEmptyParameterListEnumEntry,
      // Bitmap actions
      setParameterListBitmapDataType: store.setParameterListBitmapDataType,
      addParameterListBitmapEntry: store.addParameterListBitmapEntry,
      removeParameterListBitmapEntry: store.removeParameterListBitmapEntry,
      updateParameterListBitmapEntryLiteral: store.updateParameterListBitmapEntryLiteral,
      updateParameterListBitmapEntryHexMask: store.updateParameterListBitmapEntryHexMask,
      updateParameterListBitmapEntryDescription: store.updateParameterListBitmapEntryDescription,
      addEmptyParameterListBitmapEntry: store.addEmptyParameterListBitmapEntry,
      // Description actions
      addParameterDescription: store.addParameterDescription,
      removeParameterDescription: store.removeParameterDescription,
      updateParameterDescriptionText: store.updateParameterDescriptionText,
      updateParameterDescriptionLanguage: store.updateParameterDescriptionLanguage,
      updateParameterDescriptionUri: store.updateParameterDescriptionUri,
      updateParameterDescriptionLabel: store.updateParameterDescriptionLabel,
      addEmptyParameterDescription: store.addEmptyParameterDescription,
    }),
    // Only include add/remove functionality if not required
    isAddedSelector: required ? undefined : isAddedSelector,
    onAdd: required ? undefined : (actions) => actions.addParameterList(listIndex),
    onRemove: required ? undefined : (actions) => actions.removeParameterList(listIndex),
  });

  const parameterList = state.parameterList;

  return (
    <FormSection
      title={title}
      description={description}
      required={required}
      isAdded={required ? true : isAdded}
      onAdd={required ? undefined : handleAdd}
      onRemove={required ? undefined : handleRemove}
      nested={nested}
    >
      {/* Only render fields when added (or required) */}
      {(required || parameterList) && (
        <ArrayField
          label="Parameters"
          items={parameterList?.parameterListElement}
          onAdd={() => actions.addParameterListElement(listIndex)}
          onRemove={(paramIndex) => actions.removeParameterListElement(listIndex, paramIndex)}
          emptyMessage="No parameters added"
          renderItem={(param, paramIndex) => (
            <>
              <FormGroup columns={3}>
                <InputField
                  label="Parameter Name"
                  name={`${fieldPathPrefix}-${listIndex}-param-${paramIndex}-name`}
                  type="text"
                  value={param.name}
                  onChange={(value) =>
                    actions.updateParameterListElementName(listIndex, paramIndex, value)
                  }
                  placeholder="Enter parameter name"
                  required={true}
                  error={getError(`${fieldPathPrefix}.parameterListElement.${paramIndex}.name`)}
                />
                <SelectField
                  label="Data Type"
                  name={`${fieldPathPrefix}-${listIndex}-param-${paramIndex}-dataType`}
                  options={DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
                  value={getDataTypeProductStringValue(param.dataType)}
                  onChange={(value) => {
                    const newDataType = createDataTypeProductFromString(value);
                    if (value === "enum" && !isEnumDataTypeProduct(param.dataType)) {
                      actions.setParameterListEnumDataType(listIndex, paramIndex, {
                        enumEntry: [],
                      });
                    } else if (value === "bitmap" && !isBitmapDataTypeProduct(param.dataType)) {
                      actions.setParameterListBitmapDataType(listIndex, paramIndex, {
                        bitmapEntry: [],
                      });
                    } else {
                      actions.updateParameterListElementDataType(
                        listIndex,
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
                  name={`${fieldPathPrefix}-${listIndex}-param-${paramIndex}-defaultValue`}
                  type="text"
                  value={param.defaultValue || ""}
                  onChange={(value) =>
                    actions.updateParameterListElementDefaultValue(
                      listIndex,
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
                  listIndex={listIndex}
                  paramIndex={paramIndex}
                  enumMap={param.dataType.enum}
                  actions={actions}
                  fieldPathPrefix={fieldPathPrefix}
                />
              )}

              {isBitmapDataTypeProduct(param.dataType) && (
                <DynamicParameterListBitmapForm
                  listIndex={listIndex}
                  paramIndex={paramIndex}
                  bitmap={param.dataType.bitmap}
                  actions={actions}
                  fieldPathPrefix={fieldPathPrefix}
                />
              )}

              <DynamicParameterDescriptionsForm
                listIndex={listIndex}
                paramIndex={paramIndex}
                parameterDescriptions={param.parameterDescription}
                actions={actions}
                getError={getError}
                fieldPathPrefix={fieldPathPrefix}
              />
            </>
          )}
        />
      )}
    </FormSection>
  );
}
