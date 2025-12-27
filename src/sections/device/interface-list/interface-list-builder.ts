import { InterfaceList } from "@/models/product/product";
import { buildModbusInterface } from "./modbus-interface/modbus-interface-builder";
import { wrapInArray } from "@/utils/builder-utils";
import { validateInterfaceList } from "./interface-list-schema";

/**
 * Builds XML object for interfaceList from InterfaceList model
 * @throws Error if required fields are missing
 */
export function buildInterfaceList(
  interfaceList: InterfaceList | undefined
): Record<string, unknown> | undefined {
  if (!interfaceList) {
    return undefined;
  }

  // Validate using validation layer
  const validation = validateInterfaceList(interfaceList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for interface list";
    throw new Error(errorMessage);
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
