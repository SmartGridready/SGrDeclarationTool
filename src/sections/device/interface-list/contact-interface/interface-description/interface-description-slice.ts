import { DeviceFrame } from "@/models";

export interface ContactInterfaceDescriptionSlice {
  updateNumberOfContacts: (value: number) => void;
  updateContactStabilisationTimeMs: (value: number) => void;
}

/**
 * Creates a Contact interface description slice for Device stores.
 */
export function createContactInterfaceDescriptionSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ContactInterfaceDescriptionSlice {
  // Helper to get interface description
  const getInterfaceDescription = (state: TState) => {
    const interfaceList = state.device?.interfaceList;
    if (!interfaceList) return undefined;
    // Direct field access with 'in' operator instead of type guard
    return "contactInterface" in interfaceList
      ? interfaceList.contactInterface?.contactInterfaceDescription
      : undefined;
  };

  return {
    updateNumberOfContacts: (value) =>
      set((state) => {
        const description = getInterfaceDescription(state);
        if (description) {
          description.numberOfContacts = value;
        }
      }),

    updateContactStabilisationTimeMs: (value) =>
      set((state) => {
        const description = getInterfaceDescription(state);
        if (description) {
          description.contactStabilisationTimeMs = value;
        }
      }),
  };
}
