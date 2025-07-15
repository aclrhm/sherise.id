// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const quoteElement = document.getElementById('daily-quote');
const newQuoteBtn = document.getElementById('new-quote-btn');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');
const modal = document.getElementById('tool-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');

// Motivational quotes
const quotes = [
    "Kekuatan wanita tidak terletak pada kemampuannya untuk menghindari kegagalan, tetapi pada kemampuannya untuk bangkit setelah jatuh.",
    "Setiap wanita memiliki kekuatan untuk mengubah dunia, dimulai dari mengubah dirinya sendiri.",
    "Kesehatan adalah investasi terbaik yang bisa kamu berikan untuk dirimu sendiri.",
    "Jangan biarkan masa lalu menentukan masa depanmu. Kamu memiliki kekuatan untuk menulis cerita barumu.",
    "Percaya pada dirimu sendiri, karena jika kamu tidak percaya, siapa lagi yang akan percaya?",
    "Setiap langkah kecil yang kamu ambil hari ini adalah investasi untuk masa depan yang lebih baik.",
    "Kamu lebih kuat dari yang kamu kira, lebih berani dari yang kamu rasakan, dan lebih dicintai dari yang kamu bayangkan.",
    "Kesuksesan bukan tentang tidak pernah jatuh, tetapi tentang bangkit setiap kali kamu jatuh.",
    "Wanita yang percaya diri adalah wanita yang tidak takut untuk bermimpi besar dan bekerja keras.",
    "Setiap hari adalah kesempatan baru untuk menjadi versi terbaik dari dirimu."
];

let currentQuoteIndex = 0;

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change and scroll to top button
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Quote generator
function getRandomQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    return quotes[currentQuoteIndex];
}

newQuoteBtn.addEventListener('click', () => {
    quoteElement.style.opacity = '0';
    setTimeout(() => {
        quoteElement.textContent = getRandomQuote();
        quoteElement.style.opacity = '1';
    }, 300);
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const topic = formData.get('topic');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !topic || !message) {
        showAlert('Mohon lengkapi semua field yang diperlukan.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Mohon masukkan email yang valid.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showAlert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
});

// Newsletter subscription
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = new FormData(newsletterForm).get('newsletter-email');
    
    if (!email) {
        showAlert('Mohon masukkan email Anda.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Mohon masukkan email yang valid.', 'error');
        return;
    }
    
    const button = newsletterForm.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
        showAlert('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
        newsletterForm.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
});

// Alert function
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 300);
    }, 4000);
}

// Add CSS for alert animations
const alertStyles = document.createElement('style');
alertStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(alertStyles);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .topic-card, .disease-card, .step-card, .resource-category').forEach(el => {
    observer.observe(el);
});

// Health tracker functionality
function createHealthTracker() {
    const tracker = {
        data: JSON.parse(localStorage.getItem('healthData')) || {},
        
        saveData(date, data) {
            this.data[date] = data;
            localStorage.setItem('healthData', JSON.stringify(this.data));
        },
        
        getData(date) {
            return this.data[date] || null;
        },
        
        getAllData() {
            return this.data;
        }
    };
    
    return tracker;
}

// Initialize health tracker
const healthTracker = createHealthTracker();

// Menstrual cycle calculator
function calculateNextPeriod(lastPeriodDate, cycleLength = 28) {
    const lastDate = new Date(lastPeriodDate);
    const nextDate = new Date(lastDate.getTime() + (cycleLength * 24 * 60 * 60 * 1000));
    return nextDate;
}

function calculateOvulation(lastPeriodDate, cycleLength = 28) {
    const lastDate = new Date(lastPeriodDate);
    const ovulationDate = new Date(lastDate.getTime() + ((cycleLength - 14) * 24 * 60 * 60 * 1000));
    return ovulationDate;
}

// BMI Calculator
function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category, advice;
    if (bmi < 18.5) {
        category = 'Underweight';
        advice = 'Konsultasikan dengan dokter untuk program penambahan berat badan yang sehat.';
    } else if (bmi < 25) {
        category = 'Normal';
        advice = 'Pertahankan pola hidup sehat dengan diet seimbang dan olahraga teratur.';
    } else if (bmi < 30) {
        category = 'Overweight';
        advice = 'Pertimbangkan untuk menurunkan berat badan dengan diet sehat dan olahraga.';
    } else {
        category = 'Obese';
        advice = 'Sangat disarankan untuk berkonsultasi dengan dokter untuk program penurunan berat badan.';
    }
    
    return {
        value: bmi.toFixed(1),
        category: category,
        advice: advice
    };
}

