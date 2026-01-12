"use client";

import { GenericAttributeListProductForm } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useShallow } from "zustand/react/shallow";

/**
 * Device specific generic attribute list form.
 * Uses the device store directly.
 */
export function GenericAttributeListForm() {
  const device = useDeviceStore(useShallow((state) => state.device));
  const store = useDeviceStore.getState();
  const useStore = createDeviceStoreAdapter(device, store);
  const useValidation = useDeviceValidation;

  return (
    <GenericAttributeListProductForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        genericAttributeList: store.device?.genericAttributeList,
      })}
      isAddedSelector={(store) => !!store.device?.genericAttributeList}
      fieldPathPrefix="genericAttributeList"
      title="Generic Attribute List"
      description="Generic attributes for the device"
      nested={true}
    />
  );
}
