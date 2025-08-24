/**
 * @file        script.js
 * @author      Kishan Rana
 * @version     2.0.0
 * @description Main JavaScript file for Kishan Rana's portfolio. This script is
 *              responsible for all dynamic client-side functionality.
 *
 * @module TypewriterEffect
 *         Animates the hero section headline with a typing effect.
 *
 * @module ScrollAnimations
 *         Uses the Intersection Observer API to trigger CSS animations when
 *         elements scroll into the viewport, optimizing performance by
 *         observing elements only once.
 *
 * @module BackToTopButton
 *         Controls the visibility of a "Back to Top" button based on the
 *         user's scroll position and handles the smooth scroll behavior.
 */

// A single DOMContentLoaded event listener ensures that all scripts run only after
// the entire HTML document has been parsed, preventing errors with element selection.
document.addEventListener('DOMContentLoaded', () => {

    /**
     * ---------------------------------------------------------------------------
     * MODULE: TYPEWRITER EFFECT
     * ---------------------------------------------------------------------------
     * @description Creates a dynamic typing animation for a designated element.
     */
    const initTypewriter = () => {
        const typewriterElement = document.querySelector('.typewriter');

        // Safety Check: Exit if the typewriter element doesn't exist on the page.
        if (!typewriterElement) {
            console.warn('Typewriter element not found.');
            return;
        }

        const words = ["Developer.", "Creator.", "Innovator."];
        let wordIndex = 0;    // Current index in the `words` array
        let charIndex = 0;    // Current character index in the current word
        let isDeleting = false; // State flag for typing vs. deleting

        const type = () => {
            const currentWord = words[wordIndex];
            // Adjust speed: faster when deleting, slower when typing.
            const typeSpeed = isDeleting ? 75 : 150;

            // Update the text content based on the current state
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // Logic to switch states (typing -> pausing -> deleting -> switching word)
            if (!isDeleting && charIndex === currentWord.length) {
                // Word finished typing, pause before deleting
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                // Word finished deleting, move to the next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Loop back to the start
            }

            // Schedule the next `type` call
            setTimeout(type, typeSpeed);
        };

        // Start the animation
        type();
    };


    /**
     * ---------------------------------------------------------------------------
     * MODULE: SCROLL ANIMATIONS
     * ---------------------------------------------------------------------------
     * @description Animates elements as they enter the viewport.
     */
    const initScrollAnimations = () => {
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

        // Safety Check: Exit if there are no elements to animate.
        if (elementsToAnimate.length === 0) return;

        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // When an element is intersecting (visible), add the 'visible' class.
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Performance Optimization: Stop observing the element after it has animated.
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15 // Trigger when 15% of the element is visible.
        });

        // Attach the observer to each target element.
        elementsToAnimate.forEach(element => {
            animationObserver.observe(element);
        });
    };


    /**
     * ---------------------------------------------------------------------------
     * MODULE: BACK TO TOP BUTTON
     * ---------------------------------------------------------------------------
     * @description Manages the visibility and functionality of the scroll-to-top button.
     */
    const initBackToTopButton = () => {
        const backToTopButton = document.querySelector('.back-to-top-btn');

        // Safety Check: Exit if the button element doesn't exist.
        if (!backToTopButton) return;
        
        // This function shows/hides the button based on vertical scroll position.
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        // This function handles the smooth scroll back to the top of the page.
        const scrollToTop = (event) => {
            event.preventDefault(); // Prevent default anchor link behavior (#hero).
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        // Add event listeners.
        window.addEventListener('scroll', toggleVisibility);
        backToTopButton.addEventListener('click', scrollToTop);
    };


    // =============================================
    // INITIALIZE ALL MODULES
    // =============================================
    initTypewriter();
    initScrollAnimations();
    initBackToTopButton();

});