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
}

interface JsonItemsEditorProps {
  dataPointIndex: number;
  items?: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[];
  pathPrefix: string;
  level?: number;
  currentPath?: number[];
}

function JsonItemsEditor({
  dataPointIndex,
  items = [],
  pathPrefix,
  level = 0,
  currentPath = [],
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
              />
              <JsonItemsEditor
                dataPointIndex={dataPointIndex}
                items={jsonItem.items}
                pathPrefix={`${pathPrefix}-json-${itemIndex}`}
                level={level + 1}
                currentPath={[...currentPath, itemIndex]}
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
              />
            </>
          );
        }

        return null;
      }}
    />
  );
}

export function JsonForm({ dataPointIndex, items }: JsonFormProps) {
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
      />
    </FormSection>
  );
}
