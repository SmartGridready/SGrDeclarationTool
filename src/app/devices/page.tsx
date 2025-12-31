"use client";

import { useDeviceStore } from "@/sections/device/device-store";
import { DeviceForm } from "@/sections/device/device-form";
import { fetchDevices, fetchDeviceXml } from "@/utils/library-api-utils";
import { DeviceFrame } from "@/models";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { parseDevice } from "@/sections/device/device-mapper";
import { buildDeviceToXml } from "@/sections/device/device-builder";
import { validateDeviceFrame } from "@/sections/device/device-schema";
import { GenericEditor, EditorConfig } from "@/components/editor/generic-editor";

export default function DevicesPage() {
  const { device, createEmpty, clear, setDevice } = useDeviceStore();

  const config: EditorConfig<DeviceFrame> = {
    getData: () => device,
    setData: setDevice,
    createEmpty,
    clear,
    parser: parseDevice,
    builder: buildDeviceToXml,
    validator: validateDeviceFrame,
    fetchLibraryItems: fetchDevices,
    fetchLibraryItemXml: fetchDeviceXml,
    title: "Device Editor",
    emptyButtonLabel: "Load Empty Device",
    itemName: "device",
    itemNameCapitalized: "Device",
    exportFilename: "device.xml",
    exportErrorMessage: ERROR_MESSAGES.FILE_EXPORT.NO_DATA,
    searchPlaceholder: "Search devices...",
    FormComponent: <DeviceForm />,
  };

  return <GenericEditor config={config} />;
}
