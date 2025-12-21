import { DeviceFrame } from "@/models";
import { validateDeviceIdentification } from "@/sections/device/device-identification/device-identification-schema";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";

/**
 * Builds XML object for device identification from DeviceFrame model
 * @throws Error if required fields are missing
 */
export function buildDeviceIdentification(
  device: Pick<DeviceFrame, "deviceName" | "manufacturerName" | "specificationOwnerIdentification">
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateDeviceIdentification(device);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for device identification";
    throw new Error(errorMessage);
  }

  const identificationXml: Record<string, unknown> = {
    deviceName: wrapInArray(device.deviceName),
    specificationOwnerIdentification: wrapInArray(device.specificationOwnerIdentification),
  };

  // Add optional manufacturerName
  setOptionalXmlField(identificationXml, "manufacturerName", device.manufacturerName);

  return identificationXml;
}
