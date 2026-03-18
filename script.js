const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const hobbyStage = document.querySelector(".hobby-stage");
const hobbyPanels = [...document.querySelectorAll(".hobby-panel")];
const stageTitle = document.querySelector("[data-stage-title]");
const stageText = document.querySelector("[data-stage-text]");

const hobbyContent = {
  cricket: {
    title: "Cricket",
    text: "Strategy, timing, and patience. The motion here follows a swinging bat and a rising shot.",
  },
  badminton: {
    title: "Badminton",
    text: "Quick reactions and elegant footwork. The shuttle cuts upward and the scene becomes lighter and sharper.",
  },
  power: {
    title: "Power Lifting",
    text: "Controlled intensity. The bar climbs steadily as the visual language becomes denser and heavier.",
  },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateHobbyScene() {
  if (!hobbyStage || hobbyPanels.length === 0) {
    return;
  }

  const viewportHeight = window.innerHeight || 1;
  let activeHobby = "cricket";

  hobbyPanels.forEach((panel) => {
    const hobby = panel.dataset.hobby;
    const rect = panel.getBoundingClientRect();
    const start = viewportHeight * 0.75;
    const end = viewportHeight * 0.15;
    const progress = clamp((start - rect.top) / (start - end), 0, 1);

    document.documentElement.style.setProperty(`--${hobby}-progress`, progress.toFixed(3));

    if (rect.top <= viewportHeight * 0.42 && rect.bottom >= viewportHeight * 0.42) {
      activeHobby = hobby;
    }
  });

  hobbyStage.dataset.active = activeHobby;
  stageTitle.textContent = hobbyContent[activeHobby].title;
  stageText.textContent = hobbyContent[activeHobby].text;
}

updateHobbyScene();
window.addEventListener("scroll", updateHobbyScene, { passive: true });
window.addEventListener("resize", updateHobbyScene);

