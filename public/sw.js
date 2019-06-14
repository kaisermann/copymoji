/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "bundle.js",
    "revision": "180501c22f153a12e2c1571d75f124d9"
  },
  {
    "url": "favicon.ico",
    "revision": "db1b0fa306454b656174158892fbb6bc"
  },
  {
    "url": "index.html",
    "revision": "ceb958d77606834da4f793c2f7220895"
  },
  {
    "url": "manifest.json",
    "revision": "28b9e30741d4305ed2f611164ba9b5b0"
  },
  {
    "url": "style.css",
    "revision": "23ebd6a99a9ad077733f82b37186ef29"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
