const projects = document.querySelector('#projects');
projects.querySelector('.section-label').textContent = 'Operations';
projects.querySelector('.section-head h2').textContent = 'Active and archived work, in order.';

const projectGrid = projects.querySelector('.project-grid');
const operationStatuses = ['ACTIVE', 'ACTIVE'];
const projectTitles = ['SentinelShield', 'Secure File Transfer Monitor'];
projectGrid.querySelectorAll('.project').forEach(project => {
  const title = project.querySelector('h3').textContent.trim();
  if (title === 'E-Commerce Web Application') {
    project.remove();
    return;
  }
  if (title === 'Responsible Vulnerability Disclosure') {
    project.classList.add('case-study');
    return;
  }
  const operationIndex = projectTitles.indexOf(title);
  if (operationIndex !== -1) {
    const row = document.createElement('div');
    row.className = 'operation-row';
    row.innerHTML = `<span class="operation-number">${String(operationIndex + 1).padStart(2, '0')}</span><span class="tag">${operationStatuses[operationIndex]}</span>`;
    project.querySelector('h3').before(row);
  }
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
reveals.forEach(element => observer.observe(element));

const sections = document.querySelectorAll('main > header[id], main > section[id]');
const sectionLinks = new Map([...document.querySelectorAll('.nav-links a')].map(link => [link.hash, link]));
const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    sectionLinks.forEach(link => link.classList.remove('active'));
    sectionLinks.get(`#${entry.target.id}`)?.classList.add('active');
  }
}), { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach(section => activeObserver.observe(section));

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('is-open', !isOpen);
});
navLinks.addEventListener('click', event => {
  if (event.target.matches('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('nav') && menuToggle.getAttribute('aria-expanded') === 'true') {
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
  }
});