import { DataTypeProduct, DeviceFrame } from "@/models";
import { createEmptyConfigurationListElement } from "@/utils/factory-utils";
import { ensureArray, removeArrayItem, normalizeString } from "@/utils/slice-utils";
import {
  createConfigurationListEnumSlice,
  ConfigurationListEnumSlice,
} from "@/sections/device/configuration-list/data-types/enum/enum-slice";
import {
  createConfigurationListBitmapSlice,
  ConfigurationListBitmapSlice,
} from "@/sections/device/configuration-list/data-types/bitmap/bitmap-slice";
import {
  createConfigurationDescriptionsSlice,
  ConfigurationDescriptionsSlice,
} from "@/sections/device/configuration-list/configuration-descriptions/configuration-descriptions-slice";

export interface ConfigurationListSlice
  extends ConfigurationListEnumSlice,
    ConfigurationListBitmapSlice,
    ConfigurationDescriptionsSlice {
  addConfigurationList: () => void;
  removeConfigurationList: () => void;
  addConfigurationListElement: () => void;
  removeConfigurationListElement: (configIndex: number) => void;
  updateConfigurationListElementName: (configIndex: number, name: string) => void;
  updateConfigurationListElementDataType: (configIndex: number, dataType: DataTypeProduct) => void;
  updateConfigurationListElementDefaultValue: (configIndex: number, defaultValue: string | undefined) => void;
}

export function createConfigurationListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ConfigurationListSlice {
  const enumSlice = createConfigurationListEnumSlice(set);
  const bitmapSlice = createConfigurationListBitmapSlice(set);
  const descriptionsSlice = createConfigurationDescriptionsSlice(set);

  return {
    ...enumSlice,
    ...bitmapSlice,
    ...descriptionsSlice,

    addConfigurationList: () =>
      set((state) => {
        if (state.device) {
          state.device.configurationList = { configurationListElement: [] };
        }
      }),

    removeConfigurationList: () =>
      set((state) => {
        if (state.device) {
          state.device.configurationList = undefined;
        }
      }),

    addConfigurationListElement: () =>
      set((state) => {
        if (state.device) {
          if (!state.device.configurationList) {
            state.device.configurationList = { configurationListElement: [] };
          }
          const list = ensureArray(state.device.configurationList.configurationListElement, () => []);
          list.push(createEmptyConfigurationListElement());
          state.device.configurationList.configurationListElement = list;
        }
      }),

    removeConfigurationListElement: (configIndex) =>
      set((state) => {
        if (state.device?.configurationList?.configurationListElement) {
          removeArrayItem(state.device.configurationList.configurationListElement, configIndex, () => {
            // Since configurationListElement is required (minOccurs=1),
            // remove the entire configurationList when empty
            if (state.device) {
              state.device.configurationList = undefined;
            }
          });
        }
      }),

    updateConfigurationListElementName: (configIndex, name) =>
      set((state) => {
        const config = state.device?.configurationList?.configurationListElement?.[configIndex];
        if (config) config.name = name;
      }),

    updateConfigurationListElementDataType: (configIndex, dataType) =>
      set((state) => {
        const config = state.device?.configurationList?.configurationListElement?.[configIndex];
        if (config) config.dataType = dataType;
      }),

    updateConfigurationListElementDefaultValue: (configIndex, defaultValue) =>
      set((state) => {
        const config = state.device?.configurationList?.configurationListElement?.[configIndex];
        if (config) {
          // Preserve empty strings for defaultValue (they should appear as empty elements in XML)
          // Only convert null/undefined to undefined
          config.defaultValue = defaultValue === null || defaultValue === undefined ? undefined : defaultValue;
        }
      }),
  };
}
