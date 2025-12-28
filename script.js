// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
        // Close mobile menu after clicking
        const navUl = document.querySelector('nav ul');
        const hamburger = document.querySelector('.hamburger i');
        navUl.classList.remove('active');
        hamburger.classList.remove('fa-times');
        hamburger.classList.add('fa-bars');
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');
const hamburgerIcon = document.querySelector('.hamburger i');

hamburger.addEventListener('click', () => {
    navUl.classList.toggle('active');
    hamburgerIcon.classList.toggle('fa-bars');
    hamburgerIcon.classList.toggle('fa-times');
});

// Generate particles
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = (Math.random() * 10 + 5) + 'px';
    particle.style.height = particle.style.width;
    particlesContainer.appendChild(particle);
}



// Scroll animations for boxes
const boxes = document.querySelectorAll('.box');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

boxes.forEach(box => {
    observer.observe(box);
});



// Flip animation for team cards
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
            setTimeout(() => {
                card.classList.remove('flipped');
            }, 2000); // Show the back for 2 seconds then flip back
        }
    });
});



// Form submission handling for Formspree
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[action*="formspree.io"]');

    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Show submitting state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success - redirect to thank you page
                    const formType = form.classList.contains('signup-form') ? 'early-access' : 'contact';
                    window.location.href = `thank-you.html?form=${formType}`;
                } else {
                    // Error - show message
                    alert('There was an error submitting the form. Please try again.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error submitting the form. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    });
});

// Cookie Consent Banner
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const denyBtn = document.getElementById('deny-cookies');

    // Check if user has already made a choice
    if (localStorage.getItem('cookieConsent') !== 'accepted' && localStorage.getItem('cookieConsent') !== 'denied') {
        banner.style.display = 'block';
    }

    // Accept cookies
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.style.display = 'none';
        // You can enable tracking or cookies here if needed
    });

    // Deny cookies
    denyBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'denied');
        banner.style.display = 'none';
        // You can disable tracking or cookies here if needed
    });
});
