"use client";

import { GenericAttributeListProductForm } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-form";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { DeviceStoreState } from "@/sections/device/device-store";

/**
 * Device specific generic attribute list form.
 * Uses the DeviceFormContext to connect to the store.
 */
export function GenericAttributeListForm() {
  const { useDeviceState, useValidation, genericAttributeListActions, pathPrefix } =
    useDeviceFormContext();

  // Create a store hook adapter
  const useStore = <TSelected,>(selector: (store: DeviceStoreState) => TSelected): TSelected => {
    const device = useDeviceState((d) => d);
    const adaptedStore = {
      device,
      ...genericAttributeListActions,
    } as DeviceStoreState;
    return selector(adaptedStore);
  };

  const fullPathPrefix = pathPrefix
    ? buildDeviceFieldPath(pathPrefix, "genericAttributeList")
    : "genericAttributeList";

  return (
    <GenericAttributeListProductForm
      useStore={useStore}
      useValidation={useValidation}
      stateSelector={(store) => ({
        genericAttributeList: store.device?.genericAttributeList,
      })}
      isAddedSelector={(store) => !!store.device?.genericAttributeList}
      fieldPathPrefix={fullPathPrefix}
      title="Generic Attribute List"
      description="Generic attributes for the device"
      nested={true}
    />
  );
}
