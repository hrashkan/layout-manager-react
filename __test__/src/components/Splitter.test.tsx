import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, act } from "@testing-library/react";
import { Splitter } from "../../../src/components/Splitter";

function mousedown(el: Element, opts: Partial<MouseEvent> = {}) {
  const e = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
    clientX: (opts as any).clientX ?? 0,
    clientY: (opts as any).clientY ?? 0,
  });
  el.dispatchEvent(e);
}

function mousemove(opts: Partial<MouseEvent> = {}) {
  const e = new MouseEvent("mousemove", {
    bubbles: true,
    cancelable: true,
    clientX: (opts as any).clientX ?? 0,
    clientY: (opts as any).clientY ?? 0,
  });
  document.dispatchEvent(e);
}

function mouseup() {
  const e = new MouseEvent("mouseup", { bubbles: true, cancelable: true });
  document.dispatchEvent(e);
}

describe("Splitter", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calls onResizeStart and onResize with horizontal delta", () => {
    const onResizeStart = vi.fn();
    const onResize = vi.fn();
    const { container } = render(
      <Splitter
        direction="horizontal"
        onResize={onResize}
        onResizeStart={onResizeStart}
        size={8}
      />
    );

    const el = container.firstElementChild as HTMLElement;
    const originalRaf = globalThis.requestAnimationFrame;
    // make rAF immediate for this test
    globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(performance.now());
      return 1 as any;
    };
    act(() => {
      mousedown(el, { clientX: 100 });
    });
    expect(onResizeStart).toHaveBeenCalledTimes(1);

    act(() => {
      mousemove({ clientX: 130 });
    });
    // delta = 30
    expect(onResize).toHaveBeenCalledWith(30);

    act(() => {
      mouseup();
    });
    globalThis.requestAnimationFrame = originalRaf;

    const callsBefore = onResize.mock.calls.length;
    act(() => {
      mousemove({ clientX: 200 });
    });
    // no more calls after mouseup
    expect(onResize.mock.calls.length).toBe(callsBefore);
  });

  it("calls onResize with vertical delta", () => {
    const onResize = vi.fn();
    const { container } = render(
      <Splitter direction="vertical" onResize={onResize} size={6} />
    );

    const el = container.firstElementChild as HTMLElement;
    const originalRaf = globalThis.requestAnimationFrame;
    globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(performance.now());
      return 1 as any;
    };
    act(() => {
      mousedown(el, { clientY: 50 });
      mousemove({ clientY: 80 });
    });
    expect(onResize).toHaveBeenCalledWith(30);

    act(() => mouseup());
    globalThis.requestAnimationFrame = originalRaf;
  });

  it("applies active customStyles while dragging and default when idle", () => {
    const { container } = render(
      <Splitter
        direction="horizontal"
        onResize={() => {}}
        size={8}
        customStyles={{
          default: { backgroundColor: "blue" },
          active: { backgroundColor: "red" },
        }}
      />
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.backgroundColor).toBe("blue");
    act(() => mousedown(el, { clientX: 0 }));
    expect(el.style.backgroundColor).toBe("red");
    act(() => mouseup());
  });

  it("uses correct width/height and cursor based on direction and size", () => {
    const { container: c1 } = render(
      <Splitter direction="horizontal" onResize={() => {}} size={10} />
    );
    const s1 = c1.firstElementChild as HTMLElement;
    expect(s1.style.width).toBe("10px");
    expect(s1.style.height).toBe("100%");
    expect(s1.style.cursor).toBe("col-resize");

    const { container: c2 } = render(
      <Splitter direction="vertical" onResize={() => {}} size={12} />
    );
    const s2 = c2.firstElementChild as HTMLElement;
    expect(s2.style.height).toBe("12px");
    expect(s2.style.width).toBe("100%");
    expect(s2.style.cursor).toBe("row-resize");
  });

  it("throttles mousemove with requestAnimationFrame (single onResize per frame)", () => {
    const originalRaf = globalThis.requestAnimationFrame;
    const rafQueue: FrameRequestCallback[] = [];
    globalThis.requestAnimationFrame = (cb: FrameRequestCallback): number => {
      rafQueue.push(cb);
      return rafQueue.length;
    };

    try {
      const onResize = vi.fn();
      const { container } = render(
        <Splitter direction="horizontal" onResize={onResize} size={8} />
      );
      const el = container.firstElementChild as HTMLElement;

      act(() => mousedown(el, { clientX: 0 }));
      // multiple moves within same frame
      act(() => {
        mousemove({ clientX: 10 });
        mousemove({ clientX: 20 });
        mousemove({ clientX: 30 });
      });
      // Not yet called until RAF runs
      expect(onResize).not.toHaveBeenCalled();

      // Flush one animation frame -> onResize once with last delta
      act(() => {
        const cb = rafQueue.shift()!;
        cb(performance.now());
      });
      expect(onResize).toHaveBeenCalledTimes(1);
      expect(onResize).toHaveBeenLastCalledWith(30);

      act(() => mouseup());
    } finally {
      globalThis.requestAnimationFrame = originalRaf;
    }
  });

  it("removes document listeners on unmount mid-drag", () => {
    const onResize = vi.fn();
    const { container, unmount } = render(
      <Splitter direction="horizontal" onResize={onResize} size={8} />
    );
    const el = container.firstElementChild as HTMLElement;

    act(() => mousedown(el, { clientX: 0 }));
    unmount();

    act(() => mousemove({ clientX: 50 }));
    expect(onResize).not.toHaveBeenCalled();
  });
});
