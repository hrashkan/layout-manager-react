import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import * as storageUtils from "../../../src/utils/storageUtils";
import type { LayoutModel } from "../../../src/types";

const mkModel = (n = 1): LayoutModel => ({
  global: { splitterSize: 8, direction: "ltr" },
  layout: { id: `root-${n}`, type: "row", children: [] },
});

describe("LayoutStorage", () => {
  const originalLocalStorage = globalThis.localStorage;

  beforeEach(() => {
    // Fresh in-memory localStorage mock per test
    let store: Record<string, string> = {};
    const mock = {
      getItem: vi.fn((k: string) => (k in store ? store[k] : null)),
      setItem: vi.fn((k: string, v: string) => {
        store[k] = v;
      }),
      removeItem: vi.fn((k: string) => {
        delete store[k];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
    // @ts-expect-error: override for tests
    globalThis.localStorage = mock;
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    globalThis.localStorage = originalLocalStorage;
  });

  it("uses prefixed key and saves/loads model", () => {
    const ls = new storageUtils.LayoutStorage({ key: "demo" });
    const model = mkModel(1);
    ls.save(model);
    const key = ls.getStorageKey();
    expect(key).toMatch(/^react-flex-layout-demo$/);
    expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(model)
    );
    expect(ls.exists()).toBe(true);
    const loaded = ls.load();
    expect(loaded).toEqual(model);
  });

  it("deduplicates identical saves to avoid redundant writes", () => {
    const ls = new storageUtils.LayoutStorage({ key: "dupe" });
    (globalThis.localStorage.setItem as any).mockClear();
    const model = mkModel(2);
    ls.save(model);
    ls.save(model);
    expect((globalThis.localStorage.setItem as any).mock.calls.length).toBe(1);
    // mutate and save again -> should write
    const changed = { ...model, layout: { ...model.layout, id: "changed" } };
    ls.save(changed as LayoutModel);
    expect((globalThis.localStorage.setItem as any).mock.calls.length).toBe(2);
  });

  it("clear() removes item and resets dedup cache", () => {
    const ls = new storageUtils.LayoutStorage({ key: "clr" });
    (globalThis.localStorage.setItem as any).mockClear();
    const model = mkModel(3);
    ls.save(model);
    ls.clear();
    expect(globalThis.localStorage.removeItem).toHaveBeenCalledWith(
      ls.getStorageKey()
    );
    // after clear, same model save should write again
    ls.save(model);
    expect((globalThis.localStorage.setItem as any).mock.calls.length).toBe(2);
  });

  it("load() returns null on parse error and does not throw", () => {
    const key = "react-flex-layout-bad";
    (globalThis.localStorage.setItem as any).mockImplementationOnce(
      (k: string, v: string) => {
        // store bad JSON directly
        (globalThis.localStorage as any).__store =
          (globalThis.localStorage as any).__store || {};
        (globalThis.localStorage as any).__store[k] = "{bad json";
      }
    );
    // write something bad
    (globalThis.localStorage as any).getItem = vi.fn((k: string) => {
      return (globalThis.localStorage as any).__store?.[k] ?? null;
    });
    (globalThis.localStorage as any).setItem(key, "ignored");
    vi.spyOn(storageUtils, "isLocalStorageAvailable").mockReturnValue(true);
    const ls = new storageUtils.LayoutStorage({ key: "bad" });
    // override key for this test
    (ls as any).storageKey = key;
    expect(ls.load()).toBeNull();
  });

  it("debouncedSave() defers writes and collapses bursts to one write", async () => {
    vi.useFakeTimers();
    const ls = new storageUtils.LayoutStorage({ key: "deb", debounceMs: 200 });
    (globalThis.localStorage.setItem as any).mockClear();
    const model1 = mkModel(1);
    const model2 = mkModel(2);
    ls.debouncedSave(model1);
    ls.debouncedSave(model2);
    // should not write yet
    expect(globalThis.localStorage.setItem).not.toHaveBeenCalled();
    vi.advanceTimersByTime(199);
    expect(globalThis.localStorage.setItem).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(globalThis.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect((globalThis.localStorage.setItem as any).mock.calls[0][1]).toBe(
      JSON.stringify(model2)
    );
  });

  it("debouncedSave() no-ops when autoSave=false", () => {
    vi.useFakeTimers();
    const ls = new storageUtils.LayoutStorage({
      key: "noauto",
      autoSave: false,
    });
    (globalThis.localStorage.setItem as any).mockClear();
    ls.debouncedSave(mkModel());
    vi.runAllTimers();
    expect(globalThis.localStorage.setItem).not.toHaveBeenCalled();
  });

  it("respects isLocalStorageAvailable=false (skips IO)", () => {
    // Force availability check to fail by throwing in setItem
    (globalThis.localStorage.setItem as any).mockImplementation(() => {
      throw new Error("no-storage");
    });
    (globalThis.localStorage.removeItem as any).mockImplementation(() => {
      throw new Error("no-storage");
    });
    const ls = new storageUtils.LayoutStorage({ key: "x" });
    // clear calls incurred during availability probe
    (globalThis.localStorage.setItem as any).mockClear();
    (globalThis.localStorage.removeItem as any).mockClear();
    ls.save(mkModel());
    expect(globalThis.localStorage.setItem).not.toHaveBeenCalled();
    expect(ls.load()).toBeNull();
    expect(ls.exists()).toBe(false);
    ls.clear();
    expect(globalThis.localStorage.removeItem).not.toHaveBeenCalled();
  });

  it("cancel() stops a pending debounced write", () => {
    vi.useFakeTimers();
    const ls = new storageUtils.LayoutStorage({
      key: "cancel",
      debounceMs: 100,
    });
    (globalThis.localStorage.setItem as any).mockClear();
    ls.debouncedSave(mkModel());
    ls.cancel();
    vi.runAllTimers();
    expect(globalThis.localStorage.setItem).not.toHaveBeenCalled();
  });

  it("load() returns null when key missing", () => {
    const ls = new storageUtils.LayoutStorage({ key: "missing" });
    expect(ls.load()).toBeNull();
    expect(ls.exists()).toBe(false);
  });

  it("uses defaults when options omitted (key=default, autoSave=true, debounceMs=500)", () => {
    const ls = new storageUtils.LayoutStorage();
    expect(ls.getStorageKey()).toBe("react-flex-layout-default");
    expect(ls.isAutoSaveEnabled()).toBe(true);
    // debounced default 500ms
    vi.useFakeTimers();
    (globalThis.localStorage.setItem as any).mockClear();
    ls.debouncedSave(mkModel());
    vi.advanceTimersByTime(499);
    expect(globalThis.localStorage.setItem).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(globalThis.localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("createLayoutStorage returns a working instance", () => {
    const ls = storageUtils.createLayoutStorage({ key: "factory" });
    expect(ls.getStorageKey()).toBe("react-flex-layout-factory");
    ls.save(mkModel());
    expect(ls.exists()).toBe(true);
  });

  it("exists() is false before save and false after clear", () => {
    const ls = new storageUtils.LayoutStorage({ key: "exists" });
    expect(ls.exists()).toBe(false);
    ls.save(mkModel());
    expect(ls.exists()).toBe(true);
    ls.clear();
    expect(ls.exists()).toBe(false);
  });

  it("load() primes the dedup cache so an immediate save with same content does not write", () => {
    const ls = new storageUtils.LayoutStorage({ key: "prime" });
    const model = mkModel();
    // Seed storage manually
    const key = ls.getStorageKey();
    (globalThis.localStorage.setItem as any).mockClear();
    (globalThis.localStorage as any).setItem(key, JSON.stringify(model));
    // Load should set lastSavedString internally
    const loaded = ls.load();
    expect(loaded).toEqual(model);
    // Now saving identical model should not call setItem again
    (globalThis.localStorage.setItem as any).mockClear();
    ls.save(model);
    expect(globalThis.localStorage.setItem).not.toHaveBeenCalled();
  });

  it("saving with modified global triggers write", () => {
    const ls = new storageUtils.LayoutStorage({ key: "global-change" });
    const model = mkModel();
    ls.save(model);
    (globalThis.localStorage.setItem as any).mockClear();
    const changed: LayoutModel = {
      ...model,
      global: { ...model.global, splitterSize: 10 },
    };
    ls.save(changed);
    expect(globalThis.localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("debouncedSave also no-ops when storage unavailable", () => {
    (globalThis.localStorage.setItem as any).mockImplementation(() => {
      throw new Error("no-storage");
    });
    const ls = new storageUtils.LayoutStorage({ key: "deb-unavail" });
    (globalThis.localStorage.setItem as any).mockClear();
    vi.useFakeTimers();
    ls.debouncedSave(mkModel());
    vi.runAllTimers();
    expect(globalThis.localStorage.setItem).not.toHaveBeenCalled();
  });
});
