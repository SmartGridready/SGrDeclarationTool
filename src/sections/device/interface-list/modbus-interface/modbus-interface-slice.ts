import { DeviceFrame, ModbusInterface } from "@/models";
import {
  createModbusInterfaceDescriptionSlice,
  ModbusInterfaceDescriptionSlice,
} from "./interface-description/interface-description-slice";
import {
  createModbusAttributesSlice,
  ModbusAttributesSlice,
} from "./modbus-attributes/modbus-attributes-slice";

export interface ModbusInterfaceSlice
  extends ModbusInterfaceDescriptionSlice,
    ModbusAttributesSlice {
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
  // Create modbus attributes slice
  const modbusAttributesSlice = createModbusAttributesSlice(set);

  return {
    // Spread interface description actions
    ...interfaceDescriptionSlice,
    // Spread modbus attributes actions
    ...modbusAttributesSlice,
    // Additional modbus interface actions will be added here as needed
  };
}
