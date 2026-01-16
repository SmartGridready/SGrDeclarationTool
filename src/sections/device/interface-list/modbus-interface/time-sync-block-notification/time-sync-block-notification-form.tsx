"use client";

import { FormSection } from "@/components/forms/form-section";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";
import { TimeSyncBlockNotification } from "@/models/product/modbus-types";
import { REGISTER_TYPE_VALUES } from "@/models/product/modbus-types";
import { createFormOptions } from "@/utils/form-options-utils";
import type { TimeSyncBlockNotificationSlice } from "./time-sync-block-notification-slice";

const REGISTER_TYPE_OPTIONS = createFormOptions(REGISTER_TYPE_VALUES);

export function TimeSyncBlockNotificationForm() {
  const store = useDeviceStore.getState();

  const fieldPathPrefix = "interfaceList.modbusInterface.timeSyncBlockNotification";

  // Granular selectors
  const timeSyncBlockNotifications = useDeviceField(
    (d) => d?.interfaceList?.modbusInterface?.timeSyncBlockNotification
  );
  const isAdded = useDeviceField(
    (d) => (d?.interfaceList?.modbusInterface?.timeSyncBlockNotification?.length ?? 0) > 0
  );

  const handleAdd = () => store.addEmptyTimeSyncBlockNotification();
  const handleRemove = () => store.removeAllTimeSyncBlockNotifications();

  return (
    <FormSection
      title="Time Sync Block Notification"
      description="Define time sync block notifications for this Modbus interface"
      required={false}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      <ArrayField<TimeSyncBlockNotification>
        label="Time Sync Block Notification"
        items={timeSyncBlockNotifications}
        onAdd={store.addEmptyTimeSyncBlockNotification}
        onRemove={store.removeTimeSyncBlockNotification}
        emptyMessage="No time sync block notifications added"
        renderItem={(item, index) => (
          <TimeSyncBlockNotificationItemForm
            key={index}
            notificationIndex={index}
            notification={item}
            timeSyncBlockNotificationActions={store}
            fieldPathPrefix={`${fieldPathPrefix}[${index}]`}
          />
        )}
      />
    </FormSection>
  );
}

interface TimeSyncBlockNotificationItemFormProps {
  notificationIndex: number;
  notification: TimeSyncBlockNotification;
  timeSyncBlockNotificationActions: TimeSyncBlockNotificationSlice;
  fieldPathPrefix: string;
}

function TimeSyncBlockNotificationItemForm({
  notificationIndex,
  notification,
  timeSyncBlockNotificationActions,
  fieldPathPrefix,
}: TimeSyncBlockNotificationItemFormProps) {
  const { getError } = useDeviceValidation();

  return (
    <div className="space-y-4">
      <FormGroup columns={2}>
        <InputField
          label="Block Cache Identification"
          name={`${fieldPathPrefix}-blockCacheIdentification`}
          required={true}
          type="text"
          value={notification.blockCacheIdentification}
          onChange={(value) =>
            timeSyncBlockNotificationActions.updateBlockCacheIdentification(notificationIndex, value)
          }
          placeholder="Enter block cache identification"
          error={getError(`${fieldPathPrefix}.blockCacheIdentification`)}
        />
        <InputField
          label="First Address"
          name={`${fieldPathPrefix}-firstAddress`}
          required={true}
          type="number"
          value={notification.firstAddress.toString()}
          onChange={(value) =>
            timeSyncBlockNotificationActions.updateFirstAddress(notificationIndex, value ? parseInt(value, 10) : 0)
          }
          placeholder="Enter first address"
          error={getError(`${fieldPathPrefix}.firstAddress`)}
        />
      </FormGroup>

      <FormGroup columns={2}>
        <InputField
          label="Size"
          name={`${fieldPathPrefix}-size`}
          required={true}
          type="number"
          value={notification.size.toString()}
          onChange={(value) =>
            timeSyncBlockNotificationActions.updateSize(notificationIndex, value ? parseInt(value, 10) : 1)
          }
          placeholder="Enter size"
          error={getError(`${fieldPathPrefix}.size`)}
        />
        <SelectField
          label="Register Type"
          name={`${fieldPathPrefix}-registerType`}
          required={true}
          options={REGISTER_TYPE_OPTIONS}
          value={notification.registerType}
          onChange={(value) =>
            timeSyncBlockNotificationActions.updateRegisterType(
              notificationIndex,
              value as TimeSyncBlockNotification["registerType"]
            )
          }
          error={getError(`${fieldPathPrefix}.registerType`)}
        />
      </FormGroup>

      <FormGroup>
        <InputField
          label="Time To Live (ms)"
          name={`${fieldPathPrefix}-timeToLiveMs`}
          required={true}
          type="number"
          value={notification.timeToLiveMs.toString()}
          onChange={(value) =>
            timeSyncBlockNotificationActions.updateTimeToLiveMs(notificationIndex, value ? parseInt(value, 10) : 1000)
          }
          placeholder="Enter time to live in milliseconds"
          error={getError(`${fieldPathPrefix}.timeToLiveMs`)}
        />
      </FormGroup>
    </div>
  );
}
