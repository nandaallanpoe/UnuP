// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const body = document.querySelector('body');
const closeButton = document.querySelector('.nav-close');

function closeNav() {
    nav.classList.remove('active');
    burger.classList.remove('toggle');
    body.style.overflow = 'auto';
}

// Toggle Navigation
burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Toggle Burger Animation
    burger.classList.toggle('toggle');
    
    // Prevent Background Scroll when Menu is Open
    body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
});

// Close button click handler
closeButton.addEventListener('click', closeNav);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target) && 
        !closeButton.contains(e.target)) {
        closeNav();
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            closeNav();
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Height of fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your backend
        console.log('Newsletter subscription for:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.program-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// Add sticky header behavior with hide/show on scroll
const header = document.querySelector('nav');
let lastScroll = 0;
const scrollThreshold = 10;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Always show header at the top of the page
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up', 'scroll-down');
        return;
    }
    
    // Determine scroll direction and distance
    if (Math.abs(currentScroll - lastScroll) < scrollThreshold) {
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Handle mobile dropdowns
const dropdowns = document.querySelectorAll('.dropdown > a, .sub-dropdown > a');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
            
            // Close other dropdowns
            dropdowns.forEach(other => {
                const otherParent = other.parentElement;
                if (otherParent !== parent && otherParent.classList.contains('active')) {
                    otherParent.classList.remove('active');
                }
            });
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown, .sub-dropdown').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navToggler = document.querySelector('.nav-toggler');
    const navLinks = document.querySelector('.nav-links');
    const navClose = document.querySelector('.nav-close');

    if (navToggler && navLinks && navClose) {
        navToggler.addEventListener('click', () => {
            navLinks.classList.add('active');
        });

        navClose.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    }

    // Mobile dropdowns
    const dropdowns = document.querySelectorAll('.dropdown > a, .sub-dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

    // Gallery Slider
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    if (sliderTrack && slides.length > 0) {
        window.moveSlider = function(direction) {
            currentSlide = (currentSlide + direction + slides.length) % slides.length;
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        // Set initial position
        sliderTrack.style.transform = 'translateX(0%)';
    }
});

// Vision and Mission Buttons
document.addEventListener('DOMContentLoaded', () => {
    const visionBtn = document.getElementById('visionBtn');
    const missionBtn = document.getElementById('missionBtn');
    const visionContent = document.getElementById('visionContent');
    const missionContent = document.getElementById('missionContent');

    function hideContent(content, button) {
        content.style.display = 'none';
        content.classList.remove('show');
        button.classList.remove('active');
    }

    function showContent(content, button) {
        content.style.display = 'block';
        // Trigger reflow to ensure animation works
        content.offsetHeight;
        content.classList.add('show');
        button.classList.add('active');
    }

    visionBtn.addEventListener('click', () => {
        if (visionContent.style.display === 'block') {
            hideContent(visionContent, visionBtn);
        } else {
            hideContent(missionContent, missionBtn);
            showContent(visionContent, visionBtn);
        }
    });

    missionBtn.addEventListener('click', () => {
        if (missionContent.style.display === 'block') {
            hideContent(missionContent, missionBtn);
        } else {
            hideContent(visionContent, visionBtn);
            showContent(missionContent, missionBtn);
        }
    });
});
