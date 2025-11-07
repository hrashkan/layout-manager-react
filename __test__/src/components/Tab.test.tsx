import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Tab } from "../../../src/components/Tab";
import type { LayoutNode } from "../../../src/types";

function mkTabNode(id: string, name: string): LayoutNode {
  return { id, type: "tab", component: id, name } as any;
}

describe("Tab component", () => {
  it("renders with title, className, style", () => {
    const node = mkTabNode("t1", "MyTab");
    const { getByText } = render(
      <Tab node={node} className="extra" style={{ color: "red" }} />
    );
    const title = getByText("MyTab");
    expect(title).toBeTruthy();
    expect(
      title.closest(".react-flex-layout-tab")?.classList.contains("extra")
    ).toBe(true);
  });

  it("calls onSelect with node.id when clicked", () => {
    const onSelect = vi.fn();
    const node = mkTabNode("sel", "Select");
    const { getByText } = render(<Tab node={node} onSelect={onSelect} />);
    fireEvent.click(getByText("Select"));
    expect(onSelect).toHaveBeenCalledWith("sel");
  });

  it("close button calls onClose and stops propagation (no onSelect)", () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    const node = mkTabNode("x", "CloseMe");
    const { getByText } = render(
      <Tab node={node} onSelect={onSelect} onClose={onClose} />
    );
    const tabEl = getByText("CloseMe").closest(
      ".react-flex-layout-tab"
    ) as HTMLElement;
    const closeBtn = tabEl.querySelector(
      ".react-flex-layout-tab-close"
    ) as HTMLButtonElement;
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledWith("x");
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("applies custom close icon and closeButtonClassName", () => {
    const node = mkTabNode("t", "Title");
    const Custom = () => <span data-testid="custom-x">X</span>;
    const { getByTestId, getByText } = render(
      <Tab
        node={node}
        closeIcon={<Custom />}
        closeButtonClassName="close-extra"
      />
    );
    expect(getByTestId("custom-x")).toBeTruthy();
    const btn = getByText("Title")
      .closest(".react-flex-layout-tab")!
      .querySelector(".react-flex-layout-tab-close") as HTMLButtonElement;
    expect(btn.classList.contains("close-extra")).toBe(true);
  });

  it("drag start sets dataTransfer and adds classes; drag end removes classes", () => {
    const onDragStart = vi.fn();
    const onDragEnd = vi.fn();
    const node = mkTabNode("drag", "DragTab");
    const { getByText } = render(
      <Tab
        node={node}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        index={3}
      />
    );
    const tabEl = getByText("DragTab").closest(
      ".react-flex-layout-tab"
    ) as HTMLElement;

    const data = { setData: vi.fn(), effectAllowed: "" } as any;
    fireEvent.dragStart(tabEl, { dataTransfer: data });
    expect(data.setData).toHaveBeenCalledWith("text/plain", "drag");
    expect(onDragStart).toHaveBeenCalledWith("drag", 3);
    expect(tabEl.classList.contains("dragging")).toBe(true);
    expect(document.body.classList.contains("dragging")).toBe(true);

    fireEvent.dragEnd(tabEl);
    expect(onDragEnd).toHaveBeenCalled();
    expect(tabEl.classList.contains("dragging")).toBe(false);
    expect(document.body.classList.contains("dragging")).toBe(false);
  });
});
