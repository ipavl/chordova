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
};
