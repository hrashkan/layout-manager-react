import { test, expect } from "@playwright/test";

test.describe("Layout Manager E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector(".react-flex-layout-tabset", { timeout: 10000 });
  });

  test("1. Should render initial layout with all tabsets and tabs", async ({
    page,
  }) => {
    // Check that all tabsets are visible
    const tabsets = page.locator(".react-flex-layout-tabset");
    await expect(tabsets).toHaveCount(3);

    // Check that all tabs are visible
    const tabs = page.locator(".react-flex-layout-tab");
    await expect(tabs).toHaveCount(5);

    // Verify tab names (use tab title selector to avoid matching labels)
    await expect(
      page.locator('.react-flex-layout-tab-title:has-text("Dashboard")')
    ).toBeVisible();
    await expect(
      page.locator('.react-flex-layout-tab-title:has-text("Analytics")')
    ).toBeVisible();
    await expect(
      page.locator('.react-flex-layout-tab-title:has-text("Settings")')
    ).toBeVisible();
    await expect(
      page.locator('.react-flex-layout-tab-title:has-text("Logs")')
    ).toBeVisible();
    await expect(
      page.locator('.react-flex-layout-tab-title:has-text("Console")')
    ).toBeVisible();
  });

  test("2. Should switch tabs when clicking on tab headers", async ({
    page,
  }) => {
    // Initially Dashboard should be active (first tab in left-tabset)
    const dashboardContent = page.locator('text="Dashboard"').last(); // Content area
    await expect(dashboardContent).toBeVisible();

    // Click on Analytics tab
    const analyticsTab = page.locator(
      '.react-flex-layout-tab:has-text("Analytics")'
    );
    await analyticsTab.click();

    // Wait for content to change
    await page.waitForTimeout(300);
    const analyticsContent = page.locator('text="Analytics"').last();
    await expect(analyticsContent).toBeVisible();

    // Verify Analytics tab is active
    await expect(
      analyticsTab.locator("..").locator(".react-flex-layout-tab.active")
    ).toHaveCount(1);
  });

  test("3. Should close tab using close icon", async ({ page }) => {
    // Count initial tabs
    const initialTabs = page.locator(".react-flex-layout-tab");
    const initialCount = await initialTabs.count();
    expect(initialCount).toBe(5);

    // Find and click close button on Dashboard tab
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();

    // Wait for tab to be removed
    await page.waitForTimeout(500);

    // Verify tab count decreased
    const newTabs = page.locator(".react-flex-layout-tab");
    const newCount = await newTabs.count();
    expect(newCount).toBe(4);

    // Verify Dashboard tab is gone
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);
  });

  test("4. Should toggle component visibility using checkboxes", async ({
    page,
  }) => {
    // Find the Dashboard checkbox - it's inside a label that contains "Dashboard"
    const dashboardLabel = page.locator("label").filter({
      hasText: "Dashboard",
    });
    const dashboardCheckbox = dashboardLabel.locator('input[type="checkbox"]');

    // Initially checked (component is visible)
    await expect(dashboardCheckbox).toBeChecked();

    // Uncheck to hide component
    await dashboardCheckbox.click();
    await page.waitForTimeout(500);

    // Verify Dashboard tab is hidden
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);

    // Check again to restore
    await dashboardCheckbox.click();
    await page.waitForTimeout(500);

    // Verify Dashboard tab is visible again
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(1);
  });

  test("5. Should restore closed component via checkbox", async ({ page }) => {
    // Close Dashboard tab using close icon
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();
    await page.waitForTimeout(500);

    // Verify it's closed
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);

    // Restore via checkbox
    const dashboardLabel = page.locator("label").filter({
      hasText: "Dashboard",
    });
    const dashboardCheckbox = dashboardLabel.locator('input[type="checkbox"]');
    await dashboardCheckbox.click();
    await page.waitForTimeout(500);

    // Verify Dashboard is restored
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(1);
  });

  test("6. Should drag and drop tab to different tabset", async ({ page }) => {
    // Get initial tab counts
    const leftTabset = page.locator(".react-flex-layout-tabset").first();
    const initialLeftTabs = await leftTabset
      .locator(".react-flex-layout-tab")
      .count();

    // Find Dashboard tab
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );

    // Get target tabset (top-tabset)
    const topTabset = page.locator(".react-flex-layout-tabset").nth(1);

    // Drag Dashboard to top tabset
    await dashboardTab.dragTo(topTabset, {
      targetPosition: { x: 50, y: 50 },
    });

    // Wait for drag to complete
    await page.waitForTimeout(1000);

    // Verify Dashboard is now in top tabset
    const topTabsetTabs = topTabset.locator(".react-flex-layout-tab");
    await expect(topTabsetTabs.filter({ hasText: "Dashboard" })).toBeVisible();

    // Verify left tabset has one less tab
    const newLeftTabs = await leftTabset
      .locator(".react-flex-layout-tab")
      .count();
    expect(newLeftTabs).toBe(initialLeftTabs - 1);
  });

  test("7. Should switch direction from LTR to RTL", async ({ page }) => {
    // Verify initial direction is LTR
    const layout = page.locator(".react-flex-layout");
    await expect(layout).toHaveAttribute("dir", "ltr");

    // Find and click RTL button
    const rtlButton = page.locator('button:has-text("RTL")');
    await rtlButton.click();
    await page.waitForTimeout(500);

    // Verify direction changed to RTL
    await expect(layout).toHaveAttribute("dir", "rtl");

    // Verify button text changed to LTR
    await expect(page.locator('button:has-text("LTR")')).toBeVisible();
  });

  test("8. Should persist layout to localStorage when storage is enabled", async ({
    page,
  }) => {
    // Ensure storage is enabled
    const storageLabel = page.locator("label").filter({
      hasText: "Enable Storage",
    });
    const storageCheckbox = storageLabel.locator('input[type="checkbox"]');
    if (!(await storageCheckbox.isChecked())) {
      await storageCheckbox.click();
      await page.waitForTimeout(300);
    }

    // Close a tab
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();
    await page.waitForTimeout(2000); // Wait for debounced save (500ms + buffer)

    // Reload page
    await page.reload();
    await page.waitForSelector(".react-flex-layout-tabset", { timeout: 10000 });

    // Verify Dashboard is still closed (persisted)
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);
  });

  test("9. Should clear storage and reset layout", async ({ page }) => {
    // Close a tab first
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();
    await page.waitForTimeout(1000);

    // Click Clear Storage button
    const clearStorageButton = page.locator('button:has-text("Clear Storage")');
    await clearStorageButton.click();
    await page.waitForTimeout(500);

    // Verify all tabs are restored
    const tabs = page.locator(".react-flex-layout-tab");
    await expect(tabs).toHaveCount(5);
    await expect(
      page.locator('.react-flex-layout-tab-title:has-text("Dashboard")')
    ).toBeVisible();
  });

  test("10. Should reset layout to initial state", async ({ page }) => {
    // Make some changes: close a tab and switch tab
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();
    await page.waitForTimeout(500);

    // Click Analytics tab
    const analyticsTab = page.locator(
      '.react-flex-layout-tab:has-text("Analytics")'
    );
    await analyticsTab.click();
    await page.waitForTimeout(300);

    // Click Reset Layout button
    const resetButton = page.locator('button:has-text("Reset Layout")');
    await resetButton.click();
    await page.waitForTimeout(500);

    // Verify all tabs are restored
    const tabs = page.locator(".react-flex-layout-tab");
    await expect(tabs).toHaveCount(5);
    await expect(
      page.locator('.react-flex-layout-tab-title:has-text("Dashboard")')
    ).toBeVisible();
  });

  test("11. Should handle tab reordering within same tabset", async ({
    page,
  }) => {
    // Find left tabset with Dashboard and Analytics
    const leftTabset = page.locator(".react-flex-layout-tabset").first();
    const dashboardTab = leftTabset.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const analyticsTab = leftTabset.locator(
      '.react-flex-layout-tab:has-text("Analytics")'
    );

    // Get initial order
    const tabs = leftTabset.locator(".react-flex-layout-tab");
    const initialOrder = await tabs.all();
    const dashboardIndex = await dashboardTab.evaluate((el) =>
      Array.from(el.parentElement?.children || []).indexOf(el)
    );

    // Drag Dashboard to after Analytics (drag to header area)
    const header = leftTabset.locator(".react-flex-layout-tabset-header");
    await dashboardTab.dragTo(header, {
      targetPosition: { x: 200, y: 20 },
    });

    await page.waitForTimeout(1000);

    // Verify tabs are still in the tabset
    await expect(dashboardTab).toBeVisible();
    await expect(analyticsTab).toBeVisible();
  });

  test("12. Should maintain direction when toggling components", async ({
    page,
  }) => {
    // Switch to RTL
    const rtlButton = page.locator('button:has-text("RTL")');
    await rtlButton.click();
    await page.waitForTimeout(500);

    // Verify RTL
    const layout = page.locator(".react-flex-layout");
    await expect(layout).toHaveAttribute("dir", "rtl");

    // Toggle a component
    const dashboardLabel = page.locator("label").filter({
      hasText: "Dashboard",
    });
    const dashboardCheckbox = dashboardLabel.locator('input[type="checkbox"]');
    await dashboardCheckbox.click();
    await page.waitForTimeout(500);

    // Verify direction is still RTL
    await expect(layout).toHaveAttribute("dir", "rtl");
  });

  test("13. Should work with storage disabled", async ({ page }) => {
    // Disable storage
    const storageLabel = page.locator("label").filter({
      hasText: "Enable Storage",
    });
    const storageCheckbox = storageLabel.locator('input[type="checkbox"]');
    if (await storageCheckbox.isChecked()) {
      await storageCheckbox.click();
      await page.waitForTimeout(300);
    }

    // Switch direction
    const rtlButton = page.locator('button:has-text("RTL")');
    await rtlButton.click();
    await page.waitForTimeout(500);

    // Verify direction changed
    const layout = page.locator(".react-flex-layout");
    await expect(layout).toHaveAttribute("dir", "rtl");

    // Close a tab
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();
    await page.waitForTimeout(500);

    // Verify tab is closed
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);
  });

  test("14. Should display correct content for each tab", async ({ page }) => {
    // Check Dashboard content
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    await dashboardTab.click();
    await page.waitForTimeout(300);
    await expect(
      page.locator('div:has-text("Dashboard")').last()
    ).toBeVisible();

    // Check Analytics content
    const analyticsTab = page.locator(
      '.react-flex-layout-tab:has-text("Analytics")'
    );
    await analyticsTab.click();
    await page.waitForTimeout(300);
    await expect(
      page.locator('div:has-text("Analytics")').last()
    ).toBeVisible();

    // Check Settings content
    const settingsTab = page.locator(
      '.react-flex-layout-tab:has-text("Settings")'
    );
    await settingsTab.click();
    await page.waitForTimeout(300);
    await expect(page.locator('div:has-text("Settings")').last()).toBeVisible();
  });

  test("15. Should handle multiple tab operations", async ({ page }) => {
    // Close multiple tabs
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    await dashboardTab.locator(".react-flex-layout-tab-close").click();
    await page.waitForTimeout(500);

    const analyticsTab = page.locator(
      '.react-flex-layout-tab:has-text("Analytics")'
    );
    await analyticsTab.locator(".react-flex-layout-tab-close").click();
    await page.waitForTimeout(500);

    // Verify both are closed
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Analytics")')
    ).toHaveCount(0);

    // Restore both via checkboxes
    const dashboardLabel = page.locator("label").filter({
      hasText: "Dashboard",
    });
    const dashboardCheckbox = dashboardLabel.locator('input[type="checkbox"]');
    await dashboardCheckbox.click();
    await page.waitForTimeout(500);

    const analyticsLabel = page.locator("label").filter({
      hasText: "Analytics",
    });
    const analyticsCheckbox = analyticsLabel.locator('input[type="checkbox"]');
    await analyticsCheckbox.click();
    await page.waitForTimeout(500);

    // Verify both are restored
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(1);
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Analytics")')
    ).toHaveCount(1);
  });
});
