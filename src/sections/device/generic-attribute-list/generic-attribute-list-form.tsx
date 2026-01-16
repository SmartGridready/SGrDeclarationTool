"use client";

import { GenericAttributeListProductForm } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useHasDevice, useDeviceField } from "@/hooks/use-store-field";

/**
 * Device specific generic attribute list form.
 * Uses the device store directly.
 */
export function GenericAttributeListForm() {
  const hasDevice = useHasDevice();
  // Subscribe only to genericAttributeList section for targeted re-renders
  const genericAttributeList = useDeviceField((d) => d?.genericAttributeList);
  const store = useDeviceStore.getState();
  const useStore = createDeviceStoreAdapter(store.device, store);
  const useValidation = useDeviceValidation;

  // Use the subscription to trigger re-renders when section changes
  void genericAttributeList;

  if (!hasDevice) {
    return null;
  }

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
