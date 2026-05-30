document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Particle.js Background
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#4fc3dc" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#4fc3dc", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }

    // 2. Counter Animation Logic for Impact Dashboard
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const count = parseFloat(counter.innerText);
                const isDecimal = counter.getAttribute('data-decimal') === 'true';

                const speed = 200; // Speed of animation
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = isDecimal ? (count + inc).toFixed(2) : Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + (isDecimal ? "" : "+");
                }
            };
            updateCount();
        });
    };

    // Trigger counter animation only when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true;
        }
    }, { threshold: 0.5 });

    if (document.querySelector('.impact-section')) {
        observer.observe(document.querySelector('.impact-section'));
    }
});

// 3. GitHub API Integration Foundation (Called on Projects Page)
async function fetchGitHubStats(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        if (document.getElementById('gh-repos')) {
            document.getElementById('gh-repos').innerText = data.public_repos;
            document.getElementById('gh-followers').innerText = data.followers;
        }
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
    }
}


// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            links.classList.toggle('active');
            // Switch icon between bars and X
            const icon = menuToggle.querySelector('i');
            if (links.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});

// --- 1. Custom Cyber Cursor Logic ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Only run cursor logic if the elements exist (desktop)
if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with a slight delay using animate (smoother than CSS transition for position)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect to clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, .menu-toggle');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
        });
    });
}

// --- 2. Initialize Vanilla Tilt for 3D effect ---
// Apply to all achievement cards, project cards, and the hero image
document.addEventListener('DOMContentLoaded', () => {
    VanillaTilt.init(document.querySelectorAll(".achievement-card, .project-card, .hero-image"), {
        max: 10,           // Maximum tilt rotation
        speed: 400,        // Speed of the enter/exit transition
        glare: true,       // Add a reflection effect
        "max-glare": 0.1   // Opacity of the reflection
    });
});

// --- 3. Gemini AI Chatbot UI Logic ---
const chatToggle = document.getElementById('chatToggle');
const chatClose = document.getElementById('chatClose');
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatBody = document.getElementById('chatBody');

if (chatToggle && chatWindow) {
    // Open/Close toggle
    const toggleChat = () => chatWindow.classList.toggle('active');
    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);

    // Handle sending messages
    const handleSend = async () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Add User Message to UI
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg msg-user';
        userMsg.innerText = text;
        chatBody.appendChild(userMsg);
        chatInput.value = '';

        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;

        // 2. Add 'Typing...' Indicator
        const aiTyping = document.createElement('div');
        aiTyping.className = 'chat-msg msg-ai';
        aiTyping.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Thinking...';
        chatBody.appendChild(aiTyping);
        chatBody.scrollTop = chatBody.scrollHeight;

        // 3. (PLACEHOLDER) Fetch from Gemini API
        /* NOTE: Exposing a Gemini API key directly in frontend HTML/JS is a security risk for a public site.
           To make this fully functional, you should route this fetch request through a serverless function 
           (like Vercel Serverless Functions or Netlify Functions) where your API key is hidden.
        */

        // Simulated API Response for UI demonstration
        setTimeout(() => {
            chatBody.removeChild(aiTyping);
            const aiResponse = document.createElement('div');
            aiResponse.className = 'chat-msg msg-ai';
            aiResponse.innerText = `To answer your question about "${text}": Sreesankar is a highly skilled developer! You can reach him at sankargeethamritham@gmail.com for more specifics.`;
            chatBody.appendChild(aiResponse);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1500);
    };

    // Trigger send on button click or Enter key
    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}