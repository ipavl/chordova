var utilities = {
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

    formatAudioDuration: function (seconds) {
        var minutes = Math.floor(seconds / 60);

        minutes = minutes >= 10 ? minutes : '0' + minutes;
        seconds = Math.floor(seconds % 60);
        seconds = seconds >= 10 ? seconds : '0' + seconds;

        return (isNaN(minutes) ? '--' : minutes) + ':' + (isNaN(seconds) ? '--' : seconds);
    },
    
    shufflePlaylistArray: function (array) {
        var arrayLength = array.length, temp, rand;

        // While there remain elements to shuffle
        while (arrayLength) {
            // Pick a remaining element
            rand = Math.floor(Math.random() * arrayLength--);

            // Swap it with the current element
            temp = array[arrayLength];
            array[arrayLength] = array[rand];
            array[rand] = temp;
        }

        return array;
    },
};
