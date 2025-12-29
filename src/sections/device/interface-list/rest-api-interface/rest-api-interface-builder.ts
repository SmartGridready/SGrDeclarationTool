import { RestApiInterface } from "@/models/product/rest-api-interface";
import { buildRestApiInterfaceDescription } from "./interface-description/interface-description-builder";
import { buildRestApiFunctionalProfileList } from "./functional-profile-list/rest-api-functional-profile-list-builder";
import { wrapInArray } from "@/utils/builder-utils";
import { validateRestApiInterface } from "./rest-api-interface-schema";

/**
 * Builds XML object for restApiInterface from RestApiInterface model
 * @throws Error if required fields are missing
 */
export function buildRestApiInterface(restApiInterface: RestApiInterface): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateRestApiInterface(restApiInterface);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for REST API interface";
    throw new Error(errorMessage);
  }

  const restApiInterfaceXml: Record<string, unknown> = {
    restApiInterfaceDescription: wrapInArray(
      buildRestApiInterfaceDescription(restApiInterface.restApiInterfaceDescription)
    ),
  };

  // Add required functionalProfileList
  restApiInterfaceXml.functionalProfileList = wrapInArray(
    buildRestApiFunctionalProfileList(restApiInterface.functionalProfileList)
  );

  return restApiInterfaceXml;
}
