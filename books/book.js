
function filterBooks() {
            const searchInput = document.getElementById('bookSearch');
            const overallMessage = document.getElementById('overallMessage');
            // Get the search query, convert to lowercase, and trim whitespace
            const query = searchInput.value.toLowerCase().trim();

            // Select all carousel inner containers
            const carouselInners = document.querySelectorAll('.carousel-inner');
            let totalMatchesFound = 0;

            carouselInners.forEach(carouselInner => {
                const items = carouselInner.querySelectorAll('.carousel-item');
                const carouselElement = carouselInner.closest('.carousel');
                const carouselTitle = carouselElement.previousElementSibling;
                let firstVisibleItem = null;
                let matchesInCarousel = 0;

                // 1. Filter items and find the first visible one
                items.forEach(item => {
                    // Extract content from the description block for searching
                    const descriptionContent = item.querySelector('.book-description').textContent.toLowerCase();
                    
                    // Remove 'active' class for filtering consistency
                    item.classList.remove('active');
                    
                    if (descriptionContent.includes(query) || query === "") {
                        // Match found or query is empty (show all)
                        item.style.display = 'block';
                        
                        if (firstVisibleItem === null) {
                            firstVisibleItem = item;
                        }
                        matchesInCarousel++;
                    } else {
                        // No match
                        item.style.display = 'none';
                    }
                });

                // 2. Manage carousel visibility and active state
                if (matchesInCarousel > 0) {
                    // Show the carousel and its title
                    carouselElement.style.display = 'block';
                    carouselTitle.style.display = 'block';
                    
                    // Set the first matching item as active
                    if (firstVisibleItem) {
                        firstVisibleItem.classList.add('active');
                    }
                    
                    // Re-initialize the carousel to update indicators/controls
                    // Note: This needs to run after filtering.
                    const bsCarousel = bootstrap.Carousel.getInstance(carouselElement) || new bootstrap.Carousel(carouselElement);
                    bsCarousel.to(0); // Go to the first item (index 0)

                    totalMatchesFound += matchesInCarousel;

                } else {
                    // Hide the entire carousel block if no matches found in this group
                    carouselElement.style.display = 'none';
                    carouselTitle.style.display = 'none';
                }
            });

            // 3. Update the overall message for user feedback
            if (query !== "") {
                if (totalMatchesFound > 0) {
                    overallMessage.innerHTML = `<span class="text-green-600 font-bold"><i class="fas fa-check-circle me-2"></i> Showing ${totalMatchesFound} books matching "${query}".</span>`;
                } else {
                     overallMessage.innerHTML = `<span class="text-red-600 font-bold"><i class="fas fa-exclamation-circle me-2"></i> No books found matching "${query}" in the catalog.</span>`;
                }
            } else {
                 overallMessage.innerHTML = `Browse our curated selections across three distinct categories.`;
            }
        }
        
        // Add event listener for real-time filtering as the user types
        document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('bookSearch');
            if(searchInput) {
                // Trigger filter on input changes
                searchInput.addEventListener('input', filterBooks);
                // Also trigger filter on click just in case
                document.querySelector('.input-group button').addEventListener('click', filterBooks);
            }
        });
 (function(){
    const searchInput = document.getElementById('bookSearch');
    const searchBtn = document.getElementById('searchBtn');
    const overallMessage = document.getElementById('overallMessage');
    // Simple client-side search by title/author in the DOM text
    function filterBooks() {
      const q = (searchInput && searchInput.value || '').toLowerCase().trim();
      const cards = document.querySelectorAll('.book-card');
      let shown = 0;
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        const col = card.closest('.col-lg-6') || card.closest('.col');
        if (!q || text.includes(q)) {
          if (col) col.style.display = '';
          shown++;
        } else {
          if (col) col.style.display = 'none';
        }
      });
      if (!q) overallMessage.innerHTML = 'Browse our full collection below.';
      else if (shown) overallMessage.innerHTML = `<i class="fas fa-check-circle text-success me-1"></i>Showing ${shown} results for "${q}"`;
      else overallMessage.innerHTML = `<i class="fas fa-exclamation-circle text-danger me-1"></i>No books found for "${q}"`;
    }
    if (searchInput) searchInput.addEventListener('input', filterBooks);
    if (searchBtn) searchBtn.addEventListener('click', filterBooks);
  })();