// Modal functionality
function openModal(content) {
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeModalFunc);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Tool handlers
document.querySelectorAll('.resource-item[data-tool]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const toolType = item.getAttribute('data-tool');
        
        switch(toolType) {
            case 'menstrual':
                showMenstrualCalculator();
                break;
            case 'bmi':
                showBMICalculator();
                break;
            case 'tracker':
                showHealthTracker();
                break;
        }
    });
});

function showMenstrualCalculator() {
    const content = `
        <div class="tool-form">
            <h3><i class="fas fa-calendar-alt"></i> Kalkulator Siklus Menstruasi</h3>
            <form id="menstrual-form">
                <div class="form-group">
                    <label for="last-period">Tanggal Haid Terakhir:</label>
                    <input type="date" id="last-period" name="last-period" required>
                </div>
                <div class="form-group">
                    <label for="cycle-length">Panjang Siklus (hari):</label>
                    <input type="number" id="cycle-length" name="cycle-length" value="28" min="21" max="35" required>
                </div>
                <button type="submit" class="btn btn-primary">Hitung</button>
            </form>
            <div id="menstrual-result" class="tool-result" style="display: none;"></div>
        </div>
    `;
    
    openModal(content);
    
    document.getElementById('menstrual-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const lastPeriod = document.getElementById('last-period').value;
        const cycleLength = parseInt(document.getElementById('cycle-length').value);
        
        if (lastPeriod) {
            const nextPeriod = calculateNextPeriod(lastPeriod, cycleLength);
            const ovulation = calculateOvulation(lastPeriod, cycleLength);
            
            const resultDiv = document.getElementById('menstrual-result');
            resultDiv.innerHTML = `
                <h4>Hasil Perhitungan:</h4>
                <p><strong>Haid Berikutnya:</strong> ${nextPeriod.toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
                <p><strong>Perkiraan Ovulasi:</strong> ${ovulation.toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
                <p><strong>Masa Subur:</strong> ${new Date(ovulation.getTime() - 2*24*60*60*1000).toLocaleDateString('id-ID')} - ${new Date(ovulation.getTime() + 2*24*60*60*1000).toLocaleDateString('id-ID')}</p>
                <p><em>Catatan: Ini hanya perkiraan. Konsultasikan dengan dokter untuk informasi lebih akurat.</em></p>
            `;
            resultDiv.style.display = 'block';
        }
    });
}

function showBMICalculator() {
    const content = `
        <div class="tool-form">
            <h3><i class="fas fa-weight"></i> Kalkulator BMI</h3>
            <form id="bmi-form">
                <div class="form-group">
                    <label for="weight">Berat Badan (kg):</label>
                    <input type="number" id="weight" name="weight" step="0.1" min="1" max="300" required>
                </div>
                <div class="form-group">
                    <label for="height">Tinggi Badan (cm):</label>
                    <input type="number" id="height" name="height" min="100" max="250" required>
                </div>
                <button type="submit" class="btn btn-primary">Hitung BMI</button>
            </form>
            <div id="bmi-result" class="tool-result" style="display: none;"></div>
        </div>
    `;
    
    openModal(content);
    
    document.getElementById('bmi-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        
        if (weight && height) {
            const bmi = calculateBMI(weight, height);
            
            const resultDiv = document.getElementById('bmi-result');
            resultDiv.innerHTML = `
                <h4>Hasil BMI Anda:</h4>
                <p><strong>BMI:</strong> ${bmi.value}</p>
                <p><strong>Kategori:</strong> ${bmi.category}</p>
                <p><strong>Saran:</strong> ${bmi.advice}</p>
                <div style="margin-top: 1rem; padding: 1rem; background: #e3f2fd; border-radius: 8px;">
                    <h5>Rentang BMI Normal:</h5>
                    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                        <li>Underweight: < 18.5</li>
                        <li>Normal: 18.5 - 24.9</li>
                        <li>Overweight: 25.0 - 29.9</li>
                        <li>Obese: ≥ 30.0</li>
                    </ul>
                </div>
            `;
            resultDiv.style.display = 'block';
        }
    });
}

