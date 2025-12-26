import { DeviceFrame } from "@/models";
import { ModbusTcp, ModbusIpAddress } from "@/models/product/modbus-types";
import { UnsignedIntParameter } from "@/models/generic";

export interface ModbusTcpSlice {
  addModbusTcp: () => void;
  removeModbusTcp: () => void;
  updatePort: (port: UnsignedIntParameter) => void;
  updateAddress: (address: ModbusIpAddress) => void;
  updateSlaveId: (slaveId: UnsignedIntParameter) => void;
}

/**
 * Creates a modbus TCP slice for Device stores.
 */
export function createModbusTcpSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ModbusTcpSlice {
  const getModbusTcp = (state: TState): ModbusTcp | undefined => {
    return state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription?.modbusTcp;
  };

  return {
    addModbusTcp: () =>
      set((state) => {
        const description =
          state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription;
        if (description && !description.modbusTcp) {
          description.modbusTcp = {
            port: "",
            address: "",
            slaveId: "",
          };
        }
      }),

    removeModbusTcp: () =>
      set((state) => {
        const description =
          state.device?.interfaceList?.modbusInterface?.modbusInterfaceDescription;
        if (description) {
          description.modbusTcp = undefined;
        }
      }),

    updatePort: (port) =>
      set((state) => {
        const modbusTcp = getModbusTcp(state);
        if (modbusTcp) {
          modbusTcp.port = port;
        }
      }),

    updateAddress: (address) =>
      set((state) => {
        const modbusTcp = getModbusTcp(state);
        if (modbusTcp) {
          modbusTcp.address = address;
        }
      }),

    updateSlaveId: (slaveId) =>
      set((state) => {
        const modbusTcp = getModbusTcp(state);
        if (modbusTcp) {
          modbusTcp.slaveId = slaveId;
        }
      }),
  };
}
