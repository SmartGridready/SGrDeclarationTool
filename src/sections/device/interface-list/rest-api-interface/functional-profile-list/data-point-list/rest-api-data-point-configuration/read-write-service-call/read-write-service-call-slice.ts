import { RestApiDataPointConfiguration, RestApiServiceCall } from "@/models/product/rest-api-types";
import { ResponseQueryType } from "@/models/generic";
import {
  createRestApiServiceCallSlice,
  RestApiServiceCallSlice,
} from "@/sections/shared/rest-api-service-call/rest-api-service-call-slice";

/**
 * Slice interface for read service call operations (required in this config).
 * Prefixed with "read" to distinguish from write operations.
 */
export interface ReadServiceCallRequiredSlice {
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
  readUpdateResponseQueryJmesPathMappingRecordName: (
    index: number,
    name: string | undefined
  ) => void;
  readAddValueMapping: () => void;
  readRemoveValueMapping: () => void;
  readAddValueMappingEntry: () => void;
  readRemoveValueMappingEntry: (index: number) => void;
  readUpdateValueMappingEntryGenericValue: (index: number, genericValue: string) => void;
  readUpdateValueMappingEntryDeviceValue: (index: number, deviceValue: string) => void;
}

/**
 * Slice interface for optional write service call operations.
 * Includes add/remove for the optional write service call.
 */
export interface WriteServiceCallOptionalSlice {
  addWriteServiceCall: () => void;
  removeWriteServiceCall: () => void;
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
  writeUpdateResponseQueryJmesPathMappingRecordName: (
    index: number,
    name: string | undefined
  ) => void;
  writeAddValueMapping: () => void;
  writeRemoveValueMapping: () => void;
  writeAddValueMappingEntry: () => void;
  writeRemoveValueMappingEntry: (index: number) => void;
  writeUpdateValueMappingEntryGenericValue: (index: number, genericValue: string) => void;
  writeUpdateValueMappingEntryDeviceValue: (index: number, deviceValue: string) => void;
}

export interface ReadWriteServiceCallSlice
  extends ReadServiceCallRequiredSlice,
    WriteServiceCallOptionalSlice {}

/**
 * Type guard to check if configuration is a read-write service call type
 */
export function isReadWriteServiceCallConfig(
  config: RestApiDataPointConfiguration | undefined
): config is RestApiDataPointConfiguration & {
  restApiReadServiceCall: RestApiServiceCall;
  restApiWriteServiceCall?: RestApiServiceCall;
} {
  return (
    config !== undefined &&
    "restApiReadServiceCall" in config &&
    !("restApiServiceCall" in config) &&
    // Distinguish from write-read by checking if write is NOT the primary required field
    // In read-write, read is required (always present), write is optional
    // We check if restApiWriteServiceCall is optional (can be undefined)
    true
  );
}

/**
 * Creates a read-write service call slice for REST API data point configuration.
 * Read service call is required, write service call is optional.
 *
 * @param set - The Zustand set function
 * @param getConfig - Function to get the RestApiDataPointConfiguration
 */
export function createReadWriteServiceCallSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getConfig: (state: TState) => RestApiDataPointConfiguration | undefined
): ReadWriteServiceCallSlice {
  // Read service call helpers (required)
  const getReadServiceCall = (state: TState): RestApiServiceCall | undefined => {
    const config = getConfig(state);
    return isReadWriteServiceCallConfig(config) ? config.restApiReadServiceCall : undefined;
  };

  const setReadServiceCall = (
    state: TState,
    restApiServiceCall: RestApiServiceCall | undefined
  ) => {
    const config = getConfig(state);
    if (isReadWriteServiceCallConfig(config) && restApiServiceCall) {
      config.restApiReadServiceCall = restApiServiceCall;
    }
  };

  // Write service call helpers (optional)
  const getWriteServiceCall = (state: TState): RestApiServiceCall | undefined => {
    const config = getConfig(state);
    return isReadWriteServiceCallConfig(config) ? config.restApiWriteServiceCall : undefined;
  };

  const setWriteServiceCall = (
    state: TState,
    restApiServiceCall: RestApiServiceCall | undefined
  ) => {
    const config = getConfig(state);
    if (isReadWriteServiceCallConfig(config)) {
      config.restApiWriteServiceCall = restApiServiceCall;
    }
  };

  // Create shared slices
  const readSlice = createRestApiServiceCallSlice(set, getReadServiceCall, setReadServiceCall);
  const writeSlice = createRestApiServiceCallSlice(set, getWriteServiceCall, setWriteServiceCall);

  // Prefix read slice actions (required)
  const prefixedReadSlice: ReadServiceCallRequiredSlice = {
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
    readRemoveResponseQueryJmesPathMappingRecord:
      readSlice.removeResponseQueryJmesPathMappingRecord,
    readUpdateResponseQueryJmesPathMappingRecordFrom:
      readSlice.updateResponseQueryJmesPathMappingRecordFrom,
    readUpdateResponseQueryJmesPathMappingRecordTo:
      readSlice.updateResponseQueryJmesPathMappingRecordTo,
    readUpdateResponseQueryJmesPathMappingRecordName:
      readSlice.updateResponseQueryJmesPathMappingRecordName,
    readAddValueMapping: readSlice.addValueMapping,
    readRemoveValueMapping: readSlice.removeValueMapping,
    readAddValueMappingEntry: readSlice.addValueMappingEntry,
    readRemoveValueMappingEntry: readSlice.removeValueMappingEntry,
    readUpdateValueMappingEntryGenericValue: readSlice.updateValueMappingEntryGenericValue,
    readUpdateValueMappingEntryDeviceValue: readSlice.updateValueMappingEntryDeviceValue,
  };

  // Prefix write slice actions with add/remove functionality (optional)
  const prefixedWriteSlice: WriteServiceCallOptionalSlice = {
    addWriteServiceCall: () =>
      set((state) => {
        const config = getConfig(state);
        if (isReadWriteServiceCallConfig(config) && !config.restApiWriteServiceCall) {
          config.restApiWriteServiceCall = { requestMethod: "POST" };
        }
      }),
    removeWriteServiceCall: () =>
      set((state) => {
        const config = getConfig(state);
        if (isReadWriteServiceCallConfig(config)) {
          config.restApiWriteServiceCall = undefined;
        }
      }),
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
    writeRemoveResponseQueryJmesPathMappingRecord:
      writeSlice.removeResponseQueryJmesPathMappingRecord,
    writeUpdateResponseQueryJmesPathMappingRecordFrom:
      writeSlice.updateResponseQueryJmesPathMappingRecordFrom,
    writeUpdateResponseQueryJmesPathMappingRecordTo:
      writeSlice.updateResponseQueryJmesPathMappingRecordTo,
    writeUpdateResponseQueryJmesPathMappingRecordName:
      writeSlice.updateResponseQueryJmesPathMappingRecordName,
    writeAddValueMapping: writeSlice.addValueMapping,
    writeRemoveValueMapping: writeSlice.removeValueMapping,
    writeAddValueMappingEntry: writeSlice.addValueMappingEntry,
    writeRemoveValueMappingEntry: writeSlice.removeValueMappingEntry,
    writeUpdateValueMappingEntryGenericValue: writeSlice.updateValueMappingEntryGenericValue,
    writeUpdateValueMappingEntryDeviceValue: writeSlice.updateValueMappingEntryDeviceValue,
  };

  return {
    ...prefixedReadSlice,
    ...prefixedWriteSlice,
  };
}
