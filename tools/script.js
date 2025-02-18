// Dark Mode Toggle
const darkModeSwitch = document.getElementById('darkModeSwitch');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
darkModeSwitch.checked = savedTheme === 'dark';

// Toggle theme
darkModeSwitch.addEventListener('change', function() {
    const theme = this.checked ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Universal Dark Mode Handler
function initializeDarkMode() {
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    darkModeSwitch.checked = savedTheme === 'dark';

    // Toggle theme
    darkModeSwitch.addEventListener('change', function() {
        const theme = this.checked ? 'dark' : 'light';
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeDarkMode);

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.querySelector('body');
  const checkbox = document.getElementById('darkModeSwitch');
  body.classList.toggle('dark-mode', checkbox.checked);

  // Save mode preference to local storage
  localStorage.setItem('darkMode', checkbox.checked);
}

// On page load
document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('darkModeSwitch');
  checkbox.checked = false; // Ensure checkbox is unchecked

  // Check if dark mode preference is saved in local storage
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    checkbox.checked = true; // Set checkbox to checked
    document.querySelector('body').classList.add('dark-mode'); // Add dark mode class
  }
});

if (document.getElementById('darkModeSwitch')) {
  document.getElementById('darkModeSwitch').addEventListener('change', toggleDarkMode);
}