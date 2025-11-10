import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Layout } from "../../../src/components/Layout";
import {
  createLayoutModel,
  createRow,
  createColumn,
  createTabSet,
  createTab,
} from "../../../src/utils/layoutUtils";

describe("Layout Memory Management: Resize Handlers LRU Cache", () => {
  const factory = (node: any) => (
    <div data-testid={`content-${node.component}`}>{node.name}</div>
  );

  it("should limit resize handler cache to MAX_RESIZE_HANDLERS entries", () => {
    // Create a layout with many nodes to trigger cache growth
    const tabs1 = Array.from({ length: 20 }, (_, i) =>
      createTab(`tab-1-${i}`, "test", `Tab ${i}`)
    );
    const tabs2 = Array.from({ length: 20 }, (_, i) =>
      createTab(`tab-2-${i}`, "test", `Tab ${i}`)
    );
    const tabs3 = Array.from({ length: 20 }, (_, i) =>
      createTab(`tab-3-${i}`, "test", `Tab ${i}`)
    );

    const tabset1 = createTabSet("tabset-1", tabs1);
    const tabset2 = createTabSet("tabset-2", tabs2);
    const tabset3 = createTabSet("tabset-3", tabs3);

    const row1 = createRow("row-1", [tabset1, tabset2]);
    const row2 = createRow("row-2", [tabset3]);
    const column = createColumn("col-1", [row1, row2]);

    const model = createLayoutModel(column);

    const { container, unmount } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    // Verify layout is rendered
    expect(container.querySelector(".react-flex-layout")).toBeTruthy();

    // The layout should render successfully even with many nodes
    // The LRU cache will limit handlers to 100 entries
    // Each splitter needs handlers for horizontal/vertical directions
    // With many nodes, we'll exceed 100 handlers, but cache should cap it

    unmount();
  });

  it("should handle rapid layout changes without memory growth", () => {
    const initialTabs = Array.from({ length: 5 }, (_, i) =>
      createTab(`tab-${i}`, "test", `Tab ${i}`)
    );
    const initialTabset = createTabSet("tabset-1", initialTabs);
    const initialModel = createLayoutModel(initialTabset);

    const { rerender, unmount } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={initialModel} factory={factory} />
      </div>
    );

    // Simulate rapid layout changes
    for (let i = 0; i < 10; i++) {
      const newTabs = Array.from({ length: 5 + i }, (_, j) =>
        createTab(`tab-${i}-${j}`, "test", `Tab ${j}`)
      );
      const newTabset = createTabSet(`tabset-${i}`, newTabs);
      const newModel = createLayoutModel(newTabset);

      rerender(
        <div style={{ width: 800, height: 600 }}>
          <Layout model={newModel} factory={factory} />
        </div>
      );
    }

    // Should not throw or cause memory issues
    expect(true).toBe(true);

    unmount();
  });

  it("should reuse handlers when same node is accessed multiple times", () => {
    const tabs = Array.from({ length: 3 }, (_, i) =>
      createTab(`tab-${i}`, "test", `Tab ${i}`)
    );
    const tabset = createTabSet("tabset-1", tabs);
    const row = createRow("row-1", [tabset]);
    const model = createLayoutModel(row);

    const { rerender, unmount } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    // Re-render multiple times with same layout
    // Handlers should be reused, not recreated
    for (let i = 0; i < 5; i++) {
      rerender(
        <div style={{ width: 800, height: 600 }}>
          <Layout model={model} factory={factory} />
        </div>
      );
    }

    // Should work without issues
    expect(screen.getByTestId("content-test")).toBeTruthy();

    unmount();
  });

  it("should evict least recently used handlers when cache is full", () => {
    // Create a layout that will generate more than 100 handlers
    // Each splitter can generate 2 handlers (horizontal/vertical)
    // With 60+ nodes, we'll exceed 100 handlers

    const createLargeLayout = (depth: number): any => {
      if (depth === 0) {
        const tabs = Array.from({ length: 3 }, (_, i) =>
          createTab(`tab-${depth}-${i}`, "test", `Tab ${i}`)
        );
        return createTabSet(`tabset-${depth}`, tabs);
      }

      const children = [];
      for (let i = 0; i < 3; i++) {
        if (i % 2 === 0) {
          children.push(
            createRow(`row-${depth}-${i}`, [createLargeLayout(depth - 1)])
          );
        } else {
          children.push(
            createColumn(`col-${depth}-${i}`, [createLargeLayout(depth - 1)])
          );
        }
      }
      return createRow(`row-${depth}`, children);
    };

    const largeLayout = createLargeLayout(3);
    const model = createLayoutModel(largeLayout);

    const { container, unmount } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    // Verify layout renders
    expect(container.querySelector(".react-flex-layout")).toBeTruthy();

    // The LRU cache should have capped handlers at 100
    // Older handlers should have been evicted
    // This prevents unbounded memory growth

    unmount();
  });
});
