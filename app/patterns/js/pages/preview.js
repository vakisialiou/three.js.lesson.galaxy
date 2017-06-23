var preview = false;

$('#iw_show_preview').click( function () {

    if (!preview) {

        preview = true;

        $(this).addClass('iw_hidden');

        var play = new IW.Player('iw_canvas_preview');

        play
            .prod(false)
            .loadSkyBox()
            .loadSprites()
            .loadModel(IW.Prepare.MODEL_EXPLORER, IW.Prepare.CATEGORY_SHIPS)
            .previewConfigOrbitControl()
            .start(function (multiLoader, ajaxData) {
                play
                    .initModelPreview()
                    .init();
            });
    }
});
