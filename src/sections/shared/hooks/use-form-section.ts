import { useRef } from "react";
import {
  useProfileStore,
  type StoreState,
} from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/sections/shared/hooks/use-profile-validation";

/**
 * Shallow comparison for objects (one level deep)
 */
function shallowEqual<T extends Record<string, unknown>>(
  objA: T,
  objB: T
): boolean {
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
  TState extends Record<string, unknown>,
  TActions extends Record<string, unknown>,
>(config: {
  /**
   * Selector function to get state from the store
   * State values are compared shallowly to prevent unnecessary re-renders
   */
  stateSelector: (store: StoreState) => TState;
  /**
   * Selector function to get actions from the store
   * Actions are functions and are stable, so no comparison is needed
   */
  actionsSelector: (store: StoreState) => TActions;
  /**
   * Optional selector to determine if the section is added
   */
  isAddedSelector?: (store: StoreState) => boolean;
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
  const stableStateSelector = useRef((store: StoreState): TState => {
    const newState = stateSelectorRef.current(store);
    if (stateCache.current && shallowEqual(stateCache.current, newState)) {
      return stateCache.current;
    }
    stateCache.current = newState;
    return newState;
  }).current;

  const stableActionsSelector = useRef((store: StoreState): TActions => {
    const newActions = actionsSelectorRef.current(store);
    if (
      actionsCache.current &&
      shallowEqual(actionsCache.current, newActions)
    ) {
      return actionsCache.current;
    }
    actionsCache.current = newActions;
    return newActions;
  }).current;

  const stableIsAddedSelector = useRef((store: StoreState): boolean => {
    return isAddedSelectorRef.current?.(store) ?? false;
  }).current;

  // Use stable selectors with the store
  const state = useProfileStore(stableStateSelector);
  const actions = useProfileStore(stableActionsSelector);
  const isAdded = config.isAddedSelector
    ? useProfileStore(stableIsAddedSelector)
    : false;

  const { getError } = useProfileValidation();

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
