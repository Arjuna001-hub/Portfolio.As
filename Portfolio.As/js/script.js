```javascript
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // CONTACT FORM - EMAILJS
    // ==========================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const submitButton = contactForm.querySelector(
                "button[type='submit']"
            );

            if (!submitButton) {
                console.error("Submit button not found.");
                return;
            }

            // Check whether EmailJS is loaded
            if (typeof emailjs === "undefined") {
                console.error("EmailJS SDK is not loaded.");

                alert(
                    "Email service is unavailable. Please refresh the page and try again."
                );

                return;
            }

            // Prevent duplicate submissions
            submitButton.disabled = true;

            submitButton.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {

                // Send email using EmailJS
                const response = await emailjs.sendForm(
                    "service_d2gg0vq",
                    "template_e04z80g",
                    contactForm
                );

                console.log(
                    "EMAIL SENT SUCCESSFULLY:",
                    response.status,
                    response.text
                );

                alert(
                    "Message sent successfully! Thank you for contacting me."
                );

                // Clear form after successful submission
                contactForm.reset();

            } catch (error) {

                console.error("EMAILJS ERROR:", error);

                console.error("Error Status:", error.status);

                console.error("Error Message:", error.text);

                alert(
                    "An error occurred while sending the email.\n\n" +
                    "Please check your EmailJS configuration and try again."
                );

            } finally {

                // Always restore the button
                submitButton.disabled = false;

                submitButton.innerHTML =
                    '<i class="fas fa-paper-plane"></i> Send Message';

            }

        });

    } else {

        console.error(
            "ERROR: Contact form with ID 'contactForm' was not found."
        );

    }


    // ==========================================
    // HAMBURGER MENU
    // ==========================================

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", function () {

            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");

        });

        // Close menu when clicking a navigation link
        document.querySelectorAll(".nav-link").forEach(function (link) {

            link.addEventListener("click", function () {

                hamburger.classList.remove("active");
                navMenu.classList.remove("active");

            });

        });

    }


    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // ==========================================
    // ACTIVE NAVIGATION LINK
    // ==========================================

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                currentSection &&
                link.getAttribute("href") === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    // Set the correct active link on page load
    updateActiveNavigation();


    // ==========================================
    // PROJECT IMAGE ERROR HANDLING
    // ==========================================

    const projectImages = document.querySelectorAll(
        ".project-image img"
    );

    projectImages.forEach(function (image) {

        image.addEventListener("error", function () {

            console.warn(
                "Project image could not be loaded:",
                image.src
            );

            image.style.display = "none";

        });

    });


    // ==========================================
    // PROFILE IMAGE ERROR HANDLING
    // ==========================================

    const profileImage = document.querySelector(
        ".profile-image img"
    );

    if (profileImage) {

        profileImage.addEventListener("error", function () {

            console.warn(
                "Profile image could not be loaded:",
                profileImage.src
            );

        });

    }

});
```