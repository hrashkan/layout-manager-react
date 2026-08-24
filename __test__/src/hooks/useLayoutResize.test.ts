import React, { useEffect, useState } from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, act, cleanup } from "@testing-library/react";
import { useLayoutResize } from "../../../src/hooks/useLayoutResize";
import {
  createLayoutModel,
  createRow,
  createColumn,
} from "../../../src/utils/layoutUtils";
import type { LayoutModel } from "../../../src/types";

function mkRowModel(): LayoutModel {
  return createLayoutModel(
    createRow("root", [createColumn("left", []), createColumn("right", [])])
  );
}

function mkColumnModel(): LayoutModel {
  return createLayoutModel(
    createColumn("root", [createRow("top", []), createRow("bottom", [])])
  );
}

function mkThreeColumnModel(): LayoutModel {
  return createLayoutModel(
    createRow("root", [
      createColumn("left", []),
      createColumn("mid", []),
      createColumn("right", []),
    ])
  );
}

type Exposed = {
  handleResize: (
    id: string,
    delta: number,
    dir: "horizontal" | "vertical",
    pairSize?: number
  ) => void;
  resetResize: (id: string, dir: "horizontal" | "vertical") => void;
  getModel: () => LayoutModel;
};

function Harness({
  initial,
  onExpose,
}: {
  initial: LayoutModel;
  onExpose: (e: Exposed) => void;
}) {
  const [model, setModel] = useState<LayoutModel>(initial);
  const { handleResize, resetResize } = useLayoutResize(model, (m) =>
    setModel(m)
  );
  useEffect(() => {
    onExpose({ handleResize, resetResize, getModel: () => model });
  }, [handleResize, resetResize, model, onExpose]);
  return null;
}

function mountMeasureTargets(
  sizes: Record<string, { width: number; height: number }>
) {
  const nodes: HTMLElement[] = [];
  for (const [id, size] of Object.entries(sizes)) {
    const el = document.createElement("div");
    el.setAttribute("data-layout-id", id);
    el.getBoundingClientRect = () =>
      ({
        width: size.width,
        height: size.height,
        top: 0,
        left: 0,
        right: size.width,
        bottom: size.height,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }) as DOMRect;
    document.body.appendChild(el);
    nodes.push(el);
  }
  return () => {
    for (const el of nodes) {
      el.remove();
    }
  };
}

