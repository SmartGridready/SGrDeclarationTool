"use client";

import { DynamicParameterDescriptionList } from "@/models";
import { useFunctionalProfileFormContext } from "@/context/functional-profile-form-context";
import { DynamicParameterListForm } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-form";

interface ParameterListFormProps {
  dataPointIndex: number;
  parameterList: DynamicParameterDescriptionList | undefined;
  getError: (path: string) => string | undefined;
  onAdd: () => void;
  onRemove: () => void;
}

export function ParameterListForm({
  dataPointIndex,
  parameterList,
  getError,
  onAdd,
  onRemove,
}: ParameterListFormProps) {
  const { dataPointListActions } = useFunctionalProfileFormContext();

  return (
    <DynamicParameterListForm
      dataPointIndex={dataPointIndex}
      parameterList={parameterList}
      actions={dataPointListActions}
      getError={getError}
      fieldPathPrefix={`dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.parameterList`}
      onAdd={onAdd}
      onRemove={onRemove}
    />
  );
}
