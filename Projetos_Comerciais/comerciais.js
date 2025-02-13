document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Parallax effect for hero image
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
        }
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '50px'
        }
    );

    // Apply fade-in animation to elements
    document.querySelectorAll('.gallery-item, .feature-item, .info-item, .concept-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gallery image hover effect enhancement
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const caption = this.querySelector('.item-caption');
            if (caption) {
                caption.style.opacity = '1';
                caption.style.transform = 'translateY(0)';
            }
        });

        item.addEventListener('mouseleave', function() {
            const caption = this.querySelector('.item-caption');
            if (caption) {
                caption.style.opacity = '0';
                caption.style.transform = 'translateY(20px)';
            }
        });
    });

    // Add loading animation for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease-in';
        });
    });

    // Dynamic navigation background on mobile
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const nav = document.querySelector('nav');

        if (window.innerWidth <= 768) {
            if (currentScroll > lastScroll && currentScroll > 50) {
                // Scrolling down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                nav.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        }
    });

    // Add smooth reveal animation for sections
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('section-revealed');
            observer.unobserve(entry.target);
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    // Handle responsive navigation
    const handleResponsiveNav = () => {
        const nav = document.querySelector('nav');
        if (window.innerWidth <= 768) {
            nav.classList.add('mobile');
        } else {
            nav.classList.remove('mobile');
        }
    };

    window.addEventListener('resize', handleResponsiveNav);
    handleResponsiveNav(); // Initial check

    // Add CSS animation for section reveal
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .section-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .section-revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});