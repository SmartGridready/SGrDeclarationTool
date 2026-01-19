"use client";

import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { JsonArrayField } from "@/components/forms/json-array-field";
import { FormSection } from "@/components/forms/form-section";
import { JSonArrayOutputFunctionalProfile, JSonElemFunctionalProfile } from "@/models";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { createEmptyJsonElement } from "@/utils/factory-utils";
import {
  isJsonArray,
  isJsonElement,
  getJsonElementType,
  createJsonElement,
  createJsonArray,
  JSON_ELEMENT_TYPE_OPTIONS,
} from "@/sections/functional-profile/data-point-list/data-types/json/json-utils";

interface JsonFormProps {
  dataPointIndex: number;
  items?: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[];
  getError?: (fieldPath: string) => string | undefined;
}

interface JsonItemsEditorProps {
  dataPointIndex: number;
  items?: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[];
  pathPrefix: string;
  level?: number;
  currentPath?: number[];
  getError?: (fieldPath: string) => string | undefined;
  fieldPathPrefix?: string;
}

function JsonItemsEditor({
  dataPointIndex,
  items = [],
  pathPrefix,
  level = 0,
  currentPath = [],
  getError,
  fieldPathPrefix = `dataPointList.dataPointListElement[${dataPointIndex}].dataPoint.dataType.json.items`,
}: JsonItemsEditorProps) {
  const store = useProfileStore.getState();
  const dataPointListActions = store;

  const handleAddArray = () => {
    dataPointListActions.addJsonItemAtPath(dataPointIndex, currentPath, createJsonArray());
  };

  const handleAddElement = () => {
    dataPointListActions.addJsonItemAtPath(dataPointIndex, currentPath, createEmptyJsonElement());
  };

  const handleRemoveItem = (itemIndex: number) => {
    dataPointListActions.removeJsonItemAtPath(dataPointIndex, [...currentPath, itemIndex]);
  };

  const handleUpdateArrayItem = (itemIndex: number, updatedItem: JSonArrayOutputFunctionalProfile) => {
    dataPointListActions.updateJsonArrayItemAtPath(dataPointIndex, [...currentPath, itemIndex], updatedItem);
  };

  const handleUpdateElemItem = (itemIndex: number, updatedItem: JSonElemFunctionalProfile) => {
    dataPointListActions.updateJsonElemItemAtPath(dataPointIndex, [...currentPath, itemIndex], updatedItem);
  };

  return (
    <JsonArrayField<JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile>
      label="JSON Items"
      items={items}
      onAddArray={handleAddArray}
      onAddElement={handleAddElement}
      onRemove={handleRemoveItem}
      emptyMessage={`No ${level > 0 ? "nested " : ""}items added`}
      nestedLabel={level > 0 ? "Nested Items" : undefined}
      renderItem={(jsonItem, itemIndex) => {
        // Build field path for this item based on currentPath
        const buildItemPath = (field: string) => {
          if (currentPath.length === 0) {
            return `${fieldPathPrefix}[${itemIndex}].${field}`;
          }
          // For nested items, build path like items[0].items[1].key
          let path = fieldPathPrefix;
          for (const idx of currentPath) {
            path += `[${idx}].items`;
          }
          path += `[${itemIndex}].${field}`;
          return path;
        };

        if (isJsonArray(jsonItem)) {
          return (
            <>
              <div className="text-xs font-semibold text-muted-foreground">ARRAY</div>
              <InputField
                label="Array Name"
                name={`${pathPrefix}-json-${itemIndex}-name`}
                value={jsonItem.name || ""}
                onChange={(value) => {
                  handleUpdateArrayItem(itemIndex, { ...jsonItem, name: value });
                }}
                placeholder="Enter array name"
                error={getError ? getError(buildItemPath("name")) : undefined}
              />
              <JsonItemsEditor
                dataPointIndex={dataPointIndex}
                items={jsonItem.items}
                pathPrefix={`${pathPrefix}-json-${itemIndex}`}
                level={level + 1}
                currentPath={[...currentPath, itemIndex]}
                getError={getError}
                fieldPathPrefix={fieldPathPrefix}
              />
            </>
          );
        }

        if (isJsonElement(jsonItem)) {
          return (
            <>
              <div className="text-xs font-semibold text-muted-foreground">ELEMENT</div>
              <InputField
                label="Key"
                name={`${pathPrefix}-json-${itemIndex}-key`}
                value={jsonItem.key}
                onChange={(value) => {
                  handleUpdateElemItem(itemIndex, { ...jsonItem, key: value });
                }}
                placeholder="Enter key"
                required={true}
                error={getError ? getError(buildItemPath("key")) : undefined}
              />
              <SelectField
                label="Type"
                name={`${pathPrefix}-json-${itemIndex}-type`}
                options={JSON_ELEMENT_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
                value={getJsonElementType(jsonItem)}
                onChange={(value) => {
                  handleUpdateElemItem(
                    itemIndex,
                    createJsonElement(jsonItem.key, value as "string" | "number" | "date")
                  );
                }}
                required={true}
                error={getError ? getError(buildItemPath("type")) : undefined}
              />
            </>
          );
        }

        return null;
      }}
    />
  );
}

export function JsonForm({ dataPointIndex, items, getError }: JsonFormProps) {
  return (
    <FormSection
      title="JSON Configuration"
      description="Define JSON structure with elements and nested arrays"
      nested
      required
    >
      <JsonItemsEditor
        dataPointIndex={dataPointIndex}
        items={items}
        pathPrefix={`dataPoint-${dataPointIndex}`}
        currentPath={[]}
        getError={getError}
        fieldPathPrefix={`dataPointList.dataPointListElement[${dataPointIndex}].dataPoint.dataType.json.items`}
      />
    </FormSection>
  );
}
