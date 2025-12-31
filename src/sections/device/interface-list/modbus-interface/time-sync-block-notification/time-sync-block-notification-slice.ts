import { DeviceFrame } from "@/models";
import { TimeSyncBlockNotification } from "@/models/product/modbus-types";
import { createEmptyTimeSyncBlockNotification } from "@/utils/factory-utils";

export interface TimeSyncBlockNotificationSlice {
  // Time sync block notification list management
  addEmptyTimeSyncBlockNotification: () => void;
  removeTimeSyncBlockNotification: (index: number) => void;
  removeAllTimeSyncBlockNotifications: () => void;

  // Update individual fields for a specific notification
  updateBlockCacheIdentification: (index: number, blockCacheIdentification: string) => void;
  updateFirstAddress: (index: number, firstAddress: number) => void;
  updateSize: (index: number, size: number) => void;
  updateRegisterType: (index: number, registerType: TimeSyncBlockNotification["registerType"]) => void;
  updateTimeToLiveMs: (index: number, timeToLiveMs: number) => void;
}

/**
 * Creates a time sync block notification slice for Device stores.
 */
export function createTimeSyncBlockNotificationSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): TimeSyncBlockNotificationSlice {
  // Helper to get time sync block notification list
  const getTimeSyncBlockNotificationList = (state: TState): TimeSyncBlockNotification[] | undefined =>
    state.device?.interfaceList?.modbusInterface?.timeSyncBlockNotification;

  // Helper to get a specific time sync block notification
  const getTimeSyncBlockNotification = (state: TState, index: number): TimeSyncBlockNotification | undefined =>
    getTimeSyncBlockNotificationList(state)?.[index];

  return {
    addEmptyTimeSyncBlockNotification: () =>
      set((state) => {
        const modbusInterface = state.device?.interfaceList?.modbusInterface;
        if (modbusInterface) {
          // Ensure timeSyncBlockNotification array exists
          if (!modbusInterface.timeSyncBlockNotification) {
            modbusInterface.timeSyncBlockNotification = [];
          }
          modbusInterface.timeSyncBlockNotification.push(createEmptyTimeSyncBlockNotification());
        }
      }),

    removeTimeSyncBlockNotification: (index) =>
      set((state) => {
        const list = getTimeSyncBlockNotificationList(state);
        if (list && list.length > index) {
          list.splice(index, 1);
          // If array is now empty, delete it to allow the section to be removed
          if (list.length === 0) {
            const modbusInterface = state.device?.interfaceList?.modbusInterface;
            if (modbusInterface) {
              delete modbusInterface.timeSyncBlockNotification;
            }
          }
        }
      }),

    removeAllTimeSyncBlockNotifications: () =>
      set((state) => {
        const modbusInterface = state.device?.interfaceList?.modbusInterface;
        if (modbusInterface) {
          delete modbusInterface.timeSyncBlockNotification;
        }
      }),

    updateBlockCacheIdentification: (index, blockCacheIdentification) =>
      set((state) => {
        const notification = getTimeSyncBlockNotification(state, index);
        if (notification) {
          notification.blockCacheIdentification = blockCacheIdentification;
        }
      }),

    updateFirstAddress: (index, firstAddress) =>
      set((state) => {
        const notification = getTimeSyncBlockNotification(state, index);
        if (notification) {
          notification.firstAddress = firstAddress;
        }
      }),

    updateSize: (index, size) =>
      set((state) => {
        const notification = getTimeSyncBlockNotification(state, index);
        if (notification) {
          notification.size = size;
        }
      }),

    updateRegisterType: (index, registerType) =>
      set((state) => {
        const notification = getTimeSyncBlockNotification(state, index);
        if (notification) {
          notification.registerType = registerType;
        }
      }),

    updateTimeToLiveMs: (index, timeToLiveMs) =>
      set((state) => {
        const notification = getTimeSyncBlockNotification(state, index);
        if (notification) {
          notification.timeToLiveMs = timeToLiveMs;
        }
      }),
  };
}
