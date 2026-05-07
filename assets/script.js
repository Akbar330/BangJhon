// --- AURORA BACKGROUND ---
const canvas = document.getElementById('aurora-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 200 + 100;
        this.color = `hsla(${Math.random() * 60 + 220}, 70%, 50%, 0.15)`;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = height + this.size;
        if (this.y > height + this.size) this.y = -this.size;
    }
    draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = Array.from({ length: 15 }, () => new Particle());

function animateAurora() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateAurora);
}
animateAurora();

// --- CURSOR GLOW ---
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// --- TYPING EFFECT ---
const nameDisplay = document.getElementById('name-display');
const nameText = "Bang Jhon";
let charIndex = 0;

function typeName() {
    if (charIndex < nameText.length) {
        nameDisplay.textContent += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeName, 150);
    }
}
setTimeout(typeName, 1000);

// --- ROLE ROTATOR ---
const roleText = document.getElementById('role-text');
const roles = ["Fullstack Developer", "UI Designer", "Tech Content Creator", "Open Source Enthusiast"];
let roleIndex = 0;

function rotateRole() {
    roleText.style.opacity = '0';
    setTimeout(() => {
        roleText.textContent = roles[roleIndex];
        roleText.style.opacity = '1';
        roleIndex = (roleIndex + 1) % roles.length;
    }, 500);
}
setInterval(rotateRole, 3000);
rotateRole();

// --- STATS COUNTER ---
const stats = document.querySelectorAll('.stat-num');
function startCounter() {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        let current = 0;
        const increment = target / 50;
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateCount, 40);
            } else {
                stat.textContent = target + "+";
            }
        };
        updateCount();
    });
}
setTimeout(startCounter, 1500);

// --- PARTICLE BURST ---
function launchParticles(e, color) {
    const burstContainer = document.getElementById('particle-burst');
    const rect = e.target.getBoundingClientRect();
    const centerX = e.clientX;
    const centerY = e.clientY;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        particle.style.animation = `particleOut ${Math.random() * 0.5 + 0.5}s forwards ease-out`;
        
        burstContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

// --- ENTRANCE ANIMATIONS ---
const linkCards = document.querySelectorAll('.link-card');
linkCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 1200 + (index * 150));
});

// Parallax effect on card
const mainCard = document.getElementById('main-card');
document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.clientX) / 45;
    const yAxis = (window.innerHeight / 2 - e.clientY) / 45;
    mainCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Reset card on mouse out
document.addEventListener('mouseleave', () => {
    mainCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
});