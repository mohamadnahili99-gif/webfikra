import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.WEBFIKRA_TEST_URL || "http://127.0.0.1:3000";
await mkdir("screenshots", { recursive: true });

const browser = await chromium.launch({ headless: true });

async function testDesktop() {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  try {
    const response = await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
    assert.equal(response?.status(), 200, "Homepage should load");
    await page.locator("h1").first().waitFor();
    assert.match(await page.locator("h1").first().innerText(), /مطعمك/);
    assert.equal(await page.locator("#insights").count(), 0, "Removed calculator must stay absent");
    assert.equal(await page.getByText("راقب أرقامك.", { exact: false }).count(), 0, "Removed headline must stay absent");
    assert.ok((await page.getByRole("link", { name: /تواصل مع WEBFIKRA عبر واتساب/ }).getAttribute("href"))?.startsWith("https://wa.me/96171524556"), "Floating contact should have the correct WhatsApp link");
    const sitemapResponse = await page.request.get(baseUrl + "/sitemap.xml");
    assert.equal(sitemapResponse.status(), 200, "Sitemap should be available");
    assert.match(await sitemapResponse.text(), /privacy/);
    await page.screenshot({ path: "screenshots/desktop-home.png", animations: "disabled" });
    const heroCta = await page.getByRole("link", { name: /لنصمّم موقعك/ }).boundingBox();
    assert.ok(heroCta && heroCta.y + heroCta.height <= 900, "Primary desktop call to action should appear above the fold");

    await page.getByRole("button", { name: "Switch to English" }).click();
    assert.equal(await page.locator("main#home").getAttribute("lang"), "en");
    assert.match(await page.locator("h1").first().innerText(), /restaurant/i);
    await page.getByRole("button", { name: "تغيير اللغة إلى العربية" }).click();

    const brandName = page.getByLabel("اسم النشاط", { exact: true });
    await brandName.fill("مطعم الاختبار");
    await page.getByRole("button", { name: "مقهى", exact: true }).click();
    const palettes = page.locator("#brand-studio fieldset").nth(1).getByRole("button");
    assert.equal(await palettes.count(), 12, "Style studio should offer 12 palettes");
    await page.getByRole("button", { name: "زيتي وذهبي" }).click();
    await page.getByRole("button", { name: "كحلي ونحاسي" }).click();
    assert.equal(await page.getByRole("button", { name: "كحلي ونحاسي" }).getAttribute("aria-pressed"), "true");
    await page.getByRole("button", { name: "تحريري", exact: true }).click();
    await page.getByRole("button", { name: "مستقيم", exact: true }).click();
    assert.equal(await page.getByRole("button", { name: "مستقيم", exact: true }).getAttribute("aria-pressed"), "true");
    assert.equal(await page.locator("#preview-accent-color").getAttribute("type"), "color");
    await page.getByRole("button", { name: "هاتف", exact: true }).click();
    assert.equal(await page.locator("#brand-studio").getByText("مطعم الاختبار").count(), 1);
    await page.locator("#brand-studio").screenshot({ path: "screenshots/desktop-brand-studio.png", animations: "disabled" });

    await page.locator("#experience article button").first().click();
    assert.equal((await page.locator("#demo-cart strong").first().innerText()).trim(), "1");
    await page.getByRole("button", { name: "شاهد سلتك التجريبية" }).click();
    await page.getByRole("button", { name: "نص الطلب التجريبي" }).click();
    assert.match(await page.locator("#demo-cart pre").innerText(), /برغر الحطب/);
    await page.getByRole("button", { name: "إفراغ السلة" }).click();
    assert.equal((await page.locator("#demo-cart strong").first().innerText()).trim(), "0");

    await page.locator("#quote-name").fill("مستخدم الاختبار");
    await page.locator("#quote-business").fill("مطعم الاختبار");
    await page.getByRole("checkbox", { name: "رمز QR للمنيو" }).check();
    await page.evaluate(() => {
      // Capture the WhatsApp URL without visiting external services.
      window.open = (url) => {
        window.__webfikraCapturedUrl = String(url);
        return null;
      };
    });
    await page.getByRole("button", { name: "أرسل طلبي عبر واتساب" }).click();
    const url = await page.evaluate(() => window.__webfikraCapturedUrl);
    assert.ok(url?.startsWith("https://wa.me/96171524556?text="), "Expected WhatsApp deep link");
    assert.ok(decodeURIComponent(url).includes("مطعم الاختبار"), "Message should include the business");
    assert.ok(decodeURIComponent(url).includes("رمز QR للمنيو"), "Message should include selected features");

    const browserWidth = await page.evaluate(() => ({
      viewport: window.innerWidth,
      body: document.documentElement.scrollWidth,
    }));
    assert.ok(browserWidth.body <= browserWidth.viewport + 2, "Desktop has unexpected horizontal overflow");
    // Verify public support pages and ensure inactive account forms never request passwords.
    const privacyResponse = await page.goto(baseUrl + "/privacy", { waitUntil: "domcontentloaded" });
    assert.equal(privacyResponse?.status(), 200, "Privacy page should load");
    assert.match(await page.locator("h1").innerText(), /سياسة الخصوصية/);
    await page.screenshot({ path: "screenshots/desktop-privacy.png", animations: "disabled" });
    await page.getByRole("button", { name: "EN" }).click();
    assert.match(await page.locator("h1").innerText(), /Privacy Notice/);

    const termsResponse = await page.goto(baseUrl + "/terms", { waitUntil: "domcontentloaded" });
    assert.equal(termsResponse?.status(), 200, "Terms page should load");
    // DOMContentLoaded can precede hydration. Wait for the saved language to apply.
    await page.getByRole("heading", { name: "Website Use Terms" }).waitFor({ timeout: 15000 });
    await page.getByRole("button", { name: "عربي" }).click();
    await page.getByRole("heading", { name: "شروط استخدام الموقع" }).waitFor();

    const portalStatus = await (await page.request.get(baseUrl + "/api/portal/session")).json();
    assert.equal(portalStatus.configured, false, "CI without Supabase settings must not accept accounts");
    for (const path of ["/restaurants/login", "/restaurants/register"]) {
      const portalResponse = await page.goto(baseUrl + path, { waitUntil: "domcontentloaded" });
      assert.equal(portalResponse?.status(), 200);
      await page.getByText(/بوابة الحسابات غير مفعّلة/).waitFor();
      assert.equal(await page.locator('input[type="password"]').count(), 0, "Unconfigured portal must not ask for passwords");
    }
    const privatePortal = await page.goto(baseUrl + "/restaurants/portal", { waitUntil: "domcontentloaded" });
    assert.equal(privatePortal?.status(), 200);
    await page.getByRole("heading", { name: /بوابة المطاعم بانتظار ربط Supabase/ }).waitFor();
    const privateApi = await page.request.get(baseUrl + "/api/portal/restaurants");
    assert.equal(privateApi.status(), 503, "Unconfigured management API must remain closed");
    const hiddenMenu = await page.goto(baseUrl + "/r/unpublished-test", { waitUntil: "domcontentloaded" });
    assert.equal(hiddenMenu?.status(), 404, "Unpublished or missing menus must not be visible");

    const orderResponse = await page.goto(baseUrl + "/order", { waitUntil: "domcontentloaded" });
    assert.equal(orderResponse?.status(), 200, "Standalone project order page should load");
    assert.match(await page.locator("h1").innerText(), /خلّينا نحوّل فكرتك/);
    await page.locator("#quote-name").fill("زائر الطلب");
    await page.locator("#quote-business").fill("مقهى جديد");
    await page.getByRole("button", { name: "أرسل طلبي عبر واتساب" }).waitFor();
    await page.screenshot({ path: "screenshots/desktop-order.png", animations: "disabled" });

    console.log("PASS: desktop layout, languages, brand studio, cart, WhatsApp, privacy, terms, inactive portal, order page.");
  } finally {
    await context.close();
  }
}

