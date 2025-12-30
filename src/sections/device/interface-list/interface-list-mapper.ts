import { InterfaceList } from "@/models/product/product";
import { getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapModbusInterface } from "./modbus-interface/modbus-interface-mapper";
import { mapRestApiInterface } from "./rest-api-interface/rest-api-interface-mapper";
import { mapMessagingInterface } from "./messaging-interface/messaging-interface-mapper";
import { mapContactInterface } from "./contact-interface/contact-interface-mapper";

/**
 * Maps XML interfaceList to InterfaceList model
 */
export function mapInterfaceList(
  interfaceListXml: Xml2JsObject | undefined
): InterfaceList | undefined {
  if (!interfaceListXml) {
    return undefined;
  }

  // Check for modbusInterface
  const modbusInterfaceXml = getFirstElement(interfaceListXml, "modbusInterface");
  if (modbusInterfaceXml) {
    return {
      modbusInterface: mapModbusInterface(modbusInterfaceXml),
    };
  }

  // Check for restApiInterface
  const restApiInterfaceXml = getFirstElement(interfaceListXml, "restApiInterface");
  if (restApiInterfaceXml) {
    return {
      restApiInterface: mapRestApiInterface(restApiInterfaceXml),
    };
  }

  // Check for messagingInterface
  const messagingInterfaceXml = getFirstElement(interfaceListXml, "messagingInterface");
  if (messagingInterfaceXml) {
    return {
      messagingInterface: mapMessagingInterface(messagingInterfaceXml),
    };
  }

  // Check for contactInterface
  const contactInterfaceXml = getFirstElement(interfaceListXml, "contactInterface");
  if (contactInterfaceXml) {
    return {
      contactInterface: mapContactInterface(contactInterfaceXml),
    };
  }

  return undefined;
}
