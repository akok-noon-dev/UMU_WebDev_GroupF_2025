// books/book.js
// Smooth-scroll to category if query param is present
document.addEventListener('DOMContentLoaded', function() {
	const params = new URLSearchParams(window.location.search);
	const category = params.get('category');
	if (category) {
		const el = document.getElementById(category);
		if (el) {
			// Allow layout to render then scroll
			setTimeout(() => {
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
				// Add a subtle highlight to show which section
				el.classList.add('outline-highlight');
				setTimeout(() => el.classList.remove('outline-highlight'), 2200);
			}, 120);
		}
	}
});
