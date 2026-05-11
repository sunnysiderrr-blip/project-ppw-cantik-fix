// Script sederhana untuk animasi scroll dan interaksi menu

const animatedElements = document.querySelectorAll('.animate-up');

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;

  animatedElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    if (top < trigger) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Ketika menu mobile dibuka, tampilkan/tutup menu.
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.main-nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}
