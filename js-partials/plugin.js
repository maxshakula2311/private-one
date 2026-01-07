// Attempt to import generated videos data and expose as `window.videos`.
// Run `node scripts/generateVideosList.js` to regenerate `js-partials/videosData.js` when you add files to `videos/`.
(async function () {
  try {
    const mod = await import("./videosData.js");
    window.videos = Array.isArray(mod.videos) ? mod.videos : [];
  } catch (err) {
    window.videos = [];
  }
})();
