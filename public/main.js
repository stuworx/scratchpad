var editor;
let template = ["<html>", " <head>", "", " </head>", "<body>", "  <h1>Hello World</h1>", "</body>", "</html>"];

$(function () {
    editor = CodeMirror.fromTextArea(document.getElementById("ed"), {
        mode: "text/html",
        htmlMode: true,
        matchClosing: true,
        alignCDATA: true,
        lineNumbers: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        lineWrapping: true
    });
    editor.on('change', function (editor) {
        document.getElementById("output").srcdoc = editor.getValue();
        if (localStorage) {
            localStorage.setItem("code", editor.getValue());
        }
    });
    if (localStorage) {
        var data = localStorage.getItem("code");
        if (data)
            editor.getDoc().setValue(data);
        else
            editor.getDoc().setValue(template.join('\n'));
    } else
        editor.getDoc().setValue(template.join('\n'));

    var height = window.innerHeight;
    $("#code_content").height(height).split({
        "orientation": "vertical",
        "limit": 100,
        position: '40%',
        percent: true
    });
});

function resetCode() {
    var isConfirm = confirm("Are you sure, Do you want to get rid of the current code?");
    if (isConfirm)
        editor.getDoc().setValue(template.join('\n'));
}

function formatCode() {
    var totalLines = editor.lineCount();
    var totalChars = editor.getTextArea().value.length;
    editor.autoFormatRange({
        line: 0,
        ch: 0
    }, {
        line: totalLines,
        ch: totalChars
    });
}

function downloadCode() {
    var blob = new Blob([editor.getValue()], {
        type: 'text/html'
    });
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = "index.html";
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}