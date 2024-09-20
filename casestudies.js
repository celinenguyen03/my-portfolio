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

    // Check if carousel elements exist before running the carousel logic
    if (document.querySelectorAll('.mySlides').length > 0) {
        let slideIndex = 1;
        showSlides(slideIndex);

        // Function to handle next/previous controls
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        // Function to handle current slide through dots
        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        // Show the current slide
        function showSlides(n) {
            let i;
            const slides = document.querySelectorAll(".mySlides");
            const dots = document.querySelectorAll(".dot");

            // Boundary checks
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }

            // Hide all slides
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }

            // Remove 'active' class from all dots
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }

            // Show the current slide and add 'active' class to the dot
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
        }

        // Attach event listeners for next/prev and dots
        document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
        document.querySelector('.next').addEventListener('click', () => plusSlides(1));
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => currentSlide(index + 1));
        });

        // Create a GSAP timeline for the arrows
        const animateArrows = () => {
            // Left arrow animation
            gsap.to('.prev', {
                x: -16,
                duration: 0.5, // Duration of each animation
                ease: "power1.inOut", // Smooth easing
                yoyo: true, // Move back to the original position
                repeat: -1, // Repeat indefinitely
            });

            // Right arrow animation
            gsap.to('.next', {
                x: 16,
                duration: 0.5, // Duration of each animation
                ease: "power1.inOut", // Smooth easing
                yoyo: true, // Move back to the original position
                repeat: -1, // Repeat indefinitely
            });
        };

        animateArrows();
    }

    // Fade in the cover image and the first section on page load
    gsap.fromTo(
        ['.cover', '.case-info'], 
        { opacity: 0, y: 50 }, // Start state
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" } // End state
    );

    // Scroll-triggered animations for other sections, excluding .case-info
    gsap.utils.toArray('.section').forEach((section) => {
        if (!section.classList.contains('case-info')) {  // Exclude .case-info
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // Trigger when the section is in view
                }
            });
        }
    });

    // Smooth scroll for left-nav
    document.querySelectorAll('.left-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1); // Get the section id
            const targetSection = document.getElementById(targetId);

            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: `#${targetId}`, offsetY: 50 }, // Smooth scroll to the section
                ease: "power2.inOut"
            });
        });
    });

    // Function to check background color behind each nav link
    const checkNavLinkBackground = () => {
        navLinks.forEach(link => {
            const rect = link.getBoundingClientRect(); // Get the position of the nav link
            const x = rect.left + rect.width / 2; // X coordinate (middle of the link)
            const y = rect.top + rect.height / 2; // Y coordinate (middle of the link)

            // Get the element behind the link using document.elementFromPoint
            const elementBehind = document.elementFromPoint(x, y);

            if (elementBehind) {
                const backgroundColor = window.getComputedStyle(elementBehind).backgroundColor;

                // Check if the background behind the link is dark or light
                if (isDarkBackground(backgroundColor)) {
                    link.style.color = '#fff'; // White text if background is dark
                } else {
                    link.style.color = '#28282B'; // Dark text if background is light
                }
            }
        });
    };

    // Add an event listener to the scroll event
    window.addEventListener('scroll', checkNavLinkBackground);

    // Also check the background when the page loads
    window.addEventListener('DOMContentLoaded', checkNavLinkBackground);


    // Select modal elements
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeModal = document.querySelector(".close-modal");
    const scrollableNav = document.querySelector(".scrollable-nav");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    // Store references to all zoomable images
    const zoomableImages = document.querySelectorAll('.zoomable');
    let currentImageIndex = 0; // Track current image index
    let isTransitioning = false; // Flag to prevent multiple transitions at once

    // Function to open modal and display the clicked image (with fade-in)
    function openModal(index) {
        currentImageIndex = index;
        modalImg.src = zoomableImages[currentImageIndex].src;

        // Show the modal instantly, but keep opacity at 0 for fade-in
        modal.style.display = "flex";
        gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.5 }); // Fade in animation

        highlightActiveThumbnail();
    }

    // Function to close modal with fade-out effect
    function closeModalWithFade() {
        // First, animate the opacity to 0
        gsap.to(modal, {
            opacity: 0, 
            duration: 0.5, 
            onComplete: () => {
                modal.style.display = "none";
            }
        });

        // Also reset the opacity to 1 for future modal openings
        gsap.set(modal, { opacity: 1, delay: 0.5 });
    }

    // Function to smoothly transition between images with fade effect
    function transitionToImage(index) {
        if (isTransitioning) return; // Prevent transitioning until the current transition is done
        isTransitioning = true;

        // Fade out the current image
        gsap.to(modalImg, {
            opacity: 0, 
            duration: 0.5, 
            onComplete: () => {
                // Change to the next/previous image once fade-out completes
                currentImageIndex = index;
                modalImg.src = zoomableImages[currentImageIndex].src;
                highlightActiveThumbnail();

                // Fade in the new image
                gsap.to(modalImg, {
                    opacity: 1,
                    duration: 0.5,
                    onComplete: () => {
                        isTransitioning = false; // Allow the next transition
                    }
                });
            }
        });
    }

    // Function to navigate to the next image with transition
    function navigateNext() {
        const nextIndex = (currentImageIndex + 1) % zoomableImages.length;
        transitionToImage(nextIndex);
    }

    // Function to navigate to the previous image with transition
    function navigatePrev() {
        const prevIndex = (currentImageIndex - 1 + zoomableImages.length) % zoomableImages.length;
        transitionToImage(prevIndex);
    }

    // Function to highlight the active thumbnail in the bottom nav
    function highlightActiveThumbnail() {
        const thumbnails = document.querySelectorAll(".scrollable-nav img");
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle("active", index === currentImageIndex);
        });
    }

    // Function to populate the bottom navigation bar with thumbnails
    function populateBottomNav() {
        scrollableNav.innerHTML = ''; // Clear previous thumbnails
        zoomableImages.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image.src;
            thumbnail.classList.add('thumbnail');
            thumbnail.addEventListener('click', () => openModal(index));
            scrollableNav.appendChild(thumbnail);
        });
    }

    // Event listeners for zoomable images
    zoomableImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            populateBottomNav(); // Populate thumbnails
            openModal(index);
        });
    });

    // Event listeners for navigation arrows
    leftArrow.addEventListener('click', navigatePrev);
    rightArrow.addEventListener('click', navigateNext);

    // Close modal when clicking outside the image or pressing the close button
    closeModal.addEventListener('click', closeModalWithFade);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModalWithFade();
        }
    });

    // Function to switch to the next image when scrolling down or the previous when scrolling up with transition
    function handleWheelScroll(e) {
        e.preventDefault(); // Prevent default scroll behavior on the page
        if (isTransitioning) return; // Prevent multiple transitions at once

        if (e.deltaY > 0) {
            navigateNext(); // Scroll down, go to the next image
        } else {
            navigatePrev(); // Scroll up, go to the previous image
        }
    }

    // Add event listener for mouse wheel scrolling on the entire modal (including nav)
    modal.addEventListener('wheel', handleWheelScroll);

    // Target the related-item images for animation
    const relatedItems = document.querySelectorAll('.related-item img');

    // GSAP animation for hover effect on images
    relatedItems.forEach((item) => {
        // Add mouseenter event for hover effect
        item.addEventListener('mouseenter', () => {
            // Create a timeline for the hover effect
            const tl = gsap.timeline({ repeat: -1, yoyo: true });

            tl.to(item, {
                y: -10,  // Move the image upwards slightly
                rotate: 5,  // Slight rotation for wiggle
                duration: 0.3,  // Duration of the movement
                ease: "power1.out"  // Smooth transition effect
            }).to(item, {
                rotate: -5,  // Reverse wiggle
                duration: 0.3,
                ease: "power1.inOut"
            }).to(item, {
                rotate: 0,  // Return to neutral position
                duration: 0.3,
                ease: "power1.out"
            });

            // Store the timeline on the element so we can reverse it on mouse leave
            item.timeline = tl;
        });

        // Add mouseleave event to reverse the hover effect
        item.addEventListener('mouseleave', () => {
            // Kill the timeline to stop the wiggle and return to neutral
            if (item.timeline) {
                item.timeline.kill();
            }

            gsap.to(item, {
                y: 0,  // Reset the vertical position
                rotate: 0,  // Reset the rotation
                duration: 0.5,  // Smoothly reverse the effect
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
