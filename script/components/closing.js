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
      const closingText = el.querySelector(".closing-text");
      const replay = el.querySelector(".replay-btn");
      const smile = el.querySelector(".last-smile");
      const gif = el.querySelector(".tenor-gif-embed");
      const ideaIn = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };

      // Animate the closing message as one element. Do not use a stagger here:
      // staggering the closing elements can make the end of a long message look
      // as if its final words are being typed separately.
      tl.from(closingText, {
        duration: 1,
        ...ideaIn,
        clearProps: "transform",
      })
        .from(replay, {
          duration: 0.7,
          ...ideaIn,
          onStart: () => {
            replay.style.pointerEvents = "auto";
          },
        }, "+=0.4")
        .from(smile, {
          duration: 0.7,
          ...ideaIn,
        }, "+=0.2")
        .to(smile, {
          duration: 0.5,
          rotation: 90,
        }, "+=0.6");

      if (gif) {
        tl.from(gif, {
          duration: 1,
          ...ideaIn,
        }, "+=0.5");
      }
    },
  };
})();
