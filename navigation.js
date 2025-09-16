// Simple Navigation Script - Clean and robust
console.log('Navigation script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing navigation...');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Hamburger element:', hamburger);
    console.log('Nav menu element:', navMenu);
    
    if (!hamburger || !navMenu) {
        console.error('Navigation elements not found!');
        return;
    }
    
    // Simple toggle function
    function toggleMenu() {
        console.log('Toggling menu...');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        console.log('Menu state:', {
            hamburgerActive: hamburger.classList.contains('active'),
            navMenuActive: navMenu.classList.contains('active')
        });
    }
    
    // Add click event to hamburger
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked');
        toggleMenu();
    });
    
    // Add touch events for mobile
    hamburger.addEventListener('touchstart', function(e) {
        e.preventDefault();
    });
    
    hamburger.addEventListener('touchend', function(e) {
        e.preventDefault();
        console.log('Hamburger touched');
        toggleMenu();
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Nav link clicked, closing menu');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                console.log('Clicked outside, closing menu');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Close menu on window resize (desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    console.log('Navigation initialized successfully');
});
