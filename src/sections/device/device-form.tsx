"use client";

import { useDeviceStore } from "@/sections/device/device-store";

export function DeviceForm() {
  const { device } = useDeviceStore();

  if (!device) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center text-muted-foreground py-8">
        Device form will be implemented here
      </div>
    </div>
  );
}
