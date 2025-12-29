import { InterfaceList } from "@/models/product/product";
import { getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapModbusInterface } from "./modbus-interface/modbus-interface-mapper";
import { mapRestApiInterface } from "./rest-api-interface/rest-api-interface-mapper";

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

  // TODO: Add other interface types when implemented
  return undefined;
}
