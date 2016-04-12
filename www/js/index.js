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
                    np_title.innerText = tags.title;
                    np_artist.innerText = tags.artist;
                    np_album.innerText = tags.album;
                    np_year.innerText = tags.year;
                },
                onError: function(error) {
                    alert(error);
                }
            });
        }
    },
};

app.initialize();
