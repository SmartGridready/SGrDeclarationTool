import { ModbusInterface } from "@/models/product/modbus-interface";
import {
  getFirstElement,
  mapOptionalArray,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";
import { mapModbusInterfaceDescription } from "./interface-description/interface-description-mapper";
import { mapModbusAttributes } from "@/sections/shared/modbus-attributes/modbus-attributes-mapper";
import { mapModbusFunctionalProfileList } from "./functional-profile-list/modbus-functional-profile-list-mapper";
import { mapTimeSyncBlockNotification } from "./time-sync-block-notification/time-sync-block-notification-mapper";

/**
 * Maps XML modbusInterface to ModbusInterface model
 */
export function mapModbusInterface(modbusInterfaceXml: Xml2JsObject | undefined): ModbusInterface {
  if (!modbusInterfaceXml) {
    throw new Error("modbusInterface is required");
  }

  const modbusInterfaceDescriptionXml = getFirstElement(
    modbusInterfaceXml,
    "modbusInterfaceDescription"
  );
  if (!modbusInterfaceDescriptionXml) {
    throw new Error("modbusInterfaceDescription is required in modbusInterface");
  }

  const modbusInterface: ModbusInterface = {
    modbusInterfaceDescription: mapModbusInterfaceDescription(modbusInterfaceDescriptionXml),
    functionalProfileList: mapModbusFunctionalProfileList(
      getFirstElement(modbusInterfaceXml, "functionalProfileList")
    ),
  };

  // Map optional modbusAttributes
  const modbusAttributesXml = getFirstElement(modbusInterfaceXml, "modbusAttributes");
  setOptionalField(
    modbusInterface,
    "modbusAttributes",
    modbusAttributesXml && mapModbusAttributes(modbusAttributesXml)
  );

  // Map optional timeSyncBlockNotification array
  setOptionalField(
    modbusInterface,
    "timeSyncBlockNotification",
    mapOptionalArray(modbusInterfaceXml, "timeSyncBlockNotification", mapTimeSyncBlockNotification)
  );

  return modbusInterface;
}
