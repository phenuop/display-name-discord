(function () {
  var ID = "dns-feedback";
  var KEY = "dns-feedback:";

  function getVote(path) {
    try { return localStorage.getItem(KEY + path); } catch (e) { return null; }
  }

  function setVote(path, vote) {
    try { localStorage.setItem(KEY + path, vote); } catch (e) {}
  }

  // Lucide icons (lucide.dev, ISC license): thumbs-up and thumbs-down
  var ICONS = {
    up: [
      "M7 10v12",
      "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
    ],
    down: [
      "M17 14V2",
      "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"
    ]
  };

  function svgIcon(name) {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    ICONS[name].forEach(function (d) {
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", d);
      svg.appendChild(p);
    });
    return svg;
  }

  function button(label, icon, hover) {
    var b = document.createElement("button");
    b.type = "button";
    b.appendChild(svgIcon(icon));
    var t = document.createElement("span");
    t.textContent = label;
    b.appendChild(t);
    b.style.cssText =
      "display:inline-flex;align-items:center;gap:6px;" +
      "background:#2B2D31;color:#B5BAC1;border:1px solid #3F4147;border-radius:6px;" +
      "padding:6px 14px;font-size:14px;cursor:pointer;font-family:inherit;transition:all .15s;";
    b.onmouseenter = function () {
      b.style.background = "#35373C";
      b.style.color = hover;
      b.style.borderColor = hover;
    };
    b.onmouseleave = function () {
      b.style.background = "#2B2D31";
      b.style.color = "#B5BAC1";
      b.style.borderColor = "#3F4147";
    };
    return b;
  }

  function render(box, path) {
    while (box.firstChild) box.removeChild(box.firstChild);

    var vote = getVote(path);
    var text = document.createElement("span");
    text.style.cssText = "font-size:14px;color:#B5BAC1;margin-right:8px;";

    if (vote) {
      text.textContent = vote === "yes"
        ? "Thanks! Glad this page helped."
        : "Thanks for letting us know.";
      box.appendChild(text);
      return;
    }

    text.textContent = "Was this page helpful?";
    var yes = button("Yes", "\uD83D\uDC4D");
    var no = button("No", "\uD83D\uDC4E");
    yes.onclick = function () { setVote(path, "yes"); render(box, path); };
    no.onclick = function () { setVote(path, "no"); render(box, path); };

    box.appendChild(text);
    box.appendChild(yes);
    box.appendChild(no);
  }

  function mount() {
    var host =
      document.querySelector("#content") ||
      document.querySelector("mdx-content") ||
      document.querySelector("#content-area");
    if (!host) return;

    var path = window.location.pathname;
    var box = document.getElementById(ID);

    if (box && box.parentNode === host && box.getAttribute("data-path") === path) return;
    if (box) box.parentNode.removeChild(box);

    box = document.createElement("div");
    box.id = ID;
    box.setAttribute("data-path", path);
    box.style.cssText =
      "display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:48px;" +
      "padding-top:16px;border-top:1px solid #3F4147;";
    host.appendChild(box);
    render(box, path);
  }

  mount();
  new MutationObserver(function () { mount(); })
    .observe(document.body, { childList: true, subtree: true });
})();
(function () {
  var ID = "dns-feedback";
  var KEY = "dns-feedback:";

  function getVote(path) {
    try { return localStorage.getItem(KEY + path); } catch (e) { return null; }
  }

  function setVote(path, vote) {
    try { localStorage.setItem(KEY + path, vote); } catch (e) {}
  }

  function button(label, icon) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = icon + " " + label;
    b.style.cssText =
      "background:#2B2D31;color:#DBDEE1;border:1px solid #3F4147;border-radius:6px;" +
      "padding:6px 14px;font-size:14px;cursor:pointer;font-family:inherit;";
    b.onmouseenter = function () { b.style.background = "#35373C"; };
    b.onmouseleave = function () { b.style.background = "#2B2D31"; };
    return b;
  }

  function render(box, path) {
    while (box.firstChild) box.removeChild(box.firstChild);

    var vote = getVote(path);
    var text = document.createElement("span");
    text.style.cssText = "font-size:14px;color:#B5BAC1;margin-right:8px;";

    if (vote) {
      text.textContent = vote === "yes"
        ? "Thanks! Glad this page helped."
        : "Thanks for letting us know.";
      box.appendChild(text);
      return;
    }

    text.textContent = "Was this page helpful?";
    var yes = button("Yes", "up", "#23A55A");
    var no = button("No", "down", "#F23F43");
    yes.onclick = function () { setVote(path, "yes"); render(box, path); };
    no.onclick = function () { setVote(path, "no"); render(box, path); };

    box.appendChild(text);
    box.appendChild(yes);
    box.appendChild(no);
  }

  function mount() {
    var host =
      document.querySelector("#content") ||
      document.querySelector("mdx-content") ||
      document.querySelector("#content-area");
    if (!host) return;

    var path = window.location.pathname;
    var box = document.getElementById(ID);

    if (box && box.parentNode === host && box.getAttribute("data-path") === path) return;
    if (box) box.parentNode.removeChild(box);

    box = document.createElement("div");
    box.id = ID;
    box.setAttribute("data-path", path);
    box.style.cssText =
      "display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:48px;" +
      "padding-top:16px;border-top:1px solid #3F4147;";
    host.appendChild(box);
    render(box, path);
  }

  mount();
  new MutationObserver(function () { mount(); })
    .observe(document.body, { childList: true, subtree: true });
})();
