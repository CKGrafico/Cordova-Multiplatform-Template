/// <reference path="../imports.ts" />

module App {
    export interface IActionsScope extends ng.IScope {
        exampleAction: Function;
        property: String;
    }
} 
