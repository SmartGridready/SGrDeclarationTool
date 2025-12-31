import { ModbusInterface } from "@/models/product/modbus-interface";
import { buildModbusInterfaceDescription } from "./interface-description/interface-description-builder";
import { buildModbusAttributes } from "@/sections/shared/modbus-attributes/modbus-attributes-builder";
import { buildModbusFunctionalProfileList } from "./functional-profile-list/modbus-functional-profile-list-builder";
import { buildTimeSyncBlockNotification } from "./time-sync-block-notification/time-sync-block-notification-builder";
import { wrapInArray, setOptionalXmlArray } from "@/utils/builder-utils";
import { validateModbusInterface } from "./modbus-interface-schema";

/**
 * Builds XML object for modbusInterface from ModbusInterface model
 * @throws Error if required fields are missing
 */
export function buildModbusInterface(modbusInterface: ModbusInterface): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateModbusInterface(modbusInterface);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for modbus interface";
    throw new Error(errorMessage);
  }
  const modbusInterfaceXml: Record<string, unknown> = {
    modbusInterfaceDescription: wrapInArray(
      buildModbusInterfaceDescription(modbusInterface.modbusInterfaceDescription)
    ),
  };

  // Include optional modbusAttributes (must come before functionalProfileList)
  if (modbusInterface.modbusAttributes) {
    const modbusAttributesXml = buildModbusAttributes(modbusInterface.modbusAttributes);
    if (modbusAttributesXml) {
      modbusInterfaceXml.modbusAttributes = wrapInArray(modbusAttributesXml);
    }
  }

  // Add required functionalProfileList
  modbusInterfaceXml.functionalProfileList = wrapInArray(
    buildModbusFunctionalProfileList(modbusInterface.functionalProfileList)
  );

  // Include optional timeSyncBlockNotification array
  if (modbusInterface.timeSyncBlockNotification) {
    setOptionalXmlArray(
      modbusInterfaceXml,
      "timeSyncBlockNotification",
      modbusInterface.timeSyncBlockNotification.map((notification) => buildTimeSyncBlockNotification(notification))
    );
  }

  return modbusInterfaceXml;
}
