/*=============================================
   TEXAS QUALITY PLUMBING – SCRIPT.JS
===============================================*/
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const hero = document.querySelector('.hero');
    const observer = new IntersectionObserver(([entry]) => {
      navbar.classList.toggle('scrolled', !entry.isIntersecting);
    }, { threshold: 0 });
    if (hero) observer.observe(hero);
    else navbar.classList.add('scrolled');
  }

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));
  }

  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  const fileInput = document.getElementById('jobPhoto');
  const fileLabel = document.querySelector('.file-label');
  if (fileInput && fileLabel) {
    fileInput.addEventListener('change', () => {
      fileLabel.textContent = fileInput.files.length ? `📎 ${fileInput.files[0].name}` : '📷 Upload a photo (optional)';
    });
  }
});
