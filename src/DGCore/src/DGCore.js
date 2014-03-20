DG.loaderParams = window.__dgApi_params;
window.__dgApi_params = undefined;

DG.Icon.Default.imagePath  = '../img/vendors/leaflet';

/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
/* jshint ignore:end */

/*global ga:false*/
ga('create', '__GA_CODE__', 'none');
ga('send', 'pageview');

//track statistics
function trackStat(ip) {
    var newImg = new Image();
    newImg.src = 'http://127.0.0.1:8888/track-user.png?' +
                  'sr=' + window.screen.width + 'x' + window.screen.height + '&' +
                  'ip=' + ip;
}

//get user ip
DG.ajax('http://jsonip.appspot.com/?callback=?', {
    type: 'jsonp'
}).then(function (data) {
    trackStat(data.ip);
});

// Improve IHandler
DG.Map.include({
    addHandler: function (name, HandlerClass) {
        if (!HandlerClass) { return; }

        var options = this.options[name],
            param = (options === Object(options)) ? options : null,
            handler = this[name] = new HandlerClass(this, param);

        this._handlers.push(handler);

        if (options) {
            handler.enable();
        }

        return this;
    }
});
