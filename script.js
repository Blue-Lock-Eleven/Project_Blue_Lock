// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  const navLinks = navMenu.querySelectorAll(".nav-link");

  const toggleMenu = (isOpenForced) => {
    const shouldOpen =
      typeof isOpenForced === "boolean"
        ? isOpenForced
        : !navMenu.classList.contains("active");

    navMenu.classList.toggle("active", shouldOpen);
    hamburger.classList.toggle("active", shouldOpen);
    document.body.classList.toggle("menu-open", shouldOpen);
    hamburger.setAttribute("aria-expanded", shouldOpen);
  };

  hamburger.setAttribute("role", "button");
  hamburger.setAttribute("tabindex", "0");
  hamburger.setAttribute("aria-label", "Toggle navigation menu");
  hamburger.setAttribute("aria-expanded", "false");

  hamburger.addEventListener("click", () => toggleMenu());
  hamburger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      toggleMenu(false);
    }
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Typing Animation for Terminal
const typingText = document.querySelector(".typing-text");
const messages = [
  "Establishing secure connection...",
  "Scanning for vulnerabilities...",
  "Exploiting system defenses...",
  "Access granted.",
  "Welcome to Blue Lock Eleven.",
  "Initialization complete.",
];

let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentMessage = messages[messageIndex];

  if (isDeleting) {
    typingText.textContent = currentMessage.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentMessage.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentMessage.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    messageIndex = (messageIndex + 1) % messages.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
if (typingText) {
  typeWriter();
}

// Animated Counter for Stats
function animateCounter(element, target, duration = 800) {
  let start = 0;
  const increment = target / (duration / 10);

  const shouldAddPlus = element.textContent.includes("+");

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (shouldAddPlus ? "+" : "");
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + (shouldAddPlus ? "+" : "");
    }
  }, 10);
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      // Animate counters when stats section is visible
      if (entry.target.classList.contains("stat-number")) {
        const target = parseInt(entry.target.getAttribute("data-target"));
        if (!entry.target.classList.contains("animated")) {
          entry.target.classList.add("animated");
          animateCounter(entry.target, target);
        }
      }

      // Animate text decryption
      if (
        entry.target.classList.contains("about-description") ||
        entry.target.classList.contains("card-description") ||
        entry.target.classList.contains("achievement-description")
      ) {
        if (!entry.target.classList.contains("animated")) {
          entry.target.classList.add("animated");
          const text = entry.target.textContent;
          entry.target.textContent = "";
          for (let i = 0; i < text.length; i++) {
            const span = document.createElement("span");
            span.textContent = text[i];
            span.style.animation = `text-decryption 0.5s ease ${
              i * 0.01
            }s forwards`;
            span.style.opacity = "0";
            entry.target.appendChild(span);
          }
        }
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".specialty-card, .stat-item, .about-content, .team-showcase, .contact-content, .about-description, .card-description, .achievement-description"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Observe stat numbers
document.querySelectorAll(".stat-number").forEach((el) => {
  observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(0, 17, 34, 0.95)";
    navbar.style.boxShadow = "0 5px 20px rgba(0, 212, 255, 0.3)";
  } else {
    navbar.style.background = "rgba(0, 17, 34, 0.9)";
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = Math.max(
      0.3,
      1 - scrolled / window.innerHeight
    );
  }
});

// Glitch effect on mouse move for hero title
const heroTitle = document.querySelector(".hero-title");
if (heroTitle) {
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    heroTitle.style.transform = `translate(${mouseX * 10 - 5}px, ${
      mouseY * 10 - 5
    }px)`;
  });
}

// Form submission handler
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalText = submitBtn.querySelector("span").textContent;

    submitBtn.querySelector("span").textContent = "SENDING...";
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      submitBtn.querySelector("span").textContent = "MESSAGE SENT!";
      submitBtn.style.background = "var(--primary-blue)";
      submitBtn.style.color = "var(--darker-blue)";

      setTimeout(() => {
        submitBtn.querySelector("span").textContent = originalText;
        submitBtn.style.opacity = "1";
        submitBtn.style.background = "transparent";
        submitBtn.style.color = "var(--primary-blue)";
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// Add particle interaction
document.addEventListener("mousemove", (e) => {
  const particles = document.querySelector(".particles");
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  if (particles) {
    particles.style.backgroundPosition = `${x}% ${y}%`;
  }
});

// Card hover sound effect (visual only)
document.querySelectorAll(".specialty-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transition = "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
  });
});

