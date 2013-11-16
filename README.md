jquery-number-entry
===================

A number entry plugin for jQuery - make an input behave like a calculator display

Note that this plugin depends on Tim Down's "Rangy Inputs" jQuery plugin (https://code.google.com/p/rangyinputs/)

# Usage

## 1) Include jQuery, Rangy Inputs, and the plugin code on your page.

```
  <html>
    <head>
      <script src="/path/to/jquery.js"></script>
      <script src="/path/to/rangyinputs.js"></script>
      <script src="/path/to/numberEntry.js"></script>
```
## 2) Now activate the plugin on your input fields.
```
  <script type="text/javascript">
    $(function() {
      $('input.number-entry').numberEntry({
        format:'usa'
        decimalsAllowed:2
      });
    });
  </script>
```
And on your page you can have:
```
  <input type="text" class="number-entry"/>
```
Then when you type "1234.56" into the field, it will magically change to "1,234.56".

# Customization

As of this release the only options are `decimalsAllowed` and `format` (either 'usa' or anything else. If anything else then it will use "," for the decimals separator and "." for the thousands separator.

