jquery-number-entry
===================

A number entry plugin for jQuery - make an input behave like a calculator display

Note that this plugin depends on Tim Down's "Rangy Inputs" jQuery plugin (https://code.google.com/p/rangyinputs/)

# What does it do?

This plugin lets you turn an HTML text input into a calculator-like display. It will only allow the user to type in numbers and the decimals separator (either "," or "." depending upon your format), and then it will format the number with thousands separators on the fly, as well as limit the decimals to whatever you specify (defaults to 2)

For example, if you type "12345678", you will see "12,345,678" in the field.

If you type "1234.500", you will see "1,234.50", assuming you have the `decimalsAllowed` option set to "2".


# Usage

#### 1) Include jQuery, Rangy Inputs, and the plugin code on your page.

```
  <html>
    <head>
      <script src="/path/to/jquery.js"></script>
      <script src="/path/to/rangyinputs.js"></script>
      <script src="/path/to/numberEntry.js"></script>
```
#### 2) Now activate the plugin on your input fields.
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

### Customization

As of this release the only options are `decimalsAllowed` and `format` (either 'usa' or anything else. If anything else then it will use "," for the decimals separator and "." for the thousands separator.)