function showHealthTracker() {
    const today = new Date().toISOString().split('T')[0];
    const todayData = healthTracker.getData(today);
    
    const content = `
        <div class="tool-form">
            <h3><i class="fas fa-heartbeat"></i> Tracker Kesehatan Harian</h3>
            <form id="tracker-form">
                <div class="form-group">
                    <label for="tracker-date">Tanggal:</label>
                    <input type="date" id="tracker-date" name="date" value="${today}" required>
                </div>
                <div class="form-group">
                    <label for="mood">Mood (1-10):</label>
                    <input type="range" id="mood" name="mood" min="1" max="10" value="${todayData?.mood || 5}">
                    <span id="mood-value">${todayData?.mood || 5}</span>
                </div>
                <div class="form-group">
                    <label for="energy">Tingkat Energi (1-10):</label>
                    <input type="range" id="energy" name="energy" min="1" max="10" value="${todayData?.energy || 5}">
                    <span id="energy-value">${todayData?.energy || 5}</span>
                </div>
                <div class="form-group">
                    <label for="symptoms">Gejala (opsional):</label>
                    <textarea id="symptoms" name="symptoms" rows="3" placeholder="Jelaskan gejala yang Anda rasakan...">${todayData?.symptoms || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="notes">Catatan Tambahan:</label>
                    <textarea id="notes" name="notes" rows="2" placeholder="Catatan lainnya...">${todayData?.notes || ''}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Simpan Data</button>
            </form>
            <div id="tracker-result" class="tool-result" style="display: none;"></div>
        </div>
    `;
    
    openModal(content);
    
    // Update range values
    document.getElementById('mood').addEventListener('input', (e) => {
        document.getElementById('mood-value').textContent = e.target.value;
    });
    
    document.getElementById('energy').addEventListener('input', (e) => {
        document.getElementById('energy-value').textContent = e.target.value;
    });
    
    document.getElementById('tracker-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const date = formData.get('date');
        const mood = parseInt(formData.get('mood'));
        const energy = parseInt(formData.get('energy'));
        const symptoms = formData.get('symptoms') || 'Tidak ada';
        const notes = formData.get('notes') || '';
        
        healthTracker.saveData(date, {
            mood,
            energy,
            symptoms,
            notes,
            timestamp: new Date().toISOString()
        });
        
        const resultDiv = document.getElementById('tracker-result');
        resultDiv.innerHTML = `
            <h4>Data Berhasil Disimpan!</h4>
            <p><strong>Tanggal:</strong> ${new Date(date).toLocaleDateString('id-ID')}</p>
            <p><strong>Mood:</strong> ${mood}/10</p>
            <p><strong>Energi:</strong> ${energy}/10</p>
            <p><strong>Gejala:</strong> ${symptoms}</p>
            ${notes ? `<p><strong>Catatan:</strong> ${notes}</p>` : ''}
            <p><em>Data telah disimpan di browser Anda.</em></p>
        `;
        resultDiv.style.display = 'block';
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial quote
    quoteElement.textContent = quotes[currentQuoteIndex];
    
    // Add loading animation to visible elements
    setTimeout(() => {
        document.querySelectorAll('.hero-content, .about-card').forEach(el => {
            el.classList.add('animate');
        });
    }, 100);
    
    // Initialize current date for date inputs
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) {
            input.max = today;
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
    }
    
    // Navigate quotes with arrow keys when quote section is focused
    if (e.target === newQuoteBtn) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            newQuoteBtn.click();
        }
    }
});

// Add some easter eggs
let clickCount = 0;
document.querySelector('.nav-logo h2').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        showAlert('🎉 Selamat! Anda menemukan easter egg! Tetap semangat dalam perjalanan kesehatan Anda!', 'success');
        clickCount = 0;
    }
});

// Performance optimization - Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

images.forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// Add print styles
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .navbar, .scroll-to-top, .modal {
            display: none !important;
        }
        
        body {
            font-size: 12pt;
            line-height: 1.4;
        }
        
        .hero {
            padding: 20px 0;
            background: white !important;
        }
        
        .section-header h2 {
            font-size: 18pt;
            margin-bottom: 10px;
        }
        
        .btn {
            display: none;
        }
        
        .contact-form, .newsletter-form {
            display: none;
        }
    }
`;
document.head.appendChild(printStyles);

console.log('🌸 Sherise.id - Website loaded successfully! 🌸');
console.log('Terima kasih telah mengunjungi platform kesehatan dan pemberdayaan wanita.');