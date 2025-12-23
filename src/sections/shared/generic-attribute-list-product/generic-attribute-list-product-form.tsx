"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { DATA_TYPE_OPTIONS } from "@/sections/functional-profile/data-point-list/data-point-list-form-options";
import { UNIT_OPTIONS } from "@/sections/functional-profile/data-point-list/data-point-list-form-options";
import {
  getDataTypeProductStringValue,
  createDataTypeProductFromString,
  isEnumDataTypeProduct,
  isBitmapDataTypeProduct,
} from "@/sections/shared/data-type-product/data-type-product-utils";
import {
  GenericAttributeListProductSlice,
  isSimpleGenericAttribute,
  isNestedGenericAttribute,
} from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import { GenericAttributeListProductSimpleEnumForm } from "@/sections/shared/generic-attribute-list-product/data-types/simple/enum/enum-form";
import { GenericAttributeListProductSimpleBitmapForm } from "@/sections/shared/generic-attribute-list-product/data-types/simple/bitmap/bitmap-form";
import { GenericAttributeListProductNestedEnumForm } from "@/sections/shared/generic-attribute-list-product/data-types/nested/enum/enum-form";
import { GenericAttributeListProductNestedBitmapForm } from "@/sections/shared/generic-attribute-list-product/data-types/nested/bitmap/bitmap-form";
import { GenericAttributeListProduct, GenericAttributeProductEnd, Units } from "@/models";
import { useFormSection } from "@/hooks/use-form-section";

interface GenericAttributeListProductFormProps<
  TStoreState extends GenericAttributeListProductSlice,
> {
  /**
   * Store hook function (e.g., useProfileStore, useDeviceStore)
   */
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  /**
   * Validation hook function that returns an object with getError method
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  /**
   * Selector to get genericAttributeList state from the store
   */
  stateSelector: (store: TStoreState) => {
    genericAttributeList?: GenericAttributeListProduct;
  };
  /**
   * Selector to check if genericAttributeList exists (for optional genericAttributeList)
   */
  isAddedSelector?: (store: TStoreState) => boolean;
  /**
   * Field path prefix for validation errors (e.g., "genericAttributeList" or "device.genericAttributeList")
   */
  fieldPathPrefix?: string;
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
  /**
   * Whether generic attribute list is required (if true, add/remove buttons are hidden)
   */
  required?: boolean;
}

export function GenericAttributeListProductForm<
  TStoreState extends GenericAttributeListProductSlice,
