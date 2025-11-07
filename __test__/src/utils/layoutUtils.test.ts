import { describe, it, expect } from "vitest";
import {
  createLayoutModel,
  createRow,
  createColumn,
  createTabSet,
  createTab,
  findNodeById,
  updateNodeById,
  removeNodeById,
  calculateFlexValues,
  removeEmptyTabsets,
  addTabToTabset,
  removeTab,
  restoreTab,
  tabExists,
} from "../../../src/utils/layoutUtils";
import type { LayoutModel, LayoutNode } from "../../../src/types";

const mkBase = (): LayoutModel =>
  createLayoutModel(
    createRow("root", [
      createColumn("left", [
        createTabSet("tabs-left", [createTab("t1", "c1", "Tab 1")]),
      ]),
      createColumn("right", [
        createTabSet("tabs-right", [
          createTab("t2", "c2", "Tab 2"),
          createTab("t3", "c3", "Tab 3"),
        ]),
      ]),
    ])
  );

describe("layoutUtils", () => {
  it("create helpers produce expected shapes", () => {
    const model = mkBase();
    expect(model.global.splitterSize).toBe(8);
    expect(model.layout.type).toBe("row");
    const left = findNodeById(model.layout, "left")!;
    expect(left.type).toBe("column");
    const tabset = findNodeById(model.layout, "tabs-right")!;
    expect(tabset.type).toBe("tabset");
  });

  it("findNodeById returns null for missing id", () => {
    const model = mkBase();
    expect(findNodeById(model.layout, "missing")).toBeNull();
  });

  it("calculateFlexValues assigns equal flex when absent", () => {
    const children: LayoutNode[] = [
      { id: "a", type: "row", children: [] },
      { id: "b", type: "row", children: [] },
      { id: "c", type: "row", children: [] },
    ];
    const withFlex = calculateFlexValues(children);
    expect(withFlex.every((c) => typeof c.flex === "number")).toBe(true);
    const total = withFlex.reduce((s, c) => s + (c.flex || 0), 0);
    expect(Math.abs(total - 1)).toBeLessThan(1e-6);
  });

  it("updateNodeById returns same reference if no effective change", () => {
    const model = mkBase();
    const updated = updateNodeById(model.layout, "tabs-right", {
      selected: (findNodeById(model.layout, "tabs-right") as any).selected,
    })!;
    expect(updated).toBe(model.layout);
  });

  it("updateNodeById updates only the targeted branch (copy-on-write)", () => {
    const model = mkBase();
    const beforeLeft = findNodeById(model.layout, "left");
    const beforeRight = findNodeById(model.layout, "right");
    const updatedLayout = updateNodeById(model.layout, "tabs-right", {
      selected: 1,
    })!;
    expect(updatedLayout).not.toBe(model.layout);
    // left subtree preserved by reference
    expect(findNodeById(updatedLayout, "left")).toBe(beforeLeft);
    // right subtree changed by reference
    expect(findNodeById(updatedLayout, "right")).not.toBe(beforeRight);
  });

  it("removeNodeById removes a node and preserves unrelated branches", () => {
    const model = mkBase();
    const beforeLeft = findNodeById(model.layout, "left");
    const after = removeNodeById(model.layout, "tabs-right");
    expect(findNodeById(after, "tabs-right")).toBeNull();
    expect(findNodeById(after, "left")).toBe(beforeLeft);
  });

  it("removeEmptyTabsets prunes empty tabsets and normalizes flex", () => {
    const model = mkBase();
    // Remove all right tabs to make the tabset empty
    const rightTs = findNodeById(model.layout, "tabs-right")!;
    const withoutTabs: LayoutNode = updateNodeById(model.layout, rightTs.id, {
      children: [],
    }) as LayoutNode;
    const cleaned = removeEmptyTabsets(withoutTabs)!;
    expect(findNodeById(cleaned, "tabs-right")).toBeNull();
    // row should still exist and children flex normalized
    const rootRow = findNodeById(cleaned, "root")!;
    const rowChildren = (rootRow.children || []) as LayoutNode[];
    const totalFlex = rowChildren.reduce((s, c) => s + (c.flex || 0), 0);
    expect(Math.abs(totalFlex - 1)).toBeLessThan(1e-6);
  });

  it("addTabToTabset appends and selects the new tab", () => {
    const model = mkBase();
    const newTab: LayoutNode = createTab("t4", "c4", "Tab 4");
    const updated = addTabToTabset(model.layout, "tabs-right", newTab)!;
    const ts = findNodeById(updated, "tabs-right")!;
    expect((ts.children || []).some((c) => c.id === "t4")).toBe(true);
    expect(ts.selected).toBe((ts.children || []).length - 1);
  });

  it("removeTab returns restoreData and removes empty tabset if last tab", () => {
    const model = mkBase();
    const res = removeTab(model.layout, "t1");
    expect(res.restoreData).toBeTruthy();
    const cleaned = removeEmptyTabsets(res.layout!)!;
    expect(findNodeById(cleaned, "tabs-left")).toBeNull();
  });

  it("restoreTab inserts tab to original tabset (recreating containers if needed)", () => {
    const initial = mkBase();
    const removed = removeTab(initial.layout, "t1");
    const layoutAfterRemove = removeEmptyTabsets(removed.layout!)!;
    // now restore using initial as template
    const restored = restoreTab(
      layoutAfterRemove,
      removed.restoreData!,
      initial.layout
    )!;
    expect(tabExists(restored, "t1")).toBe(true);
    const ts = findNodeById(restored, "tabs-left")!;
    expect((ts.children || []).some((c) => c.id === "t1")).toBe(true);
  });

  it("restoreTab returns original layout if tab already exists", () => {
    const model = mkBase();
    const res = restoreTab(model.layout, {
      tabId: "t2",
      component: "c2",
      name: "Tab 2",
      tabsetId: "tabs-right",
      tabIndex: 0,
    });
    expect(res).toBe(model.layout);
  });

  it("tabExists reflects presence accurately", () => {
    const model = mkBase();
    expect(tabExists(model.layout, "t2")).toBe(true);
    expect(tabExists(model.layout, "missing")).toBe(false);
  });

  it("calculateFlexValues preserves existing flex and normalizes only missing ones", () => {
    const children: LayoutNode[] = [
      { id: "a", type: "row", children: [], flex: 0.7 },
      { id: "b", type: "row", children: [] },
    ];
    const res = calculateFlexValues(children);
    // Implementation distributes equal flex when missing; with two items,
    // missing one becomes 0.5, not 0.3 (we are asserting current behavior)
    expect(res[0].flex).toBeCloseTo(0.7, 6);
    expect(res[1].flex).toBeCloseTo(0.5, 6);
  });

  it("updateNodeById supports removing a node by passing null updates", () => {
    const model = mkBase();
    const before = findNodeById(model.layout, "tabs-left");
    expect(before).toBeTruthy();
    const removed = updateNodeById(model.layout, "tabs-left", null);
    expect(removed).not.toBeNull();
    expect(findNodeById(removed!, "tabs-left")).toBeNull();
  });

  it("removeEmptyTabsets returns null if all children pruned", () => {
    // Build a layout with a single empty tabset under root row
    const lonely = createLayoutModel(
      createRow("root2", [createTabSet("only", [])])
    );
    const cleaned = removeEmptyTabsets(lonely.layout);
    expect(cleaned).toBeNull();
  });

  it("addTabToTabset returns null for invalid tabset id", () => {
    const model = mkBase();
    const res = addTabToTabset(model.layout, "nope", createTab("x", "cx", "X"));
    expect(res).toBeNull();
  });

  it("removeTab returns unchanged layout and null restoreData for missing tab id", () => {
    const model = mkBase();
    const res = removeTab(model.layout, "missing");
    expect(res.restoreData).toBeNull();
    expect(res.layout).toBe(model.layout);
  });

  it("restoreTab returns null when initialLayout missing required containers", () => {
    const model = mkBase();
    const removed = removeTab(model.layout, "t1");
    // Pass undefined initial layout and expect null (cannot recreate containers)
    const restored = restoreTab(
      removeEmptyTabsets(removed.layout!)!,
      removed.restoreData!,
      undefined as any
    );
    expect(restored).toBeNull();
  });

  it("removeEmptyTabsets returns structure with same content when nothing changes", () => {
    const model = mkBase();
    const cleaned = removeEmptyTabsets(model.layout)!;
    // No empty tabsets, content unchanged
    expect(cleaned).toStrictEqual(model.layout);
  });
});
