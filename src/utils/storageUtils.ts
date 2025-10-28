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
  private saveTimeout: number | null = null;

  constructor(options: StorageOptions = {}) {
    this.storageKey = `${STORAGE_PREFIX}-${options.key || "default"}`;
    this.autoSave = options.autoSave !== false; // default to true
    this.debounceMs = options.debounceMs || 500; // 500ms debounce
  }

  /**
   * Save layout model to localStorage
   */
  save(model: LayoutModel): void {
    try {
      const serialized = JSON.stringify(model);
      localStorage.setItem(this.storageKey, serialized);
    } catch (error) {
      console.warn("Failed to save layout to localStorage:", error);
    }
  }

  /**
   * Load layout model from localStorage
   */
  load(): LayoutModel | null {
    try {
      const serialized = localStorage.getItem(this.storageKey);
      if (serialized) {
        return JSON.parse(serialized) as LayoutModel;
      }
    } catch (error) {
      console.warn("Failed to load layout from localStorage:", error);
    }
    return null;
  }

  /**
   * Clear saved layout from localStorage
   */
  clear(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.warn("Failed to clear layout from localStorage:", error);
    }
  }

  /**
   * Check if layout exists in localStorage
   */
  exists(): boolean {
    return localStorage.getItem(this.storageKey) !== null;
  }

  /**
   * Save with debouncing to avoid excessive writes
   */
  debouncedSave(model: LayoutModel): void {
    if (!this.autoSave) return;

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      this.save(model);
    }, this.debounceMs);
  }

  /**
   * Get storage key being used
   */
  getStorageKey(): string {
    return this.storageKey;
  }

  /**
   * Check if auto save is enabled
   */
  isAutoSaveEnabled(): boolean {
    return this.autoSave;
  }
}

/**
 * Create a layout storage instance
 */
export const createLayoutStorage = (
  options?: StorageOptions
): LayoutStorage => {
  return new LayoutStorage(options);
};

/**
 * Utility function to check if localStorage is available
 */
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
