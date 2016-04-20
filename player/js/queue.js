var queue = {
    songQueue: [],
    albumArtMap: {},
    currentIndex: 0,

    getAlbumArt: function (tags) {
        var hash = md5(tags.artist + tags.album);

        // Process and store the album art if it's not already stored
        if (!(hash in queue.albumArtMap)) {
            queue.albumArtMap[hash] = utilities.createAlbumArtDataURI(tags.picture);
        }

        return hash;
    },

    playSong: function (index) {
        var songData = queue.songQueue[index];

        // Update the Now Playing information for the current song
        np_cover.innerHTML = '<img src="' + queue.albumArtMap[songData.cover] + '" class="album-art" />';
        np_title.innerText = songData.title;
        np_artist.innerText = songData.artist;
        np_album.innerText = songData.album;
        np_year.innerText = songData.year;

        // Update the page title
        document.title = songData.artist + ' - ' + songData.title + ' - Chordova';

        $('.current-song').removeClass('current-song');
        queue.currentIndex = index;
        ui.highlightCurrentSong();

        player.src = songData.path;
        player.play();
    },

    addSong: function (song) {
        jsmediatags.read(song, {
            onSuccess: function (jsonTags) {
                var tags = jsonTags.tags;

                var songData = {
                    'title': tags.title,
                    'artist': tags.artist,
                    'album': tags.album,
                    'year': tags.year,
                    'cover': queue.getAlbumArt(tags),
                    'path': URL.createObjectURL(song)
                };

                queue.songQueue.push(songData);
                ui.createPlaylistHTML();

                // TODO: Improve how the first song is played
                if (player.paused) {
                    queue.playSong(0);
                }
            },
            onError: function (error) {
                alert(error);
            }
        });
    },

    addSongs: function (songList) {
        for (var i = 0; i < songList.length; i++) {
            queue.addSong(songList[i]);
        }
    },

    deleteSong: function (index) {
        queue.songQueue.splice(index, 1);
    },
};
