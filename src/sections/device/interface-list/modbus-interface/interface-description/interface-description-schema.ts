import { z } from "zod";
import {
  ModbusInterfaceDescription,
  MODBUS_INTERFACE_SELECTION_VALUES,
  BIT_ORDER_VALUES,
} from "@/models/product/modbus-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { modbusTcpSchema } from "./modbus-tcp/modbus-tcp-schema";
import { modbusRtuSchema } from "./modbus-rtu/modbus-rtu-schema";
import { masterFunctionsSupportedListSchema } from "./master-functions-supported-list/master-functions-supported-list-schema";

/**
 * Modbus Interface Description validation schemas and validators
 */

// Extract enum values from constants
const MODBUS_INTERFACE_SELECTION_VALUES_ARRAY = MODBUS_INTERFACE_SELECTION_VALUES as unknown as [string, ...string[]];
const BIT_ORDER_VALUES_ARRAY = BIT_ORDER_VALUES as unknown as [string, ...string[]];

export const modbusInterfaceDescriptionSchema = z.object({
  modbusInterfaceSelection: z.enum(MODBUS_INTERFACE_SELECTION_VALUES_ARRAY, {
    message: "Modbus interface selection is required",
  }),
  modbusTcp: modbusTcpSchema.optional(),
  modbusRtu: modbusRtuSchema.optional(),
  firstRegisterAddressIsOne: z.boolean({ message: "First register address is one is required" }),
  bitOrder: z.enum(BIT_ORDER_VALUES_ARRAY, {
    message: "Bit order is required",
  }),
  masterFunctionsSupportedList: masterFunctionsSupportedListSchema.optional(),
});

// Type exports for TypeScript inference
export type ModbusInterfaceDescriptionInput = z.input<typeof modbusInterfaceDescriptionSchema>;

// Validators
export function validateModbusInterfaceDescription(
  description: ModbusInterfaceDescription
): ValidationResult<ModbusInterfaceDescription> {
  const result = validateWithSchema(modbusInterfaceDescriptionSchema, description);
  return result as ValidationResult<ModbusInterfaceDescription>;
}
