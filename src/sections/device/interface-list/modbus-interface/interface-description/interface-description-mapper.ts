import {
  ModbusInterfaceDescription,
  ModbusInterfaceSelection,
  BitOrder,
} from "@/models/product/modbus-types";
import {
  getStringValue,
  getTypedValue,
  getFirstElement,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";
import { mapModbusTcp } from "./modbus-tcp/modbus-tcp-mapper";
import { mapModbusRtu } from "./modbus-rtu/modbus-rtu-mapper";
import { mapMasterFunctionsSupportedList } from "./master-functions-supported-list/master-functions-supported-list-mapper";

/**
 * Maps XML modbusInterfaceDescription to ModbusInterfaceDescription model
 */
export function mapModbusInterfaceDescription(
  descriptionXml: Xml2JsObject | undefined
): ModbusInterfaceDescription {
  if (!descriptionXml) {
    throw new Error("modbusInterfaceDescription is required");
  }

  const description: ModbusInterfaceDescription = {
    modbusInterfaceSelection: getTypedValue<ModbusInterfaceSelection>(
      descriptionXml,
      "modbusInterfaceSelection",
      "RTU"
    ),
    firstRegisterAddressIsOne:
      getStringValue(descriptionXml, "firstRegisterAddressIsOne") === "true",
    bitOrder: getTypedValue<BitOrder>(descriptionXml, "bitOrder", "BigEndian"),
  };

  // Map optional modbusTcp
  const modbusTcpXml = getFirstElement(descriptionXml, "modbusTcp");
  setOptionalField(description, "modbusTcp", modbusTcpXml && mapModbusTcp(modbusTcpXml));

  // Map optional modbusRtu
  const modbusRtuXml = getFirstElement(descriptionXml, "modbusRtu");
  setOptionalField(description, "modbusRtu", modbusRtuXml && mapModbusRtu(modbusRtuXml));

  // Map optional masterFunctionsSupportedList
  const masterFunctionsSupportedListXml = getFirstElement(
    descriptionXml,
    "masterFunctionsSupportedList"
  );
  setOptionalField(
    description,
    "masterFunctionsSupportedList",
    masterFunctionsSupportedListXml &&
      mapMasterFunctionsSupportedList(masterFunctionsSupportedListXml)
  );

  return description;
}
