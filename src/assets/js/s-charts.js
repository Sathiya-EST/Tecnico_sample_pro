
class SChartChecksheetsFilter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="icon-btn" id="filterBtn" aria-label="Open Filter Modal">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>
      <div class="modal-overlay" id="filterPopup">
        <div class="modal-content border border-theme bg-theme-background ">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-2 border-b border-theme">
            <h2 class="text-lg font-semibold">Filter</h2>
            <div class="space-x-4">
            <button class="theme-btn-outline">Clear Filter</button>
            <button data-close class="text-2xl w-2">
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
            <div class="grid grid-cols-4 gap-4 gap-y-10 items-center">
              <!-- Select fields -->
             
              ${["Check Type", "Discipline"]
        .map(
          (label) => `
                <div class="space-y-1">
                  <label class="block">${label}</label>
                  <div class="relative">
                    <select class="bg-theme-background select-input border-theme pr-10 appearance-none">
                      <option>Select</option>
                    </select>
                    <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              `
        )
        .join("")}

                ${["Start Date", "End Date"]
        .map(
          (label) => `
                    <div class="space-y-1">
                            <label class="block text-sm font-medium">${label}</label>
                        <input
                type="date"
                id="issueDate"
                name="issueDate"
                placeholder="Date"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
            />
                        </div>
                            `
        )
        .join("")}
                   ${[
        "Cumulative",
        "Per Instance",
        "Display As Burn Down",
        "Show Trend ",
      ]
        .map(
          (label) => `
                <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
              `
        )
        .join("")}
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-theme-surface py-3 flex justify-center gap-4 rounded-b-lg">
            <button data-close class="theme-btn w-[6rem]">Apply</button>
          </div>
        </div>
      </div>
    `;

    const button = this.querySelector("#filterBtn");
    const popup = this.querySelector("#filterPopup");

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
customElements.define("schart-checksheets-curve-filter", SChartChecksheetsFilter);

class SaveCurve extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openSaveCurveModal" class="theme-btn"  aria-label="markOffered Modal">Save</button>
        <!-- Modal Overlay -->
        <div id="markOfferedModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50  hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
<svg class="w-12 h-12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z"></path>
    <path d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"></path>
  </g>
</svg>
            </div>

            <!-- Body -->
            <div class="space-y-2 text-center">
              <p class="text-xl font-semibold">Save Curve</p>
              <p >This will Save the Current Checksheet Curve,</p>
              <p >Are you sure?</p>
            </div>

            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      `;

    const modal = this.querySelector("#markOfferedModal");
    const openBtn = this.querySelector("#openSaveCurveModal");

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
customElements.define("save-curve", SaveCurve);

class SwitchToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.checked = this.hasAttribute("checked");
  }

  connectedCallback() {
    this.render();
    this.toggleBtn = this.shadowRoot.querySelector("button");

    this.toggleBtn.addEventListener("click", () => {
      this.checked = !this.checked;
      this.update();
      this.dispatchEvent(new CustomEvent("change", {
        detail: { checked: this.checked },
        bubbles: true,
      }));
    });
  }

  update() {
    this.toggleBtn.setAttribute("aria-checked", this.checked);
    this.toggleBtn.classList.toggle("bg-theme-primary", this.checked);
    this.toggleBtn.classList.toggle("bg-gray-300", !this.checked);
    this.knob.classList.toggle("translate-x-5", this.checked);
    this.knob.classList.toggle("translate-x-0", !this.checked);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <button role="switch" aria-checked="${this.checked}"
        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-${this.checked ? "theme-primary" : "gray-300"}"
      >
        <span
          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${this.checked ? "translate-x-5" : "translate-x-0"}"
        ></span>
      </button>
    `;
    this.knob = this.shadowRoot.querySelector("span");
  }
}
customElements.define("switch-toggle", SwitchToggle);

class SkyLineFilter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="icon-btn" id="filterBtn" aria-label="Open Filter Modal">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.586V4z" />
        </svg>
      </button>

      <div class="modal-overlay" id="filterPopup">
        <div class="modal-content border border-theme bg-theme-background">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-2 border-b border-theme">
            <h2 class="text-lg font-semibold">Filter</h2>
            <div class="space-x-4">
              <button class="theme-btn-outline">Clear Filter</button>
              <button data-close class="text-2xl w-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-4 gap-4 gap-y-10 items-center">

              ${["Skyline Type"].map(label => `
                <div class="space-y-1">
                  <label class="block">${label}</label>
                  <div class="relative">
                    <select class="bg-theme-background select-input border-theme pr-10 appearance-none">
                      <option>Select</option>
                    </select>
                    <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              `).join("")}

              ${["Start Date", "End Date"].map(label => `
                <div class="space-y-1">
                  <label class="block text-sm font-medium">${label}</label>
                  <input type="date" class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm" />
                </div>
              `).join("")}

              ${["Unit", "System", "SubSystem", "SubSystem Group", "Cert Type", "Workpack Type"].map(label => `
                <div class="space-y-1">
                  <label class="block">${label}</label>
                  <div class="relative">
                    <select class="bg-theme-background select-input border-theme pr-10 appearance-none">
                      <option>Select</option>
                    </select>
                    <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              `).join("")}

              ${[
        "Include Unit Ref", "Include System Ref", "Include Turnover Group",
        "Only Show Overdue Certificates", "Include Checksheets", "Include Punchlists", "Include Certificates"
      ].map(label => `
                  <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
              `).join("")}

  <div class="flex items-center space-x-3">
                        <span >In Progress</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" id="basic-switch">
                            <div class="switch-bg relative w-11 h-6 bg-theme-background rounded-full ring-1 peer-focus:ring-2 peer-focus:ring-blue-300">
                                <div class="switch-slider absolute top-0.5 left-0.5 bg-white border border-theme rounded-full h-5 w-5 shadow-sm transition-transform duration-300 ease-in-out"></div>
                            </div>
                        </label>
                    </div>
  <div class="flex items-center space-x-3">
                        <span >Ready</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" id="basic-switch">
                            <div class="switch-bg relative w-11 h-6 bg-theme-background ring-1 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300">
                                <div class="switch-slider absolute top-0.5 left-0.5 bg-white border border-theme rounded-full h-5 w-5 shadow-sm transition-transform duration-300 ease-in-out"></div>
                            </div>
                        </label>
                    </div>
                      <div class="flex items-center space-x-3">
                        <span >Offered</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" id="basic-switch">
                            <div class="switch-bg relative w-11 h-6 bg-theme-background ring-1 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300">
                                <div class="switch-slider absolute top-0.5 left-0.5 bg-white border border-theme rounded-full h-5 w-5 shadow-sm transition-transform duration-300 ease-in-out"></div>
                            </div>
                        </label>
                    </div>
                      <div class="flex items-center space-x-3">
                        <span >Accepted</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" id="basic-switch">
                            <div class="switch-bg relative w-11 h-6 bg-theme-background ring-1 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300">
                                <div class="switch-slider absolute top-0.5 left-0.5 bg-white border border-theme rounded-full h-5 w-5 shadow-sm transition-transform duration-300 ease-in-out"></div>
                            </div>
                        </label>
                    </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-theme-surface py-3 flex justify-center gap-4 rounded-b-lg">
            <button data-close class="theme-btn w-[6rem]">Apply</button>
          </div>
        </div>
      </div>
    `;

    const button = this.querySelector("#filterBtn");
    const popup = this.querySelector("#filterPopup");

    button.addEventListener("click", () => popup.classList.add("show"));
    this.querySelectorAll("[data-close]").forEach((btn) =>
      btn.addEventListener("click", () => popup.classList.remove("show"))
    );
    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.classList.remove("show");
    });
  }
}
customElements.define("skyline-filter", SkyLineFilter);

class SChartSubsystemFilter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="icon-btn" id="filterBtn" aria-label="Open Filter Modal">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>
      <div class="modal-overlay" id="filterPopup">
        <div class="modal-content border border-theme bg-theme-background ">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-2 border-b border-theme">
            <h2 class="text-lg font-semibold">Filter</h2>
            <div class="space-x-4">
            <button class="theme-btn-outline">Clear Filter</button>
            <button data-close class="text-2xl w-2">
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
            <div class="grid grid-cols-4 gap-4 gap-y-10 items-center">
              <!-- Select fields -->
             
              ${["Chart Level", "Checksheet Type", "Checksheet", "Discipline"]
        .map(
          (label) => `
                <div class="space-y-1">
                  <label class="block">${label}</label>
                  <div class="relative">
                    <select class="bg-theme-background select-input border-theme pr-10 appearance-none">
                      <option>Select</option>
                    </select>
                    <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              `
        )
        .join("")}

                ${["Start Date", "End Date"]
        .map(
          (label) => `
                    <div class="space-y-1">
                            <label class="block text-sm font-medium">${label}</label>
                        <input
                type="date"
                id="issueDate"
                name="issueDate"
                placeholder="Date"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
            />
                        </div>
                            `
        )
        .join("")}
                   ${[
        "Show Progress",
      ]
        .map(
          (label) => `
                <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
              `
        )
        .join("")}
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-theme-surface py-3 flex justify-center gap-4 rounded-b-lg">
            <button data-close class="theme-btn w-[6rem]">Apply</button>
          </div>
        </div>
      </div>
    `;

    const button = this.querySelector("#filterBtn");
    const popup = this.querySelector("#filterPopup");

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
customElements.define("schart-subsystem-filter", SChartSubsystemFilter);
