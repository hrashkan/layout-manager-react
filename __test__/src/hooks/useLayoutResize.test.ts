import React, { useEffect, useState } from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";
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

type Exposed = {
  handleResize: (
    id: string,
    delta: number,
    dir: "horizontal" | "vertical"
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

beforeEach(() => {
  Object.defineProperty(window, "innerWidth", { writable: true, value: 1000 });
  Object.defineProperty(window, "innerHeight", { writable: true, value: 800 });
});

describe("useLayoutResize", () => {
  it("resizes horizontally and preserves total flex", () => {
    let api: Exposed | null = null;
    render(React.createElement(Harness, { initial: mkRowModel(), onExpose: (e: Exposed) => (api = e) }));

    const before = (api as any).getModel();
    const left = before.layout.children![0];

    act(() => {
      (api as any).handleResize(left.id, 100, "horizontal");
    });

    const after = (api as any).getModel();
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
    render(React.createElement(Harness, { initial: mkColumnModel(), onExpose: (e: Exposed) => (api = e) }));

    const before = (api as any).getModel();
    const top = before.layout.children![0];

    act(() => {
      (api as any).handleResize(top.id, 200, "vertical");
    });

    const after = (api as any).getModel();
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
    Object.defineProperty(window, "innerWidth", { writable: true, value: 400 });

    let api: Exposed | null = null;
    render(React.createElement(Harness, { initial: mkRowModel(), onExpose: (e: Exposed) => (api = e) }));

    const before = (api as any).getModel();
    const left = before.layout.children![0];

    act(() => {
      (api as any).handleResize(left.id, -150, "horizontal");
    });

    const after = (api as any).getModel();
    const row = after.layout;
    const leftAfter = row.children![0];
    const rightAfter = row.children![1];

    expect(leftAfter.flex).toBeCloseTo(0.25, 6);
    expect(rightAfter.flex).toBeCloseTo(0.75, 6);
  });

  it("uses initial reference on repeated resize until reset is called", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1000,
    });

    let api: Exposed | null = null;
    render(React.createElement(Harness, { initial: mkRowModel(), onExpose: (e: Exposed) => (api = e) }));

    const before = (api as any).getModel();
    const left = before.layout.children![0];

    act(() => {
      (api as any).handleResize(left.id, 100, "horizontal");
    });

    act(() => {
      (api as any).handleResize(left.id, 50, "horizontal");
    });

    let after = (api as any).getModel();
    let row = after.layout;
    expect(row.children![0].flex).toBeCloseTo(0.55, 6);
    expect(row.children![1].flex).toBeCloseTo(0.45, 6);

    act(() => {
      (api as any).resetResize(left.id, "horizontal");
      (api as any).handleResize(left.id, 50, "horizontal");
    });

    after = (api as any).getModel();
    row = after.layout;
    expect(row.children![0].flex).toBeCloseTo(0.6, 6);
    expect(row.children![1].flex).toBeCloseTo(0.4, 6);
  });
});

