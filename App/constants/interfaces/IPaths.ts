module Constants {
    'use strict';

    export interface IPaths {
        Core: string,
        Modules: string,
        Tabs: string,
        Side?: {
            Base: string,
            Left?: string,
            Right?: string
        },
        Home: {
            Base: string,
            Scroll: string
        },
        Actions: {
            Base: string
        },
        Buttons: {
            Base: string
        }
    }
}
