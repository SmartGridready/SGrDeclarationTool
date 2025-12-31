"use client";

import { XmlTestPage } from "@/components/test/xml-test-page";
import { parseDevice } from "@/sections/device/device-mapper";
import { buildDeviceToXml } from "@/sections/device/device-builder";

export default function DeviceTestPage() {
  return <XmlTestPage parse={parseDevice} build={buildDeviceToXml} />;
}
