import {Browser, Page} from "puppeteer-core";
import {launch} from "puppeteer-core";

(async () => {
    const browser: Browser = await launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    const page: Page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
    await page.goto('https://github.com/login');
    await page.screenshot({path: './1.png'});
    await browser.close();
})();