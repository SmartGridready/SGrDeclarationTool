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
  // Note: minOccurs="1" means at least one element is required
  const modbusExceptionCodeArray = accessProtectionXml.modbusExceptionCode;
  const modbusExceptionCode: ModbusExceptionCode[] = [];
  if (Array.isArray(modbusExceptionCodeArray)) {
    for (const item of modbusExceptionCodeArray) {
      if (typeof item === "string") {
        modbusExceptionCode.push(item as ModbusExceptionCode);
      }
    }
  }

  // Validate minOccurs="1" constraint
  if (modbusExceptionCode.length === 0) {
    throw new Error("modbusExceptionCode must have at least one element (minOccurs='1')");
  }

  return {
    modbusExceptionCode,
    isEnabled: getStringValue(accessProtectionXml, "isEnabled") === "true",
  };
}
