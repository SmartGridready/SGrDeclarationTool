import { RestApiDataPointConfiguration, RestApiServiceCall } from "@/models/product/rest-api-types";
import { ResponseQueryType } from "@/models/generic";
import {
  createRestApiServiceCallSlice,
  RestApiServiceCallSlice,
} from "@/sections/shared/rest-api-service-call/rest-api-service-call-slice";

/**
 * Slice interface for write service call operations.
 * Prefixed with "write" to distinguish from read operations.
 */
export interface WriteServiceCallSlice {
  writeAddRequestHeader: () => void;
  writeRemoveRequestHeader: () => void;
  writeAddRequestHeaderEntry: () => void;
  writeRemoveRequestHeaderEntry: (index: number) => void;
  writeUpdateRequestHeaderEntryName: (index: number, headerName: string) => void;
  writeUpdateRequestHeaderEntryValue: (index: number, value: string) => void;
  writeUpdateRequestMethod: (requestMethod: RestApiServiceCall["requestMethod"]) => void;
  writeUpdateRequestPath: (requestPath: string | undefined) => void;
  writeUpdateRequestBody: (requestBody: string | undefined) => void;
  writeAddRequestQuery: () => void;
  writeRemoveRequestQuery: () => void;
  writeAddRequestQueryParameter: () => void;
  writeRemoveRequestQueryParameter: (index: number) => void;
  writeUpdateRequestQueryParameterName: (index: number, name: string) => void;
  writeUpdateRequestQueryParameterValue: (index: number, value: string) => void;
  writeAddRequestForm: () => void;
  writeRemoveRequestForm: () => void;
  writeAddRequestFormParameter: () => void;
  writeRemoveRequestFormParameter: (index: number) => void;
  writeUpdateRequestFormParameterName: (index: number, name: string) => void;
  writeUpdateRequestFormParameterValue: (index: number, value: string) => void;
  writeAddResponseQuery: () => void;
  writeRemoveResponseQuery: () => void;
  writeUpdateResponseQueryType: (queryType: ResponseQueryType) => void;
  writeUpdateResponseQueryQuery: (query: string | undefined) => void;
  writeAddResponseQueryJmesPathMapping: () => void;
  writeRemoveResponseQueryJmesPathMapping: () => void;
  writeAddResponseQueryJmesPathMappingRecord: () => void;
  writeRemoveResponseQueryJmesPathMappingRecord: (index: number) => void;
  writeUpdateResponseQueryJmesPathMappingRecordFrom: (index: number, from: string) => void;
  writeUpdateResponseQueryJmesPathMappingRecordTo: (index: number, to: string) => void;
  writeUpdateResponseQueryJmesPathMappingRecordName: (index: number, name: string | undefined) => void;
  writeAddValueMapping: () => void;
  writeRemoveValueMapping: () => void;
  writeAddValueMappingEntry: () => void;
  writeRemoveValueMappingEntry: (index: number) => void;
  writeUpdateValueMappingEntryGenericValue: (index: number, genericValue: string) => void;
  writeUpdateValueMappingEntryDeviceValue: (index: number, deviceValue: string) => void;
}

/**
 * Slice interface for optional read service call operations.
 * Includes add/remove for the optional read service call.
 */
