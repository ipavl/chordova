var controls = {
    pause: function () {
        player.paused ? player.play() : player.pause();
    },

    stop: function () {
        player.pause();
        player.currentTime = 0;
    },

    next: function () {
        try {
            queue.playSong(++queue.currentIndex);
        } catch (e) {
            queue.currentIndex = 0;
            queue.playSong(queue.currentIndex);
        }
    },

    previous: function () {
        try {
            queue.playSong(--queue.currentIndex);
        } catch (e) {
            queue.currentIndex = queue.songQueue.length - 1;
            queue.playSong(queue.currentIndex);
        }
    },
};
