// ===== Login/Register/Reservation Logic =====
let isLoggedIn = false;
let currentUser = null;

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');
const reservationForm = document.getElementById('reservationForm');
const reservationPrompt = document.getElementById('reservationPrompt');
const userGreeting = document.getElementById('userGreeting');

// Show login modal
loginBtn.onclick = () => {
  loginModal.style.display = 'block';
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
  formTitle.textContent = 'Login';
};

// Switch to register
showRegister.onclick = (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  formTitle.textContent = 'Register';
};

// Switch to login
showLogin.onclick = (e) => {
  e.preventDefault();
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
  formTitle.textContent = 'Login';
};

// Close modal
closeModal.onclick = () => loginModal.style.display = 'none';
window.onclick = (event) => {
  if (event.target == loginModal) loginModal.style.display = 'none';
};

// Fake register
registerForm.onsubmit = function(e) {
  e.preventDefault();
  isLoggedIn = true;
  currentUser = {
    name: document.getElementById('registerName').value,
    email: document.getElementById('registerEmail').value
  };
  updateUIAfterLogin();
  loginModal.style.display = 'none';
};

// Fake login
loginForm.onsubmit = function(e) {
  e.preventDefault();
  isLoggedIn = true;
  currentUser = {
    name: "Guest",
    email: document.getElementById('loginEmail').value
  };
  updateUIAfterLogin();
  loginModal.style.display = 'none';
};

// Logout
logoutBtn.onclick = function(e) {
  e.preventDefault();
  isLoggedIn = false;
  currentUser = null;
  updateUIAfterLogout();
};

// Reservation form submit
reservationForm.onsubmit = function(e) {
  if (!isLoggedIn) {
    e.preventDefault();
    reservationPrompt.style.display = 'block';
    loginModal.style.display = 'block';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    formTitle.textContent = 'Login';
  } else {
    alert('Reservation successful!');
  }
};

// Update UI after login
function updateUIAfterLogin() {
  loginBtn.style.display = 'none';
  logoutBtn.style.display = 'inline';
  userGreeting.style.display = 'inline';
  userGreeting.textContent = `Welcome, ${currentUser.name || 'User'}!`;
  reservationPrompt.style.display = 'none';
  document.getElementById('resName').value = currentUser.name || '';
  document.getElementById('resEmail').value = currentUser.email || '';
}

// Update UI after logout
function updateUIAfterLogout() {
  loginBtn.style.display = 'inline';
  logoutBtn.style.display = 'none';
  userGreeting.style.display = 'none';
  document.getElementById('resName').value = '';
  document.getElementById('resEmail').value = '';
}

// ===== Reviews Logic =====

// Review Modal Logic
const openReviewModal = document.getElementById('openReviewModal');
const reviewModal = document.getElementById('reviewModal');
const closeReviewModal = document.getElementById('closeReviewModal');
const addReviewForm = document.getElementById('addReviewForm');
const reviewerStarsInput = document.getElementById('reviewerStars');
const stars = document.querySelectorAll('.star-rating-input .star');
const reviewList = document.getElementById('reviewList');
const avgRating = document.getElementById('avgRating');
const avgStars = document.getElementById('avgStars');
const reviewCount = document.getElementById('reviewCount');

// Initial reviews data
let reviews = [
  { name: "Priya Sharma", stars: 5, text: "Absolutely divine! The ambience, the food, the hospitality-perfect." },
  { name: "Aman Verma", stars: 4, text: "The thali felt like a festival on a plate. Will visit again!" },
  { name: "Sneha Gupta", stars: 5, text: "Best gulab jamun in town! Loved the service and decor." }
];

function renderReviews() {
  reviewList.innerHTML = '';
  reviews.forEach(r => {
    reviewList.innerHTML += `
      <div class="review">
        <div class="review-header">
          <span class="review-user">${r.name}</span>
          <span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
        </div>
        <p class="review-text">${r.text}</p>
      </div>
    `;
  });
  updateSummary();
}

function updateSummary() {
  const total = reviews.length;
  const avg = (reviews.reduce((s, r) => s + r.stars, 0) / total).toFixed(1);
  avgRating.textContent = avg;
  avgStars.textContent = '★★★★★'.slice(0, Math.round(avg)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(avg));
  reviewCount.textContent = `(${total} review${total > 1 ? 's' : ''})`;
}

openReviewModal.onclick = () => {
  reviewModal.style.display = 'block';
};
closeReviewModal.onclick = () => {
  reviewModal.style.display = 'none';
};
window.addEventListener('click', function(event) {
  if (event.target == reviewModal) reviewModal.style.display = 'none';
});

// Star rating input logic
stars.forEach(star => {
  star.onclick = function() {
    const val = +this.getAttribute('data-value');
    reviewerStarsInput.value = val;
    stars.forEach((s, i) => {
      s.style.color = i < val ? '#ffd700' : '#ccc';
    });
  };
});

// Set default selected stars
stars.forEach((s, i) => s.style.color = i < 5 ? '#ffd700' : '#ccc');

addReviewForm.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('reviewerName').value.trim() || "Anonymous";
  const starsVal = +reviewerStarsInput.value;
  const text = document.getElementById('reviewerText').value.trim();
  if (text && starsVal) {
    reviews.unshift({ name, stars: starsVal, text });
    renderReviews();
    reviewModal.style.display = 'none';
    addReviewForm.reset();
    // Reset stars to 5
    reviewerStarsInput.value = 5;
    stars.forEach((s, i) => s.style.color = i < 5 ? '#ffd700' : '#ccc');
  }
};

// Initial render
renderReviews();
// Dark mode toggle
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.onclick = function() {
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')) {
    darkToggle.textContent = "☀️";
    localStorage.setItem('darkMode', 'on');
  } else {
    darkToggle.textContent = "🌙";
    localStorage.setItem('darkMode', 'off');
  }
};
if(localStorage.getItem('darkMode') === 'on') {
  document.body.classList.add('dark-mode');
  darkToggle.textContent = "☀️";
}
