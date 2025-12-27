import { z } from "zod";
import { ModbusInterface } from "@/models/product/modbus-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { modbusInterfaceDescriptionSchema } from "./interface-description/interface-description-schema";
import { modbusAttributesSchema } from "@/sections/shared/modbus-attributes/modbus-attributes-schema";
import { modbusFunctionalProfileListSchema } from "./functional-profile-list/modbus-functional-profile-list-schema";
import { timeSyncBlockNotificationSchema } from "./time-sync-block-notification/time-sync-block-notification-schema";

/**
 * Modbus Interface validation schemas and validators
 */

export const modbusInterfaceSchema = z.object({
  modbusInterfaceDescription: modbusInterfaceDescriptionSchema,
  modbusAttributes: modbusAttributesSchema.optional(),
  functionalProfileList: modbusFunctionalProfileListSchema,
  timeSyncBlockNotification: z.array(timeSyncBlockNotificationSchema).optional(),
});

// Type exports for TypeScript inference
export type ModbusInterfaceInput = z.input<typeof modbusInterfaceSchema>;

// Validators
export function validateModbusInterface(
  modbusInterface: ModbusInterface
): ValidationResult<ModbusInterface> {
  const result = validateWithSchema(modbusInterfaceSchema, modbusInterface);
  return result as ValidationResult<ModbusInterface>;
}
