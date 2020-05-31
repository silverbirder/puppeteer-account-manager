'use strict';

import {EvaluateFn, Target} from "puppeteer"

interface IPage {
    setUserAgent(userAgent: string): Promise<void>;

    click(selector: string, option?: { visible?: boolean }): Promise<void>;

    xClick(selector: string, index: number, option?: { visible?: boolean }): Promise<void>;

    goto(url: string): Promise<void>;

    waitForNavigation(): Promise<void>;

    waitForFunction(fn: EvaluateFn): Promise<void>;

    uploadFile(filePath: string, selector: string, index: number): Promise<void>;

    frames(): Promise<IPage[]>;

    type(selector: string, text: string, option?: { visible?: boolean }): Promise<void>;

    enter(): Promise<void>;

    target(): Target;

    screenshot(name: string): Promise<void>;
}

export {IPage}