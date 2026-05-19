// Consolidated initializer and improved accessibility
(function() {
    'use strict';

    function initTheme() {
        const themeCheckbox = document.getElementById('theme-checkbox');
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeCheckbox) themeCheckbox.checked = savedTheme === 'dark';

        if (themeCheckbox) {
            themeCheckbox.addEventListener('change', function() {
                document.body.classList.add('theme-transition');
                const newTheme = this.checked ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                setTimeout(() => document.body.classList.remove('theme-transition'), 300);
            });
        }
    }

    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            });
        });
    }

    function initActiveNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        function highlightActiveSection() {
            const scrollPosition = window.scrollY + 100;
            navLinks.forEach(link => { link.classList.remove('active'); link.removeAttribute('aria-current'); });
            sections.forEach(section => {
                const top = section.offsetTop;
                const h = section.offsetHeight;
                const id = section.getAttribute('id');
                if (scrollPosition >= top && scrollPosition < top + h) {
                    const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                    if (activeLink) { activeLink.classList.add('active'); activeLink.setAttribute('aria-current', 'page'); }
                }
            });
        }
        window.addEventListener('scroll', highlightActiveSection);
        highlightActiveSection();
    }

    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.querySelector('.nav-links');
        if (!mobileMenuToggle || !navLinks) return;
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            const expanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenuToggle.classList.remove('active'); navLinks.classList.remove('mobile-open'); mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active'); navLinks.classList.remove('mobile-open'); mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function initScrollTop() {
        const scrollTopButton = document.createElement('button');
        scrollTopButton.textContent = '↑';
        scrollTopButton.className = 'scroll-top-btn';
        scrollTopButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollTopButton);
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) { scrollTopButton.style.opacity = '1'; scrollTopButton.style.visibility = 'visible'; }
            else { scrollTopButton.style.opacity = '0'; scrollTopButton.style.visibility = 'hidden'; }
        });
        scrollTopButton.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    function initImageFadeIn() {
        const profileImage = document.querySelector('.profile-image');
        if (!profileImage) return;
        if (profileImage.complete) profileImage.style.opacity = '1';
        else {
            profileImage.style.opacity = '0'; profileImage.style.transition = 'opacity 0.5s ease';
            profileImage.addEventListener('load', function() { this.style.opacity = '1'; });
            setTimeout(() => { if (profileImage.style.opacity === '0') profileImage.style.opacity = '1'; }, 1000);
        }
    }

    // Improved lightbox with focus trap and aria-hidden on background
    function initLightbox() {
        const existing = document.querySelector('.lightbox-overlay');
        if (existing) return;
        const overlay = document.createElement('div'); overlay.className = 'lightbox-overlay';
        const content = document.createElement('div'); content.className = 'lightbox-content'; content.setAttribute('role','dialog'); content.setAttribute('aria-modal','true');
        const closeBtn = document.createElement('button'); closeBtn.className = 'lightbox-close'; closeBtn.setAttribute('aria-label','Close'); closeBtn.textContent = '×';
        const imgEl = document.createElement('img'); imgEl.className = 'lightbox-img'; imgEl.alt = '';
        content.appendChild(closeBtn); content.appendChild(imgEl); overlay.appendChild(content); document.body.appendChild(overlay);

        let lastFocused = null;
        function trapFocus(e) {
            const focusable = content.querySelectorAll('button,a,input,textarea,select,[tabindex]:not([tabindex="-1"])');
            if (focusable.length === 0) return;
            const first = focusable[0]; const last = focusable[focusable.length - 1];
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        }

        function openLightbox(src, alt, triggerEl) {
            lastFocused = document.activeElement;
            imgEl.src = src; imgEl.alt = alt || '';
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            // hide background from assistive tech
            document.querySelectorAll('header, main, footer, nav').forEach(el => el.setAttribute('aria-hidden','true'));
            setTimeout(() => closeBtn.focus(), 120);
            document.addEventListener('keydown', trapFocus);
        }

        function closeLightbox() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            imgEl.src = '';
            document.querySelectorAll('header, main, footer, nav').forEach(el => el.removeAttribute('aria-hidden'));
            document.removeEventListener('keydown', trapFocus);
            if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
        }

        document.querySelectorAll('.project-figure img').forEach(img => {
            img.addEventListener('click', function() { const full = img.dataset.full || img.src; openLightbox(full, img.alt, img); });
            img.addEventListener('keydown', function(e) { if (e.key === 'Enter') { const full = img.dataset.full || img.src; openLightbox(full, img.alt, img); } });
        });

        overlay.addEventListener('click', function(e) { if (e.target === overlay || e.target === closeBtn) closeLightbox(); });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLightbox(); });
    }

    // Analytics loader used only when consent is given
    function loadAnalyticsIfConsented() {
        try {
            const consent = localStorage.getItem('analytics_consent');
            if (consent === 'granted') {
                const script = document.createElement('script');
                script.src = 'https://www.googletagmanager.com/gtag/js?id=G-VQV60PPMYK'; script.async = true;
                document.head.appendChild(script);
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} window.gtag = gtag;
                gtag('js', new Date()); gtag('config', 'G-VQV60PPMYK');
            }
        } catch (e) { /* ignore */ }
    }

    function init() {
        initTheme(); initSmoothScroll(); initActiveNavHighlight(); initMobileMenu(); initScrollTop(); initImageFadeIn(); initLightbox(); loadAnalyticsIfConsented();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();

