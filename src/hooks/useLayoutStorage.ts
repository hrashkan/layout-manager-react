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

  useEffect(() => {
    storageRef.current = new LayoutStorage(storageOptions);
    setHasStorage(true);
  }, [storageOptions.key, storageOptions.autoSave, storageOptions.debounceMs]);

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

  const prevLayoutRef = useRef<string>();

  useEffect(() => {
    if (!isLoaded || !storageRef.current) return;

    const currentLayoutStr = JSON.stringify(model.layout);
    const newLayoutStr = JSON.stringify(initialModel.layout);

    if (
      prevLayoutRef.current !== newLayoutStr &&
      currentLayoutStr !== newLayoutStr
    ) {
      const modelUpdate: LayoutModel = { ...initialModel };
      if (initialModel.global) {
        modelUpdate.global = { ...initialModel.global };
      }
      setModel(modelUpdate);
      prevLayoutRef.current = newLayoutStr;

      if (storageRef.current.isAutoSaveEnabled()) {
        storageRef.current.debouncedSave(modelUpdate);
      } else {
        storageRef.current.save(modelUpdate);
      }
    } else if (
      initialModel.metadata &&
      JSON.stringify(model.metadata) !== JSON.stringify(initialModel.metadata)
    ) {
      setModel((prev) => ({
        ...prev,
        metadata: initialModel.metadata,
      }));
    }
  }, [initialModel, isLoaded, model.layout, model.metadata]);

  const saveModel = useCallback(
    (newModel: LayoutModel) => {
      if (!storageRef.current) return;

      try {
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

  const updateModel = useCallback(
    (newModel: LayoutModel) => {
      const modelUpdate: LayoutModel = { ...newModel };
      if (newModel.global) {
        modelUpdate.global = { ...newModel.global };
      }
      setModel(modelUpdate);
      saveModel(modelUpdate);
    },
    [saveModel]
  );

  const clearStorage = useCallback(() => {
    if (!storageRef.current) return;

    try {
      storageRef.current.clear();
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onError]);

  const hasStoredData = useCallback(() => {
    return storageRef.current?.exists() ?? false;
  }, []);

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
