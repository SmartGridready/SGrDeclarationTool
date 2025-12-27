"use client";

import { FormSection } from "@/components/forms/form-section";
import { useDeviceFormContext } from "@/context/device-form-context";
import { ModbusInterfaceDescriptionForm } from "./interface-description/interface-description-form";
import { ModbusAttributesForm } from "./modbus-attributes/modbus-attributes-form";
import { ModbusFunctionalProfileListForm } from "./functional-profile-list/modbus-functional-profile-list-form";
import { TimeSyncBlockNotificationForm } from "./time-sync-block-notification/time-sync-block-notification-form";

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
      <ModbusInterfaceDescriptionForm />
      <ModbusAttributesForm />
      <ModbusFunctionalProfileListForm />
      <TimeSyncBlockNotificationForm />
    </FormSection>
  );
}
