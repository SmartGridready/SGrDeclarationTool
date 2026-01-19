"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { DATA_TYPE_PRODUCT_EXTENDED_VALUES } from "@/models";
import { createFormOptions } from "@/utils/form-options-utils";

const DATA_TYPE_OPTIONS = createFormOptions(DATA_TYPE_PRODUCT_EXTENDED_VALUES);
import {
  getDataTypeProductStringValue,
  createDataTypeProductFromString,
  isEnumDataTypeProduct,
  isBitmapDataTypeProduct,
} from "@/sections/shared/data-type-product/data-type-product-utils";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { useDeviceField } from "@/hooks/use-store-field";
import { ConfigurationDescriptionsForm } from "@/sections/device/configuration-list/configuration-descriptions/configuration-descriptions-form";
import { ConfigurationListEnumForm } from "@/sections/device/configuration-list/data-types/enum/enum-form";
import { ConfigurationListBitmapForm } from "@/sections/device/configuration-list/data-types/bitmap/bitmap-form";

export function ConfigurationListForm() {
  // Granular selectors for configuration list
  const hasConfigurationList = useDeviceField((d) => !!d?.configurationList);
  const configurationListElement = useDeviceField((d) => d?.configurationList?.configurationListElement);

  const { getError } = useDeviceValidation();
  const store = useDeviceStore.getState();
  const fullPathPrefix = "configurationList";

  return (
    <FormSection
      title="Configuration List"
      description="Configuration parameters for the device"
      required={false}
      isAdded={hasConfigurationList}
      onAdd={() => store.addConfigurationList()}
      onRemove={() => store.removeConfigurationList()}
      nested
    >
      <ArrayField
        label="Configuration Elements"
        items={configurationListElement}
        onAdd={() => store.addConfigurationListElement()}
        onRemove={(configIndex) => store.removeConfigurationListElement(configIndex)}
        emptyMessage="No configuration elements added"
        renderItem={(config, configIndex) => (
          <>
            <FormGroup columns={3}>
              <InputField
                label="Configuration Name"
                name={`${fullPathPrefix}-${configIndex}-name`}
                type="text"
                value={config.name}
                onChange={(value) => store.updateConfigurationListElementName(configIndex, value)}
                placeholder="Enter configuration name"
                required={true}
                error={getError(`${fullPathPrefix}.configurationListElement[${configIndex}].name`)}
              />
              <SelectField
                label="Data Type"
                name={`${fullPathPrefix}-${configIndex}-dataType`}
                options={DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
                value={getDataTypeProductStringValue(config.dataType)}
                onChange={(value) => {
                  const newDataType = createDataTypeProductFromString(value);
                  if (value === "enum" && !isEnumDataTypeProduct(config.dataType)) {
                    store.setConfigurationListEnumDataType(configIndex, {
                      enumEntry: [],
                    });
                  } else if (value === "bitmap" && !isBitmapDataTypeProduct(config.dataType)) {
                    store.setConfigurationListBitmapDataType(configIndex, {
                      bitmapEntry: [],
                    });
                  } else {
                    store.updateConfigurationListElementDataType(configIndex, newDataType);
                  }
                }}
                required={true}
                error={getError(`${fullPathPrefix}.configurationListElement[${configIndex}].dataType`)}
              />
              <InputField
                label="Default Value"
                name={`${fullPathPrefix}-${configIndex}-defaultValue`}
                type="text"
                value={config.defaultValue || ""}
                onChange={(value) => store.updateConfigurationListElementDefaultValue(configIndex, value ?? "")}
                placeholder="Enter default value"
                required={false}
                error={getError(`${fullPathPrefix}.configurationListElement[${configIndex}].defaultValue`)}
              />
            </FormGroup>

            {isEnumDataTypeProduct(config.dataType) && (
              <ConfigurationListEnumForm configIndex={configIndex} enumMap={config.dataType.enum} />
            )}

            {isBitmapDataTypeProduct(config.dataType) && (
              <ConfigurationListBitmapForm configIndex={configIndex} bitmap={config.dataType.bitmap} />
            )}

            <ConfigurationDescriptionsForm
              configIndex={configIndex}
              configurationDescriptions={config.configurationDescription}
            />
          </>
        )}
      />
    </FormSection>
  );
}
