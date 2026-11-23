(function () {
  const root = document.getElementById("timeline");
  const data = window.TIMELINE || [];

  const el = (tag, attrs, children) => {
    const node = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => {
        if (v == null || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v;
        else node.setAttribute(k, v);
      });
    }
    (children || []).forEach((c) => c && node.appendChild(c));
    return node;
  };

  const lyricBlock = (item, extraClass) => {
    if (!item.quote) return null;
    const p = el("p", { class: "lyric reveal" + (extraClass ? " " + extraClass : "") });
    p.appendChild(document.createTextNode("\u201c" + item.quote + "\u201d"));
    if (item.quoteSong) {
      p.appendChild(el("span", {
        class: "lyric-song",
        text: "\u2014 \u201c" + item.quoteSong + "\u201d"
      }));
    }
    return p;
  };

  const copyBlock = (item, extraClass) => {
    const wrap = el("div", { class: "chapter-copy reveal" + (extraClass ? " " + extraClass : "") });
    if (item.kicker) wrap.appendChild(el("p", { class: "kicker", text: item.kicker }));
    if (item.date) wrap.appendChild(el("p", { class: "date-line", text: item.date }));
    if (item.title) wrap.appendChild(el("h2", { class: "chapter-title", text: item.title }));
    const lyric = lyricBlock(item);
    if (lyric) {
      lyric.classList.remove("reveal");
      wrap.appendChild(lyric);
    }
    if (item.body) wrap.appendChild(el("p", { class: "chapter-body", text: item.body }));
    return wrap;
  };

  const img = (src, alt, extraClass) => {
    const image = el("img", {
      src,
      alt: alt || "",
      loading: "lazy",
      decoding: "async"
    });
    image.addEventListener("error", () => {
      const frame = image.closest(".media-frame");
      if (frame) frame.classList.add("is-missing");
      image.style.display = "none";
    });
    return el("div", { class: "media-frame reveal" + (extraClass ? " " + extraClass : "") }, [image]);
  };

  const videoBlock = (item) => {
    const video = el("video", {
      playsinline: "",
      muted: "",
      loop: "",
      preload: "metadata",
      poster: item.poster || "",
      "aria-label": item.alt || item.title || ""
    });
    video.appendChild(el("source", { src: item.video, type: "video/mp4" }));
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const hint = el("div", { class: "video-hint", text: "Tap to pause" });
    const wrap = el("div", { class: "video-wrap media-frame reveal " + (item.orientation || "") }, [video, hint]);

    const tryPlay = () => {
      const p = video.play();
      if (p && p.catch) p.catch(() => { wrap.classList.add("is-paused"); hint.textContent = "Tap to play"; });
    };

    wrap.addEventListener("click", () => {
      if (video.paused) {
        tryPlay();
        wrap.classList.remove("is-paused");
        hint.textContent = "Tap to pause";
      } else {
        video.pause();
        wrap.classList.add("is-paused");
        hint.textContent = "Tap to play";
      }
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
          tryPlay();
          wrap.classList.remove("is-paused");
          hint.textContent = "Tap to pause";
        } else {
          video.pause();
        }
      });
    }, { threshold: [0, 0.45, 0.75] });
    io.observe(wrap);
    return wrap;
  };

  const stills = (paths, alt, shape) => {
    if (!paths || !paths.length) return null;
    const n = paths.length === 2 ? "two" : "three";
    const shapeClass = shape ? " " + shape : "";
    return el(
      "div",
      { class: "stills " + n + shapeClass },
      paths.map((src, i) => img(src, alt || "", "reveal-delay-" + ((i % 3) + 1)))
    );
  };

  const gallery = (item) => {
    const paths = (item.images || []).filter(Boolean);
    if (!paths.length) return null;
    const row = el(
      "div",
      { class: "gallery" },
      paths.map((src, i) => img(src, item.alt || "", "reveal-delay-" + ((i % 3) + 1)))
    );
    const hint = paths.length > 1 ? el("p", { class: "gallery-hint reveal", text: "Swipe" }) : null;
    const wrap = el("div");
    wrap.appendChild(row);
    if (hint) wrap.appendChild(hint);
    return wrap;
  };

  const render = (item) => {
    if (item.type === "hero") {
      const section = el("section", { class: "hero", id: item.id });
      section.appendChild(el("p", { class: "kicker hero-kicker reveal", text: item.kicker || "Para ti" }));
      section.appendChild(el("h1", { class: "hero-title reveal reveal-delay-1", text: item.title || "Roli" }));
      section.appendChild(el("hr", { class: "hero-rule reveal reveal-delay-2" }));
      if (item.subtitle) {
        section.appendChild(el("p", { class: "hero-sub reveal reveal-delay-2", text: item.subtitle }));
      }
      const lyric = lyricBlock(item, "reveal-delay-2");
      if (lyric) section.appendChild(lyric);
      const cue = el("div", { class: "scroll-cue reveal reveal-delay-3" }, [
        el("div", { text: "Scroll" }),
        el("span", { class: "mouse" })
      ]);
      section.appendChild(cue);
      return section;
    }

    if (item.type === "chapter") {
      const section = el("section", { class: "chapter-head", id: item.id });
      const inner = el("div", { class: "chapter-inner" });
      if (item.num) inner.appendChild(el("p", { class: "chapter-num reveal", text: item.num }));
      if (item.title) inner.appendChild(el("h2", { class: "chapter-title reveal reveal-delay-1", text: item.title }));
      const lyric = lyricBlock(item, "reveal-delay-2");
      if (lyric) inner.appendChild(lyric);
      if (item.body) inner.appendChild(el("p", { class: "chapter-body reveal reveal-delay-2", text: item.body }));
      section.appendChild(inner);
      return section;
    }

    if (item.type === "text") {
      const section = el("section", { class: "chapter text-card", id: item.id });
      const inner = el("div", { class: "chapter-inner" });
      if (item.kicker) inner.appendChild(el("p", { class: "kicker reveal", text: item.kicker }));
      if (item.date) inner.appendChild(el("p", { class: "date-line reveal", text: item.date }));
      if (item.title) inner.appendChild(el("h2", { class: "chapter-title reveal reveal-delay-1", text: item.title }));
      const lyric = lyricBlock(item, "reveal-delay-1");
      if (lyric) inner.appendChild(lyric);
      if (item.body) inner.appendChild(el("p", { class: "chapter-body reveal reveal-delay-2", text: item.body }));
      section.appendChild(inner);
      return section;
    }

    if (item.type === "placeholder") {
      const paths = (item.images || []).filter(Boolean);
      if (paths.length) {
        const section = el("section", { class: "chapter", id: item.id });
        const inner = el("div", { class: "chapter-inner" });
        inner.appendChild(copyBlock(item));
        const g = gallery(item);
        if (g) inner.appendChild(g);
        section.appendChild(inner);
        return section;
      }
      const section = el("section", { class: "chapter tight", id: item.id });
      const card = el("div", { class: "placeholder-card reveal" });
      if (item.kicker) card.appendChild(el("p", { class: "kicker", text: item.kicker }));
      if (item.title) card.appendChild(el("h2", { class: "chapter-title", text: item.title }));
      const lyric = lyricBlock(item);
      if (lyric) {
        lyric.classList.remove("reveal");
        card.appendChild(lyric);
      }
      if (item.body) card.appendChild(el("p", { class: "chapter-body", text: item.body }));
      section.appendChild(card);
      return section;
    }

    if (item.type === "closing") {
      const section = el("section", { class: "chapter closing", id: item.id });
      const inner = el("div", { class: "chapter-inner" });
      if (item.kicker) inner.appendChild(el("p", { class: "kicker reveal", text: item.kicker }));
      if (item.date) inner.appendChild(el("p", { class: "date-line reveal", text: item.date }));
      if (item.title) inner.appendChild(el("h2", { class: "chapter-title reveal reveal-delay-1", text: item.title }));
      inner.appendChild(el("hr", { class: "gold-rule reveal reveal-delay-2" }));
      const lyric = lyricBlock(item, "reveal-delay-2");
      if (lyric) inner.appendChild(lyric);
      if (item.body) inner.appendChild(el("p", { class: "chapter-body reveal reveal-delay-2", text: item.body }));
      const sig = el("div", { class: "signature reveal reveal-delay-3" });
      if (item.signOff) sig.appendChild(el("p", { class: "sign-off", text: item.signOff }));
      if (item.signature) sig.appendChild(el("p", { class: "who", text: item.signature }));
      inner.appendChild(sig);
      section.appendChild(inner);
      return section;
    }

    const section = el("section", { class: "chapter" + (item.theme ? " " + item.theme : ""), id: item.id });
    const inner = el("div", { class: "chapter-inner" + (item.stills && item.stills.length ? " wide" : "") });
    inner.appendChild(copyBlock(item));
    if (item.type === "video") {
      inner.appendChild(videoBlock(item));
      const s = stills(item.stills, item.alt, item.orientation === "square" ? "square" : "");
      if (s) inner.appendChild(s);
    } else if (item.type === "photos" || item.type === "gallery") {
      const g = gallery(item);
      if (g) inner.appendChild(g);
    } else if (item.type === "photo") {
      inner.appendChild(img(item.image, item.alt));
    }
    section.appendChild(inner);
    return section;
  };

  data.forEach((item) => root.appendChild(render(item)));

  const reveal = () => {
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    if (!nodes.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach((n) => io.observe(n));
    document.querySelectorAll(".hero .reveal").forEach((n) => n.classList.add("is-in"));
  };

  reveal();
})();
