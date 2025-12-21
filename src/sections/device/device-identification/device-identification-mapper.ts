import { DeviceFrame } from "@/models";
import { getStringValue, getOptionalStringValue, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML device identification fields to DeviceFrame identification fields
 */
export function mapDeviceIdentification(
  frameData: Xml2JsObject | undefined
): Pick<DeviceFrame, "deviceName" | "manufacturerName" | "specificationOwnerIdentification"> {
  if (!frameData) {
    throw new Error("Device frame data is required");
  }

  return {
    deviceName: getStringValue(frameData, "deviceName"),
    manufacturerName: getOptionalStringValue(frameData, "manufacturerName"),
    specificationOwnerIdentification: getStringValue(frameData, "specificationOwnerIdentification"),
  };
}
