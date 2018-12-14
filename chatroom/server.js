/*** Created by bill.min on 2018/12/12.*/
var ws = require("nodejs-websocket");
var express = require('express');
var app = express();
var chat = require("./server/chat");

console.log("websocket开始连接...")
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('./'));

var server = ws.createServer(function (conn) {
    conn.on("text", function (str) {
        chat.sendMessage(conn, str);
    })
    conn.on("close", function (code, reason) {
        chat.closeChat(conn);
    });
    conn.on("error", function (code, reason) {
        chat.chatError(conn);
    });
}).listen(8001)
console.log("WebSocket建立完毕")

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});