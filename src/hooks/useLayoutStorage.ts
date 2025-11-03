import { useState, useEffect, useCallback, useRef } from "react";
import { LayoutModel } from "../types";
import { LayoutStorage, StorageOptions } from "../utils/storageUtils";

export interface UseLayoutStorageOptions extends StorageOptions {
  onLoad?: (model: LayoutModel) => void;
  onSave?: (model: LayoutModel) => void;
  onError?: (error: Error) => void;
}

export const useLayoutStorage = (
  initialModel: LayoutModel,
  options: UseLayoutStorageOptions = {}
) => {
  const { onLoad, onSave, onError, ...storageOptions } = options;

  const storageRef = useRef<LayoutStorage | null>(null);
  const [model, setModel] = useState<LayoutModel>(initialModel);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasStorage, setHasStorage] = useState(false);

  // Initialize storage
  useEffect(() => {
    storageRef.current = new LayoutStorage(storageOptions);
    setHasStorage(true);
  }, [storageOptions.key, storageOptions.autoSave, storageOptions.debounceMs]);

  // Load from storage on mount
  useEffect(() => {
    if (!storageRef.current || isLoaded) return;

    const savedModel = storageRef.current.load();
    if (savedModel) {
      setModel(savedModel);
      setIsLoaded(true);
      onLoad?.(savedModel);
    } else {
      setIsLoaded(true);
    }
  }, [isLoaded, onLoad]);

  // Save model when it changes
  const saveModel = useCallback(
    (newModel: LayoutModel) => {
      if (!storageRef.current) return;

      try {
        // For direction changes, save immediately without debounce to ensure UI updates
        if (storageRef.current.isAutoSaveEnabled()) {
          storageRef.current.debouncedSave(newModel);
        } else {
          storageRef.current.save(newModel);
        }
        onSave?.(newModel);
      } catch (error) {
        onError?.(error as Error);
      }
    },
    [onSave, onError]
  );

  // Update model and save
  const updateModel = useCallback(
    (newModel: LayoutModel) => {
      // Ensure we create a new object reference so React detects the change
      const modelUpdate: LayoutModel = { ...newModel };
      if (newModel.global) {
        modelUpdate.global = { ...newModel.global };
      }
      setModel(modelUpdate);
      saveModel(modelUpdate);
    },
    [saveModel]
  );

  // Clear storage
  const clearStorage = useCallback(() => {
    if (!storageRef.current) return;

    try {
      storageRef.current.clear();
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onError]);

  // Check if storage exists
  const hasStoredData = useCallback(() => {
    return storageRef.current?.exists() ?? false;
  }, []);

  // Get storage key
  const getStorageKey = useCallback(() => {
    return storageRef.current?.getStorageKey() ?? "";
  }, []);

  return {
    model,
    updateModel,
    clearStorage,
    hasStoredData,
    getStorageKey,
    isLoaded,
    hasStorage,
  };
};
