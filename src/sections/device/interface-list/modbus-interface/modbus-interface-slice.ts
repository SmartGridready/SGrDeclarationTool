import { DeviceFrame, ModbusInterface } from "@/models";
import {
  createModbusInterfaceDescriptionSlice,
  ModbusInterfaceDescriptionSlice,
} from "./interface-description/interface-description-slice";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModbusInterfaceSlice extends ModbusInterfaceDescriptionSlice {
  // Additional modbus interface actions will be added here as needed
}

/**
 * Creates a modbus interface slice for Device stores.
 */
export function createModbusInterfaceSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusInterfaceSlice {
  // Create interface description slice
  const interfaceDescriptionSlice = createModbusInterfaceDescriptionSlice(set);

  return {
    // Spread interface description actions
    ...interfaceDescriptionSlice,
    // Additional modbus interface actions will be added here as needed
  };
}
