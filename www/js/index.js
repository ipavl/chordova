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
        // Listener to play a file when it is selected
        file_select.onchange = function() {
            var file = this.files[0];
            player.src = URL.createObjectURL(file);
            player.play();

            jsmediatags.read(file, {
                onSuccess: function(jsonTags) {
                    var tags = jsonTags.tags;

                    // Update the Now Playing information
                    np_cover.innerHTML = '<img src="' + app.createAlbumArtDataURI(tags.picture) + '" />';
                    np_title.innerText = tags.title;
                    np_artist.innerText = tags.artist;
                    np_album.innerText = tags.album;
                    np_year.innerText = tags.year;
                },
                onError: function(error) {
                    alert(error);
                }
            });
        };

        $('#pause').click(function () {
            player.paused ? player.play() : player.pause();
        });

        $('#stop').click(function () {
            player.pause();
            player.currentTime = 0;
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
