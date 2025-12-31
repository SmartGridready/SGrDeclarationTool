import { useRef } from "react";

/**
 * Creates a useStore adapter that wraps a slice object.
 * This is useful when you have a slice instance and need to pass it to a component
 * that expects a useStore hook.
 *
 * @example
 * const useDataPointStore = createSliceAdapter(dataPointSlice);
 * <DataPointBaseForm useStore={useDataPointStore} ... />
 */
export function createSliceAdapter<TSlice>(slice: TSlice) {
  return <TSelected>(selector: (store: TSlice) => TSelected): TSelected => {
    return selector(slice);
  };
}

/**
 * Creates a useStore adapter for Device forms that combines device state and actions.
 * This is the standard pattern for connecting Device-specific forms to shared form components.
 *
 * @example
 * const useStore = createDeviceStoreAdapter(device, deviceInformationActions);
 * <SharedAlternativeNamesForm useStore={useStore} ... />
 */
export function createDeviceStoreAdapter<TActions>(
  device: import("@/models").DeviceFrame | undefined,
  actions: TActions
) {
  return <TSelected>(
    selector: (store: { device?: import("@/models").DeviceFrame } & TActions) => TSelected
  ): TSelected => {
    const adaptedStore = { device, ...actions } as {
      device?: import("@/models").DeviceFrame;
    } & TActions;
    return selector(adaptedStore);
  };
}

/**
 * Creates a useStore adapter for FunctionalProfile forms that combines profile state and actions.
 * This is the standard pattern for connecting FunctionalProfile-specific forms to shared form components.
 *
 * @example
 * const useStore = createProfileStoreAdapter(profile, alternativeNamesActions);
 * <SharedAlternativeNamesForm useStore={useStore} ... />
 */
export function createProfileStoreAdapter<TActions>(
  profile: import("@/models").FunctionalProfileFrame | undefined,
  actions: TActions
) {
  return <TSelected>(
    selector: (store: { profile?: import("@/models").FunctionalProfileFrame } & TActions) => TSelected
  ): TSelected => {
    const adaptedStore = {
      profile,
      ...actions,
    } as { profile?: import("@/models").FunctionalProfileFrame } & TActions;
    return selector(adaptedStore);
  };
}

/**
 * Shallow comparison for objects (one level deep)
 */
function shallowEqual<T extends Record<string, unknown>>(objA: T, objB: T): boolean {
  if (objA === objB) return true;
  if (!objA || !objB) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (objA[key] !== objB[key]) return false;
  }

  return true;
}

export function useFormSection<
  TStoreState,
  TState extends Record<string, unknown>,
  TActions extends Record<string, unknown>,
>(config: {
  /**
   * Store hook function (e.g., useProfileStore, useDeviceStore)
   * Should accept a selector function and return the selected value
   */
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  /**
   * Validation hook function that returns an object with getError method
   * getError should accept a field path and return an error message or undefined
   */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  /**
   * Selector function to get state from the store
   * State values are compared shallowly to prevent unnecessary re-renders
   */
  stateSelector: (store: TStoreState) => TState;
  /**
   * Selector function to get actions from the store
   * Actions are functions and are stable, so no comparison is needed
   */
  actionsSelector: (store: TStoreState) => TActions;
  /**
   * Optional selector to determine if the section is added
   */
  isAddedSelector?: (store: TStoreState) => boolean;
  /**
   * Optional add handler - will be called when section should be added
   * If not provided, handleAdd will be undefined
   */
  onAdd?: (actions: TActions) => void;
  /**
   * Optional remove handler - will be called when section should be removed
   * If not provided, handleRemove will be undefined
   */
  onRemove?: (actions: TActions) => void;
}) {
  // Store selector refs to always use the latest version
  const stateSelectorRef = useRef(config.stateSelector);
  stateSelectorRef.current = config.stateSelector;

  const actionsSelectorRef = useRef(config.actionsSelector);
  actionsSelectorRef.current = config.actionsSelector;

  const isAddedSelectorRef = useRef(config.isAddedSelector);
  isAddedSelectorRef.current = config.isAddedSelector;

  // Caches for results
  const stateCache = useRef<TState | null>(null);
  const actionsCache = useRef<TActions | null>(null);

  // Create stable selector functions that never change reference
  const stableStateSelector = useRef((store: TStoreState): TState => {
    const newState = stateSelectorRef.current(store);
    if (stateCache.current && shallowEqual(stateCache.current, newState)) {
      return stateCache.current;
    }
    stateCache.current = newState;
    return newState;
  }).current;

  const stableActionsSelector = useRef((store: TStoreState): TActions => {
    const newActions = actionsSelectorRef.current(store);
    if (actionsCache.current && shallowEqual(actionsCache.current, newActions)) {
      return actionsCache.current;
    }
    actionsCache.current = newActions;
    return newActions;
  }).current;

  const stableIsAddedSelector = useRef((store: TStoreState): boolean => {
    return isAddedSelectorRef.current?.(store) ?? false;
  }).current;

  // Use stable selectors with the store
  const state = config.useStore(stableStateSelector);
  const actions = config.useStore(stableActionsSelector);
  const isAddedValue = config.useStore(config.isAddedSelector ? stableIsAddedSelector : () => false);
  const isAdded = config.isAddedSelector ? isAddedValue : false;

  const { getError } = config.useValidation();

  const handleAdd = config.onAdd
    ? () => {
        if (config.onAdd) {
          config.onAdd(actions);
        }
      }
    : undefined;

  const handleRemove = config.onRemove
    ? () => {
        if (config.onRemove) {
          config.onRemove(actions);
        }
      }
    : undefined;

  return {
    state,
    actions,
    isAdded,
    getError,
    handleAdd,
    handleRemove,
  };
}
