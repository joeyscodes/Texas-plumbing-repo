/* =============================================
   MEI LING – IMMERSIVE 3D LANTERN & SCROLL
   SCRIPT.JS
============================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Loader
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

  // Navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const hero = document.querySelector('.hero');
    const obs = new IntersectionObserver(([e]) => {
      navbar.classList.toggle('scrolled', !e.isIntersecting);
    }, { threshold: 0 });
    if (hero) obs.observe(hero);
    else navbar.classList.add('scrolled');
  }

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));
  }

  // Reveal sections
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => revealObserver.observe(el));
  }

  // Reservation form
  const form = document.getElementById('reservationForm');
  const confirmation = document.getElementById('confirmationMsg');
  if (form && confirmation) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.style.display = 'none';
      confirmation.style.display = 'block';
      confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Three.js Lantern Hero
  const canvas = document.getElementById('hero-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    initLanternHero(canvas);
  }
});

function initLanternHero(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.5, 7);

  // Lighting
  scene.add(new THREE.AmbientLight(0x442222, 1.0));
  const pointLight = new THREE.PointLight(0xffaa33, 1.5, 12);
  pointLight.position.set(0, 1.5, 2);
  scene.add(pointLight);

  const lanternGroup = new THREE.Group();

  // Lantern body (cylinder)
  const bodyGeo = new THREE.CylinderGeometry(1.3, 1.1, 2.4, 32);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.4, metalness: 0.3 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  lanternGroup.add(body);

  // Top ring
  const topRingGeo = new THREE.TorusGeometry(1.1, 0.1, 16, 32);
  const topRingMat = new THREE.MeshStandardMaterial({ color: 0xc8a44a, roughness: 0.5, metalness: 0.7 });
  const topRing = new THREE.Mesh(topRingGeo, topRingMat);
  topRing.position.y = 1.3;
  lanternGroup.add(topRing);

  // Bottom ring
  const bottomRing = new THREE.Mesh(topRingGeo, topRingMat);
  bottomRing.position.y = -1.3;
  lanternGroup.add(bottomRing);

  // Tassel (small cylinder + spheres)
  const tasselRodGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
  const tasselRodMat = new THREE.MeshStandardMaterial({ color: 0xc8a44a, roughness: 0.3, metalness: 0.8 });
  const tasselRod = new THREE.Mesh(tasselRodGeo, tasselRodMat);
  tasselRod.position.y = -1.7;
  lanternGroup.add(tasselRod);

  const tasselEndGeo = new THREE.SphereGeometry(0.15, 16, 16);
  const tasselEnd = new THREE.Mesh(tasselEndGeo, tasselRodMat);
  tasselEnd.position.y = -2.15;
  lanternGroup.add(tasselEnd);

  // Glowing particles (fireflies)
  const particlesGeo = new THREE.BufferGeometry();
  const particleCount = 200;
  const posArray = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 5;
    posArray[i+1] = (Math.random() - 0.5) * 6;
    posArray[i+2] = (Math.random() - 0.5) * 4;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMat = new THREE.PointsMaterial({ size: 0.06, color: 0xffaa33, blending: THREE.AdditiveBlending, depthWrite: false });
  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);

  scene.add(lanternGroup);

  // Scroll-driven rotation
  let targetRotY = 0;
  window.addEventListener('scroll', () => {
    targetRotY = window.scrollY * 0.002;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    lanternGroup.rotation.y += (targetRotY - lanternGroup.rotation.y) * 0.05;
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0002;
    renderer.render(scene, camera);
  }
  animate();
}
