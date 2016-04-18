var controls = {
    repeatStates: Object.freeze({NONE: 0, ONE: 1, ALL: 2}),
    repeatState: 0,

    pause: function () {
        player.paused ? player.play() : player.pause();
    },

    stop: function () {
        player.pause();
        player.currentTime = 0;
    },

    next: function () {
        try {
            switch (controls.repeatState) {
                case controls.repeatStates.ONE:
                    queue.playSong(queue.currentIndex);
                    break;
                default:
                    queue.playSong(++queue.currentIndex);
                    break;
            }
        } catch (e) {
            queue.currentIndex = 0;
            queue.playSong(queue.currentIndex);
        }
    },

    previous: function () {
        try {
            switch (controls.repeatState) {
                case controls.repeatStates.ONE:
                    queue.playSong(queue.currentIndex);
                    break;
                default:
                    queue.playSong(--queue.currentIndex);
                    break;
            }
        } catch (e) {
            queue.currentIndex = queue.songQueue.length - 1;
            queue.playSong(queue.currentIndex);
        }
    },

    repeat: function () {
        // Set the repeat state to the next state and update the button
        switch (controls.repeatState) {
            case controls.repeatStates.NONE:
                controls.repeatState = controls.repeatStates.ONE;
                repeat_state.innerText = '1';
                break;

            case controls.repeatStates.ONE:
                controls.repeatState = controls.repeatStates.ALL;
                repeat_state.innerText = 'All';
                break;

            case controls.repeatStates.ALL:
            default:
                controls.repeatState = controls.repeatStates.NONE;
                repeat_state.innerText = '';
                break;
        }
    },
};
