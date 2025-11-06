import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
    if (storageRef.current) {
      try {
        storageRef.current.cancel?.();
      } catch {}
    }
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

  const currentLayoutStr = useMemo(
    () => JSON.stringify(model.layout),
    [model.layout]
  );
  const initialLayoutStr = useMemo(
    () => JSON.stringify(initialModel.layout),
    [initialModel.layout]
  );
  const currentMetadataStr = useMemo(
    () => (model.metadata ? JSON.stringify(model.metadata) : undefined),
    [model.metadata]
  );
  const initialMetadataStr = useMemo(
    () =>
      initialModel.metadata ? JSON.stringify(initialModel.metadata) : undefined,
    [initialModel.metadata]
  );

  useEffect(() => {
    if (!isLoaded || !storageRef.current) return;

    if (
      prevLayoutRef.current !== initialLayoutStr &&
      currentLayoutStr !== initialLayoutStr
    ) {
      const modelUpdate: LayoutModel = { ...initialModel };
      if (initialModel.global) {
        modelUpdate.global = { ...initialModel.global };
      }
      setModel(modelUpdate);
      prevLayoutRef.current = initialLayoutStr;

      if (storageRef.current.isAutoSaveEnabled()) {
        storageRef.current.debouncedSave(modelUpdate);
      } else {
        storageRef.current.save(modelUpdate);
      }
      return;
    }

    if (initialModel.metadata && currentMetadataStr !== initialMetadataStr) {
      setModel((prev) => ({
        ...prev,
        metadata: initialModel.metadata,
      }));
    }
  }, [
    isLoaded,
    storageRef,
    initialModel,
    currentLayoutStr,
    initialLayoutStr,
    currentMetadataStr,
    initialMetadataStr,
  ]);

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
