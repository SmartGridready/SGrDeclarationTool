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
import {
  createTimeSyncBlockNotificationSlice,
  TimeSyncBlockNotificationSlice,
} from "./time-sync-block-notification/time-sync-block-notification-slice";

export interface ModbusInterfaceSlice
  extends ModbusInterfaceDescriptionSlice,
    ModbusAttributesSlice,
    ModbusFunctionalProfileListSlice,
    TimeSyncBlockNotificationSlice {}

/**
 * Creates a modbus interface slice for Device stores.
 */
export function createModbusInterfaceSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusInterfaceSlice {
  const interfaceDescriptionSlice = createModbusInterfaceDescriptionSlice(set);
  const modbusAttributesSlice = createModbusAttributesSlice(set);
  const functionalProfileListSlice = createModbusFunctionalProfileListSlice(set);
  const timeSyncBlockNotificationSlice = createTimeSyncBlockNotificationSlice(set);

  return {
    ...interfaceDescriptionSlice,
    ...modbusAttributesSlice,
    ...functionalProfileListSlice,
    ...timeSyncBlockNotificationSlice,
  };
}
