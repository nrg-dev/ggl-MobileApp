$(document).on("pageshow", function () {
    $('.ui-panel .ui-panel-inner').css({
        'height': ($(document).height()) + 'px'
    });
    $(window).resize(function () {
        $('.ui-panel .ui-panel-inner').css({
            'height': ($(document).height()) + 'px'
        });
    });
});

$(document).on("panelbeforeopen", "#myPanel", function () {
    $(".ui-panel").css({
        "overflow": "hidden"
    });
    $(".ui-content").css({
        "overflow": "hidden",
        "position": "fixed"
    });
}).on("panelbeforeclose", "#myPanel", function () {
    $(".ui-panel").css({
        "overflow": "hidden"
    });
    $(".ui-content").css({
        "overflow": "hidden",
        
    });
        
    });
