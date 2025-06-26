const now = new Date();
document.getElementById("date").textContent = now.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

document.getElementById("time").textContent = now.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

console.log("JS is working!");

// Navigation and URL Management
class NavigationManager {
  constructor() {
    this.currentRoute = "/outstanding/checksheets";
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
        breadcrumb: ["Database", "Tags"],
        description: "Manage project tags and references",
      },
      "/outstanding/checksheets": {
        title: "Checksheets",
        breadcrumb: ["Outstanding Items", "Checksheets"],
        description: "Manage and track your project checksheets",
      },
      "/outstanding/punchlists": {
        title: "Punchlists",
        breadcrumb: ["Outstanding Items", "Punchlists"],
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
    };
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateActiveNavigation();
    this.simulateURLChange();
  }

  bindEvents() {
    // Navigation item clicks
    document.querySelectorAll("[data-route]").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const route = item.getAttribute("data-route");
        this.navigateTo(route);
      });
    });

    // Menu toggle functionality
    document.querySelectorAll("[data-toggle]").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const menuId = toggle.getAttribute("data-toggle");
        this.toggleMenu(menuId);
      });
    });
  }

  navigateTo(route) {
    this.currentRoute = route;
    this.updateActiveNavigation();
    this.updateContent();
    this.updateURL();
  }

  updateActiveNavigation() {
    // Remove all active states
    document.querySelectorAll(".nav-item, .nav-sub-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Set active state for current route
    const activeItem = document.querySelector(
      `[data-route="${this.currentRoute}"]`
    );
    if (activeItem) {
      activeItem.classList.add("active");

      // Expand parent menu if it's a sub-item
      const parentMenu = activeItem.closest(".nav-group");
      if (parentMenu) {
        parentMenu.classList.add("expanded");
        const chevron =
          parentMenu.previousElementSibling.querySelector(".chevron-icon");
        if (chevron) {
          chevron.classList.add("rotated");
        }
      }
    }
  }

  updateContent() {
    const config = this.routeConfig[this.currentRoute];
    if (config) {
      // Update page title
      const titleElement = document.getElementById("page-title");
      // if (titleElement) {
      //   titleElement.textContent = config.title;
      //   titleElement.nextElementSibling.textContent = config.description;
      // }

      // Update breadcrumb
      // this.updateBreadcrumb(config.breadcrumb);

      // Update current route display
      // document.getElementById("current-route").textContent =
      //   this.currentRoute;
    }
  }

  updateBreadcrumb(breadcrumbItems) {
    const breadcrumbContainer = document.getElementById("breadcrumb");
    breadcrumbContainer.innerHTML = "";

    breadcrumbItems.forEach((item, index) => {
      const span = document.createElement("span");
      span.className = "breadcrumb-item";
      span.textContent = item;
      breadcrumbContainer.appendChild(span);

      if (index < breadcrumbItems.length - 1) {
        const chevron = document.createElement("i");
        chevron.className = "fas fa-chevron-right text-xs text-gray-400";
        breadcrumbContainer.appendChild(chevron);
      }
    });
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

  updateURL() {
    console.log(`Navigation: ${this.currentRoute}`);
    // In a real application with Tailwind CLI build process:
    // history.pushState({}, '', this.currentRoute);
  }

  simulateURLChange() {
    window.addEventListener("popstate", (e) => {
      this.updateActiveNavigation();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const navManager = new NavigationManager();

  const searchInput = document.querySelector('input[placeholder*="Search"]');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        console.log("Searching for:", this.value);
        if (this.value) {
          this.classList.add("ring-2", "ring-brand");
        } else {
          this.classList.remove("ring-2", "ring-brand");
        }
      }, 300);
    });
  }

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function (e) {
      console.log("Button clicked:", this.textContent.trim());

      const ripple = document.createElement("span");
      ripple.className =
        "absolute inset-0 rounded-lg bg-white/20 transform scale-0 animate-ping";
      this.style.position = "relative";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 300);
    });
  });
});
