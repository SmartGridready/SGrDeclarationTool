"use client";

import { FormSection } from "@/components/forms/form-section";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { useFormSection } from "@/hooks/use-form-section";
import {
  GenericAttributeListProductSlice,
  isSimpleGenericAttribute,
  isNestedGenericAttribute,
} from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import { GenericAttributeListProductSimpleEnumForm } from "@/sections/shared/generic-attribute-list-product/data-types/simple/enum/enum-form";
import { GenericAttributeListProductSimpleBitmapForm } from "@/sections/shared/generic-attribute-list-product/data-types/simple/bitmap/bitmap-form";
import { GenericAttributeListProductNestedEnumForm } from "@/sections/shared/generic-attribute-list-product/data-types/nested/enum/enum-form";
import { GenericAttributeListProductNestedBitmapForm } from "@/sections/shared/generic-attribute-list-product/data-types/nested/bitmap/bitmap-form";
import {
  getDataTypeProductStringValue,
  createDataTypeProductFromString,
  isEnumDataTypeProduct,
  isBitmapDataTypeProduct,
} from "@/sections/shared/data-type-product/data-type-product-utils";
import {
  GenericAttributeListProduct,
  GenericAttributeProductEnd,
  Units,
  DATA_TYPE_PRODUCT_EXTENDED_VALUES,
  UNITS_VALUES,
} from "@/models";
import { createFormOptions } from "@/utils/form-options-utils";

const DATA_TYPE_OPTIONS = createFormOptions(DATA_TYPE_PRODUCT_EXTENDED_VALUES);
const UNIT_OPTIONS = createFormOptions(UNITS_VALUES);

interface GenericAttributeListProductFormProps<TStoreState extends GenericAttributeListProductSlice> {
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  stateSelector: (store: TStoreState) => {
    genericAttributeList?: GenericAttributeListProduct;
  };
  isAddedSelector?: (store: TStoreState) => boolean;
  fieldPathPrefix?: string;
  title?: string;
  description?: string;
  nested?: boolean;
  required?: boolean;
}

