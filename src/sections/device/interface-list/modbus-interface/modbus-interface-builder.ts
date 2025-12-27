import { ModbusInterface } from "@/models/product/modbus-interface";
import { buildModbusInterfaceDescription } from "./interface-description/interface-description-builder";
import { buildModbusAttributes } from "@/sections/shared/modbus-attributes/modbus-attributes-builder";
import { buildModbusFunctionalProfileList } from "./functional-profile-list/modbus-functional-profile-list-builder";
import { buildTimeSyncBlockNotification } from "./time-sync-block-notification/time-sync-block-notification-builder";
import { wrapInArray, setOptionalXmlArray } from "@/utils/builder-utils";

/**
 * Builds XML object for modbusInterface from ModbusInterface model
 */
export function buildModbusInterface(modbusInterface: ModbusInterface): Record<string, unknown> {
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
      modbusInterface.timeSyncBlockNotification.map((notification) =>
        buildTimeSyncBlockNotification(notification)
      )
    );
  }

  return modbusInterfaceXml;
}
