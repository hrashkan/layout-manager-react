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
  private lastSavedString: string | null = null;
  private isAvailable: boolean;

  constructor(options: StorageOptions = {}) {
    this.storageKey = `${STORAGE_PREFIX}-${options.key || "default"}`;
    this.autoSave = options.autoSave !== false;
    this.debounceMs = options.debounceMs || 500;
    this.isAvailable = isLocalStorageAvailable();
  }

  save(model: LayoutModel): void {
    if (!this.isAvailable) return;
    try {
      const serialized = JSON.stringify(model);
      if (serialized === this.lastSavedString) return;
      localStorage.setItem(this.storageKey, serialized);
      this.lastSavedString = serialized;
    } catch (error) {}
  }

  load(): LayoutModel | null {
    if (!this.isAvailable) return null;
    try {
      const serialized = localStorage.getItem(this.storageKey);
      if (serialized) {
        this.lastSavedString = serialized;
        return JSON.parse(serialized) as LayoutModel;
      }
    } catch (error) {}
    return null;
  }

  clear(): void {
    if (!this.isAvailable) return;
    try {
      localStorage.removeItem(this.storageKey);
      this.lastSavedString = null;
    } catch (error) {}
  }

  exists(): boolean {
    if (!this.isAvailable) return false;
    return localStorage.getItem(this.storageKey) !== null;
  }

  debouncedSave(model: LayoutModel): void {
    if (!this.autoSave) return;
    if (!this.isAvailable) return;

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

  cancel(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
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
