// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Check if elements exist
    if (!hamburger || !navMenu) {
        console.warn('Hamburger menu elements not found');
        console.log('Hamburger element:', hamburger);
        console.log('Nav menu element:', navMenu);
        return;
    }

    console.log('Mobile menu initialized successfully');

    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked'); // Debug log
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Prevent menu from closing when clicking inside the menu
    navMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Additional mobile menu functionality
    // Handle window resize to ensure menu closes on orientation change
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Touch events for better mobile support
    hamburger.addEventListener('touchstart', function(e) {
        e.preventDefault();
    });

    // Ensure menu works on all mobile devices
    hamburger.addEventListener('touchend', function(e) {
        e.preventDefault();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fallback: Force menu functionality if other methods fail
    setTimeout(() => {
        if (hamburger && navMenu) {
            // Remove any existing event listeners and re-add them
            const newHamburger = hamburger.cloneNode(true);
            hamburger.parentNode.replaceChild(newHamburger, hamburger);
            
            newHamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                newHamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }, 100);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.phone || !data.problem) {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(data.phone)) {
                showNotification('Veuillez entrer un numéro de téléphone valide.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Votre demande a été envoyée avec succès ! Nous vous contacterons sous 24h.', 'success');
            contactForm.reset();
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 10px;
        padding: 15px 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        margin-left: auto;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .value-card, .team-member, .cert-item, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    // Determine suffix based on the stat label or data attributes
    const statItem = element.closest('.stat-item, .stat-card');
    const statLabel = statItem ? statItem.querySelector('.stat-label').textContent : '';
    let suffix = '';
    
    if (target >= 100) {
        suffix = '+';
    } else if (target === 98) {
        suffix = '%';
    } else if (statLabel.includes('Heures')) {
        suffix = 'h';
    } else if (statLabel.includes('Années')) {
        suffix = ' ans';
    } else if (statLabel.includes('Techniciens')) {
        suffix = '';
    }
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            const currentValue = Math.floor(start);
            element.textContent = currentValue + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    updateCounter();
}

// Enhanced stats animation with improved observer and multiple fallbacks
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number[data-count], .stat-number[data-target]');
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.getAttribute('data-count') || stat.getAttribute('data-target'));
                
                if (target && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    stat.textContent = '0';
                    setTimeout(() => {
                        animateCounter(stat, target, 2000);
                    }, index * 200); // Staggered animation
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Multiple fallback strategies for stats animation
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.statistics-section, .enhanced-stats');
    if (!statsSection) return;
    
    let animationTriggered = false;
    
    // Strategy 1: Intersection Observer
    statsObserver.observe(statsSection);
    
    // Strategy 2: Scroll-based trigger
    function triggerStatsAnimation() {
        if (animationTriggered) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            animationTriggered = true;
            const statNumbers = statsSection.querySelectorAll('.stat-number[data-count], .stat-number[data-target]');
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.getAttribute('data-count') || stat.getAttribute('data-target'));
                
                if (target && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    stat.textContent = '0';
                    setTimeout(() => {
                        animateCounter(stat, target, 2000);
                    }, index * 200);
                }
            });
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', triggerStatsAnimation);
    
    // Strategy 3: Immediate fallback for visible elements
    setTimeout(() => {
        triggerStatsAnimation();
    }, 500);
    
    // Strategy 4: Final fallback - ensure numbers are displayed
    setTimeout(() => {
        const statNumbers = statsSection.querySelectorAll('.stat-number[data-count], .stat-number[data-target]');
        statNumbers.forEach(stat => {
            if (!stat.classList.contains('animated')) {
                const target = parseInt(stat.getAttribute('data-count') || stat.getAttribute('data-target'));
                const statItem = stat.closest('.stat-item, .stat-card');
                const statLabel = statItem ? statItem.querySelector('.stat-label').textContent : '';
                let suffix = '';
                
                if (target >= 100) {
                    suffix = '+';
                } else if (target === 98) {
                    suffix = '%';
                } else if (statLabel.includes('Heures')) {
                    suffix = 'h';
                } else if (statLabel.includes('Années')) {
                    suffix = ' ans';
                }
                
                stat.textContent = target + suffix;
                stat.classList.add('animated');
                animationTriggered = true;
            }
        });
    }, 2000); // Earlier fallback
    
    // Strategy 5: Page load fallback
    if (document.readyState === 'complete') {
        setTimeout(triggerStatsAnimation, 100);
    }
});

// Add entrance animations for stat items
const statItemsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', function() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        statItemsObserver.observe(item);
    });
});

