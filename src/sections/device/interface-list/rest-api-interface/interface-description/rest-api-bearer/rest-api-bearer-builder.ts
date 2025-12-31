import { RestApiBearer } from "@/models/product/rest-api-types";
import { wrapInArray } from "@/utils/builder-utils";
import { buildRestApiServiceCall } from "@/sections/shared/rest-api-service-call/rest-api-service-call-builder";
import { validateRestApiBearer } from "./rest-api-bearer-schema";

/**
 * Builds XML object for restApiBearer from RestApiBearer model
 * @throws Error if required fields are missing
 */
export function buildRestApiBearer(restApiBearer: RestApiBearer | undefined): Record<string, unknown> | undefined {
  if (!restApiBearer) {
    return undefined;
  }

  // Validate using validation layer
  const validation = validateRestApiBearer(restApiBearer);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for REST API bearer";
    throw new Error(errorMessage);
  }

  const restApiServiceCallXml = buildRestApiServiceCall(restApiBearer.restApiServiceCall);
  if (!restApiServiceCallXml) {
    throw new Error("restApiServiceCall is required in restApiBearer");
  }

  return {
    restApiServiceCall: wrapInArray(restApiServiceCallXml),
  };
}
