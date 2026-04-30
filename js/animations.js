/**
 * Animation Manager
 * Handles all animations on the website
 */

const AnimationManager = {
    /**
     * Initialize all animations
     */
    init: () => {
        AnimationManager.typingEffect();
        AnimationManager.parallaxEffect();
        AnimationManager.scrollAnimations();
    },

    /**
     * Typing effect for tagline
     */
    typingEffect: () => {
        const tagline = document.querySelector('.tagline');
        if (!tagline) return;
        
        const text = tagline.getAttribute('data-text') || tagline.textContent;
        tagline.textContent = '';
        tagline.setAttribute('data-text', text);
        
        let index = 0;
        
        function typeText() {
            if (index < text.length) {
                tagline.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeText, 800);
    },

    /**
     * Parallax effect on mouse move
     */
    parallaxEffect: () => {
        const cards = document.querySelectorAll('section');
        if (cards.length === 0) return;
        
        document.addEventListener('mousemove', Utilities.throttle((e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            cards.forEach((card, i) => {
                const speed = (i + 1) * 2;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;
                card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        }, 16)); // ~60fps
    },

    /**
     * Scroll-triggered animations
     */
    scrollAnimations: () => {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });
    },

    /**
     * Fade in element
     * @param {HTMLElement} element - Element to fade in
     * @param {number} delay - Delay in milliseconds
     */
    fadeIn: (element, delay = 0) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, delay);
    },

    /**
     * Slide in element from direction
     * @param {HTMLElement} element - Element to slide in
     * @param {string} direction - Direction: 'left', 'right', 'up', 'down'
     * @param {number} delay - Delay in milliseconds
     */
    slideIn: (element, direction = 'up', delay = 0) => {
        setTimeout(() => {
            element.classList.add(`slide-in-${direction}`);
        }, delay);
    }
};

// Export for use in other modules
window.AnimationManager = AnimationManager;
