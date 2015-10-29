var Constants;
(function (Constants) {
    'use strict';
    var base = 'tabs';
    Constants.Paths = {
        Tabs: base,
        Modules: '../modules/',
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
        'core',
        Constants.Paths.Tabs,
        Constants.Paths.Side.Module,
        Constants.Paths.Home.Module,
        Constants.Paths.Actions.Module,
        Constants.Paths.Buttons.Module
    ])
        .config(httpLoadingInterceptor)
        .run(httpLoadingInterceptorActions)
        .config(["$compileProvider", function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|mailto|ms-appx):/);
    }])
        .config(statesConfiguration);
    window['ionic'].Platform.ready(function () {
        angular.bootstrap(document.querySelector('body'), ['app']);
    });
    // Configure routes
    function statesConfiguration($urlRouterProvider, $ionicConfigProvider) {
        // force native scroll
        var configProvider = $ionicConfigProvider;
        configProvider.scrolling.jsScrolling(false);
        $urlRouterProvider.otherwise('/tabs/home');
    }
    statesConfiguration.$inject = ["$urlRouterProvider", "$ionicConfigProvider"];
    // Configure interceptor
    function httpLoadingInterceptor($httpProvider) {
        $httpProvider.interceptors.push(['$rootScope', function ($rootScope) {
                return {
                    request: function (config) {
                        $rootScope.$broadcast('loading:show');
                        return config;
                    },
                    response: function (response) {
                        $rootScope.$broadcast('loading:hide');
                        return response;
                    }
                };
            }]);
    }
    httpLoadingInterceptor.$inject = ["$httpProvider"];
    // Configure interceptor actions
    function httpLoadingInterceptorActions($rootScope, $ionicLoading) {
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({ templateUrl: Constants.Paths.Modules + 'tabs/templates/loading.html' });
        });
        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide();
        });
    }
    httpLoadingInterceptorActions.$inject = ["$rootScope", "$ionicLoading"];
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
                    templateUrl: Constants.Paths.Modules + 'actions/views/' + Constants.Paths.Actions.Main.Uri + '.html'
                }
            }
        });
    }
    statesConfiguration.$inject = ["$stateProvider"];
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
    statesConfiguration.$inject = ["$stateProvider"];
})(Buttons || (Buttons = {}));
var Core;
(function (Core) {
    'use strict';
    angular.module('core', []);
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
            url: '/' + Constants.Paths.Home.Main.Uri,
            views: {
                'home-tab': {
                    templateUrl: Constants.Paths.Modules + 'home/views/' + Constants.Paths.Home.Scroll.Uri + '.html'
                }
            }
        });
    }
    statesConfiguration.$inject = ["$stateProvider"];
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
    statesConfiguration.$inject = ["$stateProvider"];
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
    statesConfiguration.$inject = ["$stateProvider"];
})(Tabs || (Tabs = {}));
var Actions;
(function (Actions) {
    'use strict';
    var ActionsController = (function () {
        function ActionsController($http) {
            this.$http = $http;
            this.property = 'Void';
            $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function (result) {
                console.log(result);
            });
        }
        ActionsController.$inject = ["$http"];
        ActionsController.prototype.exampleAction = function () {
            this.property = 'Random ' + Math.floor(Math.random() * 100 + 1);
        };
        return ActionsController;
    })();
    Actions.ActionsController = ActionsController;
    angular.module(Constants.Paths.Actions.Main.Uri)
        .controller('actionsController', ActionsController);
})(Actions || (Actions = {}));
var Tabs;
(function (Tabs) {
    'use strict';
    var NavigationController = (function () {
        function NavigationController($ionicHistory, $ionicTabsDelegate) {
            var _this = this;
            this.$ionicHistory = $ionicHistory;
            this.$ionicTabsDelegate = $ionicTabsDelegate;
            document.addEventListener('backbutton', function (e) { return _this.checkBack(e); }, false);
        }
        NavigationController.$inject = ["$ionicHistory", "$ionicTabsDelegate"];
        NavigationController.prototype.goBack = function () {
            this.$ionicHistory.goBack();
        };
        NavigationController.prototype.checkBack = function (e) {
            var page = this.$ionicHistory.currentStateName();
            if (page === 'tabs.home') {
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
