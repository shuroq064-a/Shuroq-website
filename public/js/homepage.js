// Homepage client-side JavaScript (moved out of JSX to avoid parsing issues)

// --- Load navigation dynamically (same as legacy site) ---
async function loadNavigation() {
  try {
    const response = await fetch('nav.html');
    if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
    const navHTML = await response.text();
    const existingNav = document.querySelector('nav');
    if (existingNav) existingNav.innerHTML = navHTML;
    setTimeout(function () {
      if (typeof initializeNavigation === 'function') initializeNavigation();
    }, 300);
  } catch (error) {
    console.error('Error loading navigation:', error);
  }
}

// --- Typed.js hero effect ---
function initTyped() {
  if (typeof Typed !== 'undefined') {
    new Typed('#element', {
      strings: ['Product Engineering', 'Devops', 'ERP', 'Cloud Services', 'Quality Engineering'],
      typeSpeed: 80,
      showCursor: false,
      loop: true
    });
  }
}

// --- Differentiator cards active state ---
function initDifferentiators() {
  const items = document.querySelectorAll('.differentiator-item');
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      items.forEach(function (other) { other.classList.remove('active'); });
      item.classList.add('active');
    });
  });
}

// --- Expertise cards active state ---
function initExpertise() {
  const items = document.querySelectorAll('.expertise-item');
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      items.forEach(function (other) { other.classList.remove('active'); });
      item.classList.add('active');
    });
  });
}

// --- Horizontal slider ---
function initSlider() {
  var currentSlide = 0;
  var totalSlides = 3;
  var sliderWrapper = document.getElementById('slider-wrapper');
  var indicators = document.querySelectorAll('.slider-indicator');

  function updateSliderPosition() {
    var translateX = -currentSlide * 100;
    if (sliderWrapper) sliderWrapper.style.transform = 'translateX(' + translateX + 'vw)';
    indicators.forEach(function (indicator, index) {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }
  function slideToNext() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSliderPosition();
  }
  function slideToPrev() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
  }
  // Expose for inline onclick handlers in HTML
  window.slideToNext = slideToNext;
  window.slideToPrev = slideToPrev;
  updateSliderPosition();

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') slideToPrev();
    else if (e.key === 'ArrowRight') slideToNext();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  loadNavigation();
  initTyped();
  initDifferentiators();
  initExpertise();
  initSlider();
});
