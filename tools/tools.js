const searchInput = document.getElementById('tool-search');
const searchClear = document.getElementById('search-clear');
const filterBtns  = document.querySelectorAll('.filter-btn');
const toolCards   = document.querySelectorAll('.tool-card');
const sectionLabels = document.querySelectorAll('.tool-section-label');
const noResults   = document.getElementById('no-results');
const searchTerm  = document.getElementById('search-term');

let currentCat = 'all';
let currentQuery = '';

function filterTools() {
  let visibleCount = 0;

  toolCards.forEach(card => {
    const cat  = card.dataset.cat;
    const name = card.dataset.name.toLowerCase();
    const catMatch   = currentCat === 'all' || cat === currentCat;
    const queryMatch = currentQuery === '' || name.includes(currentQuery);

    if (catMatch && queryMatch) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  // Show/hide section labels
  sectionLabels.forEach(label => {
    const cat = label.dataset.cat;
    if (currentCat !== 'all' && cat !== currentCat) {
      label.classList.add('hidden');
      return;
    }
    // Check if any card in this section is visible
    let next = label.nextElementSibling;
    let hasVisible = false;
    while (next && !next.classList.contains('tool-section-label')) {
      if (!next.classList.contains('hidden')) hasVisible = true;
      next = next.nextElementSibling;
    }
    label.classList.toggle('hidden', !hasVisible);
  });

  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  if (visibleCount === 0) searchTerm.textContent = currentQuery;
}

// Search
searchInput.addEventListener('input', e => {
  currentQuery = e.target.value.toLowerCase().trim();
  searchClear.style.display = currentQuery ? 'inline' : 'none';
  filterTools();
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  currentQuery = '';
  searchClear.style.display = 'none';
  filterTools();
});

// Category filter
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    filterTools();
  });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

toolCards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(16px)';
  card.style.transition = `opacity 0.4s ease ${i * 0.03}s, transform 0.4s ease ${i * 0.03}s, border-color 0.3s, background 0.3s`;
  observer.observe(card);
});

// Handle #popular anchor
if (window.location.hash === '#popular') {
  document.querySelector('[data-cat="utility"]')?.click();
}
