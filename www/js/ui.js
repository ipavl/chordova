var ui = {
    createPlaylistHTML: function () {
        // Rewrite playlist with all songs
        playlist.innerHTML = '<ul><li>' + $.map(queue.songQueue, function (obj, index) {
                return '<button id="song-' + index + '">' + obj.artist + ' - ' + obj.title + '</button>'
                    + '<button id="delete-song-' + index + '">X</button>';
            }).join('</li><li>') + '</li></ul>';

        ui.addPlaylistButtonListeners();

        $('#song-' + queue.currentIndex).addClass('current-song');
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
