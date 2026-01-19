"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { FormGroup } from "@/components/forms/form-group";
import { useFormSection } from "@/hooks/use-form-section";
import { DataPointBaseSlice } from "@/sections/shared/data-point-base/data-point-base-slice";
import { AlternativeNamesForm } from "@/sections/shared/alternative-names/alternative-names-form";
import { LegibleDescriptionForm } from "@/sections/shared/legible-description/legible-description-form";
import { GenericAttributeListProductForm } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-form";
import { DynamicParameterListForm } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-form";
import { DataTypeProductEnumForm } from "@/sections/shared/data-type-product/enum/enum-form";
import { DataTypeProductBitmapForm } from "@/sections/shared/data-type-product/bitmap/bitmap-form";
import {
  DataPointBase,
  DataPointDescription,
  DataDirectionProduct,
  Units,
  DATA_DIRECTION_PRODUCT_VALUES,
  DATA_TYPE_PRODUCT_EXTENDED_VALUES,
  UNITS_VALUES,
} from "@/models";
import { createFormOptions } from "@/utils/form-options-utils";
import {
  getDataTypeProductStringValue,
  createDataTypeProductFromString,
  isEnumDataTypeProduct,
  isBitmapDataTypeProduct,
  isJsonDataTypeProduct,
} from "@/sections/shared/data-type-product/data-type-product-utils";

const DATA_DIRECTION_OPTIONS = createFormOptions(DATA_DIRECTION_PRODUCT_VALUES);
const DATA_TYPE_OPTIONS = createFormOptions(DATA_TYPE_PRODUCT_EXTENDED_VALUES);
const UNIT_OPTIONS = createFormOptions(UNITS_VALUES);

