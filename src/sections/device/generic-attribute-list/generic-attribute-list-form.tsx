"use client";

import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { GenericAttributeListProductForm } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-form";

export function GenericAttributeListForm() {
  const { useDeviceState, useValidation, genericAttributeListActions, pathPrefix } =
    useDeviceFormContext();

  const genericAttributeList = useDeviceState((d) => d?.genericAttributeList);
  const { getError: getRawError } = useValidation();

  const fullPathPrefix = pathPrefix
    ? buildDeviceFieldPath(pathPrefix, "genericAttributeList")
    : "genericAttributeList";

  const getError = (fieldPath: string) => getRawError(fieldPath);

  return (
    <GenericAttributeListProductForm
      genericAttributeList={genericAttributeList}
      actions={genericAttributeListActions}
      getError={getError}
      fieldPathPrefix={fullPathPrefix}
      title="Generic Attribute List"
      description="Generic attributes for the device"
      nested={true}
    />
  );
}
