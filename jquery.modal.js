/**
 * @file jquery弹出框插件
 * @author libertyAlone(ssdutgzh@163.com)
 *
 * 调用方式: $().modal(option)
 * 可配置部分说明: 
 *  'width': '500px',             //弹窗宽度，默认500px
 *  'confirmBtnText': '确定',     //确定按钮文字
 *  'cancelBtnText': '取消',      //取消按钮文字
 *  'confirmEvent': 'click',     //确定按钮自定义事件，默认click
 *  'cancelEvent': 'click',      //取消按钮自定义事件，默认click
 *  'confirmCallback': callback, //确定回调函数，默认空函数
 *  'cancelCallback': callback,  //取消回调函数，默认关闭弹窗
 *
 **/
;(function ($, window, document, undefined) {
    "use strict";

    /**
     * 弹出框构造函数
     *
     * @class
     */
    var Modal = function (element, opt) {

        /**
         * 弹出框的jquery对象
         * 
         * @type {Object}
         * @private
         */
        this._element = element;

        /**
         * 公用的空函数
         * 
         * @type {Function}
         * @private
         */
        this._emptyFunction = function () {};

        /**
         * 弹出框的默认参数
         * 
         * @type {Object}
         * @public
         */
        this.defaults = {
            'width': '500px',
            'confirmBtnText': '确定',
            'cancelBtnText': '取消',
            'confirmEvent': 'click',
            'cancelEvent': 'click',
            'confirmCallback': this._emptyFunction,
            'cancelCallback': function () {
                element.css('display', 'none');
            }
        };

        /**
         * 合并后的参数
         * 
         * @type {Object}
         * @public
         */
        this.option = $.extend({}, this.defaults, opt);
    };

    /**
     * 弹出框初始化
     * 
     * @return {Object} 返回自身进行链式调用
     */
    Modal.prototype.init = function () {
        var self = this._element;
        var modal = self.find('.modal');
        var modalFooter = self.find('.modal-footer');
        var confirmEventName = this.option.confirmEvent;
        var cancelEventName = this.option.cancelEvent;
        var windowClientWidth = $(window).width();
        var windowClientHeight = $(window).height();

        self.show();

        // 弹出框水平垂直居中
        modal.css({
            'width': this.option.width,
            'left': (windowClientWidth - parseInt(this.option.width, 10)) / 2.0 + 'px',
            'top': (windowClientHeight - parseInt(self.find('.modal').height(), 10)) / 2.0 + 'px'
        });

        // 解决事件冒泡导致单击modal部分关闭弹窗
        modal.on('click', function (event) {
            event.stopPropagation();
        });

        // 按钮事件处理及文本设置
        modalFooter.find('button.confirm')
            .html(this.option.confirmBtnText)
            .on(confirmEventName, this.option.confirmCallback.bind(this));

        modalFooter.find('button.cancel')
            .html(this.option.cancelBtnText)
            .on(cancelEventName, this.option.cancelCallback.bind(this));

        // 单击非modal部分关闭弹窗
        self.on('click', function (event) {
            self.css('display', 'none');
            event.stopPropagation();
        });

        return this;
    };

    /**
     * 弹窗初始化
     * 
     * @param {Object} option 可配置选项
     */
    $.fn.modal = function (option) {
        var modal = new Modal(this, option);
        modal.init();
    }

})(jQuery, window, document);