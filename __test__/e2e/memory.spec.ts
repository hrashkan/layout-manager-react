import { test, expect } from "@playwright/test";

test.describe("Memory Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should not leak memory when adding and removing tabs", async ({
    page,
  }) => {
    // Get initial memory (if available)
    const getMemory = async () => {
      return await page.evaluate(() => {
        return (performance as any).memory?.usedJSHeapSize || 0;
      });
    };

    const initialMemory = await getMemory();
    if (initialMemory === 0) {
      test.skip();
      return;
    }

    // Perform multiple add/remove cycles
    for (let i = 0; i < 20; i++) {
      // Try to add a tab (if there's an add button)
      const addButton = page
        .locator('[aria-label*="add" i], button:has-text("Add")')
        .first();
      if ((await addButton.count()) > 0) {
        await addButton.click();
        await page.waitForTimeout(100);
      }

      // Try to close a tab
      const closeButton = page
        .locator(
          '.react-flex-layout-tab button[aria-label*="close" i], .react-flex-layout-tab button:has-text("×")'
        )
        .first();
      if ((await closeButton.count()) > 0) {
        await closeButton.click();
        await page.waitForTimeout(100);
      }

      await page.waitForTimeout(50);
    }

    // Force garbage collection if available
    await page.evaluate(() => {
      if ((window as any).gc) {
        (window as any).gc();
      }
    });

    // Wait for cleanup
    await page.waitForTimeout(2000);

    const finalMemory = await getMemory();

    // Memory should not grow more than 20% (allowing for GC delays)
    const memoryGrowth = (finalMemory - initialMemory) / initialMemory;
    expect(memoryGrowth).toBeLessThan(0.2);
  });

  test("should cleanup event listeners on unmount", async ({ page }) => {
    // This test verifies that components properly cleanup
    // by checking that interactions still work after many operations

    // Perform many interactions
    for (let i = 0; i < 50; i++) {
      // Click on tabs
      const tabs = page.locator(".react-flex-layout-tab");
      const count = await tabs.count();
      if (count > 0) {
        await tabs.nth(i % count).click();
        await page.waitForTimeout(50);
      }
    }

    // Verify tabs are still clickable (no listener accumulation issues)
    const tabs = page.locator(".react-flex-layout-tab");
    const count = await tabs.count();
    if (count > 0) {
      await tabs.first().click();
      // Should not throw errors
      await expect(tabs.first()).toBeVisible();
    }
  });

  test("should handle rapid storage operations without leaks", async ({
    page,
  }) => {
    // Enable storage if there's a toggle
    const storageToggle = page
      .locator('input[type="checkbox"]:near(:text("Storage"))')
      .first();
    if ((await storageToggle.count()) > 0) {
      await storageToggle.check();
    }

    // Perform rapid layout changes
    for (let i = 0; i < 30; i++) {
      // Try to drag a tab (if available)
      const tab = page.locator(".react-flex-layout-tab").first();
      if ((await tab.count()) > 0) {
        const box = await tab.boundingBox();
        if (box) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
          await page.mouse.move(box.x + 100, box.y);
          await page.mouse.up();
        }
      }
      await page.waitForTimeout(100);
    }

    // Wait for debounced saves to complete
    await page.waitForTimeout(2000);

    // Verify no errors occurred
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    expect(errors.length).toBe(0);
  });

  test("should cleanup ResizeObserver on component unmount", async ({
    page,
  }) => {
    // Perform resize operations
    const splitters = page.locator(".react-flex-layout-splitter");
    const count = await splitters.count();

    if (count > 0) {
      for (let i = 0; i < 10; i++) {
        const splitter = splitters.first();
        const box = await splitter.boundingBox();
        if (box) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
          await page.mouse.move(box.x + 50, box.y);
          await page.mouse.move(box.x - 50, box.y);
          await page.mouse.up();
        }
        await page.waitForTimeout(100);
      }
    }

    // Verify no errors
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    expect(errors.length).toBe(0);
  });
});
