import { AccessProtectionEnabled } from "@/models/product/modbus-types";
import { wrapInArray, setOptionalXmlArray } from "@/utils/builder-utils";
import { validateAccessProtectionEnabled } from "./access-protection-schema";

/**
 * Builds XML object for accessProtection from AccessProtectionEnabled model
 * @throws Error if required fields are missing
 */
export function buildAccessProtection(accessProtection: AccessProtectionEnabled): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateAccessProtectionEnabled(accessProtection);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for access protection";
    throw new Error(errorMessage);
  }
  const protectionXml: Record<string, unknown> = {};

  // Add array of modbusExceptionCode first (to match XML structure order)
  setOptionalXmlArray(protectionXml, "modbusExceptionCode", accessProtection.modbusExceptionCode);

  // Add isEnabled after modbusExceptionCode (to match XML structure order)
  protectionXml.isEnabled = wrapInArray(accessProtection.isEnabled.toString());

  return protectionXml;
}
