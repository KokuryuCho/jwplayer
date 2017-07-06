(function(playerLibrary) {
    // Check if the version of the player requires the compatibility shim
    if (parseInt(playerLibrary.version, 10) >= 8) {

      // Redefine jwplayer global
      window.jwplayer = function(query) {

        // Get JW Player 8 instance
        var playerInstance = playerLibrary(query);


        playerInstance.dispatchEvent = playerInstance.trigger;
        playerInstance.removeEventListener = playerInstance.off.bind(this);
        playerInstance.getItem = playerInstance.getPlaylistIndex;
        playerInstance.getMeta = playerInstance.getItemMeta;
        playerInstance.getRenderingMode = () => { return 'html5'; };

        // Add deprecated API methods
        var callbackMap = {
            onBuffer: 'buffer',
            onPause: 'pause',
            onPlay: 'play',
            onIdle: 'idle',
            onBufferChange: 'bufferChange',
            onBufferFull: 'bufferFull',
            onError: 'error',
            onSetupError: 'setupError',
            onFullscreen: 'fullscreen',
            onMeta: 'meta',
            onMute: 'mute',
            onPlaylist: 'playlist',
            onPlaylistItem: 'playlistItem',
            onPlaylistComplete: 'playlistComplete',
            onReady: 'ready',
            onResize: 'resize',
            onComplete: 'complete',
            onSeek: 'seek',
            onTime: 'time',
            onVolume: 'volume',
            onBeforePlay: 'beforePlay',
            onBeforeComplete: 'beforeComplete',
            onDisplayClick: 'displayClick',
            onControls: 'controls',
            onQualityLevels: 'levels',
            onQualityChange: 'levelsChanged',
            onCaptionsList: 'captionsList',
            onCaptionsChange: 'captionsChanged',
            onAdError: 'adError',
            onAdClick: 'adClick',
            onAdImpression: 'adImpression',
            onAdTime: 'adTime',
            onAdComplete: 'adComplete',
            onAdCompanions: 'adCompanions',
            onAdSkipped: 'adSkipped',
            onAdPlay: 'adPlay',
            onAdPause: 'adPause',
            onAdMeta: 'adMeta',
            onCast: 'cast',
            onAudioTrackChange: 'audioTrackChanged',
            onAudioTracks: 'audioTracks'
        };

        callbackMap.forEach((value, name) => {
            playerInstance[value] = (callback) => {
                playerInstance.on(name, callback);
            };
        });

//        var passthroughs = [
//            'attachMedia',
//        ];
//        passthroughs.forEach(function (name) {
//            _api[name] = function() {
//                _controller[name].apply(_controller, arguments);
//                return _api;
//            };
//        });
//
//        this.createInstream = function () {
//            return _controller.createInstream();
//        };
//
//        var passthroughs2 = [
//            'getMeta',
//            'detachMedia'
//        ];
//        passthroughs2.forEach(function (name) {
//            _api[name] = function() {
//                if (_controller[name]) {
//                    return _controller[name].apply(_controller, arguments);
//                }
//                return null;
//            };
//        });
        return playerInstance;
      };
      // Add deprecated library items
      window.jwplayer.utils = x;
    }
}(window.jwplayer));