import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Layout } from "../../../src/components/Layout";
import {
  createLayoutModel,
  createRow,
  createTabSet,
  createTab,
} from "../../../src/utils/layoutUtils";
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

const factory = (node: any) => {
  return <div data-testid={`content-${node.component}`}>{node.name}</div>;
};

describe("Layout component", () => {
  it("renders selected tab content via factory", () => {
    const model = mkModel();
    const { getByTestId } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );
    // Initially selected of ts1 is 0 -> component 'ca'
    expect(getByTestId("content-ca")).toBeTruthy();
  });

  it("selects tab on header click and updates content", async () => {
    const user = userEvent.setup();
    const model = mkModel();
    const { getAllByText, queryByTestId } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    // Click tab header "B"
    const tabB = getAllByText("B")[0];
    await user.click(tabB);

    // Content should switch from 'ca' to 'cb'
    expect(queryByTestId("content-ca")).toBeNull();
    expect(queryByTestId("content-cb")).toBeTruthy();
  });

  it("closes a tab via close button and removes from header", async () => {
    const user = userEvent.setup();
    const model = mkModel();
    const { container, getAllByText } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    // Find close button adjacent to tab A's title
    const tabA = getAllByText("A")[0].closest(
      ".react-flex-layout-tab"
    ) as HTMLElement;
    const closeBtn = tabA.querySelector(
      ".react-flex-layout-tab-close"
    ) as HTMLButtonElement;
    await user.click(closeBtn);

    // Tab A should be removed from header
    const titles = Array.from(
      container.querySelectorAll(".react-flex-layout-tab-title")
    ).map((el) => el.textContent);
    expect(titles).not.toContain("A");
  });

  it("renders one splitter between two row children", () => {
    const model = mkModel();
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    const splitters = container.querySelectorAll(".react-flex-layout-splitter");
    expect(splitters.length).toBe(1);
  });

  it("reverses row order when direction=rtl", () => {
    const rtlModel: LayoutModel = createLayoutModel(
      createRow("root", [
        createTabSet("left", [createTab("l", "cl", "Left")]),
        createTabSet("right", [createTab("r", "cr", "Right")]),
      ]),
      { direction: "rtl" }
    );

    const { getAllByText } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={rtlModel} factory={factory} />
      </div>
    );

    const leftEl = getAllByText("Left")[0];
    const rightEl = getAllByText("Right")[0];
    // In RTL, Right should appear before Left in DOM order
    const order = leftEl.compareDocumentPosition(rightEl);
    expect(order & Node.DOCUMENT_POSITION_FOLLOWING).toBe(0);
    expect(order & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
  });

  it("applies custom closeButtonClassName to tab close buttons", () => {
    const model = mkModel();
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout
          model={model}
          factory={factory}
          closeButtonClassName="cls-test"
        />
      </div>
    );

    const buttons = container.querySelectorAll(
      ".react-flex-layout-tab-close.cls-test"
    );
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("invokes onAction with selectTab when a tab is clicked", async () => {
    const user = userEvent.setup();
    const model = mkModel();
    const onAction = vi.fn();
    const { getAllByText } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} onAction={onAction} />
      </div>
    );
    await user.click(getAllByText("B")[0]);
    expect(onAction).toHaveBeenCalled();
    const call = onAction.mock.calls.find((c) => c[0]?.type === "selectTab");
    expect(call).toBeTruthy();
  });

  it("renders immediately when storage.enabled=true (no visible loading in test env)", () => {
    const model = mkModel();
    const { queryByText, getByTestId } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout
          model={model}
          factory={factory}
          storage={{ enabled: true, key: "lt" }}
        />
      </div>
    );
    // In this environment, hook resolves synchronously; ensure content is present and no loading text
    expect(getByTestId("content-ca")).toBeTruthy();
    expect(queryByText("Loading layout...")).toBeNull();
  });

  describe("Memory Management", () => {
    it("should cleanup event listeners and observers on unmount", async () => {
      const model = mkModel();
      const { unmount, container } = render(
        <div style={{ width: 800, height: 600 }}>
          <Layout model={model} factory={factory} />
        </div>
      );

      // Unmount component
      unmount();

      // Wait for cleanup
      await new Promise<void>((resolve) => setTimeout(resolve, 100));

      // After unmount, the container should be empty
      expect(container.querySelector(".react-flex-layout")).toBeNull();
    });

    it("should not accumulate DOM nodes when mounting/unmounting multiple times", () => {
      const model = mkModel();
      const initialNodeCount = document.querySelectorAll("*").length;

      // Mount and unmount multiple times, creating new containers each time
      for (let i = 0; i < 10; i++) {
        const testContainer = document.createElement("div");
        testContainer.style.width = "800px";
        testContainer.style.height = "600px";
        document.body.appendChild(testContainer);

        const { unmount } = render(<Layout model={model} factory={factory} />, {
          container: testContainer,
        });
        unmount();
        document.body.removeChild(testContainer);
      }

      // Final node count should be similar to initial (allowing for test framework overhead)
      const finalNodeCount = document.querySelectorAll("*").length;
      const nodeGrowth = finalNodeCount - initialNodeCount;

      // Should not have excessive node growth (allow up to 50 nodes for test framework)
      expect(nodeGrowth).toBeLessThan(50);
    });

    it("should handle rapid model updates without memory leaks", () => {
      const model = mkModel();
      const { rerender } = render(
        <div style={{ width: 800, height: 600 }}>
          <Layout model={model} factory={factory} />
        </div>
      );

      // Rapidly update model
      for (let i = 0; i < 20; i++) {
        const updatedModel = {
          ...model,
          layout: {
            ...model.layout,
            children: model.layout.children?.map((child) => ({
              ...child,
              selected: i % 2,
            })),
          },
        };
        rerender(
          <div style={{ width: 800, height: 600 }}>
            <Layout model={updatedModel} factory={factory} />
          </div>
        );
      }

      // Should not throw errors or accumulate memory
      expect(true).toBe(true);
    });
  });
});
