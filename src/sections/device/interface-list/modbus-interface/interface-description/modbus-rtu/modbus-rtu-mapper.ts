import { ModbusRtu } from "@/models/product/modbus-types";
import { UnsignedIntParameter, SerialInterfaceCapability } from "@/models/generic";
import { getStringValue, getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapSerialInterfaceCapability } from "./serial-interface-capability/serial-interface-capability-mapper";

/**
 * Maps XML modbusRtu to ModbusRtu model
 */
export function mapModbusRtu(modbusRtuXml: Xml2JsObject | undefined): ModbusRtu {
  if (!modbusRtuXml) {
    throw new Error("modbusRtu is required");
  }

  const serialInterfaceCapabilityXml = getFirstElement(modbusRtuXml, "serialInterfaceCapability");
  if (!serialInterfaceCapabilityXml) {
    throw new Error("serialInterfaceCapability is required in modbusRtu");
  }

  return {
    slaveAddr: getStringValue(modbusRtuXml, "slaveAddr") as UnsignedIntParameter,
    portName: getStringValue(modbusRtuXml, "portName"),
    baudRateSelected: getStringValue(modbusRtuXml, "baudRateSelected"),
    byteLenSelected: getStringValue(modbusRtuXml, "byteLenSelected"),
    paritySelected: getStringValue(modbusRtuXml, "paritySelected"),
    stopBitLenSelected: getStringValue(modbusRtuXml, "stopBitLenSelected"),
    serialInterfaceCapability: mapSerialInterfaceCapability(serialInterfaceCapabilityXml),
  };
}