async function testMobile() {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    const response = await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
    assert.equal(response?.status(), 200);
    await page.locator("h1").first().waitFor();
    await page.screenshot({ path: "screenshots/mobile-home.png", animations: "disabled" });
    await page.getByRole("button", { name: "فتح القائمة" }).click();
    await page.getByRole("navigation", { name: "قائمة الهاتف" }).getByRole("link", { name: "صمّم فكرتك" }).click();
    assert.equal(await page.getByRole("button", { name: "فتح القائمة" }).getAttribute("aria-expanded"), "false");
    await page.getByLabel("اسم النشاط", { exact: true }).fill("مخبز التجربة");
    await page.getByRole("button", { name: "مخبز", exact: true }).click();
    await page.locator("#brand-studio").screenshot({ path: "screenshots/mobile-brand-studio.png", animations: "disabled" });

    await page.locator("#experience article button").first().click();
    await page.getByRole("button", { name: /عرض السلة/ }).click();
    await page.locator("#demo-cart").waitFor();

    const browserWidth = await page.evaluate(() => ({
      viewport: window.innerWidth,
      body: document.documentElement.scrollWidth,
    }));
    assert.ok(browserWidth.body <= browserWidth.viewport + 2, "Mobile has unexpected horizontal overflow");
    console.log("PASS: mobile layout, navigation, brand preview, cart jump.");
  } finally {
    await context.close();
  }
}

try {
  await testDesktop();
  await testMobile();
  console.log("All WEBFIKRA browser smoke checks passed.");
} catch (error) {
  console.error("WEBFIKRA UI smoke test failed:", error);
  process.exitCode = 1;
} finally {
  await browser.close();
}
