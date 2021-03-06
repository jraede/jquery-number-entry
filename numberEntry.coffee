################
# jquery Number Entry Plugin
# @author Jason Raede <jason@torchedm.com>
# @license MIT 
################

( 
	($) ->
		$.numberEntry = 
			defaults:
				decimalsAllowed:2
				format:'usa'
				allowNegative:false

			mask: (el, retainSelection = true) ->
				options = el.data('options')
				decimalKey = options.decimalKey
				thousandsKey = options.thousandsKey
				


				cursorPos = el.getSelection().start
				cursorDiff = el.getSelection().end - el.getSelection().start

				val = el.val()
				# Are we negative?
				isNegative = false
				if options.allowNegative and val.substr(0, 1) is '-'
					isNegative = true

				# They could theoretically have a hyphen anywhere but this will strip it out. we just
				# re-add it to the front at the end.
				val = val.replace(/\-/g, '')

				# Strip out commas so we can re-add them
				
				pos = val.indexOf(thousandsKey)
				while pos >= 0
					if pos < cursorPos
						cursorPos--
					val = val.substr(0, pos) + val.substr(pos + 1)
					pos = val.indexOf(thousandsKey)



				numberOfCharactersAddedBeforeCursor = 0
				# Add commas and remove extraneous numbers
				
				decimalPosition = val.indexOf(decimalKey)
				newVal = val
				
				if decimalPosition >= 0
					decimalPosition
					if newVal.length - options.decimalsAllowed >= decimalPosition
						# Cut off the last decimal(s), there are too many
						pos = decimalPosition + 1 + options.decimalsAllowed
						newVal = newVal.substr(0, pos)

				# Now add commas
				split = newVal.split(decimalKey)

				lengthBeforeDecimal = split[0].length
				whole = split[0].split('').reverse().join('')
				commaVal = ''
				for i in [1..whole.length] by 1
					key = i-1
					
					commaVal += whole[key]
					if !(i%3) and i isnt whole.length
						commaVal += thousandsKey
						if lengthBeforeDecimal - i < cursorPos
							numberOfCharactersAddedBeforeCursor++
					
				commaVal = commaVal.split('').reverse().join('')
				final = commaVal
				if split[1]?
					final += decimalKey + split[1]

				newVal = final

				if isNegative
					newVal = '-' + newVal
				el.val(newVal)
				
				if retainSelection
					el.setSelection(cursorPos + numberOfCharactersAddedBeforeCursor, cursorPos + numberOfCharactersAddedBeforeCursor + cursorDiff)

		$.fn.numberEntry = (options) ->

			return @each ->
				options = $.extend({}, $.numberEntry.defaults, options)

				# keys to allow: digits, decimal point, arrow keys, tab key, return key,backspace. and HYPHEN
				validKeys = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110,190, 37,38,39,40,9,8]

				if options.allowNegative
					validKeys.push(189)

				# Add the valid decimal separator from options
				if options.format is 'usa'
					validKeys.push(110)
					validKeys.push(190)
					if options.allowNegative
						options.regex = /[^0-9\.\-]/g
					else
						options.regex = /[^0-9\.]/g
					options.decimalKey = '.'
					options.thousandsKey = ','
				else 
					validKeys.push(188)
					if options.allowNegative
						options.regex = /[^0-9,\-]/g
					else
						options.regex = /[^0-9,]/g
					options.decimalKey = ','
					options.thousandsKey = '.'


				if $(@).val()
					$(@).val($.numberFormat.mask($(@), options))

				$(@).data('options', options)
				$(@).keydown (e) ->

					key = e.charCode or e.keyCode or 0

					val = $(@).val()

					cursorPos = $(@).getSelection().start
					decimalPosition = val.indexOf(options.decimalKey)

					


					
					if validKeys.indexOf(key) < 0
						# also allow copy, cut, and paste
						if e.ctrlKey and ([67,86,88].indexOf(key) >= 0)
							if key is 86 # we need to parse after pasting
								@removeBadKeys = true
						else if e.ctrlKey # control key means command, so let them do it
							return true
						else
							return false

					if decimalPosition >= 0 and ((key >= 48 and key <= 57) or (key >=96 and key <=105)) and decimalPosition is (val.length - (options.decimalsAllowed + 1))
						if cursorPos is val.length
							return false



					if key is 190 or key is 110
						if decimalPosition >= 0
							return false




					return true

				$(@).keyup (e) ->
					if @removeBadKeys
						$(@).val($(@).val().replace(options.regex, ''))
						@removeBadKeys = false
					$.numberEntry.mask($(@))

				$(@).blur (e) ->
					# Worst case also do it on blur since they can click, then paste via the edit menu
					$.numberEntry.mask($(@), false)

				# It could be changed by another process, so if they're not actively entering anything,
				# apply the formatting.
				$(@).change (e) ->
					if !$(@).is(':focus')
						$.numberEntry.mask($(@))
)(window.jQuery)
					


						