export function GenericAttributeListProductForm<TStoreState extends GenericAttributeListProductSlice>({
  useStore,
  useValidation,
  stateSelector,
  isAddedSelector,
  fieldPathPrefix = "genericAttributeList",
  title = "Generic Attribute List",
  description = "Generic attributes for the element",
  nested = true,
  required = false,
}: GenericAttributeListProductFormProps<TStoreState>) {
  const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection<
    TStoreState,
    { genericAttributeList?: GenericAttributeListProduct },
    GenericAttributeListProductSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => store as GenericAttributeListProductSlice & Record<string, unknown>,
    isAddedSelector: required ? undefined : isAddedSelector,
    onAdd: required ? undefined : (actions) => actions.addGenericAttributeList(),
    onRemove: required ? undefined : (actions) => actions.removeGenericAttributeList(),
  });

  const genericAttributeList = state.genericAttributeList;
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
      <ArrayField
        label="Generic Attribute Elements"
        items={genericAttributeList?.genericAttributeListElement}
        onAdd={() => actions.addGenericAttributeListElement()}
        onRemove={(elementIndex) => actions.removeGenericAttributeListElement(elementIndex)}
        emptyMessage="No generic attribute elements added"
        renderItem={(element, elementIndex) => (
          <div className="space-y-4">
            <FormGroup columns={2}>
              <InputField
                label="Attribute Name"
                name={`${fieldPathPrefix}-${elementIndex}-name`}
                type="text"
                value={element.name}
                onChange={(value) => actions.updateGenericAttributeListElementName(elementIndex, value)}
                placeholder="Enter attribute name"
                required={true}
                error={getError(`${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].name`)}
              />
              <SelectField
                label="Attribute Type"
                name={`${fieldPathPrefix}-${elementIndex}-type`}
                options={[
                  { value: "simple", label: "Simple" },
                  { value: "nested", label: "Nested" },
                ]}
                value={isSimpleGenericAttribute(element) ? "simple" : "nested"}
                onChange={(value) => {
                  if (value === "simple" && isNestedGenericAttribute(element)) {
                    // Convert nested to simple
                    actions.setGenericAttributeListElementAsSimple(elementIndex, { float64: {} }, "", "NO_UNITS");
                  } else if (value === "nested" && isSimpleGenericAttribute(element)) {
                    // Convert simple to nested
                    actions.setGenericAttributeListElementAsNested(elementIndex);
                  }
                }}
                required={true}
              />
            </FormGroup>

            {isSimpleGenericAttribute(element) && (
              <>
                <FormGroup columns={3}>
                  <SelectField
                    label="Data Type"
                    name={`${fieldPathPrefix}-${elementIndex}-dataType`}
                    options={DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
                    value={getDataTypeProductStringValue(element.dataType)}
                    onChange={(value) => {
                      const newDataType = createDataTypeProductFromString(value);
                      if (value === "enum" && !isEnumDataTypeProduct(element.dataType)) {
                        actions.setGenericAttributeListSimpleEnumDataType(elementIndex, {
                          enumEntry: [],
                        });
                      } else if (value === "bitmap" && !isBitmapDataTypeProduct(element.dataType)) {
                        actions.setGenericAttributeListSimpleBitmapDataType(elementIndex, {
                          bitmapEntry: [],
                        });
                      } else {
                        actions.updateGenericAttributeListElementDataType(elementIndex, newDataType);
                      }
                    }}
                    required={true}
                    error={getError(`${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].dataType`)}
                  />
                  <InputField
                    label="Value"
                    name={`${fieldPathPrefix}-${elementIndex}-value`}
                    type="text"
                    value={element.value || ""}
                    onChange={(value) => actions.updateGenericAttributeListElementValue(elementIndex, value)}
                    placeholder="Enter value"
                    required={true}
                    error={getError(`${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].value`)}
                  />
                  <SelectField
                    label="Unit"
                    name={`${fieldPathPrefix}-${elementIndex}-unit`}
                    options={UNIT_OPTIONS as unknown as { value: string; label: string }[]}
                    value={element.unit}
                    onChange={(value) => actions.updateGenericAttributeListElementUnit(elementIndex, value as Units)}
                    required={true}
                    error={getError(`${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].unit`)}
                  />
                </FormGroup>

                {isEnumDataTypeProduct(element.dataType) && (
                  <GenericAttributeListProductSimpleEnumForm
                    elementIndex={elementIndex}
                    enumMap={element.dataType.enum}
                    actions={actions}
                    fieldPathPrefix={fieldPathPrefix}
                    getError={getError}
                  />
                )}

                {isBitmapDataTypeProduct(element.dataType) && (
                  <GenericAttributeListProductSimpleBitmapForm
                    elementIndex={elementIndex}
                    bitmap={element.dataType.bitmap}
                    actions={actions}
                    fieldPathPrefix={fieldPathPrefix}
                    getError={getError}
                  />
                )}
              </>
            )}

            {isNestedGenericAttribute(element) && (
              <div className="space-y-4">
                <ArrayField<GenericAttributeProductEnd>
                  label="Nested Generic Attribute Elements"
                  items={element.genericAttributeList.genericAttributeListElement}
                  onAdd={() => actions.addNestedGenericAttributeListElement(elementIndex)}
                  onRemove={(nestedElementIndex) =>
                    actions.removeNestedGenericAttributeListElement(elementIndex, nestedElementIndex)
                  }
                  emptyMessage="No nested generic attribute elements added"
                  renderItem={(nestedElement, nestedElementIndex) => (
                    <div className="space-y-4">
                      <FormGroup columns={3}>
                        <InputField
                          label="Nested Attribute Name"
                          name={`${fieldPathPrefix}-${elementIndex}-nested-${nestedElementIndex}-name`}
                          type="text"
                          value={nestedElement.name}
                          onChange={(value) =>
                            actions.updateNestedGenericAttributeListElementName(elementIndex, nestedElementIndex, value)
                          }
                          placeholder="Enter nested attribute name"
                          required={true}
                          error={getError(
                            `${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].genericAttributeList.genericAttributeListElement[${nestedElementIndex}].name`
                          )}
                        />
                        <SelectField
                          label="Data Type"
                          name={`${fieldPathPrefix}-${elementIndex}-nested-${nestedElementIndex}-dataType`}
                          options={DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
                          value={getDataTypeProductStringValue(nestedElement.dataType)}
                          onChange={(value) => {
                            const newDataType = createDataTypeProductFromString(value);
                            if (value === "enum" && !isEnumDataTypeProduct(nestedElement.dataType)) {
                              actions.setGenericAttributeListNestedEnumDataType(elementIndex, nestedElementIndex, {
                                enumEntry: [],
                              });
                            } else if (value === "bitmap" && !isBitmapDataTypeProduct(nestedElement.dataType)) {
                              actions.setGenericAttributeListNestedBitmapDataType(elementIndex, nestedElementIndex, {
                                bitmapEntry: [],
                              });
                            } else {
                              actions.updateNestedGenericAttributeListElementDataType(
                                elementIndex,
                                nestedElementIndex,
                                newDataType
                              );
                            }
                          }}
                          required={true}
                          error={getError(
                            `${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].genericAttributeList.genericAttributeListElement[${nestedElementIndex}].dataType`
                          )}
                        />
                        <InputField
                          label="Value"
                          name={`${fieldPathPrefix}-${elementIndex}-nested-${nestedElementIndex}-value`}
                          type="text"
                          value={nestedElement.value || ""}
                          onChange={(value) =>
                            actions.updateNestedGenericAttributeListElementValue(
                              elementIndex,
                              nestedElementIndex,
                              value
                            )
                          }
                          placeholder="Enter value"
                          required={true}
                          error={getError(
                            `${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].genericAttributeList.genericAttributeListElement[${nestedElementIndex}].value`
                          )}
                        />
                      </FormGroup>
                      <FormGroup columns={3}>
                        <SelectField
                          label="Unit"
                          name={`${fieldPathPrefix}-${elementIndex}-nested-${nestedElementIndex}-unit`}
                          options={UNIT_OPTIONS as unknown as { value: string; label: string }[]}
                          value={nestedElement.unit}
                          onChange={(value) =>
                            actions.updateNestedGenericAttributeListElementUnit(
                              elementIndex,
                              nestedElementIndex,
                              value as Units
                            )
                          }
                          required={true}
                          error={getError(
                            `${fieldPathPrefix}.genericAttributeListElement[${elementIndex}].genericAttributeList.genericAttributeListElement[${nestedElementIndex}].unit`
                          )}
                        />
                      </FormGroup>

                      {isEnumDataTypeProduct(nestedElement.dataType) && (
                        <GenericAttributeListProductNestedEnumForm
                          elementIndex={elementIndex}
                          nestedElementIndex={nestedElementIndex}
                          enumMap={nestedElement.dataType.enum}
                          actions={actions}
                          fieldPathPrefix={fieldPathPrefix}
                          getError={getError}
                        />
                      )}

                      {isBitmapDataTypeProduct(nestedElement.dataType) && (
                        <GenericAttributeListProductNestedBitmapForm
                          elementIndex={elementIndex}
                          nestedElementIndex={nestedElementIndex}
                          bitmap={nestedElement.dataType.bitmap}
                          actions={actions}
                          fieldPathPrefix={fieldPathPrefix}
                          getError={getError}
                        />
                      )}
                    </div>
                  )}
                />
              </div>
            )}
          </div>
        )}
      />
    </FormSection>
  );
}