// Form field enhancements
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Lazy loading for images (if any are added later)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Back to top button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #000;
        color: #fff;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Enhanced About Story Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate story cards on scroll
    const storyCards = document.querySelectorAll('.story-intro, .story-growth');
    
    const storyObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    storyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        storyObserver.observe(card);
    });
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 300);
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
    
    // Enhanced stats animation for about story section
    const aboutStatsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number[data-count], .stat-number[data-target]');
                statNumbers.forEach((stat, index) => {
                    const target = parseInt(stat.getAttribute('data-count') || stat.getAttribute('data-target'));
                    
                    if (target && !stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        stat.textContent = '0';
                        setTimeout(() => {
                            animateCounter(stat, target, 2000);
                        }, index * 200);
                    }
                });
                aboutStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const aboutStatsSection = document.querySelector('.enhanced-stats');
    if (aboutStatsSection) {
        aboutStatsObserver.observe(aboutStatsSection);
    }
    
    // Animate stat cards entrance
    const statCards = document.querySelectorAll('.stat-card');
    
    const statCardsObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        statCardsObserver.observe(card);
    });
    
    // Add hover effects for timeline markers
    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');
        if (marker) {
            marker.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
            });
            
            marker.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });
        }
    });
    
    // Add parallax effect to story section background
    const storySection = document.querySelector('.about-story');
    if (storySection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            storySection.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Emergency fallback for stats - ensure they always display
document.addEventListener('DOMContentLoaded', function() {
    // Force display stats after a short delay regardless of other conditions
    setTimeout(() => {
        const statNumbers = document.querySelectorAll('.stat-number[data-count], .stat-number[data-target]');
        statNumbers.forEach(stat => {
            if (stat.textContent === '0' || !stat.classList.contains('animated')) {
                const target = parseInt(stat.getAttribute('data-count') || stat.getAttribute('data-target'));
                const statItem = stat.closest('.stat-item, .stat-card');
                const statLabel = statItem ? statItem.querySelector('.stat-label').textContent : '';
                let suffix = '';
                
                if (target >= 100) {
                    suffix = '+';
                } else if (target === 98) {
                    suffix = '%';
                } else if (statLabel.includes('Heures')) {
                    suffix = 'h';
                } else if (statLabel.includes('Années')) {
                    suffix = ' ans';
                }
                
                stat.textContent = target + suffix;
                stat.classList.add('animated');
            }
        });
    }, 1000);
    
    // Mobile-specific fallback - more aggressive timing for mobile devices
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            const statNumbers = document.querySelectorAll('.stat-number[data-count], .stat-number[data-target]');
            statNumbers.forEach(stat => {
                if (stat.textContent === '0' || !stat.classList.contains('animated')) {
                    const target = parseInt(stat.getAttribute('data-count') || stat.getAttribute('data-target'));
                    const statItem = stat.closest('.stat-item, .stat-card');
                    const statLabel = statItem ? statItem.querySelector('.stat-label').textContent : '';
                    let suffix = '';
                    
                    if (target >= 100) {
                        suffix = '+';
                    } else if (target === 98) {
                        suffix = '%';
                    } else if (statLabel.includes('Heures')) {
                        suffix = 'h';
                    } else if (statLabel.includes('Années')) {
                        suffix = ' ans';
                    }
                    
                    stat.textContent = target + suffix;
                    stat.classList.add('animated');
                }
            });
        }, 500); // Faster fallback for mobile
    }
});

// Brands section animations
document.addEventListener('DOMContentLoaded', function() {
    const brandItems = document.querySelectorAll('.brand-item');
    
    const brandObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Staggered animation
            }
        });
    }, { threshold: 0.1 });
    
    brandItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        brandObserver.observe(item);
    });
});

// Brand hover effects with sound simulation (visual feedback)
document.addEventListener('DOMContentLoaded', function() {
    const brandItems = document.querySelectorAll('.brand-item');
    
    brandItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add a subtle pulse effect
            this.style.animation = 'brandPulse 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
});

// Add CSS animation for brand pulse
const brandStyle = document.createElement('style');
brandStyle.textContent = `
    @keyframes brandPulse {
        0% { transform: translateY(-10px) scale(1); }
        50% { transform: translateY(-10px) scale(1.02); }
        100% { transform: translateY(-10px) scale(1); }
    }
`;
document.head.appendChild(brandStyle);

// Brands Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('brandsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (!carousel) return;
    
    const brandItems = carousel.querySelectorAll('.brand-item');
    const totalItems = brandItems.length;
    const itemsPerView = window.innerWidth > 768 ? 4 : window.innerWidth > 480 ? 2 : 1;
    const totalSlides = Math.ceil(totalItems / itemsPerView);
    
    let currentSlide = 0;
    let isAutoPlaying = true;
    let autoPlayInterval;
    
    // Create indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        const translateX = -currentSlide * (100 / itemsPerView);
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Auto play functionality
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 2000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    function toggleAutoPlay() {
        isAutoPlaying = !isAutoPlaying;
        const icon = playPauseBtn.querySelector('i');
        
        if (isAutoPlaying) {
            icon.className = 'fas fa-pause';
            startAutoPlay();
        } else {
            icon.className = 'fas fa-play';
            stopAutoPlay();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        if (isAutoPlaying) {
            stopAutoPlay();
            startAutoPlay();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        if (isAutoPlaying) {
            stopAutoPlay();
            startAutoPlay();
        }
    });
    
    playPauseBtn.addEventListener('click', toggleAutoPlay);
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            
            if (isAutoPlaying) {
                stopAutoPlay();
                startAutoPlay();
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        if (isAutoPlaying) {
            stopAutoPlay();
        }
    });
    
    carousel.addEventListener('mouseleave', () => {
        if (isAutoPlaying) {
            startAutoPlay();
        }
    });
    
    // Initialize
    createIndicators();
    updateCarousel();
    startAutoPlay();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newItemsPerView = window.innerWidth > 768 ? 4 : window.innerWidth > 480 ? 2 : 1;
        if (newItemsPerView !== itemsPerView) {
            location.reload(); // Simple solution for responsive changes
        }
    });
});
