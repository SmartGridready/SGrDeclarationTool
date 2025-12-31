import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface ValueMappingSlice {
  addValueMapping: () => void;
  removeValueMapping: () => void;
  addValueMappingEntry: () => void;
  removeValueMappingEntry: (index: number) => void;
  updateValueMappingEntryGenericValue: (index: number, genericValue: string) => void;
  updateValueMappingEntryDeviceValue: (index: number, deviceValue: string) => void;
}

/**
 * Creates a value mapping slice that works with any store state
 */
export function createValueMappingSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getRestApiServiceCall: (state: TState) => RestApiServiceCall | undefined
): ValueMappingSlice {
  return {
    addValueMapping: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall && !serviceCall.valueMapping) {
          serviceCall.valueMapping = { mapping: [] };
        }
      }),

    removeValueMapping: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          serviceCall.valueMapping = undefined;
        }
      }),

    addValueMappingEntry: () =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall) {
          if (!serviceCall.valueMapping) {
            serviceCall.valueMapping = { mapping: [] };
          }
          serviceCall.valueMapping.mapping = ensureArray(serviceCall.valueMapping.mapping, () => []);
          serviceCall.valueMapping.mapping.push({ genericValue: "", deviceValue: "" });
        }
      }),

    removeValueMappingEntry: (index) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        if (serviceCall?.valueMapping?.mapping) {
          removeArrayItem(serviceCall.valueMapping.mapping, index, () => {
            if (serviceCall.valueMapping?.mapping?.length === 0) {
              serviceCall.valueMapping = undefined;
            }
          });
        }
      }),

    updateValueMappingEntryGenericValue: (index, genericValue) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        const entry = serviceCall?.valueMapping?.mapping?.[index];
        if (entry) {
          entry.genericValue = genericValue;
        }
      }),

    updateValueMappingEntryDeviceValue: (index, deviceValue) =>
      set((state) => {
        const serviceCall = getRestApiServiceCall(state);
        const entry = serviceCall?.valueMapping?.mapping?.[index];
        if (entry) {
          entry.deviceValue = deviceValue;
        }
      }),
  };
}