export interface ReadServiceCallSlice {
  addReadServiceCall: () => void;
  removeReadServiceCall: () => void;
  readAddRequestHeader: () => void;
  readRemoveRequestHeader: () => void;
  readAddRequestHeaderEntry: () => void;
  readRemoveRequestHeaderEntry: (index: number) => void;
  readUpdateRequestHeaderEntryName: (index: number, headerName: string) => void;
  readUpdateRequestHeaderEntryValue: (index: number, value: string) => void;
  readUpdateRequestMethod: (requestMethod: RestApiServiceCall["requestMethod"]) => void;
  readUpdateRequestPath: (requestPath: string | undefined) => void;
  readUpdateRequestBody: (requestBody: string | undefined) => void;
  readAddRequestQuery: () => void;
  readRemoveRequestQuery: () => void;
  readAddRequestQueryParameter: () => void;
  readRemoveRequestQueryParameter: (index: number) => void;
  readUpdateRequestQueryParameterName: (index: number, name: string) => void;
  readUpdateRequestQueryParameterValue: (index: number, value: string) => void;
  readAddRequestForm: () => void;
  readRemoveRequestForm: () => void;
  readAddRequestFormParameter: () => void;
  readRemoveRequestFormParameter: (index: number) => void;
  readUpdateRequestFormParameterName: (index: number, name: string) => void;
  readUpdateRequestFormParameterValue: (index: number, value: string) => void;
  readAddResponseQuery: () => void;
  readRemoveResponseQuery: () => void;
  readUpdateResponseQueryType: (queryType: ResponseQueryType) => void;
  readUpdateResponseQueryQuery: (query: string | undefined) => void;
  readAddResponseQueryJmesPathMapping: () => void;
  readRemoveResponseQueryJmesPathMapping: () => void;
  readAddResponseQueryJmesPathMappingRecord: () => void;
  readRemoveResponseQueryJmesPathMappingRecord: (index: number) => void;
  readUpdateResponseQueryJmesPathMappingRecordFrom: (index: number, from: string) => void;
  readUpdateResponseQueryJmesPathMappingRecordTo: (index: number, to: string) => void;
  readUpdateResponseQueryJmesPathMappingRecordName: (index: number, name: string | undefined) => void;
  readAddValueMapping: () => void;
  readRemoveValueMapping: () => void;
  readAddValueMappingEntry: () => void;
  readRemoveValueMappingEntry: (index: number) => void;
  readUpdateValueMappingEntryGenericValue: (index: number, genericValue: string) => void;
  readUpdateValueMappingEntryDeviceValue: (index: number, deviceValue: string) => void;
}

export interface WriteReadServiceCallSlice extends WriteServiceCallSlice, ReadServiceCallSlice {
  /**
   * Returns a RestApiServiceCallSlice for the write service call (required).
   * This can be used with createSliceAdapter to pass to RestApiServiceCallForm.
   */
  getWriteServiceCallSlice: () => RestApiServiceCallSlice;
  /**
   * Returns a RestApiServiceCallSlice for the read service call (optional).
   * This can be used with createSliceAdapter to pass to RestApiServiceCallForm.
   */
  getReadServiceCallSlice: () => RestApiServiceCallSlice;
}

/**
 * Type guard to check if configuration is a write-read service call type
 */
export function isWriteReadServiceCallConfig(
  config: RestApiDataPointConfiguration | undefined
): config is RestApiDataPointConfiguration & {
  restApiWriteServiceCall: RestApiServiceCall;
  restApiReadServiceCall?: RestApiServiceCall;
} {
  return config !== undefined && "restApiWriteServiceCall" in config && !("restApiServiceCall" in config);
}

/**
 * Creates a write-read service call slice for REST API data point configuration.
 * Write service call is required, read service call is optional.
 *
 * @param set - The Zustand set function
 * @param getConfig - Function to get the RestApiDataPointConfiguration
 */
