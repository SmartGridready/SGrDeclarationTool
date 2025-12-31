"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import { DATA_TYPE_PRODUCT_EXTENDED_VALUES } from "@/models";
import { createFormOptions } from "@/models/form-options-helper";

const DATA_TYPE_OPTIONS = createFormOptions(DATA_TYPE_PRODUCT_EXTENDED_VALUES);
import {
  getDataTypeProductStringValue,
  createDataTypeProductFromString,
  isEnumDataTypeProduct,
  isBitmapDataTypeProduct,
} from "@/sections/shared/data-type-product/data-type-product-utils";
import { useDeviceFormContext, buildDeviceFieldPath } from "@/context/device-form-context";
import { ConfigurationDescriptionsForm } from "@/sections/device/configuration-list/configuration-descriptions/configuration-descriptions-form";
import { ConfigurationListEnumForm } from "@/sections/device/configuration-list/data-types/enum/enum-form";
import { ConfigurationListBitmapForm } from "@/sections/device/configuration-list/data-types/bitmap/bitmap-form";

export function ConfigurationListForm() {
  const { useDeviceState, useValidation, configurationListActions, pathPrefix } = useDeviceFormContext();

  const configurationList = useDeviceState((d) => d?.configurationList);
  const { getError } = useValidation();

  const fullPathPrefix = pathPrefix ? buildDeviceFieldPath(pathPrefix, "configurationList") : "configurationList";

  return (
    <FormSection
      title="Configuration List"
      description="Configuration parameters for the device"
      required={false}
      isAdded={!!configurationList}
      onAdd={() => configurationListActions.addConfigurationList()}
      onRemove={() => configurationListActions.removeConfigurationList()}
      nested
    >
      <ArrayField
        label="Configuration Elements"
        items={configurationList?.configurationListElement}
        onAdd={() => configurationListActions.addConfigurationListElement()}
        onRemove={(configIndex) => configurationListActions.removeConfigurationListElement(configIndex)}
        emptyMessage="No configuration elements added"
        renderItem={(config, configIndex) => (
          <>
            <FormGroup columns={3}>
              <InputField
                label="Configuration Name"
                name={`${fullPathPrefix}-${configIndex}-name`}
                type="text"
                value={config.name}
                onChange={(value) => configurationListActions.updateConfigurationListElementName(configIndex, value)}
                placeholder="Enter configuration name"
                required={true}
                error={getError(`${fullPathPrefix}.configurationListElement.${configIndex}.name`)}
              />
              <SelectField
                label="Data Type"
                name={`${fullPathPrefix}-${configIndex}-dataType`}
                options={DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
                value={getDataTypeProductStringValue(config.dataType)}
                onChange={(value) => {
                  const newDataType = createDataTypeProductFromString(value);
                  if (value === "enum" && !isEnumDataTypeProduct(config.dataType)) {
                    configurationListActions.setConfigurationListEnumDataType(configIndex, {
                      enumEntry: [],
                    });
                  } else if (value === "bitmap" && !isBitmapDataTypeProduct(config.dataType)) {
                    configurationListActions.setConfigurationListBitmapDataType(configIndex, {
                      bitmapEntry: [],
                    });
                  } else {
                    configurationListActions.updateConfigurationListElementDataType(configIndex, newDataType);
                  }
                }}
                required={true}
                error={getError(`${fullPathPrefix}.configurationListElement.${configIndex}.dataType`)}
              />
              <InputField
                label="Default Value"
                name={`${fullPathPrefix}-${configIndex}-defaultValue`}
                type="text"
                value={config.defaultValue || ""}
                onChange={(value) =>
                  configurationListActions.updateConfigurationListElementDefaultValue(configIndex, value || undefined)
                }
                placeholder="Enter default value"
                required={false}
                error={getError(`${fullPathPrefix}.configurationListElement.${configIndex}.defaultValue`)}
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
