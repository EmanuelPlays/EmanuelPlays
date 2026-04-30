/**
 * Main JavaScript Entry Point
 * Initializes all modules and functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('EmanuelPlaysDev - About Me Website Loaded');
    
    // Initialize all modules
    Main.init();
});

const Main = {
    /**
     * Initialize all modules
     */
    init: () => {
        // Initialize animations
        AnimationManager.init();
        
        // Update footer year
        Main.updateFooter();
        
        // Initialize other features
        Main.initializeFeatures();
    },

    /**
     * Update footer with current year
     */
    updateFooter: () => {
        const footerYear = document.querySelector('.footer p');
        if (footerYear) {
            const year = Utilities.getCurrentYear();
            footerYear.textContent = `© ${year} EmanuelPlaysDev. All rights reserved.`;
        }
    },

    /**
     * Initialize additional features
     */
    initializeFeatures: () => {
        // Add loading complete class to body
        document.body.classList.add('loaded');
        
        // Set meta tags dynamically if needed
        Main.updateMetaTags();
    },

    /**
     * Update meta tags
     */
    updateMetaTags: () => {
        // Update page title
        document.title = 'EmanuelPlaysDev - About Me';
        
        // You can add more meta tag updates here if needed
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Hey, I\'m EmanuelPlaysDev. A developer who builds Minecraft mods and Python stuff.');
        }
    }
};

// Export for use in other modules
window.Main = Main;
