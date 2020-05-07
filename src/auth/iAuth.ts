'use strict';

import {Page} from "puppeteer";

interface IAuth {
    name: Symbol;
    id: string;
    password: string;
    page: Page;

    dispatch(): Promise<void>;
}

const AUTH_NAME = {
    GOOGLE: Symbol('GOOGLE'),
    TWITTER: Symbol('TWITTER'),
    GITHUB: Symbol('GITHUB'),
};

export {IAuth, AUTH_NAME}