(function ($) {
    $.fn.placeholder_css = function () {
        return this.each(function () {
            var $that = $(this);
            // Settings for this placeholder, including defaults
            var set = {
                    width: $that.data('placeholder-width'),
                    height: $that.data('placeholder-height'),
                    color: $that.data('placeholder-color') || '#cacaca',
                    display: $that.data('placeholder-display') || 'inline-block',
                };

            if (set.width == undefined || set.height == undefined) {
                return;
            }

            $that.css('display', set.display);
            $that.css('width', set.width  + 'px');
            $that.css('height', set.height  + 'px');
            // Does it pass the test?
            if (set.color !== undefined && /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(set.color)) {
                $that.css('background-color', set.color);
            }
        });
    }
})(jQuery);