/* ==========================================================================
   Khushali N. Hadvani - Portfolio Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSkillsFilter();
  initProjectsFilter();
  initProjectModals();
  initDemoTabs();
  generatePassword(); // Initial password load
});

/* --------------------------------------------------------------------------
   1. Navbar & Mobile Menu Logic
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy active link indicator
    let currentSection = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        currentSection = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });
}

/* --------------------------------------------------------------------------
   2. Skills Filter Tabs
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-tab');
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (target === 'all' || category === target) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. Projects Category Filter
   -------------------------------------------------------------------------- */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Project Details Modal Content & Triggering
   -------------------------------------------------------------------------- */
const projectData = {
  cocofiber: {
    title: "CocoFiber Connect (Final Year Project)",
    category: "Full Stack B2B & B2C Marketplace Platform",
    desc: "A web-based marketplace platform that connects coconut fiber (coir) suppliers with buyers, supporting B2B and B2C trade through product listing, inquiries, secure user management, order tracking, and admin control.",
    features: [
      "User authentication and profile management for buyers and sellers",
      "Product cataloging with detailed specs, pricing, and category filters",
      "Seller dashboard for managing inventory and incoming buyer inquiries",
      "Buyer tools including order placement and inquiry messaging",
      "Comprehensive Admin Panel for monitoring users, transactions, and site content",
      "Database integration via phpMyAdmin / MySQL with foreign key relationships",
      "Fully responsive design for mobile, tablet, and desktop browsing"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "XAMPP", "phpMyAdmin"]
  },
  saforix: {
    title: "Saforix - Security (Internship Project)",
    category: "Security Monitoring & Threat Analysis System",
    desc: "A web-based security monitoring system that performs URL scanning, device scanning, and behavior analysis to detect potential threats and ensure safe digital activity.",
    features: [
      "Automated URL Scanning to check malicious domains and phishing links",
      "Device Scanning to inspect client hardware and browser security postures",
      "Behavior Analysis algorithms to flag irregular digital traffic and unauthorized actions",
      "Admin Control Panel for security logs, active scans, and user threat reporting",
      "Backend database powered by Microsoft SQL Server (SSMS) with C# ASP.NET MVC",
      "Clean UI for security metrics visualization and immediate threat alerts"
    ],
    tech: ["ASP.NET MVC", "C#", "Microsoft SQL Server (SSMS)", "Visual Studio", "HTML", "CSS", "JavaScript"]
  },
  kidzy: {
    title: "Kidzy Educational Website (Final Year Project)",
    category: "Child-Friendly EdTech Portal",
    desc: "A child-friendly educational website designed for nursery, LKG, and HKG students, where kids can learn through games, activities, and interactive content.",
    features: [
      "Vibrant, colorful, and engaging user interface suited for early learners",
      "Interactive activity section featuring alphabet games, number counting, and shape puzzles",
      "Custom learning modules tailored for Nursery, LKG, and HKG curriculum",
      "Admin management panel to update learning content, games, and user progress",
      "Database integration to store user scores and activity completions"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Interactive Games Logic"]
  },
  movie: {
    title: "Online Movie Booking System",
    category: "Full Stack E-Commerce & Ticketing",
    desc: "A web-based movie booking system that allows users to browse movies, view showtimes, select seats, and book movie tickets online with a simple and convenient booking experience.",
    features: [
      "Movie catalog with filtering, trailer descriptions, genre, and showtimes",
      "Interactive visual seat selection grid (Standard, VIP, Executive)",
      "Online ticket booking workflow with payment simulation and booking confirmation",
      "User registration, login, and profile booking history tracking",
      "Admin panel for managing movies, showtimes, theater seating, payments, and users",
      "Relational MySQL database schema supporting concurrent booking reservations"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"]
  },
  calc: {
    title: "Web Calculator Application",
    category: "Frontend Internship Project (CodeAlpha)",
    desc: "Developed during CodeAlpha Frontend Developer Internship, featuring a responsive user-friendly calculator interface executing JavaScript arithmetic logic.",
    features: [
      "Basic arithmetic operations (+, -, *, /)",
      "Decimal point precision handling",
      "Instant display updates and clear key functionality",
      "Modern dark theme glassmorphism aesthetic"
    ],
    tech: ["HTML5", "CSS3", "JavaScript"]
  },
  gallery: {
    title: "Interactive Image Gallery",
    category: "Frontend Internship Project (CodeAlpha)",
    desc: "Developed during CodeAlpha Frontend Developer Internship, featuring a responsive image gallery with interactive image viewing and attractive layout.",
    features: [
      "Grid layout adapting seamlessly to screen size",
      "Hover animations and smooth zoom effects",
      "Light-box style image popups for high resolution viewing"
    ],
    tech: ["HTML5", "CSS3", "JavaScript"]
  },
  bmi: {
    title: "BMI Health Calculator (Python)",
    category: "AI Internship Project (Codec Technologies India)",
    desc: "Developed during AI Internship at Codec Technologies India, calculating Body Mass Index (BMI) based on user height and weight.",
    features: [
      "Accurate height (cm/m) and weight (kg) formula computation",
      "Classification into Underweight, Normal, Overweight, and Obese categories",
      "Clean console and GUI output formatting"
    ],
    tech: ["Python", "Algorithm Development", "Health Metrics Logic"]
  },
  password: {
    title: "Random Password Generator (Python)",
    category: "AI Internship Project (Codec Technologies India)",
    desc: "Developed during AI Internship at Codec Technologies India, generating secure random passwords to enhance digital security.",
    features: [
      "Customizable password length selection",
      "Inclusion options for uppercase, lowercase, numbers, and special symbols",
      "Cryptographically strong random character shuffling"
    ],
    tech: ["Python", "Randomization Cryptography", "Security"]
  },
  weather: {
    title: "Basic Weather Application (Python)",
    category: "AI Internship Project (Codec Technologies India)",
    desc: "Developed during AI Internship at Codec Technologies India, retrieving and displaying real-time weather information.",
    features: [
      "Weather data retrieval by location/city name",
      "Temperature, humidity, and condition parsing",
      "Error handling for invalid location queries"
    ],
    tech: ["Python", "HTTP API Requests", "JSON Parsing"]
  }
};

function initProjectModals() {
  const triggers = document.querySelectorAll('.modal-trigger');
  triggers.forEach(trig => {
    trig.addEventListener('click', () => {
      const key = trig.getAttribute('data-modal');
      const data = projectData[key];
      if (data) {
        openModal(data);
      }
    });
  });
}

function openModal(data) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');

  const techMarkup = data.tech.map(t => `<span class="tech-chip">${t}</span>`).join(' ');
  const featuresMarkup = data.features.map(f => `<li style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check" style="color: var(--primary); margin-right: 0.5rem;"></i>${f}</li>`).join('');

  modalBody.innerHTML = `
    <span class="project-category-badge" style="margin-bottom: 0.8rem;">${data.category}</span>
    <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: #ffffff;">${data.title}</h2>
    <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 1.5rem;">${data.desc}</p>
    
    <h4 style="font-size: 1.1rem; color: #ffffff; margin-bottom: 0.75rem;">Key Features &amp; Technical Capabilities:</h4>
    <ul style="list-style: none; padding-left: 0; color: var(--text-main); font-size: 0.95rem; margin-bottom: 1.5rem;">
      ${featuresMarkup}
    </ul>

    <h4 style="font-size: 1.1rem; color: #ffffff; margin-bottom: 0.75rem;">Technologies Used:</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
      ${techMarkup}
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <a href="#contact" onclick="closeModal()" class="btn btn-primary btn-sm"><i class="fa-solid fa-envelope"></i> Contact Regarding Project</a>
      <button onclick="closeModal()" class="btn btn-secondary btn-sm">Close</button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

/* --------------------------------------------------------------------------
   5. Interactive Live Demos Logic
   -------------------------------------------------------------------------- */
function initDemoTabs() {
  const demoBtns = document.querySelectorAll('.demo-tab-btn');
  const demoPanels = document.querySelectorAll('.demo-panel');

  demoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      demoBtns.forEach(b => b.classList.remove('active'));
      demoPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = `demo-${btn.getAttribute('data-demo')}`;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* 5A. Web Calculator Logic */
let calcExpression = '';

function calcNum(val) {
  const display = document.getElementById('calcDisplay');
  if (display.innerText === '0' || display.innerText === 'Error') {
    calcExpression = val;
  } else {
    calcExpression += val;
  }
  display.innerText = calcExpression;
}

function calcOp(op) {
  const display = document.getElementById('calcDisplay');
  if (calcExpression === '' && op !== '-') return;
  calcExpression += op;
  display.innerText = calcExpression;
}

function calcClear() {
  calcExpression = '';
  document.getElementById('calcDisplay').innerText = '0';
}

function calcEqual() {
  const display = document.getElementById('calcDisplay');
  try {
    const result = eval(calcExpression);
    display.innerText = Number.isInteger(result) ? result : result.toFixed(4);
    calcExpression = display.innerText;
  } catch (e) {
    display.innerText = 'Error';
    calcExpression = '';
  }
}

/* 5B. Password Generator Logic */
function generatePassword() {
  const length = parseInt(document.getElementById('pwLength').value) || 14;
  const includeSymbols = document.getElementById('pwSymbols').checked;
  const includeNumbers = document.getElementById('pwNumbers').checked;

  const charsLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsNumbers = "0123456789";
  const charsSymbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let available = charsLetters;
  if (includeNumbers) available += charsNumbers;
  if (includeSymbols) available += charsSymbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    password += available[randomIndex];
  }

  document.getElementById('pwOutput').value = password;
}

function copyPassword() {
  const pwInput = document.getElementById('pwOutput');
  pwInput.select();
  navigator.clipboard.writeText(pwInput.value);
  showToast("Password copied to clipboard!");
}

/* 5C. BMI Calculator Logic */
function calculateBMI() {
  const hCm = parseFloat(document.getElementById('bmiHeight').value);
  const wKg = parseFloat(document.getElementById('bmiWeight').value);

  if (!hCm || !wKg || hCm <= 0 || wKg <= 0) {
    showToast("Please enter valid positive numbers for height and weight.");
    return;
  }

  const hM = hCm / 100;
  const bmi = (wKg / (hM * hM)).toFixed(1);

  let status = "";
  let color = "#10b981";

  if (bmi < 18.5) {
    status = "Underweight";
    color = "#38bdf8";
  } else if (bmi < 24.9) {
    status = "Normal Weight";
    color = "#10b981";
  } else if (bmi < 29.9) {
    status = "Overweight";
    color = "#f59e0b";
  } else {
    status = "Obese";
    color = "#ef4444";
  }

  const resultBox = document.getElementById('bmiResult');
  const scoreElem = document.getElementById('bmiScore');
  const statusElem = document.getElementById('bmiStatus');

  scoreElem.innerText = bmi;
  statusElem.innerText = status;
  statusElem.style.color = color;
  resultBox.style.display = 'block';
}

/* 5D. Kidzy Mini Quiz Logic */
function checkQuiz(btn, isCorrect) {
  const feedback = document.getElementById('quizFeedback');
  if (isCorrect) {
    feedback.innerHTML = `<span style="color: var(--accent-emerald)"><i class="fa-solid fa-face-smile"></i> Correct! 'B' comes after 'A'! Great job!</span>`;
    btn.style.borderColor = 'var(--accent-emerald)';
    btn.style.background = 'rgba(16, 185, 129, 0.2)';
  } else {
    feedback.innerHTML = `<span style="color: #ef4444"><i class="fa-solid fa-face-frown"></i> Oops, try again!</span>`;
    btn.style.borderColor = '#ef4444';
  }
}

/* --------------------------------------------------------------------------
   6. Contact Form & Toast Notifications
   -------------------------------------------------------------------------- */
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;
  const subject = document.getElementById('senderSubject').value;
  const message = document.getElementById('senderMessage').value;

  showToast(`Thank you, ${name}! Opening mail client to send your message.`);

  // Create mailto link as fallback
  const mailtoUrl = `mailto:khushalihadvani43@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
  
  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 1000);

  document.getElementById('contactForm').reset();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  toastMessage.innerText = msg;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
}
