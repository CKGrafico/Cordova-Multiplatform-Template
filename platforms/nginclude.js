(function(){
            (function () {
                angular.module('App', ['ionic'])
                	.controller('navigationController', App.NavigationController)
                	.controller('actionsController', App.ActionsController)
                    .config(['$httpProvider', httpInterceptor])
                    .run(['$rootScope', '$ionicLoading', httpInterceptorActions])
                    .config(function($provide){
                        $provide.decorator('ngIncludeDirective', ['$delegate', function ($delegate) {
                            //$delegate is array of all ng-click directive
                            //in this case first one is angular buildin ng-click
                            //so we remove it.
                            $delegate.shift();
                            return $delegate;
                        }]);
                    }).directive('ngInclude', function ($templateRequest, $anchorScroll, $animate, $sce) {
                        return {
                            restrict: 'A',
                            replace: false,
                            prioryty: 600,
                            terminal: true,
                            transclude: 'element',
                            controller: angular.noop,
                            compile: function (element, attr) {
                                var srcExp = attr.ngInclude || attr.src,
                                    onloadExp = attr.onload || '',
                                    autoScrollExp = attr.autoscroll;

                                srcExp = srcExp.slice(1);
                                if(srcExp.indexOf('partials') > -1){
                                	srcExp = 'merges/' + window.platform + '/' + srcExp;
                                }
                                srcExp = "'../../App/" + srcExp;

                                return function (scope, $element, $attr, ctrl, $transclude) {
                                    var changeCounter = 0,
                                        currentScope,
                                        previousElement,
                                        currentElement;

                                    var cleanupLastIncludeContent = function () {
                                        if (previousElement) {
                                            previousElement.remove();
                                            previousElement = null;
                                        }
                                        if (currentScope) {
                                            currentScope.$destroy();
                                            currentScope = null;
                                        }
                                        if (currentElement) {
                                            $animate.leave(currentElement).then(function () {
                                                previousElement = null;
                                            });
                                            previousElement = currentElement;
                                            currentElement = null;
                                        }
                                    };

                                    scope.$watch($sce.parseAsResourceUrl(srcExp), function ngIncludeWatchAction(src) {
                                        var afterAnimation = function () {
                                            // if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                                            //     $anchorScroll();
                                            // }
                                        };
                                        var thisChangeId = ++changeCounter;

                                        if (src) {
                                            //set the 2nd param to true to ignore the template request error so that the inner
                                            //contents and scope can be cleaned up.
                                            $templateRequest(src, true).then(function (response) {
                                                if (thisChangeId !== changeCounter) return;
                                                var newScope = scope.$new();
                                                ctrl.template = response;

                                                // Note: This will also link all children of ng-include that were contained in the original
                                                // html. If that content contains controllers, ... they could pollute/change the scope.
                                                // However, using ng-include on an element with additional content does not make sense...
                                                // Note: We can't remove them in the cloneAttchFn of $transclude as that
                                                // function is called before linking the content, which would apply child
                                                // directives to non existing elements.
                                                var clone = $transclude(newScope, function (clone) {
                                                    cleanupLastIncludeContent();
                                                    $animate.enter(clone, null, $element).then(afterAnimation);
                                                });

                                                currentScope = newScope;
                                                currentElement = clone;

                                                currentScope.$emit('$includeContentLoaded', src);
                                                scope.$eval(onloadExp);
                                            }, function () {
                                                if (thisChangeId === changeCounter) {
                                                    cleanupLastIncludeContent();
                                                    scope.$emit('$includeContentError', src);
                                                }
                                            });
                                            scope.$emit('$includeContentRequested', src);
                                        } else {
                                            cleanupLastIncludeContent();
                                            ctrl.template = null;
                                        }
                                    });
                                };
                            }
                        };
                    }).config(['$stateProvider', '$urlRouterProvider', states]).config(['$compileProvider', function ($compileProvider) {
			            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|mailto|ms-appx):/);
			        }]);
                    

                angular.bootstrap(document.querySelector('body'), ['App']);

                // Configure routes
			    function states($stateProvider, $urlRouterProvider) {
			        $stateProvider.state('tabs', {
			            url: "/tab",
			            abstract: true,
			            templateUrl: "../../App/merges/"+window.platform+"/templates/partials/tabs.html"
			        }).state('tabs.left', {
			            url: "/left",
			            views: {
			                'left-tab': {
			                    templateUrl: "../../App/templates/pages/left.html"
			                }
			            }
			        }).state('tabs.home', {
			            url: "/home",
			            views: {
			                'home-tab': {
			                    templateUrl: "../../App/templates/pages/home.html"
			                }
			            }
			        }).state('tabs.scroll', {
			            url: "/scroll",
			            views: {
			                'home-tab': {
			                    templateUrl: "../../App/templates/pages/scroll.html"
			                }
			            }
			        }).state('tabs.actions', {
			            url: "/actions",
			            views: {
			                'actions-tab': {
			                    controller: 'actionsController',
			                    templateUrl: "../../App/templates/pages/actions.html"
			                }
			            }
			        }).state('tabs.buttons', {
			            url: "/buttons",
			            views: {
			                'buttons-tab': {
			                    templateUrl: "../../App/templates/pages/buttons.html"
			                }
			            }
			        });
			        $urlRouterProvider.otherwise("/tab/home");
			    }

                 // Configure interceptor
                function httpInterceptor($httpProvider) {
                    $httpProvider.interceptors.push(function ($rootScope) {
                        return {
                            request: function (config) {
                                $rootScope.$broadcast('loading:show')
                                return config
                            },
                            response: function (response) {
                                $rootScope.$broadcast('loading:hide')
                                return response
                            }
                        }
                    })
                }

                // Configure interceptor actions
                function httpInterceptorActions($rootScope, $ionicLoading) {
                    $rootScope.$on('loading:show', function () {
                        $ionicLoading.show({ templateUrl: "../../App/templates/partials/loading.html"})
                    })

                    $rootScope.$on('loading:hide', function () {
                        $ionicLoading.hide()
                    })
                }
            })();
})();