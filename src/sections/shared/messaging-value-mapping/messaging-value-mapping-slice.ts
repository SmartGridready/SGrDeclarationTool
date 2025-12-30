import { MessagingValueMapping } from "@/models/product/messaging-types";
import { ensureArray, removeArrayItem } from "@/utils/slice-utils";

export interface MessagingValueMappingSlice {
  addValueMapping: () => void;
  removeValueMapping: () => void;
  addValueMappingEntry: () => void;
  removeValueMappingEntry: (index: number) => void;
  updateValueMappingEntryGenericValue: (index: number, genericValue: string) => void;
  updateValueMappingEntryDeviceValue: (index: number, deviceValue: string) => void;
}

/**
 * Creates a generic messaging value mapping slice that works with any store state
 * @param set - The Zustand set function
 * @param getValueMapping - Function to get the MessagingValueMapping from state
 * @param setValueMapping - Function to set the MessagingValueMapping in state
 */
export function createMessagingValueMappingSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getValueMapping: (state: TState) => MessagingValueMapping | undefined,
  setValueMapping: (state: TState, valueMapping: MessagingValueMapping | undefined) => void
): MessagingValueMappingSlice {
  return {
    addValueMapping: () =>
      set((state) => {
        if (!getValueMapping(state)) {
          setValueMapping(state, { mapping: [] });
        }
      }),

    removeValueMapping: () =>
      set((state) => {
        setValueMapping(state, undefined);
      }),

    addValueMappingEntry: () =>
      set((state) => {
        const current = getValueMapping(state);
        if (!current) {
          setValueMapping(state, { mapping: [] });
        }
        const updated = getValueMapping(state);
        if (updated) {
          updated.mapping = ensureArray(updated.mapping, () => []);
          updated.mapping.push({ genericValue: "", deviceValue: "" });
          setValueMapping(state, updated);
        }
      }),

    removeValueMappingEntry: (index) =>
      set((state) => {
        const current = getValueMapping(state);
        if (current?.mapping) {
          removeArrayItem(current.mapping, index, () => {
            if (current.mapping.length === 0) {
              setValueMapping(state, undefined);
            }
          });
        }
      }),

    updateValueMappingEntryGenericValue: (index, genericValue) =>
      set((state) => {
        const current = getValueMapping(state);
        const entry = current?.mapping?.[index];
        if (entry) {
          entry.genericValue = genericValue;
        }
      }),

    updateValueMappingEntryDeviceValue: (index, deviceValue) =>
      set((state) => {
        const current = getValueMapping(state);
        const entry = current?.mapping?.[index];
        if (entry) {
          entry.deviceValue = deviceValue;
        }
      }),
  };
}
