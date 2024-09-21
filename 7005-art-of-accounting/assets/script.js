// Sticky v1.0 by Daniel Raftery
// http://thrivingkings.com/sticky
//
// http://twitter.com/ThrivingKings

(function($) {

	// Using it without an object
	$.sticky = function(note, options, callback) {
		return $.fn.sticky(note, options, callback);
	};
	$.fn.sticky = function(note, options, callback) {
		// Default settings
		var position = 'bottom-right';
		// top-left, top-right, bottom-left, or bottom-right

		var settings = {
			'speed' : 3000, // animations: fast, slow, or integer
			'duplicates' : false, // true or false
			'autoclose' : 8000 // integer or false
		};

		// Passing in the object instead of specifying a note
		if (!note) {
			note = this.html();
		}

		if (options) {
			$.extend(settings, options);
		}

		// Variables
		var display = true;
		var duplicate = 'no';

		// Somewhat of a unique ID
		var uniqID = Math.floor(Math.random() * 99999);

		// Handling duplicate notes and IDs
		$('.sticky-note').each(function() {
			if ($(this).html() == note && $(this).is(':visible')) {
				duplicate = 'no';
				if (!settings['duplicates']) {
					display = false;
				}
			}
			if ($(this).attr('id') == uniqID) {
				uniqID = Math.floor(Math.random() * 9999999);
			}
		});

		// Make sure the sticky queue exists
		if (!$('.newC').find('.sticky-queue').html()) {
			$('.newC').append('<div class="sticky-queue ' + position + '"></div>');
		}

		// Can it be displayed?
		if (display) {
			// Building and inserting sticky note
			$('.sticky-queue').prepend('<div class="sticky border-' + position + '" id="' + uniqID + '"></div>');
			$('#' + uniqID).append('<span class="sticky-close" rel="' + uniqID + '" title="Close" style="display: inline-block;float: right;cursor: pointer;">✖</span<>');
			$('#' + uniqID).append('<div class="sticky-note" rel="' + uniqID + '">' + note + '</div>');

			// Smoother animation

			$('#' + uniqID).slideDown(settings['speed']);
			display = true;
		}

		// Listeners
		$('.sticky').ready(function() {
			// If 'autoclose' is enabled, set a timer to close the sticky
			if (settings['autoclose']) {
				$('#' + uniqID).delay(settings['autoclose']).fadeOut(settings['speed']);
			}
		});
		// Closing a sticky
		$('.sticky-close').click(function() {
			$('#' + $(this).attr('rel')).dequeue().fadeOut(settings['speed']);
		});

		// Callback data
		var response = {
			'id' : uniqID,
			'duplicate' : duplicate,
			'displayed' : display,
			'position' : position
		}

		// Callback function?
		if (callback) {
			callback(response);
		} else {
			return (response);
		}

	}
})(jQuery);

$(document).ready(function() {
	

	//Time Counter

	$('.count-down-box').each(function() {
		var $this = $(this);
		var dollarCount = $this.find('.dollar-count');
		var number = 4587645.57;
		dollarCount.html('$'+number.toLocaleString());

		var colorCheck = function() {
			if(number < 4000000) {
				dollarCount.css({color:'#E8A30E'});
				colorCheck = undefined;
			}
		}

		var dollarReduction = function () {
			number = number - (1000 + (Math.random() * 1000));
			if(number <= 0) {
				number = 0;
			} else {
				setTimeout(dollarReduction, 1000 + parseInt(Math.random() * 5000));
			}
			if(typeof colorCheck == "function") colorCheck();
			dollarCount.html(number.toLocaleString('en-US', {style:'currency', currency:'USD', currencyDisplay: 'symbol'}));
		}

		setTimeout(dollarReduction, 1000 + parseInt(Math.random() * 5000));

		var dayCount = $this.find('.day-count');
		var hourCount = $this.find('.hour-count');
		var minCount = $this.find('.minute-count');
		var secCount = $this.find('.second-count');
		var days = parseInt(dayCount.html());
		var hours = parseInt(hourCount.html());
		var mins = parseInt(minCount.html());
		var secs = parseInt(secCount.html());

		var int2string = function(counter) {
			return counter <=9 ? ("0"+counter) : counter;
		}
	

		var interval = setInterval(function() {
			secs--;
			if(secs == -1) {
				secs = 59;
				mins--;
				if(mins == -1) {
					mins = 59;
					hours--;
					if(hours == -1) {
						hours = 23;
						days--;
						if(days == -1) {
							clearInterval(interval);
							secs = 0;
							mins = 0;
							hours = 0;
							days = 0;
						}
					}
				}
			}
			dayCount.html(int2string(days));
			hourCount.html(int2string(hours));
			minCount.html(int2string(mins));
			secCount.html(int2string(secs));
		}, 1000);
	});



}); 