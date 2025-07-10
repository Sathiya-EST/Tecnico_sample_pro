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
    this.handleRouteClick = this.handleRouteClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.routeConfig = {
      "/overview/my-technico": {
        title: "My Technico",
        breadcrumb: ["Overview", "My Technico"],
      },
      "/overview/my-technico/workpacks": {
        title: "Workpacks",
        breadcrumb: ["Overview", "My Technico", "Workpacks"],
      },
      "/overview/my-technico/checksheets": {
        title: "Checksheets",
        breadcrumb: ["Overview", "My Technico", "Checksheets"],
      },
      "/overview/my-technico/punchlists": {
        title: "Punchlists",
        breadcrumb: ["Overview", "My Technico", "Punchlists"],
      },
      "/overview/my-technico/technical-queries": {
        title: "Technical Queries",
        breadcrumb: ["Overview", "My Technico", "Technical Queries"],
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
      "/certificates": {
        title: "Certificates",
        breadcrumb: ["Certificates"],
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
      "/atex/haz-area-equip": {
        title: "ATEX & Eng Data",
        breadcrumb: ["ATEX & Eng Data", "Hazardous Equipment"],
      },
      "/atex/eng-data": {
        title: "Engineering Data",
        breadcrumb: ["ATEX & Eng Data", "Engineering Data"],
      },
      "/atex/eng-companies": {
        title: "Engineering Companies",
        breadcrumb: ["ATEX & Eng Data", "Engineering Companies"],
      },
      "/atex/eng-companies/add": {
        title: "Add Engineering Companies",
        breadcrumb: [
          "ATEX & Eng Data",
          "Engineering Companies",
          "Add Engineering Company",
        ],
      },
      "/atex/eng-test-equipments": {
        title: "Test Equipments",
        breadcrumb: ["ATEX & Eng Data", "Test Equipments"],
      },
      "/atex/eng-test-equipments/add": {
        title: "Add Test Equipments",
        breadcrumb: [
          "ATEX & Eng Data",
          "Test Equipments",
          "Add Test Equipment",
        ],
      },
      "/hoc/change-request": {
        title: "Change Requests",
        breadcrumb: ["Management Of Change", "Change Requests"],
      },
      "/hoc/change-request/add": {
        title: "Add Requests",
        breadcrumb: ["Management Of Change", "Change Requests", "Add Change Request"],
      },
      "/hoc/administration": {
        title: "Administration",
        breadcrumb: ["Management Of Change", "Admin"],
      },
      "/project-info/unit": {
        title: "Units",
        breadcrumb: ["Project Info", "Units"],
      },
      "/project-info/unit/add": {
        title: "Add Unit",
        breadcrumb: ["Project Info", "Units", "Add Unit"],
      },
      "/project-info/systems": {
        title: "Systems",
        breadcrumb: ["Project Info", "Systems"],
      },
      "/project-info/systems/add": {
        title: "Add System",
        breadcrumb: ["Project Info", "Systems", "Add System"],
      },
      "/project-info/sub-systems": {
        title: "Sub Systems",
        breadcrumb: ["Project Info", "Sub Systems"],
      },
      "/project-info/sub-systems/add": {
        title: "Add Sub System",
        breadcrumb: ["Project Info", "Sub Systems", "Add Sub System"],
      },
      "/project-info/site-locations": {
        title: "Site Locations",
        breadcrumb: ["Project Info", "Site Locations"],
      },
      "/project-info/site-locations/add": {
        title: "Add Site Locations",
        breadcrumb: ["Project Info", "Site Locations", "Add Site Locations"],
      },
      "/project-info/site-area": {
        title: "Site Area",
        breadcrumb: ["Project Info", "Site Area"],
      },
      "/project-info/site-area/add": {
        title: "Add Site Area",
        breadcrumb: ["Project Info", "Site Area", "Add Site Area"],
      },
      "/project-info/site-sub-area": {
        title: "Site Sub Area",
        breadcrumb: ["Project Info", "Site Sub Area"],
      },
      "/project-info/site-sub-area/add": {
        title: "Add Site Sub Area",
        breadcrumb: ["Project Info", "Site Sub Area", "Add Site Sub Area"],
      },
      "/project-info/types": {
        title: "Types",
        breadcrumb: ["Project Info", "Types"],
      },
      "/project-info/types/add": {
        title: "Add Type",
        breadcrumb: ["Project Info", "Types", "Add Type"],
      },
      "/project-info/sub-types": {
        title: "Sub Types",
        breadcrumb: ["Project Info", "Sub Types"],
      },
      "/project-info/sub-types/add": {
        title: "Add SubType",
        breadcrumb: ["Project Info", "Sub Types", "Add SubType"],
      },
      "/project-info/verification": {
        title: "Verification",
        breadcrumb: ["Project Info", "Verification"],
      },
      "/project-info/integrity": {
        title: "Integrity",
        breadcrumb: ["Project Info", "Integrity"],
      },
      "/project-info/disciplines": {
        title: "Disciplines",
        breadcrumb: ["Project Info", "Disciplines"],
      },
      "/project-info/disciplines/add": {
        title: "Add Disciplines",
        breadcrumb: ["Project Info", "Disciplines", "Add Discipline"],
      },
      "/project-info/disciplines/edit": {
        title: "Edit Disciplines",
        breadcrumb: ["Project Info", "Disciplines", "Edit Discipline"],
      },
      "/project-info/tag-groups": {
        title: "Tag Groups",
        breadcrumb: ["Project Info", "Tag Groups"],
      },
      "/project-info/tag-groups/add": {
        title: "Add Tag Group",
        breadcrumb: ["Project Info", "Tag Groups", "Add Tag Group"],
      },
      "/project-info/punchlist-admin": {
        title: "Punchlist Admin",
        breadcrumb: ["Project Info", "Punchlist Admin"],
      },
      "/project-info/punchlist-admin/add": {
        title: "Add Punchlist Admin",
        breadcrumb: ["Project Info", "Punchlist Admin", "Add Punchlist Admin"],
      },
      "/project-info/punchlist-admin/category-add": {
        title: "Add PL Category",
        breadcrumb: ["Project Info", "Punchlist Admin", "Add PL Category"],
      },
      "/project-info/punchlist-admin/common-items-add": {
        title: "Add Common Items",
        breadcrumb: ["Project Info", "Punchlist Admin", "Add Common Items"],
      },
      "/project-info/tq-admin": {
        title: "TQ Admin",
        breadcrumb: ["Project Info", "TQ Admin"],
      },
      "/project-info/tq-admin/type/add": {
        title: "Add Type",
        breadcrumb: ["Project Info", "TQ Admin", "Add Type"],
      },
      "/project-info/tq-admin/defect/add": {
        title: "Add Defect Type",
        breadcrumb: ["Project Info", "TQ Admin", "Add Defect Type"],
      },
      "/project-info/tq-admin/defect/edit": {
        title: "Edit Defect Type",
        breadcrumb: ["Project Info", "TQ Admin", "Edit Defect Type"],
      },
      "/project-info/tq-admin/priority/add": {
        title: "Add Priorities",
        breadcrumb: ["Project Info", "TQ Admin", "Add Priorities"],
      },
      "/project-info/tq-admin/priority/edit": {
        title: "Edit Priorities",
        breadcrumb: ["Project Info", "TQ Admin", "Edit Priorities"],
      },
      "/project-info/ncr-admin": {
        title: "NCR Admin",
        breadcrumb: ["Project Info", "NCR Admin"],
      },
      "/project-info/ncr-admin/add": {
        title: "Add NCR Type",
        breadcrumb: ["Project Info", "NCR Admin", "Add NCR Type"],
      },
      "/project-info/ncr-admin/edit": {
        title: "Edit NCR Type",
        breadcrumb: ["Project Info", "NCR Admin", "Edit NCR Type"],
      },
      "/project-info/ncr-admin/priority/add": {
        title: "Add NCR Priorities",
        breadcrumb: ["Project Info", "NCR Admin", "Add NCR Priorities"],
      },
      "/project-info/ncr-admin/priority/edit": {
        title: "Edit NCR Priorities",
        breadcrumb: ["Project Info", "NCR Admin", "Edit NCR Priorities"],
      },
      "/project-info/localisations": {
        title: "Localisations",
        breadcrumb: ["Project Info", "Localisations"],
      },
      "/project-info/localisations/add": {
        title: "Add Localisation",
        breadcrumb: ["Project Info", "Localisations", "Add Localisation"],
      },
      "/project-info/localisations/edit": {
        title: "Edit Localisation",
        breadcrumb: ["Project Info", "Localisations", "Edit Localisation"],
      },
      "/project-info/custom-fields": {
        title: "Custom Fields",
        breadcrumb: ["Project Info", "Custom Fields"],
      },
      "/project-info/custom-fields/add": {
        title: "Add Custom Field",
        breadcrumb: ["Project Info", "Custom Fields", "Add Custom Field"],
      },
      "/project-info/custom-fields/edit": {
        title: "Edit Custom Field",
        breadcrumb: ["Project Info", "Custom Fields", "Edit Custom Field"],
      },
      "/project-info/itr-equivalence": {
        title: "ITR Equivalence",
        breadcrumb: ["Project Info", "ITR Equivalence"],
      },
      "/project-info/itr-equivalence/add": {
        title: "Add ITR Equivalence",
        breadcrumb: ["Project Info", "ITR Equivalence", "Add ITR Equivalence"],
      },
      "/project-info/itr-equivalence/edit": {
        title: "Edit ITR Equivalence",
        breadcrumb: ["Project Info", "ITR Equivalence", "Edit ITR Equivalence"],
      },
      "/project-info/si": {
        title: "Shutdown & Isolation",
        breadcrumb: ["Project Info", "Shutdown & Isolation"],
      },
      "/project-info/si/shutdown/add": {
        title: "Add Shutdown",
        breadcrumb: ["Project Info", "Shutdown & Isolation", "Add Shutdown"],
      },
      "/project-info/si/shutdown/edit": {
        title: "Edit Shutdown",
        breadcrumb: ["Project Info", "Shutdown & Isolation", "Edit Shutdown"],
      },
      "/project-info/si/isolation/add": {
        title: "Add Shutdown",
        breadcrumb: ["Project Info", "Shutdown & Isolation", "Add Shutdown"],
      },
      "/project-info/si/isolation/edit": {
        title: "Edit Shutdown",
        breadcrumb: ["Project Info", "Shutdown & Isolation", "Edit Shutdown"],
      },
      "/project-info/workpack-ctpadmin": {
        title: "Workpack & CTP Admin",
        breadcrumb: ["Project Info", "Workpack & CTP Admin"],
      },
      "/project-info/workpack-ctpadmin/workpack-type/add": {
        title: "Add Workpack Type",
        breadcrumb: ["Project Info", "Workpack & CTP Admin", "Add Workpack Type"],
      },
      "/project-info/workpack-ctpadmin/workpack-type/edit": {
        title: "Edit Workpack Type",
        breadcrumb: ["Project Info", "Workpack & CTP Admin", "Edit Workpack Type"],
      },
      "/project-info/workpack-ctpadmin/procedure-type/add": {
        title: "Add Procedure Type",
        breadcrumb: ["Project Info", "Workpack & CTP Admin", "Add Procedure Type"],
      },
      "/project-info/workpack-ctpadmin/procedure-type/edit": {
        title: "Edit Procedure Type",
        breadcrumb: ["Project Info", "Workpack & CTP Admin", "Edit Procedure Type"],
      },
      "/project-info/workpack-ctpadmin/workflow/add": {
        title: "Add Workflows",
        breadcrumb: ["Project Info", "Workpack & CTP Admin", "Add Workflows"],
      },
      "/project-info/workpack-ctpadmin/workflow/edit": {
        title: "Edit Workflows",
        breadcrumb: ["Project Info", "Workpack & CTP Admin", "Edit Workflows"],
      },
      "/project-info/checksheet-admin": {
        title: "Checksheet Admin",
        breadcrumb: ["Project Info", "Checksheet Admin"],
      },
      "/project-info/checksheet-admin/add": {
        title: "Add Checksheet",
        breadcrumb: ["Project Info", "Checksheet Admin", "Add Checksheet"],
      },
      "/project-info/checksheet-admin/edit": {
        title: "Edit Checksheet",
        breadcrumb: ["Project Info", "Checksheet Admin", "Edit Checksheet"],
      },
      "/doc-reg/checksheet-master": {
        title: "Checksheet Masters",
        breadcrumb: ["Document Register", "Checksheet Masters"],
      },
      "/doc-reg/checksheet-master/add": {
        title: "Add Checksheet Masters",
        breadcrumb: ["Document Register", "Checksheet Masters", "Add Checksheet Master"],
      },
      "/doc-reg/drawings": {
        title: "Drawings",
        breadcrumb: ["Document Register", "Drawings"],
      },
      "/doc-reg/drawings/add": {
        title: "Add Drawing",
        breadcrumb: ["Document Register", "Drawings", "Add Drawing"],
      },
      "/doc-reg/drawings/edit": {
        title: "Edit Drawing",
        breadcrumb: ["Document Register", "Drawings", "Edit Drawing"],
      },
      "/doc-reg/drawings-status/add": {
        title: "Add Drawing Status",
        breadcrumb: ["Document Register", "Drawings", "Add Drawing Status"],
      },
      "/doc-reg/drawings-status/edit": {
        title: "Edit Drawing Status",
        breadcrumb: ["Document Register", "Drawings", "Edit Drawing"],
      },
      "/doc-reg/drawings-type/add": {
        title: "Add Drawing Type",
        breadcrumb: ["Document Register", "Drawings", "Add Drawing Type"],
      },
      "/doc-reg/drawings-type/edit": {
        title: "Edit Drawing Type",
        breadcrumb: ["Document Register", "Drawings", "Edit Drawing Type"],
      },
      "/doc-reg/certificate-masters": {
        title: "Certificate Masters",
        breadcrumb: ["Document Register", "Certificate Masters"],
      },
      "/doc-reg/certificate-masters/add": {
        title: "Add Certificate Masters",
        breadcrumb: ["Document Register", "Certificate Masters", "Add Certificate Masters"],
      },
      "/doc-reg/certificate-masters/edit": {
        title: "Edit Certificate Masters",
        breadcrumb: ["Document Register", "Certificate Masters", "Edit Certificate Masters"],
      },
      "/doc-reg/preservation-masters": {
        title: "Preservation Masters",
        breadcrumb: ["Document Register", "Preservation Masters"],
      },
      "/doc-reg/preservation-masters/add": {
        title: "Add Preservation Masters",
        breadcrumb: ["Document Register", "Preservation Masters", "Add Preservation Masters"],
      },
      "/doc-reg/handover-pack-template": {
        title: "Handover Pack Template",
        breadcrumb: ["Document Register", "Handover Pack Template"],
      },
      "/doc-reg/handover-pack-template/add": {
        title: "Add Handover Pack Template",
        breadcrumb: ["Document Register", "Handover Pack Template", "Add Handover Pack Template"],
      },
      "/doc-reg/handover-pack-template/edit": {
        title: "Edit Handover Pack Template",
        breadcrumb: ["Document Register", "Handover Pack Template", "Edit Handover Pack Template"],
      },
      "/doc-reg/commision-test-template": {
        title: "Commissioning Test Template",
        breadcrumb: ["Document Register", "Commissioning Test Template"],
      },
      "/doc-reg/commision-test-template/add": {
        title: "Add Commissioning Test Template",
        breadcrumb: ["Document Register", "Commissioning Test Template", "Add Commissioning Test Template"],
      },
      "/doc-reg/commision-test-template/edit": {
        title: "Edit Commissioning Test Template",
        breadcrumb: ["Document Register", "Commissioning Test Template", "Edit Commissioning Test Template"],
      },
      "/competency/expiry": {
        title: "Expiry",
        breadcrumb: ["Competency", "Expiry"],
      },
      "/competency/administration": {
        title: "Administration",
        breadcrumb: ["Competency", "Administration"],
      },
      "/competency/administration/add": {
        title: "Add Administration",
        breadcrumb: ["Competency", "Administration", "Add Administration"],
      },
      "/competency/administration/edit": {
        title: "Edit Administration",
        breadcrumb: ["Competency", "Administration", "Edit Administration"],
      },
      "/charts/checksheet-curve": {
        title: "Checksheet Curve",
        breadcrumb: ["S-Curves & Charts", "Checksheet Curve"],
      },
      "/charts/skyline-chart": {
        title: "Skyline Chart",
        breadcrumb: ["S-Curves & Charts", "Skyline Chart"],
      },
      "/charts/subsystem": {
        title: "SubSystem Gantt Chart",
        breadcrumb: ["S-Curves & Charts", "SubSystem Gantt Chart"],
      },
      "/reporting/standard": {
        title: "Standard Reports",
        breadcrumb: ["Reporting", "Standard Reports"],
      },
      "/reporting/scheduled": {
        title: "Scheduled Reports",
        breadcrumb: ["Reporting", "Scheduled Reports"],
      },
      "/reporting/composite": {
        title: "Composite Reports",
        breadcrumb: ["Reporting", "Composite Reports"],
      },
      "/reporting/composite/add": {
        title: "Add Composite Reports",
        breadcrumb: ["Reporting", "Composite Reports", "Add Composite Reports"],
      },
      "/reporting/composite/edit": {
        title: "Edit Composite Reports",
        breadcrumb: ["Reporting", "Composite Reports", "Edit Composite Reports"],
      },
      "/reporting/favourite": {
        title: "Favourite Reports",
        breadcrumb: ["Reporting", "Favourite Reports"],
      },
      "/project-documents": {
        title: "Project Documents",
        breadcrumb: ["Project Documents"],
      },
      "/project-documents/add": {
        title: "Add Project Documents",
        breadcrumb: ["Project Documents", "Add Project Documents"],
      },
      "/project-documents/edit": {
        title: "Edit Project Documents",
        breadcrumb: ["Project Documents", "Edit Project Documents"],
      },
      "/data-importing": {
        title: "Import Data",
        breadcrumb: ["Data Importing", "Import Data"],
      },
      "/admin/security": {
        title: "Security",
        breadcrumb: ["Admin", "Security"],
      },
      "/admin/security/user-acc/add": {
        title: "Add User",
        breadcrumb: ["Admin", "Security", "Add User"],
      },
      "/admin/security/user-group/add": {
        title: "Add Group",
        breadcrumb: ["Admin", "Security", "Add Group"],
      },
      "/admin/security/user-level/add": {
        title: "Add User Level",
        breadcrumb: ["Admin", "Security", "Add User Level"],
      },
      "/admin/admin-tasks": {
        title: "Admin Tasks",
        breadcrumb: ["Admin", "Admin Tasks"],
      },
      "/admin/report-admin": {
        title: "Report Admin",
        breadcrumb: ["Admin", "Report Admin"],
      },
      "/admin/report-admin/add": {
        title: "Add Report Admin",
        breadcrumb: ["Admin", "Report Admin", "Add Report Admin"],
      },
      "/admin/report-admin/edit": {
        title: "Edit Report Admin",
        breadcrumb: ["Admin", "Report Admin", "Edit Report Admin"],
      },
      "/admin/audit-log": {
        title: "Audit Log",
        breadcrumb: ["Admin", "Audit Log"],
      },
      "/admin/dashboard-layouts": {
        title: "Dashboard Layouts",
        breadcrumb: ["Admin", "Dashboard Layouts"],
      },
      "/admin/dashboard-layouts/add": {
        title: "Add Dashboard Layouts",
        breadcrumb: ["Admin", "Dashboard Layouts", "Add Dashboard Layouts"],
      },
      "/admin/dashboard-layouts/edit": {
        title: "Edit Dashboard Layouts",
        breadcrumb: ["Admin", "Dashboard Layouts", "Edit Dashboard Layouts"],
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

  // bindEvents() {
  //   this.removeEvents();

  //   // Sidebar route links - EXCLUDE buttons with data-close attribute
  //   const routeElements = document.querySelectorAll(
  //     "[data-route]:not([data-close])"
  //   );
  //   routeElements.forEach((item) => {
  //     item.addEventListener("click", this.handleRouteClick.bind(this));
  //   });
  //   if (!this.menuEventsbound) {
  //     document.querySelectorAll("[data-toggle]").forEach((toggle) => {
  //       toggle.addEventListener("click", this.handleToggleClick.bind(this));
  //     });
  //     this.menuEventsbound = true;
  //   }
  //   // Handle data-close buttons separately
  //   const closeElements = document.querySelectorAll("[data-close]");

  //   closeElements.forEach((button) => {
  //     button.addEventListener("click", this.handleCloseClick.bind(this));
  //   });
  // }
  bindEvents() {
    this.removeEvents();

    document.querySelectorAll("[data-route]:not([data-close])").forEach((item) => {
      item.addEventListener("click", this.handleRouteClick);
    });

    if (!this.menuEventsbound) {
      document.querySelectorAll("[data-toggle]").forEach((toggle) => {
        toggle.addEventListener("click", this.handleToggleClick);
      });
      this.menuEventsbound = true;
    }

    document.querySelectorAll("[data-close]").forEach((btn) => {
      btn.addEventListener("click", this.handleCloseClick);
    });
  }
  removeEvents() {
    document.querySelectorAll("[data-route]:not([data-close])").forEach((item) => {
      item.removeEventListener("click", this.handleRouteClick);
    });

    document.querySelectorAll("[data-close]").forEach((btn) => {
      btn.removeEventListener("click", this.handleCloseClick);
    });
  }
  // removeEvents() {
  //   // Store bound functions to properly remove them
  //   if (this.boundHandleRouteClick) {
  //     document
  //       .querySelectorAll("[data-route]:not([data-close])")
  //       .forEach((item) => {
  //         item.removeEventListener("click", this.boundHandleRouteClick);
  //       });
  //   }

  //   if (this.boundHandleCloseClick) {
  //     document.querySelectorAll("[data-close]").forEach((button) => {
  //       button.removeEventListener("click", this.boundHandleCloseClick);
  //     });
  //   }
  // }

  handleRouteClick(e) {
    e.preventDefault();
    const route = e.currentTarget.getAttribute("data-route");
    this.navigateTo(route);
  }

  handleToggleClick(e) {
    e.preventDefault();
    const menuId = e.currentTarget.getAttribute("data-toggle");
    this.toggleMenu(menuId);
  }

  handleCloseClick(e) {
    e.preventDefault();
    const route = e.currentTarget.getAttribute("data-route");
    if (route) {
      this.navigateTo(route);
    }
  }

  // navigateTo(route) {
  //   this.currentRoute = route;
  //   this.updateActiveNavigation();
  //   this.updateContent();
  //   this.updateURL();
  // }
  navigateTo(route) {
    if (this.routeConfig[this.currentRoute]?.cleanup) {
      this.routeConfig[this.currentRoute].cleanup();
    }

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
    document
      .querySelectorAll(".nav-group")
      .forEach((group) => group.classList.remove("expanded"));
    document
      .querySelectorAll(".chevron-icon")
      .forEach((chevron) => chevron.classList.remove("rotated"));

    // Find the navigation item to highlight
    let activeItem = document.querySelector(
      `[data-route="${this.currentRoute}"]:not([data-close])`
    );

    if (!activeItem) {
      activeItem = this.findParentRoute();
    }

    if (activeItem) {
      activeItem.classList.add("active");

      const isSubItem = activeItem.classList.contains("nav-sub-item");
      const navItem = activeItem.closest(".nav-item");

      if (navItem) {
        navItem.classList.add("active");
      }

      if (isSubItem) {
        const parentMenu = activeItem.closest(".nav-group");
        if (parentMenu) {
          parentMenu.classList.add("expanded");

          const parentNavItem = parentMenu.previousElementSibling;
          if (parentNavItem) {
            const iconContainer =
              parentNavItem.querySelector(".icon-container");
            if (iconContainer) {
              iconContainer.classList.add("active");
            }

            const chevron = parentNavItem.querySelector(".chevron-icon");
            if (chevron) {
              chevron.classList.add("rotated");
            }
          }
        }
      }
    } else {
      console.warn("❌ No active item found for route:", this.currentRoute);
    }
  }

  findParentRoute() {
    const currentPath = this.currentRoute;
    const pathSegments = currentPath
      .split("/")
      .filter((segment) => segment.length > 0);
    if (pathSegments.length > 2) {
      const parentRoute = "/" + pathSegments.slice(0, -1).join("/");
      const parentItem = document.querySelector(
        `[data-route="${parentRoute}"]:not([data-close])`
      );
      if (parentItem) {
        return parentItem;
      }
    }

    // If no parent found, try to find the closest matching route
    const allRouteItems = document.querySelectorAll(
      "[data-route]:not([data-close])"
    );
    for (let item of allRouteItems) {
      const itemRoute = item.getAttribute("data-route");
      if (currentPath.startsWith(itemRoute) && itemRoute !== currentPath) {
        return item;
      }
    }
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

  isSidebarCollapsed() {
    return document.querySelector(".sidebar")?.classList.contains("collapsed") ?? false;
  }

  updateContent() {
    const config = this.routeConfig[this.currentRoute];
    const contentContainer = document.getElementById("main-content");
    if (!contentContainer || !config) return;

    const pagePath = `./pages/${routeToFile(this.currentRoute)}`;

    fetch(pagePath)
      .then((res) => {
        if (!res.ok) throw new Error("Page not found");
        return res.text();
      })
      .then((html) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        contentContainer.replaceChildren(...temp.childNodes);

        this.updateBreadcrumb(config.breadcrumb);
        document.title = config.title;
        this.bindContentEvents();
      })
      .catch((err) => {
        contentContainer.innerHTML = `<div class="p-4 text-red-500">Error: ${err.message}</div>`;
      });
  }

  bindContentEvents() {
    document.querySelectorAll("[data-route]:not([data-close])").forEach((item) => {
      if (!item.hasAttribute("data-toggle")) {
        item.removeEventListener("click", this.handleRouteClick);
        item.addEventListener("click", this.handleRouteClick);
      }
    });

    document.querySelectorAll("[data-close]").forEach((button) => {
      button.removeEventListener("click", this.handleCloseClick);
      button.addEventListener("click", this.handleCloseClick);
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
  window.location.href = "index.html";
});

class DeleteModal extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "Delete";
    const btnName = this.getAttribute("btnName") || "Delete";
    const description =
      this.getAttribute("description") ||
      "This will delete the selected Item. Are you sure?";

    this.innerHTML = `
      <!-- Trigger Button -->
      <button id="openDeleteModal" class="theme-destructive-btn" aria-label="Delete Modal">${btnName}</button>
      
      <!-- Modal Overlay -->
      <div id="deleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
        <!-- Modal Content -->
        <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
          
          <!-- Header Icon -->
          <div class="w-full flex items-center justify-center gap-3 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </div>

          <!-- Body -->
          <div class="space-y-2 text-center px-6">
            <p class="text-xl font-semibold">${title}</p>
            ${description
        .split(".")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => `<p>${line}</p>`)
        .join("")}
          </div>

          <!-- Footer -->
          <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
            <button data-close class="theme-btn-outline">Cancel</button>
            <button data-close class="theme-destructive-btn">Delete</button>
          </div>
        </div>
      </div>
    `;

    const modal = this.querySelector("#deleteModal");
    const openBtn = this.querySelector("#openDeleteModal");

    // Open modal
    openBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    // Close modal buttons
    this.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    });

    // Close when clicking outside the modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }
}
customElements.define("delete-modal", DeleteModal);

class SearchInput extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="relative w-full max-w-sm">
        <!-- Search Icon -->
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
          </svg>
        </div>

        <!-- Input Field -->
        <input
          type="text"
          placeholder="Search..."
          class="w-full pl-10 pr-4 py-2 rounded-md border  focus:outline-none focus:ring-2 focus:ring-theme focus:border-transparent bg-theme-background text-sm"
        />
      </div>
    `;
  }
}
customElements.define("search-input", SearchInput);

class ProjectSelect extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
     <div class="relative max-w-auto min-w-[10rem]">
  <!-- Dropdown Trigger -->
  <div
    id="dropdownTrigger"
    class="flex items-center justify-between border px-4 py-2 rounded cursor-pointer bg-theme-header"
  >
    <span id="selectedText">Entire Project</span>
    <svg
      class="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>

  <!-- Dropdown Content -->
  <div
    id="dropdownMenu"
    class="absolute z-10 mt-1 w-full bg-brand-header border rounded shadow hidden"
  >
    <div class="flex justify-between p-2 px-4">
      <p class=" font-semibold">Description</p>
      <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
        >
          <path
            d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
    </div>
    <!-- Entire Project -->
   <div
  class="accordion-toggle dropdown-item flex items-center px-4 py-2 cursor-pointer"
  data-value="Entire Project"
>
      <svg
        width="14"
        height="14"
        class="icon"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
      >
        <path
          d="M5.6 8.4H8.4V7H5.6V8.4ZM5.6 6.3H11.2V4.9H5.6V6.3ZM5.6 4.2H11.2V2.8H5.6V4.2ZM4.2 11.2C3.815 11.2 3.48542 11.0629 3.21125 10.7887C2.93708 10.5146 2.8 10.185 2.8 9.8V1.4C2.8 1.015 2.93708 0.685417 3.21125 0.41125C3.48542 0.137083 3.815 0 4.2 0H12.6C12.985 0 13.3146 0.137083 13.5887 0.41125C13.8629 0.685417 14 1.015 14 1.4V9.8C14 10.185 13.8629 10.5146 13.5887 10.7887C13.3146 11.0629 12.985 11.2 12.6 11.2H4.2ZM4.2 9.8H12.6V1.4H4.2V9.8ZM1.4 14C1.015 14 0.685417 13.8629 0.41125 13.5887C0.137083 13.3146 0 12.985 0 12.6V2.8H1.4V12.6H11.2V14H1.4Z"
          fill="currentColor"
        />
      </svg>
      Entire Project
    </div>

    <!-- Site Locations -->
    <div class="accordion-toggle flex items-center px-4 py-2 cursor-pointer">
      <svg
        class="w-4 h-4 icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
      Site Locations
    </div>
    <div class="accordion-panel">
      <div
        class="dropdown-item"
        data-value="1923 - Atlanta Definitive Sytem"
      >
        1923 - Atlanta Definitive Sytem
      </div>
    </div>
  </div>
</div>
    `;

    const dropdownTrigger = this.querySelector("#dropdownTrigger");
    const dropdownMenu = this.querySelector("#dropdownMenu");
    const selectedText = this.querySelector("#selectedText");

    // Toggle dropdown
    dropdownTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("hidden");
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!this.contains(e.target)) {
        dropdownMenu.classList.add("hidden");
      }
    });

    // Accordion logic
    this.querySelectorAll(".accordion-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const panel = toggle.nextElementSibling;
        panel.classList.toggle("show");
      });
    });

    // Item selection
    this.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        selectedText.textContent = item.dataset.value;
        dropdownMenu.classList.add("hidden");
      });
    });
  }
}
customElements.define("project-select", ProjectSelect);

class ResetGridModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Trigger Button -->
      <button id="openResetModal" class="theme-btn-primary-outline" aria-label="Reset Grid Modal">Reset Grid</button>
      
      <!-- Modal Overlay -->
      <div id="resetModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
        <!-- Modal Content -->
        <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
          <!-- Header -->
          <div class="w-full flex items-center justify-center gap-3 p-4 mb-2">
            <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-yellow-500" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18A2 2 0 0 0 3.24 21H20.76A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </div>
          
          <!-- Body -->
          <div class="space-y-2 text-center">
          <p class="text-xl font-semibold" >Reset Grid</p>
            <p >This will reset all the data in the grid, </p>
            <p >Are you sure?</p>
          </div>
          
          <!-- Footer -->
          <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
            <button data-close class="theme-btn-outline">Cancel</button>
            <button data-close class="theme-warning-btn">Reset</button>
          </div>
        </div>
      </div>
    `;

    const modal = this.querySelector("#resetModal");
    const openBtn = this.querySelector("#openResetModal");

    // Open modal
    openBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    // Close modal
    this.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    });

    // Click outside to close
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }
}
customElements.define("reset-grid-modal", ResetGridModal);

class ShowLayoutsModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="theme-btn-primary-outline whitespace-nowrap" id="layoutBtn" aria-label="Open Filter Modal">
        Layouts
      </button>

      <div class="modal-overlay" id="layoutPopup">
        <div class=" rounded-lg w-full max-w-md shadow-lg border border-theme bg-theme-background">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-2 border-b border-theme">
            <h2 class="text-lg font-semibold">Choose layout</h2>
            <div class="space-x-4 flex items-center">
              <button data-close class="theme-btn-primary-outline ">Save Current Layout</button>
              <button data-close class="text-2xl w-5 h-5 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
         <div class="p-6 space-y-4">
  ${["Layout 1", "Layout 2", "Layout 3", "Layout 4"]
        .map(
          (label) => `
        <label class="flex items-center gap-2 text-sm">
          <input type="radio" class="w-4 h-4" name="layoutOption" value="${label}" /> ${label}
        </label>
      `
        )
        .join("")}
</div>


          <!-- Modal Footer -->
          <div class="bg-theme-surface py-3 flex justify-center gap-4 rounded-b-lg">
            <button data-close class="theme-btn w-[6rem]">Save</button>
          </div>

        </div>
      </div>

    `;

    const button = this.querySelector("#layoutBtn");
    const popup = this.querySelector("#layoutPopup");

    // Open modal
    button.addEventListener("click", () => {
      popup.classList.add("show");
    });

    // Close modal for all elements with data-close
    this.querySelectorAll("[data-close]").forEach((btn) =>
      btn.addEventListener("click", () => {
        popup.classList.remove("show");
      })
    );

    // Close when clicking outside modal
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("show");
      }
    });
  }
}
customElements.define("show-layout-modal", ShowLayoutsModal);

document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    document.body.innerHTML = "";

    fetch("./pages/login.html")
      .then((res) => res.text())
      .then((html) => {
        document.open();
        document.write(html);
        document.close();
      })
      .catch((err) => {
        console.error("Failed to load login page:", err);
      });
  }
});
