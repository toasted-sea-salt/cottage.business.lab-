const CONTACT_EMAIL = "hello@thecottagebusinesslab.org";

const FORM_LINKS = {
  intake: "",
  newsletter: "",
  donation: ""
};

const icon = {
  arrowLeft: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="m12 19-7-7 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  heart: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  check: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

function encodeBody(lines) {
  return encodeURIComponent(lines.filter(Boolean).join("\n"));
}

function mailto(subject, lines) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeBody(lines)}`;
}

function setCurrentNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const target = link.getAttribute("href");
    if (target === path || (path === "" && target === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initPathTabs() {
  const tabs = document.querySelectorAll(".path-tab");
  const result = document.querySelector("[data-path-result]");
  if (!tabs.length || !result) return;

  const paths = {
    idea: {
      title: "You have an idea and want a first foothold.",
      list: [
        "Shape the idea into a clear offer.",
        "Find the first customer group worth testing.",
        "Create a name, one-page plan, and simple prototype."
      ]
    },
    hobby: {
      title: "You have a skill people already admire.",
      list: [
        "Turn your craft into a small, sellable menu.",
        "Price your work with materials, labor, and margin in mind.",
        "Build a gentle web presence that feels like you."
      ]
    },
    growing: {
      title: "You have started and need steadier momentum.",
      list: [
        "Clarify your audience and message.",
        "Improve your website, visuals, and social touchpoints.",
        "Join the Virtual Farmers Market for community-backed support."
      ]
    }
  };

  function render(key) {
    const selected = paths[key];
    if (!selected) return;
    result.querySelector("h3").textContent = selected.title;
    result.querySelector("ul").innerHTML = selected.list.map((item) => `<li>${item}</li>`).join("");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      render(tab.dataset.path);
    });
  });
}

function initFilters() {
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const targetSelector = group.dataset.filterTarget;
    const search = document.querySelector(group.dataset.searchTarget || "");
    const items = document.querySelectorAll(targetSelector);
    let active = "all";

    function apply() {
      const query = search ? search.value.trim().toLowerCase() : "";
      items.forEach((item) => {
        const tags = (item.dataset.tags || "").split(" ");
        const haystack = item.textContent.toLowerCase();
        const categoryMatch = active === "all" || tags.includes(active);
        const searchMatch = !query || haystack.includes(query);
        item.classList.toggle("hidden", !(categoryMatch && searchMatch));
      });
    }

    group.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        active = button.dataset.filter;
        group.querySelectorAll("[data-filter]").forEach((item) => item.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");
        apply();
      });
    });

    if (search) {
      search.addEventListener("input", apply);
    }
  });
}

function initForms() {
  document.querySelectorAll("[data-mail-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formType = form.dataset.mailForm;
      const formData = new FormData(form);
      const lines = Array.from(formData.entries()).map(([key, value]) => `${key}: ${value}`);

      if (FORM_LINKS[formType]) {
        window.location.href = FORM_LINKS[formType];
        return;
      }

      const subject = form.dataset.subject || "Cottage Business Lab inquiry";
      window.location.href = mailto(subject, lines);
    });
  });
}

function initDonationSlider() {
  const slider = document.querySelector("[data-donation-slider]");
  const output = document.querySelector("[data-donation-output]");
  if (!slider || !output) return;

  function update() {
    output.textContent = `$${Number(slider.value).toLocaleString()}`;
  }

  slider.addEventListener("input", update);
  update();
}

function getSavedArticles() {
  try {
    return JSON.parse(localStorage.getItem("cblSavedArticles") || "[]");
  } catch {
    return [];
  }
}

function setSavedArticles(saved) {
  localStorage.setItem("cblSavedArticles", JSON.stringify(saved));
}

function initSaveButtons() {
  const articleId = document.body.dataset.articleId;
  const buttons = document.querySelectorAll("[data-save-article]");
  if (!buttons.length || !articleId) return;

  function render() {
    const saved = getSavedArticles();
    const isSaved = saved.includes(articleId);
    buttons.forEach((button) => {
      button.innerHTML = `${isSaved ? icon.check : icon.heart}<span>${isSaved ? "Saved" : "Save"}</span>`;
      button.setAttribute("aria-pressed", String(isSaved));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const saved = getSavedArticles();
      const next = saved.includes(articleId)
        ? saved.filter((item) => item !== articleId)
        : saved.concat(articleId);
      setSavedArticles(next);
      render();
    });
  });

  render();
}

function initLibrarySavedState() {
  const saved = getSavedArticles();
  document.querySelectorAll("[data-article-card]").forEach((card) => {
    const isSaved = saved.includes(card.dataset.articleCard);
    card.dataset.saved = isSaved ? "saved" : "unsaved";
  });

  const savedToggle = document.querySelector("[data-show-saved]");
  if (!savedToggle) return;

  savedToggle.addEventListener("click", () => {
    const showing = savedToggle.getAttribute("aria-pressed") === "true";
    const next = !showing;
    savedToggle.setAttribute("aria-pressed", String(next));
    document.querySelectorAll("[data-article-card]").forEach((card) => {
      card.classList.toggle("hidden", next && card.dataset.saved !== "saved");
    });
  });
}

function initBusinessSite() {
  if (!document.body.hasAttribute("data-business-site")) return;

  const businesses = {
    "nana-rose-knits": {
      name: "Nana Rose Knits",
      category: "Handmade Goods",
      pitch: "Warm hand-knit blankets and keepsakes made in small seasonal batches.",
      offer: "Blankets, keepsakes, custom colors, and thoughtful gifts for families.",
      location: "Austin, TX",
      need: "Photos, a starter shop page, and a simple way for people to request a custom order."
    },
    "marisols-market-jams": {
      name: "Marisol's Market Jams",
      category: "Food & Beverage",
      pitch: "Fruit preserves inspired by family recipes and local produce.",
      offer: "Small-batch jams, seasonal flavors, gift jars, and market-ready preserves.",
      location: "Texas cottage food business",
      need: "Label design, pricing help, and a clear ordering path."
    },
    "brightstart-tutoring": {
      name: "BrightStart Tutoring",
      category: "Services",
      pitch: "Affordable homework help and study coaching for middle-school families.",
      offer: "One-on-one tutoring, study routines, homework support, and family check-ins.",
      location: "Community-based service",
      need: "A website refresh, testimonials, and mentor support."
    },
    "quiet-porch-care": {
      name: "Quiet Porch Care",
      category: "Wellness",
      pitch: "Neighborly respite sitting and errand support for family caregivers.",
      offer: "Friendly visits, errand help, respite sitting, and simple caregiver support.",
      location: "Local neighborhood service",
      need: "Trust-focused messaging, a service menu, and referral partners."
    },
    "paper-lantern-press": {
      name: "Paper Lantern Press",
      category: "Handmade Goods",
      pitch: "Handmade stationery, thank-you cards, and tiny celebration goods.",
      offer: "Cards, paper goods, gift tags, thank-you notes, and small celebration sets.",
      location: "Small-batch studio",
      need: "Product photos, wholesale intro language, and a starter catalog."
    },
    neighborcart: {
      name: "NeighborCart",
      category: "Tech Idea",
      pitch: "A simple idea for helping neighbors coordinate shared grocery runs.",
      offer: "A lightweight coordination tool for neighbors, caregivers, and local groups.",
      location: "Early-stage idea",
      need: "Customer research, prototype copy, and a first pilot group."
    }
  };

  const params = new URLSearchParams(window.location.search);
  const selected = businesses[params.get("business")] || businesses["nana-rose-knits"];
  document.title = `${selected.name} | The Cottage Business Lab`;

  const fields = {
    "[data-business-name]": selected.name,
    "[data-business-category]": selected.category,
    "[data-business-pitch]": selected.pitch,
    "[data-business-offer]": selected.offer,
    "[data-business-location]": selected.location,
    "[data-business-need]": selected.need
  };

  Object.entries(fields).forEach(([selector, value]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  });

  const contact = document.querySelector("[data-business-contact]");
  if (contact) {
    contact.href = mailto(`${selected.name} inquiry`, [
      `I am interested in ${selected.name}.`,
      "",
      "My name:",
      "Best way to reach me:"
    ]);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setCurrentNav();
  initNav();
  initPathTabs();
  initFilters();
  initForms();
  initDonationSlider();
  initSaveButtons();
  initLibrarySavedState();
  initBusinessSite();
});