// Add ripple effect to buttons
document.querySelectorAll(".submit-btn, .nav-link").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 212, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Copy username buttons
const copyButtons = document.querySelectorAll(".copy-username-btn");
if (copyButtons.length) {
  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-1000px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const username = button.getAttribute("data-copy");
      if (!username) return;
      const originalText = button.textContent.trim();
      try {
        await copyText(username);
        button.textContent = "COPIED!";
        button.classList.add("copied");
      } catch (err) {
        button.textContent = "FAILED";
        console.error("Copy failed:", err);
      } finally {
        button.disabled = true;
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove("copied");
          button.disabled = false;
        }, 1600);
      }
    });
  });
}

// Lazy load images
const images = document.querySelectorAll("img");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = "0";
      img.style.transition = "opacity 0.5s ease";

      if (img.complete) {
        img.style.opacity = "1";
      } else {
        img.addEventListener("load", () => {
          img.style.opacity = "1";
        });
      }

      observer.unobserve(img);
    }
  });
});

images.forEach((img) => imageObserver.observe(img));

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Console easter egg
console.log(
  "%c⚽ BLUE LOCK ELEVEN ⚽",
  "color: #00D4FF; font-size: 30px; font-weight: bold; text-shadow: 0 0 10px #00D4FF;"
);
console.log(
  "%cCTF Team | Professional Hackers",
  "color: #00FFFF; font-size: 14px;"
);
console.log(
  "%cLooking for talent? Contact us!",
  "color: #B0B0B0; font-size: 12px;"
);

