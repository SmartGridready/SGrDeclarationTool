import { AccessProtectionEnabled } from "@/models/product/modbus-types";
import { wrapInArray, setOptionalXmlArray } from "@/utils/builder-utils";

/**
 * Builds XML object for accessProtection from AccessProtectionEnabled model
 */
export function buildAccessProtection(
  accessProtection: AccessProtectionEnabled
): Record<string, unknown> {
  const protectionXml: Record<string, unknown> = {
    isEnabled: wrapInArray(accessProtection.isEnabled.toString()),
  };

  // Add array of modbusExceptionCode
  setOptionalXmlArray(protectionXml, "modbusExceptionCode", accessProtection.modbusExceptionCode);

  return protectionXml;
}
