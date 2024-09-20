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

    // ----- Word Rising -----
    const myName = new SplitType('#my-name');
    const sent1 = new SplitType('#sent-1');
    const sent2 = new SplitType('#sent-2');

    gsap.to('.char', {
        y: 0,
        stagger: 0.02,
        delay: 0.2,
        duration: 0.1
    });

    // ----- Random Color Hover for "hi i'm celine" -----
    const colors = ['#28282B', '#F26398', '#05DBF2', '#F2B705']; // Set of colors to randomly choose from
    const nameText = document.querySelector("#my-name"); // Select the "hi i'm celine" text

    // Select only the chars inside the "#my-name" container
    const nameChars = document.querySelectorAll("#my-name .char");

    // Function to apply random colors to each letter
    function randomizeColors() {
        nameChars.forEach(char => {
            // Randomly assign a color from the colors array
            gsap.to(char, {
                color: gsap.utils.random(colors), // Randomly pick a color for each character
                duration: 0.2 // Short animation duration for color change
            });
        });
    }

    // Hover Events
    nameText.addEventListener('mouseenter', () => {
        randomizeColors(); // Apply random colors when the mouse enters
    });

    nameText.addEventListener('mouseleave', () => {
        gsap.to(nameChars, {
            color: '#28282B', // Reset the letters to the original color
            duration: 0.2 // Smooth transition back to the original color
        });
    });

    // --------- Animate the Button (Let's Chat) ---------

    // Bubble Sliding Over
    let chatball = document.querySelector(".pink");
    let link = document.querySelector(".chat");

    let hoverTL = gsap.timeline();
    hoverTL.pause();

    hoverTL.to(chatball, {width: "calc(100% + 0.25em)", ease: "Elastic.easeOut(0.25)", duration: 0.5})
    hoverTL.to(chatball, {width: "2.5em", left: "calc(100% - 1.5em)", ease: "Elastic.easeOut(0.25)", duration: 0.5})

    link.addEventListener("mouseenter", ()=>{
        hoverTL.play();
    })

    link.addEventListener("mouseleave", ()=>{
        hoverTL.reverse();
    })
    
    // Select the chat button
    const chatButton = document.querySelector('.chat');
    
    // Apply rising animation to the chat button
    gsap.from(chatButton, {
        y: 50,          
        opacity: 0,     
        duration: 1.5,  
        delay: 0.5,     
        ease: 'power2.out' 
    });

    // ----- Bubble Animation -----
    let bubbles = document.querySelectorAll('.ob1, .pb1, .bb1, .ob2, .ob3, .pb2, .bb2');

    bubbles.forEach((bubble) => {
        gsap.fromTo(
            bubble,
            { opacity: 0, y: 500 },      // Start below the screen with opacity 0
            { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' } // Rise to its original position
        );
    });

    // Function to handle both mousemove and touchmove events
    function handleInteraction(event) {
        let mouseX, mouseY;

        // Determine if it's a touch event or mouse event
        if (event.touches) {
            mouseX = event.touches[0].clientX;
            mouseY = event.touches[0].clientY;
        } else {
            mouseX = event.clientX;
            mouseY = event.clientY;
        }

        const proximityThreshold = 100; // Proximity to trigger nudge

        bubbles.forEach((bubble) => {
            const bubbleRect = bubble.getBoundingClientRect();

            const distanceX = Math.max(bubbleRect.left - mouseX, mouseX - bubbleRect.right);
            const distanceY = Math.max(bubbleRect.top - mouseY, mouseY - bubbleRect.bottom);

            const isNearBubble = distanceX < proximityThreshold && distanceY < proximityThreshold;

            if (isNearBubble) {
                const bubbleCenterX = bubbleRect.left + bubbleRect.width / 2;
                const bubbleCenterY = bubbleRect.top + bubbleRect.height / 2;
                const angle = Math.atan2(bubbleCenterY - mouseY, bubbleCenterX - mouseX);

                const nudgeX = Math.cos(angle) * 20;
                const nudgeY = Math.sin(angle) * 20;

                gsap.to(bubble, {
                    x: `+=${nudgeX}`,
                    y: `+=${nudgeY}`,
                    duration: 0.3,
                    ease: "power3.out"
                });
            } else {
                gsap.to(bubble, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            }
        });
    }

// Add both mouse and touch event listeners for bubble interaction
document.addEventListener('mousemove', handleInteraction); // For mouse movement on desktop
document.addEventListener('touchmove', handleInteraction);  // For finger movement on mobile

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
            scrollTo: ".works", 
            ease: "power2.inOut" 
        });
    });

    gsap.registerPlugin(ScrollTrigger);

    function createBurstAnimation() {
        const burstTimeline = gsap.timeline();
    
        gsap.utils.toArray(".burst-svg").forEach((svg, i) => {
            burstTimeline.fromTo(svg, 
                { 
                    opacity: 0, 
                    scale: 0, 
                    x: 0, 
                    y: 0 
                },
                { 
                    opacity: 1, 
                    scale: 1.5,
                    x: gsap.utils.random(-150, 150), 
                    y: gsap.utils.random(-150, 150),
                    rotation: gsap.utils.random(-180, 180),
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(svg, {
                            opacity: 0,
                            duration: 0.5,
                            delay: 0.3
                        });
                    }
                },
                i * 0.1 
            );
        });
    
        return burstTimeline;
    }

    ScrollTrigger.create({
        trigger: "#works-title",
        start: "top 75%", 
        once: true, 
        onEnter: () => createBurstAnimation().play()
    });

    document.querySelector("#works-title").addEventListener("mouseenter", () => {
        createBurstAnimation().restart();
    });

    // Get all work cards
    const workCards = document.querySelectorAll('.work-card');

    // Loop through each card and apply hover effect
    workCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                keyframes: {
                    rotate: [-10, 10, -3, 3, 0],
                    duration: 0.6,
                    ease: "power1.inOut",
                    repeat: 1,
                    yoyo: true
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotate: 0, 
                duration: 0.3,
                ease: "power1.inOut"
            });
        });
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
        hoverBackToTop().restart();
    });
    backToTopButton.addEventListener('mouseleave', hoverOutBackToTop);

    // Add click event listener for smooth scroll to the top
    backToTopButton.addEventListener('click', scrollToTop);

    

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
}); // END OF DOM, DON'T PUT ANYTHING PAST THIS