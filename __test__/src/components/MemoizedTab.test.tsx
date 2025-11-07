import React, { Profiler, useState, useCallback } from "react";
import { describe, it, expect } from "vitest";
import { render, act } from "@testing-library/react";
import { MemoizedTab } from "../../../src/components/MemoizedTab";
import type { LayoutNode } from "../../../src/types";

function mkTabNode(id: string, name: string): LayoutNode {
  return { id, type: "tab", component: id, name } as any;
}

describe("MemoizedTab", () => {
  it("re-renders when className changes", () => {
    let renders = 0;
    function Wrapper() {
      const [cls, setCls] = useState("");
      const onRender = () => (renders += 1);
      return (
        <div>
          <Profiler id="memo-tab" onRender={onRender}>
            <MemoizedTab node={mkTabNode("t1", "Tab 1")} className={cls} />
          </Profiler>
          <button onClick={() => setCls("x")}>go</button>
        </div>
      );
    }

    const { getByText } = render(<Wrapper />);
    expect(renders).toBe(1);
    act(() => {
      getByText("go").click();
    });
    expect(renders).toBe(2);
  });

  it("re-renders when node name changes", () => {
    let renders = 0;
    function Wrapper() {
      const [label, setLabel] = useState("Tab 1");
      const onRender = () => (renders += 1);
      const node = mkTabNode("t1", label);
      return (
        <div>
          <Profiler id="memo-tab" onRender={onRender}>
            <MemoizedTab node={node} />
          </Profiler>
          <button onClick={() => setLabel("Tab 2")}>name</button>
        </div>
      );
    }

    const { getByText } = render(<Wrapper />);
    expect(renders).toBe(1);
    act(() => {
      getByText("name").click();
    });
    expect(renders).toBe(2);
  });

  it("re-renders when onSelect handler changes", () => {
    let renders = 0;
    function Wrapper() {
      const [ver, setVer] = useState(0);
      const onRender = () => (renders += 1);
      const onSelect = useCallback(() => {}, [ver]);
      return (
        <div>
          <Profiler id="memo-tab" onRender={onRender}>
            <MemoizedTab node={mkTabNode("t1", "Tab 1")} onSelect={onSelect} />
          </Profiler>
          <button onClick={() => setVer((n) => n + 1)}>chg</button>
        </div>
      );
    }

    const { getByText } = render(<Wrapper />);
    expect(renders).toBe(1);
    act(() => {
      getByText("chg").click();
    });
    expect(renders).toBe(2);
  });
});
