/*
用户类
*/
;
(function (window, $) {
    var users = function (option) {
        this.init(option);
    }

    users.prototype = {
        id: null,//用户id
        name: "",//用户姓名
        isSelect: false,//是否被选中，默认为false
        userItem: null,//用户对应的dom主体
        messageBox: null,//对应的聊天主窗体
        messages: [],//未读消息集合
        messageNum: 0,//未读消息数
        //初始化窗体
        init: function (option) {
            this.extend(option).create();
        },
        extend: function (option) {
            for (key in option) {
                this[key] = option[key];
            }

            return this;
        },
        //创建用户
        create: function () {


            this.online();
            return this;
        },
        //上线特效:
        online:function(){
            return this;
        },
        //选中当前用户
        select: function () {
            this.messageBox.show();
            this.isShow = true;
            return this;
        },
        //取消选中
        upselect: function () {
            this.messageBox.hide();
            this.isShow = false;
            return this;
        },
        //释放当前窗口  #TODO
        clear: function () {
            this.messageBox.remove();
            return this;

        },
        //推送消息
        pushMessage: function (json) {
            //判断当前对象是否为显示窗口，如果不是，则增加消息提醒,并增加未读消息数量
            this.messageNum++;
            return this;
        }
    };

    window.users = users;
})(window, $);