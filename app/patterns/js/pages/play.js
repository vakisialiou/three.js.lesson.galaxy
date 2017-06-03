var play = new IW.Player('iw_play_container');

play
    .loadJson()
    .loadSkyBox()
    .loadSprites()
    .loadAllModels()
    .playsConfigOrbitControl()
    .startAjax( '/socket/info', function (multiLoader, ajaxData) {
        console.log(
            ajaxData.config.socket, 'asdasdas'
        );

        play.socketConnect = ajaxData.config.socket;

        play
            .setConnect()
            .init( play.updateModel );
    });