export function createWriteReadServiceCallSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getConfig: (state: TState) => RestApiDataPointConfiguration | undefined
): WriteReadServiceCallSlice {
  // Write service call helpers
  const getWriteServiceCall = (state: TState): RestApiServiceCall | undefined => {
    const config = getConfig(state);
    if (!config) return undefined;
    // Directly access restApiWriteServiceCall if it exists
    return "restApiWriteServiceCall" in config ? config.restApiWriteServiceCall : undefined;
  };

  const setWriteServiceCall = (state: TState, restApiServiceCall: RestApiServiceCall | undefined) => {
    const config = getConfig(state);
    if (config && restApiServiceCall) {
      // Directly set restApiWriteServiceCall
      (
        config as RestApiDataPointConfiguration & { restApiWriteServiceCall?: RestApiServiceCall }
      ).restApiWriteServiceCall = restApiServiceCall;
    }
  };

  // Read service call helpers
  const getReadServiceCall = (state: TState): RestApiServiceCall | undefined => {
    const config = getConfig(state);
    if (!config) return undefined;
    // Directly access restApiReadServiceCall if it exists
    return "restApiReadServiceCall" in config ? config.restApiReadServiceCall : undefined;
  };

  const setReadServiceCall = (state: TState, restApiServiceCall: RestApiServiceCall | undefined) => {
    const config = getConfig(state);
    if (config) {
      // Directly set restApiReadServiceCall
      (
        config as RestApiDataPointConfiguration & { restApiReadServiceCall?: RestApiServiceCall }
      ).restApiReadServiceCall = restApiServiceCall;
    }
  };

  // Create shared slices
  const writeSlice = createRestApiServiceCallSlice(set, getWriteServiceCall, setWriteServiceCall);
  const readSlice = createRestApiServiceCallSlice(set, getReadServiceCall, setReadServiceCall);

  // Prefix write slice actions
  const prefixedWriteSlice: WriteServiceCallSlice = {
    writeAddRequestHeader: writeSlice.addRequestHeader,
    writeRemoveRequestHeader: writeSlice.removeRequestHeader,
    writeAddRequestHeaderEntry: writeSlice.addRequestHeaderEntry,
    writeRemoveRequestHeaderEntry: writeSlice.removeRequestHeaderEntry,
    writeUpdateRequestHeaderEntryName: writeSlice.updateRequestHeaderEntryName,
    writeUpdateRequestHeaderEntryValue: writeSlice.updateRequestHeaderEntryValue,
    writeUpdateRequestMethod: writeSlice.updateRequestMethod,
    writeUpdateRequestPath: writeSlice.updateRequestPath,
    writeUpdateRequestBody: writeSlice.updateRequestBody,
    writeAddRequestQuery: writeSlice.addRequestQuery,
    writeRemoveRequestQuery: writeSlice.removeRequestQuery,
    writeAddRequestQueryParameter: writeSlice.addRequestQueryParameter,
    writeRemoveRequestQueryParameter: writeSlice.removeRequestQueryParameter,
    writeUpdateRequestQueryParameterName: writeSlice.updateRequestQueryParameterName,
    writeUpdateRequestQueryParameterValue: writeSlice.updateRequestQueryParameterValue,
    writeAddRequestForm: writeSlice.addRequestForm,
    writeRemoveRequestForm: writeSlice.removeRequestForm,
    writeAddRequestFormParameter: writeSlice.addRequestFormParameter,
    writeRemoveRequestFormParameter: writeSlice.removeRequestFormParameter,
    writeUpdateRequestFormParameterName: writeSlice.updateRequestFormParameterName,
    writeUpdateRequestFormParameterValue: writeSlice.updateRequestFormParameterValue,
    writeAddResponseQuery: writeSlice.addResponseQuery,
    writeRemoveResponseQuery: writeSlice.removeResponseQuery,
    writeUpdateResponseQueryType: writeSlice.updateResponseQueryType,
    writeUpdateResponseQueryQuery: writeSlice.updateResponseQueryQuery,
    writeAddResponseQueryJmesPathMapping: writeSlice.addResponseQueryJmesPathMapping,
    writeRemoveResponseQueryJmesPathMapping: writeSlice.removeResponseQueryJmesPathMapping,
    writeAddResponseQueryJmesPathMappingRecord: writeSlice.addResponseQueryJmesPathMappingRecord,
    writeRemoveResponseQueryJmesPathMappingRecord: writeSlice.removeResponseQueryJmesPathMappingRecord,
    writeUpdateResponseQueryJmesPathMappingRecordFrom: writeSlice.updateResponseQueryJmesPathMappingRecordFrom,
    writeUpdateResponseQueryJmesPathMappingRecordTo: writeSlice.updateResponseQueryJmesPathMappingRecordTo,
    writeUpdateResponseQueryJmesPathMappingRecordName: writeSlice.updateResponseQueryJmesPathMappingRecordName,
    writeAddValueMapping: writeSlice.addValueMapping,
    writeRemoveValueMapping: writeSlice.removeValueMapping,
    writeAddValueMappingEntry: writeSlice.addValueMappingEntry,
    writeRemoveValueMappingEntry: writeSlice.removeValueMappingEntry,
    writeUpdateValueMappingEntryGenericValue: writeSlice.updateValueMappingEntryGenericValue,
    writeUpdateValueMappingEntryDeviceValue: writeSlice.updateValueMappingEntryDeviceValue,
  };

  // Prefix read slice actions with add/remove functionality
  const prefixedReadSlice: ReadServiceCallSlice = {
    addReadServiceCall: () =>
      set((state) => {
        const config = getConfig(state);
        if (config && !("restApiReadServiceCall" in config && config.restApiReadServiceCall)) {
          (
            config as RestApiDataPointConfiguration & { restApiReadServiceCall?: RestApiServiceCall }
          ).restApiReadServiceCall = { requestMethod: "GET" };
        }
      }),
    removeReadServiceCall: () =>
      set((state) => {
        const config = getConfig(state);
        if (config && "restApiReadServiceCall" in config) {
          (
            config as RestApiDataPointConfiguration & { restApiReadServiceCall?: RestApiServiceCall }
          ).restApiReadServiceCall = undefined;
        }
      }),
    readAddRequestHeader: readSlice.addRequestHeader,
    readRemoveRequestHeader: readSlice.removeRequestHeader,
    readAddRequestHeaderEntry: readSlice.addRequestHeaderEntry,
    readRemoveRequestHeaderEntry: readSlice.removeRequestHeaderEntry,
    readUpdateRequestHeaderEntryName: readSlice.updateRequestHeaderEntryName,
    readUpdateRequestHeaderEntryValue: readSlice.updateRequestHeaderEntryValue,
    readUpdateRequestMethod: readSlice.updateRequestMethod,
    readUpdateRequestPath: readSlice.updateRequestPath,
    readUpdateRequestBody: readSlice.updateRequestBody,
    readAddRequestQuery: readSlice.addRequestQuery,
    readRemoveRequestQuery: readSlice.removeRequestQuery,
    readAddRequestQueryParameter: readSlice.addRequestQueryParameter,
    readRemoveRequestQueryParameter: readSlice.removeRequestQueryParameter,
    readUpdateRequestQueryParameterName: readSlice.updateRequestQueryParameterName,
    readUpdateRequestQueryParameterValue: readSlice.updateRequestQueryParameterValue,
    readAddRequestForm: readSlice.addRequestForm,
    readRemoveRequestForm: readSlice.removeRequestForm,
    readAddRequestFormParameter: readSlice.addRequestFormParameter,
    readRemoveRequestFormParameter: readSlice.removeRequestFormParameter,
    readUpdateRequestFormParameterName: readSlice.updateRequestFormParameterName,
    readUpdateRequestFormParameterValue: readSlice.updateRequestFormParameterValue,
    readAddResponseQuery: readSlice.addResponseQuery,
    readRemoveResponseQuery: readSlice.removeResponseQuery,
    readUpdateResponseQueryType: readSlice.updateResponseQueryType,
    readUpdateResponseQueryQuery: readSlice.updateResponseQueryQuery,
    readAddResponseQueryJmesPathMapping: readSlice.addResponseQueryJmesPathMapping,
    readRemoveResponseQueryJmesPathMapping: readSlice.removeResponseQueryJmesPathMapping,
    readAddResponseQueryJmesPathMappingRecord: readSlice.addResponseQueryJmesPathMappingRecord,
    readRemoveResponseQueryJmesPathMappingRecord: readSlice.removeResponseQueryJmesPathMappingRecord,
    readUpdateResponseQueryJmesPathMappingRecordFrom: readSlice.updateResponseQueryJmesPathMappingRecordFrom,
    readUpdateResponseQueryJmesPathMappingRecordTo: readSlice.updateResponseQueryJmesPathMappingRecordTo,
    readUpdateResponseQueryJmesPathMappingRecordName: readSlice.updateResponseQueryJmesPathMappingRecordName,
    readAddValueMapping: readSlice.addValueMapping,
    readRemoveValueMapping: readSlice.removeValueMapping,
    readAddValueMappingEntry: readSlice.addValueMappingEntry,
    readRemoveValueMappingEntry: readSlice.removeValueMappingEntry,
    readUpdateValueMappingEntryGenericValue: readSlice.updateValueMappingEntryGenericValue,
    readUpdateValueMappingEntryDeviceValue: readSlice.updateValueMappingEntryDeviceValue,
  };

  return {
    ...prefixedWriteSlice,
    ...prefixedReadSlice,
    getWriteServiceCallSlice: () => writeSlice,
    getReadServiceCallSlice: () => readSlice,
  };
}