>({
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
    {
      genericAttributeList?: GenericAttributeListProduct;
    },
    GenericAttributeListProductSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => ({
      // Main list actions
      addGenericAttributeList: store.addGenericAttributeList,
      removeGenericAttributeList: store.removeGenericAttributeList,
      addGenericAttributeListElement: store.addGenericAttributeListElement,
      removeGenericAttributeListElement: store.removeGenericAttributeListElement,
      updateGenericAttributeListElementName: store.updateGenericAttributeListElementName,
      // Simple attribute actions
      setGenericAttributeListElementAsSimple: store.setGenericAttributeListElementAsSimple,
      updateGenericAttributeListElementDataType: store.updateGenericAttributeListElementDataType,
      updateGenericAttributeListElementValue: store.updateGenericAttributeListElementValue,
      updateGenericAttributeListElementUnit: store.updateGenericAttributeListElementUnit,
      // Nested attribute actions
      setGenericAttributeListElementAsNested: store.setGenericAttributeListElementAsNested,
      addNestedGenericAttributeListElement: store.addNestedGenericAttributeListElement,
      removeNestedGenericAttributeListElement: store.removeNestedGenericAttributeListElement,
      updateNestedGenericAttributeListElementName:
        store.updateNestedGenericAttributeListElementName,
      updateNestedGenericAttributeListElementDataType:
        store.updateNestedGenericAttributeListElementDataType,
      updateNestedGenericAttributeListElementValue:
        store.updateNestedGenericAttributeListElementValue,
      updateNestedGenericAttributeListElementUnit:
        store.updateNestedGenericAttributeListElementUnit,
      // Simple enum actions
      setGenericAttributeListSimpleEnumDataType: store.setGenericAttributeListSimpleEnumDataType,
      addGenericAttributeListSimpleEnumEntry: store.addGenericAttributeListSimpleEnumEntry,
      removeGenericAttributeListSimpleEnumEntry: store.removeGenericAttributeListSimpleEnumEntry,
      updateGenericAttributeListSimpleEnumEntryLiteral:
        store.updateGenericAttributeListSimpleEnumEntryLiteral,
      updateGenericAttributeListSimpleEnumEntryOrdinal:
        store.updateGenericAttributeListSimpleEnumEntryOrdinal,
      updateGenericAttributeListSimpleEnumEntryDescription:
        store.updateGenericAttributeListSimpleEnumEntryDescription,
      updateGenericAttributeListSimpleEnumHexMask:
        store.updateGenericAttributeListSimpleEnumHexMask,
      addEmptyGenericAttributeListSimpleEnumEntry:
        store.addEmptyGenericAttributeListSimpleEnumEntry,
      // Simple bitmap actions
      setGenericAttributeListSimpleBitmapDataType:
        store.setGenericAttributeListSimpleBitmapDataType,
      addGenericAttributeListSimpleBitmapEntry: store.addGenericAttributeListSimpleBitmapEntry,
      removeGenericAttributeListSimpleBitmapEntry:
        store.removeGenericAttributeListSimpleBitmapEntry,
      updateGenericAttributeListSimpleBitmapEntryLiteral:
        store.updateGenericAttributeListSimpleBitmapEntryLiteral,
      updateGenericAttributeListSimpleBitmapEntryHexMask:
        store.updateGenericAttributeListSimpleBitmapEntryHexMask,
      updateGenericAttributeListSimpleBitmapEntryDescription:
        store.updateGenericAttributeListSimpleBitmapEntryDescription,
      addEmptyGenericAttributeListSimpleBitmapEntry:
        store.addEmptyGenericAttributeListSimpleBitmapEntry,
      // Nested enum actions
      setGenericAttributeListNestedEnumDataType: store.setGenericAttributeListNestedEnumDataType,
      addGenericAttributeListNestedEnumEntry: store.addGenericAttributeListNestedEnumEntry,
      removeGenericAttributeListNestedEnumEntry: store.removeGenericAttributeListNestedEnumEntry,
      updateGenericAttributeListNestedEnumEntryLiteral:
        store.updateGenericAttributeListNestedEnumEntryLiteral,
      updateGenericAttributeListNestedEnumEntryOrdinal:
        store.updateGenericAttributeListNestedEnumEntryOrdinal,
      updateGenericAttributeListNestedEnumEntryDescription:
        store.updateGenericAttributeListNestedEnumEntryDescription,
      updateGenericAttributeListNestedEnumHexMask:
        store.updateGenericAttributeListNestedEnumHexMask,
      addEmptyGenericAttributeListNestedEnumEntry:
        store.addEmptyGenericAttributeListNestedEnumEntry,
      // Nested bitmap actions
      setGenericAttributeListNestedBitmapDataType:
        store.setGenericAttributeListNestedBitmapDataType,
      addGenericAttributeListNestedBitmapEntry: store.addGenericAttributeListNestedBitmapEntry,
      removeGenericAttributeListNestedBitmapEntry:
        store.removeGenericAttributeListNestedBitmapEntry,
      updateGenericAttributeListNestedBitmapEntryLiteral:
        store.updateGenericAttributeListNestedBitmapEntryLiteral,
      updateGenericAttributeListNestedBitmapEntryHexMask:
        store.updateGenericAttributeListNestedBitmapEntryHexMask,
      updateGenericAttributeListNestedBitmapEntryDescription:
        store.updateGenericAttributeListNestedBitmapEntryDescription,
      addEmptyGenericAttributeListNestedBitmapEntry:
        store.addEmptyGenericAttributeListNestedBitmapEntry,
    }),
    // Only include add/remove functionality if not required
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
                onChange={(value) =>
                  actions.updateGenericAttributeListElementName(elementIndex, value)
                }
                placeholder="Enter attribute name"
                required={true}
                error={getError(
                  `${fieldPathPrefix}.genericAttributeListElement.${elementIndex}.name`
                )}
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
                    actions.setGenericAttributeListElementAsSimple(
                      elementIndex,
                      { float64: {} },
                      "",
                      "NO_UNITS"
                    );
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
                        actions.updateGenericAttributeListElementDataType(
                          elementIndex,
                          newDataType
                        );
                      }
                    }}
                    required={true}
                    error={getError(
                      `${fieldPathPrefix}.genericAttributeListElement.${elementIndex}.dataType`
                    )}
                  />
                  <InputField
                    label="Value"
                    name={`${fieldPathPrefix}-${elementIndex}-value`}
                    type="text"
                    value={element.value || ""}
                    onChange={(value) =>
                      actions.updateGenericAttributeListElementValue(elementIndex, value)
                    }
                    placeholder="Enter value"
                    required={true}
                    error={getError(
                      `${fieldPathPrefix}.genericAttributeListElement.${elementIndex}.value`
                    )}
                  />
                  <SelectField
                    label="Unit"
                    name={`${fieldPathPrefix}-${elementIndex}-unit`}
                    options={UNIT_OPTIONS as unknown as { value: string; label: string }[]}
                    value={element.unit}
                    onChange={(value) =>
                      actions.updateGenericAttributeListElementUnit(elementIndex, value as Units)
                    }
                    required={true}
                    error={getError(
                      `${fieldPathPrefix}.genericAttributeListElement.${elementIndex}.unit`
                    )}
                  />
                </FormGroup>

                {isEnumDataTypeProduct(element.dataType) && (
                  <GenericAttributeListProductSimpleEnumForm
                    elementIndex={elementIndex}
                    enumMap={element.dataType.enum}
                    actions={actions}
                    fieldPathPrefix={fieldPathPrefix}
                  />
                )}

                {isBitmapDataTypeProduct(element.dataType) && (
                  <GenericAttributeListProductSimpleBitmapForm
                    elementIndex={elementIndex}
                    bitmap={element.dataType.bitmap}
                    actions={actions}
                    fieldPathPrefix={fieldPathPrefix}
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
                    actions.removeNestedGenericAttributeListElement(
                      elementIndex,
                      nestedElementIndex
                    )
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
                            actions.updateNestedGenericAttributeListElementName(
                              elementIndex,
                              nestedElementIndex,
                              value
                            )
                          }
                          placeholder="Enter nested attribute name"
                          required={true}
                          error={getError(
                            `${fieldPathPrefix}.genericAttributeListElement.${elementIndex}.genericAttributeList.genericAttributeListElement.${nestedElementIndex}.name`
                          )}
                        />
                        <SelectField
                          label="Data Type"
                          name={`${fieldPathPrefix}-${elementIndex}-nested-${nestedElementIndex}-dataType`}
                          options={
                            DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]
                          }
                          value={getDataTypeProductStringValue(nestedElement.dataType)}
                          onChange={(value) => {
                            const newDataType = createDataTypeProductFromString(value);
                            if (
                              value === "enum" &&
                              !isEnumDataTypeProduct(nestedElement.dataType)
                            ) {
                              actions.setGenericAttributeListNestedEnumDataType(
                                elementIndex,
                                nestedElementIndex,
                                { enumEntry: [] }
                              );
                            } else if (
                              value === "bitmap" &&
                              !isBitmapDataTypeProduct(nestedElement.dataType)
                            ) {
                              actions.setGenericAttributeListNestedBitmapDataType(
                                elementIndex,
                                nestedElementIndex,
                                { bitmapEntry: [] }
                              );
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
                            `${fieldPathPrefix}.genericAttributeListElement.${elementIndex}.genericAttributeList.genericAttributeListElement.${nestedElementIndex}.dataType`
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
                            `${fieldPathPrefix}.genericAttributeListElement.${elementIndex}.genericAttributeList.genericAttributeListElement.${nestedElementIndex}.value`
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
                            `${fieldPathPrefix}.genericAttributeListElement.${elementIndex}.genericAttributeList.genericAttributeListElement.${nestedElementIndex}.unit`
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
                        />
                      )}

                      {isBitmapDataTypeProduct(nestedElement.dataType) && (
                        <GenericAttributeListProductNestedBitmapForm
                          elementIndex={elementIndex}
                          nestedElementIndex={nestedElementIndex}
                          bitmap={nestedElement.dataType.bitmap}
                          actions={actions}
                          fieldPathPrefix={fieldPathPrefix}
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
