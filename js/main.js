// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeCheckbox = document.getElementById('theme-checkbox');
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set checkbox state based on saved theme
    themeCheckbox.checked = savedTheme === 'dark';
    
    // Theme toggle event listener
    themeCheckbox.addEventListener('change', function() {
        // Add transition class for smooth theme change
        document.body.classList.add('theme-transition');
        
        const newTheme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Active Navigation Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', highlightActiveSection);
    
    // Run on page load
    highlightActiveSection();
});

// Mobile Menu Toggle (for future enhancement)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
            }
        });
    }
});

// Scroll to Top Functionality (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll-to-top button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.className = 'scroll-top-btn';
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-primary);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollTopButton);
    
    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.visibility = 'visible';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        // Check if image is already loaded (cached)
        if (profileImage.complete) {
            profileImage.style.opacity = '1';
        } else {
            // Set initial opacity to 0 for fade-in effect
            profileImage.style.opacity = '0';
            profileImage.style.transition = 'opacity 0.5s ease';
            
            profileImage.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            // Fallback: show image after 1 second if load event doesn't fire
            setTimeout(() => {
                if (profileImage.style.opacity === '0') {
                    profileImage.style.opacity = '1';
                }
            }, 1000);
        }
    }
});

// Experience Card Accordion Animation
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const detailsSection = card.querySelector('.experience-details');
        
        // Store the natural height for smooth animations
        let naturalHeight = 0;
        
        function calculateHeight() {
            // Temporarily expand to get natural height
            detailsSection.style.height = 'auto';
            naturalHeight = detailsSection.scrollHeight;
            detailsSection.style.height = '0';
        }
        
        function toggleCard() {
            const isExpanded = card.classList.contains('expanded');
            
            if (isExpanded) {
                // Collapse this card
                card.classList.remove('expanded');
                detailsSection.style.height = '0';
            } else {
                // Expand this card
                card.classList.add('expanded');
                calculateHeight();
                detailsSection.style.height = naturalHeight + 'px';
            }
        }
        
        // Add click listener to button
        if (expandBtn) {
            expandBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleCard();
            });
        }
        
        // Calculate initial height
        calculateHeight();
    });
});
