// This file is currently just smooth-scrolling for the in-page nav links
// (Home / Projects). It's not required for the site to work, but it makes
// clicking "Projects" in the nav glide down instead of jumping instantly.

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (event) {
    var targetId = link.getAttribute('href');
    var target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

var lightbox = document.querySelector('.image-lightbox');
if (!lightbox) {
  lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = [
    '<div class="image-lightbox__backdrop"></div>',
    '<div class="image-lightbox__panel" role="dialog" aria-modal="true" aria-label="Expanded image">',
    '  <button type="button" class="image-lightbox__close" aria-label="Close expanded image">×</button>',
    '  <img class="image-lightbox__img" src="" alt="">',
    '  <p class="image-lightbox__caption"></p>',
    '</div>'
  ].join('');
  document.body.appendChild(lightbox);
}

var lightboxImage = lightbox.querySelector('.image-lightbox__img');
var lightboxCaption = lightbox.querySelector('.image-lightbox__caption');
var lightboxClose = lightbox.querySelector('.image-lightbox__close');

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox || event.target.classList.contains('image-lightbox__backdrop')) {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});

document.querySelectorAll('img').forEach(function (image) {
  if (image.closest('a') || image.classList.contains('no-lightbox')) {
    return;
  }

  image.style.cursor = 'zoom-in';
  image.addEventListener('click', function () {
    if (!image.src) {
      return;
    }

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || '';
    lightboxCaption.textContent = image.alt || 'Expanded project image';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });
});

var heroCarousel = document.querySelector('.hero-carousel');
if (heroCarousel) {
  var heroImages = Array.from(heroCarousel.querySelectorAll('.carousel-image'));
  var heroPrev = heroCarousel.querySelector('.carousel-button--prev');
  var heroNext = heroCarousel.querySelector('.carousel-button--next');
  var heroIndex = 0;

  function showHeroImage(newIndex) {
    if (!heroImages.length) return;

    heroIndex = (newIndex + heroImages.length) % heroImages.length;
    heroImages.forEach(function (image, index) {
      image.classList.toggle('active', index === heroIndex);
    });
  }

  if (heroPrev) {
    heroPrev.addEventListener('click', function () {
      showHeroImage(heroIndex - 1);
    });
  }

  if (heroNext) {
    heroNext.addEventListener('click', function () {
      showHeroImage(heroIndex + 1);
    });
  }

  heroImages.forEach(function (image) {
    image.addEventListener('click', function () {
      showHeroImage(heroIndex + 1);
    });
  });
}

var careerTimeline = document.querySelector('.career-timeline');
if (careerTimeline) {
  var timelineItems = Array.from(careerTimeline.querySelectorAll('.timeline-item'));
  var timelineFilters = Array.from(document.querySelectorAll('.timeline-filter'));
  var timelineFilterForm = document.querySelector('.timeline-filters');
  var timelineFrameRequested = false;

  function updateTimelineProgress() {
    timelineFrameRequested = false;

    var visibleItems = timelineItems.filter(function (item) {
      return !item.hidden;
    });

    if (!visibleItems.length) {
      careerTimeline.style.setProperty('--timeline-progress', '0%');
      return;
    }

    var timelineRect = careerTimeline.getBoundingClientRect();
    var guidePosition = window.innerHeight * 0.42;
    var progress = (guidePosition - timelineRect.top) / timelineRect.height;
    var clampedProgress = Math.min(1, Math.max(0, progress));

    careerTimeline.style.setProperty('--timeline-progress', (clampedProgress * 100).toFixed(2) + '%');

    visibleItems.forEach(function (item) {
      var markerPosition = item.getBoundingClientRect().top + 10;
      item.classList.toggle('is-past', markerPosition <= guidePosition);
    });
  }

  function requestTimelineUpdate() {
    if (timelineFrameRequested) return;
    timelineFrameRequested = true;
    window.requestAnimationFrame(updateTimelineProgress);
  }

  function filterTimeline(filterButton) {
      var selectedCategory = filterButton.getAttribute('data-filter');

      timelineFilters.forEach(function (button) {
        var isSelected = button === filterButton;
        button.classList.toggle('is-active', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
      });

      timelineItems.forEach(function (item) {
        item.hidden = selectedCategory !== 'all' && item.getAttribute('data-category') !== selectedCategory;
      });

      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      careerTimeline.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });

      requestTimelineUpdate();
  }

  timelineFilterForm.addEventListener('submit', function (event) {
    event.preventDefault();
    filterTimeline(event.submitter);
  });

  window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
  window.addEventListener('resize', requestTimelineUpdate);
  requestTimelineUpdate();
}
