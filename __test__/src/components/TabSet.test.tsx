import React, { useState } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, within, waitFor, act } from "@testing-library/react";
import { TabSet } from "../../../src/components/TabSet";
import type { LayoutNode } from "../../../src/types";

function mkTab(id: string, name: string): LayoutNode {
  return { id, type: "tab", component: id, name } as any;
}

function mkTabset(children: LayoutNode[], selected = 0): LayoutNode {
  return { id: "ts", type: "tabset", children, selected } as any;
}

const factory = (node: any) => (
  <div data-testid={`content-${node.component}`}>{node.name}</div>
);

describe("TabSet component", () => {
  it("renders tab headers and selected tab content", () => {
    const node = mkTabset([mkTab("a", "A"), mkTab("b", "B")], 0);
    const { container, getByTestId } = render(
      <TabSet node={node} factory={factory} />
    );
    const tabsContainer = container.querySelector(
      ".react-flex-layout-tabset-tabs-container"
    ) as HTMLElement;
    expect(within(tabsContainer).getByText("A")).toBeTruthy();
    expect(within(tabsContainer).getByText("B")).toBeTruthy();
    expect(getByTestId("content-a")).toBeTruthy();
  });

  it("clamps selected index when out of bounds", () => {
    const node = mkTabset([mkTab("a", "A")], 10);
    const { getByTestId } = render(<TabSet node={node} factory={factory} />);
    expect(getByTestId("content-a")).toBeTruthy();
  });

  it("calls onTabSelect on header click", () => {
    const onTabSelect = vi.fn();
    const node = mkTabset([mkTab("a", "A"), mkTab("b", "B")], 0);
    const { container, getAllByText } = render(
      <TabSet node={node} factory={factory} onTabSelect={onTabSelect} />
    );
    const tabsContainer = container.querySelector(
      ".react-flex-layout-tabset-tabs-container"
    ) as HTMLElement;
    const tabB = within(tabsContainer).getByText("B");
    fireEvent.click(tabB);
    expect(onTabSelect).toHaveBeenCalledWith("ts", 1);
  });

  it("calls onTabClose on close button click", () => {
    const onTabClose = vi.fn();
    const node = mkTabset([mkTab("a", "A")], 0);
    const { container } = render(
      <TabSet node={node} factory={factory} onTabClose={onTabClose} />
    );
    const tabsContainer = container.querySelector(
      ".react-flex-layout-tabset-tabs-container"
    ) as HTMLElement;
    const tabEl = within(tabsContainer)
      .getByText("A")
      .closest(".react-flex-layout-tab") as HTMLElement;
    const closeBtn = tabEl.querySelector(
      ".react-flex-layout-tab-close"
    ) as HTMLButtonElement;
    fireEvent.click(closeBtn);
    expect(onTabClose).toHaveBeenCalledWith("ts", 0);
  });

  it("calls onTabDragStart when a tab drag starts (with index)", () => {
    const onTabDragStart = vi.fn();
    const node = mkTabset([mkTab("a", "A"), mkTab("b", "B")], 0);
    const { container } = render(
      <TabSet node={node} factory={factory} onTabDragStart={onTabDragStart} />
    );
    const tabsContainer = container.querySelector(
      ".react-flex-layout-tabset-tabs-container"
    ) as HTMLElement;
    const tabEl = within(tabsContainer)
      .getByText("A")
      .closest(".react-flex-layout-tab") as HTMLElement;
    const dataTransfer: any = { setData: vi.fn(), effectAllowed: "" };
    fireEvent.dragStart(tabEl, { dataTransfer });
    expect(onTabDragStart).toHaveBeenCalledWith("ts", 0);
  });

  it("renders tabs in reverse order when direction=rtl", () => {
    const node = mkTabset([mkTab("a", "A"), mkTab("b", "B")], 0);
    const { container } = render(
      <TabSet node={node} factory={factory} direction="rtl" />
    );
    const tabsContainer = container.querySelector(
      ".react-flex-layout-tabset-tabs-container"
    ) as HTMLElement;
    const titles = Array.from(
      tabsContainer.querySelectorAll(".react-flex-layout-tab-title")
    ).map((el) => el.textContent);
    // 'B' should come before 'A' in RTL
    expect(titles[0]).toBe("B");
    expect(titles[1]).toBe("A");
  });

  it("shows drop indicator before target when dragOverTabset/dropPosition/tab index props are set", () => {
    const node = mkTabset([mkTab("a", "A"), mkTab("b", "B")], 0);
    const { container } = render(
      <TabSet
        node={node}
        factory={factory}
        dragOverTabset="ts"
        dropPosition="tab"
        dropTargetIndex={1}
      />
    );
    const indicators = container.querySelectorAll(
      ".react-flex-layout-tab-drop-indicator"
    );
    expect(indicators.length).toBe(1);
  });

  it("does not show drop indicator when dragOverTabset does not match node id", () => {
    const node = mkTabset([mkTab("a", "A"), mkTab("b", "B")], 0);
    const { container } = render(
      <TabSet
        node={node}
        factory={factory}
        dragOverTabset="other"
        dropPosition="tab"
        dropTargetIndex={0}
      />
    );
    const indicators = container.querySelectorAll(
      ".react-flex-layout-tab-drop-indicator"
    );
    expect(indicators.length).toBe(0);
  });

  it("renders scroll buttons when tabs overflow", async () => {
    const node = mkTabset(
      [
        mkTab("a", "A"),
        mkTab("b", "B"),
        mkTab("c", "C"),
        mkTab("d", "D"),
        mkTab("e", "E"),
      ],
      0
    );
    const { container } = render(
      <TabSet node={node} factory={factory} style={{ width: "200px" }} />
    );
    const tabsContainer = container.querySelector(
      ".react-flex-layout-tabset-tabs-container"
    ) as HTMLElement;
    
    // Mock scrollWidth to be larger than clientWidth to trigger scroll buttons
    Object.defineProperty(tabsContainer, "scrollWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    Object.defineProperty(tabsContainer, "clientWidth", {
      writable: true,
      configurable: true,
      value: 200,
    });
    Object.defineProperty(tabsContainer, "scrollLeft", {
      writable: true,
      configurable: true,
      value: 0,
    });

    // Trigger scroll event to update button visibility
    await act(async () => {
      fireEvent.scroll(tabsContainer);
      await new Promise((resolve) => setTimeout(resolve, 15));
    });
    
    // Wait for state update
    await waitFor(() => {
      const rightButton = container.querySelector(
        ".react-flex-layout-tabset-scroll-right"
      );
      expect(rightButton).toBeTruthy();
    });
  });

  it("accepts custom scroll icons", async () => {
    const CustomLeftIcon = () => <span data-testid="custom-left">←</span>;
    const CustomRightIcon = () => <span data-testid="custom-right">→</span>;
    const node = mkTabset(
      [
        mkTab("a", "A"),
        mkTab("b", "B"),
        mkTab("c", "C"),
        mkTab("d", "D"),
        mkTab("e", "E"),
      ],
      0
    );
    const { container } = render(
      <TabSet
        node={node}
        factory={factory}
        style={{ width: "200px" }}
        scrollLeftIcon={<CustomLeftIcon />}
        scrollRightIcon={<CustomRightIcon />}
      />
    );
    const tabsContainer = container.querySelector(
      ".react-flex-layout-tabset-tabs-container"
    ) as HTMLElement;
    
    // Mock scroll properties to show buttons
    Object.defineProperty(tabsContainer, "scrollWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    Object.defineProperty(tabsContainer, "clientWidth", {
      writable: true,
      configurable: true,
      value: 200,
    });
    Object.defineProperty(tabsContainer, "scrollLeft", {
      writable: true,
      configurable: true,
      value: 100,
    });

    await act(async () => {
      fireEvent.scroll(tabsContainer);
      await new Promise((resolve) => setTimeout(resolve, 15));
    });

    // Wait for custom icons to appear
    await waitFor(() => {
      const leftIcon = container.querySelector('[data-testid="custom-left"]');
      const rightIcon = container.querySelector('[data-testid="custom-right"]');
      expect(leftIcon || rightIcon).toBeTruthy();
    });
  });

  it("scrolls tabs container when scroll buttons are clicked", async () => {
    const node = mkTabset(
      [
        mkTab("a", "A"),
        mkTab("b", "B"),
        mkTab("c", "C"),
        mkTab("d", "D"),
        mkTab("e", "E"),
      ],
      0
    );
    const { container } = render(
      <TabSet node={node} factory={factory} style={{ width: "200px" }} />
    );
    const tabsContainer = container.querySelector(
      ".react-flex-layout-tabset-tabs-container"
    ) as HTMLElement;
    
    // Mock scroll properties
    const scrollBySpy = vi.fn();
    tabsContainer.scrollBy = scrollBySpy;
    Object.defineProperty(tabsContainer, "scrollWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    Object.defineProperty(tabsContainer, "clientWidth", {
      writable: true,
      configurable: true,
      value: 200,
    });
    Object.defineProperty(tabsContainer, "scrollLeft", {
      writable: true,
      configurable: true,
      value: 100,
    });

    await act(async () => {
      fireEvent.scroll(tabsContainer);
      await new Promise((resolve) => setTimeout(resolve, 15));
    });
    
    await waitFor(() => {
      const rightButton = container.querySelector(
        ".react-flex-layout-tabset-scroll-right"
      ) as HTMLButtonElement;
      expect(rightButton).toBeTruthy();
      
      if (rightButton) {
        fireEvent.click(rightButton);
        expect(scrollBySpy).toHaveBeenCalledWith({
          left: 200,
          behavior: "smooth",
        });
      }
    });
  });
});