describe("useLayoutResize", () => {
  afterEach(() => {
    cleanup();
  });

  it("resizes horizontally and preserves total flex", () => {
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, {
        initial: mkRowModel(),
        onExpose: (e: Exposed) => (api = e),
      })
    );

    const before = (api as Exposed).getModel();
    const left = before.layout.children![0];

    act(() => {
      (api as Exposed).handleResize(left.id, 100, "horizontal", 1000);
    });

    const after = (api as Exposed).getModel();
    const row = after.layout;
    const leftAfter = row.children![0];
    const rightAfter = row.children![1];

    expect(
      Math.abs((leftAfter.flex || 0) + (rightAfter.flex || 0) - 1)
    ).toBeLessThan(1e-6);
    expect(leftAfter.flex).toBeCloseTo(0.6, 6);
    expect(rightAfter.flex).toBeCloseTo(0.4, 6);
  });

  it("resizes vertically and preserves total flex", () => {
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, {
        initial: mkColumnModel(),
        onExpose: (e: Exposed) => (api = e),
      })
    );

    const before = (api as Exposed).getModel();
    const top = before.layout.children![0];

    act(() => {
      (api as Exposed).handleResize(top.id, 200, "vertical", 800);
    });

    const after = (api as Exposed).getModel();
    const col = after.layout;
    const topAfter = col.children![0];
    const bottomAfter = col.children![1];

    expect(
      Math.abs((topAfter.flex || 0) + (bottomAfter.flex || 0) - 1)
    ).toBeLessThan(1e-6);
    expect(topAfter.flex).toBeCloseTo(0.75, 6);
    expect(bottomAfter.flex).toBeCloseTo(0.25, 6);
  });

  it("enforces minimum size clamp when shrinking too far", () => {
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, {
        initial: mkRowModel(),
        onExpose: (e: Exposed) => (api = e),
      })
    );

    const before = (api as Exposed).getModel();
    const left = before.layout.children![0];

    act(() => {
      (api as Exposed).handleResize(left.id, -150, "horizontal", 400);
    });

    const after = (api as Exposed).getModel();
    const row = after.layout;
    const leftAfter = row.children![0];
    const rightAfter = row.children![1];

    expect(leftAfter.flex).toBeCloseTo(0.25, 6);
    expect(rightAfter.flex).toBeCloseTo(0.75, 6);
  });

  it("uses node minWidth instead of the default floor", () => {
    const model = mkRowModel();
    model.layout.children![0].minWidth = 50;
    model.layout.children![1].minWidth = 50;

    let api: Exposed | null = null;
    render(
      React.createElement(Harness, {
        initial: model,
        onExpose: (e: Exposed) => (api = e),
      })
    );

    const left = (api as Exposed).getModel().layout.children![0];

    act(() => {
      (api as Exposed).handleResize(left.id, -180, "horizontal", 400);
    });

    const row = (api as Exposed).getModel().layout;
    expect(row.children![0].flex).toBeCloseTo(0.125, 6);
    expect(row.children![1].flex).toBeCloseTo(0.875, 6);
  });

  it("uses initial reference on repeated resize until reset is called", () => {
    let api: Exposed | null = null;
    render(
      React.createElement(Harness, {
        initial: mkRowModel(),
        onExpose: (e: Exposed) => (api = e),
      })
    );

    const before = (api as Exposed).getModel();
    const left = before.layout.children![0];

    act(() => {
      (api as Exposed).handleResize(left.id, 100, "horizontal", 1000);
    });

    act(() => {
      (api as Exposed).handleResize(left.id, 50, "horizontal", 1000);
    });

    let after = (api as Exposed).getModel();
    let row = after.layout;
    expect(row.children![0].flex).toBeCloseTo(0.55, 6);
    expect(row.children![1].flex).toBeCloseTo(0.45, 6);

    act(() => {
      (api as Exposed).resetResize(left.id, "horizontal");
      (api as Exposed).handleResize(left.id, 50, "horizontal", 1000);
    });

    after = (api as Exposed).getModel();
    row = after.layout;
    expect(row.children![0].flex).toBeCloseTo(0.6, 6);
    expect(row.children![1].flex).toBeCloseTo(0.4, 6);
  });

  it("measures adjacent panes instead of the viewport", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1000,
    });
    const unmountTargets = mountMeasureTargets({
      left: { width: 200, height: 400 },
      right: { width: 200, height: 400 },
    });

    let api: Exposed | null = null;
    render(
      React.createElement(Harness, {
        initial: mkRowModel(),
        onExpose: (e: Exposed) => (api = e),
      })
    );

    const left = (api as Exposed).getModel().layout.children![0];

    act(() => {
      (api as Exposed).handleResize(left.id, 100, "horizontal");
    });

    const row = (api as Exposed).getModel().layout;
    expect(row.children![0].flex).toBeCloseTo(0.75, 6);
    expect(row.children![1].flex).toBeCloseTo(0.25, 6);

    unmountTargets();
  });

  it("falls back to the parent pane when child measurements are missing", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1200,
    });
    const unmountTargets = mountMeasureTargets({
      root: { width: 600, height: 400 },
    });

    let api: Exposed | null = null;
    render(
      React.createElement(Harness, {
        initial: mkThreeColumnModel(),
        onExpose: (e: Exposed) => (api = e),
      })
    );

    const left = (api as Exposed).getModel().layout.children![0];

    act(() => {
      (api as Exposed).handleResize(left.id, 100, "horizontal");
    });

    const row = (api as Exposed).getModel().layout;
    const leftFlex = row.children![0].flex || 0;
    const midFlex = row.children![1].flex || 0;
    const rightFlex = row.children![2].flex || 0;

    expect(leftFlex + midFlex).toBeCloseTo(2 / 3, 6);
    expect(leftFlex).toBeCloseTo(0.5, 6);
    expect(midFlex).toBeCloseTo(1 / 6, 6);
    expect(rightFlex).toBeCloseTo(1 / 3, 6);

    unmountTargets();
  });
});
