import { DeviceFrame, ModbusInterface } from "@/models";
import {
  createModbusInterfaceDescriptionSlice,
  ModbusInterfaceDescriptionSlice,
} from "./interface-description/interface-description-slice";
import {
  createModbusAttributesSlice,
  ModbusAttributesSlice,
} from "./modbus-attributes/modbus-attributes-slice";
import {
  createModbusFunctionalProfileListSlice,
  ModbusFunctionalProfileListSlice,
} from "./functional-profile-list/modbus-functional-profile-list-slice";

export interface ModbusInterfaceSlice
  extends ModbusInterfaceDescriptionSlice,
    ModbusAttributesSlice {
  // Functional profile list actions
  functionalProfileListActions: ModbusFunctionalProfileListSlice;
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
  // Create functional profile list slice
  const functionalProfileListSlice = createModbusFunctionalProfileListSlice(set);

  return {
    // Spread interface description actions
    ...interfaceDescriptionSlice,
    // Spread modbus attributes actions
    ...modbusAttributesSlice,
    // Functional profile list actions (not spread, kept as object for clarity)
    functionalProfileListActions: functionalProfileListSlice,
  };
}
