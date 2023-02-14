import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5174/");
  await page.getByRole("link", { name: "Add Pokemon" }).click();
  await page.getByLabel("name").click();
  await page.getByLabel("name").fill("alisaur");
  await page.getByLabel("name").press("Tab");
  await page.getByLabel("Type").fill("fly");
  await page.getByLabel("Type").press("Tab");
  await page.getByLabel("Height").fill("14");
  await page.getByLabel("Height").press("Tab");
  await page.getByLabel("Weight").fill("14");
  await page.getByLabel("Weight").press("Tab");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Submit" }).press("Enter");
  await expect(page.getByText("alisaur")).toBeVisible();
});
