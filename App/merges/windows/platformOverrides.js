// Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.  Licensed under the Apache License, Version 2.0.  See License.txt in the project root for license information.
// JavaScript Dynamic Content shim for Windows Store apps
// from https://github.com/MSOpenTech/winstore-jscompat/blob/master/winstore-jscompat.js
!function(){function e(e){return d.call(e)}function t(e,t,n){try{p.call(e,t,n)}catch(c){}}function n(e,t){s.call(e,t)}function c(e){return m.call(e)}function r(e){for(;e.childNodes.length;)e.removeChild(e.lastChild)}function a(e,t,n){u.value.call(e,t,n)}function o(){var e=!0;try{f.innerHTML="<test/>"}catch(t){e=!1}return e}function i(o,i){function l(r){var a=e(r);if(a&&a.length){for(var o,i=0,p=a.length;p>i;i++){var s=a[i],u=s.name;"o"!==u[0]&&"O"!==u[0]||"n"!==u[1]&&"N"!==u[1]||(o=o||[],o.push({name:s.name,value:s.value}))}if(o)for(var i=0,p=o.length;p>i;i++){var s=o[i];n(r,s.name),t(r,"x-"+s.name,s.value)}}for(var d=c(r),i=0,p=d.length;p>i;i++)l(d[i])}var p=document.implementation.createHTMLDocument("cleaner");r(p.documentElement),MSApp.execUnsafeLocalFunction(function(){a(p.documentElement,"afterbegin",o)});var s=p.documentElement.querySelectorAll("script");Array.prototype.forEach.call(s,function(e){switch(e.type.toLowerCase()){case"":e.type="text/inert";break;case"text/javascript":case"text/ecmascript":case"text/x-javascript":case"text/jscript":case"text/livescript":case"text/javascript1.1":case"text/javascript1.2":case"text/javascript1.3":e.type="text/inert-"+e.type.slice("text/".length);break;case"application/javascript":case"application/ecmascript":case"application/x-javascript":e.type="application/inert-"+e.type.slice("application/".length)}}),l(p.documentElement);var u=[];return"HTML"===i.tagName?u=Array.prototype.slice.call(document.adoptNode(p.documentElement).childNodes):(p.head&&(u=u.concat(Array.prototype.slice.call(document.adoptNode(p.head).childNodes))),p.body&&(u=u.concat(Array.prototype.slice.call(document.adoptNode(p.body).childNodes)))),u}function l(e,t){var n=Object.getOwnPropertyDescriptor(HTMLElement.prototype,e),c=n.set;Object.defineProperty(HTMLElement.prototype,e,{get:n.get,set:function(e){if(window.WinJS&&window.WinJS._execUnsafe&&o())c.call(this,e);else{var r=this,a=i(e,r);MSApp.execUnsafeLocalFunction(function(){t(n,r,a)})}},enumerable:n.enumerable,configurable:n.configurable})}if(window.MSApp&&MSApp.execUnsafeLocalFunction){var p=Object.getOwnPropertyDescriptor(Element.prototype,"setAttribute").value,s=Object.getOwnPropertyDescriptor(Element.prototype,"removeAttribute").value,u=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"insertAdjacentHTML"),d=Object.getOwnPropertyDescriptor(Node.prototype,"attributes").get,m=Object.getOwnPropertyDescriptor(Node.prototype,"childNodes").get,f=document.createElement("div");l("innerHTML",function(e,t,n){r(t);for(var c=0,a=n.length;a>c;c++)t.appendChild(n[c])}),l("outerHTML",function(e,t,n){for(var c=0,r=n.length;r>c;c++)t.insertAdjacentElement("afterend",n[c]);t.parentNode.removeChild(t)})}}();

// CustomEvent
window.CustomEvent = function () { var e = function (e, t) { var n; t = t || { bubbles: !1, cancelable: !1, detail: void 0 }; try { n = document.createEvent("CustomEvent"), n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail) } catch (o) { n = document.createEvent("Event"); for (var a in t) n[a] = t[a]; n.initEvent(e, t.bubbles, t.cancelable) } return n }; return e.prototype = window.Event.prototype, e }();

// Back button windows
if (window.Windows && Windows.Phone && Windows.Phone.UI.Input.HardwareButtons && document.createEvent) { var newEvent = document.createEvent("Event"); newEvent.initEvent("backbutton", !0, !0); Windows.Phone.UI.Input.HardwareButtons.addEventListener("backpressed", function (n) { n.handled = !0; document.dispatchEvent(newEvent); }) }

// Appbar
var lastScroll = 0;
var frame = 0;
function checkScroll() {
    if (frame === 20) {
        frame = 0;
        var s = document.querySelectorAll('.overflow-scroll');
        var sum = 0;
        if (s) {
            // Check scroll position
            for (var i = 0; i < s.length; i++) {
                sum += s[i].scrollTop;
            }

            // Show or hide appbar + add event handler
            var b = document.querySelectorAll('ion-header-bar .buttons-right');
            for (var i = 0; i < s.length; i++) {
                if (b[i]) {
                    if (b[i].clicked === undefined) {
                        b[i].clicked = false;
                        b[i].addEventListener('click', function () {
                            this.clicked = !this.clicked;
                        }, false);
                    }

                    if (b[i].querySelectorAll('button').length < 1) {
                        b[i].classList.add('disabled');
                    } else {
                        b[i].classList.remove('disabled');
                    }

                    if (sum < 15 || b[i].clicked) {
                        b[i].classList.remove('hidden');
                    } else {
                        b[i].classList.add('hidden');
                    }
                }
            }
            lastScroll = sum;
        }
    }
    frame++;
    requestAnimationFrame(checkScroll);
}

// Check appbar status maybe we will do this better in the future
var onDeviceReady = function () {
    window.requestAnimationFrame(checkScroll);
}
document.addEventListener("deviceready", onDeviceReady, false);
