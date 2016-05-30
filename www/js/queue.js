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
        var songTitle = utilities.checkUndefinedString(songData.title);
        var songArtist = utilities.checkUndefinedString(songData.artist);
        var songAlbum = utilities.checkUndefinedString(songData.album);
        var songYear = utilities.checkUndefinedString(songData.year);

        // Update the Now Playing information for the current song
        np_cover.innerHTML = '<img src="' + queue.albumArtMap[songData.cover] + '" class="album-art" />';
        np_title.innerText = songTitle;
        np_artist.innerText = songArtist;
        np_album.innerText = songAlbum;
        np_year.innerText = songYear;

        // Update the page title
        if (songArtist !== '' && songTitle !== '') {
            document.title = songArtist + ' - ' + songTitle + ' - Chordova';
        } else if (songArtist !== '') {
            document.title = songArtist + ' - Chordova';
        } else if (songTitle !== '') {
            document.title = songTitle + ' - Chordova';
        } else {
            document.title = 'Chordova';
        }

        $('.current-song').removeClass('current-song');
        queue.currentIndex = index;
        ui.highlightCurrentSong();

        player.src = songData.path;
        player.play();

        // Display a notification if not in the browser
        if (typeof device !== 'undefined' && device.platform !== 'browser') {
            notification.schedule({
                title: songData.title,
                text: songData.artist,
                sound: null,
                ongoing: true
            });
        }
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
