var App;
(function (App) {
    'use strict';
    angular
        .module('app', [
        'ionic',
        'core',
        'tabs',
        'side',
        'home',
        'actions',
        'buttons'
    ])
        .config(['$httpProvider', httpLoadingInterceptor])
        .run(['$rootScope', '$ionicLoading', httpLoadingInterceptorActions])
        .config(['$compileProvider', function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|mailto|ms-appx):/)
                .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', statesConfiguration]);
        }]);
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
    // Configure interceptor actions
    function httpLoadingInterceptorActions($rootScope, $ionicLoading) {
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({ templateUrl: 'modules/tabs/templates/loading.html' });
        });
        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide();
        });
    }
})(App || (App = {}));
var Constants;
(function (Constants) {
    'use strict';
    var base = 'tabs';
    Constants.Paths = {
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
})(Constants || (Constants = {}));
var Constants;
(function (Constants) {
    'use strict';
    ;
    ;
})(Constants || (Constants = {}));
var Actions;
(function (Actions) {
    'use strict';
    angular.module(Constants.Paths.Actions.Main.Uri, [])
        .config(['$stateProvider', statesConfiguration]);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Constants.Paths.Actions.Main.Path, {
            url: '/' + Constants.Paths.Actions.Main.Uri,
            views: {
                'actions-tab': {
                    templateUrl: 'views/' + Constants.Paths.Actions.Main.Uri + '.html'
                }
            }
        });
    }
})(Actions || (Actions = {}));
var Buttons;
(function (Buttons) {
    'use strict';
    angular.module(Constants.Paths.Buttons.Main.Uri, [])
        .config(['$stateProvider', statesConfiguration]);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Constants.Paths.Buttons.Main.Path, {
            url: '/' + Constants.Paths.Buttons.Main.Uri,
            views: {
                'buttons-tab': {
                    templateUrl: 'views/' + Constants.Paths.Buttons.Main.Uri + '.html'
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
var Home;
(function (Home) {
    'use strict';
    angular.module(Constants.Paths.Home.Main.Uri, [])
        .config(['$stateProvider', statesConfiguration]);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Constants.Paths.Home.Main.Path, {
            url: '/' + Constants.Paths.Home.Main.Uri,
            views: {
                'home-tab': {
                    templateUrl: 'views/' + Constants.Paths.Home.Main.Uri + '.html'
                }
            }
        })
            .state(Constants.Paths.Home.Scroll.Path, {
            url: '/' + Constants.Paths.Home.Main.Uri,
            views: {
                'home-tab': {
                    templateUrl: 'views/' + Constants.Paths.Home.Scroll.Uri + '.html'
                }
            }
        });
    }
})(Home || (Home = {}));
var Side;
(function (Side) {
    'use strict';
    angular.module(Constants.Paths.Side.Main.Uri, [])
        .config(['$stateProvider', statesConfiguration]);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Constants.Paths.Side.Main.Path, {
            url: '/' + Constants.Paths.Side.Main.Uri,
            views: {
                'left-tab': {
                    templateUrl: 'views/' + Constants.Paths.Side.Main.Uri + '.html'
                }
            }
        });
    }
})(Side || (Side = {}));
var Tabs;
(function (Tabs) {
    'use strict';
    angular.module(Constants.Paths.Tabs, [])
        .config(['$stateProvider', statesConfiguration]);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Constants.Paths.Tabs, {
            url: '/' + Constants.Paths.Tabs,
            abstract: true,
            templateUrl: 'templates/' + Constants.Paths.Tabs + '.html'
        });
    }
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
        ActionsController.prototype.exampleAction = function () {
            this.property = 'Random ' + Math.floor(Math.random() * 100 + 1);
        };
        ActionsController.$inject = [
            '$http'
        ];
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
        NavigationController.$inject = [
            '$ionicHistory',
            '$ionicTabsDelegate'
        ];
        return NavigationController;
    })();
    Tabs.NavigationController = NavigationController;
    angular.module(Constants.Paths.Tabs)
        .controller('navigationController', NavigationController);
})(Tabs || (Tabs = {}));
