class ProjectSelect extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
     <div class="relative max-w-80 min-w-36">
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

    <!-- Project Beta -->
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
      Project Beta
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

class DashboardFilter extends HTMLElement {
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
        <div class="modal-content border border-theme bg-theme-background">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-theme">
            <h2 class="text-lg font-semibold">Filter</h2>
            <button data-close class="text-2xl">&times;</button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-4 gap-4 items-center">
              <!-- Select fields -->
              ${["Select Layout", "Type", "SubType"]
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
              <div class="space-y-1">
                <label class="block">Unit</label>
                <div>Value</div>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-4">
              <div class="space-y-1">
                <label class="block">System</label>
                <div>Value</div>
              </div>
              <div class="space-y-1">
                <label class="block">SubSystem</label>
                <div>Value</div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-theme-surface py-3 flex justify-center gap-4 rounded-b-lg">
            <button data-close class="theme-btn-outline font-semibold">Schedule</button>
            <button class="theme-btn-outline">Clear</button>
            <button data-close class="theme-btn">Filter</button>
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

customElements.define("dashboard-filter", DashboardFilter);