interface DataPointBaseFormProps<TStoreState extends DataPointBaseSlice> {
  /**
   * Store hook function (e.g., useProfileStore, useDeviceStore)
   */
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  /**
   * Validation hook function that returns an object with getError method
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  /**
   * Selector to get dataPointBase state from the store
   */
  stateSelector: (store: TStoreState) => {
    dataPoint?: DataPointDescription;
    genericAttributeList?: DataPointBase["genericAttributeList"];
  };
  /**
   * Field path prefix for validation errors (e.g., "dataPoint" or "dataPointList.dataPointListElement[0]")
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
}

export function DataPointBaseForm<TStoreState extends DataPointBaseSlice>({
  useStore,
  useValidation,
  stateSelector,
  fieldPathPrefix = "dataPoint",
  title = "Data Point",
  description = "Data point information",
  nested = false,
}: DataPointBaseFormProps<TStoreState>) {
  const { state, actions, getError } = useFormSection<
    TStoreState,
    {
      dataPoint?: DataPointDescription;
      genericAttributeList?: DataPointBase["genericAttributeList"];
    },
    DataPointBaseSlice & Record<string, unknown>
  >({
    useStore,
    useValidation,
    stateSelector,
    actionsSelector: (store) => store as DataPointBaseSlice & Record<string, unknown>,
  });

  const dataPoint = state.dataPoint;

  if (!dataPoint) {
    return null;
  }

  // Note: Schema nests fields under "dataPoint", so we need to include it in the path
  const getFieldError = (field: string) => getError(`${fieldPathPrefix}.dataPoint.${field}`);

  return (
    <FormSection title={title} description={description} nested={nested} required={true}>
      <div className="space-y-6">
        {/* Basic Data Point Fields */}
        <FormGroup columns={2}>
          <InputField
            label="Data Point Name"
            name="dataPointName"
            required={true}
            type="text"
            value={dataPoint.dataPointName}
            onChange={(value) => actions.updateDataPointName(value)}
            error={getFieldError("dataPointName")}
          />
          <SelectField
            label="Data Direction"
            name="dataDirection"
            options={DATA_DIRECTION_OPTIONS}
            required={true}
            value={dataPoint.dataDirection}
            onChange={(value) => actions.updateDataDirection(value as DataDirectionProduct)}
            error={getFieldError("dataDirection")}
          />
        </FormGroup>

        <FormGroup columns={2}>
          <SelectField
            label="Data Type"
            name="dataType"
            options={DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
            required={true}
            value={getDataTypeProductStringValue(dataPoint.dataType)}
            onChange={(value) => {
              const newDataType = createDataTypeProductFromString(value);
              if (value === "enum" && !isEnumDataTypeProduct(dataPoint.dataType)) {
                actions.setEnumDataType({ enumEntry: [] });
              } else if (value === "bitmap" && !isBitmapDataTypeProduct(dataPoint.dataType)) {
                actions.setBitmapDataType({ bitmapEntry: [] });
              } else {
                actions.updateDataType(newDataType);
              }
            }}
            error={getFieldError("dataType")}
          />
          <SelectField
            label="Unit"
            name="unit"
            options={UNIT_OPTIONS}
            required={true}
            value={dataPoint.unit}
            onChange={(value) => actions.updateUnit(value as Units)}
            error={getFieldError("unit")}
          />
        </FormGroup>

        <FormGroup columns={2}>
          <InputField
            label="Value"
            name="value"
            required={false}
            type="text"
            value={dataPoint.value || ""}
            onChange={(value) => actions.updateValue(value || undefined)}
            placeholder="Optional default value"
            error={getFieldError("value")}
          />
          <InputField
            label="Array Length"
            name="arrayLength"
            type="number"
            value={dataPoint.arrayLength?.toString() || ""}
            onChange={(value) => actions.updateArrayLength(value ? parseInt(value, 10) : undefined)}
            placeholder="Optional array length"
            error={getFieldError("arrayLength")}
          />
        </FormGroup>

        <FormGroup columns={3}>
          <InputField
            label="Minimum Value"
            name="minimumValue"
            type="number"
            value={dataPoint.minimumValue?.toString() || ""}
            onChange={(value) => actions.updateMinimumValue(value ? parseFloat(value) : undefined)}
            placeholder="Optional minimum"
            error={getFieldError("minimumValue")}
          />
          <InputField
            label="Maximum Value"
            name="maximumValue"
            type="number"
            value={dataPoint.maximumValue?.toString() || ""}
            onChange={(value) => actions.updateMaximumValue(value ? parseFloat(value) : undefined)}
            placeholder="Optional maximum"
            error={getFieldError("maximumValue")}
          />
          <InputField
            label="Unit Conversion Multiplicator"
            name="unitConversionMultiplicator"
            type="number"
            value={dataPoint.unitConversionMultiplicator?.toString() || ""}
            onChange={(value) => actions.updateUnitConversionMultiplicator(value ? parseFloat(value) : undefined)}
            placeholder="Optional multiplicator"
            error={getFieldError("unitConversionMultiplicator")}
          />
        </FormGroup>

        {/* Data Type Specific Forms */}
        {isEnumDataTypeProduct(dataPoint.dataType) && (
          <DataTypeProductEnumForm
            enumMap={dataPoint.dataType.enum}
            actions={actions}
            fieldPathPrefix={`${fieldPathPrefix}.dataPoint.dataType.enum`}
            getError={getError}
          />
        )}

        {isBitmapDataTypeProduct(dataPoint.dataType) && (
          <DataTypeProductBitmapForm
            bitmap={dataPoint.dataType.bitmap}
            actions={actions}
            fieldPathPrefix={`${fieldPathPrefix}.dataPoint.dataType.bitmap`}
            getError={getError}
          />
        )}

        {isJsonDataTypeProduct(dataPoint.dataType) && (
          <FormSection title="JSON Data Type" nested={true}>
            <p className="text-sm text-muted-foreground">JSON data type does not require additional configuration.</p>
          </FormSection>
        )}

        {/* Parameter List */}
        <DynamicParameterListForm
          useStore={useStore}
          useValidation={useValidation}
          stateSelector={() => ({
            parameterList: dataPoint.parameterList,
          })}
          isAddedSelector={() => !!dataPoint.parameterList}
          fieldPathPrefix={`${fieldPathPrefix}.dataPoint.parameterList`}
          listIndex={0}
          required={false}
          nested={true}
        />

        {/* Alternative Names */}
        <AlternativeNamesForm
          useStore={useStore}
          useValidation={useValidation}
          stateSelector={() => ({
            alternativeNames: dataPoint.alternativeNames,
          })}
          isAddedSelector={() => !!dataPoint.alternativeNames}
          fieldPathPrefix={`${fieldPathPrefix}.dataPoint.alternativeNames`}
          required={false}
          nested={true}
        />

        {/* Legible Description */}
        <LegibleDescriptionForm
          useStore={useStore}
          useValidation={useValidation}
          stateSelector={() => ({
            legibleDescriptions: dataPoint.legibleDescription,
          })}
          isAddedSelector={() => !!dataPoint.legibleDescription}
          fieldPathPrefix={`${fieldPathPrefix}.dataPoint.legibleDescription`}
          required={false}
          nested={true}
          maxItems={4}
        />

        {/* Programmer Hints */}
        <LegibleDescriptionForm
          useStore={(selector) => {
            // Use the adapter from the slice that exposes programmer hints as LegibleDescriptionSlice
            const programmerHintsSlice = actions.getProgrammerHintsLegibleDescriptionSlice();
            return selector(programmerHintsSlice as unknown as TStoreState);
          }}
          useValidation={useValidation}
          stateSelector={() => ({
            legibleDescriptions: dataPoint.programmerHints,
          })}
          isAddedSelector={() => !!dataPoint.programmerHints}
          fieldPathPrefix={`${fieldPathPrefix}.dataPoint.programmerHints`}
          required={false}
          title="Programmer Hints"
          description="Programmer hints for the data point (max 4)"
          nested={true}
          maxItems={4}
        />

        {/* Generic Attribute List */}
        <GenericAttributeListProductForm
          useStore={useStore}
          useValidation={useValidation}
          stateSelector={() => ({
            genericAttributeList: state.genericAttributeList,
          })}
          isAddedSelector={() => !!state.genericAttributeList}
          fieldPathPrefix={`${fieldPathPrefix}.genericAttributeList`}
          required={false}
          nested={true}
        />
      </div>
    </FormSection>
  );
}
