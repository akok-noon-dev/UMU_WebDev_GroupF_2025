document.addEventListener('DOMContentLoaded', () => {

    // Get input, button, and message elements
    const searchInput = document.getElementById('bookSearch');
    const searchBtn = document.getElementById('searchBtn');
    const overallMessage = document.getElementById('overallMessage');

    // Function to filter books
    function filterBooks() {
        const query = searchInput.value.toLowerCase().trim(); // User search text
        const cards = document.querySelectorAll('.book-card'); // All book cards
        let shown = 0; // Counter for visible results

        cards.forEach(card => {
            const text = card.innerText.toLowerCase(); // Book text
            const col = card.closest('.col-lg-6') || card.closest('.col'); // Parent column

            // Show card if it matches the search
            if (!query || text.includes(query)) {
                if (col) col.style.display = '';
                shown++;
            } 
            // Hide card if not matched
            else {
                if (col) col.style.display = 'none';
            }
        });

        // Update message based on search result
        if (!query) {
            overallMessage.innerHTML = 'Browse our full collection below.';
        } 
        else if (shown > 0) {
            overallMessage.innerHTML =
                `<i class="fas fa-check-circle text-success me-1"></i>
                 Showing ${shown} results for "${query}"`;
        } 
        else {
            overallMessage.innerHTML =
                `<i class="fas fa-exclamation-circle text-danger me-1"></i>
                 No books found for "${query}"`;
        }
    }

    // Filter while typing
    if (searchInput) searchInput.addEventListener('input', filterBooks);

    // Filter when button is clicked
    if (searchBtn) searchBtn.addEventListener('click', filterBooks);

});
