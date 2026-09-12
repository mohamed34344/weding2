/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 1200);
});

/* =====================================================
   COUNTDOWN
===================================================== */

// CHANGE: تاريخ الفرح
const weddingDate = new Date("October 3, 2026 22:00:00").getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();

  const distance = weddingDate - now;

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysElement.textContent = String(days).padStart(2, "0");

  hoursElement.textContent = String(hours).padStart(2, "0");

  minutesElement.textContent = String(minutes).padStart(2, "0");

  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);

/* =====================================================
   SCROLL REVEAL
===================================================== */

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
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =====================================================
   MUSIC
===================================================== */

const music = document.getElementById("weddingMusic");

const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      await music.play();

      musicPlaying = true;

      musicBtn.classList.add("playing");

      musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
      music.pause();

      musicPlaying = false;

      musicBtn.classList.remove("playing");

      musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    }
  } catch (error) {
    console.log("Music could not be played:", error);
  }
});

/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

galleryImages.forEach((image) => {
  image.parentElement.addEventListener("click", () => {
    lightboxImage.src = image.src;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
  });
});

function closeGallery() {
  lightbox.classList.remove("active");

  document.body.style.overflow = "";
}

closeLightbox.addEventListener("click", closeGallery);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeGallery();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeGallery();
  }
});

/* =====================================================
   RSVP
===================================================== */

const wishForm = document.getElementById("wishForm");
const wishName = document.getElementById("wishName");
const wishMessage = document.getElementById("wishMessage");
const wishesList = document.getElementById("wishesList");
/* ===================================================== LOAD SAVED WISHES ===================================================== */ let wishes =
  JSON.parse(localStorage.getItem("weddingWishes")) || [];
/* ===================================================== DISPLAY WISHES ===================================================== */ function displayWishes() {
  wishesList.innerHTML = "";
  if (wishes.length === 0) {
    wishesList.innerHTML = ` <div class="empty-wishes"> Be the first to leave a beautiful wish ❤️ </div> `;
    return;
  }
  wishes.forEach((wish) => {
    const firstLetter = wish.name.charAt(0).toUpperCase();
    const wishCard = document.createElement("div");
    wishCard.className = "wish-card";
    wishCard.innerHTML = ` <div class="wish-author"> <div class="wish-avatar"> ${firstLetter} </div> <h4> ${escapeHTML(wish.name)} </h4> </div> <p class="wish-message"> ${escapeHTML(wish.message)} </p> `;
    wishesList.appendChild(wishCard);
  });
}
/* ===================================================== ADD NEW WISH ===================================================== */ wishForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    const name = wishName.value.trim();
    const message = wishMessage.value.trim();
    if (!name || !message) {
      return;
    }
    const newWish = {
      name: name,
      message: message,
      date: new Date().toISOString(),
    };
    wishes.unshift(newWish);
    localStorage.setItem("weddingWishes", JSON.stringify(wishes));
    wishForm.reset();
    displayWishes();
    showToast("Your beautiful wish has been added ❤️");
  },
);
/* ===================================================== PROTECT HTML ===================================================== */ function escapeHTML(
  text,
) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
/* ===================================================== TOAST ===================================================== */ function showToast(
  message,
) {
  const toast = document.getElementById("toast");
  const toastText = toast.querySelector("span");
  toastText.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
displayWishes();

/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/* =====================================================
   PARALLAX HERO
===================================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY < window.innerHeight) {
    hero.style.backgroundPosition = `center ${scrollY * 0.25}px`;
  }
});

/* =====================================================
   MOUSE EFFECT - DESKTOP
===================================================== */

if (window.innerWidth > 800) {
  const heroContent = document.querySelector(".hero-content");

  document.addEventListener("mousemove", (event) => {
    const x = (window.innerWidth / 2 - event.clientX) / 80;

    const y = (window.innerHeight / 2 - event.clientY) / 80;

    heroContent.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/* =====================================================
   ADD RANDOM HEARTS
===================================================== */

function createHeart() {
  const heart = document.createElement("span");

  heart.innerHTML = "♥";

  heart.style.position = "fixed";

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.bottom = "-30px";

  heart.style.color = "rgba(180,151,90,.25)";

  heart.style.fontSize = Math.random() * 15 + 8 + "px";

  heart.style.pointerEvents = "none";

  heart.style.zIndex = "1";

  const duration = Math.random() * 8 + 8;

  heart.style.animation = `floatHeart ${duration}s linear forwards`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

setInterval(createHeart, 1800);
