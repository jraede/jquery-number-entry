(function($) {
  $.numberEntry = {
    defaults: {
      decimalsAllowed: 2,
      format: 'usa',
      allowNegative: false
    },
    mask: function(el, retainSelection) {
      var commaVal, cursorDiff, cursorPos, decimalKey, decimalPosition, final, i, isNegative, key, lengthBeforeDecimal, newVal, numberOfCharactersAddedBeforeCursor, options, pos, split, thousandsKey, val, whole, _i, _ref;
      if (retainSelection == null) {
        retainSelection = true;
      }
      options = el.data('options');
      decimalKey = options.decimalKey;
      thousandsKey = options.thousandsKey;
      cursorPos = el.getSelection().start;
      cursorDiff = el.getSelection().end - el.getSelection().start;
      val = el.val();
      isNegative = false;
      if (options.allowNegative && val.substr(0, 1) === '-') {
        isNegative = true;
      }
      val = val.replace(/\-/g, '');
      pos = val.indexOf(thousandsKey);
      while (pos >= 0) {
        if (pos < cursorPos) {
          cursorPos--;
        }
        val = val.substr(0, pos) + val.substr(pos + 1);
        pos = val.indexOf(thousandsKey);
      }
      numberOfCharactersAddedBeforeCursor = 0;
      decimalPosition = val.indexOf(decimalKey);
      newVal = val;
      if (decimalPosition >= 0) {
        decimalPosition;
        if (newVal.length - options.decimalsAllowed >= decimalPosition) {
          pos = decimalPosition + 1 + options.decimalsAllowed;
          newVal = newVal.substr(0, pos);
        }
      }
      split = newVal.split(decimalKey);
      lengthBeforeDecimal = split[0].length;
      whole = split[0].split('').reverse().join('');
      commaVal = '';
      for (i = _i = 1, _ref = whole.length; _i <= _ref; i = _i += 1) {
        key = i - 1;
        commaVal += whole[key];
        if (!(i % 3) && i !== whole.length) {
          commaVal += thousandsKey;
          if (lengthBeforeDecimal - i < cursorPos) {
            numberOfCharactersAddedBeforeCursor++;
          }
        }
      }
      commaVal = commaVal.split('').reverse().join('');
      final = commaVal;
      if (split[1] != null) {
        final += decimalKey + split[1];
      }
      newVal = final;
      if (isNegative) {
        newVal = '-' + newVal;
      }
      el.val(newVal);
      if (retainSelection) {
        return el.setSelection(cursorPos + numberOfCharactersAddedBeforeCursor, cursorPos + numberOfCharactersAddedBeforeCursor + cursorDiff);
      }
    }
  };
  return $.fn.numberEntry = function(options) {
    return this.each(function() {
      var validKeys;
      options = $.extend({}, $.numberEntry.defaults, options);
      validKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 190, 37, 38, 39, 40, 9, 8];
      if (options.allowNegative) {
        validKeys.push(189);
      }
      if (options.format === 'usa') {
        validKeys.push(110);
        validKeys.push(190);
        if (options.allowNegative) {
          options.regex = /[^0-9\.\-]/g;
        } else {
          options.regex = /[^0-9\.]/g;
        }
        options.decimalKey = '.';
        options.thousandsKey = ',';
      } else {
        validKeys.push(188);
        if (options.allowNegative) {
          options.regex = /[^0-9,\-]/g;
        } else {
          options.regex = /[^0-9,]/g;
        }
        options.decimalKey = ',';
        options.thousandsKey = '.';
      }
      if ($(this).val()) {
        $(this).val($.numberFormat.mask($(this), options));
      }
      $(this).data('options', options);
      $(this).keydown(function(e) {
        var cursorPos, decimalPosition, key, val;
        key = e.charCode || e.keyCode || 0;
        val = $(this).val();
        cursorPos = $(this).getSelection().start;
        decimalPosition = val.indexOf(options.decimalKey);
        if (validKeys.indexOf(key) < 0) {
          if (e.ctrlKey && ([67, 86, 88].indexOf(key) >= 0)) {
            if (key === 86) {
              this.removeBadKeys = true;
            }
          } else if (e.ctrlKey) {
            return true;
          } else {
            return false;
          }
        }
        if (decimalPosition >= 0 && ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) && decimalPosition === (val.length - (options.decimalsAllowed + 1))) {
          if (cursorPos === val.length) {
            return false;
          }
        }
        if (key === 190 || key === 110) {
          if (decimalPosition >= 0) {
            return false;
          }
        }
        return true;
      });
      $(this).keyup(function(e) {
        if (this.removeBadKeys) {
          $(this).val($(this).val().replace(options.regex, ''));
          this.removeBadKeys = false;
        }
        return $.numberEntry.mask($(this));
      });
      $(this).blur(function(e) {
        return $.numberEntry.mask($(this), false);
      });
      return $(this).change(function(e) {
        if (!$(this).is(':focus')) {
          return $.numberEntry.mask($(this));
        }
      });
    });
  };
})(window.jQuery);
