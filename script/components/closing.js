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
        <p class="last-smile">:)</p>
        ${section.byeGif ? `
          <div class="tenor-gif-embed" data-postid="12810370250826095008" data-share-method="host" data-aspect-ratio="1.33871" data-width="100%">
            <a href="https://tenor.com/view/bye-waving-goodbye-little-rascals-see-you-gif-12810370250826095008">Bye Waving GIF</a>
            from <a href="https://tenor.com/search/bye-gifs">Bye GIFs</a>
          </div>
        ` : ""}
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
      const gif = el.querySelector(".tenor-gif-embed");

      // Show the goodbye GIF only after the complete closing message.
      tl.from(el.querySelectorAll(".closing-text, #replay, .last-smile"), {
        duration: 1,
        ...ideaIn,
        stagger: 1.2,
      })
        .set(el.querySelector("#replay"), { pointerEvents: "auto" })
        .to(el.querySelector(".last-smile"), {
          duration: 0.5,
          rotation: 90,
        }, "+=1");

      if (gif) {
        tl.from(gif, {
          duration: 1,
          ...ideaIn,
        }, "+=0.5");
      }
    },
  };
})();
