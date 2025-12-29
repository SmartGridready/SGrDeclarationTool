import { RestApiInterface } from "@/models/product/rest-api-interface";
import { getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapRestApiInterfaceDescription } from "./interface-description/interface-description-mapper";
import { mapRestApiFunctionalProfileList } from "./functional-profile-list/rest-api-functional-profile-list-mapper";

/**
 * Maps XML restApiInterface to RestApiInterface model
 */
export function mapRestApiInterface(
  restApiInterfaceXml: Xml2JsObject | undefined
): RestApiInterface {
  if (!restApiInterfaceXml) {
    throw new Error("restApiInterface is required");
  }

  const restApiInterfaceDescriptionXml = getFirstElement(
    restApiInterfaceXml,
    "restApiInterfaceDescription"
  );
  if (!restApiInterfaceDescriptionXml) {
    throw new Error("restApiInterfaceDescription is required in restApiInterface");
  }

  const restApiInterface: RestApiInterface = {
    restApiInterfaceDescription: mapRestApiInterfaceDescription(restApiInterfaceDescriptionXml),
    functionalProfileList: mapRestApiFunctionalProfileList(
      getFirstElement(restApiInterfaceXml, "functionalProfileList")
    ),
  };

  return restApiInterface;
}
