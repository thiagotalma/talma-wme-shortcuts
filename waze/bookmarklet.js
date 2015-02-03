function bookmarkletCallback() {
    (function ($) {
        var jQuery = $;

        function callback() {
            acertaNomeRuaInit();
        }

        var s = document.createElement("script");
        s.src = "https://talma-bookmarklets.appspot.com/waze/acertarNomeRua.js?x=" + new Date().getTime();
        if (s.addEventListener) {
            s.addEventListener("load", callback, false)
        } else if (s.readyState) {
            s.onreadystatechange = callback
        }
        document.body.appendChild(s);
    })(jQuery.noConflict(true))
}
if (typeof jQuery != "function") {
    var s = document.createElement("script");
    s.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
    if (s.addEventListener) {
        s.addEventListener("load", bookmarkletCallback, false)
    } else if (s.readyState) {
        s.onreadystatechange = bookmarkletCallback
    }
    document.body.appendChild(s);
} else {
    bookmarkletCallback();
}