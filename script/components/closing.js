(function () {
  window.Components = window.Components || {};

  window.Components.closing = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-closing";
      div.innerHTML = `
        <p class="closing-text">${
          section.text || "Okay, now come back and tell me if you liked it."
        }</p>
        <p class="replay-btn" id="replay">${
          section.replayText || "Or click, if you want to watch it again."
        }</p>
        ${section.byeGif ? `
          <div class="tenor-gif-embed" data-postid="12810370250826095008" data-share-method="host" data-aspect-ratio="1.33871" data-width="100%">
            <a href="https://tenor.com/view/bye-waving-goodbye-little-rascals-see-you-gif-12810370250826095008">Bye Waving GIF</a>
            from <a href="https://tenor.com/search/bye-gifs">Bye GIFs</a>
          </div>
        ` : ""}
        <p class="last-smile">:)</p>
      `;
      container.appendChild(div);

      // Tenor replaces the embed after the closing section is added to the DOM.
      if (section.byeGif && !document.querySelector('script[src="https://tenor.com/embed.js"]')) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://tenor.com/embed.js";
        document.head.appendChild(script);
      }

      return div;
    },

    animate(tl, el) {
      const ideaIn = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
      tl.from(el.querySelectorAll("p, .tenor-gif-embed"), {
        duration: 1, ...ideaIn, stagger: 1.2,
      })
      // Enable replay button only after it becomes visible
      .set(el.querySelector("#replay"), { pointerEvents: "auto" })
      .to(el.querySelector(".last-smile"), {
        duration: 0.5, rotation: 90,
      }, "+=1");
    },
  };
})();
