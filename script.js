/* ================================================
   MONSOON – PREMIUM ASIAN RESTAURANT WEBSITE
   SCRIPT.JS – IntersectionObserver, No Scroll Listeners
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Loader (only on index.html)
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 600);
    });
    document.body.style.overflow = 'hidden';
  }

  // Navbar scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const hero = document.querySelector('.hero');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) navbar.classList.remove('scrolled');
        else navbar.classList.add('scrolled');
      });
    }, { threshold: 0 });
    if (hero) observer.observe(hero);
    else navbar.classList.add('scrolled');
  }

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  // Reservation form with confirmation
  const form = document.getElementById('reservationForm');
  const confirmMsg = document.getElementById('confirmationMsg');
  if (form && confirmMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      confirmMsg.style.display = 'block';
      confirmMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Uncomment next line for production Formspree:
      // form.submit();
    });
  }

});
