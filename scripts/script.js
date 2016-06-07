function fillYearSpans() {
    var dt = new Date();
    var year = dt.getFullYear();
    $(".year-holder").text(year);
}

// need this defined in global scope for some reason.
// Thanks, the weather network.
var _plm = _plm || [];

function doTWN() {

    _plm.push(['_btn', 32229]);
    _plm.push(['_loc', 'caon0444']);
    _plm.push(['location', document.location.host]);
    (function(d, e, i) {
        if (d.getElementById(i)) return;
        var px = d.createElement(e);
        px.type = 'text/javascript';
        px.async = true;
        px.id = i;
        px.src = ('https:' == d.location.protocol ? 'https:' : 'http:') + '//widget.twnmm.com/js/btn/pelm.js?orig=en_ca';
        var s = d.getElementsByTagName('script')[0];

        var py = d.createElement('link');
        py.rel = 'stylesheet';
        py.href = ('https:' == d.location.protocol ? 'https:' : 'http:') + '//widget.twnmm.com/styles/btn/styles.css';

        s.parentNode.insertBefore(px, s);
        s.parentNode.insertBefore(py, s);
    })(document, 'script', 'plmxbtn');
}

var helpers = (function() {
    return {

        ajaxGet: function(url) {
            return $.ajax({
                url: url,
                data: {},
                dataType: 'json',
                cache: false,
                async: true,
                type: "GET"
            });
        },

        currency: function(val) {
            return "$" + Number(val).toFixed(2);
        },

        findByPropertyValue: function(objs, prop, value) {
            if ($.isArray(objs)) {
                var result = objs.filter(function(obj) {
                    return obj[prop] === value;
                });
                if (result.length > 0) {
                    return result[0];
                }
            } else {
                return null;
            }
        }
    };
}());
