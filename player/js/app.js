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
        //document.addEventListener('deviceready', this.onDeviceReady, false);  // doesn't work when standalone in browser
        this.onDeviceReady();
    },

    // deviceready Event Handler
    onDeviceReady: function () {
        // Listener to add selected files to the song queue
        file_select.onchange = function () {
            queue.addSongs(this.files);
        };

        player.addEventListener('timeupdate', function () {
            ui.updateCurrentTime();
        });

        player.addEventListener('ended', function () {
            if (queue.currentIndex === queue.songQueue.length - 1 && controls.repeatState === controls.repeatStates.NONE) {
                queue.playSong(0);
                player.pause();
            } else if (controls.repeatState === controls.repeatStates.ONE) {
                queue.playSong(queue.currentIndex);
            } else {
                controls.next();
            }
        });

        // Fake file select button
        $('#file_select_button').click(function () {
            // This will click the real file select input
            $('#file_select').click();
        });

        $('#playlist_button').click(function () {
            var playlistDiv = $('#playlist');
            playlistDiv.toggle();

            if (window.matchMedia('(min-width: 768px)').matches) {
                // Adjust the location of the now playing information if the playlist is showing on larger screens
                if (playlistDiv.is(':visible')) {
                    $('#now_playing').css({bottom: '47.5%'});
                } else {
                    $('#now_playing').css({bottom: 0});
                }
            } else {
                // Hide the now playing information if the playlist is showing on mobile
                if (playlistDiv.is(':visible')) {
                    $('#now_playing').hide();
                } else {
                    $('#now_playing').show();
                }
            }
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

        $('#repeat').click(function () {
            controls.repeat();
        });

        $('#shuffle').click(function () {
            controls.shuffle();
        });
    },
};

app.initialize();
