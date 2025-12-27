import { SerialInterfaceCapability } from "@/models/generic";
import { setOptionalXmlArray } from "@/utils/builder-utils";
import { validateSerialInterfaceCapability } from "./serial-interface-capability-schema";

/**
 * Builds XML object for serialInterfaceCapability from SerialInterfaceCapability model
 * @throws Error if required fields are missing
 */
export function buildSerialInterfaceCapability(
  capability: SerialInterfaceCapability
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateSerialInterfaceCapability(capability);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for serial interface capability";
    throw new Error(errorMessage);
  }
  const capabilityXml: Record<string, unknown> = {};

  // Add arrays of supported values (these are required but can be empty arrays)
  if (capability.baudRatesSupported && capability.baudRatesSupported.length > 0) {
    setOptionalXmlArray(capabilityXml, "baudRatesSupported", capability.baudRatesSupported);
  }
  if (capability.byteLenSupported && capability.byteLenSupported.length > 0) {
    setOptionalXmlArray(capabilityXml, "byteLenSupported", capability.byteLenSupported);
  }
  if (capability.paritySupported && capability.paritySupported.length > 0) {
    setOptionalXmlArray(capabilityXml, "paritySupported", capability.paritySupported);
  }
  if (capability.stopBitLenSupported && capability.stopBitLenSupported.length > 0) {
    setOptionalXmlArray(capabilityXml, "stopBitLenSupported", capability.stopBitLenSupported);
  }

  return capabilityXml;
}
