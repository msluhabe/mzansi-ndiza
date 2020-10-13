/*
 * Title:   Travelo - Travel, Tour Booking HTML5 Template - Page Loading Js
 * Author:  http://themeforest.net/user/soaptheme
 */

// pace.js should be active


/*<script type="text/javascript">var MEDIA_URL = "{{MEDIA_URL}}";</script>*/

if (typeof Pace != "undefined") {
    var soapPageLoadingContent = false;
    //document.write('<img alt="" src="'{{ MEDIA_URL }}logo2.png'" style="display: none;">');
    var logoImg = new Image();
    logoImg.src = "{{ MEDIA_URL }}logo2.png";
    var soapPageLoadingProgressInterval = setInterval(function() {
        try {
            if (document.body.className.indexOf("pace-done") != -1) {
                clearInterval(soapPageLoadingProgressInterval);
            }
            if (document.body.className.indexOf("pace-running") == -1) {
                return;
            }
            if (!soapPageLoadingContent) {
                document.getElementsByClassName("pace-activity")[0].innerHTML = '<div class="loading-page style1">' +
                                                '<div class="loading-page-wrapper">' +
                                                    '<div class="container">' +
                                                            '<h1 class="logo block">' +
                                                                '<a title="Travelo" href="#">' +
                                                                    '<img alt="" src="{{ MEDIA_URL }}logo2.png">' +
                                                                '</a>' +
                                                            '</h1>' +
                                                            '<div class="loading-progress-bar block col-sm-10 col-md-9 col-lg-8">' +
                                                                '<div style="width: 1%;" class="loading-progress"></div>' +
                                                            '</div>' +
                                                            '<span class="loading-text">Loading...</span>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>';
                soapPageLoadingContent = true;
            }

            var percent = document.getElementsByClassName("pace-progress")[0].getAttribute("data-progress-text");
            document.getElementsByClassName("loading-progress")[0].style.width = percent;
        } catch(e) {  }
    }, 50);
}