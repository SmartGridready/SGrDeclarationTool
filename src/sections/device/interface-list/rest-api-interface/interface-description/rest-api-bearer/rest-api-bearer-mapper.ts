import { RestApiBearer } from "@/models/product/rest-api-types";
import { getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapRestApiServiceCall } from "@/sections/shared/rest-api-service-call/rest-api-service-call-mapper";

/**
 * Maps XML restApiBearer to RestApiBearer model
 */
export function mapRestApiBearer(
  restApiBearerXml: Xml2JsObject | undefined
): RestApiBearer | undefined {
  if (!restApiBearerXml) {
    return undefined;
  }

  const restApiServiceCallXml = getFirstElement(restApiBearerXml, "restApiServiceCall");
  const restApiServiceCall = mapRestApiServiceCall(restApiServiceCallXml);

  if (!restApiServiceCall) {
    throw new Error("restApiServiceCall is required in restApiBearer");
  }

  return {
    restApiServiceCall,
  };
}
