// Mobile Navigation
const navToggler = document.querySelector('.nav-toggler');
const navLinks = document.querySelector('.nav-links');
const navClose = document.querySelector('.nav-close');

navToggler.addEventListener('click', () => {
    navLinks.classList.add('active');
});

navClose.addEventListener('click', () => {
    navLinks.classList.remove('active');
});

// Handle mobile dropdowns
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

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown, .sub-dropdown').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Form submission handling
const form = document.getElementById('englishEducationForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            highSchool: document.getElementById('highSchool').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.phone || !formData.highSchool || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation (basic format)
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert('Please enter a valid phone number');
            return;
        }

        // Here you would typically send the data to your server
        // For now, we'll just show a success message
        alert('Thank you for your application! We will contact you soon.');
        this.reset();
    });
}
