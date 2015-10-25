module Constants {
    'use strict';

    interface ISubPage {
        Path: string,
        Uri: string
    };

    interface IPage {
        Main: ISubPage,
    };

    interface IHomePage extends IPage {
        Scroll: ISubPage
    }

    export interface IPaths {
        Tabs: string,
        Side: IPage,
        Home: IHomePage,
        Actions: IPage,
        Buttons: IPage
    }
}
