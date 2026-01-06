"use client";

import { useState, useEffect } from "react";
import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { FormGroup } from "@/components/forms/form-group";
import {
  RestApiDataType,
  REST_API_DATA_TYPE_VALUES,
  RestApiDataPointConfiguration,
} from "@/models/product/rest-api-types";
import { createFormOptions } from "@/models/form-options-helper";
import {
  RestApiDataPointConfigurationSlice,
  ConfigType,
  getConfigurationType,
} from "./rest-api-data-point-configuration-slice";
import { SingleServiceCallForm } from "./single-service-call/single-service-call-form";
import { WriteReadServiceCallForm } from "./write-read-service-call/write-read-service-call-form";
import { ReadWriteServiceCallForm } from "./read-write-service-call/read-write-service-call-form";

const DATA_TYPE_OPTIONS = createFormOptions(REST_API_DATA_TYPE_VALUES);

const CONFIG_TYPE_OPTIONS = [
  { value: "single", label: "Single Service Call" },
  { value: "writeRead", label: "Write-Read Service Calls" },
  { value: "readWrite", label: "Read-Write Service Calls" },
] as const;

interface RestApiDataPointConfigurationFormProps {
  config: RestApiDataPointConfiguration | undefined;
  actions: RestApiDataPointConfigurationSlice;
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  fieldPathPrefix: string;
}

export function RestApiDataPointConfigurationForm({
  config,
  actions,
  useValidation,
  fieldPathPrefix,
}: RestApiDataPointConfigurationFormProps) {
  const { getError } = useValidation();

  const isAdded = !!config;

  // Track the selected config type in local state to handle the case where
  // both service calls are present (the structure alone can't distinguish
  // between write-read and read-write when both are filled)
  const derivedConfigType = getConfigurationType(config);
  const [selectedConfigType, setSelectedConfigType] = useState<ConfigType | undefined>(derivedConfigType);

  // Sync with derived type when config changes externally (e.g., on initial load)
  // but only if selectedConfigType is undefined or config was removed
  useEffect(() => {
    if (!config) {
      setSelectedConfigType(undefined);
    } else if (selectedConfigType === undefined && derivedConfigType) {
      setSelectedConfigType(derivedConfigType);
    }
  }, [config, derivedConfigType, selectedConfigType]);

  // Use selectedConfigType if available, otherwise fall back to derived
  const configType = selectedConfigType ?? derivedConfigType;

  const handleAdd = () => {
    actions.addConfiguration();
    setSelectedConfigType("single"); // Default type when adding
  };

  const handleRemove = () => {
    actions.removeConfiguration();
    setSelectedConfigType(undefined);
  };

  const handleConfigTypeChange = (newType: ConfigType) => {
    setSelectedConfigType(newType);
    actions.setConfigurationType(newType);
  };

  return (
    <FormSection
      title="REST API Data Point Configuration"
      description="Configure the REST API service calls for this data point"
      required={false}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
      nested={true}
    >
      {config && (
        <div className="space-y-6">
          <FormGroup>
            <SelectField
              label="Data Type"
              name={`${fieldPathPrefix}-dataType`}
              required={true}
              options={DATA_TYPE_OPTIONS}
              value={config.dataType}
              onChange={(value) => actions.updateDataType(value as RestApiDataType)}
              error={getError(`${fieldPathPrefix}.dataType`)}
            />
            <SelectField
              label="Configuration Type"
              name={`${fieldPathPrefix}-configType`}
              required={true}
              options={CONFIG_TYPE_OPTIONS}
              value={configType ?? "single"}
              onChange={(value) => handleConfigTypeChange(value as ConfigType)}
              error={getError(`${fieldPathPrefix}.configType`)}
            />
          </FormGroup>

          {/* Render the appropriate service call form based on configuration type */}
          {configType === "single" && (
            <SingleServiceCallForm
              config={config}
              actions={actions}
              useValidation={useValidation}
              fieldPathPrefix={fieldPathPrefix}
            />
          )}

          {configType === "writeRead" && (
            <WriteReadServiceCallForm
              config={config}
              actions={actions}
              useValidation={useValidation}
              fieldPathPrefix={fieldPathPrefix}
            />
          )}

          {configType === "readWrite" && (
            <ReadWriteServiceCallForm
              config={config}
              actions={actions}
              useValidation={useValidation}
              fieldPathPrefix={fieldPathPrefix}
            />
          )}
        </div>
      )}
    </FormSection>
  );
}
