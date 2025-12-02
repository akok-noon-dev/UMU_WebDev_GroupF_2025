document.addEventListener('DOMContentLoaded', function() {
   // Inject only the requested Ken Burns keyframes into the page (no other changes)
(function injectKenBurnsKeyframes() {
    const css = `
/* KEN BURNS ANIMATION */
@keyframes kenburns {
    0% {
        transform: scale(1) translate(0, 0);
    }
    50% {
        transform: scale(1.08) translate(-10px, -10px);
    }
    100% {
        transform: scale(1) translate(0, 0);
    }
}
`;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();
 // Check if the user just logged in and redirect to books.html
    if (localStorage.getItem('redirectToBooks') === 'true') {
        localStorage.removeItem('redirectToBooks'); // Clear the flag
        window.location.href = 'books.html';
    }
    

    // Add click events to "Read Now" buttons
    const readButtons = document.querySelectorAll('.read-btn');
    readButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.blog-card');
            const title = card.querySelector('.card-title').textContent;

            // Ask the user to login first
            const wantsToLogin = confirm("You need to login first. Do you want to login now?");
            
            if (wantsToLogin) {
                // Set flag in localStorage to redirect after login
                localStorage.setItem('redirectToBooks', 'true');
                window.location.href = "login.html"; // Redirect to login
            } else {
                showNotification(`You must login to read "${title}"`);
            }
        });
    });

    // Add click events to favorite buttons
    const favoriteButtons = document.querySelectorAll('.icon-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-heart')) {
                if (icon.classList.contains('far')) {
                    icon.classList.replace('far', 'fas');
                    showNotification('Book added to favorites!');
                } else {
                    icon.classList.replace('fas', 'far');
                    showNotification('Book removed from favorites!');
                }
            } else if (icon.classList.contains('fa-share-square')) {
                showNotification('Sharing book...');
            }
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            showNotification(`Searching for "${searchTerm}"...`);
        } else {
            showNotification('Please enter a search term');
        }
    }

    function showNotification(message) {
        // Create a custom notification instead of alert
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--secondary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, white, #f8f9fa)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'white';
            
        });
        
    });
});
