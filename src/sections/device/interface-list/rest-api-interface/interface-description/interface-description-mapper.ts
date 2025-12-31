import {
  RestApiInterfaceDescription,
  RestApiInterfaceSelection,
  RestApiAuthenticationMethod,
} from "@/models/product/rest-api-types";
import { BooleanParameter } from "@/models/generic";
import {
  getTypedValue,
  getStringValue,
  getOptionalTypedValue,
  getOptionalStringValue,
  getFirstElement,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";
import { mapRestApiBasic } from "./rest-api-basic/rest-api-basic-mapper";
import { mapRestApiBearer } from "./rest-api-bearer/rest-api-bearer-mapper";

/**
 * Maps XML restApiInterfaceDescription to RestApiInterfaceDescription model
 */
export function mapRestApiInterfaceDescription(descriptionXml: Xml2JsObject | undefined): RestApiInterfaceDescription {
  if (!descriptionXml) {
    throw new Error("restApiInterfaceDescription is required");
  }

  const description: RestApiInterfaceDescription = {
    restApiInterfaceSelection: getTypedValue<RestApiInterfaceSelection>(
      descriptionXml,
      "restApiInterfaceSelection",
      "URI"
    ),
    restApiUri: getStringValue(descriptionXml, "restApiUri"),
  };

  // Map optional restApiAuthenticationMethod
  setOptionalField(
    description,
    "restApiAuthenticationMethod",
    getOptionalTypedValue<RestApiAuthenticationMethod>(descriptionXml, "restApiAuthenticationMethod")
  );

  // Map optional restApiBearer
  const restApiBearerXml = getFirstElement(descriptionXml, "restApiBearer");
  setOptionalField(description, "restApiBearer", mapRestApiBearer(restApiBearerXml));

  // Map optional restApiBasic
  const restApiBasicXml = getFirstElement(descriptionXml, "restApiBasic");
  if (restApiBasicXml) {
    setOptionalField(description, "restApiBasic", mapRestApiBasic(restApiBasicXml));
  }

  // Map optional restApiVerifyCertificate
  setOptionalField(
    description,
    "restApiVerifyCertificate",
    getOptionalStringValue(descriptionXml, "restApiVerifyCertificate") as BooleanParameter | undefined
  );

  return description;
}
