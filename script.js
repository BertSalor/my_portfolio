/* DARK MODE AND LIGHT MODE */

      const themeToggle = document.getElementById("themeToggle");
      const themeIcon = document.getElementById("themeIcon");
      const savedTheme = localStorage.getItem("portfolio-theme");

      if (savedTheme === "light") {
        document.body.classList.add("light-mode");
      }

      function updateThemeButton() {
        const isLight = document.body.classList.contains("light-mode");

        themeIcon.className = isLight ? "fas fa-moon" : "fas fa-sun";

        themeToggle.setAttribute(
          "aria-label",
          isLight ? "Switch to dark mode" : "Switch to light mode",
        );

        themeToggle.title = isLight
          ? "Switch to dark mode"
          : "Switch to light mode";
      }

      updateThemeButton();

      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const currentTheme = document.body.classList.contains("light-mode")
          ? "light"
          : "dark";

        localStorage.setItem("portfolio-theme", currentTheme);
        updateThemeButton();
      });

      /* MOBILE NAVIGATION */

      const menuToggle = document.getElementById("menuToggle");
      const navLinks = document.getElementById("navLinks");

      menuToggle?.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("active")) {
          icon.classList.replace("fa-bars", "fa-xmark");
        } else {
          icon.classList.replace("fa-xmark", "fa-bars");
        }
      });

      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");

          const icon = menuToggle.querySelector("i");
          icon.classList.replace("fa-xmark", "fa-bars");
        });
      });

      /* TYPING ANIMATION */

      const typingText = document.getElementById("typingText");
      const words = [
        "Web Developer",
        "Computer Science Student",
        "UI / UX Enthusiast",
        "Creative Designer",
      ];

      let wordIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function typeEffect() {
        const currentWord = words[wordIndex];

        charIndex += deleting ? -1 : 1;
        typingText.textContent = currentWord.substring(0, charIndex);

        let delay = deleting ? 55 : 100;

        if (!deleting && charIndex === currentWord.length) {
          deleting = true;
          delay = 1500;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 400;
        }

        setTimeout(typeEffect, delay);
      }

      if (typingText) typeEffect();

      /* SCROLL REVEAL */

      const revealElements = document.querySelectorAll(".reveal");

      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );

      revealElements.forEach((element) => revealObserver.observe(element));

      /* SKILL BAR ANIMATION */

      const skillSection = document.getElementById("skills");
      let skillsAnimated = false;

      const skillObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !skillsAnimated) {
              document.querySelectorAll(".skill-level span").forEach((bar) => {
                bar.style.width = bar.dataset.width;
              });

              skillsAnimated = true;
            }
          });
        },
        { threshold: 0.2 },
      );

      if (skillSection) skillObserver.observe(skillSection);

      /* ACTIVE NAVIGATION */

      const sections = document.querySelectorAll("section[id]");
      const navItems = document.querySelectorAll(".nav-links a");

      function updateActiveNav() {
        let currentSection = "";

        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 160;
          const sectionHeight = section.offsetHeight;

          if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
          ) {
            currentSection = section.id;
          }
        });

        navItems.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection,
          );
        });
      }

      window.addEventListener("scroll", updateActiveNav);

      /* ROBOT EYES FOLLOW THE CURSOR */

      const robotStage = document.getElementById("robotStage");
      const robotHead = document.getElementById("robotHead");
      const leftEye = document.getElementById("leftEye");
      const rightEye = document.getElementById("rightEye");

      let pointerX = window.innerWidth / 2;
      let pointerY = window.innerHeight / 2;

      window.addEventListener("mousemove", (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
      });

      window.addEventListener(
        "touchmove",
        (event) => {
          if (event.touches.length > 0) {
            pointerX = event.touches[0].clientX;
            pointerY = event.touches[0].clientY;
          }
        },
        { passive: true },
      );

      function updateRobotEyes() {
        const rect = robotStage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = pointerX - centerX;
        const deltaY = pointerY - centerY;

        const eyeX = Math.max(-10, Math.min(10, deltaX / 30));
        const eyeY = Math.max(-10, Math.min(10, deltaY / 30));

        leftEye.setAttribute("transform", `translate(${eyeX} ${eyeY})`);
        rightEye.setAttribute("transform", `translate(${eyeX} ${eyeY})`);

        const rotateY = Math.max(-8, Math.min(8, deltaX / 60));
        const rotateX = Math.max(-6, Math.min(6, -deltaY / 70));

        robotHead.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        requestAnimationFrame(updateRobotEyes);
      }

      if (robotStage && robotHead && leftEye && rightEye) updateRobotEyes();

      /* ROBOT BACKGROUND VISIBILITY */

      function updateRobotVisibility() {
        const scrollPosition = window.scrollY;
        const isMobile = window.innerWidth <= 700;
        const baseOpacity = isMobile ? 0.12 : 0.2;
        const minimumOpacity = isMobile ? 0.07 : 0.1;

        robotStage.style.opacity = Math.max(
          minimumOpacity,
          baseOpacity - scrollPosition / 9000,
        );
      }

      window.addEventListener("scroll", updateRobotVisibility);
      window.addEventListener("resize", updateRobotVisibility);
      updateRobotVisibility();

      /* PARTICLE BACKGROUND */

      const canvas = document.getElementById("particleCanvas");
      const ctx = canvas?.getContext("2d");

      let particles = [];
      let canvasWidth = 0;
      let canvasHeight = 0;

      function resizeCanvas() {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;

        canvas.width = canvasWidth * pixelRatio;
        canvas.height = canvasHeight * pixelRatio;
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        createParticles();
      }

      class Particle {
        constructor() {
          this.x = Math.random() * canvasWidth;
          this.y = Math.random() * canvasHeight;
          this.size = Math.random() * 2 + 0.5;
          this.speedX = (Math.random() - 0.5) * 0.35;
          this.speedY = (Math.random() - 0.5) * 0.35;
          this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
          if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
          ctx.fill();
        }
      }

      function createParticles() {
        particles = [];

        const count = Math.min(
          90,
          Math.floor((canvasWidth * canvasHeight) / 14000),
        );

        for (let i = 0; i < count; i++) {
          particles.push(new Particle());
        }
      }

      function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 115) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 115)})`;
              ctx.lineWidth = 0.7;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      function animateParticles() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        connectParticles();
        requestAnimationFrame(animateParticles);
      }

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
      animateParticles();

      /* PROJECT AND CERTIFICATE SLIDERS */

      function setupSlider(sliderId, previousId, nextId) {
        const slider = document.getElementById(sliderId);
        const previousButton = document.getElementById(previousId);
        const nextButton = document.getElementById(nextId);

        function getScrollDistance() {
          const card = slider.querySelector(":scope > div");

          if (!card) return slider.clientWidth;

          const cardWidth = card.getBoundingClientRect().width;
          const styles = getComputedStyle(slider);
          const gap = parseFloat(styles.columnGap) || 25;

          return cardWidth + gap;
        }

        function updateButtons() {
          const maxScroll = slider.scrollWidth - slider.clientWidth;

          previousButton.disabled = slider.scrollLeft <= 2;
          nextButton.disabled = slider.scrollLeft >= maxScroll - 2;
        }

        previousButton.addEventListener("click", () => {
          slider.scrollBy({
            left: -getScrollDistance(),
            behavior: "smooth",
          });
        });

        nextButton.addEventListener("click", () => {
          slider.scrollBy({
            left: getScrollDistance(),
            behavior: "smooth",
          });
        });

        slider.addEventListener("scroll", updateButtons, { passive: true });
        window.addEventListener("resize", updateButtons);

        updateButtons();
      }

      setupSlider("projectsGrid", "projectsPrev", "projectsNext");
      setupSlider("certificatesGrid", "certificatesPrev", "certificatesNext");

      /* MOUSE WHEEL HORIZONTAL SCROLL */

      document
        .querySelectorAll("#projectsGrid, #certificatesGrid")
        .forEach((slider) => {
          slider.addEventListener(
            "wheel",
            (event) => {
              if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                event.preventDefault();
                slider.scrollBy({
                  left: event.deltaY,
                  behavior: "auto",
                });
              }
            },
            { passive: false },
          );
        });

      /* BACKGROUND MUSIC CONTROL */
      const backgroundMusic = document.getElementById("backgroundMusic");
      const musicToggle = document.getElementById("musicToggle");
      const musicIcon = document.getElementById("musicIcon");
      const musicText = document.getElementById("musicText");

      if (backgroundMusic && musicToggle && musicIcon && musicText) {
        backgroundMusic.volume = 0.25;
        backgroundMusic.loop = true;

        const showMusicState = (isPlaying) => {
          musicToggle.classList.toggle("playing", isPlaying);
          musicIcon.textContent = isPlaying ? "♫" : "♪";
          musicText.textContent = isPlaying ? "Pause Music" : "Play Music";
          musicToggle.setAttribute(
            "aria-label",
            isPlaying ? "Pause background music" : "Play background music",
          );
          musicToggle.setAttribute("aria-pressed", String(isPlaying));
        };

        // Keep the button synchronized with the actual audio state.
        backgroundMusic.addEventListener("play", () => showMusicState(true));
        backgroundMusic.addEventListener("pause", () => showMusicState(false));
        backgroundMusic.addEventListener("ended", () => showMusicState(false));

        backgroundMusic.addEventListener("error", () => {
          showMusicState(false);
          musicText.textContent = "Music Unavailable";
          console.error(
            "Background music could not be loaded. Check that music/background-music.mp3 exists beside index.html.",
            backgroundMusic.error,
          );
        });

        musicToggle.addEventListener("click", async () => {
          if (backgroundMusic.paused) {
            musicText.textContent = "Loading Music...";
            musicToggle.disabled = true;

            try {
              // Explicit user interaction allows playback in modern browsers.
              await backgroundMusic.play();
              showMusicState(true);
            } catch (error) {
              showMusicState(false);
              musicText.textContent = "Tap to Play";
              console.error("Unable to play background music:", error);
            } finally {
              musicToggle.disabled = false;
            }
          } else {
            backgroundMusic.pause();
            showMusicState(false);
          }
        });

        showMusicState(false);
      }

      /* CONTACT FORM */

      const contactForm = document.getElementById("contactForm");

      contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const recipient = "bertconrads@gmail.com";
        const mailSubject = encodeURIComponent(subject);
        const mailBody = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        );

        window.location.href = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;
      });

      /* FOOTER YEAR */

      document.getElementById("currentYear").textContent =
        new Date().getFullYear();
