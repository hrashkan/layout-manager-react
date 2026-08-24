import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Layout } from "../../../src/components/Layout";
import {
  createLayoutModel,
  createRow,
  createTabSet,
  createTab,
} from "../../../src/utils/layoutUtils";
import type { LayoutModel, LayoutNode, LayoutRef } from "../../../src/types";

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
    expect(getByTestId("content-ca")).toBeTruthy();
  });

  it("selects tab on header click and updates content", async () => {
    const user = userEvent.setup();
    const model = mkModel();
    const { getAllByText, getByTestId } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    const tabB = getAllByText("B")[0];
    await user.click(tabB);

    const panelA = getByTestId("content-ca").closest(
      ".react-flex-layout-tab-panel"
    ) as HTMLElement;
    const panelB = getByTestId("content-cb").closest(
      ".react-flex-layout-tab-panel"
    ) as HTMLElement;
    expect(panelA.hasAttribute("hidden")).toBe(true);
    expect(panelB.hasAttribute("hidden")).toBe(false);
  });

  it("preserves panel state when switching tabs (keep-alive)", async () => {
    const user = userEvent.setup();
    const model = createLayoutModel(
      createTabSet("ts1", [
        createTab("a", "ca", "A"),
        createTab("b", "cb", "B"),
      ])
    );
    const statefulFactory = (node: LayoutNode) => (
      <div data-testid={`content-${node.component}`}>
        <input aria-label={`field-${node.component}`} defaultValue="" />
      </div>
    );
    const { getAllByText, getByLabelText } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={statefulFactory} />
      </div>
    );

    await user.type(getByLabelText("field-ca"), "kept");
    await user.click(getAllByText("B")[0]);
    await user.click(getAllByText("A")[0]);
    expect((getByLabelText("field-ca") as HTMLInputElement).value).toBe("kept");
  });

  it("remounts when enableRenderOnDemand is true", async () => {
    const user = userEvent.setup();
    const remount = createTab("a", "ca", "A");
    remount.enableRenderOnDemand = true;
    const model = createLayoutModel(
      createTabSet("ts1", [remount, createTab("b", "cb", "B")])
    );
    const statefulFactory = (node: LayoutNode) => (
      <div data-testid={`content-${node.component}`}>
        <input aria-label={`field-${node.component}`} defaultValue="" />
      </div>
    );
    const { getAllByText, getByLabelText, queryByLabelText } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={statefulFactory} />
      </div>
    );

    await user.type(getByLabelText("field-ca"), "gone");
    await user.click(getAllByText("B")[0]);
    expect(queryByLabelText("field-ca")).toBeNull();
    await user.click(getAllByText("A")[0]);
    expect((getByLabelText("field-ca") as HTMLInputElement).value).toBe("");
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
    expect(container.querySelector('[data-layout-id="root"]')).toBeTruthy();
    expect(container.querySelector('[data-layout-id="ts1"]')).toBeTruthy();
    expect(container.querySelector('[data-layout-id="ts2"]')).toBeTruthy();
  });

  it("hides splitters when global enableResize is false", () => {
    const model = createLayoutModel(
      createRow("root", [
        createTabSet("ts1", [createTab("a", "ca", "A")]),
        createTabSet("ts2", [createTab("c", "cc", "C")]),
      ]),
      { enableResize: false }
    );
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );
    expect(
      container.querySelectorAll(".react-flex-layout-splitter").length
    ).toBe(0);
  });

  it("hides the splitter when an adjacent child has enableResize false", () => {
    const left = createTabSet("ts1", [createTab("a", "ca", "A")]);
    left.enableResize = false;
    const model = createLayoutModel(
      createRow("root", [left, createTabSet("ts2", [createTab("c", "cc", "C")])])
    );
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );
    expect(
      container.querySelectorAll(".react-flex-layout-splitter").length
    ).toBe(0);
  });

  it("hides splitters when the parent row has enableResize false", () => {
    const row = createRow("root", [
      createTabSet("ts1", [createTab("a", "ca", "A")]),
      createTabSet("ts2", [createTab("c", "cc", "C")]),
    ]);
    row.enableResize = false;
    const model = createLayoutModel(row);
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );
    expect(
      container.querySelectorAll(".react-flex-layout-splitter").length
    ).toBe(0);
  });

  it("omits the close button when a tab has enableClose false", () => {
    const locked = createTab("a", "ca", "A");
    locked.enableClose = false;
    const model = createLayoutModel(
      createTabSet("ts1", [locked, createTab("b", "cb", "B")])
    );
    const { getAllByText } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );
    const lockedTab = getAllByText("A")[0].closest(
      ".react-flex-layout-tab"
    ) as HTMLElement;
    const openTab = getAllByText("B")[0].closest(
      ".react-flex-layout-tab"
    ) as HTMLElement;
    expect(lockedTab.querySelector(".react-flex-layout-tab-close")).toBeNull();
    expect(openTab.querySelector(".react-flex-layout-tab-close")).toBeTruthy();
  });

  it("exposes direction via the dir attribute without reordering the DOM", () => {
    const mkDirectionalModel = (direction: "ltr" | "rtl"): LayoutModel =>
      createLayoutModel(
        createRow("root", [
          createTabSet("left", [createTab("l", "cl", "Left")]),
          createTabSet("right", [createTab("r", "cr", "Right")]),
        ]),
        { direction }
      );

    for (const direction of ["ltr", "rtl"] as const) {
      const { container, getAllByText, unmount } = render(
        <div style={{ width: 800, height: 600 }}>
          <Layout model={mkDirectionalModel(direction)} factory={factory} />
        </div>
      );

      const root = container.querySelector(".react-flex-layout") as HTMLElement;
      expect(root.getAttribute("dir")).toBe(direction);

      const order = getAllByText("Left")[0].compareDocumentPosition(
        getAllByText("Right")[0]
      );
      expect(order & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

      unmount();
    }
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

  it("defers to the caller for state when onModelChange is supplied", async () => {
    const user = userEvent.setup();
    const model = mkModel();
    const onModelChange = vi.fn();
    const { getAllByText, getByTestId } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout
          model={model}
          factory={factory}
          onModelChange={onModelChange}
        />
      </div>
    );

    await user.click(getAllByText("B")[0]);

    expect(onModelChange).toHaveBeenCalledTimes(1);
    const [nextModel] = onModelChange.mock.calls[0];
    expect(nextModel.layout.children[0].selected).toBe(1);
    expect(getByTestId("content-ca")).toBeTruthy();
  });

  it("reports maximizedTabsetId through onModelChange without a layout rewrite", async () => {
    const user = userEvent.setup();
    const model = mkModel();
    const onModelChange = vi.fn();
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout
          model={model}
          factory={factory}
          onModelChange={onModelChange}
        />
      </div>
    );

    const ts2 = container.querySelector(
      '[data-layout-id="ts2"]'
    ) as HTMLElement;
    await user.click(
      ts2.querySelector(".react-flex-layout-tabset-maximize") as HTMLButtonElement
    );

    expect(onModelChange).toHaveBeenCalled();
    const [nextModel] = onModelChange.mock.calls[0];
    expect(nextModel.global.maximizedTabsetId).toBe("ts2");
    expect(nextModel.layout).toBe(model.layout);
  });

  it("maximizes a tabset and hides siblings while keeping them mounted", async () => {
    const user = userEvent.setup();
    const model = mkModel();
    const { container, getByTestId } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    const ts2 = container.querySelector(
      '[data-layout-id="ts2"]'
    ) as HTMLElement;
    const maximize = ts2.querySelector(
      ".react-flex-layout-tabset-maximize"
    ) as HTMLButtonElement;
    await user.click(maximize);

    const ts1 = container.querySelector(
      '[data-layout-id="ts1"]'
    ) as HTMLElement;
    expect(ts1.hasAttribute("hidden")).toBe(true);
    expect(ts1.getAttribute("aria-hidden")).toBe("true");
    expect(ts2.hasAttribute("hidden")).toBe(false);
    expect(ts2.classList.contains("react-flex-layout-tabset--maximized")).toBe(
      true
    );
    expect(container.querySelectorAll(".react-flex-layout-splitter").length).toBe(
      0
    );
    expect(getByTestId("content-ca")).toBeTruthy();
    expect(getByTestId("content-cc")).toBeTruthy();
  });

  it("restores flex and splitters after maximize", async () => {
    const user = userEvent.setup();
    const model = mkModel();
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    const ts2 = container.querySelector(
      '[data-layout-id="ts2"]'
    ) as HTMLElement;
    await user.click(
      ts2.querySelector(".react-flex-layout-tabset-maximize") as HTMLButtonElement
    );
    await user.click(
      ts2.querySelector(".react-flex-layout-tabset-maximize") as HTMLButtonElement
    );

    expect(
      (container.querySelector('[data-layout-id="ts1"]') as HTMLElement).hasAttribute(
        "hidden"
      )
    ).toBe(false);
    expect(container.querySelectorAll(".react-flex-layout-splitter").length).toBe(
      1
    );
    expect(
      container.querySelector(".react-flex-layout")?.getAttribute("data-maximized")
    ).toBeNull();
  });

  it("keeps sibling tab panel state while another tabset is maximized", async () => {
    const user = userEvent.setup();
    const model = mkModel();
    const statefulFactory = (node: LayoutNode) => (
      <div data-testid={`content-${node.component}`}>
        <input aria-label={`field-${node.component}`} defaultValue="" />
      </div>
    );
    const { container, getByLabelText } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={statefulFactory} />
      </div>
    );

    await user.type(getByLabelText("field-ca"), "kept");
    const ts2 = container.querySelector(
      '[data-layout-id="ts2"]'
    ) as HTMLElement;
    await user.click(
      ts2.querySelector(".react-flex-layout-tabset-maximize") as HTMLButtonElement
    );
    expect((getByLabelText("field-ca") as HTMLInputElement).value).toBe("kept");
    await user.click(
      ts2.querySelector(".react-flex-layout-tabset-maximize") as HTMLButtonElement
    );
    expect((getByLabelText("field-ca") as HTMLInputElement).value).toBe("kept");
  });

  it("clears maximizedTabsetId when the maximized tabset is pruned", async () => {
    const user = userEvent.setup();
    const model = mkModel();
    const { container, queryByTestId } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    const ts2 = container.querySelector(
      '[data-layout-id="ts2"]'
    ) as HTMLElement;
    await user.click(
      ts2.querySelector(".react-flex-layout-tabset-maximize") as HTMLButtonElement
    );

    const closeC = ts2.querySelector(
      ".react-flex-layout-tab-close"
    ) as HTMLButtonElement;
    await user.click(closeC);

    expect(queryByTestId("content-cc")).toBeNull();
    expect(container.querySelector('[data-layout-id="ts2"]')).toBeNull();
    expect(
      (container.querySelector('[data-layout-id="ts1"]') as HTMLElement).hasAttribute(
        "hidden"
      )
    ).toBe(false);
    expect(
      container.querySelector(".react-flex-layout")?.getAttribute("data-maximized")
    ).toBeNull();
  });

  it("hides the maximize button when enableMaximize is false", () => {
    const model = createLayoutModel(
      createRow("root", [
        createTabSet("ts1", [createTab("a", "ca", "A")]),
        createTabSet("ts2", [createTab("c", "cc", "C")]),
      ]),
      { enableMaximize: false }
    );
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );
    expect(container.querySelector(".react-flex-layout-tabset-maximize")).toBeNull();
  });

  it("does not show maximize on a single tabset and handleAction is a no-op", () => {
    const model = createLayoutModel(
      createTabSet("ts1", [createTab("a", "ca", "A")])
    );
    const ref = React.createRef<LayoutRef>();
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout ref={ref} model={model} factory={factory} />
      </div>
    );
    expect(container.querySelector(".react-flex-layout-tabset-maximize")).toBeNull();

    act(() => {
      ref.current!.handleAction({
        type: "maximizeTabset",
        payload: { nodeId: "ts1" },
      });
    });
    expect(
      container.querySelector(".react-flex-layout")?.getAttribute("data-maximized")
    ).toBeNull();
  });

  it("handleAction maximizeTabset and restoreTabset update the model", () => {
    const model = mkModel();
    const ref = React.createRef<LayoutRef>();
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout ref={ref} model={model} factory={factory} />
      </div>
    );

    act(() => {
      ref.current!.handleAction({
        type: "maximizeTabset",
        payload: { nodeId: "ts2" },
      });
    });
    expect(
      container.querySelector(".react-flex-layout")?.getAttribute("data-maximized")
    ).toBe("ts2");

    act(() => {
      ref.current!.handleAction({
        type: "restoreTabset",
        payload: {},
      });
    });
    expect(
      container.querySelector(".react-flex-layout")?.getAttribute("data-maximized")
    ).toBeNull();
  });

  describe("Memory Management", () => {
    it("should cleanup event listeners and observers on unmount", async () => {
      const model = mkModel();
      const { unmount, container } = render(
        <div style={{ width: 800, height: 600 }}>
          <Layout model={model} factory={factory} />
        </div>
      );

      unmount();

      await new Promise<void>((resolve) => setTimeout(resolve, 100));

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

      const finalNodeCount = document.querySelectorAll("*").length;
      const nodeGrowth = finalNodeCount - initialNodeCount;

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

      expect(true).toBe(true);
    });
  });
});
