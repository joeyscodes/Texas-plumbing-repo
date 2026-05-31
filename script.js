/* =========================================
   VIJO FITNESS GYM – JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- LOADER (ONLY ON HOMEPAGE) ----------
  const loader = document.getElementById('loader');
  if (loader) {
    // Show loader initially (CSS already shows it)
    window.addEventListener('load', function () {
      // Small delay so the user sees the spinner briefly
      setTimeout(() => {
        loader.classList.add('hide');
        // Remove loader from DOM after fade-out transition
        setTimeout(() => {
          if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, 500);
      }, 600);
    });
  }

  // ---------- NAVBAR SCROLL EFFECT (via IntersectionObserver) ----------
  const navbar = document.querySelector('.navbar');
  const sentinel = document.getElementById('scroll-sentinel');

  if (navbar && sentinel) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Sentinel is visible → we are at the very top
          navbar.classList.remove('scrolled');
        } else {
          // Sentinel is out of view → add scrolled style
          navbar.classList.add('scrolled');
        }
      });
    }, { threshold: 0 });

    observer.observe(sentinel);
  }

  // ---------- MOBILE HAMBURGER MENU ----------
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ---------- SMOOTH REVEAL ANIMATIONS ON SCROLL (IntersectionObserver) ----------
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: stop observing once revealed
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      // rootMargin: '0px 0px -50px 0px'   // trigger a bit earlier if needed
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ---------- FORM HANDLING (ALL FORMS) ----------
  // This works for any form with class "ajax-form" and a sibling confirmation div
  const forms = document.querySelectorAll('.ajax-form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simulate form submission (Formspree will handle it in production)
      // For demo, we simply hide the form and show the confirmation message
      const confirmation = form.nextElementSibling;
      if (confirmation && confirmation.classList.contains('confirmation')) {
        form.style.display = 'none';
        confirmation.classList.add('show');
      } else {
        // Fallback: look for confirmation with specific ID
        const confirmDiv = document.getElementById('confirmation-message');
        if (confirmDiv) {
          form.style.display = 'none';
          confirmDiv.classList.add('show');
        }
      }

      // If you later replace FORM_ID with real Formspree endpoint,
      // the form will still submit to Formspree and the above code
      // will show the confirmation before reload. To avoid double submission,
      // you can comment out the above and uncomment below for live:
      /*
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.style.display = 'none';
          document.getElementById('confirmation-message').classList.add('show');
        }
      }).catch(error => {
        alert('There was a problem. Please try again.');
      });
      */
    });
  });

});
