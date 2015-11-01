var Constants;
(function (Constants) {
    'use strict';
    var base = 'tabs';
    Constants.Paths = {
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
})(Constants || (Constants = {}));
/// <reference path="constants/paths.ts" />
var App;
(function (App) {
    'use strict';
    angular
        .module('app', [
        'ionic',
        Constants.Paths.Core,
        Constants.Paths.Tabs,
        Constants.Paths.Side.Module,
        Constants.Paths.Home.Module,
        Constants.Paths.Actions.Module,
        Constants.Paths.Buttons.Module
    ])
        .config(statesConfiguration);
    window['ionic'].Platform.ready(function () {
        angular.bootstrap(document.querySelector('body'), ['app']);
    });
    // Configure routes
    function statesConfiguration($urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.scrolling.jsScrolling(false);
        $urlRouterProvider.otherwise('/tabs/home');
    }
})(App || (App = {}));
var Constants;
(function (Constants) {
    'use strict';
    ;
    ;
})(Constants || (Constants = {}));
var Actions;
(function (Actions) {
    'use strict';
    angular.module(Constants.Paths.Actions.Module, [])
        .config(statesConfiguration);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Constants.Paths.Actions.Main.Path, {
            url: '/' + Constants.Paths.Actions.Main.Uri,
            views: {
                'actions-tab': {
                    controller: 'actionsController as vm',
                    templateUrl: Constants.Paths.Modules + 'actions/views/' + Constants.Paths.Actions.Main.Uri + '.html'
                }
            }
        });
    }
})(Actions || (Actions = {}));
var Actions;
(function (Actions) {
    'use strict';
    var ActionsController = (function () {
        function ActionsController(loadingService) {
            this.loadingService = loadingService;
            this.text = '';
            this.addTextAsync();
        }
        ActionsController.prototype.addTextAsync = function () {
            var _this = this;
            this.loadingService.show();
            window.setTimeout(function () {
                _this.text += '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt lacinia augue vehicula molestie. Proin a dui dignissim, ornare nulla ut, venenatis nisi. Proin accumsan tortor purus, a venenatis augue vestibulum porta. In faucibus ligula eu metus tempor, a ornare enim finibus. Donec ullamcorper risus sem, quis laoreet mauris pharetra in. Vestibulum tempus ipsum eget dolor ornare auctor. Ut pulvinar ac nibh ac lobortis.</p>';
                _this.loadingService.hide();
            }, Math.floor(Math.random() * 3000));
        };
        return ActionsController;
    })();
    Actions.ActionsController = ActionsController;
    angular.module(Constants.Paths.Actions.Main.Uri)
        .controller('actionsController', ActionsController);
})(Actions || (Actions = {}));
var Buttons;
(function (Buttons) {
    'use strict';
    angular.module(Constants.Paths.Buttons.Module, [])
        .config(statesConfiguration);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Constants.Paths.Buttons.Main.Path, {
            url: '/' + Constants.Paths.Buttons.Main.Uri,
            views: {
                'buttons-tab': {
                    templateUrl: Constants.Paths.Modules + 'buttons/views/' + Constants.Paths.Buttons.Main.Uri + '.html'
                }
            }
        });
    }
})(Buttons || (Buttons = {}));
var Core;
(function (Core) {
    'use strict';
    angular.module('core', []);
})(Core || (Core = {}));
var Core;
(function (Core) {
    'use strict';
})(Core || (Core = {}));
var Core;
(function (Core) {
    'using strict';
    var LoadingService = (function () {
        function LoadingService($ionicLoading) {
            this.$ionicLoading = $ionicLoading;
        }
        LoadingService.prototype.show = function () {
            var options = {
                templateUrl: Constants.Paths.Modules + 'tabs/templates/loading.html'
            };
            this.$ionicLoading.show(options);
        };
        LoadingService.prototype.hide = function () {
            this.$ionicLoading.hide();
        };
        return LoadingService;
    })();
    Core.LoadingService = LoadingService;
    angular.module('core')
        .service('loadingService', LoadingService);
})(Core || (Core = {}));
var Home;
(function (Home) {
    'use strict';
    angular.module(Constants.Paths.Home.Module, [])
        .config(statesConfiguration);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Constants.Paths.Home.Main.Path, {
            url: '/' + Constants.Paths.Home.Main.Uri,
            views: {
                'home-tab': {
                    templateUrl: Constants.Paths.Modules + 'home/views/' + Constants.Paths.Home.Main.Uri + '.html'
                }
            }
        })
            .state(Constants.Paths.Home.Scroll.Path, {
            url: '/' + Constants.Paths.Home.Scroll.Uri,
            views: {
                'home-tab': {
                    templateUrl: Constants.Paths.Modules + 'home/views/' + Constants.Paths.Home.Scroll.Uri + '.html'
                }
            }
        });
    }
})(Home || (Home = {}));
var Side;
(function (Side) {
    'use strict';
    angular.module(Constants.Paths.Side.Module, [])
        .config(statesConfiguration);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Constants.Paths.Side.Main.Path, {
            url: '/' + Constants.Paths.Side.Main.Uri,
            views: {
                'left-tab': {
                    templateUrl: Constants.Paths.Modules + 'side/views/' + Constants.Paths.Side.Main.Uri + '.html'
                }
            }
        });
    }
})(Side || (Side = {}));
var Tabs;
(function (Tabs) {
    'use strict';
    angular.module(Constants.Paths.Tabs, [])
        .config(statesConfiguration);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Constants.Paths.Tabs, {
            url: '/' + Constants.Paths.Tabs,
            abstract: true,
            templateUrl: Constants.Paths.Modules + 'tabs/templates/' + Constants.Paths.Tabs + '.html'
        });
    }
})(Tabs || (Tabs = {}));
var Tabs;
(function (Tabs) {
    'use strict';
    var NavigationController = (function () {
        function NavigationController($ionicHistory, $ionicTabsDelegate, $ionicPlatform) {
            var _this = this;
            this.$ionicHistory = $ionicHistory;
            this.$ionicTabsDelegate = $ionicTabsDelegate;
            this.$ionicPlatform = $ionicPlatform;
            $ionicPlatform.registerBackButtonAction(function (e) { return _this.checkBack(e); }, 100);
        }
        NavigationController.prototype.goBack = function () {
            this.$ionicHistory.goBack();
        };
        NavigationController.prototype.checkBack = function (e) {
            var page = this.$ionicHistory.currentStateName();
            if (page === Constants.Paths.Home.Main.Path) {
                var nav = navigator;
                if (nav.app && nav.app.exitApp) {
                    nav.app.exitApp();
                }
                else {
                    window.close();
                }
            }
            else {
                this.goBack();
            }
        };
        // On Windows phone
        NavigationController.prototype.onSwipeLeft = function () {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() + 1);
        };
        NavigationController.prototype.onSwipeRight = function () {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() - 1);
        };
        return NavigationController;
    })();
    Tabs.NavigationController = NavigationController;
    angular.module(Constants.Paths.Tabs)
        .controller('navigationController', NavigationController);
})(Tabs || (Tabs = {}));
//# sourceMappingURL=app.js.map