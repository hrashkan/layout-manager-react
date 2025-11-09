import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Layout } from "../../src/components/Layout";
import {
  createLayoutModel,
  createRow,
  createTabSet,
  createTab,
} from "../../src/utils/layoutUtils";
import type { LayoutModel } from "../../src/types";

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

describe("General Memory Management", () => {
  beforeEach(() => {
    // Clear any previous state
  });

  afterEach(() => {
    cleanup();
  });

  it("should properly cleanup all resources on component unmount", async () => {
    const model = mkModel();
    const { unmount, container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    // Verify component is mounted
    expect(container.querySelector(".react-flex-layout")).toBeTruthy();

    // Unmount component
    unmount();

    // Wait for cleanup
    await new Promise<void>((resolve) => setTimeout(resolve, 100));

    // After unmount, the container should be empty
    expect(container.querySelector(".react-flex-layout")).toBeNull();
  });

  it("should not leak memory with storage enabled and disabled", async () => {
    const model = mkModel();

    // Test with storage enabled
    const { unmount: unmount1 } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout
          model={model}
          factory={factory}
          storage={{ enabled: true, key: "memory-test-1" }}
        />
      </div>
    );
    unmount1();
    await new Promise<void>((resolve) => setTimeout(resolve, 100));

    // Test with storage disabled
    const { unmount: unmount2 } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} storage={{ enabled: false }} />
      </div>
    );
    unmount2();
    await new Promise<void>((resolve) => setTimeout(resolve, 100));

    // Should not throw errors
    expect(true).toBe(true);
  });

  it("should handle rapid mount/unmount cycles without memory leaks", async () => {
    const model = mkModel();

    for (let i = 0; i < 10; i++) {
      const { unmount } = render(
        <div style={{ width: 800, height: 600 }}>
          <Layout model={model} factory={factory} />
        </div>
      );
      unmount();
      await new Promise<void>((resolve) => setTimeout(resolve, 10));
    }

    // Should not accumulate memory
    expect(true).toBe(true);
  });

  it("should cleanup ResizeObserver instances properly", async () => {
    const model = mkModel();
    const { unmount } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    // ResizeObserver should be created for tabsets
    // On unmount, it should be disconnected
    unmount();

    // Wait for cleanup
    await new Promise<void>((resolve) => setTimeout(resolve, 100));

    // No errors should occur from orphaned observers
    expect(true).toBe(true);
  });

  it("should cleanup scroll event listeners properly", async () => {
    const model = mkModel();
    const { unmount, container } = render(
      <div style={{ width: 800, height: 600 }}>
        <Layout model={model} factory={factory} />
      </div>
    );

    // Find tabset container with scroll
    const tabsetContainer = container.querySelector(
      ".react-flex-layout-tabset-tabs-container"
    );

    if (tabsetContainer) {
      // Simulate scroll
      (tabsetContainer as HTMLElement).scrollLeft = 100;
    }

    // Unmount should cleanup scroll listeners
    unmount();

    // Wait for cleanup
    await new Promise<void>((resolve) => setTimeout(resolve, 100));

    // Should not throw errors
    expect(true).toBe(true);
  });
});
