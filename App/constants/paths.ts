module Constants {
    'use strict';

    let base = 'tabs';

    export let Paths: IPaths = {
        Core: 'core',
        Modules: 'modules/',
        Tabs: base,
        Side: {
            Module: 'side',
            Main: {
                Path: base + '.left',
                Uri: 'left'
            }
        },
        Home: {
            Module: 'home',
            Main: {
                Path: base + '.home',
                Uri: 'home'
            },
            Scroll: {
                Path: base + '.scroll',
                Uri: 'scroll'
            }
        },
        Actions: {
            Module: 'actions',
            Main: {
                Path: base + '.actions',
                Uri: 'actions'
            },
        },
        Buttons: {
            Module: 'buttons',
            Main: {
                Path: base + '.buttons',
                Uri: 'buttons'
            }
        }
    };
}
