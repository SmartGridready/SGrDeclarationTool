import { z } from "zod";
import { DeviceFrame } from "@/models";
import { releaseNotesSchema } from "@/sections/shared/release-notes/release-notes-schema";
import { deviceIdentificationSchema } from "@/sections/device/device-identification/device-identification-schema";
import { deviceInformationSchema } from "@/sections/device/device-information/device-information-schema";
import { configurationListSchema } from "@/sections/device/configuration-list/configuration-list-schema";
import { genericAttributeListProductSchema } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-schema";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Main validation schemas and validators for Device models
 * These schemas are used to validate data before export and provide
 * field-level error messages for form validation.
 */

// Device Frame Schema
export const deviceFrameSchema = z.object({
  deviceName: z
    .string({ message: "Device name is required" })
    .min(1, "Device name cannot be empty"),
  manufacturerName: z.string().optional(),
  specificationOwnerIdentification: z
    .string({ message: "Specification owner identification is required" })
    .min(1, "Specification owner identification cannot be empty"),
  releaseNotes: releaseNotesSchema,
  deviceInformation: deviceInformationSchema,
  configurationList: configurationListSchema.optional(),
  genericAttributeList: genericAttributeListProductSchema.optional(),
});

// Re-export schemas for convenience
export {
  releaseNotesSchema,
  deviceIdentificationSchema,
  deviceInformationSchema,
  configurationListSchema,
  genericAttributeListProductSchema,
};

// Re-export types for TypeScript inference
export type { ReleaseNotesInput } from "@/sections/shared/release-notes/release-notes-schema";
export type { DeviceIdentificationInput } from "@/sections/device/device-identification/device-identification-schema";
export type { DeviceInformationInput } from "@/sections/device/device-information/device-information-schema";
export type { ConfigurationListInput } from "@/sections/device/configuration-list/configuration-list-schema";
export type { GenericAttributeListProductInput } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-schema";
export type DeviceFrameInput = z.input<typeof deviceFrameSchema>;

// Validators
export function validateDeviceFrame(frame: DeviceFrame): ValidationResult<DeviceFrame> {
  const result = validateWithSchema(deviceFrameSchema, frame);
  return result as ValidationResult<DeviceFrame>;
}
