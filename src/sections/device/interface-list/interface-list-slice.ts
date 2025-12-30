import { DeviceFrame, InterfaceType } from "@/models";
import {
  createEmptyModbusInterface,
  createEmptyRestApiInterface,
  createEmptyMessagingInterface,
  createEmptyContactInterface,
} from "@/utils/factory-utils";
import {
  createModbusInterfaceSlice,
  ModbusInterfaceSlice,
} from "./modbus-interface/modbus-interface-slice";
import {
  createRestApiInterfaceSlice,
  RestApiInterfaceSlice,
} from "./rest-api-interface/rest-api-interface-slice";
import {
  createMessagingInterfaceSlice,
  MessagingInterfaceSlice,
} from "./messaging-interface/messaging-interface-slice";
import {
  createContactInterfaceSlice,
  ContactInterfaceSlice,
} from "./contact-interface/contact-interface-slice";

export interface InterfaceListSlice
  extends ModbusInterfaceSlice,
    RestApiInterfaceSlice,
    MessagingInterfaceSlice,
    ContactInterfaceSlice {
  setInterfaceType: (interfaceType: InterfaceType) => void;
}

/**
 * Creates an interface-list slice for Device stores.
 */
export function createInterfaceListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): InterfaceListSlice {
  const modbusInterfaceSlice = createModbusInterfaceSlice(set);
  const restApiInterfaceSlice = createRestApiInterfaceSlice(set);
  const messagingInterfaceSlice = createMessagingInterfaceSlice(set);
  const contactInterfaceSlice = createContactInterfaceSlice(set);

  return {
    ...modbusInterfaceSlice,
    ...restApiInterfaceSlice,
    ...messagingInterfaceSlice,
    ...contactInterfaceSlice,

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
          case "restApiInterface":
            state.device.interfaceList = { restApiInterface: createEmptyRestApiInterface() };
            break;
          case "contactInterface":
            state.device.interfaceList = { contactInterface: createEmptyContactInterface() };
            break;
          // TODO: Add other interface types when implemented
          // case "genericInterface":
          //   state.device.interfaceList = { genericInterface: createEmptyGenericInterface() };
          //   break;
          case "messagingInterface":
            state.device.interfaceList = { messagingInterface: createEmptyMessagingInterface() };
            break;
        }
      }),
  };
}
