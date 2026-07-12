// Sticky Navbar
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
});

// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const navItems = navLinks.querySelectorAll('a');

mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Typing Animation
const typingTextElement = document.getElementById('typing-text');
const wordsToType = ["Shayan Saha"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingTextElement) return;
    const currentWord = wordsToType[wordIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % wordsToType.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();

// 3D Illustration Mouse Tracking
const illContainer = document.querySelector('.about-illustration');
const illImg = document.querySelector('.about-illustration img');

if (illContainer && illImg) {
    illContainer.addEventListener('mousemove', (e) => {
        const rect = illContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (max 15 degrees)
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        
        illImg.style.transform = `scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        illImg.style.transition = 'transform 0.1s ease-out';
    });

    illContainer.addEventListener('mouseleave', () => {
        illImg.style.transform = `scale(1) rotateX(0deg) rotateY(0deg) translateZ(0)`;
        illImg.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
}

// Start typing animation on load
// Start typing animation on load
document.addEventListener('DOMContentLoaded', () => {
    if(typingTextElement) {
        setTimeout(typeEffect, 500);
    }
    
    // Initialize Matrix Rain
    initMatrixRain('rain-left');
    initMatrixRain('rain-right');
});

// Matrix Rain Effect Logic
function initMatrixRain(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const setSize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = window.innerHeight;
    };
    setSize();
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:"<>?';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * canvas.height; 
    }
    
    window.addEventListener('resize', () => {
        setSize();
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height; 
        }
    });

    function draw() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        // Fade effect with background color
        ctx.fillStyle = isDark ? 'rgba(10, 15, 28, 0.05)' : 'rgba(248, 250, 252, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Accent color text
        ctx.fillStyle = isDark ? '#3b82f6' : '#8b5cf6';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            if (i >= columns) break;
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}
