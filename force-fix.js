// Force Fix Script - Direct and aggressive approach
console.log('Force Fix Script loaded');

// ===== FORCE STATS DISPLAY =====
function forceStatsDisplay() {
    console.log('Forcing stats display...');
    
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    console.log('Found stat numbers:', statNumbers.length);
    
    statNumbers.forEach((stat, index) => {
        const target = parseInt(stat.getAttribute('data-count'));
        console.log(`Stat ${index}: target = ${target}`);
        
        // Get suffix based on label
        const statCard = stat.closest('.stat-card');
        const label = statCard ? statCard.querySelector('.stat-label').textContent : '';
        let suffix = '';
        
        if (target >= 100) suffix = '+';
        else if (target === 98) suffix = '%';
        else if (label.includes('Années')) suffix = ' ans';
        
        // Force display immediately
        stat.textContent = target + suffix;
        stat.style.opacity = '1';
        stat.style.visibility = 'visible';
        stat.style.display = 'block';
        
        console.log(`Forced stat ${index}: ${target + suffix}`);
    });
}

// ===== FORCE MENU FUNCTIONALITY =====
function forceMenuFunctionality() {
    console.log('Forcing menu functionality...');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Hamburger element:', hamburger);
    console.log('Nav menu element:', navMenu);
    
    if (!hamburger || !navMenu) {
        console.error('Menu elements not found!');
        return;
    }
    
    // Remove any existing event listeners by cloning
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    // Add direct onclick handler
    newHamburger.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked - toggling menu');
        
        newHamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        console.log('Menu toggled:', {
            hamburgerActive: newHamburger.classList.contains('active'),
            navMenuActive: navMenu.classList.contains('active')
        });
    };
    
    // Add touch support
    newHamburger.ontouchstart = function(e) {
        e.preventDefault();
    };
    
    newHamburger.ontouchend = function(e) {
        e.preventDefault();
        newHamburger.onclick(e);
    };
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.onclick = function() {
            newHamburger.classList.remove('active');
            navMenu.classList.remove('active');
        };
    });
    
    // Close menu when clicking outside
    document.onclick = function(e) {
        if (!newHamburger.contains(e.target) && !navMenu.contains(e.target)) {
            newHamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    };
    
    console.log('Menu functionality forced');
}

// ===== FORCE CSS STYLES =====
function forceCSSStyles() {
    console.log('Forcing CSS styles...');
    
    // Force hamburger visibility
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.style.display = 'flex';
        hamburger.style.cursor = 'pointer';
        hamburger.style.padding = '15px';
        hamburger.style.zIndex = '1001';
    }
    
    // Force menu styles
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.position = 'fixed';
        navMenu.style.left = '-100%';
        navMenu.style.top = '70px';
        navMenu.style.width = '100%';
        navMenu.style.height = 'calc(100vh - 70px)';
        navMenu.style.backgroundColor = '#fff';
        navMenu.style.zIndex = '1000';
        navMenu.style.transition = 'left 0.3s ease';
        navMenu.style.overflowY = 'auto';
        navMenu.style.padding = '20px 0';
        navMenu.style.boxShadow = '0 10px 27px rgba(0, 0, 0, 0.15)';
    }
    
    // Force stats styles
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        stat.style.opacity = '1';
        stat.style.visibility = 'visible';
        stat.style.display = 'block';
        stat.style.fontSize = '2.5rem';
        stat.style.fontWeight = '700';
        stat.style.color = '#000';
    });
    
    console.log('CSS styles forced');
}

// ===== MAIN EXECUTION =====
function executeForceFix() {
    console.log('Executing force fix...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', executeForceFix);
        return;
    }
    
    // Force everything
    forceCSSStyles();
    forceMenuFunctionality();
    forceStatsDisplay();
    
    // Additional fallbacks
    setTimeout(() => {
        forceStatsDisplay();
        console.log('Fallback stats display executed');
    }, 1000);
    
    setTimeout(() => {
        forceStatsDisplay();
        console.log('Second fallback stats display executed');
    }, 3000);
    
    console.log('Force fix execution completed');
}

// Execute immediately
executeForceFix();

// Also execute on window load
window.addEventListener('load', executeForceFix);

// Execute on any interaction
document.addEventListener('click', () => {
    setTimeout(forceStatsDisplay, 100);
});

document.addEventListener('touchstart', () => {
    setTimeout(forceStatsDisplay, 100);
});

console.log('Force Fix Script initialized');
