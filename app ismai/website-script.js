// ===== NAVIGATION ===== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===== SCROLL NAVIGATION ===== 
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ===== SCROLL TO SECTION ===== 
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== FAQ TOGGLE ===== 
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ===== CONTACT FORM ===== 
const contactForm = document.getElementById('contactoForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;
        
        // Simulate form submission
        console.log({
            nome,
            email,
            assunto,
            mensagem
        });
        
        // Show success message
        alert(`Obrigado ${nome}! Sua mensagem foi enviada com sucesso.\nEntraremos em contacto em breve.`);
        
        // Reset form
        contactForm.reset();
    });
}

// ===== DOWNLOAD APP ===== 
function downloadApp() {
    alert('A transferência será iniciada...\n\nOu descarregue manualmente:\nApp Store: https://apps.apple.com\nGoogle Play: https://play.google.com');
}

// ===== DARK MODE TOGGLE ===== 
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, var(--accent-dark) 0%, var(--accent-light) 100%);
    color: white;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(8, 145, 178, 0.3);
    z-index: 999;
    transition: all 0.3s ease;
`;

darkModeToggle.addEventListener('mouseover', () => {
    darkModeToggle.style.transform = 'scale(1.1)';
});

darkModeToggle.addEventListener('mouseout', () => {
    darkModeToggle.style.transform = 'scale(1)';
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.documentElement.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.documentElement.classList.toggle('dark-mode');
    
    if (isDarkMode) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

document.body.appendChild(darkModeToggle);

// ===== SMOOTH ANIMATIONS ON SCROLL ===== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.servico-card, .feature-card, .instituicao-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});
