module Constants {
    'use strict';

    let base = 'tabs';

    export let Paths: IPaths = {
        Tabs: base,
        Side: {
            Main: {
                Path: base + '.left',
                Uri: 'left'
            }
        },
        Home: {
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
            Main: {
                Path: base + '.actions',
                Uri: 'actions'
            },
        },
        Buttons: {
            Main: {
                Path: base + '.buttons',
                Uri: 'buttons'
            }
        }
    };
}
