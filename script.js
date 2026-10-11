// Site-wide behavior: fixed header, dropdowns, mobile menu, scroll reveal,
// smooth in-page scrolling, mailto fallback, image lightbox, and timeline.

document.documentElement.classList.add('js');

var prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

// Header: transparent over the hero, solid once the page scrolls.
var masthead = document.querySelector('[data-masthead]');
if (masthead) {
  var updateMasthead = function () {
    masthead.classList.toggle('is-solid', window.scrollY > 40);
  };
  window.addEventListener('scroll', updateMasthead, { passive: true });
  updateMasthead();

  // Mark the link for the current page.
  var currentPage = window.location.href.split('#')[0];
  document.querySelectorAll('.masthead a, .mobile-menu a').forEach(function (link) {
    if (link.href === currentPage && !link.classList.contains('masthead__brand')) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Dropdowns: hover opens them on desktop (CSS); click/tap and keyboard here.
var navItems = Array.from(document.querySelectorAll('.nav-item--has-menu'));

function setDropdown(item, open) {
  item.classList.toggle('is-open', open);
  item.querySelector('.nav-trigger').setAttribute('aria-expanded', String(open));
}

navItems.forEach(function (item) {
  var trigger = item.querySelector('.nav-trigger');

  trigger.addEventListener('click', function () {
    var willOpen = !item.classList.contains('is-open');
    navItems.forEach(function (other) { setDropdown(other, false); });
    setDropdown(item, willOpen);
  });

  item.addEventListener('focusout', function (event) {
    if (!item.contains(event.relatedTarget)) {
      setDropdown(item, false);
    }
  });

  item.addEventListener('mouseleave', function () {
    setDropdown(item, false);
  });
});

document.addEventListener('click', function (event) {
  navItems.forEach(function (item) {
    if (!item.contains(event.target)) setDropdown(item, false);
  });
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape') return;
  navItems.forEach(function (item) {
    if (item.classList.contains('is-open')) {
      setDropdown(item, false);
      item.querySelector('.nav-trigger').focus();
    }
  });
});

// Mobile menu: full-screen overlay.
var menuToggle = document.querySelector('.masthead__toggle');
var mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  var menuClose = mobileMenu.querySelector('.mobile-menu__close');

  var openMenu = function () {
    mobileMenu.hidden = false;
    // Next frame so the opacity transition runs.
    window.requestAnimationFrame(function () { mobileMenu.classList.add('is-open'); });
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    menuClose.focus();
  };

  var closeMenu = function (restoreFocus) {
    if (mobileMenu.hidden) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', function () { closeMenu(true); });

  // Capture phase so the menu closes before in-page links start scrolling.
  mobileMenu.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu(false);
  }, true);

  mobileMenu.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu(true);
      return;
    }
    if (event.key !== 'Tab') return;

    // Keep keyboard focus inside the overlay while it is open.
    var focusable = Array.from(mobileMenu.querySelectorAll('a, button, summary')).filter(function (el) {
      return el.offsetParent !== null;
    });
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.matchMedia('(min-width: 961px)').addEventListener('change', function (event) {
    if (event.matches) closeMenu(false);
  });
}

// Scroll reveal: fade and slide sections up as they enter the viewport.
var revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !prefersReducedMotionQuery.matches) {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealItems.forEach(function (item) { revealObserver.observe(item); });
} else {
  revealItems.forEach(function (item) { item.classList.add('is-visible'); });
}

// Project carousel: arrow buttons, mouse drag, and a scroll progress line.
// Touch swipe and keyboard arrows come from native horizontal scrolling.
document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
  var track = carousel.querySelector('.work-track');
  var prev = carousel.querySelector('.carousel-btn--prev');
  var next = carousel.querySelector('.carousel-btn--next');
  var progress = carousel.querySelector('.carousel-progress');

  function slideStep() {
    var slide = track.querySelector('.work-slide');
    return slide ? slide.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth;
  }

  function updateCarousel() {
    var max = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
    if (progress) {
      var visible = max > 0 ? track.clientWidth / track.scrollWidth : 1;
      var ratio = max > 0 ? track.scrollLeft / max : 1;
      progress.style.setProperty('--progress', (visible + (1 - visible) * ratio).toFixed(3));
    }
  }

  // Remember where a button click is heading so quick repeated clicks
  // each advance one card instead of interrupting the previous scroll.
  var targetIndex = null;
  var scrollIdleTimer;

  function scrollByStep(direction) {
    var step = slideStep();
    var max = track.scrollWidth - track.clientWidth;
    var lastIndex = Math.ceil(max / step - 0.01);
    var base = targetIndex === null ? Math.round(track.scrollLeft / step) : targetIndex;
    targetIndex = Math.min(lastIndex, Math.max(0, base + direction));
    track.scrollTo({
      left: Math.min(targetIndex * step, max),
      behavior: prefersReducedMotionQuery.matches ? 'auto' : 'smooth'
    });
    // Forget the target if no scrolling follows (e.g. already at the end).
    clearTimeout(scrollIdleTimer);
    scrollIdleTimer = setTimeout(function () { targetIndex = null; }, 700);
  }

  prev.addEventListener('click', function () { scrollByStep(-1); });
  next.addEventListener('click', function () { scrollByStep(1); });
  track.addEventListener('scroll', function () {
    updateCarousel();
    clearTimeout(scrollIdleTimer);
    scrollIdleTimer = setTimeout(function () { targetIndex = null; }, 150);
  }, { passive: true });
  window.addEventListener('resize', updateCarousel);

  // Click-and-drag for mouse users.
  var dragStartX = 0;
  var dragStartScroll = 0;
  var dragMoved = false;
  var pointerDown = false;

  track.addEventListener('pointerdown', function (event) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    pointerDown = true;
    dragMoved = false;
    dragStartX = event.clientX;
    dragStartScroll = track.scrollLeft;
  });

  track.addEventListener('pointermove', function (event) {
    if (!pointerDown) return;
    var dx = event.clientX - dragStartX;
    if (!dragMoved && Math.abs(dx) > 6) {
      dragMoved = true;
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    }
    if (dragMoved) track.scrollLeft = dragStartScroll - dx;
  });

  function endDrag(event) {
    if (!pointerDown) return;
    pointerDown = false;
    if (!dragMoved) return;
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    // Snap to the nearest card after letting go.
    var step = slideStep();
    track.scrollTo({
      left: Math.round(track.scrollLeft / step) * step,
      behavior: prefersReducedMotionQuery.matches ? 'auto' : 'smooth'
    });
  }

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  // Swallow the click that ends a drag so it doesn't open a project.
  track.addEventListener('click', function (event) {
    if (dragMoved) {
      event.preventDefault();
      event.stopPropagation();
      dragMoved = false;
    }
  }, true);

  updateCarousel();
});

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

document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
  link.addEventListener('click', function (event) {
    var mailtoLink = link.getAttribute('href');

    if (!mailtoLink) {
      return;
    }

    event.preventDefault();

    try {
      var tempLink = document.createElement('a');
      tempLink.href = mailtoLink;
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    } catch (error) {
      // no-op; browser may block external protocol handlers on local files
    }

    setTimeout(function () {
      var emailAddress = mailtoLink.replace(/^mailto:/i, '').split('?')[0];
      var copyMessage = 'No email app was detected. Copy this address manually:\n\n' + emailAddress;

      if (window.prompt) {
        window.prompt(copyMessage, emailAddress);
      }
    }, 200);
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
