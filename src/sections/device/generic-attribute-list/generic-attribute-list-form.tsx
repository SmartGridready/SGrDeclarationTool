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
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { GenericAttributeListSimpleEnumForm } from "@/sections/device/generic-attribute-list/data-types/simple/enum/enum-form";
import { GenericAttributeListSimpleBitmapForm } from "@/sections/device/generic-attribute-list/data-types/simple/bitmap/bitmap-form";
import { GenericAttributeListNestedEnumForm } from "@/sections/device/generic-attribute-list/data-types/nested/enum/enum-form";
import { GenericAttributeListNestedBitmapForm } from "@/sections/device/generic-attribute-list/data-types/nested/bitmap/bitmap-form";
import {
  GenericAttributeProduct,
  GenericAttributeProductEnd,
  GenericAttributeListProductEnd,
  DataTypeProduct,
  Units,
} from "@/models";

export function GenericAttributeListForm() {
  const { useDeviceState, useValidation, genericAttributeListActions, pathPrefix } =
    useDeviceFormContext();

  const genericAttributeList = useDeviceState((d) => d?.genericAttributeList);
  const { getError } = useValidation();

  const fullPathPrefix = pathPrefix
    ? buildDeviceFieldPath(pathPrefix, "genericAttributeList")
    : "genericAttributeList";

  // Type guard to check if attribute is simple
  const isSimpleAttribute = (
    attr: GenericAttributeProduct
  ): attr is GenericAttributeProduct & {
    dataType: DataTypeProduct;
    value: string;
    unit: Units;
  } => {
    return "dataType" in attr && "value" in attr && "unit" in attr;
  };

  // Type guard to check if attribute is nested
  const isNestedAttribute = (
    attr: GenericAttributeProduct
  ): attr is GenericAttributeProduct & { genericAttributeList: GenericAttributeListProductEnd } => {
    return "genericAttributeList" in attr;
  };

  return (
    <FormSection
      title="Generic Attribute List"
      description="Generic attributes for the device"
      required={false}
      isAdded={!!genericAttributeList}
      onAdd={() => genericAttributeListActions.addGenericAttributeList()}
      onRemove={() => genericAttributeListActions.removeGenericAttributeList()}
      nested
    >
      <ArrayField
        label="Generic Attribute Elements"
        items={genericAttributeList?.genericAttributeListElement}
        onAdd={() => genericAttributeListActions.addGenericAttributeListElement()}
        onRemove={(elementIndex) =>
          genericAttributeListActions.removeGenericAttributeListElement(elementIndex)
        }
        emptyMessage="No generic attribute elements added"
        renderItem={(element, elementIndex) => (
          <div className="space-y-4">
            <FormGroup columns={2}>
              <InputField
                label="Attribute Name"
                name={`${fullPathPrefix}-${elementIndex}-name`}
                type="text"
                value={element.name}
                onChange={(value) =>
                  genericAttributeListActions.updateGenericAttributeListElementName(
                    elementIndex,
                    value
                  )
                }
                placeholder="Enter attribute name"
                required={true}
                error={getError(
                  `${fullPathPrefix}.genericAttributeListElement.${elementIndex}.name`
                )}
              />
              <SelectField
                label="Attribute Type"
                name={`${fullPathPrefix}-${elementIndex}-type`}
                options={[
                  { value: "simple", label: "Simple" },
                  { value: "nested", label: "Nested" },
                ]}
                value={isSimpleAttribute(element) ? "simple" : "nested"}
                onChange={(value) => {
                  if (value === "simple" && isNestedAttribute(element)) {
                    // Convert nested to simple
                    genericAttributeListActions.setGenericAttributeListElementAsSimple(
                      elementIndex,
                      { float64: {} },
                      "",
                      "NO_UNITS"
                    );
                  } else if (value === "nested" && isSimpleAttribute(element)) {
                    // Convert simple to nested
                    genericAttributeListActions.setGenericAttributeListElementAsNested(
                      elementIndex
                    );
                  }
                }}
                required={true}
              />
            </FormGroup>

            {isSimpleAttribute(element) && (
              <>
                <FormGroup columns={3}>
                  <SelectField
                    label="Data Type"
                    name={`${fullPathPrefix}-${elementIndex}-dataType`}
                    options={DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
                    value={getDataTypeProductStringValue(element.dataType)}
                    onChange={(value) => {
                      const newDataType = createDataTypeProductFromString(value);
                      if (value === "enum" && !isEnumDataTypeProduct(element.dataType)) {
                        genericAttributeListActions.setGenericAttributeListSimpleEnumDataType(
                          elementIndex,
                          { enumEntry: [] }
                        );
                      } else if (value === "bitmap" && !isBitmapDataTypeProduct(element.dataType)) {
                        genericAttributeListActions.setGenericAttributeListSimpleBitmapDataType(
                          elementIndex,
                          { bitmapEntry: [] }
                        );
                      } else {
                        genericAttributeListActions.updateGenericAttributeListElementDataType(
                          elementIndex,
                          newDataType
                        );
                      }
                    }}
                    required={true}
                    error={getError(
                      `${fullPathPrefix}.genericAttributeListElement.${elementIndex}.dataType`
                    )}
                  />
                  <InputField
                    label="Value"
                    name={`${fullPathPrefix}-${elementIndex}-value`}
                    type="text"
                    value={element.value || ""}
                    onChange={(value) =>
                      genericAttributeListActions.updateGenericAttributeListElementValue(
                        elementIndex,
                        value
                      )
                    }
                    placeholder="Enter value"
                    required={true}
                    error={getError(
                      `${fullPathPrefix}.genericAttributeListElement.${elementIndex}.value`
                    )}
                  />
                  <SelectField
                    label="Unit"
                    name={`${fullPathPrefix}-${elementIndex}-unit`}
                    options={UNIT_OPTIONS as unknown as { value: string; label: string }[]}
                    value={element.unit}
                    onChange={(value) =>
                      genericAttributeListActions.updateGenericAttributeListElementUnit(
                        elementIndex,
                        value as Units
                      )
                    }
                    required={true}
                    error={getError(
                      `${fullPathPrefix}.genericAttributeListElement.${elementIndex}.unit`
                    )}
                  />
                </FormGroup>

                {isEnumDataTypeProduct(element.dataType) && (
                  <GenericAttributeListSimpleEnumForm
                    elementIndex={elementIndex}
                    enumMap={element.dataType.enum}
                  />
                )}

                {isBitmapDataTypeProduct(element.dataType) && (
                  <GenericAttributeListSimpleBitmapForm
                    elementIndex={elementIndex}
                    bitmap={element.dataType.bitmap}
                  />
                )}
              </>
            )}

            {isNestedAttribute(element) && (
              <div className="space-y-4">
                <ArrayField<GenericAttributeProductEnd>
                  label="Nested Generic Attribute Elements"
                  items={element.genericAttributeList.genericAttributeListElement}
                  onAdd={() =>
                    genericAttributeListActions.addNestedGenericAttributeListElement(elementIndex)
                  }
                  onRemove={(nestedElementIndex) =>
                    genericAttributeListActions.removeNestedGenericAttributeListElement(
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
                          name={`${fullPathPrefix}-${elementIndex}-nested-${nestedElementIndex}-name`}
                          type="text"
                          value={nestedElement.name}
                          onChange={(value) =>
                            genericAttributeListActions.updateNestedGenericAttributeListElementName(
                              elementIndex,
                              nestedElementIndex,
                              value
                            )
                          }
                          placeholder="Enter nested attribute name"
                          required={true}
                          error={getError(
                            `${fullPathPrefix}.genericAttributeListElement.${elementIndex}.genericAttributeList.genericAttributeListElement.${nestedElementIndex}.name`
                          )}
                        />
                        <SelectField
                          label="Data Type"
                          name={`${fullPathPrefix}-${elementIndex}-nested-${nestedElementIndex}-dataType`}
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
                              genericAttributeListActions.setGenericAttributeListNestedEnumDataType(
                                elementIndex,
                                nestedElementIndex,
                                { enumEntry: [] }
                              );
                            } else if (
                              value === "bitmap" &&
                              !isBitmapDataTypeProduct(nestedElement.dataType)
                            ) {
                              genericAttributeListActions.setGenericAttributeListNestedBitmapDataType(
                                elementIndex,
                                nestedElementIndex,
                                { bitmapEntry: [] }
                              );
                            } else {
                              genericAttributeListActions.updateNestedGenericAttributeListElementDataType(
                                elementIndex,
                                nestedElementIndex,
                                newDataType
                              );
                            }
                          }}
                          required={true}
                          error={getError(
                            `${fullPathPrefix}.genericAttributeListElement.${elementIndex}.genericAttributeList.genericAttributeListElement.${nestedElementIndex}.dataType`
                          )}
                        />
                        <InputField
                          label="Value"
                          name={`${fullPathPrefix}-${elementIndex}-nested-${nestedElementIndex}-value`}
                          type="text"
                          value={nestedElement.value || ""}
                          onChange={(value) =>
                            genericAttributeListActions.updateNestedGenericAttributeListElementValue(
                              elementIndex,
                              nestedElementIndex,
                              value
                            )
                          }
                          placeholder="Enter value"
                          required={true}
                          error={getError(
                            `${fullPathPrefix}.genericAttributeListElement.${elementIndex}.genericAttributeList.genericAttributeListElement.${nestedElementIndex}.value`
                          )}
                        />
                      </FormGroup>
                      <FormGroup columns={3}>
                        <SelectField
                          label="Unit"
                          name={`${fullPathPrefix}-${elementIndex}-nested-${nestedElementIndex}-unit`}
                          options={UNIT_OPTIONS as unknown as { value: string; label: string }[]}
                          value={nestedElement.unit}
                          onChange={(value) =>
                            genericAttributeListActions.updateNestedGenericAttributeListElementUnit(
                              elementIndex,
                              nestedElementIndex,
                              value as Units
                            )
                          }
                          required={true}
                          error={getError(
                            `${fullPathPrefix}.genericAttributeListElement.${elementIndex}.genericAttributeList.genericAttributeListElement.${nestedElementIndex}.unit`
                          )}
                        />
                      </FormGroup>

                      {isEnumDataTypeProduct(nestedElement.dataType) && (
                        <GenericAttributeListNestedEnumForm
                          elementIndex={elementIndex}
                          nestedElementIndex={nestedElementIndex}
                          enumMap={nestedElement.dataType.enum}
                        />
                      )}

                      {isBitmapDataTypeProduct(nestedElement.dataType) && (
                        <GenericAttributeListNestedBitmapForm
                          elementIndex={elementIndex}
                          nestedElementIndex={nestedElementIndex}
                          bitmap={nestedElement.dataType.bitmap}
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
