async function loadIncludes() {
  const includes = document.querySelectorAll("[data-include]");
  const promises = Array.from(includes).map(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Failed to fetch ${file}`);
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      el.innerHTML = `<p style="color:red;">Error loading: ${file}</p>`;
      console.error("Include load error:", err);
    }
  });

  return Promise.all(promises);
}

// Theme Management Class
class ThemeManager {
  constructor() {
    this.THEME_KEY = "ui-theme";
    this.currentTheme = this.getStoredTheme() || "light";
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.attachEventListeners();
    this.updateActiveButton();
  }

  getStoredTheme() {
    return localStorage.getItem(this.THEME_KEY) || "light";
  }

  storeTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  applyTheme(theme) {
    const html = document.documentElement;
    html.classList.remove("light", "dark", "blue");
    html.classList.add(theme);
    this.currentTheme = theme;
    this.storeTheme(theme);
    this.updateActiveButton();
  }

  attachEventListeners() {
    // Theme buttons
    const lightBtn = document.getElementById("lightTheme");
    const darkBtn = document.getElementById("darkTheme");
    const blueBtn = document.getElementById("blueTheme");

    lightBtn?.addEventListener("click", () => this.switchTheme("light"));
    darkBtn?.addEventListener("click", () => this.switchTheme("dark"));
    blueBtn?.addEventListener("click", () => this.switchTheme("blue"));

    // System preference detection
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (e) => {
        if (this.currentTheme === "auto") {
          this.applyTheme(e.matches ? "dark" : "light");
        }
      });
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "1":
            e.preventDefault();
            this.switchTheme("light");
            break;
          case "2":
            e.preventDefault();
            this.switchTheme("dark");
            break;
          case "3":
            e.preventDefault();
            this.switchTheme("blue");
            break;
        }
      }
    });
  }

  switchTheme(theme) {
    this.applyTheme(theme);
    document.body.style.transform = "scale(0.99)";
    setTimeout(() => {
      document.body.style.transform = "scale(1)";
    }, 100);
  }

  updateActiveButton() {
    document
      .querySelectorAll(".theme-toggle")
      .forEach((btn) => btn.classList.remove("active-theme"));

    const activeBtn = {
      light: document.getElementById("lightTheme"),
      dark: document.getElementById("darkTheme"),
      blue: document.getElementById("blueTheme"),
    }[this.currentTheme];

    activeBtn?.classList.add("active-theme");
    document.querySelectorAll("[data-theme]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.theme === this.currentTheme);
    });
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  isDarkMode() {
    return this.currentTheme === "dark";
  }
}

// Font Size Management
class FontManager {
  constructor() {
    this.FONT_KEY = "font-size";
    this.init();
  }

  init() {
    const savedFont = localStorage.getItem(this.FONT_KEY);
    if (savedFont) {
      document.documentElement.classList.add(savedFont);
    }
    this.updateFontUI(savedFont);
  }

  updateFontUI(activeFont) {
    document.querySelectorAll("[data-font-size]").forEach((btn) => {
      btn.classList.toggle("active-badge", btn.dataset.fontSize === activeFont);
    });
  }

  setFontSize(size) {
    const html = document.documentElement;
    const classes = ["font-sm", "font-md", "font-lg"];
    const current = localStorage.getItem(this.FONT_KEY);
    if (current === size) {
      html.classList.remove(...classes);
      localStorage.removeItem(this.FONT_KEY);
      this.updateFontUI(null);
      return;
    }

    html.classList.remove(...classes);
    html.classList.add(size);
    localStorage.setItem(this.FONT_KEY, size);
    this.updateFontUI(size);
  }
}

// Color Scheme Management
class ColorSchemeManager {
  constructor() {
    this.COLOR_KEY = "brand-scheme";
    this.schemes = [
      "blue-scheme",
      "pink-scheme",
      "skyblue-scheme",
      "green-scheme",
      "yellow-scheme",
      "purple-scheme",
    ];
    this.init();
  }

  init() {
    const savedScheme = localStorage.getItem(this.COLOR_KEY);
    if (savedScheme) {
      document.documentElement.classList.add(savedScheme);
    }
    this.updateColorSchemeUI(savedScheme);
  }

  updateColorSchemeUI(activeScheme) {
    document.querySelectorAll("[data-color-scheme]").forEach((btn) => {
      btn.classList.toggle(
        "active-color",
        btn.dataset.colorScheme === activeScheme
      );
    });
  }

  setColorScheme(scheme) {
    const html = document.documentElement;
    const current = localStorage.getItem(this.COLOR_KEY);
    if (current === scheme) {
      html.classList.remove(scheme);
      localStorage.removeItem(this.COLOR_KEY);
      this.updateColorSchemeUI(null);
      return;
    }
    html.classList.remove(...this.schemes);
    html.classList.add(scheme);
    localStorage.setItem(this.COLOR_KEY, scheme);
    this.updateColorSchemeUI(scheme);
  }
}

// Accessibility Management
class AccessibilityManager {
  constructor() {
    this.ACCESSIBILITY_KEY = "accessibility-mode";
    this.modes = ["high-saturate", "low-saturate", "invert-mode"];
    this.init();
  }

  init() {
    const saved = localStorage.getItem(this.ACCESSIBILITY_KEY);
    if (saved) {
      document.documentElement.classList.add(saved);
    }
    this.updateAccessibilityUI(saved);
  }

  updateAccessibilityUI(activeMode) {
    document.querySelectorAll("[data-accessibility-mode]").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.accessibilityMode === activeMode
      );
    });
  }

  setAccessibility(mode) {
    const html = document.documentElement;
    const current = localStorage.getItem(this.ACCESSIBILITY_KEY);
    if (current === mode) {
      html.classList.remove(mode);
      localStorage.removeItem(this.ACCESSIBILITY_KEY);
      this.updateAccessibilityUI(null);
      return;
    }

    html.classList.remove(...this.modes);
    html.classList.add(mode);
    localStorage.setItem(this.ACCESSIBILITY_KEY, mode);
    this.updateAccessibilityUI(mode);
  }
}

// Sidebar Management
class SidebarManager {
  constructor() {
    this.sidebar = document.querySelector(".sidebar");
    this.logoTitle = document.getElementById("sidebar-title");
    this.menuTrigger = document.getElementById("menuTrigger");
    this.collapseTrigger = document.getElementById("collapseTrigger");
    this.isCollapsed = this.sidebar.classList.contains("collapsed");

    // Event listeners
    this.menuTrigger?.addEventListener("click", () => this.expandSidebar());
    this.collapseTrigger?.addEventListener("click", () =>
      this.collapseSidebar()
    );

    this.updateVisibility();
  }

  expandSidebar() {
    this.isCollapsed = false;
    this.sidebar.classList.remove("collapsed");
    this.updateVisibility();
  }

  collapseSidebar() {
    this.isCollapsed = true;
    this.sidebar.classList.add("collapsed");
    this.updateVisibility();
  }

  updateVisibility() {
    // Show menu icon only when collapsed
    // if (this.menuTrigger) {
    //   this.menuTrigger.classList.toggle("hidden", !this.isCollapsed);
    // }
    // Show collapse icon only when expanded
    if (this.collapseTrigger) {
      this.collapseTrigger.classList.toggle("hidden", this.isCollapsed);
    }
    if (this.logoTitle) {
      this.logoTitle.style.display = this.isCollapsed ? "none" : "block";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SidebarManager();
});

// class SidebarManager {
//   constructor() {
//     this.init();
//   }

//   init() {
//     const toggleBtn = document.getElementById("toggleSidebar");
//     const sidebar = document.getElementById("sidebar");

//     if (toggleBtn && sidebar) {
//       toggleBtn.addEventListener("click", () => {
//         sidebar.classList.toggle("collapsed");
//       });
//     }
//   }
// }

// Settings Drawer Management
class SettingsDrawerManager {
  constructor() {
    this.init();
  }

  init() {
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsWrapper = document.getElementById("settingsDrawerWrapper");
    const drawerPanel = document.getElementById("drawerPanel");
    const overlay = document.getElementById("drawerOverlay");
    const closeBtn = document.getElementById("closeSettings");

    if (!settingsBtn || !settingsWrapper || !drawerPanel) {
      console.warn("Settings drawer elements not found");
      return;
    }

    settingsBtn.addEventListener("click", () => {
      this.openDrawer();
    });

    const closeDrawer = () => this.closeDrawer();
    closeBtn?.addEventListener("click", closeDrawer);
    overlay?.addEventListener("click", closeDrawer);
  }

  openDrawer() {
    const settingsWrapper = document.getElementById("settingsDrawerWrapper");
    const drawerPanel = document.getElementById("drawerPanel");

    settingsWrapper.classList.remove("hidden");
    drawerPanel.classList.remove("translate-x-full");
  }

  closeDrawer() {
    const settingsWrapper = document.getElementById("settingsDrawerWrapper");
    const drawerPanel = document.getElementById("drawerPanel");

    drawerPanel.classList.add("translate-x-full");
    setTimeout(() => {
      settingsWrapper.classList.add("hidden");
    }, 300);
  }
}

// Global Application Manager
class AppManager {
  constructor() {
    this.themeManager = null;
    this.fontManager = null;
    this.colorSchemeManager = null;
    this.accessibilityManager = null;
    this.sidebarManager = null;
    this.settingsDrawerManager = null;
  }

  async init() {
    try {
      // Load includes first
      await loadIncludes();

      // Initialize all managers
      this.themeManager = new ThemeManager();
      this.fontManager = new FontManager();
      this.colorSchemeManager = new ColorSchemeManager();
      this.accessibilityManager = new AccessibilityManager();
      this.sidebarManager = new SidebarManager();
      this.settingsDrawerManager = new SettingsDrawerManager();

      // Expose global functions for HTML onclick handlers
      this.exposeGlobalFunctions();

      console.log("App initialized successfully");
    } catch (error) {
      console.error("App initialization failed:", error);
    }
  }

  exposeGlobalFunctions() {
    // Expose functions to global scope for HTML onclick handlers
    window.setTheme = (theme) => this.themeManager.switchTheme(theme);
    window.setFontSize = (size) => this.fontManager.setFontSize(size);
    window.setColorScheme = (scheme) =>
      this.colorSchemeManager.setColorScheme(scheme);
    window.setAccessibility = (mode) =>
      this.accessibilityManager.setAccessibility(mode);
  }
}

function routeToFile(route) {
  return route.replace(/^\//, "").replace(/\//g, "-") + ".html";
}
function updateDateTime() {
  const now = new Date();

  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");

  if (dateEl && timeEl) {
    // Format: 29 Jun 2025
    const dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    dateEl.textContent = now.toLocaleDateString("en-GB", dateOptions);

    // Format: 08:30 AM
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    timeEl.textContent = now
      .toLocaleTimeString("en-GB", timeOptions)
      .toUpperCase(); // Ensure AM/PM is uppercase
  }
}

class NavigationManager {
  constructor() {
    this.currentRoute = "/overview/my-technico";
    this.menuEventsbound = false;
    this.routeConfig = {
      "/overview/my-technico": {
        title: "My Technico",
        breadcrumb: ["Overview", "My Technico"],
        description: "Personal dashboard and overview",
      },
      "/overview/dashboard": {
        title: "Dashboard",
        breadcrumb: ["Overview", "Dashboard"],
        description: "Project overview and key metrics",
      },
      "/database/tags": {
        title: "Tags",
        breadcrumb: ["Database", "Tag Database"],
        description: "Manage project tags and references",
      },
      "/database/tags/add": {
        title: "Add Tag",
        breadcrumb: ["Database", "Tag Database", "Add Tag"],
        description: "Add project tags and references",
      },
      "/outstanding/checksheets": {
        title: "Checksheets",
        breadcrumb: ["Outstanding Items", "Checksheets"],
        description: "Manage and track your project checksheets",
      },
      "/outstanding/checksheets/edit": {
        title: "Edit Checksheets",
        breadcrumb: ["Outstanding Items", "Checksheets", "Edit Phase"],
        description: "Edit your project checksheets",
      },
      "/outstanding/punchlists": {
        title: "Punchlists",
        breadcrumb: ["Outstanding Items", "Punchlists"],
        description: "Track and manage project punch items",
      },
      "/outstanding/punchlists/add": {
        title: "Add Punchlists",
        breadcrumb: ["Outstanding Items", "Punchlists", "Add Punchlist"],
        description: "Track and manage project punch items",
      },
      "/outstanding/preservation": {
        title: "Preservation",
        breadcrumb: ["Outstanding Items", "Preservation"],
        description: "Equipment preservation tracking",
      },
      "/outstanding/loop-tags": {
        title: "Loop Tags",
        breadcrumb: ["Outstanding Items", "Loop Tags"],
        description: "Instrument loop tag management",
      },
      "/outstanding/approvals": {
        title: "Approvals",
        breadcrumb: ["Outstanding Items", "Approvals"],
        description: "Document approval workflow",
      },
      "/certificates/certificates": {
        title: "Certificates",
        breadcrumb: ["Certificates", "Certificates"],
        description: "Quality and compliance certificates",
      },
      "/scanning/scanning": {
        title: "Scanning",
        breadcrumb: ["Scanning", "Scanning"],
        description: "QR code and barcode scanning",
      },
      "/scanning/recently-scanned": {
        title: "Recently Scanned",
        breadcrumb: ["Scanning", "Recently Scanned"],
        description: "Recently scanned items history",
      },
      "/atex-eng-data/haz-area-equip": {
        title: "ATEX & Eng Data",
        breadcrumb: ["ATEX & Eng Data", "Hazardous Equipment"],
      },
      "/atex-eng-data/eng-data": {
        title: "Engineering Data",
        breadcrumb: ["ATEX & Eng Data", "Engineering Data"],
      },
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateActiveNavigation();
    this.updateContent();
    this.simulateURLChange();
  }

  bindEvents() {
    this.removeEvents();

    // Sidebar route links - EXCLUDE buttons with data-close attribute
    const routeElements = document.querySelectorAll(
      "[data-route]:not([data-close])"
    );
    routeElements.forEach((item) => {
      item.addEventListener("click", this.handleRouteClick.bind(this));
    });

    // Toggle expandable menus (only bind once, not on content updates)
    // if (!this.menuEventsbound) {
    //   const toggleElements = document.querySelectorAll("[data-toggle]");
    //   toggleElements.forEach((toggle) => {
    //     toggle.addEventListener("click", this.handleToggleClick.bind(this));
    //   });
    //   this.menuEventsbound = true;
    // }
    if (!this.menuEventsbound) {
      document.querySelectorAll("[data-toggle]").forEach((toggle) => {
        toggle.addEventListener("click", this.handleToggleClick.bind(this));
      });
      this.menuEventsbound = true;
    }
    // Handle data-close buttons separately
    const closeElements = document.querySelectorAll("[data-close]");

    closeElements.forEach((button) => {
      button.addEventListener("click", this.handleCloseClick.bind(this));
    });
  }

  removeEvents() {
    // Store bound functions to properly remove them
    if (this.boundHandleRouteClick) {
      document
        .querySelectorAll("[data-route]:not([data-close])")
        .forEach((item) => {
          item.removeEventListener("click", this.boundHandleRouteClick);
        });
    }

    if (this.boundHandleCloseClick) {
      document.querySelectorAll("[data-close]").forEach((button) => {
        button.removeEventListener("click", this.boundHandleCloseClick);
      });
    }
  }

  handleRouteClick(e) {
    e.preventDefault();
    const route = e.currentTarget.getAttribute("data-route");
    this.navigateTo(route);
  }

  handleToggleClick(e) {
    e.preventDefault();
    const menuId = e.currentTarget.getAttribute("data-toggle");
    console.log("🔄 Toggle clicked:", menuId);
    this.toggleMenu(menuId);
  }

  handleCloseClick(e) {
    e.preventDefault();
    const route = e.currentTarget.getAttribute("data-route");
    if (route) {
      this.navigateTo(route);
    }
  }

  navigateTo(route) {
    this.currentRoute = route;
    this.updateActiveNavigation();
    this.updateContent();
    this.updateURL();
  }

  updateActiveNavigation() {
    // Clear all active states
    const elementsToClean = document.querySelectorAll(
      ".nav-item, .nav-sub-item, .icon-container"
    );
    elementsToClean.forEach((el) => el.classList.remove("active"));

    // Clear all expanded states and rotated chevrons
    const groupsToClean = document.querySelectorAll(".nav-group");
    groupsToClean.forEach((group) => group.classList.remove("expanded"));

    const chevronsToClean = document.querySelectorAll(".chevron-icon");
    chevronsToClean.forEach((chevron) => chevron.classList.remove("rotated"));

    // Find the navigation item to highlight
    let activeItem = document.querySelector(
      `[data-route="${this.currentRoute}"]:not([data-close])`
    );

    // If no exact match found, find the parent route
    if (!activeItem) {
      activeItem = this.findParentRoute();
    }

    if (activeItem) {
      // Highlight the active sub-item
      activeItem.classList.add("active");
      // Find the parent menu group
      const parentMenu = activeItem.closest(".nav-group");
      if (activeItem) {
        // Highlight the active sub-item
        activeItem.classList.add("active");

        const parentMenu = activeItem.closest(".nav-group");

        if (parentMenu) {
          parentMenu.classList.add("expanded");

          // Get the parent .nav-item that contains the .icon-container
          const parentNavItem = parentMenu.previousElementSibling;
          if (parentNavItem) {
            const iconContainer =
              parentNavItem.querySelector(".icon-container");
            if (iconContainer) {
              iconContainer.classList.add("active"); // ✅ Highlight the icon
            }

            const chevron = parentNavItem.querySelector(".chevron-icon");
            if (chevron) {
              chevron.classList.add("rotated");
            }
          }
        }
      }
      // if (parentMenu) {
      //   // Expand the parent menu
      //   parentMenu.classList.add("expanded");
      //   const menuId = parentMenu.id;
      //   const toggleButton = document.querySelector(`[data-toggle="${menuId}"]`);
      //   if (toggleButton) {
      //     // Add active state to the toggle button's icon container
      //     const iconContainer = toggleButton.querySelector(".icon-container");
      //     if (iconContainer) {
      //       iconContainer.classList.add("active");
      //     }

      //     // Rotate the chevron
      //     const chevron = toggleButton.querySelector(".chevron-icon");
      //     console.log("Chevron in toggle:", chevron);

      //     if (chevron) {
      //       chevron.classList.add("rotated");
      //       console.log("✅ Rotated chevron");
      //     }
      //   }
      // } else {
      //   // This is a top-level item, highlight its icon directly
      //   const iconContainer = activeItem.querySelector(".icon-container");
      //   console.log("Top-level icon container:", iconContainer);

      //   if (iconContainer) {
      //     iconContainer.classList.add("active");
      //     console.log("✅ Activated top-level icon container");
      //   }
      // }
    } else {
      console.log("❌ No active item found for route:", this.currentRoute);
    }
  }

  findParentRoute() {
    const currentPath = this.currentRoute;
    // Check if this is a child route (has more than 2 path segments)
    const pathSegments = currentPath
      .split("/")
      .filter((segment) => segment.length > 0);
    if (pathSegments.length > 2) {
      // Build parent route by removing the last segment
      const parentRoute = "/" + pathSegments.slice(0, -1).join("/");
      console.log("Trying parent route:", parentRoute);

      // Look for navigation item with parent route
      const parentItem = document.querySelector(
        `[data-route="${parentRoute}"]:not([data-close])`
      );
      if (parentItem) {
        console.log("✅ Found parent route item:", parentItem);
        return parentItem;
      }
    }

    // If no parent found, try to find the closest matching route
    const allRouteItems = document.querySelectorAll(
      "[data-route]:not([data-close])"
    );
    console.log("Searching through all route items for closest match...");

    for (let item of allRouteItems) {
      const itemRoute = item.getAttribute("data-route");
      if (currentPath.startsWith(itemRoute) && itemRoute !== currentPath) {
        console.log("✅ Found matching base route:", itemRoute, item);
        return item;
      }
    }

    console.log("❌ No parent route found");
    return null;
  }
  toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const chevron = document.querySelector(
      `[data-toggle="${menuId}"] .chevron-icon`
    );

    if (menu && chevron) {
      menu.classList.toggle("expanded");
      chevron.classList.toggle("rotated");
    }
  }
  // toggleMenu(menuId) {
  //   const menu = document.getElementById(menuId);
  //   const toggleButton = document.querySelector(`[data-toggle="${menuId}"]`);

  //   if (menu && toggleButton) {
  //     const chevron = toggleButton.querySelector(".chevron-icon");
  //     const iconContainer = toggleButton.querySelector(".icon-container");

  //     menu.classList.toggle("expanded");

  //     // Toggle chevron rotation
  //     if (chevron) {
  //       chevron.classList.toggle("rotated");
  //     }

  //     // Toggle icon active state based on menu expansion and current route
  //     if (iconContainer) {
  //       const hasActiveChild = menu.querySelector(".nav-sub-item.active");
  //       const shouldBeActive = menu.classList.contains("expanded") && hasActiveChild;
  //       if (shouldBeActive) {
  //         iconContainer.classList.add("active");
  //       } else if (!hasActiveChild) {
  //         iconContainer.classList.remove("active");
  //       }
  //     }
  //   }
  // }

  isSidebarCollapsed() {
    const sidebar = document.querySelector(".sidebar");
    return sidebar && sidebar.classList.contains("collapsed");
  }

  updateContent() {
    const config = this.routeConfig[this.currentRoute];
    const contentContainer = document.getElementById("main-content");

    if (!contentContainer || !config) {
      console.log("❌ Content container or config not found");
      return;
    }

    console.log("📄 Updating content for:", this.currentRoute);

    const pagePath = `./pages/${routeToFile(this.currentRoute)}`;

    fetch(pagePath)
      .then((res) => {
        if (!res.ok) throw new Error("Page not found");
        return res.text();
      })
      .then((html) => {
        contentContainer.innerHTML = html;
        this.updateBreadcrumb(config.breadcrumb);
        document.title = config.title;
        this.bindContentEvents();
      })
      .catch((err) => {
        contentContainer.innerHTML = `<div class="p-4 text-red-500">Error: ${err.message}</div>`;
      });
  }

  bindContentEvents() {
    this.boundHandleRouteClick = this.handleRouteClick.bind(this);
    this.boundHandleCloseClick = this.handleCloseClick.bind(this);

    // Only bind route events for navigation items
    document
      .querySelectorAll("[data-route]:not([data-close])")
      .forEach((item) => {
        if (!item.hasAttribute("data-toggle")) {
          item.removeEventListener("click", this.boundHandleRouteClick);
          item.addEventListener("click", this.boundHandleRouteClick);
        }
      });

    // Bind close button events separately
    document.querySelectorAll("[data-close]").forEach((button) => {
      button.removeEventListener("click", this.boundHandleCloseClick);
      button.addEventListener("click", this.boundHandleCloseClick);
    });
  }

  updateBreadcrumb(items) {
    const breadcrumbContainer = document.getElementById("breadcrumb");
    if (!breadcrumbContainer) return;

    breadcrumbContainer.innerHTML = "";
    items.forEach((item, i) => {
      const span = document.createElement("span");
      span.className = "breadcrumb-item bg-theme-surface";
      span.textContent = item;
      breadcrumbContainer.appendChild(span);

      if (i < items.length - 1) {
        const chevronContainer = document.createElement("span");
        chevronContainer.innerHTML = `
        <svg class="w-4 h-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      `;
        breadcrumbContainer.appendChild(chevronContainer.firstElementChild);
      }
    });
  }

  updateURL() {
    console.log("🌐 Navigated to:", this.currentRoute);
  }

  simulateURLChange() {
    window.addEventListener("popstate", () => {
      this.updateActiveNavigation();
    });
  }

  goToAddTag() {
    this.navigateTo("/database/tags/add");
  }

  goToTags() {
    this.navigateTo("/database/tags");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  const promises = Array.from(includes).map(async (el) => {
    const file = el.getAttribute("data-include");
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;
  });

  Promise.all(promises).then(() => {
    new NavigationManager();
    updateDateTime();
    setInterval(updateDateTime, 1000);
  });
});
document.addEventListener("DOMContentLoaded", async () => {
  console.log("🎯 DOM Content Loaded - Starting app...");

  try {
    const app = new AppManager();
    await app.init();
    window.appManager = app;
  } catch (error) {
    console.error("Failed to start application:", error);
  }
});
window.addEventListener("beforeunload", () => {
  if (window.appManager?.themeManager) {
    const theme = window.appManager.themeManager.getCurrentTheme();
  }
});

//user profile
const userInfo = document.getElementById("user-info");
const popover = document.getElementById("user-popover");

userInfo.addEventListener("click", () => {
  popover.classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
  if (!userInfo.contains(e.target) && !popover.contains(e.target)) {
    popover.classList.add("hidden");
  }
});

//Help Modal
document.getElementById("helpBtn").addEventListener("click", () => {
  document.getElementById("helpModal").classList.remove("hidden");
});

document.getElementById("closeHelpModal").addEventListener("click", () => {
  document.getElementById("helpModal").classList.add("hidden");
});

// Help Modal close on outside click
document.getElementById("helpModal").addEventListener("click", (e) => {
  if (e.target.id === "helpModal") {
    document.getElementById("helpModal").classList.add("hidden");
  }
});

//Logout
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "./pages/login.html";
});
