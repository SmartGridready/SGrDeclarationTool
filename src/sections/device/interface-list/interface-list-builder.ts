import { InterfaceList } from "@/models/product/product";
import { buildModbusInterface } from "./modbus-interface/modbus-interface-builder";
import { wrapInArray } from "@/utils/builder-utils";

/**
 * Builds XML object for interfaceList from InterfaceList model
 */
export function buildInterfaceList(
  interfaceList: InterfaceList | undefined
): Record<string, unknown> | undefined {
  if (!interfaceList) {
    return undefined;
  }

  const interfaceListXml: Record<string, unknown> = {};

  // Check for modbusInterface
  if (interfaceList.modbusInterface) {
    interfaceListXml.modbusInterface = wrapInArray(
      buildModbusInterface(interfaceList.modbusInterface)
    );
  }

  // TODO: Add other interface types when implemented
  // if (interfaceList.restApiInterface) {
  //   interfaceListXml.restApiInterface = wrapInArray(buildRestApiInterface(interfaceList.restApiInterface));
  // }

  return interfaceListXml;
}
