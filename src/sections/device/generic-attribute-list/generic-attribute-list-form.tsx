"use client";

import { GenericAttributeListProductForm } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-form";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";

/**
 * Device specific generic attribute list form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function GenericAttributeListForm() {
  const { useDeviceState, useValidation, genericAttributeListActions, pathPrefix } = useDeviceFormContext();

  const device = useDeviceState((d) => d);
  const useStore = createDeviceStoreAdapter(device, genericAttributeListActions);

  const fieldPathPrefix = buildDeviceFieldPath(pathPrefix, "genericAttributeList");

  return (
    <GenericAttributeListProductForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        genericAttributeList: store.device?.genericAttributeList,
      })}
      isAddedSelector={(store) => !!store.device?.genericAttributeList}
      fieldPathPrefix={fieldPathPrefix}
      title="Generic Attribute List"
      description="Generic attributes for the device"
      nested={true}
    />
  );
}
