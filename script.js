// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Typing Animation for Terminal
const typingText = document.querySelector('.typing-text');
const messages = [
    'Establishing secure connection...',
    'Scanning for vulnerabilities...',
    'Exploiting system defenses...',
    'Access granted.',
    'Welcome to Blue Lock Eleven.',
    'Initialization complete.',
];

let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentMessage = messages[messageIndex];
    
    if (isDeleting) {
        typingText.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentMessage.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
if (typingText) {
    typeWriter();
}

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (!entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target, target);
                }
            }

            // Animate text decryption
            if (entry.target.classList.contains('about-description') || entry.target.classList.contains('card-description') || entry.target.classList.contains('achievement-description')) {
                if (!entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    const text = entry.target.textContent;
                    entry.target.textContent = '';
                    for (let i = 0; i < text.length; i++) {
                        const span = document.createElement('span');
                        span.textContent = text[i];
                        span.style.animation = `text-decryption 0.5s ease ${i * 0.01}s forwards`;
                        span.style.opacity = '0';
                        entry.target.appendChild(span);
                    }
                }
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.specialty-card, .stat-item, .about-content, .team-showcase, .contact-content, .about-description, .card-description, .achievement-description').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 17, 34, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 17, 34, 0.9)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = Math.max(0.3, 1 - (scrolled / window.innerHeight));
    }
});

// Glitch effect on mouse move for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        heroTitle.style.transform = `translate(${mouseX * 10 - 5}px, ${mouseY * 10 - 5}px)`;
    });
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        submitBtn.querySelector('span').textContent = 'SENDING...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'MESSAGE SENT!';
            submitBtn.style.background = 'var(--primary-blue)';
            submitBtn.style.color = 'var(--darker-blue)';
            
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = 'transparent';
                submitBtn.style.color = 'var(--primary-blue)';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Add particle interaction
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelector('.particles');
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    if (particles) {
        particles.style.backgroundPosition = `${x}% ${y}%`;
    }
});

// Card hover sound effect (visual only)
document.querySelectorAll('.specialty-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.submit-btn, .nav-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 212, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy load images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
            
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Member Card Hover Glitch
document.querySelectorAll('.member-card-wrapper').forEach(wrapper => {
    wrapper.addEventListener('mouseenter', () => {
        wrapper.classList.add('glitch-effect');
    });
    wrapper.addEventListener('animationend', () => {
        wrapper.classList.remove('glitch-effect');
    });
});

// Member Card Click Functionality
document.querySelectorAll('.member-card-wrapper').forEach(wrapper => {
    const card = wrapper.querySelector('.member-card');
    
    // Click to flip
    wrapper.addEventListener('click', function(e) {
        e.stopPropagation();
        const isClicked = this.classList.contains('clicked');
        
        // Close all other cards
        document.querySelectorAll('.member-card-wrapper').forEach(other => {
            if (other !== this) {
                other.classList.remove('clicked');
            }
        });
        
        // Toggle current card
        if (isClicked) {
            this.classList.remove('clicked');
        } else {
            this.classList.add('clicked');
        }
    });
    
    // Close card when clicking outside
    document.addEventListener('click', function(e) {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('clicked');
        }
    });
});

// Console easter egg
console.log('%c⚽ BLUE LOCK ELEVEN ⚽', 'color: #00D4FF; font-size: 30px; font-weight: bold; text-shadow: 0 0 10px #00D4FF;');
console.log('%cCTF Team | Professional Hackers', 'color: #00FFFF; font-size: 14px;');
console.log('%cLooking for talent? Contact us!', 'color: #B0B0B0; font-size: 12px;');

