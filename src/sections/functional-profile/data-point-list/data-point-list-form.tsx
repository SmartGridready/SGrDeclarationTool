"use client";

import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { ArrayField } from "@/components/forms/array-field";
import { FormGroup } from "@/components/forms/form-group";
import {
  FunctionalProfileDataPoint,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  Units,
} from "@/models";
import {
  useFunctionalProfileFormContext,
  buildProfileFieldPath,
} from "@/context/functional-profile-form-context";
import {
  DATA_DIRECTION_OPTIONS,
  PRESENCE_LEVEL_OPTIONS,
  DATA_TYPE_OPTIONS,
  UNIT_OPTIONS,
} from "@/sections/functional-profile/data-point-list/data-point-list-form-options";
import {
  isEnumDataType,
  isBitmapDataType,
  isJsonDataType,
  getDataTypeStringValue,
  createDataTypeFromString,
} from "@/sections/functional-profile/data-point-list/data-type-utils";
import { EnumForm } from "@/sections/functional-profile/data-point-list/data-types/enum/enum-form";
import { BitmapForm } from "@/sections/functional-profile/data-point-list/data-types/bitmap/bitmap-form";
import { JsonForm } from "@/sections/functional-profile/data-point-list/data-types/json/json-form";
import { DataPointAlternativeNamesForm } from "@/sections/functional-profile/data-point-list/alternative-names/alternative-names-form";
import { DataPointLegibleDescriptionForm } from "@/sections/functional-profile/data-point-list/legible-description/legible-description-form";
import { ParameterListForm } from "@/sections/functional-profile/data-point-list/dynamic-parameter-list/parameter-list-form";
import { DataPointGenericAttributeListForm } from "@/sections/functional-profile/data-point-list/generic-attribute-list/generic-attribute-list-form";

export function DataPointListForm() {
  const { useProfileState, useValidation, pathPrefix, dataPointListActions } =
    useFunctionalProfileFormContext();

  // Get state from context
  const dataPoints = useProfileState((profile) => profile?.dataPointList?.dataPointListElement);
  const isAdded = useProfileState((profile) => !!profile?.dataPointList);

  // Get validation
  const { getError: getRawError } = useValidation();
  const getError = (fieldPath: string) => getRawError(buildProfileFieldPath(pathPrefix, fieldPath));

  // Actions from context
  const actions = dataPointListActions;

  const handleAdd = () => actions.addEmptyDataPoint();
  const handleRemove = () => actions.removeAllDataPoints();

  return (
    <FormSection
      title="Data Point List"
      description="Define the data points for this functional profile"
      required={false}
      isAdded={isAdded}
      onAdd={handleAdd}
      onRemove={handleRemove}
    >
      <ArrayField<FunctionalProfileDataPoint>
        label="Data Points"
        items={dataPoints}
        onAdd={actions.addEmptyDataPoint}
        onRemove={actions.removeDataPoint}
        emptyMessage="No data points added"
        renderItem={(item, index) => (
          <>
            <InputField
              label="Data Point Name"
              name={`dataPoint-${index}-name`}
              value={item.dataPoint.dataPointName}
              onChange={(value) => actions.updateDataPointName(index, value)}
              placeholder="Enter data point name"
              required={true}
              error={getError(
                `dataPointList.dataPointListElement.${index}.dataPoint.dataPointName`
              )}
            />

            <FormGroup columns={2}>
              <SelectField
                label="Data Direction"
                name={`dataPoint-${index}-direction`}
                options={DATA_DIRECTION_OPTIONS as unknown as { value: string; label: string }[]}
                value={item.dataPoint.dataDirection}
                onChange={(value) =>
                  actions.updateDataDirection(index, value as DataDirectionFunctionalProfile)
                }
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${index}.dataPoint.dataDirection`
                )}
              />
              <SelectField
                label="Presence Level"
                name={`dataPoint-${index}-presence`}
                options={PRESENCE_LEVEL_OPTIONS as unknown as { value: string; label: string }[]}
                value={item.dataPoint.presenceLevel}
                onChange={(value) => actions.updatePresenceLevel(index, value as PresenceLevel)}
                required={true}
                error={getError(
                  `dataPointList.dataPointListElement.${index}.dataPoint.presenceLevel`
                )}
              />
            </FormGroup>

            <FormGroup columns={3}>
              <SelectField
                label="Data Type"
                name={`dataPoint-${index}-dataType`}
                options={DATA_TYPE_OPTIONS as unknown as { value: string; label: string }[]}
                value={getDataTypeStringValue(item.dataPoint.dataType)}
                onChange={(value) => {
                  const newDataType = createDataTypeFromString(value);
                  if (value === "enum" && !isEnumDataType(newDataType)) {
                    actions.setEnumDataType(index, {});
                  } else if (value === "bitmap" && !isBitmapDataType(newDataType)) {
                    actions.setBitmapDataType(index, {});
                  } else if (value === "json" && !isJsonDataType(newDataType)) {
                    actions.setJsonDataType(index, {});
                  } else {
                    actions.updateDataType(index, newDataType);
                  }
                }}
                required={true}
                error={getError(`dataPointList.dataPointListElement.${index}.dataPoint.dataType`)}
              />
              <SelectField
                label="Unit"
                name={`dataPoint-${index}-unit`}
                options={UNIT_OPTIONS as unknown as { value: string; label: string }[]}
                value={item.dataPoint.unit}
                onChange={(value) => actions.updateUnit(index, value as Units)}
                required={true}
                error={getError(`dataPointList.dataPointListElement.${index}.dataPoint.unit`)}
              />
              <InputField
                label="Array Length"
                name={`dataPoint-${index}-arrayLength`}
                type="number"
                value={item.dataPoint.arrayLength?.toString() || ""}
                onChange={(value) =>
                  actions.updateArrayLength(index, value ? parseInt(value, 10) : undefined)
                }
                placeholder="Enter array length"
                error={getError(
                  `dataPointList.dataPointListElement.${index}.dataPoint.arrayLength`
                )}
              />
            </FormGroup>

            {isEnumDataType(item.dataPoint.dataType) && (
              <EnumForm dataPointIndex={index} enumMap={item.dataPoint.dataType.enum} />
            )}

            {isBitmapDataType(item.dataPoint.dataType) && (
              <BitmapForm dataPointIndex={index} bitmap={item.dataPoint.dataType.bitmap} />
            )}

            {isJsonDataType(item.dataPoint.dataType) && (
              <JsonForm dataPointIndex={index} items={item.dataPoint.dataType.json.items} />
            )}

            <ParameterListForm
              dataPointIndex={index}
              parameterList={item.dataPoint.parameterList}
              getError={getError}
              onAdd={() => actions.addDataPointParameterList(index)}
              onRemove={() => actions.removeDataPointParameterList(index)}
            />

            <DataPointAlternativeNamesForm dataPointIndex={index} />

            <DataPointLegibleDescriptionForm dataPointIndex={index} />

            <DataPointGenericAttributeListForm
              dataPointIndex={index}
              genericAttributeList={item.genericAttributeList}
              getError={getError}
              onAdd={() => actions.addDataPointGenericAttributeList(index)}
              onRemove={() => actions.removeDataPointGenericAttributeList(index)}
            />
          </>
        )}
      />
    </FormSection>
  );
}
