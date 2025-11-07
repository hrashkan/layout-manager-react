import React, { useEffect, useState } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";
import { useDragAndDrop } from "../../../src/hooks/useDragAndDrop";
import {
  createLayoutModel,
  createRow,
  createTabSet,
  createTab,
} from "../../../src/utils/layoutUtils";
import { findNodeById } from "../../../src/utils/layoutUtils";
import type { LayoutModel } from "../../../src/types";

function mkModel(): LayoutModel {
  return createLayoutModel(
    createRow("root", [
      createTabSet("ts1", [
        createTab("a", "ca", "A"),
        createTab("b", "cb", "B"),
      ]),
      createTabSet("ts2", [createTab("c", "cc", "C")]),
    ])
  );
}

type Exposed = ReturnType<typeof useDragAndDrop> & {
  getModel: () => LayoutModel;
};

function Harness({ onExpose }: { onExpose: (e: Exposed) => void }) {
  const [model, setModel] = useState<LayoutModel>(mkModel());
  const dnd = useDragAndDrop(model, setModel);
  useEffect(() => {
    onExpose({ ...dnd, getModel: () => model });
  }, [dnd, model, onExpose]);
  return null;
}

const mkDragEvent = () =>
  ({
    preventDefault: vi.fn(),
    dataTransfer: { dropEffect: "move" },
    currentTarget: {},
    target: {},
  } as unknown as React.DragEvent);

beforeEach(() => {
  vi.useRealTimers();
});

describe("useDragAndDrop", () => {
  it("sets draggedTab on start and clears on end", () => {
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, { onExpose: (e: Exposed) => (api = e) })
    );

    act(() => {
      (api as any).handleDragStart("ts1", 0);
    });
    expect((api as any).draggedTab).toEqual({ tabsetId: "ts1", tabIndex: 0 });

    act(() => {
      (api as any).handleDragEnd();
    });
    expect((api as any).draggedTab).toBeNull();
    expect((api as any).dragOverTabset).toBeNull();
    expect((api as any).dropTargetIndex).toBeNull();
  });

  it("updates drag over state with position and target index", () => {
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, { onExpose: (e: Exposed) => (api = e) })
    );

    const e = mkDragEvent();
    act(() => {
      (api as any).handleDragOver(e, "ts1", "tab", 1);
    });

    expect((api as any).dragOverTabset).toBe("ts1");
    expect((api as any).dropPosition).toBe("tab");
    expect((api as any).dropTargetIndex).toBe(1);
  });

  it("reorders tabs within the same tabset when dropping with dropPosition=tab", () => {
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, { onExpose: (e: Exposed) => (api = e) })
    );

    act(() => {
      (api as any).handleDragStart("ts1", 0);
    });

    const e = mkDragEvent();
    act(() => {
      (api as any).handleDragOver(e, "ts1", "tab", 1);
    });
    // ensure state updated
    expect((api as any).dropTargetIndex).toBe(1);
    act(() => {
      (api as any).handleDrop(e, "ts1");
    });

    const model = (api as any).getModel();
    const ts1 = (model.layout.children || [])[0];
    // Ensure 'a' moved after 'b'
    const ids = (ts1.children || []).map((c: any) => c.id);
    expect(ids[0]).toBe("b");
    expect(ids[1]).toBe("a");
  });

  it("no-op reordering when dropping at same index", () => {
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, { onExpose: (e: Exposed) => (api = e) })
    );
    const before = (api as any).getModel();
    const e = mkDragEvent();
    act(() => {
      (api as any).handleDragStart("ts1", 0);
      (api as any).handleDragOver(e, "ts1", "tab", 0);
      (api as any).handleDrop(e, "ts1");
    });
    const after = (api as any).getModel();
    const idsBefore = (before.layout.children[0].children || []).map(
      (c: any) => c.id
    );
    const idsAfter = (after.layout.children[0].children || []).map(
      (c: any) => c.id
    );
    expect(idsAfter).toEqual(idsBefore);
  });

  it("center drop on same tabset is ignored", () => {
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, { onExpose: (e: Exposed) => (api = e) })
    );
    const before = (api as any).getModel();
    const e = mkDragEvent();
    act(() => {
      (api as any).handleDragStart("ts1", 0);
      (api as any).handleDragOver(e, "ts1", "center");
      (api as any).handleDrop(e, "ts1");
    });
    const after = (api as any).getModel();
    const idsBefore = (before.layout.children[0].children || []).map(
      (c: any) => c.id
    );
    const idsAfter = (after.layout.children[0].children || []).map(
      (c: any) => c.id
    );
    expect(idsAfter).toEqual(idsBefore);
  });
  it("moves tab to another tabset on center drop", () => {
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, { onExpose: (e: Exposed) => (api = e) })
    );

    act(() => {
      (api as any).handleDragStart("ts1", 0);
    });

    const e = mkDragEvent();
    act(() => {
      (api as any).handleDragOver(e, "ts2", "center");
      (api as any).handleDrop(e, "ts2");
    });

    const model = (api as any).getModel();
    const ts1 = (model.layout.children || [])[0];
    const ts2 = (model.layout.children || [])[1];
    expect((ts1.children || []).some((c: any) => c.id === "a")).toBe(false);
    expect((ts2.children || []).some((c: any) => c.id === "a")).toBe(true);
  });

  it("splits left of target tabset when dropping with position=left", () => {
    vi.spyOn(Date, "now").mockReturnValue(111);
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, { onExpose: (e: Exposed) => (api = e) })
    );

    act(() => {
      (api as any).handleDragStart("ts1", 0);
    });

    const e = mkDragEvent();
    act(() => {
      (api as any).handleDragOver(e, "ts2", "left");
    });
    expect((api as any).dropPosition).toBe("left");
    act(() => {
      (api as any).handleDrop(e, "ts2");
    });

    const model = (api as any).getModel();
    const newId = `ts2-split-111`;
    expect(findNodeById(model.layout, newId)).toBeTruthy();
  });

  it("splits above target tabset when dropping with position=top", () => {
    vi.spyOn(Date, "now").mockReturnValue(222);
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, { onExpose: (e: Exposed) => (api = e) })
    );

    act(() => {
      (api as any).handleDragStart("ts1", 0);
    });

    const e = mkDragEvent();
    act(() => {
      (api as any).handleDragOver(e, "ts2", "top");
    });
    expect((api as any).dropPosition).toBe("top");
    act(() => {
      (api as any).handleDrop(e, "ts2");
    });

    const model = (api as any).getModel();
    const newId = `ts2-split-222`;
    expect(findNodeById(model.layout, newId)).toBeTruthy();
  });

  it("dragLeave clears state after timeout", () => {
    vi.useFakeTimers();
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, { onExpose: (e: Exposed) => (api = e) })
    );
    const e = mkDragEvent();
    (e as any).currentTarget = {};
    (e as any).target = (e as any).currentTarget;

    act(() => {
      (api as any).handleDragOver(e, "ts1", "center");
      (api as any).handleDragLeave(e);
    });

    expect((api as any).dragOverTabset).toBe("ts1");
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect((api as any).dragOverTabset).toBeNull();
    expect((api as any).dropTargetIndex).toBeNull();
  });
});
