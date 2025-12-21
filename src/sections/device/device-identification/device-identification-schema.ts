import { z } from "zod";
import { DeviceFrame } from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Device Identification validation schemas and validators
 */

// Device Identification Schema
export const deviceIdentificationSchema = z.object({
  deviceName: z
    .string({ message: "Device name is required" })
    .min(1, "Device name cannot be empty"),
  manufacturerName: z.string().optional(),
  specificationOwnerIdentification: z
    .string({ message: "Specification owner identification is required" })
    .min(1, "Specification owner identification cannot be empty"),
});

// Type exports for TypeScript inference
export type DeviceIdentificationInput = z.input<typeof deviceIdentificationSchema>;

// Validators
export function validateDeviceIdentification(
  device: Pick<DeviceFrame, "deviceName" | "manufacturerName" | "specificationOwnerIdentification">
): ValidationResult<
  Pick<DeviceFrame, "deviceName" | "manufacturerName" | "specificationOwnerIdentification">
> {
  const result = validateWithSchema(deviceIdentificationSchema, device);
  return result as ValidationResult<
    Pick<DeviceFrame, "deviceName" | "manufacturerName" | "specificationOwnerIdentification">
  >;
}
