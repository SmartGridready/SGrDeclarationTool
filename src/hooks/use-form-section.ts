import { useRef } from "react";

/**
 * Creates a useStore adapter that wraps a slice object.
 */
export function createSliceAdapter<TSlice>(slice: TSlice) {
  return <TSelected>(selector: (store: TSlice) => TSelected): TSelected => {
    return selector(slice);
  };
}

/**
 * Creates a useStore adapter for Device forms combining state and actions.
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
 * Creates a useStore adapter for FunctionalProfile forms combining state and actions.
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
 * Shallow comparison for objects (one level deep).
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

/**
 * Hook for managing form sections with store integration and validation.
 * Provides optimized selectors with shallow comparison to prevent unnecessary re-renders.
 * @param config - Configuration object with store, validation, and selectors
 * @returns Object with state, actions, validation, and handlers
 */
export function useFormSection<
  TStoreState,
  TState extends Record<string, unknown>,
  TActions extends Record<string, unknown>,
>(config: {
  /** Store hook function that accepts a selector and returns the selected value. */
  useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
  /** Validation hook that returns an object with getError method. */
  useValidation: () => { getError: (fieldPath: string) => string | undefined };
  /** Selector to get state from the store. Values are compared shallowly. */
  stateSelector: (store: TStoreState) => TState;
  /** Selector to get actions from the store. Actions are stable references. */
  actionsSelector: (store: TStoreState) => TActions;
  /** Optional selector to determine if the section is added. */
  isAddedSelector?: (store: TStoreState) => boolean;
  /** Optional handler called when section should be added. */
  onAdd?: (actions: TActions) => void;
  /** Optional handler called when section should be removed. */
  onRemove?: (actions: TActions) => void;
}) {
  const stateSelectorRef = useRef(config.stateSelector);
  stateSelectorRef.current = config.stateSelector;

  const actionsSelectorRef = useRef(config.actionsSelector);
  actionsSelectorRef.current = config.actionsSelector;

  const isAddedSelectorRef = useRef(config.isAddedSelector);
  isAddedSelectorRef.current = config.isAddedSelector;

  const stateCache = useRef<TState | null>(null);
  const actionsCache = useRef<TActions | null>(null);

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
