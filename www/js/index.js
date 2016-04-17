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

                // Rewrite playlist with all songs
                playlist.innerHTML = '<ul><li>' + $.map(app.songQueue, function(obj){
                    return obj.title
                }).join('</li><li>') + '</li></ul>';

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
};

app.initialize();
