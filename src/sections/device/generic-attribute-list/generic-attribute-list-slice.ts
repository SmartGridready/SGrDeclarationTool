import { DeviceFrame } from "@/models";
import {
  createGenericAttributeListProductSlice,
  GenericAttributeListProductSlice,
} from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-slice";

/**
 * Creates a generic attribute list slice for Device stores.
 * This is a convenience wrapper around the shared createGenericAttributeListProductSlice.
 */
export function createGenericAttributeListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): GenericAttributeListProductSlice {
  return createGenericAttributeListProductSlice(
    set,
    (state) => state.device?.genericAttributeList,
    (state, genericAttributeList) => {
      if (state.device) {
        state.device.genericAttributeList = genericAttributeList;
      }
    }
  );
}
