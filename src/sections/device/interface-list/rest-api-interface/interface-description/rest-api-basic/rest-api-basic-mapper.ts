import { RestApiBasic } from "@/models/product/rest-api-types";
import { getStringValue, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML restApiBasic to RestApiBasic model
 */
export function mapRestApiBasic(restApiBasicXml: Xml2JsObject | undefined): RestApiBasic {
  if (!restApiBasicXml) {
    throw new Error("restApiBasic is required");
  }

  return {
    restBasicUsername: getStringValue(restApiBasicXml, "restBasicUsername"),
    restBasicPassword: getStringValue(restApiBasicXml, "restBasicPassword"),
  };
}
