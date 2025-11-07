import React, { useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, within } from "@testing-library/react";
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
    const header = container.querySelector(
      ".react-flex-layout-tabset-header"
    ) as HTMLElement;
    expect(within(header).getByText("A")).toBeTruthy();
    expect(within(header).getByText("B")).toBeTruthy();
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
    const { getAllByText } = render(
      <TabSet node={node} factory={factory} onTabSelect={onTabSelect} />
    );
    const tabB = getAllByText("B")[0];
    fireEvent.click(tabB);
    expect(onTabSelect).toHaveBeenCalledWith("ts", 1);
  });

  it("calls onTabClose on close button click", () => {
    const onTabClose = vi.fn();
    const node = mkTabset([mkTab("a", "A")], 0);
    const { container } = render(
      <TabSet node={node} factory={factory} onTabClose={onTabClose} />
    );
    const header = container.querySelector(
      ".react-flex-layout-tabset-header"
    ) as HTMLElement;
    const tabEl = within(header)
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
    const header = container.querySelector(
      ".react-flex-layout-tabset-header"
    ) as HTMLElement;
    const tabEl = within(header)
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
    const titles = Array.from(
      container.querySelectorAll(".react-flex-layout-tab-title")
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
});
