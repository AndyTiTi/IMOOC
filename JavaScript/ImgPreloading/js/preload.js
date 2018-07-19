//图片预加载
(function ($) {

    function Preload(imgs, opts) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, Preload.DEFAULTS, opts);
        if (this.order === 'ordered') {
            this.ordered();
        } else {
            this._unordered();
        }
    }

    Preload.DEFAULTS = {
        order: '_unordered',
        each: null, //每一张图片加载完毕后执行
        all: null //所有图片加载完毕后执行
    }

    Preload.prototype._unordered = function () { //无序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function (i, src) {
            if (typeof src != 'string') return;
            var imgObj = new Image();
            $(imgObj).on('load error', function () {
                opts.each && opts.each(count);
                if (count >= len - 1) {
                    opts.all && opts.all();
                }
                count++;
            })
            imgObj.src = src;
        })
    }

    // $.fn.extend - > $('#img').preload();
    // $.extend -> $.preload();
    $.extend({
        preload: function (imgs, opts) {
            new Preload(imgs, opts);
        }
    })
})(jQuery);
