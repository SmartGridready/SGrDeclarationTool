import { InputField } from "@/sections/shared/components/forms/input-field";
import { SelectField } from "@/sections/shared/components/forms/select-field";
import { JsonArrayField } from "@/sections/shared/components/forms/json-array-field";
import { FormSection } from "@/sections/shared/components/forms/form-section";
import { JSonArrayOutputFunctionalProfile, JSonElemFunctionalProfile } from "@/models";
import { JsonSlice } from "@/sections/functional-profile/data-point-list/json/json-slice";
import {
  isJsonArray,
  isJsonElement,
  getJsonElementType,
  createJsonElement,
  createJsonArray,
  createEmptyJsonElement,
  JSON_ELEMENT_TYPE_OPTIONS,
} from "@/sections/functional-profile/data-point-list/json/json-utils";

interface JsonFormProps {
  dataPointIndex: number;
  items?: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[];
  jsonSlice: JsonSlice;
}

// Recursive JSON Items Editor Component
interface JsonItemsEditorProps {
  dataPointIndex: number;
  items?: (JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile)[];
  jsonSlice: JsonSlice;
  pathPrefix: string;
  level?: number;
  currentPath?: number[];
}

function JsonItemsEditor({
  dataPointIndex,
  items = [],
  jsonSlice,
  pathPrefix,
  level = 0,
  currentPath = [],
}: JsonItemsEditorProps) {
  const handleAddArray = () => {
    jsonSlice.addJsonItemAtPath(dataPointIndex, currentPath, createJsonArray());
  };

  const handleAddElement = () => {
    jsonSlice.addJsonItemAtPath(dataPointIndex, currentPath, createEmptyJsonElement());
  };

  const handleRemoveItem = (itemIndex: number) => {
    jsonSlice.removeJsonItemAtPath(dataPointIndex, [...currentPath, itemIndex]);
  };

  const handleUpdateArrayItem = (
    itemIndex: number,
    updatedItem: JSonArrayOutputFunctionalProfile
  ) => {
    jsonSlice.updateJsonArrayItemAtPath(dataPointIndex, [...currentPath, itemIndex], updatedItem);
  };

  const handleUpdateElemItem = (itemIndex: number, updatedItem: JSonElemFunctionalProfile) => {
    jsonSlice.updateJsonElemItemAtPath(dataPointIndex, [...currentPath, itemIndex], updatedItem);
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
                  handleUpdateArrayItem(itemIndex, {
                    ...jsonItem,
                    name: value,
                  });
                }}
                placeholder="Enter array name"
              />
              <JsonItemsEditor
                dataPointIndex={dataPointIndex}
                items={jsonItem.items}
                jsonSlice={jsonSlice}
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
                  handleUpdateElemItem(itemIndex, {
                    ...jsonItem,
                    key: value,
                  });
                }}
                placeholder="Enter key"
                required={true}
              />
              <SelectField
                label="Type"
                name={`${pathPrefix}-json-${itemIndex}-type`}
                options={JSON_ELEMENT_TYPE_OPTIONS}
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

export function JsonForm({ dataPointIndex, items, jsonSlice }: JsonFormProps) {
  return (
    <FormSection title="JSON Configuration" nested>
      <JsonItemsEditor
        dataPointIndex={dataPointIndex}
        items={items}
        jsonSlice={jsonSlice}
        pathPrefix={`dataPoint-${dataPointIndex}`}
        currentPath={[]}
      />
    </FormSection>
  );
}
