import { RestApiDataPointConfiguration, RestApiDataType } from "@/models/product/rest-api-types";
import { RestApiDataPoint } from "@/models/product/rest-api-interface";
import {
  createSingleServiceCallSlice,
  SingleServiceCallSlice,
  isSingleServiceCallConfig,
} from "./single-service-call/single-service-call-slice";
import {
  createWriteReadServiceCallSlice,
  WriteReadServiceCallSlice,
  isWriteReadServiceCallConfig,
} from "./write-read-service-call/write-read-service-call-slice";
import {
  createReadWriteServiceCallSlice,
  ReadWriteServiceCallSlice,
  isReadWriteServiceCallConfig,
} from "./read-write-service-call/read-write-service-call-slice";

/**
 * Configuration type for the data point
 */
export const CONFIG_TYPE_VALUES = ["single", "writeRead", "readWrite"] as const;
export type ConfigType = (typeof CONFIG_TYPE_VALUES)[number];

export interface RestApiDataPointConfigurationSlice
  extends SingleServiceCallSlice,
    WriteReadServiceCallSlice,
    ReadWriteServiceCallSlice {
  // Configuration management
  addConfiguration: () => void;
  removeConfiguration: () => void;
  updateDataType: (dataType: RestApiDataType) => void;
  setConfigurationType: (configType: ConfigType) => void;
}

/**
 * Determines the current configuration type based on the configuration structure
 */
export function getConfigurationType(
  config: RestApiDataPointConfiguration | undefined
): ConfigType | undefined {
  if (!config) return undefined;
  if (isSingleServiceCallConfig(config)) return "single";
  if (isWriteReadServiceCallConfig(config)) return "writeRead";
  if (isReadWriteServiceCallConfig(config)) return "readWrite";
  return undefined;
}

/**
 * Creates a REST API data point configuration slice.
 *
 * @param set - The Zustand set function
 * @param getDataPoint - Function to get the RestApiDataPoint
 */
export function createRestApiDataPointConfigurationSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getDataPoint: (state: TState) => RestApiDataPoint | undefined
): RestApiDataPointConfigurationSlice {
  const getConfig = (state: TState): RestApiDataPointConfiguration | undefined =>
    getDataPoint(state)?.restApiDataPointConfiguration;

  // Create sub-slices
  const singleServiceCallSlice = createSingleServiceCallSlice(set, getConfig);
  const writeReadServiceCallSlice = createWriteReadServiceCallSlice(set, getConfig);
  const readWriteServiceCallSlice = createReadWriteServiceCallSlice(set, getConfig);

  return {
    // Spread all sub-slice actions
    ...singleServiceCallSlice,
    ...writeReadServiceCallSlice,
    ...readWriteServiceCallSlice,

    addConfiguration: () =>
      set((state) => {
        const dataPoint = getDataPoint(state);
        if (dataPoint && !dataPoint.restApiDataPointConfiguration) {
          // Default to single service call configuration
          dataPoint.restApiDataPointConfiguration = {
            dataType: "JSON_object",
            restApiServiceCall: {
              requestMethod: "GET",
            },
          };
        }
      }),

    removeConfiguration: () =>
      set((state) => {
        const dataPoint = getDataPoint(state);
        if (dataPoint) {
          dataPoint.restApiDataPointConfiguration = undefined;
        }
      }),

    updateDataType: (dataType) =>
      set((state) => {
        const config = getConfig(state);
        if (config) {
          config.dataType = dataType;
        }
      }),

    setConfigurationType: (configType) =>
      set((state) => {
        const dataPoint = getDataPoint(state);
        const config = getConfig(state);
        if (!dataPoint || !config) return;

        const currentType = getConfigurationType(config);
        if (currentType === configType) return;

        // Preserve dataType when switching
        const dataType = config.dataType;

        switch (configType) {
          case "single":
            dataPoint.restApiDataPointConfiguration = {
              dataType,
              restApiServiceCall: {
                requestMethod: "GET",
              },
            };
            break;
          case "writeRead":
            dataPoint.restApiDataPointConfiguration = {
              dataType,
              restApiWriteServiceCall: {
                requestMethod: "POST",
              },
            } as RestApiDataPointConfiguration;
            break;
          case "readWrite":
            dataPoint.restApiDataPointConfiguration = {
              dataType,
              restApiReadServiceCall: {
                requestMethod: "GET",
              },
            } as RestApiDataPointConfiguration;
            break;
        }
      }),
  };
}
