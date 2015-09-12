// Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.  Licensed under the Apache License, Version 2.0.  See License.txt in the project root for license information.
// JavaScript Dynamic Content shim for Windows Store apps
// from https://github.com/MSOpenTech/winstore-jscompat/blob/master/winstore-jscompat.js
(function () { if (window.MSApp && MSApp.execUnsafeLocalFunction) { var e = Object.getOwnPropertyDescriptor(Element.prototype, "setAttribute").value; var t = Object.getOwnPropertyDescriptor(Element.prototype, "removeAttribute").value; var n = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "insertAdjacentHTML"); var r = Object.getOwnPropertyDescriptor(Node.prototype, "attributes").get; var i = Object.getOwnPropertyDescriptor(Node.prototype, "childNodes").get; var s = document.createElement("div"); function o(e) { return r.call(e) } function u(t, n, r) { try { e.call(t, n, r) } catch (i) { } } function a(e, n) { t.call(e, n) } function f(e) { return i.call(e) } function l(e) { while (e.childNodes.length) { e.removeChild(e.lastChild) } } function c(e, t, r) { n.value.call(e, t, r) } function h() { var e = true; try { s.innerHTML = "<test/>" } catch (t) { e = false } return e } function p(e, t) { function i(e) { var t = o(e); if (t && t.length) { var n; for (var r = 0, s = t.length; r < s; r++) { var l = t[r]; var c = l.name; if ((c[0] === "o" || c[0] === "O") && (c[1] === "n" || c[1] === "N")) { n = n || []; n.push({ name: l.name, value: l.value }) } } if (n) { for (var r = 0, s = n.length; r < s; r++) { var l = n[r]; a(e, l.name); u(e, "x-" + l.name, l.value) } } } var h = f(e); for (var r = 0, s = h.length; r < s; r++) { i(h[r]) } } var n = document.implementation.createHTMLDocument("cleaner"); l(n.documentElement); MSApp.execUnsafeLocalFunction(function () { c(n.documentElement, "afterbegin", e) }); var r = n.documentElement.querySelectorAll("script"); Array.prototype.forEach.call(r, function (e) { switch (e.type.toLowerCase()) { case "": e.type = "text/inert"; break; case "text/javascript": case "text/ecmascript": case "text/x-javascript": case "text/jscript": case "text/livescript": case "text/javascript1.1": case "text/javascript1.2": case "text/javascript1.3": e.type = "text/inert-" + e.type.slice("text/".length); break; case "application/javascript": case "application/ecmascript": case "application/x-javascript": e.type = "application/inert-" + e.type.slice("application/".length); break; default: break } }); i(n.documentElement); var s = []; if (t.tagName === "HTML") { s = Array.prototype.slice.call(document.adoptNode(n.documentElement).childNodes) } else { if (n.head) { s = s.concat(Array.prototype.slice.call(document.adoptNode(n.head).childNodes)) } if (n.body) { s = s.concat(Array.prototype.slice.call(document.adoptNode(n.body).childNodes)) } } return s } function d(e, t) { var n = Object.getOwnPropertyDescriptor(HTMLElement.prototype, e); var r = n.set; Object.defineProperty(HTMLElement.prototype, e, { get: n.get, set: function (e) { if (window.WinJS && window.WinJS._execUnsafe && h()) { r.call(this, e) } else { var i = this; var s = p(e, i); MSApp.execUnsafeLocalFunction(function () { t(n, i, s) }) } }, enumerable: n.enumerable, configurable: n.configurable }) } d("innerHTML", function (e, t, n) { l(t); for (var r = 0, i = n.length; r < i; r++) { t.appendChild(n[r]) } }); d("outerHTML", function (e, t, n) { for (var r = 0, i = n.length; r < i; r++) { t.insertAdjacentElement("afterend", n[r]) } t.parentNode.removeChild(t) }) } })()

// CustomEvent
window.CustomEvent = function () { var e = function (e, t) { var n; t = t || { bubbles: !1, cancelable: !1, detail: void 0 }; try { n = document.createEvent("CustomEvent"), n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail) } catch (o) { n = document.createEvent("Event"); for (var a in t) n[a] = t[a]; n.initEvent(e, t.bubbles, t.cancelable) } return n }; return e.prototype = window.Event.prototype, e }();

// Back button windows
if (window.Windows && Windows.Phone && Windows.Phone.UI.Input.HardwareButtons && document.createEvent) { var newEvent = document.createEvent("Event"); newEvent.initEvent("backbutton", !0, !0), Windows.Phone.UI.Input.HardwareButtons.addEventListener("backpressed", function (n) { n.handled = !0, document.dispatchEvent(newEvent) }) }


// Check appbar status maybe we will do this better in the future
var onDeviceReady = function () {
    window.requestAnimationFrame(checkScroll);
}
document.addEventListener("deviceready", onDeviceReady, false);

var lastScroll = 0;
var frame = 0;
function checkScroll() {
    if (frame === 30) {
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
