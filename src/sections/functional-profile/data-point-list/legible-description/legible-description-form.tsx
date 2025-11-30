import { LegibleDescriptionForm } from "@/sections/shared/sections/legible-description/legible-description-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";
import { LegibleDescriptionSlice } from "@/sections/shared/sections/legible-description/legible-description-slice";
import { StoreState } from "@/sections/functional-profile/functional-profile-store";

interface DataPointLegibleDescriptionFormProps {
  dataPointIndex: number;
}

/**
 * Custom hook that creates an adapted store hook for a specific data point
 * This hook returns a function that can be used as a store hook
 */
function useDataPointStoreAdapter(dataPointIndex: number) {
  return <TSelected,>(selector: (store: StoreState & LegibleDescriptionSlice) => TSelected) => {
    // Get the current store state (this will cause re-renders when store changes)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const store = useProfileStore();

    // Create an adapter that implements LegibleDescriptionSlice methods
    const adaptedStore: StoreState & LegibleDescriptionSlice = {
      ...store,
      // Implement LegibleDescriptionSlice methods that delegate to data point methods
      addLegibleDescription: (legibleDescription) => {
        // Add the provided legible description
        const dp = store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex];
        if (dp) {
          const list = dp.dataPoint.legibleDescription || [];
          if (list.length < 4) {
            list.push(legibleDescription);
            dp.dataPoint.legibleDescription = list;
          }
        }
      },
      removeLegibleDescription: (index) =>
        store.removeDataPointLegibleDescription(dataPointIndex, index),
      removeAllLegibleDescriptions: () =>
        store.removeAllDataPointLegibleDescriptions(dataPointIndex),
      updateTextElement: (index, textElement) =>
        store.updateDataPointLegibleDescriptionText(dataPointIndex, index, textElement),
      updateLanguage: (index, language) =>
        store.updateDataPointLegibleDescriptionLanguage(dataPointIndex, index, language),
      updateUri: (index, uri) =>
        store.updateDataPointLegibleDescriptionUri(dataPointIndex, index, uri),
      addEmptyLegibleDescription: () => store.addDataPointLegibleDescription(dataPointIndex),
    };

    return selector(adaptedStore);
  };
}

/**
 * Wrapper component that adapts the shared LegibleDescriptionForm for use with data points
 * It creates a store adapter that implements LegibleDescriptionSlice for a specific data point index
 */
export function DataPointLegibleDescriptionForm({
  dataPointIndex,
}: DataPointLegibleDescriptionFormProps) {
  // Create a hook function that provides an adapted store with LegibleDescriptionSlice for this data point
  const useAdaptedStore = useDataPointStoreAdapter(dataPointIndex);

  return (
    <LegibleDescriptionForm
      useStore={useAdaptedStore}
      useValidation={useProfileValidation}
      stateSelector={(store) => ({
        legibleDescriptions:
          store.profile?.dataPointList?.dataPointListElement?.[dataPointIndex]?.dataPoint
            ?.legibleDescription,
      })}
      fieldPathPrefix={`dataPointList.dataPointListElement.${dataPointIndex}.dataPoint.legibleDescription`}
      required={false}
      title="Legible Description"
      description="Human-readable descriptions for this data point (max 4)"
      nested={true}
      maxItems={4}
    />
  );
}
