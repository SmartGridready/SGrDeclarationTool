import { RestApiServiceCall } from "@/models/product/rest-api-types";
import { createRequestHeaderSlice, RequestHeaderSlice } from "./request-header/request-header-slice";
import { createRequestBasicSlice, RequestBasicSlice } from "./request-basic/request-basic-slice";
import { createRequestQuerySlice, RequestQuerySlice } from "./request-query/request-query-slice";
import { createRequestFormSlice, RequestFormSlice } from "./request-form/request-form-slice";
import { createResponseQuerySlice, ResponseQuerySlice } from "./response-query/response-query-slice";
import { createValueMappingSlice, ValueMappingSlice } from "./value-mapping/value-mapping-slice";

export interface RestApiServiceCallSlice
  extends RequestHeaderSlice,
    RequestBasicSlice,
    RequestQuerySlice,
    RequestFormSlice,
    ResponseQuerySlice,
    ValueMappingSlice {}

/**
 * Creates a REST API service call slice that works with any store state
 * @param set - The Zustand set function
 * @param getRestApiServiceCall - Function to get restApiServiceCall from the store state
 * @param setRestApiServiceCall - Function to set restApiServiceCall in the store state
 */
export function createRestApiServiceCallSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getRestApiServiceCall: (state: TState) => RestApiServiceCall | undefined,
  setRestApiServiceCall: (state: TState, restApiServiceCall: RestApiServiceCall | undefined) => void
): RestApiServiceCallSlice {
  const requestHeaderSlice = createRequestHeaderSlice(set, getRestApiServiceCall);
  const requestBasicSlice = createRequestBasicSlice(set, getRestApiServiceCall, setRestApiServiceCall);
  const requestQuerySlice = createRequestQuerySlice(set, getRestApiServiceCall);
  const requestFormSlice = createRequestFormSlice(set, getRestApiServiceCall);
  const responseQuerySlice = createResponseQuerySlice(set, getRestApiServiceCall);
  const valueMappingSlice = createValueMappingSlice(set, getRestApiServiceCall);

  return {
    ...requestHeaderSlice,
    ...requestBasicSlice,
    ...requestQuerySlice,
    ...requestFormSlice,
    ...responseQuerySlice,
    ...valueMappingSlice,
  };
}
