import { RestApiInterfaceDescription } from "@/models/product/rest-api-types";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";
import { validateRestApiInterfaceDescription } from "./interface-description-schema";
import { buildRestApiBasic } from "./rest-api-basic/rest-api-basic-builder";
import { buildRestApiBearer } from "./rest-api-bearer/rest-api-bearer-builder";

/**
 * Builds XML object for restApiInterfaceDescription from RestApiInterfaceDescription model
 * @throws Error if required fields are missing
 */
export function buildRestApiInterfaceDescription(
  description: RestApiInterfaceDescription
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateRestApiInterfaceDescription(description);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || "Validation failed for REST API interface description";
    throw new Error(errorMessage);
  }

  const descriptionXml: Record<string, unknown> = {
    restApiInterfaceSelection: wrapInArray(description.restApiInterfaceSelection),
    restApiUri: wrapInArray(description.restApiUri),
  };

  // Include optional restApiAuthenticationMethod
  setOptionalXmlField(
    descriptionXml,
    "restApiAuthenticationMethod",
    description.restApiAuthenticationMethod
  );

  // Include optional restApiBearer
  if (description.restApiBearer) {
    const restApiBearerXml = buildRestApiBearer(description.restApiBearer);
    if (restApiBearerXml) {
      descriptionXml.restApiBearer = wrapInArray(restApiBearerXml);
    }
  }

  // Include optional restApiBasic
  if (description.restApiBasic) {
    const restApiBasicXml = buildRestApiBasic(description.restApiBasic);
    if (restApiBasicXml) {
      descriptionXml.restApiBasic = wrapInArray(restApiBasicXml);
    }
  }

  // Include optional restApiVerifyCertificate
  setOptionalXmlField(
    descriptionXml,
    "restApiVerifyCertificate",
    description.restApiVerifyCertificate
  );

  return descriptionXml;
}
