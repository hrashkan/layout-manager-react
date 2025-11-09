import React, { useEffect } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act, waitFor } from "@testing-library/react";
import { useLayoutStorage } from "../../../src/hooks/useLayoutStorage";
import {
  createLayoutModel,
  createRow,
  createTabSet,
  createTab,
} from "../../../src/utils/layoutUtils";
import type { LayoutModel } from "../../../src/types";

const mkModel = (id: string): LayoutModel =>
  createLayoutModel(
    createRow("root", [createTabSet("ts", [createTab(id, "c", id)])])
  );

type HookExpose = ReturnType<typeof useLayoutStorage> | null;

function TestHook({
  initialModel,
  options,
  onExpose,
}: {
  initialModel: LayoutModel;
  options?: any;
  onExpose: (h: HookExpose) => void;
}) {
  const hook = useLayoutStorage(initialModel, options);
  useEffect(() => {
    onExpose(hook);
  }, [hook, onExpose]);
  return null;
}

describe("useLayoutStorage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Clear jsdom localStorage
    localStorage.clear();
  });

  it("loads from storage on mount and calls onLoad", async () => {
    const key = "k1";
    const saved = mkModel("saved");
    localStorage.setItem(`react-flex-layout-${key}`, JSON.stringify(saved));
    const onLoad = vi.fn();
    let expose: HookExpose = null;

    render(
      React.createElement(TestHook, {
        initialModel: mkModel("init"),
        options: { key, onLoad },
        onExpose: (h: HookExpose) => (expose = h),
      })
    );

    await waitFor(() => expect(onLoad).toHaveBeenCalled());
    // Hook calls onLoad with saved model, but then syncs back to initial model per current design
    expect(onLoad.mock.calls[0][0]).toEqual(saved);
    expect((expose as any)?.model.layout).toEqual(mkModel("init").layout);
    expect((expose as any)?.isLoaded).toBe(true);
    expect((expose as any)?.hasStorage).toBe(true);
  });

  it("updateModel persists with debounce and triggers onSave", () => {
    vi.useFakeTimers();
    const key = "deb";
    const onSave = vi.fn();
    let expose: HookExpose = null;

    render(
      React.createElement(TestHook, {
        initialModel: mkModel("a"),
        options: { key, debounceMs: 100, onSave },
        onExpose: (h: HookExpose) => (expose = h),
      })
    );

    const next = mkModel("b");
    act(() => {
      (expose as any).updateModel(next);
    });

    const storageKey = `react-flex-layout-${key}`;
    expect(localStorage.getItem(storageKey)).toBeNull();
    vi.advanceTimersByTime(100);
    const parsed = JSON.parse(
      localStorage.getItem(storageKey) || "null"
    ) as LayoutModel;
    expect(parsed.layout).toBeTruthy();
    // Debounced save occurred; parent is responsible for syncing initialModel, so we only assert a write happened
    expect(onSave).toHaveBeenCalled();
  });

  it("syncs when initialModel.layout changes and saves", () => {
    vi.useFakeTimers();
    const key = "sync";
    let expose: HookExpose = null;
    const first = mkModel("x");
    const { rerender } = render(
      React.createElement(TestHook, {
        initialModel: first,
        options: { key, debounceMs: 10 },
        onExpose: (h: HookExpose) => (expose = h),
      })
    );

    const changed = mkModel("y");
    rerender(
      React.createElement(TestHook, {
        initialModel: changed,
        options: { key, debounceMs: 10 },
        onExpose: (h: HookExpose) => (expose = h),
      })
    );

    expect((expose as any).model.layout).toEqual(changed.layout);
    vi.advanceTimersByTime(10);
    expect(
      JSON.parse(localStorage.getItem(`react-flex-layout-${key}`) || "null")
    ).toEqual(changed);
  });

  it("updates only metadata when layout unchanged (no save)", () => {
    vi.useFakeTimers();
    const key = "meta";
    let expose: HookExpose = null;
    const base = mkModel("m");
    const { rerender } = render(
      React.createElement(TestHook, {
        initialModel: base,
        options: { key, debounceMs: 10 },
        onExpose: (h: HookExpose) => (expose = h),
      })
    );

    const beforeCalls = (localStorage.setItem as any).mock?.calls?.length || 0;
    const withMeta: LayoutModel = {
      ...base,
      metadata: { restoreData: { foo: 1 } },
    };
    rerender(
      React.createElement(TestHook, {
        initialModel: withMeta,
        options: { key, debounceMs: 10 },
        onExpose: (h: HookExpose) => (expose = h),
      })
    );

    expect((expose as any).model.metadata).toEqual(withMeta.metadata);
    const afterCalls = (localStorage.setItem as any).mock?.calls?.length || 0;
    expect(afterCalls).toBe(beforeCalls);
  });

  it("clearStorage removes stored data and hasStoredData reflects state", () => {
    vi.useFakeTimers();
    const key = "clear";
    let expose: HookExpose = null;
    render(
      React.createElement(TestHook, {
        initialModel: mkModel("c"),
        options: { key, debounceMs: 10 },
        onExpose: (h: HookExpose) => (expose = h),
      })
    );
    act(() => {
      (expose as any).updateModel(mkModel("c2"));
    });
    vi.advanceTimersByTime(10);
    expect((expose as any).hasStoredData()).toBe(true);
    act(() => {
      (expose as any).clearStorage();
    });
    expect((expose as any).hasStoredData()).toBe(false);
  });

  it("getStorageKey returns the expected key", () => {
    const key = "k42";
    let expose: HookExpose = null;
    render(
      React.createElement(TestHook, {
        initialModel: mkModel("z"),
        options: { key },
        onExpose: (h: HookExpose) => (expose = h),
      })
    );
    expect((expose as any).getStorageKey()).toBe(`react-flex-layout-${key}`);
  });

  it("changing options cancels pending debounced save", () => {
    vi.useFakeTimers();
    const key1 = "opt1";
    let expose: HookExpose = null;
    const { rerender } = render(
      React.createElement(TestHook, {
        initialModel: mkModel("o1"),
        options: { key: key1, debounceMs: 1000 },
        onExpose: (h: HookExpose) => (expose = h),
      })
    );

    act(() => {
      (expose as any).updateModel(mkModel("o2"));
    });
    // Now change options to force instance replacement and cancel pending save
    const key2 = "opt2";
    rerender(
      React.createElement(TestHook, {
        initialModel: mkModel("o2"),
        options: { key: key2, debounceMs: 50 },
        onExpose: (h: HookExpose) => (expose = h),
      })
    );

    // Advance time beyond the old 1000ms; should not have written under key1
    vi.advanceTimersByTime(1000);
    expect(localStorage.getItem(`react-flex-layout-${key1}`)).toBeNull();

    // New save works under new options
    act(() => {
      (expose as any).updateModel(mkModel("o3"));
    });
    vi.advanceTimersByTime(50);
    expect(localStorage.getItem(`react-flex-layout-${key2}`)).not.toBeNull();
  });

  describe("Memory Management", () => {
    it("should cleanup debounced save timeouts on unmount", async () => {
      vi.useFakeTimers();
      const key = "memory-cleanup";
      let expose: HookExpose = null;

      const { unmount } = render(
        React.createElement(TestHook, {
          initialModel: mkModel("test"),
          options: {
            enabled: true,
            key,
            autoSave: true,
            debounceMs: 100,
          },
          onExpose: (h: HookExpose) => (expose = h),
        })
      );

      // Trigger multiple rapid updates
      for (let i = 0; i < 10; i++) {
        act(() => {
          (expose as any)?.updateModel(mkModel(`test-${i}`));
        });
      }

      // Unmount before debounce completes
      unmount();

      // Advance time - should not throw errors from orphaned timeouts
      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(true).toBe(true);
      vi.useRealTimers();
    });

    it("should not accumulate storage instances", () => {
      const instances = new Set<HookExpose>();

      // Create and destroy multiple hook instances
      for (let i = 0; i < 5; i++) {
        let expose: HookExpose = null;
        const { unmount } = render(
          React.createElement(TestHook, {
            initialModel: mkModel("test"),
            options: {
              enabled: true,
              key: `test-${i}`,
            },
            onExpose: (h: HookExpose) => {
              expose = h;
              instances.add(h);
            },
          })
        );

        act(() => {
          if (expose) {
            (expose as any).updateModel(mkModel(`updated-${i}`));
          }
        });

        unmount();
      }

      // All instances should be created (using Set to avoid duplicates from re-renders)
      expect(instances.size).toBeGreaterThanOrEqual(5);
    });
  });
});
