"use client";

import { useDeviceStore } from "@/sections/device/device-store";
import { DeviceIdentificationForm } from "@/sections/device/device-identification/device-identification-form";

export function DeviceForm() {
  const { device } = useDeviceStore();

  if (!device) {
    return null;
  }

  return (
    <div className="space-y-6">
      <DeviceIdentificationForm />
    </div>
  );
}
