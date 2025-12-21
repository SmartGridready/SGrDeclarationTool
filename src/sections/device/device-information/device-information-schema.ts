import { z } from "zod";
import { DeviceInformation } from "@/models";
import {
  DEVICE_CATEGORY_OPTIONS,
  POWER_SOURCE_OPTIONS,
  TEST_STATE_OPTIONS,
  LEVEL_OF_OPERATION_OPTIONS,
} from "@/sections/device/device-information/device-information-form-options";
import { alternativeNamesSchema } from "@/sections/shared/alternative-names/alternative-names-schema";
import { legibleDescriptionsSchema } from "@/sections/shared/legible-description/legible-description-schema";
import { versionNumberSchema } from "@/sections/shared/profile-identification/profile-identification-schema";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Device Information validation schemas and validators
 */

// Extract enum values from constants
const DEVICE_CATEGORY_VALUES = DEVICE_CATEGORY_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];
const POWER_SOURCE_VALUES = POWER_SOURCE_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];
const TEST_STATE_VALUES = TEST_STATE_OPTIONS.map((option) => option.value) as [string, ...string[]];
const LEVEL_OF_OPERATION_VALUES = LEVEL_OF_OPERATION_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];

// Device Information Schema
export const deviceInformationSchema = z.object({
  alternativeNames: alternativeNamesSchema.optional(),
  legibleDescription: legibleDescriptionsSchema.optional(),
  deviceCategory: z.enum(DEVICE_CATEGORY_VALUES, {
    message: "Device category is required",
  }),
  isLocalControl: z.boolean({ message: "Is local control is required" }),
  softwareRevision: z.string().optional(),
  hardwareRevision: z.string().optional(),
  brandName: z.string().optional(),
  powerSource: z.enum(POWER_SOURCE_VALUES).optional(),
  nominalPower: z.string().optional(),
  manufacturerSpecificationIdentification: z.string().optional(),
  manufacturerLabel: z.string().optional(),
  generalRemarks: z.string().optional(),
  levelOfOperation: z.enum(LEVEL_OF_OPERATION_VALUES).optional(),
  versionNumber: versionNumberSchema.optional(),
  testState: z.enum(TEST_STATE_VALUES).optional(),
  programmerHints: legibleDescriptionsSchema.optional(),
});

// Type exports for TypeScript inference
export type DeviceInformationInput = z.input<typeof deviceInformationSchema>;

// Validators
export function validateDeviceInformation(
  deviceInformation: DeviceInformation
): ValidationResult<DeviceInformation> {
  const result = validateWithSchema(deviceInformationSchema, deviceInformation);
  return result as ValidationResult<DeviceInformation>;
}
