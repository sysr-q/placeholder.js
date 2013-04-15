placeholder.js
==============

__Note__: `placeholder.2.js` is a temporary working POC to test bitmap images instead of CSS. It's not clean or ready for production. (Works though)

__As per anything remotely nice, this doesn't work in IE. Might make a workaround script if you want to support IE.__

Create placeholder images on the fly with a client-side implementation.

It's relatively simple, and interfaces with jQuery.

## Add some placeholder HTML elements!
It can be just about any element you want, it isn't required to be a span or anything.

```
<span data-placeholder-width="200px" data-placeholder-height="250px"></span>
```

## Add your JS to call it

You can do anything you like to call the `$(elem).placeholder()` method, but an iterator like this is the easiest.

```
$(function () {
    $("[data-placeholder-width]").placeholder();
});
```

__Easy peasy!__

# HTML data attributes
There are a few accepted, and they're fairly self explanatory:

* `data-placeholder-width` - the width (in any unit) of your placeholder
* `data-placeholder-height` - the height (in any unit) of your placeholder
* `data-placeholder-color` - the color (in a HEX code) for your placeholder _(OPTIONAL)_
    * Example values: `#000`, `000000`, `#ff00ff`, `faf`
    * This defaults to `#cacaca`, which is a nice light grey
* `data-placeholder-display` - the `display` CSS setting for your placeholder _(OPTIONAL)_
    * This defaults to `inline-block`, and can help give you full control over where your placeholders sit.
