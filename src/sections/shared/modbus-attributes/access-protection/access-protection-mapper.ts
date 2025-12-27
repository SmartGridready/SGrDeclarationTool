import { AccessProtectionEnabled, ModbusExceptionCode } from "@/models/product/modbus-types";
import { getStringValue, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML accessProtection to AccessProtectionEnabled model
 */
export function mapAccessProtection(
  accessProtectionXml: Xml2JsObject | undefined
): AccessProtectionEnabled {
  if (!accessProtectionXml) {
    throw new Error("accessProtection is required");
  }

  // Handle array of string values (xml2js converts repeated elements to arrays)
  const modbusExceptionCodeArray = accessProtectionXml.modbusExceptionCode;
  const modbusExceptionCode: ModbusExceptionCode[] = [];
  if (Array.isArray(modbusExceptionCodeArray)) {
    for (const item of modbusExceptionCodeArray) {
      if (typeof item === "string") {
        modbusExceptionCode.push(item as ModbusExceptionCode);
      }
    }
  }

  return {
    modbusExceptionCode,
    isEnabled: getStringValue(accessProtectionXml, "isEnabled") === "true",
  };
}
