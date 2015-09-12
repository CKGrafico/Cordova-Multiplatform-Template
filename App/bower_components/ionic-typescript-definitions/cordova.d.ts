/// <reference path="ionic.d.ts" />

/**
 * Typescript definition for ionic framework
 * Bosa Daniele
 * 
 * v. 1.0.1
 * 
 * Based on Ionic Framework v. 1.0.0-beta.13 (http://ionicframework.com/)
 * Dependencies: angular.d.ts (https://github.com/borisyankov/DefinitelyTyped/blob/master/angularjs/angular.d.ts) for promises
 */ 

interface Cordova
{
    plugins: Plugins;
}

interface Plugins
{
    Keyboard: Ionic.Keyboard;
}

declare module Ionic
{
    interface Keyboard
    {
        /**
         * Hide the keyboard accessory bar with the next, previous and done buttons.
         *
         * @param hide
         */
        hideKeyboardAccessoryBar(hide: boolean): void;

        /**
         * Close the keyboard if it is open.
         */
        close(): void;

        /**
         * Disable native scrolling, useful if you are using JavaScript to scroll
         *
         * @param disbale
         */
        disableScroll(disable: boolean): void;

        /**
         * Whether or not the keyboard is currently visible.
         */
        isVisible: boolean;
    }
}
