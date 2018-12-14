/*
聊天窗口类
*/
;
(function (window, $) {
    var dialog = function (option) {
        this.init(option);
    }

    dialog.prototype = {
        person_id: null,//当前窗口聊天对象的标识
        person_title: "",//窗口标题，如人名、群聊名称等
        isShow: false,//是否为当前显示窗口，默认为false
        messageBox: null,//主窗体
        messageNum: 0,//未读消息数
        //初始化窗体
        init: function (option) {
            this.extend(option);
            this.create();
        },
        extend: function (option) {
            for (key in option) {
                this[key] = option[key];
            }
        },
        //创建窗口
        create: function () {

        },
        //显示当前窗口
        show: function () {
            this.messageBox.show();
            this.isShow = true;
        },
        //隐藏当前窗口
        hide: function () {
            this.messageBox.hide();
            this.isShow = false;
        },
        //释放当前窗口  #TODO
        clear: function () {
            this.messageBox.remove();

        },
        //推送消息
        pushMessage: function (json) {
            //判断当前对象是否为显示窗口，如果不是，则增加消息提醒,并增加未读消息数量
            this.messageNum++;
        }
    };

    window.dialog = dialog;
})(window, $);