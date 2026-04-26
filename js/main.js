document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle Functionality ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    // Default to dark mode unless user previously explicitly chose light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        updateIcons('light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateIcons('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    });

    function updateIcons(theme) {
        if (theme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    function handleScroll() {
        if (window.scrollY > 20) {
            navbar.style.padding = '0.8rem 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '1.25rem 0';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- Dynamic Years of Experience ---
    const yoeEl = document.getElementById('yoe-counter');
    if (yoeEl) {
        const startYear = 2012;
        const currentYear = new Date().getFullYear();
        yoeEl.textContent = (currentYear - startYear) + '+';
    }

    // --- Anti-Bot Email Protection ---
    const secureContacts = document.querySelectorAll('.secure-contact');
    secureContacts.forEach(contact => {
        const decodedUser = atob(contact.getAttribute('data-user'));
        contact.setAttribute('href', 'mailto:' + decodedUser);
        
        if (contact.classList.contains('btn-large')) {
            // Already set correctly in HTML, but can ensure
            contact.textContent = 'Get in touch';
        } else if (contact.classList.contains('reveal-text')) {
            contact.textContent = decodedUser;
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinksMenu = document.getElementById('nav-links-menu');
    const navItems = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navLinksMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navLinksMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksMenu.classList.remove('active');
            });
        });
    }
});
