(function ($) {
    $.placeholder = {};

    $.placeholder.hexToRGB = function hexToRGB(hex) {
        var result = /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i.exec(hex);
        var r = parseInt(result[1], 16),
            g = parseInt(result[2], 16),
            b = parseInt(result[3], 16);
        this.red = parseInt(r) % 256;
        this.green = parseInt(g) % 256;
        this.blue = parseInt(b) % 256;
        return this;
    }

    $.placeholder.createBMP = function createGraphics(width, height) {
        this.updateImage = function($image) {
            $image.attr("src", 'data:image/bmp;base64,' + window.btoa(imageHeader + imageData.join("")));
        }

        this.clear = function(color) {
            var newColor = String.fromCharCode(color.blue, color.green, color.red, 0);
            for (var i = 0; i < sizeOfImage; i++) {
                imageData[i] = newColor;
            }
        }

        var imgWidth = parseInt(width);
        var imgHeight = parseInt(height);
        var imageData = new Array();
        var sizeOfImage = imgWidth * imgHeight;

        _asLittleEndianHex = function(value, bytes) {
            var result = [];
            for (; bytes > 0; bytes--) {
                result.push(String.fromCharCode(value & 255));
                value >>= 8;
            }
            return result.join('');
        }

        height = _asLittleEndianHex(height, 4),
        width = _asLittleEndianHex(width, 4),
        num_file_bytes = _asLittleEndianHex(sizeOfImage*4, 4),
        imageHeader = [
            'BM',
            num_file_bytes,
            '\x00\x00',
            '\x00\x00',
            '\x36\x00\x00\x00',
            '\x28\x00\x00\x00',
            width,
            height,
            '\x01\x00',
            '\x20\x00',
            '\x00\x00\x00\x00',
            '\x00\x00\x00\x00',
            '\x13\x0B\x00\x00',
            '\x13\x0B\x00\x00',
            '\x00\x00\x00\x00',
            '\x00\x00\x00\x00'
        ].join("");
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
