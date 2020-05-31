'use strict';

import {AUTH_NAME} from "#/auth/iAuth"
import {ElementHandle, Page} from "puppeteer"
import {BaseServiceUpdater} from "#/serviceUpdater/baseServiceUpdater"

class HatenaUpdater extends BaseServiceUpdater {
    async pageProcess(page: Page): Promise<void> {
        console.log(`🚀: page.goto(hatena/login)`);
        await page.goto('https://www.hatena.ne.jp/login');
        switch (this.auth.name) {
            case AUTH_NAME.GOOGLE:
                await page.waitFor('#google-signin2-button', {visible: true});
                const [newPage] = await Promise.all([
                    this._browser.waitForTarget(t => t.opener() === page.target()).then(t => t.page()),
                    page.click('#google-signin2-button')
                ]);
                this.auth.page = newPage;
                break;
        }
        await this.auth.dispatch();

        console.log(`🚀: page.goto(profile)`);
        await page.waitFor('#profile-image-profile');
        await page.click('#profile-image-profile');

        console.log(`🚀: page.goto(edit tab)`);
        await page.waitFor('#edit-tab > a');
        await page.click('#edit-tab > a');

        console.log(`🚀: page.click(notice dialog)`);
        await page.waitFor('#privacy-alert-ok');
        await page.click('#privacy-alert-ok');

        console.log(`🚀: page.click(change image link)`);
        await page.waitFor('td > a');
        await page.click('td > a');

        const filePath: string = this.account.avatar;
        console.log(`🚀: update image ${filePath}`);
        await page.waitFor('input[type="file"]');
        const input: ElementHandle = await page.$('input[type="file"]');
        await input.uploadFile(filePath);

        console.log(`🚀: page.click submit`);
        await page.click('input[type="submit"]');
        await page.waitForNavigation();
    }
}

export {HatenaUpdater}