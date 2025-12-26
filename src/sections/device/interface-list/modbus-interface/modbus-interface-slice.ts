import { DeviceFrame, ModbusInterface } from "@/models";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModbusInterfaceSlice {
  // Actions will be added here as needed
  // For now, this is an empty slice to establish the structure
}

/**
 * Creates a modbus interface slice for Device stores.
 */
export function createModbusInterfaceSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusInterfaceSlice {
  const getModbusInterface = (state: TState): ModbusInterface | undefined => {
    return state.device?.interfaceList?.modbusInterface;
  };

  return {
    // Actions will be added here as needed
  };
}
