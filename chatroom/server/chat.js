var userList = [];
//接收和发送消息
exports.sendMessage = function (conn, str) {
    console.log("收到的信息为:" + str)
    var json = JSON.parse(str);
    var hasObj = false;
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].id === json.id) {
            hasObj = true;
        }
    }
    if (!hasObj) {
        userList.push({
            id: json.id,
            name: json.name,
            isReady: true,
            obj: conn,
            imgid: json.imgid,
            ip: json.ip,
            city: json.city
        });
    }

    var data = getUserList(null);
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].isReady) {
            userList[i].obj.sendText(JSON.stringify({ id: json.id, type: json.type, name: json.name, message: json.message, imgid: json.imgid }));
        }
        if (json.type === 1) {
            userList[i].obj.send(JSON.stringify(data));
        }
    }
}

//关闭聊天室
exports.closeChat = function (conn) {
    var index = null;
    var data = getUserList(conn);
    for (var i = 0; i < userList.length; i++) {
        var item = userList[i];
        if (item.obj.key === conn.key) {
            index = i;
        }
    }
    if (index != null) {
        var close_item = userList[index];
        for (var i = 0; i < userList.length; i++) {
            var item = userList[i];
            if (i != index) {
                item.obj.sendText(JSON.stringify({ type: 1, message: close_item.name + "退出了群聊" }));
                item.obj.send(JSON.stringify(data));
            }
        }
        userList.splice(index, 1);
    }
    console.log("关闭连接")
}

//抛出异常
exports.chatError = function (conn) {
    this.closeChat(conn);
    console.log("异常关闭")
}

function getUserList(left_item) {
    var data = { "type": 10, "userList": [] };
    for (var i = 0; i < userList.length; i++) {
        var item = userList[i];
        var bool = left_item ? item.obj.key === left_item.key ? false : true : true;
        if (bool) {
            data.userList.push({
                id: item.id,
                name: item.name,
                imgid: item.imgid,
                ip: item.ip,
                city: item.city
            });
        }
    }

    return data;
}