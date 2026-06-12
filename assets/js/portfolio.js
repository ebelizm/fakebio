(function () {
	'use strict';

	var roles = [
		'Freelance Developer',
		'Blockchain Enthusiast',
		'Crypto Explorer',
		'Problem Solver'
	];
	var roleIndex = 0;
	var charIndex = 0;
	var deleting = false;
	var typingEl = document.getElementById('typing-text');

	function typeRoles() {
		if (!typingEl) return;

		var current = roles[roleIndex];

		if (!deleting) {
			typingEl.textContent = current.substring(0, charIndex + 1);
			charIndex++;

			if (charIndex === current.length) {
				deleting = true;
				setTimeout(typeRoles, 2000);
				return;
			}
		} else {
			typingEl.textContent = current.substring(0, charIndex - 1);
			charIndex--;

			if (charIndex === 0) {
				deleting = false;
				roleIndex = (roleIndex + 1) % roles.length;
			}
		}

		setTimeout(typeRoles, deleting ? 45 : 85);
	}

	function animateCounter(el) {
		var target = parseInt(el.getAttribute('data-count'), 10);
		var suffix = el.getAttribute('data-suffix') || '';
		var duration = 1800;
		var start = null;

		function step(timestamp) {
			if (!start) start = timestamp;
			var progress = Math.min((timestamp - start) / duration, 1);
			var eased = 1 - Math.pow(1 - progress, 3);
			el.textContent = Math.floor(eased * target) + suffix;

			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				el.textContent = target + suffix;
			}
		}

		requestAnimationFrame(step);
	}

	function initCounters() {
		var counters = document.querySelectorAll('.stat-number[data-count]');
		if (!counters.length || !('IntersectionObserver' in window)) return;

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting && !entry.target.dataset.animated) {
					entry.target.dataset.animated = 'true';
					animateCounter(entry.target);
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.4 });

		counters.forEach(function (counter) {
			observer.observe(counter);
		});
	}

	function initContactForm() {
		var form = document.getElementById('contact-form');
		if (!form) return;

		form.addEventListener('submit', function (e) {
			e.preventDefault();

			var name = document.getElementById('name').value.trim();
			var email = document.getElementById('email').value.trim();
			var message = document.getElementById('message').value.trim();

			if (!name || !email || !message) {
				alert('Please fill in all fields before sending.');
				return;
			}

			var subject = encodeURIComponent('Portfolio contact from ' + name);
			var body = encodeURIComponent(
				'Name: ' + name + '\nEmail: ' + email + '\n\n' + message
			);

			window.location.href = 'mailto:ebelizm@gmail.com?subject=' + subject + '&body=' + body;
		});
	}

	function unlockPage() {
		document.body.classList.remove('is-preload');
	}

	document.addEventListener('DOMContentLoaded', function () {
		// Unlock scroll immediately — don't wait for large hero image
		unlockPage();
		typeRoles();
		initCounters();
		initContactForm();
	});
})();
