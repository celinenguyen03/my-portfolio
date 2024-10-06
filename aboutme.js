document.addEventListener('DOMContentLoaded', () => {

    const hamburgerMenu = document.querySelector('.hamburger-menu'); // Target the hamburger icon image
    const navLinksMobile = document.querySelector('.nav-links-mobile'); // The entire container holding the links
    
    let menuOpen = false; // Track if the menu is open

    // GSAP Timeline for showing and hiding links with stagger effect and color change
    const tl = gsap.timeline({ paused: true, reversed: true });

    // Hamburger rotation, color change, and link animation
    tl.to(hamburgerMenu, {
        rotation: 360, // Spin the hamburger menu
        background: 'linear-gradient(to bottom, rgba(242, 203, 5, 1), rgba(255, 120, 62, 0.4))', // Change color
        duration: 0.5,
        ease: 'power2.inOut',
    })

    // Hamburger menu click event to toggle the menu
    hamburgerMenu.addEventListener('click', () => {
        if (menuOpen) {
            tl.reverse(); // Reverse the hamburger animation when closing
            navLinksMobile.style.display = 'none'; // Hide the nav links container
        } else {
            tl.play(); // Play the hamburger animation when opening
            navLinksMobile.style.display = 'flex'; // Show the nav links container
        }
        menuOpen = !menuOpen; // Toggle the state
    });

    gsap.to(window, { scrollTo: 0, duration: 0 });

    // Set of random colors for the animation
    const colorsLightMode = ['#28282B', '#F26398', '#05DBF2', '#F2B705']; // Light mode colors

    // GSAP setup for image container (fade up effect)
    gsap.from(".about-image-container", {
        y: 100, // Move from 100px down
        opacity: 0, // Start invisible
        duration: 1, // Animation duration
        ease: "power3.out", // Easing for smooth fade
        delay: 0.5, // Delay before starting
    });

    // Split the text in the "Fun facts about me" header for wave effect
    const funFactsHeader = new SplitType('.about-text-container h1');

    // Create staggered, bouncy animation for each character in the heading
    gsap.fromTo(".about-text-container h1 .char", 
        {
            y: 100, // Move from below
            opacity: 0, // Start invisible
        },
        {
            y: 0, // Move to final position
            opacity: 1, // Become visible
            stagger: 0.05, // Stagger for each character
            ease: "bounce.out", // Bounce effect
            duration: 1.5, // Duration for each character animation
            delay: 1, // Start after the image animation
            color: function() {
                return gsap.utils.random(colorsLightMode); // Assign random light mode color
            },
            onComplete: () => {
                // Reset to the default color after the animation completes
                gsap.to(".about-text-container h1 .char", {
                    color: "#28282B", // Set the final color to the original dark text color
                    duration: 0.5 // Short transition to the original color
                });
            }
        }
    );

    // Select all the "Fun facts about me" headings and individual characters
    const funFactsHeadings = document.querySelectorAll('.about-text-container h1');

    // Function to apply random colors to each letter on hover
    function randomizeColorsForFunFacts(heading) {
        const funFactsChars = heading.querySelectorAll('.char'); // Get the characters in the hovered h1
        funFactsChars.forEach(char => {
            gsap.to(char, {
                color: gsap.utils.random(colorsLightMode), // Randomly pick a light mode color
                duration: 0.2 // Short animation duration for color change
            });
        });
    }

    // Function to reset the colors when hover leaves
    function resetColorsForFunFacts(heading) {
        const funFactsChars = heading.querySelectorAll('.char'); // Get the characters in the hovered h1
        gsap.to(funFactsChars, {
            color: '#28282B', // Reset the letters to the original dark color
            duration: 0.2 // Smooth transition back to the original color
        });
    }

    // Apply event listeners to each heading
    funFactsHeadings.forEach(heading => {
        heading.addEventListener('mouseenter', () => randomizeColorsForFunFacts(heading));
        heading.addEventListener('mouseleave', () => resetColorsForFunFacts(heading));
    });


    // Staggered animation for each paragraph (fade up effect)
    gsap.from(".about-text-container p", {
        y: 50, // Move from below
        opacity: 0, // Start invisible
        stagger: 0.3, // Stagger between each paragraph
        ease: "power3.out", // Easing for smooth fade
        duration: 1, // Duration for each paragraph
        delay: 1.5, // Delay to start after the heading animation
    });

    // ----- Scroll Down Arrow Animation -----
    gsap.fromTo(".scroll-down-arrow", 
        {
            y: 0, // Start from 24px below
            opacity: 0 // Start invisible
        }, 
        {
            y: -24, // End at the final position
            opacity: 1, // Become visible
            duration: 1, // Animation duration
            ease: "power3.out", // Easing for smooth motion
            delay: 2.5, // Start after the paragraphs animate in
        }
    );

    // Floating scroll down animation
    gsap.to(".scroll-down-arrow", {
        y: 24,
        duration: 1,
        ease: "power1.in",
        yoyo: true,
        repeat: -1,
        repeatDelay: 0,
        yoyoEase: "power1.out",
        delay: 0.5,
        paused: false
    });

    document.querySelector('.scroll-down-arrow').addEventListener('click', () => {
        gsap.to(window, { 
            duration: 1.5, 
            scrollTo: ".photo-section", 
            ease: "power2.inOut" 
        });
    });

    // ----- Knuckles to Sonic Spin Animation -----
    const aboutImageContainer = document.querySelector(".about-image-container");
    const knuckles = document.querySelector(".knuckles-svg");
    const sonic = document.querySelector(".sonic-svg");

    // Hover animation on the image container
    aboutImageContainer.addEventListener("mouseenter", () => {
        const spinTL = gsap.timeline();

        // Spin the Knuckles image around its Y-axis
        spinTL.to(knuckles, {
            rotationY: 720, // Spin it two full rotations
            duration: 1.2, // Adjust duration for the desired speed
            ease: "power2.inOut",
            onComplete: () => {
                // Hide Knuckles and show Sonic at the midpoint
                knuckles.style.display = "none";
                sonic.style.display = "block";
            }
        })
        .fromTo(sonic, {
            rotationY: -720, // Set initial rotation for Sonic
            opacity: 0, // Initially invisible
        }, {
            rotationY: 0, // Bring Sonic to its normal state
            opacity: 1, // Fade Sonic in
            duration: 1.2, // Same duration for consistent feel
            ease: "power2.out"
        });
    });

    // Reverse the animation on mouseleave
    aboutImageContainer.addEventListener("mouseleave", () => {
        const reverseTL = gsap.timeline();

        // Hide Sonic and bring back Knuckles
        reverseTL.to(sonic, {
            rotationY: -720, // Spin Sonic in reverse
            duration: 1.2,
            ease: "power2.inOut",
            opacity: 0, // Fade Sonic out
            onComplete: () => {
                sonic.style.display = "none";
                knuckles.style.display = "block"; // Show Knuckles
            }
        })
        .fromTo(knuckles, {
            rotationY: 720, // Set rotation for Knuckles
            opacity: 0,
        }, {
            rotationY: 0, // Return Knuckles to normal
            opacity: 1, // Fade Knuckles back in
            duration: 1.2,
            ease: "power2.out"
        });
    });

    // Get all footer icons
    const footerIcons = document.querySelectorAll('.footer-icons img');

    // Function to apply shake and color change on hover
    footerIcons.forEach((icon) => {
        icon.addEventListener('mouseenter', () => {
            // Shake the icon and change its color on hover
            gsap.to(icon, {
                keyframes: {
                    rotate: [-10, 10, -3, 3, 0],
                    duration: 0.5,
                    ease: "power1.inOut",
                    repeat: 1,
                    yoyo: true
                },
                scale: 1.2,
                duration: 0.3
            });
        });

        icon.addEventListener('mouseleave', () => {
            // Reset icon to its original state
            gsap.to(icon, {
                rotate: 0,
                scale: 1,
                duration: 0.3,
                ease: "power1.inOut"
            });
        });
    });

    gsap.registerPlugin(ScrollTrigger);

    // Function to handle dark mode transition based on scroll progress
    function transitionToDarkMode(progress) {
        const colorValue = gsap.utils.interpolate(255, 40, progress); // Transition from white (255) to dark (40)
        const bgColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`; // Interpolated background color
        const textColor = colorValue < 128 ? '#FFFFFF' : '#28282B'; // Set text color based on the background brightness
        const linkColor = '#F26398'; // Always keep about-section links pink
        const logo = colorValue < 128 ? 'images/logodm.svg' : 'images/logo.svg'; // Change logo based on mode
    
        // Apply background color and text color to body, nav, and footer
        gsap.to('body', { backgroundColor: bgColor, duration: 0 });
        gsap.to('nav, footer', { backgroundColor: bgColor, color: textColor, duration: 0 });
        gsap.to('p, h1', { color: textColor, duration: 0 });
    
        // Change links color in the navbar and about section independently
        gsap.to('.about-text-container a', { color: linkColor, duration: 0 }); // Keep about-section links pink
        gsap.to('nav a', { color: textColor, duration: 0 }); // Change nav links with dark mode
        
        // Change the logo dynamically in dark mode
        gsap.to('#navbar__logo img', { attr: { src: logo }, duration: 0 });

        // Apply dark mode to "Back to Top" button
        gsap.to('#backToTop', { backgroundColor: bgColor, borderColor: textColor, color: textColor, duration: 0 });
    
        // Update the navbar box-shadow and border for **dark mode**
        if (colorValue < 128) {
            gsap.to('nav', { 
                boxShadow: 'inset 0px 4px 18px rgba(40, 40, 43, 1)', 
                border: '1px solid rgba(40, 40, 43, 0.1)', 
                duration: 0 
            });
        } else {
            // Light mode settings for shadow and border
            gsap.to('nav', { 
                boxShadow: 'inset 0px 4px 18px rgba(255, 255, 255, 1)', 
                border: '2px rgba(255, 255, 255, 0.1)', 
                duration: 0 
            });
        }
    
        // Handle the underline for active link in navbar
        const activeLink = document.querySelector('nav a.active');
        if (colorValue < 128) {
            activeLink.classList.add('dark-mode'); // Add class for dark mode underline
        } else {
            activeLink.classList.remove('dark-mode'); // Remove class for light mode underline
        }
    
        // **Add conditional fade-out logic based on screen width**
        if (window.innerWidth > 1024) {
            // Fade out the content of the about section as it transitions for large screens
            gsap.to('.about-section', {
                opacity: 1 - progress, // Fade out based on scroll progress
                duration: 0
            });
        }
    
        // Change footer icons and line color for dark mode
        gsap.to('.footer-icons img, footer hr', {
            filter: colorValue < 128 ? 'invert(1)' : 'invert(0)', // Invert to white in dark mode
            duration: 0
        });
    
        // Change the scroll-to-arrow color dynamically
        gsap.to('.scroll-down-arrow img', { 
            filter: colorValue < 128 ? 'invert(1)' : 'invert(0)', 
            duration: 0 
        });
    }

    let darkModeTrigger;

// Function to apply dark mode based on progress
function transitionToDarkMode(progress) {
    const colorValue = gsap.utils.interpolate(255, 40, progress); // Transition from white (255) to dark (40)
    const bgColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`; // Interpolated background color
    const textColor = colorValue < 128 ? '#FFFFFF' : '#28282B'; // Set text color based on the background brightness
    const linkColor = '#F26398'; // Always keep about-section links pink
    const logo = colorValue < 128 ? 'images/logodm.svg' : 'images/logo.svg'; // Change logo based on mode
    const hamburgerMenuIcon = colorValue < 128 ? 'images/hamburger menudm.svg' : 'images/hamburger menu.svg'; // Change hamburger menu icon

    
    // Apply background color and text color to body, nav, and footer
    gsap.to('body', { backgroundColor: bgColor, duration: 0 });
    gsap.to('nav, footer', { backgroundColor: bgColor, color: textColor, duration: 0 });
    gsap.to('p, h1', { color: textColor, duration: 0 });
    
    // Change links color in the navbar and about section independently
    gsap.to('.about-text-container a', { color: linkColor, duration: 0 }); // Keep about-section links pink
    gsap.to('nav a', { color: textColor, duration: 0 }); // Change nav links with dark mode

    // Change logo dynamically in dark mode for both regular and mobile navigation
    gsap.to('#navbar__logo img', { attr: { src: logo }, duration: 0 });
    gsap.to('.navbar-bubble.logo img', { attr: { src: logo }, duration: 0 }); // Change the small version of the navbar logo
    gsap.to('.hamburger-menu img', { attr: { src: hamburgerMenuIcon }, duration: 0 });

    // Apply dark mode to text within bubbles (Works, About, Resume)
    gsap.to('.works-bubble a, .about-bubble a, .resume-bubble a', {
        color: textColor, // Change text color based on the background
        duration: 0
    });

    // Apply dark mode to "Back to Top" button
    gsap.to('#backToTop', { backgroundColor: bgColor, borderColor: textColor, color: textColor, duration: 0 });

    // Update the navbar and bubbles box-shadow and border for **dark mode**
    if (colorValue < 128) {
        // Apply dark mode styles
        gsap.to('nav, .works-bubble, .about-bubble, .resume-bubble, .navbar-bubble', { 
            boxShadow: 'inset 0px 4px 18px rgba(40, 40, 43, 1)', 
            border: '1px solid rgba(40, 40, 43, 0.1)', 
            duration: 0 
        });
    } else {
        // Light mode settings for shadow and border
        gsap.to('nav, .works-bubble, .about-bubble, .resume-bubble, .navbar-bubble', { 
            boxShadow: 'inset 0px 4px 18px rgba(255, 255, 255, 1)', 
            border: '1px rgba(255, 255, 255, 0.1)', 
            duration: 0 
        });
    }

    // Handle the underline for active link in the navbar
    const activeLink = document.querySelector('nav a.active');
    if (colorValue < 128) {
        activeLink.classList.add('dark-mode'); // Add class for dark mode underline
    } else {
        activeLink.classList.remove('dark-mode'); // Remove class for light mode underline
    }

    // **Add conditional fade-out logic based on screen width**
    if (window.innerWidth > 1024) {
        // Fade out the content of the about section as it transitions for large screens
        gsap.to('.about-section', {
            opacity: 1 - progress, // Fade out based on scroll progress
            duration: 0
        });
    }

    // Change footer icons and line color for dark mode
    gsap.to('.footer-icons img, footer hr', {
        filter: colorValue < 128 ? 'invert(1)' : 'invert(0)', // Invert to white in dark mode
        duration: 0
    });

    // Change the scroll-down arrow color dynamically
    gsap.to('.scroll-down-arrow img', { 
        filter: colorValue < 128 ? 'invert(1)' : 'invert(0)', 
        duration: 0 
    });

}

// Function to apply the dark mode trigger based on screen width
function applyDarkModeTransition() {
    if (darkModeTrigger) {
        darkModeTrigger.kill();
    }

    if (window.innerWidth <= 1024) {
        // For screens <= 1024px, switch instantly to dark mode when entering the photo section
        darkModeTrigger = ScrollTrigger.create({
            trigger: '.photo-section', // Start dark mode at the beginning of the photo section
            start: 'top center', // Trigger when the top of the photo section enters the viewport
            onEnter: () => {
                transitionToDarkMode(1); // Instantly switch to dark mode
            },
            onLeaveBack: () => {
                transitionToDarkMode(0); // Instantly switch back to light mode
            }
        });
    } else {
        // For screens > 1024px, dark mode transitions smoothly with scroll progress
        darkModeTrigger = ScrollTrigger.create({
            trigger: '.about-section', 
            start: 'top top',
            endTrigger: '.photo-section',
            end: 'top top',
            scrub: true, // Smooth scroll transition
            onUpdate: (self) => {
                transitionToDarkMode(self.progress);
            }
        });
    }
}

// Apply dark mode transition on page load and window resize
applyDarkModeTransition();
window.addEventListener('resize', applyDarkModeTransition);

    // Animation for the "Gallery" text (Fade-in when scrolling into the photo section)
    gsap.fromTo(".gallery-text", 
        {
            y: -100, // Start off-screen
            opacity: 0, // Ensure it's hidden at the start
        },
        {
            y: 0, // Slide down into the view
            opacity: 1, // Fade in
            scrollTrigger: {
                trigger: ".photo-section", // Start just before the photo section
                start: "top 50%", // Trigger before reaching the photo section
                end: "top 10%", // Keep it in view until 10% of the way through the section
                scrub: true, // Smooth scroll effect
            }
        }
    );

    // Move the "Gallery" text up and out when scrolling past 90% of the photo section
    gsap.to(".gallery-text", 
        {
            y: -300, // Move it further up and completely out of the viewport
            scrollTrigger: {
                trigger: ".photo-section",
                start: "80% center", // Start moving it out at 90% of the section
                end: "100% center", // Complete the move by the end of the section
                scrub: true, // Smooth scrolling transition
                pin: false, // Unfix the text at this point
                onLeave: () => {
                    // Ensure it continues to move up when leaving the section
                    gsap.to(".gallery-text", { y: -500, duration: 1, ease: "power2.out" });
                },
                onLeaveBack: () => {
                    // Reset to fixed position when scrolling back
                    gsap.to(".gallery-text", { y: 0, duration: 1, ease: "power2.out" });
                }
            }
        }
    );

        gsap.to('.cherry-svg', {
            rotation: 1080,
            scrollTrigger: {
                trigger: '.photo-section',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            },
        });

    
    let parallaxTriggers = [];
    let parallaxEnabled = false;

    function applyParallaxEffect() {
        // Remove all existing ScrollTriggers when resizing
        parallaxTriggers.forEach(trigger => trigger.kill());
        parallaxTriggers = [];

        if (window.innerWidth > 1024 && !parallaxEnabled) {
            // Reapply GSAP Parallax with data-speed attributes only if screen width is greater than 1024px
            parallaxEnabled = true; // Set the parallax as enabled
            gsap.utils.toArray('.photo, .cherry-svg').forEach((element) => {
                const speed = element.dataset.speed; // Grab the data-speed value from each element
                
                // Apply GSAP animation with the parallax effect based on the speed value
                const trigger = gsap.to(element, {
                    yPercent: (1 - speed) * 100,  // Use the speed to adjust the parallax
                    ease: 'none', // Parallax effect should have no easing for smoothness
                    scrollTrigger: {
                        trigger: element, // Trigger based on each element
                        start: 'top bottom', // Start the animation when the element comes into view
                        end: 'bottom top', // End when the element leaves the viewport
                        scrub: true, // Enable smooth parallax scrolling
                    },
                });

                // Store the trigger so we can kill it later
                parallaxTriggers.push(trigger);
            });
        } else if (window.innerWidth <= 1024) {
            parallaxEnabled = false; // Disable parallax when screen is less than 1024px
            // Disable parallax for screen widths below 1024px by removing the scroll-triggered parallax effect
            gsap.set('.photo, .cherry-svg', {
                clearProps: 'all', // Clear all inline styles applied by GSAP
                yPercent: 0 // Ensure everything is reset to its default position
            });
        }
    }

    // Apply parallax on page load
    applyParallaxEffect();

    // Apply parallax when window resizes
    window.addEventListener('resize', () => {
        // Only run if the parallax is enabled and the window is resized back to > 1024px
        if ((window.innerWidth > 1024 && !parallaxEnabled) || (window.innerWidth <= 1024 && parallaxEnabled)) {
            applyParallaxEffect();
        }
    });

    // Get references to the Back to Top button and the SVG bubbles specific to the button
    const backToTopButton = document.querySelector('#backToTop');
    const buttonLeftBubbles = document.querySelectorAll('.button-left-bubble');
    const buttonRightBubbles = document.querySelectorAll('.button-right-bubble');

    // Function to animate bubbles and restart on hover
    function hoverBackToTop() {
    // Create a new GSAP timeline each time on hover
    const bubbleTimeline = gsap.timeline();

    // Animate the button shake
    bubbleTimeline.to(backToTopButton, {
        keyframes: {
            rotate: [-5, 5, -3, 3, 0],
            duration: 0.6,
            ease: "power1.inOut",
            repeat: 1,
            yoyo: true,
        },
    });

    // Animate left bubbles
    buttonLeftBubbles.forEach((bubble, i) => {
        const randomX = gsap.utils.random(-150, -100);
        const randomY = gsap.utils.random(50, 100);
        bubbleTimeline.fromTo(
            bubble,
            {
                opacity: 0,
                scale: 0.5,
                x: 0,
                y: 0,
            },
            {
                opacity: 1,
                scale: 1.5,
                x: randomX,
                y: randomY,
                duration: 1,
                ease: "power2.out",
            },
            i * 0.1 // Stagger the animation for each bubble
        ).to(
            bubble,
            {
                opacity: 0,
                scale: 0,
                y: `+=${randomY + 50}`,
                duration: 0.6,
                ease: "power1.in",
            },
            "-=0.5" // Overlap the fading out and moving down animations
        );
    });

    // Animate right bubbles
    buttonRightBubbles.forEach((bubble, i) => {
        const randomX = gsap.utils.random(100, 150);
        const randomY = gsap.utils.random(50, 100);
        bubbleTimeline.fromTo(
            bubble,
            {
                opacity: 0,
                scale: 0.5,
                x: 0,
                y: 0,
            },
            {
                opacity: 1,
                scale: 1.5,
                x: randomX,
                y: randomY,
                duration: 1,
                ease: "power2.out",
            },
            i * 0.1
        ).to(
            bubble,
            {
                opacity: 0,
                scale: 0,
                y: `+=${randomY + 50}`,
                duration: 0.6,
                ease: "power1.in",
            },
            "-=0.5"
        );
    });

    return bubbleTimeline;
    }

    // Function to scroll smoothly to the top when the button is clicked
    function scrollToTop() {
    gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: 0 }, // Scroll to the top of the page
        ease: "power2.inOut",
    });
    }

    // Reset the button to normal state
    function hoverOutBackToTop() {
    gsap.to(backToTopButton, {
        rotate: 0,
        duration: 0.3,
        ease: "power1.inOut",
    });
    }

    // Add event listeners
    backToTopButton.addEventListener('mouseenter', () => {
        console.log('Hovering Back to Top button');
        hoverBackToTop().restart();
    });
    backToTopButton.addEventListener('mouseleave', hoverOutBackToTop);

    // Add click event listener for smooth scroll to the top
    backToTopButton.addEventListener('click', scrollToTop);

}); // END OF DOM, DON'T PUT ANYTHING PAST THIS
