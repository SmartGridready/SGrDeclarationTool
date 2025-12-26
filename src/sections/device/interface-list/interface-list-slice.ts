import { DeviceFrame, InterfaceType } from "@/models";
import { createEmptyModbusInterface } from "@/utils/factory-utils";
import {
  createModbusInterfaceSlice,
  ModbusInterfaceSlice,
} from "./modbus-interface/modbus-interface-slice";

export interface InterfaceListSlice extends ModbusInterfaceSlice {
  /**
   * Set the interface type, creating an empty interface if needed
   */
  setInterfaceType: (interfaceType: InterfaceType) => void;
}

/**
 * Creates an interface-list slice for Device stores.
 */
export function createInterfaceListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): InterfaceListSlice {
  // Create modbus interface slice
  const modbusInterfaceSlice = createModbusInterfaceSlice(set);

  return {
    // Spread modbus interface actions
    ...modbusInterfaceSlice,

    setInterfaceType: (interfaceType) =>
      set((state) => {
        if (!state.device) return;

        // Create new interface based on type
        switch (interfaceType) {
          case "modbusInterface":
            state.device.interfaceList = {
              modbusInterface: createEmptyModbusInterface(),
            };
            break;
          // TODO: Add other interface types when implemented
          // case "restApiInterface":
          //   state.device.interfaceList = { restApiInterface: createEmptyRestApiInterface() };
          //   break;
          // case "contactInterface":
          //   state.device.interfaceList = { contactInterface: createEmptyContactInterface() };
          //   break;
          // case "genericInterface":
          //   state.device.interfaceList = { genericInterface: createEmptyGenericInterface() };
          //   break;
          // case "messagingInterface":
          //   state.device.interfaceList = { messagingInterface: createEmptyMessagingInterface() };
          //   break;
        }
      }),
  };
}
