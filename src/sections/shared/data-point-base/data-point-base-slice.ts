import {
  DataPointDescription,
  DataDirectionProduct,
  DataTypeProduct,
  Units,
  GenericAttributeListProduct,
} from "@/models";
import { createAlternativeNamesSlice } from "@/sections/shared/alternative-names/alternative-names-slice";
import { createLegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { createGenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import { createDynamicParameterListSlice } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";
import { AlternativeNamesSlice } from "@/sections/shared/alternative-names/alternative-names-slice";
import { LegibleDescriptionSlice } from "@/sections/shared/legible-description/legible-description-slice";
import { GenericAttributeListProductSlice } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";
import { DynamicParameterListSlice } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-slice";
import { DataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { DataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";
import { createDataTypeProductEnumSlice } from "@/sections/shared/data-type-product/enum/enum-slice";
import { createDataTypeProductBitmapSlice } from "@/sections/shared/data-type-product/bitmap/bitmap-slice";

export interface DataPointBaseSlice
  extends AlternativeNamesSlice,
    LegibleDescriptionSlice,
    GenericAttributeListProductSlice,
    DynamicParameterListSlice,
    DataTypeProductEnumSlice,
    DataTypeProductBitmapSlice {
  // Data Point Description fields
  updateDataPointName: (dataPointName: string) => void;
  updateDataDirection: (dataDirection: DataDirectionProduct) => void;
  updateDataType: (dataType: DataTypeProduct) => void;
  updateValue: (value: string | undefined) => void;
  updateUnit: (unit: Units) => void;
  updateArrayLength: (arrayLength: number | undefined) => void;
  updateMinimumValue: (minimumValue: number | undefined) => void;
  updateMaximumValue: (maximumValue: number | undefined) => void;
  updateUnitConversionMultiplicator: (unitConversionMultiplicator: number | undefined) => void;
  // Programmer hints - returns a LegibleDescriptionSlice for use with LegibleDescriptionForm
  getProgrammerHintsLegibleDescriptionSlice: () => LegibleDescriptionSlice;
}

/**
 * Represents the data point base portion of a frame
 * This is the nested structure inside DataPointBase
 */
export interface DataPointBaseContainer {
  dataPoint: DataPointDescription;
  genericAttributeList?: GenericAttributeListProduct;
}

/**
 * Creates a data point base slice that works with any store state
 * @param set - The Zustand set function
 * @param getDataPointBase - Function to get the dataPointBase container from the store state
 */
export function createDataPointBaseSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPointBase: (state: TState) => DataPointBaseContainer | undefined
): DataPointBaseSlice {
  // Helper to get dataPointDescription
  const getDataPointDescription = (state: TState): DataPointDescription | undefined =>
    getDataPointBase(state)?.dataPoint;

  // Create nested slices
  const alternativeNamesSlice = createAlternativeNamesSlice(
    set,
    (state) => getDataPointDescription(state)?.alternativeNames,
    (state, value) => {
      const dp = getDataPointDescription(state);
      if (dp) {
        dp.alternativeNames = value;
      }
    },
    true // isOptional
  );

  const legibleDescriptionSlice = createLegibleDescriptionSlice(
    set,
    (state) => getDataPointDescription(state)?.legibleDescription,
    (state, value) => {
      const dp = getDataPointDescription(state);
      if (dp) {
        dp.legibleDescription = value;
      }
    },
    4, // maxItems
    true // isOptional
  );

  const genericAttributeListSlice = createGenericAttributeListProductSlice(
    set,
    (state) => getDataPointBase(state)?.genericAttributeList,
    (state, value) => {
      const dpBase = getDataPointBase(state);
      if (dpBase) {
        dpBase.genericAttributeList = value;
      }
    }
  );

  // Dynamic parameter list slice - adapt to work without listIndex
  const dynamicParameterListSlice = createDynamicParameterListSlice(
    set,
    (state, _listIndex) => {
      // For DataPointBase, we always use listIndex 0 since there's only one data point
      return getDataPointDescription(state)?.parameterList;
    },
    (state, _listIndex, value) => {
      // For DataPointBase, we always use listIndex 0 since there's only one data point
      const dp = getDataPointDescription(state);
      if (dp) {
        dp.parameterList = value;
      }
    }
  );

  // Programmer hints slice (separate instance for programmerHints array)
  const programmerHintsSlice = createLegibleDescriptionSlice(
    set,
    (state) => getDataPointDescription(state)?.programmerHints,
    (state, value) => {
      const dp = getDataPointDescription(state);
      if (dp) {
        dp.programmerHints = value;
      }
    },
    4, // maxItems
    true // isOptional
  );

  // Wrap dynamic parameter list methods to always use listIndex 0
  // Note: The interface requires listIndex parameter, but we always pass 0
  const wrappedDynamicParameterListSlice: DynamicParameterListSlice = {
    ...dynamicParameterListSlice,
    addParameterList: (_listIndex: number) => dynamicParameterListSlice.addParameterList(0),
    removeParameterList: (_listIndex: number) => dynamicParameterListSlice.removeParameterList(0),
    addParameterListElement: (_listIndex: number) =>
      dynamicParameterListSlice.addParameterListElement(0),
    removeParameterListElement: (_listIndex: number, paramIndex: number) =>
      dynamicParameterListSlice.removeParameterListElement(0, paramIndex),
    updateParameterListElementName: (_listIndex: number, paramIndex: number, name: string) =>
      dynamicParameterListSlice.updateParameterListElementName(0, paramIndex, name),
    updateParameterListElementDataType: (
      _listIndex: number,
      paramIndex: number,
      dataType: DataTypeProduct
    ) => dynamicParameterListSlice.updateParameterListElementDataType(0, paramIndex, dataType),
    updateParameterListElementDefaultValue: (
      _listIndex: number,
      paramIndex: number,
      defaultValue: string | undefined
    ) =>
      dynamicParameterListSlice.updateParameterListElementDefaultValue(0, paramIndex, defaultValue),
  };

  // Data type enum and bitmap slices
  const dataTypeEnumSlice = createDataTypeProductEnumSlice(
    set,
    (state) => getDataPointDescription(state)?.dataType,
    (state, dataType) => {
      const dp = getDataPointDescription(state);
      if (dp) {
        dp.dataType = dataType;
      }
    }
  );

  const dataTypeBitmapSlice = createDataTypeProductBitmapSlice(
    set,
    (state) => getDataPointDescription(state)?.dataType,
    (state, dataType) => {
      const dp = getDataPointDescription(state);
      if (dp) {
        dp.dataType = dataType;
      }
    }
  );

  return {
    ...alternativeNamesSlice,
    ...legibleDescriptionSlice,
    ...genericAttributeListSlice,
    ...wrappedDynamicParameterListSlice,
    ...dataTypeEnumSlice,
    ...dataTypeBitmapSlice,

    // Data Point Description fields
    updateDataPointName: (value) =>
      set((state) => {
        const dp = getDataPointDescription(state);
        if (dp) {
          dp.dataPointName = value;
        }
      }),

    updateDataDirection: (value) =>
      set((state) => {
        const dp = getDataPointDescription(state);
        if (dp) {
          dp.dataDirection = value;
        }
      }),

    updateDataType: (value) =>
      set((state) => {
        const dp = getDataPointDescription(state);
        if (dp) {
          dp.dataType = value;
        }
      }),

    updateValue: (value) =>
      set((state) => {
        const dp = getDataPointDescription(state);
        if (dp) {
          dp.value = value;
        }
      }),

    updateUnit: (value) =>
      set((state) => {
        const dp = getDataPointDescription(state);
        if (dp) {
          dp.unit = value;
        }
      }),

    updateArrayLength: (value) =>
      set((state) => {
        const dp = getDataPointDescription(state);
        if (dp) {
          dp.arrayLength = value;
        }
      }),

    updateMinimumValue: (value) =>
      set((state) => {
        const dp = getDataPointDescription(state);
        if (dp) {
          dp.minimumValue = value;
        }
      }),

    updateMaximumValue: (value) =>
      set((state) => {
        const dp = getDataPointDescription(state);
        if (dp) {
          dp.maximumValue = value;
        }
      }),

    updateUnitConversionMultiplicator: (value) =>
      set((state) => {
        const dp = getDataPointDescription(state);
        if (dp) {
          dp.unitConversionMultiplicator = value;
        }
      }),

    // Programmer hints - returns the slice for direct use with LegibleDescriptionForm
    getProgrammerHintsLegibleDescriptionSlice: () => programmerHintsSlice,
  };
}
