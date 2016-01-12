/*
	Arcana by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)',
		mobilep: '(max-width: 480px)'
	});

	$(function() {

		var $contactForm = $('#contact-form');

		function clear() {
			$('.alert', $contactForm).remove();
		}

		$contactForm.submit(function(e) {
			e.preventDefault();
			clear();
			$.ajax({
				url: '//formspree.io/warden@hamletwood.org.uk',
				method: 'POST',
				data: $(this).serialize(),
				dataType: 'json',
				beforeSend: function() {
					$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
					setTimeout(clear, 5000);
				},
				success: function(data) {
					$contactForm.find('.alert--loading').hide();
					$contactForm.append('<div class="alert alert--success">Message sent!</div>');
					$('textarea, input[type=text], input[type=email]', $contactForm).val('');
					setTimeout(clear, 5000);
				},
				error: function(err) {
					$contactForm.find('.alert--loading').hide();
					$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
					setTimeout(clear, 5000);
				}
			});
		});

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				offsetY: -15,
				hoverDelay: 0,
				alignment: 'center'
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

	});

})(jQuery);
