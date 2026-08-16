function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

const backgroundImages = [
    'photos/header/060_1.jpg',
    'photos/header/060_5.jpg',
    'photos/header/060_7.jpg',
    'photos/header/184_1.jpg',
    'photos/header/184_3.jpg',
    'photos/header/184_4.jpg',
    'photos/header/184_7.jpg',
    'photos/header/184_8.jpg',
    'photos/header/184_9.jpg',
];

const bgContainer = document.getElementById('heroBgContainer');
let currentIndex = 0;

backgroundImages.forEach((imgUrl, index) => {
    const slide = document.createElement('div');
    slide.classList.add('hero-bg-slide');
    if (index === 0) slide.classList.add('active');
    slide.style.backgroundImage = `url('${imgUrl}')`;
    bgContainer.appendChild(slide);
});

setInterval(() => {
    const slides = document.querySelectorAll('.hero-bg-slide');
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
}, 6000);

const track = document.getElementById('reviewsTrack');
const cards = document.querySelectorAll('.review-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');
const sliderWrapper = document.getElementById('reviewsSlider');

let reviewIndex = 0;
let autoSlideTimer = null;

function getVisibleCards() {
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 768) return 2;
    return 1;
}

function getMaxIndex() {
    return cards.length - getVisibleCards();
}

function createDots() {
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    for (let i = 0; i <= maxIdx; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === reviewIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            reviewIndex = i;
            updateSlider();
            resetTimer();
        });
        dotsContainer.appendChild(dot);
    }
}

function updateSlider() {
    const maxIdx = getMaxIndex();
    if (reviewIndex > maxIdx) reviewIndex = 0;
    if (reviewIndex < 0) reviewIndex = maxIdx;

    const cardWidth = cards[0].offsetWidth;
    const gap = 20; 
    const slideOffset = (cardWidth + gap) * reviewIndex;

    track.style.transform = `translateX(-${slideOffset}px)`;

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === reviewIndex);
    });
}

function nextSlide() {
    const maxIdx = getMaxIndex();
    if (reviewIndex >= maxIdx) { reviewIndex = 0; } else { reviewIndex++; }
    updateSlider();
}

function prevSlide() {
    const maxIdx = getMaxIndex();
    if (reviewIndex <= 0) { reviewIndex = maxIdx; } else { reviewIndex--; }
    updateSlider();
}

function startTimer() { autoSlideTimer = setInterval(nextSlide, 9000); }
function resetTimer() { clearInterval(autoSlideTimer); startTimer(); }

nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
sliderWrapper.addEventListener('mouseleave', () => startTimer());

window.addEventListener('resize', () => { createDots(); updateSlider(); });

createDots();
updateSlider();
startTimer();

// Плавный скролл по центру для ссылок на блок заказа
document.querySelectorAll('a[href="#order"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector('#order').scrollIntoView({
            behavior: 'smooth',
            block: 'center' 
        });

        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});