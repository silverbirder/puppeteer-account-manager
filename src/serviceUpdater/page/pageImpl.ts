'use strict';

import {IPage} from "#/serviceUpdater/page/iPage"
import {ElementHandle, EvaluateFn, Frame, Page, Target} from "puppeteer"
import * as path from "path";

class PageImpl implements IPage {
    page: Page | Frame;

    constructor(page: Page | Frame) {
        this.page = page;
    }

    async setUserAgent(userAgent: string): Promise<void> {
        if ("setUserAgent" in this.page) {
            await this.page.setUserAgent(userAgent);
        }
    }

    async click(selector: string, option?: { visible?: boolean }): Promise<void> {
        if (!option) {
            option = {};
        }
        await this.page.waitFor(selector, option);
        await this.page.click(selector);
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForNavigation(): Promise<void> {
        await this.page.waitForNavigation();
    }

    async waitForFunction(fn: EvaluateFn): Promise<void> {
        await this.page.waitForFunction(fn);
    }

    async xClick(selector: string, index: number, option?: { visible?: boolean }): Promise<void> {
        if (!option) {
            option = {};
        }
        await this.page.waitForXPath(selector, option);
        await (await this.page.$x(selector))[index].click();
    }

    async uploadFile(filePath: string, selector: string, index: number): Promise<void> {
        await this.page.waitFor(selector);
        const input: ElementHandle = (await this.page.$$(selector))[index];
        await input.uploadFile(filePath);
    }

    async frames(): Promise<IPage[]> {
        if ("frames" in this.page) {
            const frames: Array<Frame> = await this.page.frames();
            return frames.map((frame) => {
                return new PageImpl(frame);
            });
        }
    }

    async type(selector: string, text: string, option?: { visible?: boolean }): Promise<void> {
        if (!option) {
            option = {};
        }
        await this.page.waitFor(selector, option);
        await this.page.type(selector, text);
    }

    async enter(): Promise<void> {
        if ("keyboard" in this.page) {
            await this.page.keyboard.press('Enter');
        }
    }

    target(): Target {
        if ("target" in this.page) {
            return this.page.target();
        }
    }

    async screenshot(name: string): Promise<void> {
        if ("screenshot" in this.page) {
            const screenshotPath: string = path.join(process.env.NODE_PATH, `./dist/`, `${name}.png`);
            await this.page.screenshot({path: screenshotPath});
        }
    }

    async evaluate(expression: string): Promise<string> {
        return (await this.page.evaluate(expression)).toString();
    }
}

export {PageImpl}