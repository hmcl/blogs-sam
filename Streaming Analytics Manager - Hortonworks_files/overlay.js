(function() {
  function showOverlay(lookbookUrl, overlayWidth, overlayHeight) {
    if (!lookbookUrl) {
      return false;
    }

    var queryStringDelimiter = "?";
    var queryString = "lb-mode=overlay";

    if (lookbookUrl.indexOf("?") !== -1) {
      queryStringDelimiter = "&";
    }
    if (overlayWidth) {
      queryString += "&lb-width=" + encodeURIComponent(overlayWidth);
    }
    if (overlayHeight) {
      queryString += "&lb-height=" + encodeURIComponent(overlayHeight);
    }

    var iframeSrc = lookbookUrl + queryStringDelimiter + queryString;

    var iframe = document.createElement("iframe");
    iframe.className = "lookbook-overlay-content";
    iframe.src = iframeSrc;
    iframe.setAttribute("webkitallowfullscreen", true);
    iframe.setAttribute("mozallowfullscreen", true);
    iframe.setAttribute("allowfullscreen", true);

    var closeButton = document.createElement("div");
    closeButton.className = "lookbook-overlay-close";
    closeButton.innerHTML = "<span>&times;</span>";
    closeButton.addEventListener("click", closeOverlay);

    var overlay = document.createElement("div");
    overlay.className = "lookbook-overlay";
    overlay.appendChild(closeButton);
    overlay.appendChild(iframe);

    document.body.appendChild(overlay);
  }

  function closeOverlay(event) {
    var overlays = document.getElementsByClassName("lookbook-overlay");

    if (overlays.length > 0) {
      for (var i = 0; i < overlays.length; i += 1) {
        overlays[i].parentNode.removeChild(overlays[i]);
      }
    }

    event.target.removeEventListener("click", closeOverlay);
  }

  function validateUnits(units) {
    var i = new Image();
    i.style.width = units;
    return i.style.width;
  }

  function closest(el, selector) {
    const matchesSelector =
      el.matches ||
      el.webkitMatchesSelector ||
      el.mozMatchesSelector ||
      el.msMatchesSelector;

    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      } else {
        el = el.parentElement;
      }
    }
    return null;
  }

  document.addEventListener("click", function(event) {
    var attribute = "data-lookbook-overlay-href";
    var target = closest(event.target, "[" + attribute + "]");
    if (target) {
      var lookbookUrl = target.getAttribute(attribute);
      var overlayWidth = validateUnits(
        target.getAttribute("data-lookbook-overlay-width")
      );
      var overlayHeight = validateUnits(
        target.getAttribute("data-lookbook-overlay-height")
      );
      if (target.tagName === "A" || target.tagName === "AREA") {
        event.preventDefault();
      }
      showOverlay(lookbookUrl, overlayWidth, overlayHeight);
    }
  });
})();