// --- Members Page Functionality ---
document.addEventListener("DOMContentLoaded", () => {
  const fieldContainer = document.getElementById("members-field-container");
  const reserveContainer = document.getElementById("members-reserve-container");
  if (!fieldContainer && !reserveContainer) return;

  const closeAllCards = () => {
    document.querySelectorAll(".member-card-wrapper").forEach((wrapper) => {
      wrapper.classList.remove("clicked");
      wrapper.setAttribute("aria-pressed", "false");
    });
  };

  const players = [
    // GK row - Gagamaru (1)
    // 1 GK
    {
      name: "Gagamaru (bbh@@yu)",
      specialty: "Web Exploitation",
      number: 1,
      avatar: "card.png",
      stats: ["Web Exploitation"],
      portfolio: "#",
      position: { x: "50%", y: "15%" },
    },

    // 3 DEFENDERS
    {
      name: "Niko (parshun)",
      specialty: "REV",
      number: 2,
      avatar: "card.png",
      stats: ["REV"],
      portfolio: "https://gajendramahato.com.np/",
      position: { x: "30%", y: "30%" },
    },
    {
      name: "Reo (thatguysbroke)",
      specialty: "Misc",
      number: 3,
      avatar: "card.png",
      stats: ["Misc", "Web Exploitation"],
      portfolio: "https://yunchohang.github.io/",
      position: { x: "50%", y: "30%" },
    },
    {
      name: "Aryu (shelovesme)",
      specialty: "web3",
      number: 5,
      avatar: "card.png",
      stats: ["web3", "crypto", "PWN"],
      portfolio: "#",
      position: { x: "70%", y: "30%" },
    },

    // 4 MIDFIELDERS
    {
      name: "Barou (luffy)",
      specialty: "Web Exploitation",
      number: 9,
      avatar: "card.png",
      stats: ["Web Exploitation"],
      portfolio: "https://yunchohang.github.io/",
      position: { x: "20%", y: "50%" },
    },
    {
      name: "Kaiser (sahsmit)",
      specialty: "Web Exploitation",
      number: 17,
      avatar: "card.png",
      stats: ["Web Exploitation"],
      portfolio: "#",
      position: { x: "40%", y: "50%" },
    },
    {
      name: "Shidou (nullpi)",
      specialty: "CRYPTO",
      number: 16,
      avatar: "card.png",
      stats: ["Web", "PWN", "REV"],
      portfolio: "https://gajendramahato.com.np/",
      position: { x: "60%", y: "50%" },
    },
    {
      name: "Bachira (PWNspirit)",
      specialty: "PWN",
      number: 8,
      avatar: "card.png",
      stats: ["PWN", "Web Exploitation"],
      portfolio: "https://PWNspirit.xyz/",
      position: { x: "80%", y: "50%" },
    },

    // 2 FORWARDS
    {
      name: "Nagi (werewolf)",
      specialty: "Web Exploitation",
      number: 7,
      avatar: "card.png",
      stats: ["Web Exploitation", "OSINT"],
      portfolio: "https://w3rew0lf11.github.io/w3rew0lf/",
      position: { x: "40%", y: "70%" },
    },
    {
      name: "Isagi (Iconic_Whisper)",
      specialty: "PWN",
      number: 11,
      avatar: "card.png",
      stats: ["REV", "PWN"],
      portfolio: "https://12bijaya.github.io/portfolio/",
      position: { x: "60%", y: "70%" },
    },

    // 1 STRIKER
    {
      name: "Rin (0xthem7)",
      specialty: "WEB / BUG HUNTING",
      number: 10,
      avatar: "card.png",
      stats: ["Web Exploitation", "Bug Hunting"],
      portfolio: "https://himansu.com.np/",
      position: { x: "50%", y: "85%" },
    },
    // Bench / reserves
    {
      name: "Yukimiya (gressye)",
      specialty: "OSINT",
      number: 8,
      avatar: "card.png",
      stats: ["OSINT", "Bug Hunter"],
      portfolio: "#",
      showInPanel: true,
      panelOnly: true,
    },
    {
      name: "Raichi (404ninja)",
      specialty: "Crypto",
      number: 12,
      avatar: "card.png",
      stats: ["Crypto"],
      portfolio: "#",
      showInPanel: true,
      panelOnly: true,
    },
    {
      name: "Chigiri (kamisama)",
      specialty: "Web",
      number: 4,
      avatar: "card.png",
      stats: ["Web"],
      portfolio: "#",
      showInPanel: true,
      panelOnly: true,
    },
    {
      name: "Ego (c15c01337)",
      specialty: "Coach",
      number: "★",
      avatar: "card.png",
      stats: ["Mastermind", "Strategy"],
      portfolio: "#",
      showInPanel: true,
      panelOnly: true,
    },
  ];

  const createCard = (player, options = {}) => {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "member-card-wrapper";
    if (player.position && options.isField) {
      cardWrapper.style.setProperty("--position-x", player.position.x);
      cardWrapper.style.setProperty("--position-y", player.position.y);
    }

    cardWrapper.setAttribute("tabindex", "0");
    cardWrapper.setAttribute("role", "button");
    cardWrapper.setAttribute("aria-pressed", "false");

    const card = document.createElement("div");
    card.className = "member-card";

    // Card Front
    const cardFront = document.createElement("div");
    cardFront.className = "card-front";
    cardFront.innerHTML = `
            <span class="member-number">${player.number}</span>
            <img src="${player.avatar}" alt="${player.name}" class="member-avatar">
        `;

    // Card Back
    const cardBack = document.createElement("div");
    cardBack.className = "card-back";
    const statsHTML = player.stats
      .map((stat) => `<div class="stat-badge">${stat}</div>`)
      .join("");
    cardBack.innerHTML = `
            <h3 class="member-name">${player.name}</h3>
            <p class="member-specialty">${player.specialty}</p>
            ${
              player.portfolio
                ? `<a href="${player.portfolio}" target="_blank" rel="noopener noreferrer" class="member-portfolio-link">PORTFOLIO</a>`
                : ""
            }
            <div class="member-stats">${statsHTML}</div>
        `;

    card.appendChild(cardFront);
    card.appendChild(cardBack);
    cardWrapper.appendChild(card);
    return cardWrapper;
  };

  const attachCardInteractions = (cardWrapper) => {
    const toggleCard = () => {
      const isClicked = cardWrapper.classList.contains("clicked");

      document.querySelectorAll(".member-card-wrapper").forEach((other) => {
        if (other !== cardWrapper) {
          other.classList.remove("clicked");
          other.setAttribute("aria-pressed", "false");
        }
      });

      cardWrapper.classList.toggle("clicked", !isClicked);
      cardWrapper.setAttribute("aria-pressed", String(!isClicked));
    };

    const handlePointer = (event) => {
      if (event.target.closest(".member-portfolio-link")) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      toggleCard();
    };

    cardWrapper.addEventListener("click", handlePointer);
    cardWrapper.addEventListener("touchstart", handlePointer, {
      passive: false,
    });
    cardWrapper.addEventListener("keypress", (event) => {
      if (event.target.closest(".member-portfolio-link")) {
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        handlePointer(event);
      }
    });
  };

  const fieldPlayers = players.filter(
    (player) => player.position && !player.panelOnly
  );
  const reservePlayers = players.filter((player) => player.showInPanel);

  if (fieldContainer) {
    fieldPlayers.forEach((player) => {
      const card = createCard(player, { isField: true });
      fieldContainer.appendChild(card);
      attachCardInteractions(card);
    });
  }

  if (reserveContainer) {
    reservePlayers.forEach((player) => {
      const card = createCard(player);
      reserveContainer.appendChild(card);
      attachCardInteractions(card);
    });
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".member-card-wrapper")) {
      closeAllCards();
    }
  });

  // Close all cards when clicking on the background
  const ground = document.querySelector(".football-ground-container");
  if (ground) {
    ground.addEventListener("click", function (e) {
      if (e.target === this || e.target.classList.contains("football-ground")) {
        closeAllCards();
      }
    });
  }
});
