import { ContactInterface } from "@/models/product/contact-interface";
import { getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapContactInterfaceDescription } from "./interface-description/interface-description-mapper";
import { mapContactFunctionalProfileList } from "./functional-profile-list/contact-functional-profile-list-mapper";

/**
 * Maps XML contactInterface to ContactInterface model
 */
export function mapContactInterface(contactInterfaceXml: Xml2JsObject | undefined): ContactInterface {
  if (!contactInterfaceXml) {
    throw new Error("contactInterface is required");
  }

  const contactInterfaceDescriptionXml = getFirstElement(contactInterfaceXml, "contactInterfaceDescription");
  if (!contactInterfaceDescriptionXml) {
    throw new Error("contactInterfaceDescription is required in contactInterface");
  }

  const contactInterface: ContactInterface = {
    contactInterfaceDescription: mapContactInterfaceDescription(contactInterfaceDescriptionXml),
    functionalProfileList: mapContactFunctionalProfileList(
      getFirstElement(contactInterfaceXml, "functionalProfileList")
    ),
  };

  return contactInterface;
}
