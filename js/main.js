(function () {
  var C = window.WHSTO_CONFIG || {};
  var de = document.documentElement;
  function setLang(l) {
    if (l !== "ar" && l !== "en") l = "ar";
    de.lang = l; de.dir = l === "ar" ? "rtl" : "ltr";
    try { localStorage.setItem("whsto_lang", l); } catch (e) {}
    document.querySelectorAll(".lang button").forEach(function (b) { b.classList.toggle("on", b.dataset.l === l); });
    var t = document.querySelector("title[data-ar]");
    if (t) document.title = t.getAttribute("data-" + l);
  }
  var saved = null;
  try { saved = localStorage.getItem("whsto_lang"); } catch (e) {}
  if (saved !== "en") saved = "ar";
  setLang(saved);
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".lang button"); if (b) setLang(b.dataset.l);
    if (e.target.closest(".burger")) document.querySelector(".nav").classList.toggle("on");
    if (e.target.closest(".nav a")) document.querySelector(".nav").classList.remove("on");
    var m = e.target.closest("[data-modal]");
    if (m) { var el = document.getElementById(m.dataset.modal); if (el) { el.classList.add("on"); var v = el.querySelector("video"); if (v) { v.currentTime = 0; v.play().catch(function () {}); } } }
    if (e.target.closest(".mod button") || e.target.classList.contains("mod")) {
      var md = e.target.closest(".mod") || e.target; md.classList.remove("on"); var vv = md.querySelector("video"); if (vv) vv.pause();
    }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") document.querySelectorAll(".mod.on").forEach(function (m) { m.classList.remove("on"); var v = m.querySelector("video"); if (v) v.pause(); }); });

  // config-driven bits
  var ct = C.contact || {};
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var k = el.dataset.cfg, v = "";
    if (k === "email") { v = ct.email; if (v) { el.href = "mailto:" + v; var s = el.querySelector("span"); if (s) s.textContent = v; } }
    if (k === "whatsapp") { v = ct.whatsapp; if (v) { el.href = /^https?:/i.test(v) ? v : "https://wa.me/" + v.replace(/\D/g, ""); var s2 = el.querySelector("span"); if (s2) s2.textContent = "WhatsApp Business"; } }
    if (k === "tiktok") { v = ct.tiktok; if (v) { el.href = v; var s4 = el.querySelector("span"); if (s4) s4.textContent = "@" + v.split("@").pop().replace(/\/$/, ""); } }
    if (k === "instagram") { v = ct.instagram; if (v) { el.href = v; var s3 = el.querySelector("span"); if (s3) s3.textContent = "@" + v.split("/").filter(Boolean).pop(); } }
    if (k === "facebook") { v = ct.facebook; if (v) { el.href = v; var s5 = el.querySelector("span"); if (s5) s5.textContent = "@" + v.split("/").filter(Boolean).pop(); } }
    if (!v) el.style.display = "none";
  });
  document.querySelectorAll("[data-mail]").forEach(function (el) { if (ct.email) { el.href = "mailto:" + ct.email; el.textContent = ct.email; } });
  var soc = document.getElementById("soc");
  var ICONS = {
    tiktok: '<path d="M19.6 6.7a4.9 4.9 0 0 1-3-1.6A4.9 4.9 0 0 1 15.4 2h-3.2v13.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.3a6 6 0 1 0 5.1 5.9V8.6a8 8 0 0 0 4.7 1.5V6.9z"/>',
    instagram: '<path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.2-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/>',
    facebook: '<path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/>',
    whatsapp: '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.2.3 0 .6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/>'
  };
  var NAMES = { tiktok: "TikTok", instagram: "Instagram", facebook: "Facebook", whatsapp: "WhatsApp" };
  if (soc && C.social) {
    ["tiktok", "instagram", "facebook", "whatsapp"].forEach(function (k) {
      var u = C.social[k]; if (!u) return;
      var a = document.createElement("a"); a.href = u; a.target = "_blank"; a.rel = "noopener"; a.title = NAMES[k]; a.setAttribute("aria-label", NAMES[k]);
      a.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">' + ICONS[k] + "</svg>";
      soc.appendChild(a);
    });
  }
  document.querySelectorAll(".st[data-app]").forEach(function (el) {
    var x = C.status && C.status[el.dataset.app]; if (!x) { el.style.display = "none"; return; }
    el.innerHTML = "<span class='ar'></span><span class='en'></span>"; el.children[0].textContent = x.ar; el.children[1].textContent = x.en;
  });
  var st = document.getElementById("stats");
  if (st && C.stats) C.stats.forEach(function (s) { var d = document.createElement("div"); d.innerHTML = "<b></b><span class='ar'></span><span class='en'></span>"; d.children[0].textContent = s.n; d.children[1].textContent = s.ar; d.children[2].textContent = s.en; st.appendChild(d); });
  document.querySelectorAll("[data-store]").forEach(function (el) {
    var p = el.dataset.store.split("."), u = C.stores && C.stores[p[0]] && C.stores[p[0]][p[1]];
    if (u) { el.href = u; el.style.display = ""; } else el.style.display = "none";
  });
  // reveal on scroll
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("on"); io.unobserve(x.target); } }); }, { threshold: .12 }) : null;
  document.querySelectorAll(".rv").forEach(function (el) { if (io) io.observe(el); else el.classList.add("on"); });
})();