// --- Members Page Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-cards-container');
    if (!membersContainer) return;

    const players = [
        // Strikers
        { name: 'Isagi', specialty: 'PWN', number: 11, avatar: 'card.png', stats: ['Metavision', 'Direct Shot', 'Adaptability'], position: { x: '50%', y: '85%' } },
        { name: 'Bachira', specialty: 'WEB', number: 8, avatar: 'card.png', stats: ['Dribbling', 'Creativity', 'XSS Master'], position: { x: '30%', y: '75%' } },
        { name: 'Nagi', specialty: 'REVERSE', number: 7, avatar: 'card.png', stats: ['Trapping', 'Genius IQ', 'Obfuscation'], position: { x: '70%', y: '75%' } },
        // Midfielders
        { name: 'Rin', specialty: 'CRYPTO', number: 10, avatar: 'card.png', stats: ['Puppet Master', 'Decryption', 'Flow State'], position: { x: '50%', y: '60%' } },
        { name: 'Chigiri', specialty: 'FORENSICS', number: 4, avatar: 'card.png', stats: ['Speed', 'Data Recovery', 'Analysis'], position: { x: '20%', y: '50%' } },
        { name: 'Reo', specialty: 'BLOCKCHAIN', number: 9, avatar: 'card.png', stats: ['Copy', 'Versatility', 'Smart Contract Audit'], position: { x: '80%', y: '50%' } },
        // Defenders
        { name: 'Gagamaru', specialty: 'MISC', number: 1, avatar: 'card.png', stats: ['Reflexes', 'Hardware', 'Physicality'], position: { x: '50%', y: '15%' } },
        { name: 'Aiku', specialty: 'REVERSE', number: 3, avatar: 'card.png', stats: ['Leadership', 'Binary Analysis', 'Defense'], position: { x: '65%', y: '30%' } },
        { name: 'Niko', specialty: 'FORENSICS', number: 5, avatar: 'card.png', stats: ['Vision', 'Stealth', 'Log Analysis'], position: { x: '35%', y: '30%' } },
        // Extra Players
        { name: 'Barou', specialty: 'PWN', number: 13, avatar: 'card.png', stats: ['King', 'Exploitation', 'Intimidation'], position: { x: '75%', y: '90%' } },
        { name: 'Shidou', specialty: 'CRYPTO', number: 16, avatar: 'card.png', stats: ['Extreme Goal', 'Aggression', 'Brute Force'], position: { x: '25%', y: '90%' } },
        // Coach and Extras
        { name: 'Ego', specialty: 'Coach', number: '★', avatar: 'card.png', stats: ['Mastermind', 'Strategy', 'Egoism'], position: { x: '50%', y: '110%' } },
        { name: 'Anri', specialty: 'Manager', number: '📝', avatar: 'card.png', stats: ['Management', 'Support', 'Logistics'], position: { x: '30%', y: '110%' } },
        { name: 'Sae', specialty: 'Genius', number: '10', avatar: 'card.png', stats: ['Prodigy', 'Vision', 'Passing'], position: { x: '70%', y: '110%' } },
    ];

    players.forEach(player => {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'member-card-wrapper';
        cardWrapper.style.setProperty('--position-x', player.position.x);
        cardWrapper.style.setProperty('--position-y', player.position.y);

        const card = document.createElement('div');
        card.className = 'member-card';

        // Card Front
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.innerHTML = `
            <span class="member-number">${player.number}</span>
            <img src="${player.avatar}" alt="${player.name}" class="member-avatar">
        `;

        // Card Back
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        const statsHTML = player.stats.map(stat => `<div class="stat-badge">${stat}</div>`).join('');
        cardBack.innerHTML = `
            <h3 class="member-name">${player.name}</h3>
            <p class="member-specialty">${player.specialty}</p>
            <div class="member-stats">${statsHTML}</div>
        `;

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        cardWrapper.appendChild(card);
        membersContainer.appendChild(cardWrapper);

        // Click to flip logic
        cardWrapper.addEventListener('click', function(e) {
            e.stopPropagation();
            const isClicked = this.classList.contains('clicked');
            
            // Close all other cards
            document.querySelectorAll('.member-card-wrapper').forEach(other => {
                if (other !== this) {
                    other.classList.remove('clicked');
                }
            });
            
            // Toggle current card
            this.classList.toggle('clicked');
        });
    });

    // Close all cards when clicking on the background
    document.querySelector('.football-ground-container').addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('football-ground')) {
            document.querySelectorAll('.member-card-wrapper').forEach(wrapper => {
                wrapper.classList.remove('clicked');
            });
        }
    });
});

