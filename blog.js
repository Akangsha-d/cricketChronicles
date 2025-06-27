document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    setupNewsletter();
    setupNavigation();
    setupInfiniteScroll();
    startCountdown();
});

// Newsletter form handling
function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Navigation highlighting
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Set first nav item as active by default
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
}

// Infinite scroll simulation
function setupInfiniteScroll() {
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            console.log('Load more articles...');
            // In a real app, you would fetch more articles here
        }
    });
}

// Countdown timer for next match
function startCountdown() {
    function updateCountdown() {
        const nextMatchDate = new Date('2025-11-20T10:00:00');
        const now = new Date();
        const diff = nextMatchDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `Next Ashes Test starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
}