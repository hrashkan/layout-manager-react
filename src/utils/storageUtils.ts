import { LayoutModel } from "../types";

const STORAGE_PREFIX = "react-flex-layout";

export interface StorageOptions {
  key?: string;
  autoSave?: boolean;
  debounceMs?: number;
}

export class LayoutStorage {
  private storageKey: string;
  private autoSave: boolean;
  private debounceMs: number;
  private saveTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(options: StorageOptions = {}) {
    this.storageKey = `${STORAGE_PREFIX}-${options.key || "default"}`;
    this.autoSave = options.autoSave !== false;
    this.debounceMs = options.debounceMs || 500;
  }

  save(model: LayoutModel): void {
    try {
      const serialized = JSON.stringify(model);
      localStorage.setItem(this.storageKey, serialized);
    } catch (error) {}
  }

  load(): LayoutModel | null {
    try {
      const serialized = localStorage.getItem(this.storageKey);
      if (serialized) {
        return JSON.parse(serialized) as LayoutModel;
      }
    } catch (error) {}
    return null;
  }

  clear(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {}
  }

  exists(): boolean {
    return localStorage.getItem(this.storageKey) !== null;
  }

  debouncedSave(model: LayoutModel): void {
    if (!this.autoSave) return;

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      this.save(model);
    }, this.debounceMs);
  }

  getStorageKey(): string {
    return this.storageKey;
  }

  isAutoSaveEnabled(): boolean {
    return this.autoSave;
  }
}

export const createLayoutStorage = (
  options?: StorageOptions
): LayoutStorage => {
  return new LayoutStorage(options);
};

export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};
