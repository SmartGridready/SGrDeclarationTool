import { DeviceFrame, InterfaceList } from "@/models";
import { ContactInterface } from "@/models/product/contact-interface";

/**
 * Type guard to check if interface list is Contact interface
 */
function isContactInterface(
  interfaceList: InterfaceList | undefined
): interfaceList is { contactInterface: ContactInterface } {
  return interfaceList !== undefined && "contactInterface" in interfaceList;
}

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
    return isContactInterface(interfaceList) ? interfaceList.contactInterface.contactInterfaceDescription : undefined;
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
