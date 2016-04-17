var jsmediatags = window.jsmediatags;

var app = {
    songQueue: [],
    currentIndex: 0,

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

    addSongToQueue: function (song) {
        jsmediatags.read(song, {
            onSuccess: function(jsonTags) {
                var tags = jsonTags.tags;

                var songData = {
                    'title': tags.title,
                    'artist': tags.artist,
                    'album': tags.album,
                    'year': tags.year,
                    'cover': app.createAlbumArtDataURI(tags.picture),
                    'path': URL.createObjectURL(song)
                };

                app.songQueue.push(songData);
                app.createPlaylistHTML();

                // TODO: Improve how the first song is played
                if (player.paused) {
                    app.playSong(0);
                }
            },
            onError: function(error) {
                alert(error);
            }
        });
    },

    playSong: function (index) {
        var songData = app.songQueue[index];

        // Update the Now Playing information for the current song
        np_cover.innerHTML = '<img src="' + songData.cover + '" />';
        np_title.innerText = songData.title;
        np_artist.innerText = songData.artist;
        np_album.innerText = songData.album;
        np_year.innerText = songData.year;

        $('.current-song').removeClass('current-song');
        app.currentIndex = index;
        $('#song-' + app.currentIndex).addClass('current-song');

        player.src = songData.path;
        player.play();
    },

    // deviceready Event Handler
    onDeviceReady: function () {
        // Listener to add selected files to the song queue
        file_select.onchange = function() {
            for (var i = 0; i < this.files.length; i++) {
                app.addSongToQueue(this.files[i]);
            }
        };

        player.addEventListener('timeupdate', function () {
            current_time.innerText = app.formatAudioDuration(player.currentTime);
        });

        player.addEventListener('ended', function () {
            $('#next').click();
        });

        $('#pause').click(function () {
            player.paused ? player.play() : player.pause();
        });

        $('#stop').click(function () {
            player.pause();
            player.currentTime = 0;
        });

        $('#next').click(function () {
            try {
                app.playSong(++app.currentIndex);
            } catch (e) {
                app.currentIndex = 0;
                app.playSong(app.currentIndex);
            }
        });

        $('#prev').click(function () {
            try {
                app.playSong(--app.currentIndex);
            } catch (e) {
                app.currentIndex = app.songQueue.length - 1;
                app.playSong(app.currentIndex);
            }
        });
    },

    createAlbumArtDataURI: function (picture) {
        if (!picture) {
            return '';
        }

        var base64 = '';
        
        for (var i = 0; i < picture.data.length; i++) {
            base64 += String.fromCharCode(picture.data[i]);
        }

        return 'data:' + picture.format + ';base64,' + window.btoa(base64);
    },

    createPlaylistHTML: function () {
        // Rewrite playlist with all songs
        playlist.innerHTML = '<ul><li>' + $.map(app.songQueue, function (obj, index) {
                return '<button id="song-' + index + '">' + obj.artist + ' - ' + obj.title + '</button>'
                    + '<button id="delete-song-' + index + '">X</button>';
            }).join('</li><li>') + '</li></ul>';

        app.addPlaylistButtonListeners();

        $('#song-' + app.currentIndex).addClass('current-song');
    },

    addPlaylistButtonListeners: function () {
        // Reset listeners for playing songs from the playlist
        $('button[id^="song-"]').click(function () {
            // Get the index for the selected song, which is after the last hyphen in the button id
            var index = parseInt(/[^-]*$/.exec(this.id)[0]);

            app.playSong(index);
        });

        // Reset listeners for deleting songs from the playlist
        $('button[id^="delete-song-"]').click(function () {
            // Get the index for the selected song to delete, which is after the last hyphen in the button id
            var index = parseInt(/[^-]*$/.exec(this.id)[0]);

            app.songQueue.splice(index, 1);
            app.createPlaylistHTML();
        });
    },

    formatAudioDuration: function (seconds) {
        var minutes = Math.floor(seconds / 60);

        minutes = minutes >= 10 ? minutes : '0' + minutes;
        seconds = Math.floor(seconds % 60);
        seconds = seconds >= 10 ? seconds : '0' + seconds;

        return (isNaN(minutes) ? '--' : minutes) + ':' + (isNaN(seconds) ? '--' : seconds);
    },
};

app.initialize();
