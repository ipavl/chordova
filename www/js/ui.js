var ui = {
    createPlaylistHTML: function () {
        // Rewrite playlist with all songs
        playlist.innerHTML = '<ul class="list-unstyled"><li>'
            + $.map(queue.songQueue, function (obj, index) {
                return '<button id="song-' + index + '" class="song-button">'
                    + '<strong>' + obj.title + '</strong>'
                    //+ '<br/>' // causes boxes to tear
                    + ' - '
                    + obj.artist + '</button>'
                    + '<button id="delete-song-' + index + '" class="song-button"><i class="fa fa-close"></i></button>';
            }).join('</li><li>') + '</li></ul>';

        ui.addPlaylistButtonListeners();

        $('#song-' + queue.currentIndex).addClass('current-song');
        $('#delete-song-' + queue.currentIndex).addClass('current-song');
    },

    addPlaylistButtonListeners: function () {
        // Reset listeners for playing songs from the playlist
        $('button[id^="song-"]').click(function () {
            // Get the index for the selected song, which is after the last hyphen in the button id
            var index = parseInt(/[^-]*$/.exec(this.id)[0]);

            queue.playSong(index);
        });

        // Reset listeners for deleting songs from the playlist
        $('button[id^="delete-song-"]').click(function () {
            // Get the index for the selected song to delete, which is after the last hyphen in the button id
            var index = parseInt(/[^-]*$/.exec(this.id)[0]);

            queue.deleteSong(index);
            ui.createPlaylistHTML();
        });
    },

    updateCurrentTime: function () {
        current_time.innerText = utilities.formatAudioDuration(player.currentTime);
    },
};
