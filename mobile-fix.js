// Mobile Fix Script - Simplified and robust version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile fix script loaded');
    
    // ===== MOBILE MENU FIX =====
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) {
            console.error('Mobile menu elements not found');
            return;
        }
        
        console.log('Mobile menu elements found, initializing...');
        
        // Simple click handler
        hamburger.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked');
            
            // Toggle classes
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            console.log('Menu toggled. Active classes:', {
                hamburger: hamburger.classList.contains('active'),
                navMenu: navMenu.classList.contains('active')
            });
        };
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.onclick = function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            };
        });
        
        // Close menu when clicking outside
        document.onclick = function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        };
        
        console.log('Mobile menu initialized successfully');
    }
    
    // ===== STATS ANIMATION FIX =====
    function initStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        console.log('Found stat numbers:', statNumbers.length);
        
        if (statNumbers.length === 0) {
            console.error('No stat numbers found');
            return;
        }
        
        // Simple animation function
        function animateNumber(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function update() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start);
                    requestAnimationFrame(update);
                } else {
                    element.textContent = target;
                }
            }
            update();
        }
        
        // Get suffix based on label
        function getSuffix(element, target) {
            const statCard = element.closest('.stat-card');
            const label = statCard ? statCard.querySelector('.stat-label').textContent : '';
            
            if (target >= 100) return '+';
            if (target === 98) return '%';
            if (label.includes('Années')) return ' ans';
            return '';
        }
        
        // Intersection Observer for stats
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stats = entry.target.querySelectorAll('.stat-number[data-count]');
                    stats.forEach((stat, index) => {
                        const target = parseInt(stat.getAttribute('data-count'));
                        if (target && !stat.classList.contains('animated')) {
                            stat.classList.add('animated');
                            setTimeout(() => {
                                animateNumber(stat, target);
                                const suffix = getSuffix(stat, target);
                                setTimeout(() => {
                                    stat.textContent = target + suffix;
                                }, 2000);
                            }, index * 200);
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Find stats section
        const statsSection = document.querySelector('.enhanced-stats');
        if (statsSection) {
            console.log('Stats section found, observing...');
            statsObserver.observe(statsSection);
        } else {
            console.error('Stats section not found');
        }
        
        // Fallback: Force display after 3 seconds
        setTimeout(() => {
            statNumbers.forEach(stat => {
                if (stat.textContent === '0' || !stat.classList.contains('animated')) {
                    const target = parseInt(stat.getAttribute('data-count'));
                    const suffix = getSuffix(stat, target);
                    stat.textContent = target + suffix;
                    stat.classList.add('animated');
                    console.log('Fallback applied to stat:', target + suffix);
                }
            });
        }, 3000);
        
        console.log('Stats animation initialized');
    }
    
    // Initialize both functions
    initMobileMenu();
    initStatsAnimation();
    
    // Additional mobile-specific fixes
    if (window.innerWidth <= 768) {
        console.log('Mobile device detected, applying mobile fixes...');
        
        // Force stats display on mobile after 1 second
        setTimeout(() => {
            const statNumbers = document.querySelectorAll('.stat-number[data-count]');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const statCard = stat.closest('.stat-card');
                const label = statCard ? statCard.querySelector('.stat-label').textContent : '';
                let suffix = '';
                
                if (target >= 100) suffix = '+';
                else if (target === 98) suffix = '%';
                else if (label.includes('Années')) suffix = ' ans';
                
                stat.textContent = target + suffix;
                stat.classList.add('animated');
            });
            console.log('Mobile stats fallback applied');
        }, 1000);
    }
});
