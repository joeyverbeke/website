// Create cursor follower
const cursor = document.getElementById('cursor');
const textContainer = document.getElementById('text-container');

// Detect OS
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const shortcutText = isMac ? '⌘+A' : 'CTRL+A';

// Follow cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Create random text elements
function createRandomText() {
    const text = document.createElement('div');
    text.className = 'text';
    text.textContent = shortcutText;
    
    // Random position
    text.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    text.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    
    textContainer.appendChild(text);
}

// Create multiple text elements
for (let i = 0; i < 20; i++) {
    createRandomText();
}

// Add keyboard event listener for Ctrl+A or Cmd+A
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault(); // Prevent default select-all behavior
        const allText = document.querySelectorAll('.text');
        allText.forEach(text => {
            text.classList.add('highlighted');
            // Change text to art piece names when highlighted
            text.textContent = getRandomArtName();
        });
    }
});

// Remove highlight when clicking anywhere
document.addEventListener('click', () => {
    const allText = document.querySelectorAll('.text');
    allText.forEach(text => {
        // Store the current text before removing highlight
        const currentText = text.textContent;
        text.classList.remove('highlighted');
        
        // Wait for transition to complete before changing text
        text.addEventListener('transitionend', function handler() {
            // Only change text if it's still showing the art name
            if (text.textContent === currentText) {
                text.textContent = shortcutText;
            }
            text.removeEventListener('transitionend', handler);
        });
    });
});

// Array of art piece names
const artNames = [
    "Gradi Vox",
    "Porous",
    "T.A.E.L.",
    "In Vivo / In Vitro - Trial 1.4"
];

function getRandomArtName() {
    return artNames[Math.floor(Math.random() * artNames.length)];
} 