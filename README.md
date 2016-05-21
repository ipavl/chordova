Chordova
========

Chordova is a web-based audio player designed to play audio files you already have on your computer or mobile device. It uses [Apache Cordova](https://cordova.apache.org) to target mobile devices as an app (so no internet connection is required), with mobile-specific functionality granted through Cordova plugins. Chordova is also able to run as a static webpage to theoretically be usable on any platform with a web browser that supports HTML5 and JavaScript.

Demo
----

A demo can be found at https://ipavl.github.io/chordova/player/

Build
-----

1. [Install Cordova](https://cordova.apache.org/#getstarted)

2. From the project root, add the platform(s) you want to target:
```
cordova platform add <platform>
```
See `cordova platform list` for options - only the browser and Android have been tested so far

3. Run the app with `cordova run <platform>` or `cordova serve`
