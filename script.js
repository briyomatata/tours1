document.addEventListener('DOMContentLoaded', () => {
    // Check for saved dark mode preference
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Dark Mode Toggle
    const themeToggle = document.querySelector('button i.bi-moon, button i.bi-sun');
    if (themeToggle) {
        // Set initial icon based on current theme
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.className = 'bi bi-sun fs-5';
        } else {
            themeToggle.className = 'bi bi-moon fs-5';
        }

        themeToggle.parentElement.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = themeToggle;
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'bi bi-sun fs-5';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.className = 'bi bi-moon fs-5';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Handle Category Filter Highlighting and destination filtering
    const filterBtns = document.querySelectorAll('.btn-filter[data-filter]');
    const categoryCards = document.querySelectorAll('[data-category]');

    const filterCards = (category) => {
        categoryCards.forEach(card => {
            const cardCategory = card.dataset.category || 'all';
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('d-none');
            } else {
                card.classList.add('d-none');
            }
        });
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const requested = this.dataset.filter || 'all';
            filterCards(requested);
        });
    });

    // Handle "Mark Visited" Toggle
    const visitedBtns = document.querySelectorAll('.btn-visited');
    
    visitedBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.innerText === "Mark Visited") {
                this.innerText = "✓ Visited";
                this.classList.replace('btn-success', 'btn-outline-success');
                this.style.backgroundColor = "transparent";
            } else {
                this.innerText = "Mark Visited";
                this.classList.replace('btn-outline-success', 'btn-success');
                this.style.backgroundColor = "#2d7a32";
            }
        });
    });

    // Enable actual start button on ziara page after the user enters a name
    if (currentPage === 'ziara.html') {
        const userNameInput = document.getElementById('userNameInput');
        const startBtn = document.getElementById('startBtn');

        if (userNameInput && startBtn) {
            const updateStartButton = () => {
                const hasName = userNameInput.value.trim().length > 0;
                startBtn.disabled = !hasName;
                startBtn.classList.toggle('btn-dark', hasName);
                startBtn.classList.toggle('text-white', hasName);
                startBtn.classList.toggle('btn-light', !hasName);
                startBtn.classList.toggle('text-muted', !hasName);
            };

            userNameInput.addEventListener('input', updateStartButton);
            updateStartButton();

            startBtn.addEventListener('click', () => {
                if (!startBtn.disabled) {
                    window.location.href = 'index.html';
                }
            });
        }
    }

    // Set active navbar item by current page
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkPage = href.split('/').pop() || 'index.html';
        if (linkPage === currentPage) {
            link.classList.add('active-nav');
        } else {
            link.classList.remove('active-nav');
        }
    });

    // Fallback for responsive navbar toggler when Bootstrap collapse is unavailable
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('#navContent');

    if (!window.bootstrap && navToggler && navCollapse) {
        navToggler.addEventListener('click', () => {
            const isOpen = navCollapse.classList.toggle('show');
            navToggler.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }
});

function selectJourney(element) {
    // Remove selected class from all cards
    const cards = document.querySelectorAll('.journey-card');
    cards.forEach(card => {
        card.classList.remove('selected');
        card.style.border = "none";
    });

    // Add selected class to the clicked card
    element.classList.add('selected');
    
    // Enable the Start Button
    const startBtn = document.getElementById('startBtn');
    startBtn.disabled = false;
    startBtn.classList.remove('text-muted');
    startBtn.classList.add('btn-dark', 'text-white'); // Highlight button
}