import { InterfaceList } from "@/models/product/product";
import { buildModbusInterface } from "./modbus-interface/modbus-interface-builder";
import { buildRestApiInterface } from "./rest-api-interface/rest-api-interface-builder";
import { buildMessagingInterface } from "./messaging-interface/messaging-interface-builder";
import { buildContactInterface } from "./contact-interface/contact-interface-builder";
import { buildGenericInterface } from "./generic-interface/generic-interface-builder";
import { wrapInArray } from "@/utils/builder-utils";
import { validateInterfaceList } from "./interface-list-schema";

/**
 * Builds XML object for interfaceList from InterfaceList model
 * @throws Error if required fields are missing
 */
export function buildInterfaceList(interfaceList: InterfaceList | undefined): Record<string, unknown> | undefined {
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
  if ("modbusInterface" in interfaceList && interfaceList.modbusInterface) {
    interfaceListXml.modbusInterface = wrapInArray(buildModbusInterface(interfaceList.modbusInterface));
  }

  // Check for restApiInterface
  if ("restApiInterface" in interfaceList && interfaceList.restApiInterface) {
    interfaceListXml.restApiInterface = wrapInArray(buildRestApiInterface(interfaceList.restApiInterface));
  }

  // Check for messagingInterface
  if ("messagingInterface" in interfaceList && interfaceList.messagingInterface) {
    interfaceListXml.messagingInterface = wrapInArray(buildMessagingInterface(interfaceList.messagingInterface));
  }

  // Check for contactInterface
  if ("contactInterface" in interfaceList && interfaceList.contactInterface) {
    interfaceListXml.contactInterface = wrapInArray(buildContactInterface(interfaceList.contactInterface));
  }

  // Check for genericInterface
  if ("genericInterface" in interfaceList && interfaceList.genericInterface) {
    interfaceListXml.genericInterface = wrapInArray(buildGenericInterface(interfaceList.genericInterface));
  }

  return interfaceListXml;
}
