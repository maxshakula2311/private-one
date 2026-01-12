import { videos } from "./liveVideosData.js";

function createCard(item) {
  const card = document.createElement("div");
  card.className = "video-card";

  const title = document.createElement("div");
  title.className = "video-title";
  title.textContent = item.name;

  const vid = document.createElement("video");
  vid.src = item.src;
  vid.controls = true;
  vid.preload = "metadata";
  vid.setAttribute("playsinline", "");

  card.addEventListener("click", (e) => {
    if (
      e.target === vid ||
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "INPUT"
    )
      return;
    const markup = `
      <div style="max-width:900px; width:100%;">
        <video src="${item.src}" controls autoplay style="width:100%; height:auto; display:block;" playsinline></video>
      </div>
    `;
    if (
      window.basicLightbox &&
      typeof window.basicLightbox.create === "function"
    ) {
      const instance = window.basicLightbox.create(markup, {
        onShow: (inst) => {
          const v = inst.element().querySelector("video");
          if (v) v.play().catch(() => {});
        },
        onClose: (inst) => {
          const v = inst.element().querySelector("video");
          if (v) {
            try {
              v.pause();
              v.currentTime = 0;
            } catch (e) {}
          }
        },
      });
      instance.show();
    } else {
      window.open(item.src, "_blank");
    }
  });

  card.appendChild(vid);
  card.appendChild(title);
  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  // target user-provided section named 'gallery' if exists, otherwise create '#live-video-gallery'
  let container =
    document.querySelector("#gallery") || document.querySelector(".gallery");
  if (!container) {
    container = document.createElement("section");
    container.id = "live-video-gallery";
    container.className = "video-gallery container";
    document.querySelector("main").appendChild(container);
  } else {
    // ensure the user-provided element uses the same classes as the default gallery
    container.classList.add("video-gallery", "container");
  }

  const grid = document.createElement("div");
  grid.className = "videos-grid";
  videos.forEach((item) => grid.appendChild(createCard(item)));

  container.innerHTML = "<h2 class='live-videos-grid-heading'>Живий голос Василя Симоненка</h2><p class='live-videos-grid-paragraph'>Чи хотіли б Ви почути, як Василь Симоненко читає власні вірші? Дана галерея містить 15 записів живого голосу поета. Можете прослухати та завантажити собі. Увага! Щоб відкрити відео у новому вікні, натисніть на його назву.</p>";
  container.appendChild(grid);
});

export {};
