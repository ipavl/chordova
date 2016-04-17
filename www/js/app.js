var utilities = window.utilities;
var controls = window.controls;
var ui = window.ui;
var queue = window.queue;

var jsmediatags = window.jsmediatags;

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    onDeviceReady: function () {
        // Listener to add selected files to the song queue
        file_select.onchange = function() {
            queue.addSongs(this.files);
        };

        player.addEventListener('timeupdate', function () {
            ui.updateCurrentTime();
        });

        player.addEventListener('ended', function () {
            controls.next();
        });

        $('#pause').click(function () {
            controls.pause();
        });

        $('#stop').click(function () {
            controls.stop();
        });

        $('#next').click(function () {
            controls.next();
        });

        $('#prev').click(function () {
            controls.previous();
        });
    },
};

app.initialize();
