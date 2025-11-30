import { AlternativeNamesForm } from "@/sections/shared/sections/alternative-names/alternative-names-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";
import { AlternativeNamesSlice } from "@/sections/shared/sections/alternative-names/alternative-names-slice";
import { StoreState } from "@/sections/functional-profile/functional-profile-store";

interface DataPointAlternativeNamesFormProps {
  dataPointIndex: number;
}

/**
 * Custom hook that creates an adapted store hook for a specific data point
 * This hook returns a function that can be used as a store hook
 */
function useDataPointStoreAdapter(dataPointIndex: number) {
  return <TSelected,>(selector: (store: StoreState & AlternativeNamesSlice) => TSelected) => {
    // Get the current store state (this will cause re-renders when store changes)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const store = useProfileStore();

    // Create an adapter that implements AlternativeNamesSlice methods
    const adaptedStore: StoreState & AlternativeNamesSlice = {
      ...store,
      // Implement AlternativeNamesSlice methods that delegate to data point methods
      addAlternativeNames: () => store.addDataPointAlternativeNames(dataPointIndex),
      removeAlternativeNames: () => store.removeDataPointAlternativeNames(dataPointIndex),
      updateSLV1Name: (value) => store.updateDataPointSLV1Name(dataPointIndex, value),
      updateWorkName: (value) => store.updateDataPointWorkName(dataPointIndex, value),
      updateManufName: (value) => store.updateDataPointManufName(dataPointIndex, value),
      updateIec61850Name: (value) => store.updateDataPointIec61850Name(dataPointIndex, value),
      updateSarefName: (value) => store.updateDataPointSarefName(dataPointIndex, value),
      updateEebusName: (value) => store.updateDataPointEebusName(dataPointIndex, value),
      updateSunSpecName: (value) => store.updateDataPointSunSpecName(dataPointIndex, value),
      updateHpBwpName: (value) => store.updateDataPointHpBwpName(dataPointIndex, value),
      updateEn17609Name: (value) => store.updateDataPointEn17609Name(dataPointIndex, value),
    };

    return selector(adaptedStore);
  };
}

/**
 * Wrapper component that adapts the shared AlternativeNamesForm for use with data points
 * It creates a store adapter that implements AlternativeNamesSlice for a specific data point index
 */
export function DataPointAlternativeNamesForm({
  dataPointIndex,
}: DataPointAlternativeNamesFormProps) {
  // Create a hook function that provides an adapted store with AlternativeNamesSlice for this data point
  const useAdaptedStore = useDataPointStoreAdapter(dataPointIndex);

  return (
    <AlternativeNamesForm
      useStore={useAdaptedStore}
      useValidation={useProfileValidation}
      stateSelector={(store) => ({
        alternativeNames:
          store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint
            ?.alternativeNames,
      })}
      isAddedSelector={(store) =>
        !!store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint
          ?.alternativeNames
      }
      fieldPathPrefix={`dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.alternativeNames`}
      required={false}
      title="Alternative Names"
      description="Alternative naming conventions for this data point"
      nested={true}
    />
  );
}
