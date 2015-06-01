/// <reference path="../imports.ts" />

module App {
    export interface INavigationScope extends ng.IScope {
        onSwipeLeft: Function;
        onSwipeRight: Function;
    }
} 
