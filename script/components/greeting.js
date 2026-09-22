(function () {
  window.Components = window.Components || {};

  window.Components.greeting = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-greeting";
      div.innerHTML = `
        <h1 class="greeting-title">
          ${section.title || "Hi"}
          <span class="greeting-name">${config.name}</span>
        </h1>
        <p class="greeting-subtitle">${section.subtitle || ""}</p>
        <div class="tenor-gif-embed greeting-gif" data-postid="16925057484820241260" data-share-method="host" data-aspect-ratio="1.23333" data-width="100%">
          <a href="https://tenor.com/view/peach-and-goma-gif-16925057484820241260">Peach And Goma Sticker</a>
          from <a href="https://tenor.com/search/peach+and+goma-stickers">Peach And Goma Stickers</a>
        </div>
      `;
      container.appendChild(div);

      // Load Tenor once after the embed has been added to the DOM.
      if (!document.querySelector('script[src="https://tenor.com/embed.js"]')) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://tenor.com/embed.js";
        document.head.appendChild(script);
      }

      return div;
    },

    animate(tl, el) {
      tl.from(el.querySelector(".greeting-title"), {
        duration: 0.7, opacity: 0, y: 10,
      })
      .from(el.querySelector(".greeting-subtitle"), {
        duration: 0.4, opacity: 0, y: 10,
      })
      .from(el.querySelector(".greeting-gif"), {
        duration: 0.5, opacity: 0, y: 10,
      })
      .to(el.querySelector(".greeting-title"), {
        duration: 0.7, opacity: 0, y: 10,
      }, "+=3.5")
      .to(el.querySelector(".greeting-subtitle"), {
        duration: 0.7, opacity: 0, y: 10,
      }, "-=1")
      .to(el.querySelector(".greeting-gif"), {
        duration: 0.7, opacity: 0, y: 10,
      }, "-=0.7");
    },
  };
})();
