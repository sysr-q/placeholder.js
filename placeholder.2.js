(function ($) {
    // Pollute String's prototype so we can easily just
    // "foo".repeat(x) instead of other nasty things.
    String.prototype.repeat = function (num) {
        return new Array(isNaN(num)? 1 : ++num).join(this);
    }

    $.placeholder = {};

    $.placeholder.hexToRGB = function (hex) {
        var result = /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i.exec(hex);
        this.red = parseInt(parseInt(result[1], 16)) % 256;
        this.green = parseInt(parseInt(result[2], 16)) % 256;
        this.blue = parseInt(parseInt(result[3], 16)) % 256;
        return this;
    }

    $.placeholder.createBMP = function (width, height) {
        this.updateImage = function ($image) {
            $image.attr("src", 'data:image/bmp;base64,' + window.btoa(imageHeader + imageData.join("")));
        }

        this.clear = function (color) {
            var newColor = String.fromCharCode(color.blue, color.green, color.red, 0);
            for (var i = 0; i < sizeOfImage; i++) {
                imageData[i] = newColor;
            }
        }

        var imgWidth = parseInt(width);
        var imgHeight = parseInt(height);
        var imageData = new Array();
        var sizeOfImage = imgWidth * imgHeight;

        _asLittleEndianHex = function (value, bytes) {
            var result = [];
            for (; bytes > 0; bytes--) {
                result.push(String.fromCharCode(value & 255));
                value >>= 8;
            }
            return result.join('');
        }

        height = _asLittleEndianHex(height, 4),
        width = _asLittleEndianHex(width, 4);
        // Number of bytes in the image file
        var n_f_b = _asLittleEndianHex(sizeOfImage*4, 4),
            // Commonly used repeated null bytes
            n_b = "\x00",
            n_2 = n_b.repeat(2)
            n_3 = n_b.repeat(3),
            n_4 = n_b.repeat(4),
            n_8 = n_b.repeat(8),
            n_13_0B = ('\x13\x0B' + n_2).repeat(2);
        // "Absolutely hideous!" - Everyone anywhere (significantly cleaner than the normal header, though)
        imageHeader = [ 'BM', n_f_b, n_4, '\x36'+n_3, '\x28'+n_3, width, height, '\x01'+n_b, '\x20'+n_b, n_8, n_13_0B, n_8 ].join("");
        return this;
    }

    $.fn.placeholder = function () {
        return this.each(function () {
            var $that = $(this);
            var set = {
                    width: $that.data('placeholder-width'),
                    height: $that.data('placeholder-height'),
                    color: $that.data('placeholder-color') || '#cacaca',
                };

            if (set.width == undefined || set.height == undefined) {
                return;
            }

            var graphics = $.placeholder.createBMP(set.width, set.height);
            graphics.clear($.placeholder.hexToRGB(set.color));
            graphics.updateImage($that);
        });
    }
})(jQuery);
