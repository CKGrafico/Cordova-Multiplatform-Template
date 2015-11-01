module Constants {
    'use strict';

    interface ISubPage {
        Path: string,
        Uri: string
    };

    interface IPage {
        Module: string,
        Main: ISubPage,
    };

    interface IHomePage extends IPage {
        Scroll: ISubPage
    }

    export interface IPaths {
        Core: string,
        Modules: string,
        Tabs: string,
        Side: IPage,
        Home: IHomePage,
        Actions: IPage,
        Buttons: IPage
    }
}
