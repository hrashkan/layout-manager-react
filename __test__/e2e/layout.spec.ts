import { test, expect } from "@playwright/test";

test.describe("Layout Manager E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector(".react-flex-layout-tabset", { timeout: 10000 });
  });

  test("1. Should render initial layout with all tabsets and tabs", async ({
    page,
  }) => {
    const tabsets = page.locator(".react-flex-layout-tabset");
    await expect(tabsets).toHaveCount(3);

    const tabs = page.locator(".react-flex-layout-tab");
    await expect(tabs).toHaveCount(5);

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
    const dashboardContent = page.locator('text="Dashboard"').last();
    await expect(dashboardContent).toBeVisible();

    const analyticsTab = page.locator(
      '.react-flex-layout-tab:has-text("Analytics")'
    );
    await analyticsTab.click();

    await page.waitForTimeout(300);
    const analyticsContent = page.locator('text="Analytics"').last();
    await expect(analyticsContent).toBeVisible();

    await expect(
      analyticsTab.locator("..").locator(".react-flex-layout-tab.active")
    ).toHaveCount(1);
  });

  test("3. Should close tab using close icon", async ({ page }) => {
    const initialTabs = page.locator(".react-flex-layout-tab");
    const initialCount = await initialTabs.count();
    expect(initialCount).toBe(5);

    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();

    await page.waitForTimeout(500);

    const newTabs = page.locator(".react-flex-layout-tab");
    const newCount = await newTabs.count();
    expect(newCount).toBe(4);

    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);
  });

  test("4. Should toggle component visibility using checkboxes", async ({
    page,
  }) => {
    const dashboardLabel = page.locator("label").filter({
      hasText: "Dashboard",
    });
    const dashboardCheckbox = dashboardLabel.locator('input[type="checkbox"]');

    await expect(dashboardCheckbox).toBeChecked();

    await dashboardCheckbox.click();
    await page.waitForTimeout(500);

    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);

    await dashboardCheckbox.click();
    await page.waitForTimeout(500);

    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(1);
  });

  test("5. Should restore closed component via checkbox", async ({ page }) => {
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();
    await page.waitForTimeout(500);

    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);

    const dashboardLabel = page.locator("label").filter({
      hasText: "Dashboard",
    });
    const dashboardCheckbox = dashboardLabel.locator('input[type="checkbox"]');
    await dashboardCheckbox.click();
    await page.waitForTimeout(500);

    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(1);
  });

  test("6. Should drag and drop tab to different tabset", async ({ page }) => {
    const leftTabset = page.locator(".react-flex-layout-tabset").first();
    const initialLeftTabs = await leftTabset
      .locator(".react-flex-layout-tab")
      .count();

    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );

    const topTabset = page.locator(".react-flex-layout-tabset").nth(1);

    await dashboardTab.dragTo(topTabset, {
      targetPosition: { x: 50, y: 50 },
    });

    await page.waitForTimeout(1000);

    const topTabsetTabs = topTabset.locator(".react-flex-layout-tab");
    await expect(topTabsetTabs.filter({ hasText: "Dashboard" })).toBeVisible();

    const newLeftTabs = await leftTabset
      .locator(".react-flex-layout-tab")
      .count();
    expect(newLeftTabs).toBe(initialLeftTabs - 1);
  });

  test("7. Should switch direction from LTR to RTL", async ({ page }) => {
    const layout = page.locator(".react-flex-layout");
    await expect(layout).toHaveAttribute("dir", "ltr");

    const rtlButton = page.locator('button:has-text("RTL")');
    await rtlButton.click();
    await page.waitForTimeout(500);

    await expect(layout).toHaveAttribute("dir", "rtl");

    await expect(page.locator('button:has-text("LTR")')).toBeVisible();
  });

  test("8. Should persist layout to localStorage when storage is enabled", async ({
    page,
  }) => {
    const storageLabel = page.locator("label").filter({
      hasText: "Enable Storage",
    });
    const storageCheckbox = storageLabel.locator('input[type="checkbox"]');
    if (!(await storageCheckbox.isChecked())) {
      await storageCheckbox.click();
      await page.waitForTimeout(300);
    }

    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForSelector(".react-flex-layout-tabset", { timeout: 10000 });

    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);
  });

  test("9. Should clear storage and reset layout", async ({ page }) => {
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();
    await page.waitForTimeout(1000);

    const clearStorageButton = page.locator('button:has-text("Clear Storage")');
    await clearStorageButton.click();
    await page.waitForTimeout(500);

    const tabs = page.locator(".react-flex-layout-tab");
    await expect(tabs).toHaveCount(5);
    await expect(
      page.locator('.react-flex-layout-tab-title:has-text("Dashboard")')
    ).toBeVisible();
  });

  test("10. Should reset layout to initial state", async ({ page }) => {
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();
    await page.waitForTimeout(500);

    const analyticsTab = page.locator(
      '.react-flex-layout-tab:has-text("Analytics")'
    );
    await analyticsTab.click();
    await page.waitForTimeout(300);

    const resetButton = page.locator('button:has-text("Reset Layout")');
    await resetButton.click();
    await page.waitForTimeout(500);

    const tabs = page.locator(".react-flex-layout-tab");
    await expect(tabs).toHaveCount(5);
    await expect(
      page.locator('.react-flex-layout-tab-title:has-text("Dashboard")')
    ).toBeVisible();
  });

  test("11. Should handle tab reordering within same tabset", async ({
    page,
  }) => {
    const leftTabset = page.locator(".react-flex-layout-tabset").first();
    const dashboardTab = leftTabset.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const analyticsTab = leftTabset.locator(
      '.react-flex-layout-tab:has-text("Analytics")'
    );

    const header = leftTabset.locator(".react-flex-layout-tabset-header");
    await dashboardTab.dragTo(header, {
      targetPosition: { x: 200, y: 20 },
    });

    await page.waitForTimeout(1000);

    await expect(dashboardTab).toBeVisible();
    await expect(analyticsTab).toBeVisible();
  });

  test("12. Should maintain direction when toggling components", async ({
    page,
  }) => {
    const rtlButton = page.locator('button:has-text("RTL")');
    await rtlButton.click();
    await page.waitForTimeout(500);

    const layout = page.locator(".react-flex-layout");
    await expect(layout).toHaveAttribute("dir", "rtl");

    const dashboardLabel = page.locator("label").filter({
      hasText: "Dashboard",
    });
    const dashboardCheckbox = dashboardLabel.locator('input[type="checkbox"]');
    await dashboardCheckbox.click();
    await page.waitForTimeout(500);

    await expect(layout).toHaveAttribute("dir", "rtl");
  });

  test("13. Should work with storage disabled", async ({ page }) => {
    const storageLabel = page.locator("label").filter({
      hasText: "Enable Storage",
    });
    const storageCheckbox = storageLabel.locator('input[type="checkbox"]');
    if (await storageCheckbox.isChecked()) {
      await storageCheckbox.click();
      await page.waitForTimeout(300);
    }

    const rtlButton = page.locator('button:has-text("RTL")');
    await rtlButton.click();
    await page.waitForTimeout(500);

    const layout = page.locator(".react-flex-layout");
    await expect(layout).toHaveAttribute("dir", "rtl");

    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    const closeButton = dashboardTab.locator(".react-flex-layout-tab-close");
    await closeButton.click();
    await page.waitForTimeout(500);

    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);
  });

  test("14. Should display correct content for each tab", async ({ page }) => {
    const dashboardTab = page.locator(
      '.react-flex-layout-tab:has-text("Dashboard")'
    );
    await dashboardTab.click();
    await page.waitForTimeout(300);
    await expect(
      page.locator('div:has-text("Dashboard")').last()
    ).toBeVisible();

    const analyticsTab = page.locator(
      '.react-flex-layout-tab:has-text("Analytics")'
    );
    await analyticsTab.click();
    await page.waitForTimeout(300);
    await expect(
      page.locator('div:has-text("Analytics")').last()
    ).toBeVisible();

    const settingsTab = page.locator(
      '.react-flex-layout-tab:has-text("Settings")'
    );
    await settingsTab.click();
    await page.waitForTimeout(300);
    await expect(page.locator('div:has-text("Settings")').last()).toBeVisible();
  });

  test("15. Should handle multiple tab operations", async ({ page }) => {
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

    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(0);
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Analytics")')
    ).toHaveCount(0);

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

    await expect(
      page.locator('.react-flex-layout-tab:has-text("Dashboard")')
    ).toHaveCount(1);
    await expect(
      page.locator('.react-flex-layout-tab:has-text("Analytics")')
    ).toHaveCount(1);
  });
});
