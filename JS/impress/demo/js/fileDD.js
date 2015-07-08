/*
 filedrag.js - HTML5 File Drag & Drop demonstration
 Featured on SitePoint.com
 Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
 */
(function () {

    // getElementById
    function $id(id) {
        return document.getElementById(id);
    }


    // output information
    function Output(msg, flag) {
        var m = $id("filedrag");
        if (flag) {
            m.innerHTML = msg;
        } else {
            m.innerHTML = msg + m.innerHTML;
        }
    }


    // file drag hover
    function FileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }


    // file selection
    function FileSelectHandler(e) {

        // cancel event and hover styling
        FileDragHover(e);

        // fetch FileList object
        var files = e.target.files || e.dataTransfer.files;

        // process all File objects
        for (var i = 0, f; f = files[i]; i++) {
            ParseFile(f);
        }

    }


    //  file information
    function ParseFile(file) {

        Output(
            "<p>File information: <strong>" + file.name +
                "</strong> type: <strong>" + file.type +
                "</strong> size: <strong>" + file.size +
                "</strong> bytes</p>", true
        );

        // display an image
        if (file.type.indexOf("image") == 0) {
            var reader = new FileReader();
            reader.onload = function (e) {
                Output(
                    "<p><strong>" + file.name + ":</strong><br />" +
                        '<img src="' + e.target.result + '" /></p>'
                );
            }
            reader.readAsDataURL(file);
        }

        // display text
        if (file.type.indexOf("text") == 0) {
            var reader = new FileReader();
            reader.onload = function (e) {
                Output(
                    "<p><strong>" + file.name + ":</strong></p><pre>" +
                        e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
                        "</pre>"
                );
            }
            reader.readAsText(file);
        }

    }


    // initialize
    function Init() {

        var filedrag = $id("filedrag");

        // is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {

            // file drop
            filedrag.addEventListener("dragover", FileDragHover, false);
            filedrag.addEventListener("dragleave", FileDragHover, false);
            filedrag.addEventListener("drop", FileSelectHandler, false);
            filedrag.style.display = "block";

        }

    }

    // call initialization file
    if (window.File && window.FileList && window.FileReader) {
        Init();
    }
    $id("notify").addEventListener("click", function () {
        if (window.Notification) {
            var title = 'HTML5 桌面通知',
                text = '通知内容描述';
            if (Notification.permission === 'granted') {
                var notification = new Notification(title, {body: text,icon:"img/h5.png"});
            } else {
                Notification.requestPermission();
            }
        }

    });
})();