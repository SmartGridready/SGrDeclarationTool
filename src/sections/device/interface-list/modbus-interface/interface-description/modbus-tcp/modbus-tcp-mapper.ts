import { ModbusTcp, ModbusIpAddress } from "@/models/product/modbus-types";
import { UnsignedIntParameter } from "@/models/generic";
import { getStringValue, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML modbusTcp to ModbusTcp model
 */
export function mapModbusTcp(modbusTcpXml: Xml2JsObject | undefined): ModbusTcp {
  if (!modbusTcpXml) {
    throw new Error("modbusTcp is required");
  }

  return {
    port: getStringValue(modbusTcpXml, "port") as UnsignedIntParameter,
    address: getStringValue(modbusTcpXml, "address") as ModbusIpAddress,
    slaveId: getStringValue(modbusTcpXml, "slaveId") as UnsignedIntParameter,
    timeout: getStringValue(modbusTcpXml, "timeout") as UnsignedIntParameter | undefined,
  };
}
