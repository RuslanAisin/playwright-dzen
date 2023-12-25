import { test, expect } from "@playwright/test";

test.describe("YaDzen Test", () => {
  test("dzen", async ({ page }) => {
    await page.goto("/");
    const hasWindowObject = await page.evaluate(() => {
      return window.hasOwnProperty(0);
    });
    expect(hasWindowObject).toBe(true);
    await expect(page).toHaveTitle("Дзен");
    // Скролим до Статьи
    const scrollElement = page
      .locator('article[data-testid="floor-image-card"] a')
      .first();
    await scrollElement.scrollIntoViewIfNeeded();
    // Проверямем картинку
    await expect(scrollElement).toHaveClass(/floor-card-image-default/);
    // Проверяем hover
    await scrollElement?.hover();
    const channelNameElem = await page.waitForSelector(
      '#zen-row-1 article [aria-label="Название канала"] [class^="floor-channel-info"]'
    );
    // Название канала
    const channelName = await channelNameElem.textContent();
    expect(channelName).toBeTruthy();
    // Кнопка подписаться
    const subscribeElem = await page.waitForSelector(
      '#zen-row-1 article [class^="floor-subscribe"] button'
    );
    const subscribe = await subscribeElem.textContent();
    expect(subscribe).toBe("Подписаться");
    // Аватарка
    const avatarElem = await page.waitForSelector(
      '#zen-row-1 article [class^="zen-ui-avatar"] [aria-label="Аватар канала"]'
    );
    expect(avatarElem).not.toBeNull();
    // Заголовок статьи
    const titleArticleElem = await page.waitForSelector(
      '#zen-row-1 article [class^="floor-card-image-default__title"]'
    );
    const titleArticle = await titleArticleElem.textContent();
    expect(titleArticle).toBeTruthy();
    // Описание статьи
    const textArticleElem = await page.waitForSelector(
      '#zen-row-1 article [class^="floor-card-image-default__text"]'
    );
    const textArticle = await textArticleElem.textContent();
    expect(textArticle).toBeTruthy();
    // Проверяем hover кнопки Видео
    const videoHover = page.locator('aside [aria-label="Видео"] li');
    await videoHover.hover();
    const color = await videoHover.evaluate((e) => {
      return window.getComputedStyle(e).getPropertyValue("background-color");
    });
    expect(color).toBe("rgba(0, 0, 0, 0.06)");
    // Переходим в Видео
    await page.click('aside [aria-label="Видео"]');
    await page.waitForLoadState("load");
    expect(hasWindowObject).toBe(true);
    // Ищем синий трактор
    await page.click("input[data-testid=search-input]");
    const searchOverlay = page.locator('[data-testid="search-overlay"]');
    expect(searchOverlay).toBeTruthy();
    await page.fill("input[data-testid=search-input]", "Синий трактор");
    await page.route("**/api/v3/launcher/zen-suggest**", (route) =>
      route.fulfill({
        status: 200,
      })
    );
    await page.click('button[aria-label="Кнопка Найти"]', { force: true });
    expect(hasWindowObject).toBe(true);
    const videoLink = await page.waitForSelector(
      ".card-layer-video-view__player-block a"
    );
    await videoLink.evaluate((el) => {
      el.removeAttribute("target");
    });
    // Переходим в видео
    await videoLink.click();
    await page.waitForLoadState("load");
    expect(hasWindowObject).toBe(true);
    await page.route("**/event_confirmation", (route) =>
      route.fulfill({
        status: 200,
      })
    );
    await page.waitForTimeout(5000);
    // const playerControls = await page.waitForSelector(
    //   ".zen-ui-video-video-player__control-toggle"
    // );
    // expect(playerControls).toBeTruthy();
    // await playerControls.hover();
    // // Открываем в фуллскрине
    // await page.click("button.zen-ui-video-video-fullscreen-toggle");
    await page.goto('http://html5test.com/')
    await page.waitForLoadState("load");
  });
});
