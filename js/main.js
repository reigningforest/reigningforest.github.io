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
        
        // Remove active/aria-current from all nav links first
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Add active class and aria-current to current section link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.setAttribute('aria-current', 'page');
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
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            const expanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
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
    scrollTopButton.setAttribute('aria-label', 'Scroll to top');
    
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

// Lightweight lightbox for project images
document.addEventListener('DOMContentLoaded', function() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<div class="lightbox-content" role="dialog" aria-modal="true"><button class="lightbox-close" aria-label="Close">×</button><img class="lightbox-img" alt=""/></div>';
    document.body.appendChild(overlay);

    const imgEl = overlay.querySelector('.lightbox-img');
    const closeBtn = overlay.querySelector('.lightbox-close');

    let lastTrigger = null;
    let lastFocused = null;

    function openLightbox(src, alt, triggerEl) {
        lastTrigger = triggerEl || null;
        lastFocused = document.activeElement;
        imgEl.src = src;
        imgEl.alt = alt || '';
        overlay.classList.add('open');
        // Prevent background scrolling while open
        document.body.style.overflow = 'hidden';
        // Slight delay to ensure transition kick-off then focus close button
        setTimeout(() => closeBtn.focus(), 120);
    }

    function closeLightbox() {
        // Kick off CSS close animation
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        // Clear src after transition ends to avoid visual snap
        const cleanup = () => {
            imgEl.src = '';
            imgEl.alt = '';
            overlay.removeEventListener('transitionend', cleanup);
            if (lastFocused && typeof lastFocused.focus === 'function') {
                lastFocused.focus();
            } else if (lastTrigger && typeof lastTrigger.focus === 'function') {
                lastTrigger.focus();
            }
        };
        overlay.addEventListener('transitionend', cleanup);
    }

    // Delegate: attach click handlers to project images
    document.querySelectorAll('.project-figure img').forEach(img => {
        img.addEventListener('click', function() {
            const full = img.dataset.full || img.src;
            openLightbox(full, img.alt, img);
        });
    });

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });

    overlay.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            closeBtn.focus();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
});

