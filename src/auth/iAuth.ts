'use strict';

import {IPage} from "#/serviceUpdater/page/iPage"

interface IAuth {
    name: Symbol;
    id: string;
    password: string;
    page: IPage;

    dispatch(): Promise<void>;
}

const AUTH_NAME = {
    GOOGLE: Symbol('GOOGLE'),
    TWITTER: Symbol('TWITTER'),
    GITHUB: Symbol('GITHUB'),
    PAGE: Symbol('PAGE'),
};

export {IAuth, AUTH_NAME}