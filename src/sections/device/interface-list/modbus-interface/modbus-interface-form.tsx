"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceFormContext } from "@/context/device-form-context";

export function ModbusInterfaceForm() {
  const { useDeviceState } = useDeviceFormContext();

  const modbusInterface = useDeviceState((d) => d?.interfaceList?.modbusInterface);

  // Don't render if modbus interface is not selected
  if (!modbusInterface) {
    return null;
  }

  return (
    <FormSection
      title="Modbus Interface"
      description="Configure the Modbus interface settings"
      required={true}
      nested={true}
    >
      <div>{/* Form Sections will be added here */}</div>
    </FormSection>
  );
}
