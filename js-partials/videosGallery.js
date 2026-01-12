import { videos } from "./videosData.js";

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

  // clicking anywhere on the card opens a lightbox with the video
  card.addEventListener("click", (e) => {
    // avoid opening lightbox when clicking controls
    // avoid opening lightbox when clicking native video controls
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
          if (v) {
            v.play().catch(() => {});
          }
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
      // fallback: open in new tab
      window.open(item.src, "_blank");
    }
  });

  card.appendChild(vid);
  card.appendChild(title);
  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  let container = document.querySelector("#video-gallery");
  if (!container) {
    container = document.createElement("section");
    container.id = "video-gallery";
    container.className = "video-gallery container";
    document.querySelector("main").appendChild(container);
  }

  const grid = document.createElement("div");
  grid.className = "videos-grid";

  videos.forEach((item) => {
    const card = createCard(item);
    grid.appendChild(card);
  });

  container.innerHTML =
    "<h2 class='videos-grid-heading'>Галерея відео, згенерованих штучним інтелектом</h2><p class='videos-grid-paragraph'>На жаль, не кожен вірш у виконанні В. Симоненка було записано та збережено. Проте сучасні технології дозволяють створити декламацію вірша.</p>";
  container.appendChild(grid);
});

export {};
