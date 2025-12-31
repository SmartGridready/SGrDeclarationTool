import { ContactInterfaceDescription } from "@/models/product/contact-interface";
import { getNumberValue, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML contactInterfaceDescription to ContactInterfaceDescription model
 */
export function mapContactInterfaceDescription(descriptionXml: Xml2JsObject | undefined): ContactInterfaceDescription {
  if (!descriptionXml) {
    throw new Error("contactInterfaceDescription is required");
  }

  const description: ContactInterfaceDescription = {
    numberOfContacts: getNumberValue(descriptionXml, "numberOfContacts"),
    contactStabilisationTimeMs: getNumberValue(descriptionXml, "contactStabilisationTimeMs"),
  };

  return description;
}
