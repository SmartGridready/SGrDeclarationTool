/**
 * REST API auxiliary types (Product)
 * Generated from RestApiTypes.xsd
 */

import { ResponseQuery, BooleanParameter, ValueMapping, AnyUri } from "@/models/generic";

export interface RestApiValueMapping {
  mapping: ValueMapping[]; // maxOccurs="unbounded"
}

export const REST_API_INTERFACE_SELECTION_VALUES = ["TCPV4", "TCPV6", "URI"] as const;
export type RestApiInterfaceSelection = (typeof REST_API_INTERFACE_SELECTION_VALUES)[number];

export const REST_API_DATA_TYPE_VALUES = [
  "null",
  "JSON_number",
  "JSON_string",
  "JSON_boolean",
  "JSON_object",
  "JSON_array",
] as const;
export type RestApiDataType = (typeof REST_API_DATA_TYPE_VALUES)[number];

export interface HeaderEntry {
  headerName: string;
  value: string;
}

export interface HeaderList {
  header?: HeaderEntry[]; // maxOccurs="unbounded"
}

export const HTTP_METHOD_VALUES = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
export type HttpMethod = (typeof HTTP_METHOD_VALUES)[number];

export interface ParameterEntry {
  name: string;
  value: string;
}

export interface ParameterList {
  parameter: ParameterEntry[]; // maxOccurs="unbounded"
}

export interface RestApiServiceCall {
  requestHeader?: HeaderList;
  requestMethod: HttpMethod;
  requestPath?: string;
  requestQuery?: ParameterList;
  requestForm?: ParameterList;
  requestBody?: string;
  responseQuery?: ResponseQuery;
  valueMapping?: RestApiValueMapping;
}

export const REST_API_AUTHENTICATION_METHOD_VALUES = [
  "NoSecurityScheme",
  "BearerSecurityScheme",
  "ApiKeySecurityScheme",
  "BasicSecurityScheme",
  "DigestSecurityScheme",
  "PskSecurityScheme",
  "OAuth2SecurityScheme",
  "HawkSecurityScheme",
  "AwsSignatureSecurityScheme",
] as const;
export type RestApiAuthenticationMethod = (typeof REST_API_AUTHENTICATION_METHOD_VALUES)[number];

export interface RestApiBearer {
  restApiServiceCall: RestApiServiceCall;
}

export interface RestApiBasic {
  restBasicUsername: string;
  restBasicPassword: string;
}

export interface RestApiInterfaceDescription {
  restApiInterfaceSelection: RestApiInterfaceSelection;
  restApiUri: AnyUri; // XML Schema anyURI type
  restApiAuthenticationMethod?: RestApiAuthenticationMethod;
  restApiBearer?: RestApiBearer;
  restApiBasic?: RestApiBasic;
  restApiVerifyCertificate?: BooleanParameter; // booleanParameter
}

// Base configuration with dataType
interface RestApiDataPointConfigurationBase {
  dataType: RestApiDataType;
}

// Union type for the three possible configurations
export type RestApiDataPointConfiguration =
  | (RestApiDataPointConfigurationBase & {
      restApiServiceCall: RestApiServiceCall;
    })
  | (RestApiDataPointConfigurationBase & {
      restApiWriteServiceCall: RestApiServiceCall;
      restApiReadServiceCall?: RestApiServiceCall;
    })
  | (RestApiDataPointConfigurationBase & {
      restApiReadServiceCall: RestApiServiceCall;
      restApiWriteServiceCall?: RestApiServiceCall;
    });
