import { RestApiBasic } from "@/models/product/rest-api-types";
import { wrapInArray } from "@/utils/builder-utils";
import { validateRestApiBasic } from "./rest-api-basic-schema";

/**
 * Builds XML object for restApiBasic from RestApiBasic model
 * @throws Error if required fields are missing
 */
export function buildRestApiBasic(restApiBasic: RestApiBasic | undefined): Record<string, unknown> | undefined {
  if (!restApiBasic) {
    return undefined;
  }

  // Validate using validation layer
  const validation = validateRestApiBasic(restApiBasic);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for REST API basic";
    throw new Error(errorMessage);
  }

  return {
    restBasicUsername: wrapInArray(restApiBasic.restBasicUsername),
    restBasicPassword: wrapInArray(restApiBasic.restBasicPassword),
  };
}
