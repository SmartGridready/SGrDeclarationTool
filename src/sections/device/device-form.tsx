"use client";

import { StandaloneDeviceFormProvider } from "@/sections/device/device-form-provider";
import { DeviceForm as SharedDeviceForm } from "@/sections/device/device-main-form";

/**
 * Standalone Device Form
 * Wraps the shared DeviceForm with the StandaloneDeviceFormProvider.
 */
export function DeviceForm() {
  return (
    <StandaloneDeviceFormProvider>
      <SharedDeviceForm />
    </StandaloneDeviceFormProvider>
  );
}
