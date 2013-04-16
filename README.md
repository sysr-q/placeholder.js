placeholder.js
==============
Create placeholder images on the fly with a client-side implementation.

__As per anything remotely nice, this doesn't work in IE.__  
If you want it to work in IE, you might want to look at the CSS rather than BMP system.

It's relatively simple, and interfaces with jQuery.

## Add some placeholder HTML elements!
These will differ depending on if you're using the CSS or BMP version of placeholder.js, but in general you'll want to use `<img>` tags.

```
<img data-placeholder-width="200" data-placeholder-height="250">
```

## Add your JS to call it

You can do anything you like to call the `$(elem).placeholder()` method, but an iterator like this is the easiest.

```
$(function () {
    $("img[data-placeholder-width]").placeholder();
});
```

__Easy peasy!__

# HTML data attributes
There are a few accepted, and they're fairly self explanatory:

* `data-placeholder-width` - the width (in pixels) of your placeholder
* `data-placeholder-height` - the height (in pixels) of your placeholder
* `data-placeholder-color` - the color (in a HEX code) for your placeholder __(OPTIONAL)__
    * Example values: `000000`, `#ff00ff` (must be six hex characters)
    * This defaults to `#cacaca`, which is a nice light grey
* `data-placeholder-display` - the `display` CSS setting for your placeholder __(OPTIONAL)__
    * This defaults to `inline-block`, and can help give you full control over where your placeholders sit.
    * This only effects it if you use `placeholder.css.js` instead of the BMP version.
