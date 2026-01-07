document.addEventListener("DOMContentLoaded", function () {
  var front = document.querySelector(".concept > .container > .concept-item");
  var items = Array.from(
    document.querySelectorAll(".concept-items-list .concept-item")
  );

  if (!front || items.length === 0) return;
  front.classList.add("front-cloud");
  items.forEach(function (item, i) {
    item.classList.add("enter-from-top");
    item.style.zIndex = String(20 - i);
    item.style.pointerEvents = "auto";
  });
  var isExpanded = false;
  front.addEventListener("click", function (e) {
    var conceptSection = front.closest(".concept");
    if (!isExpanded) {
      isExpanded = true;
      front.classList.add("clicked");
      if (conceptSection) conceptSection.classList.add("expanded");

      items.forEach(function (item, i) {
        var delay = 140 + i * 160; // ms
        setTimeout(function () {
          item.classList.remove("enter-from-top");
        }, delay);
      });
    } else {
      isExpanded = false;
      front.classList.remove("clicked");
      var rev = items.slice().reverse();
      rev.forEach(function (item, i) {
        var delay = 100 + i * 120;
        setTimeout(function () {
          item.classList.add("enter-from-top");
        }, delay);
      });
      var totalDelay = 100 + (rev.length - 1) * 120 + 700;
      setTimeout(function () {
        if (conceptSection) conceptSection.classList.remove("expanded");
      }, totalDelay);
    }
  });
});
