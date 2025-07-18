// Unit
class UnitTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Unit Reference", "Unit Description", "Imported", "Verified", "Verified By", "Verifying Responsible Group", "Verified At", "Under MoC",
      "Prevent Auto Population Of Certificates", "Unit C1", "Archived"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("unit-table", UnitTable);

class UnitFilter extends HTMLElement {
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
            <div class="grid grid-cols-4 gap-4 items-center"> 
                   ${[
        "Show Tag Count", "Show Deleted", "Show Progress",
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
customElements.define("unit-filter", UnitFilter);

class AddUnit extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Unit Reference",
        "Unit Description",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
            ${["Imported", "Verified"]
        .map(
          (label) => `
                    <label class="flex items-center gap-2">
                    <input type="radio" class="w-4 h-4" /> ${label}
                    </label>
                        `
        )
        .join("")}
                ${["Verified By"]
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
        "Verifying Responsibble Group",
        "Verified At",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
                 ${["Under MOC", "Prevent Auto Population Of Certificates"]
        .map(
          (label) => `
                    <label class="flex items-center gap-2">
                    <input type="radio" class="w-4 h-4" /> ${label}
                    </label>
                        `
        )
        .join("")}
                  ${[
        "Unit C1",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
                ${["Archived"]
        .map(
          (label) => `
                    <label class="flex items-center gap-2">
                    <input type="radio" class="w-4 h-4" /> ${label}
                    </label>
                        `
        )
        .join("")}
                </div>
    `;
  }
}
customElements.define("add-unit", AddUnit);

//System
class SystemTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Unit Ref", "System Ref", "System Description", "Sys C1", "System Engineer 1", "System Engineer 2"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("system-table", SystemTable);

class SystemFilter extends HTMLElement {
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
            <div class="grid grid-cols-4 gap-4 items-center"> 
                   ${[
        "Show Tag Count", "Show Deleted", "Show Progress",
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
customElements.define("system-filter", SystemFilter);

class AddSystem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Unit Reference", "System Ref", "System Description", "System Engineer 1", "System Engineer 2"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-system", AddSystem);
//Sub System
class SubSystemTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Unit Ref", "System Ref", "SubSystem Ref", "SubSystem Description", "SubSystem Group", "Pre-Walk Planned", "Pre-Walk Forecast",
      "Pre-Walk Actual", "Walk Down Planned", "Walk Down Actual", "Home Drawing Ref", "Phase", "SubSys C1", "SubSys Engineer 1",
      "SubSys Engineer 2", "Deleted?"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("sub-system-table", SubSystemTable);

class AddSubSystem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Unit Reference", "System Ref", "SubSystem Ref", "SubSystem Description", "Pre-walk Planned", "Pre-walk Forecast", "Pre-walk Actual", "Walk Down Planned", "Walk Down Actual", "Home Drawing Ref", "Phase SubSys 1", "SubSys Engineer 1", "SubSys Engineer 2"]
        .map(
          (label) => `
        <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
    `
        )
        .join("")}
        ${[
        "Deleted",
      ]
        .map(
          (label) => `
                <label class="flex items-center gap-2 mt-6">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
              `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-sub-system", AddSubSystem);
//Site Location
class SiteLocationTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Site Location", "Site Location Description", "Added At", "Added By", "Imported", "Completed", "Verified",
      "Verified By", "Verifying Responsible Group", "Verified At"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("site-location-table", SiteLocationTable);

class SitLocationFilter extends HTMLElement {
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
            <div class="grid grid-cols-4 gap-4 items-center"> 
                   ${[
        "Show Tag Count", "Show Deleted"
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
customElements.define("site-location-filter", SitLocationFilter);

class AddSiteLocation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Site Location",
        "Site Location  Description",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
                ${["Added At"]
        .map(
          (label) => `
                          <div class="space-y-1">
                                  <label class="block text-sm font-medium">${label}</label>
                              <input
                      type="date"
                      id="addedDate"
                      name="addedDate"
                      placeholder="Date"
                      class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                  />
                              </div>
                                  `
        )
        .join("")}
                 ${[
        "Added By",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
                  
                 ${["Imported", "Completed", "Verified"]
        .map(
          (label) => `
                    <label class="flex items-center gap-2">
                    <input type="radio" class="w-4 h-4" /> ${label}
                    </label>
                        `
        )
        .join("")}
                 ${["Verified By"]
        .map(
          (label) => `
                          <div class="space-y-1">
                                  <label class="block text-sm font-medium">${label}</label>
                              <input
                      type="date"
                      id="addedDate"
                      name="addedDate"
                      placeholder="Date"
                      class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                  />
                              </div>
                                  `
        )
        .join("")}
                   ${[
        "Verifying Responsibble Group", "Verified At"
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
                </div>
    `;
  }
}
customElements.define("add-site-location", AddSiteLocation);

//Site Area
class SiteAreaTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Location Ref", "Area Ref", "Area Description", "Area Is Hazardous"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("site-area-table", SiteAreaTable);

class AddSiteArea extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Location Ref",
        "Area Ref",
        "Area Description",
      ]
        .map(
          (label) => `
             <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
            `
        )
        .join("")}
                
                  
                 ${["Hazardous Area"]
        .map(
          (label) => `
                    <label class="flex items-center gap-2">
                    <input type="radio" class="w-4 h-4" /> ${label}
                    </label>
                        `
        )
        .join("")}
         </div>
    `;
  }
}
customElements.define("add-site-area", AddSiteArea);

//Site Sub Area
class SiteSubAreaTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Location Ref", "Area Ref", "SubArea Ref", "SubArea Description"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("site-sub-area-table", SiteSubAreaTable);

class AddSiteSubArea extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Location Ref",
        "Area Ref",
        "SubArea Ref",
        "SubArea Description",
      ]
        .map(
          (label) => `
             <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
            `
        )
        .join("")}
         </div>
    `;
  }
}
customElements.define("add-site-sub-area", AddSiteSubArea);

class TypeFilter extends HTMLElement {
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
            <div class="grid grid-cols-4 gap-4 items-center"> 
                   ${[
        "Show Tag Count", "Show Deleted"
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
customElements.define("type-filter", TypeFilter);

class AddType extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Type Ref", "Type Description"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-type", AddType);

class AddSubType extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Type Ref", "SubType Ref", "SubType Description"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
  ${["SubType Is Cable"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
         <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-sub-type", AddSubType);

// Verification
class VerificationTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Unit Ref", "System Ref", "SubSystem Ref", "Discipline Ref", "1st Pass By", "1st Pass Responsible Group",
      "1st Pass At", "2nd Pass By", "2nd Pass Responsible Group", "2nd Pass At", "Verified"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("verification-table", VerificationTable);

class VerificationFilter extends HTMLElement {
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
            <div class="grid grid-cols-4 gap-4 items-center"> 
                   ${[
        "Include Descriptions", "Show Tag Count", "Show Associated Tags", "Show Verified"
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
customElements.define("verification-filter", VerificationFilter);

class GenerateModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openGenerateModal" class="theme-btn-primary-outline"  aria-label="markOffered Modal">Generate</button>
        <!-- Modal Overlay -->
        <div id="generateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50  hidden">
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
              <p class="text-xl font-semibold">Generate</p>
              <p >This will Generate the Verification List,</p>
              <p >Are you sure?</p>
            </div>

            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button data-close class="theme-btn">Yes, Proceed</button>
            </div>
          </div>
        </div>
      `;

    const modal = this.querySelector("#generateModal");
    const openBtn = this.querySelector("#openGenerateModal");

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
customElements.define("generate-modal", GenerateModal);

class UnVerifyModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Trigger Button -->
      <button id="openResetModal" class="theme-warning-btn" aria-label="Un-Verify Modal">Un-Verify</button>
      
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
          <p class="text-xl font-semibold" >Un-Verify</p>
            <p >This will Un-verify the selected data, </p>
            <p >Are you sure?</p>
          </div>
          
          <!-- Footer -->
          <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
            <button data-close class="theme-btn-outline">Cancel</button>
            <button data-close class="theme-warning-btn">Yes, Proceed</button>
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
customElements.define("un-verify-modal", UnVerifyModal);

class FirstPassModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openFirstPassModalModal" class="theme-btn"  aria-label="markOffered Modal">First Pass</button>
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
              <p class="text-xl font-semibold">First Pass</p>
              <p >This will make the data as first level Pass,</p>
              <p >Are you sure?</p>
            </div>

            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button data-close class="theme-btn">Yes, Proceed</button>
            </div>
          </div>
        </div>
      `;

    const modal = this.querySelector("#markOfferedModal");
    const openBtn = this.querySelector("#openFirstPassModalModal");

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
customElements.define("first-pass-modal", FirstPassModal);

class SecondPassModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openSecondPassModalModal" class="theme-btn"  aria-label="markOffered Modal">Second Pass</button>
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
              <p class="text-xl font-semibold">Second Pass</p>
              <p>This will make the data as Second level Pass,</p>
              <p>Are you sure?</p>
            </div>

            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button data-close class="theme-btn">Yes, Proceed</button>
            </div>
          </div>
        </div>
      `;

    const modal = this.querySelector("#markOfferedModal");
    const openBtn = this.querySelector("#openSecondPassModalModal");

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
customElements.define("second-pass-modal", SecondPassModal);

//Integrity
class IntegritySysWithNoSubSystemTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Unit Ref", "Unit Description", "System Ref", "System Description", "System Completed"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("integrity-sys-with-no-subsystem-table", IntegritySysWithNoSubSystemTable);

class IntegritySubSysWithNoTagsTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Unit Ref", "Unit Description", "Tag No", "Tag Description", "Tag Completed"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("integrity-subsys-with-no-tags-table", IntegritySubSysWithNoTagsTable);

class IntegrityTagsWithNoChacksheetsTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Unit Ref", "Unit Description", "Checksheet Id", "Checksheet Description", "Checksheet Completed"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("integrity-tag-with-no-checksheets-table", IntegrityTagsWithNoChacksheetsTable);

class IntegrityCablesWithNoToFormEntitiesTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Unit Ref", "Unit Description", "Cable No", "Cable Description", "Cable Completed"
    ];

    const rowCount = 8;
    const pageCount = 15;
    const currentPage = 1;

    this.innerHTML = `
      <div class="page-section border-theme">
        <div class="overflow-x-auto w-full tag-table-scrollable">
          <table class="w-full min-w-[max-content]">
            <thead class="border-b border-gray-200">
              <tr class="table-heading">
                ${columns.map(col => `
                  <th class="table-header min-w-[2rem] whitespace-nowrap px-2 py-1">
                    <span>${col}</span>
                  </th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: rowCount }).map((_, idx) => `
                <tr class="table-row-style ${idx % 2 === 1 ? "even-row" : ""}">
                  ${columns.map(() => `
                    <td class="min-w-[2rem] whitespace-nowrap px-2 py-1"></td>`).join("")}
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-footer mt-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p class="font-semibold">Page ${currentPage} of ${pageCount}</p>
        </div>
        <div class="pagination-wrapper flex gap-2 mt-2 md:mt-0">
          <button class="pagination-btn">&lt;</button>
          <button class="pagination-btn">First</button>
          <button class="pagination-btn pagination-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="w-9 h-9 flex items-center justify-center">...</span>
          <button class="pagination-btn">${pageCount}</button>
          <button class="pagination-btn">Last</button>
          <button class="pagination-btn">&gt;</button>
        </div>
      </div>
    `;
  }
}
customElements.define("integrity-table-with-no-to-form-entities-table", IntegrityCablesWithNoToFormEntitiesTable);

class IntegrityTabs extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4">
        <div class="tab-header">
          <button class="tab-button active" data-tab="tab1">Systems with no SubSystems</button>
          <button class="tab-button" data-tab="tab2">Systems with no Tags</button>
          <button class="tab-button" data-tab="tab3">Tags with no Checksheets</button>
          <button class="tab-button" data-tab="tab4">Cables with no To/From Entries</button>
          <button class="tab-button" data-tab="tab5">Orphaned Child tags</button>
          <button class="tab-button" data-tab="tab6">Orphaned Loop tags</button>
        </div>

        ${this.getTabHTML('tab1')}
        ${this.getTabHTML('tab2')}
        ${this.getTabHTML('tab3')}
        ${this.getTabHTML('tab4')}
        ${this.getTabHTML('tab5')}
        ${this.getTabHTML('tab6')}
      </div>
    `;

    this.querySelectorAll(".tab-button").forEach(button => {
      button.addEventListener("click", (e) => {
        const tabId = button.getAttribute("data-tab");
        this.switchTab(e, tabId);
      });
    });
  }

  switchTab(event, tabId) {
    const tabs = this.querySelectorAll(".tab-content");
    const buttons = this.querySelectorAll(".tab-button");

    tabs.forEach(tab => tab.classList.add("hidden"));
    buttons.forEach(btn => btn.classList.remove("active"));

    this.querySelector(`#${tabId}`).classList.remove("hidden");
    event.currentTarget.classList.add("active");
  }

  getTabHTML(id) {
    const tabComponents = {
      'tab1': `
      <div class="space-y-4">
      <div>
        <search-input></search-input>
      </div>
      <integrity-sys-with-no-subsystem-table></integrity-sys-with-no-subsystem-table>
      </div>
    
    `,
      'tab2': `
       <div class="space-y-4">
      <div>
        <search-input></search-input>
      </div>
      <integrity-subsys-with-no-tags-table></integrity-subsys-with-no-tags-table>
      </div>`,
      'tab3': `
       <div class="space-y-4">
      <div>
        <search-input></search-input>
      </div>
      <integrity-tag-with-no-checksheets-table></integrity-tag-with-no-checksheets-table>
      </div>`,
      'tab4': `
       <div class="space-y-4">
      <div>
        <search-input></search-input>
      </div>
      <integrity-table-with-no-to-form-entities-table></integrity-table-with-no-to-form-entities-table>
      </div>`,
      'tab5': ``,
      'tab6': ``
    };

    return `
      <div id="${id}" class="tab-content ${id === 'tab1' ? '' : 'hidden'} space-y-4">
        ${tabComponents[id]}
      </div>
    `;
  }
}
customElements.define("integrity-tabs", IntegrityTabs);

// Discipline
class DisciplineFilter extends HTMLElement {
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
            <div class="grid grid-cols-4 gap-4 items-center"> 
                   ${[
        "Show Item Count", "Show Deleted"
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
customElements.define("dicipline-filter", DisciplineFilter);

class AddDiscipline extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Ref", "Description"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-discipline", AddDiscipline);

class EditDisciplineSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Discipline,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/disciplines" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-discipline-save-button",
  EditDisciplineSaveButton
);

class TagGroupFilter extends HTMLElement {
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
            <div class="grid grid-cols-4 gap-4 items-center"> 
                   ${[
        "Show Tag Count", "Show Deleted"
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
customElements.define("tag-group-filter", TagGroupFilter);

class AddTagGroup extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="grid grid-cols-4 gap-4 mt-6">

        <!-- Tag Group -->
        <div class="col-span-1 space-y-1">
          <label class="block text-sm font-medium">Tag Group</label>
          <input
            type="text"
            class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
            placeholder="Enter"
          />
        </div>
        <div class="col-span-3"></div>

        <!-- Tag Description -->
        <div class="col-span-1 space-y-1">
          <label class="block text-sm font-medium">Tag Description</label>
          <input
            type="text"
            class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
            placeholder="Enter"
          />
        </div>
        <div class="col-span-3"></div>

        <!-- Imported Radio -->
        <div class="col-span-1">
          <label class="flex items-center gap-2 mt-2">
            <input type="radio" class="w-4 h-4" />
            Imported
          </label>
        </div>
        <div class="col-span-3"></div>

        <!-- Added By -->
        <div class="col-span-1 space-y-1">
          <label class="block text-sm font-medium">Added By</label>
          <input
            type="text"
            class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
            placeholder="Enter"
          />
        </div>
        <div class="col-span-3"></div>

        <!-- Added Date -->
        <div class="col-span-1 space-y-1">
          <label class="block text-sm font-medium">Added Date</label>
          <input
            type="date"
            id="addedDate"
            name="addedDate"
            class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          />
        </div>
        <div class="col-span-3"></div>

      </div>
    `;
  }
}
customElements.define("add-tag-group", AddTagGroup);

class AddPunchListAdmin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="p-6 space-y-4">
            <div class="grid grid-cols-4 gap-4 items-center"> 
                  ${[
        "Punchlist Category",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
         ${[
        "Prevent Checksheet Completion"
      ]
        .map(
          (label) => `
                <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
              `
        )
        .join("")}
        ${["Added At"]
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
        "Added By",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
          ${[
        "2 Step Verification"
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
    `;
  }
}
customElements.define("add-punchlist-admin", AddPunchListAdmin);

class AddPLCategory extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Punchlist Category"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
  ${["Prevent Checksheet Completion"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
          <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}

         ${["Added At"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
         <label class="block text-sm font-medium">${label}</label>
                              <input
                      type="date"
                      id="issueDate"
                      name="issueDate"
                      placeholder="Date"
                      class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                  />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
 ${["Added By"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
          ${["2 Step Verification"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
          <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-pl-category", AddPLCategory);

class AddPLCommonItems extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Common Items", "Discipline", "Group", "Normal Man Hours"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
      </div>
    `;
  }
}
customElements.define("add-pl-common-items", AddPLCommonItems);

class PunchlistForm extends HTMLElement {
  connectedCallback() {
    const fileUploadId = `file-upload-${Math.random().toString(36).slice(2)}`;

    this.innerHTML = `
      <button class="theme-btn-primary-outline" id="puchlistFormBtn" aria-label="Open Punchlist Form Modal">Punchlist Form</button>
      <div class="modal-overlay" id="filterPopup">
        <div class="modal-content border border-theme bg-theme-background">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-2 border-b border-theme">
            <h2 class="text-lg font-semibold">Filter</h2>
            <div class="space-x-4">
              <button data-close class="text-2xl w-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-4 gap-4 items-center" id="templateRadioGroup"> 
              <label class="flex items-center gap-2">
                <input type="radio" name="template" value="default" class="w-4 h-4" checked /> Use Default
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" name="template" value="custom" class="w-4 h-4" /> Custom Template
              </label>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-theme-surface space-y-4 p-3 gap-4 rounded-b-lg border-t border-theme">
            <div>
              <file-upload id="${fileUploadId}" disabled></file-upload>
            </div>
            <div class="flex justify-center">
              <button data-close class="theme-btn w-[6rem]">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const button = this.querySelector("#puchlistFormBtn");
    const popup = this.querySelector("#filterPopup");

    // Open modal
    button.addEventListener("click", () => {
      popup.classList.add("show");
    });

    // Close modal
    this.querySelectorAll("[data-close]").forEach((btn) =>
      btn.addEventListener("click", () => {
        popup.classList.remove("show");
      })
    );

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("show");
      }
    });

    // Enable/Disable File Upload
    const fileUploadEl = () => this.querySelector(`#${fileUploadId}`);
    const radios = this.querySelectorAll('input[name="template"]');

    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio.value === "custom" && radio.checked) {
          fileUploadEl().removeAttribute("disabled");
          fileUploadEl().connectedCallback(); // re-render component
        } else if (radio.value === "default" && radio.checked) {
          fileUploadEl().setAttribute("disabled", "");
          fileUploadEl().connectedCallback(); // re-render component
        }
      });
    });
  }
}
customElements.define("punchlist-form", PunchlistForm);

class TQAdminFilter extends HTMLElement {
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
            <div class="grid grid-cols-4 gap-4 items-center"> 
                   ${[
        "Show Deleted"
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
customElements.define("tq-admin-filter", TQAdminFilter);

class AddTQAdmin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Reference", "Description"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
  ${["Added At"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
         <label class="block text-sm font-medium">${label}</label>
                              <input
                      type="date"
                      id="issueDate"
                      name="issueDate"
                      placeholder="Date"
                      class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                  />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
  ${["Added By"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-tq-admin", AddTQAdmin);

class AddDefect extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Defect"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-defect", AddDefect);

class EditDefectSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Defect Type,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/tq-admin" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-defect-save-button",
  EditDefectSaveButton
);

class AddPriorities extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Description"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-priorities", AddPriorities);

class EditPrioritiesButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Defect Type,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/tq-admin" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-priorities-save-button",
  EditPrioritiesButton
);

class AddNCRType extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Description"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-ncr-type", AddNCRType);

class EditNCRTypeSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current NCR Type,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/ncr-admin" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-ncr-type-save-button",
  EditNCRTypeSaveButton
);

class AddNCRPriority extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Description"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-priority", AddNCRPriority);

class EditNCRPrioritySaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current NCR Priority,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/ncr-admin" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-ncr-priority-save-button",
  EditNCRPrioritySaveButton
);

class AddLocalisation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Text", "Replacement"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-localisation", AddLocalisation);

class EditLocalisationSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Localisation,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/localisations" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-localisation-save-button",
  EditLocalisationSaveButton
);

class AddCustomFields extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Custom Field", "Bookmark"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-custom-field", AddCustomFields);

class EditCustomFieldSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Custom Field,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/custom-fields" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-custom-field-save-button",
  EditCustomFieldSaveButton
);

class AddITREquivalence extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["EPC", "EPC’s ITR", "Equivalent Checksheet"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-equivalence", AddITREquivalence);

class EditITREquaivalenceSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current ITR Equivalence,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/itr-equivalence" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-equivalence-save-button",
  EditITREquaivalenceSaveButton
);

class AddShutdown extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Title"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
  ${["Start Date", "End Date"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
       <label class="block text-sm font-medium">${label}</label>
          <input
            type="date"
            id="addedDate"
            name="addedDate"
            class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
 ${["Notes"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <textarea
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        ></textarea>
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}

</div>
    `;
  }
}
customElements.define("add-shutdown", AddShutdown);

class EditShutdownSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Shutdown,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/si" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-shutdown-save-button",
  EditShutdownSaveButton
);

class AddIsolation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Name",
        "Description",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
           
                ${["Planned Date"]
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
        "State",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
           
                ${["Last Updated At"]
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
        "Last Updated By",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
                </div>
    `;
  }
}
customElements.define("add-isolation", AddIsolation);

class EditIsolationSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Isolatiion,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/si" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-isolation-save-button",
  EditIsolationSaveButton
);

class AddWorkPackType extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Ref",
        "Desc",
        "Category",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
            ${["Authorisation Required", "Applies to Site Location"]
        .map(
          (label) => `
                    <label class="flex items-center gap-2">
                    <input type="radio" class="w-4 h-4" /> ${label}
                    </label>
                        `
        )
        .join("")}
                  ${[
        "Workflow",
      ]
        .map(
          (label) => `
            <div class="space-y-1">
                <label class="block text-sm font-medium">${label}</label>
                <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
                />
            </div>
            `
        )
        .join("")}
                 ${["Download Punchlists Offline"]
        .map(
          (label) => `
                    <label class="flex items-center gap-2">
                    <input type="radio" class="w-4 h-4" /> ${label}
                    </label>
                        `
        )
        .join("")}
                </div>
    `;
  }
}
customElements.define("add-workpack-type", AddWorkPackType);

class EditWorkpackSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Workpack,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/workpack-ctpadmin" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-workpack-type-save-button",
  EditWorkpackSaveButton
);

class AddWorkPackProcedureType extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Ref",
        "Desc"
      ]
        .map(
          (label) => `
            <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
            
            `
        )
        .join("")}
            
                </div>
    `;
  }
}
customElements.define("add-workpack-procedure-type", AddWorkPackProcedureType);

class EditWorkpackProcedureTypeSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Procedure,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/workpack-ctpadmin" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-workpack-procedure-type-save-button",
  EditWorkpackProcedureTypeSaveButton
);

class AddWorkPackWorkFlows extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Ref",
        "Desc"
      ]
        .map(
          (label) => `
            <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
            
            `
        )
        .join("")}
    ${[
        "Added At"
      ]
        .map(
          (label) => `
            <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
                              <input
                      type="date"
                      id="issueDate"
                      name="issueDate"
                      placeholder="Date"
                      class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                  />
      <div class="col-span-3"></div>
            
            `
        )
        .join("")}
    ${[
        "Added By"
      ]
        .map(
          (label) => `
            <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
            
            `
        )
        .join("")}
            
                </div>
    `;
  }
}
customElements.define("add-workpack-workflows", AddWorkPackWorkFlows);

class EditWorkpackWorkflowaSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Workflow,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/workpack-ctpadmin" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-workpack-workflows-save-button",
  EditWorkpackWorkflowaSaveButton
);

class GlobalSettings extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="theme-btn-primary-outline" id="filterBtn" aria-label="Open Filter Modal">
       Global Settings
      </button>
      <div class="modal-overlay" id="filterPopup">
        <div class="modal-content border border-theme bg-theme-background ">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-2 border-b border-theme">
            <h2 class="text-lg font-semibold">Filter</h2>
            <div class="space-x-4">
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
            <div class="grid grid-cols-4 gap-4 items-center"> 
                   ${[
        "2 Step completion Enabled", "Allow Rejection", "Phasing Enabled", "Record test equipment on completion", "Issue Checkseets", "Show completed checksheets on FCR", "Allow loop checksheet completion with outstanding child", "Print in Background"
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
            <button data-close class="theme-btn-outline">Cancel</button>
            <button data-close class="theme-btn w-[6rem]">Save</button>
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
customElements.define("global-settings-filter", GlobalSettings);

class AddChecksheet extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Description"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
        <div class="col-span-1 space-y-1">
  <label class="block text-sm font-medium">Chart Line Colour</label>
  <div class="flex items-center space-x-3">
    <input
      type="color"
      id="chartColor"
      name="chartColor"
      value="#ff0000"
      class="w-10 h-10 rounded-md border border-gray-300 cursor-pointer"
    />
    <label for="chartColor" class="text-sm text-gray-700">Choose Colour</label>
  </div>
</div>
<div class="col-span-3"></div>

  ${["Type dependency"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
        <label class="block text-sm font-medium">${label}</label>
        <input
          type="text"
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
          placeholder="Enter"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}
</div>
    `;
  }
}
customElements.define("add-checksheet", AddChecksheet);

class EditChecksheetSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <span>
        <!-- Save Changes Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn whitespace-nowrap">Save Changes</button>
        
        <!-- Modal Overlay -->
        <div id="editModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-primary" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>            
              </div>
            <p class="text-xl font-semibold text-center w-full">Edit</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will edit the current Checksheet,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-info/checksheet-admin" data-close class="theme-btn">Save</button>
            </div>
          </div>
        </div>
      </span>
    `;

    const modal = this.querySelector("#editModal");
    const openBtn = this.querySelector("#openEditModal");

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
customElements.define(
  "edit-checksheet-save-button",
  EditChecksheetSaveButton
);

class PunchlistAdmin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4">
        <div class="tab-header">
          <button class="tab-button active" onclick="this.closest('punchlist-admin').switchTab(event, 'tab1')">Categories</button>
          <button class="tab-button" onclick="this.closest('punchlist-admin').switchTab(event, 'tab2')">Common items</button>
          <button class="tab-button" onclick="this.closest('punchlist-admin').switchTab(event, 'tab3')">PL Defect Types</button>
          <button class="tab-button" onclick="this.closest('punchlist-admin').switchTab(event, 'tab4')">PL Priorities</button>
        </div>

        ${this.getTabHTML('tab1', 'Categories')}
        ${this.getTabHTML('tab2', 'Common items')}
        ${this.getTabHTML('tab3', 'PL Defect Types')}
        ${this.getTabHTML('tab4', 'PL Priorities')}
      </div>
    `;
  }

  switchTab(event, tabId) {
    const tabs = this.querySelectorAll(".tab-content");
    const buttons = this.querySelectorAll(".tab-button");

    tabs.forEach(tab => tab.classList.add("hidden"));
    buttons.forEach(btn => btn.classList.remove("active"));

    this.querySelector(`#${tabId}`).classList.remove("hidden");
    event.currentTarget.classList.add("active");
  }

  getTabHTML(id, label) {
    const tabComponents = {
      'tab1': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
            <button
              class="theme-btn"
              data-route="/project-info/punchlist-admin/category-add"
              data-close
            >
              Add
            </button>
            <span><punchlist-form></punchlist-form></span>
            <button class="plain-icon" aria-label="Refresh">
              <!-- Refresh Icon -->
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="page-section border-theme">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b border-theme">
                <tr class="table-heading">
                  <th class="table-header">Punch Category</th>
                  <th class="table-header">Punch Checksheet Completion</th>
                  <th class="table-header">Added At</th>
                  <th class="table-header">Added By</th>
                  <th class="table-header">2 Step Verification</th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-footer">
          <p class="font-semibold">Page 1 of 15</p>
          <div class="pagination-wrapper">
            <button class="pagination-btn">&lt;</button>
            <button class="pagination-btn">First</button>
            <button class="pagination-btn pagination-active">1</button>
            <button class="pagination-btn">2</button>
            <span class="w-9 h-9 flex items-center justify-center">...</span>
            <button class="pagination-btn">15</button>
            <button class="pagination-btn">Last</button>
            <button class="pagination-btn">&gt;</button>
          </div>
        </div>
        <div class="footer-container">
          <delete-modal></delete-modal>
          <button class="theme-btn-primary-outline">Show Details</button>
        </div>`,
      'tab2': `
    <div class="flex justify-between">
      <search-input></search-input>
      <div class="flex flex-wrap gap-4 items-center justify-end">
        <button
          class="theme-btn"
          data-route="/project-info/punchlist-admin/common-items-add"
          data-close
        >
          Add
        </button>
        <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
        <reset-grid-modal></reset-grid-modal>
        <button class="plain-icon" aria-label="Refresh">
          <!-- Refresh Icon -->
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="page-section border-theme">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-theme">
            <tr class="table-heading">
              <th class="table-header">Common Items</th>
              <th class="table-header">Discipline</th>
              <th class="table-header">Group</th>
              <th class="table-header">Added By</th>
              <th class="table-header">Normal Man Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-row-style">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="table-footer">
      <p class="font-semibold">Page 1 of 15</p>
      <div class="pagination-wrapper">
        <button class="pagination-btn">&lt;</button>
        <button class="pagination-btn">First</button>
        <button class="pagination-btn pagination-active">1</button>
        <button class="pagination-btn">2</button>
        <span class="w-9 h-9 flex items-center justify-center">...</span>
        <button class="pagination-btn">15</button>
        <button class="pagination-btn">Last</button>
        <button class="pagination-btn">&gt;</button>
      </div>
    </div>
    <div class="footer-container">
      <delete-modal></delete-modal>
      <button class="theme-btn-primary-outline">Show Details</button>
    </div>
  `,
      'tab3': `
      <div class="flex justify-between">
      <search-input></search-input>
      <div class="flex flex-wrap gap-4 items-center justify-end">
        <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
        <reset-grid-modal></reset-grid-modal>
        <button class="plain-icon" aria-label="Refresh">
          <!-- Refresh Icon -->
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="page-section border-theme">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-theme">
            <tr class="table-heading">
              <th class="table-header">Description</th>
              <th class="table-header">Category</th>
              <th class="table-header">Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-row-style">
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="table-footer">
      <p class="font-semibold">Page 1 of 15</p>
      <div class="pagination-wrapper">
        <button class="pagination-btn">&lt;</button>
        <button class="pagination-btn">First</button>
        <button class="pagination-btn pagination-active">1</button>
        <button class="pagination-btn">2</button>
        <span class="w-9 h-9 flex items-center justify-center">...</span>
        <button class="pagination-btn">15</button>
        <button class="pagination-btn">Last</button>
        <button class="pagination-btn">&gt;</button>
      </div>
    </div>`,
      'tab4': `
       <div class="flex justify-between">
      <search-input></search-input>
      <div class="flex flex-wrap gap-4 items-center justify-end">
        <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
        <reset-grid-modal></reset-grid-modal>
        <button class="plain-icon" aria-label="Refresh">
          <!-- Refresh Icon -->
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="page-section border-theme">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-theme">
            <tr class="table-heading">
              <th class="table-header">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="table-footer">
      <p class="font-semibold">Page 1 of 15</p>
      <div class="pagination-wrapper">
        <button class="pagination-btn">&lt;</button>
        <button class="pagination-btn">First</button>
        <button class="pagination-btn pagination-active">1</button>
        <button class="pagination-btn">2</button>
        <span class="w-9 h-9 flex items-center justify-center">...</span>
        <button class="pagination-btn">15</button>
        <button class="pagination-btn">Last</button>
        <button class="pagination-btn">&gt;</button>
      </div>
    </div>`
    };

    return `
        <div id="${id}" class="tab-content ${id === 'tab1' ? '' : 'hidden'} space-y-4">
          ${tabComponents[id]}
        </div>
      `;
  }
}
customElements.define("punchlist-admin", PunchlistAdmin);

class TQAdmin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4">
        <div class="tab-header">
          <button class="tab-button active" onclick="this.closest('tq-admin').switchTab(event, 'tab1')">Types</button>
          <button class="tab-button" onclick="this.closest('tq-admin').switchTab(event, 'tab2')">TQ Defect Types</button>
          <button class="tab-button" onclick="this.closest('tq-admin').switchTab(event, 'tab3')">TQ Priorities</button>
        </div>

        ${this.getTabHTML('tab1', 'Types')}
        ${this.getTabHTML('tab2', 'TQ Defect Types')}
        ${this.getTabHTML('tab3', 'TQ Priorities')}
      </div>
    `;
  }

  switchTab(event, tabId) {
    const tabs = this.querySelectorAll(".tab-content");
    const buttons = this.querySelectorAll(".tab-button");

    tabs.forEach(tab => tab.classList.add("hidden"));
    buttons.forEach(btn => btn.classList.remove("active"));

    this.querySelector(`#${tabId}`).classList.remove("hidden");
    event.currentTarget.classList.add("active");
  }

  getTabHTML(id, label) {
    const tabComponents = {
      'tab1': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
            <button
              class="theme-btn"
              data-route="/project-info/tq-admin/type/add"
              data-close
            >
              Add
            </button>
            <reset-grid-modal></reset-grid-modal>
            <tq-admin-filter></tq-admin-filter>
            <button class="plain-icon" aria-label="Refresh">
              <!-- Refresh Icon -->
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="page-section border-theme">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b border-theme">
                <tr class="table-heading">
                 <th class="table-header">
                <span>TQ Reference</span>
              </th>
              <th class="table-header">
                <span>TQ Description</span>
              </th>
              <th class="table-header">
                <span>Added By</span>
              </th>
              <th class="table-header">
                <span>Added At</span>
              </th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-footer">
          <p class="font-semibold">Page 1 of 15</p>
          <div class="pagination-wrapper">
            <button class="pagination-btn">&lt;</button>
            <button class="pagination-btn">First</button>
            <button class="pagination-btn pagination-active">1</button>
            <button class="pagination-btn">2</button>
            <span class="w-9 h-9 flex items-center justify-center">...</span>
            <button class="pagination-btn">15</button>
            <button class="pagination-btn">Last</button>
            <button class="pagination-btn">&gt;</button>
          </div>
        </div>
        <div class="footer-container">
        <button class="theme-btn-primary-outline">Show Details</button>
          <delete-modal></delete-modal>
        </div>`,
      'tab2': `
    <div class="flex justify-between">
      <search-input></search-input>
      <div class="flex flex-wrap gap-4 items-center justify-end">
        <button
          class="theme-btn"
          data-route="/project-info/tq-admin/defect/add"
          data-close
        >
          Add
        </button>
        <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
        <reset-grid-modal></reset-grid-modal>
        <button class="plain-icon" aria-label="Refresh">
          <!-- Refresh Icon -->
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="page-section border-theme">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-theme">
            <tr class="table-heading">
              <th class="table-header">Defect</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
           <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="table-footer">
      <p class="font-semibold">Page 1 of 15</p>
      <div class="pagination-wrapper">
        <button class="pagination-btn">&lt;</button>
        <button class="pagination-btn">First</button>
        <button class="pagination-btn pagination-active">1</button>
        <button class="pagination-btn">2</button>
        <span class="w-9 h-9 flex items-center justify-center">...</span>
        <button class="pagination-btn">15</button>
        <button class="pagination-btn">Last</button>
        <button class="pagination-btn">&gt;</button>
      </div>
    </div>
    <div class="footer-container">
      <delete-modal></delete-modal>
       <button
          class="theme-btn-primary-outline"
          data-route="/project-info/tq-admin/defect/edit"
          data-close
        >
          Edit
        </button>
    </div>
  `,
      'tab3': `
      <div class="flex justify-between">
      <search-input></search-input>
      <div class="flex flex-wrap gap-4 items-center justify-end">
      <button
              class="theme-btn"
              data-route="/project-info/tq-admin/priority/add"
              data-close
            >
              Add
            </button>
        <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
        <reset-grid-modal></reset-grid-modal>
        <button class="plain-icon" aria-label="Refresh">
          <!-- Refresh Icon -->
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="page-section border-theme">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-theme">
            <tr class="table-heading">
              <th class="table-header">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
            <tr class="table-row-style">
              <td></td>
            </tr>
            <tr class="table-row-style even-row">
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="table-footer">
      <p class="font-semibold">Page 1 of 15</p>
      <div class="pagination-wrapper">
        <button class="pagination-btn">&lt;</button>
        <button class="pagination-btn">First</button>
        <button class="pagination-btn pagination-active">1</button>
        <button class="pagination-btn">2</button>
        <span class="w-9 h-9 flex items-center justify-center">...</span>
        <button class="pagination-btn">15</button>
        <button class="pagination-btn">Last</button>
        <button class="pagination-btn">&gt;</button>
      </div>
    </div>
    <div class="footer-container">
      <delete-modal></delete-modal>
       <button
          class="theme-btn-primary-outline"
          data-route="/project-info/tq-admin/priority/edit"
          data-close
        >
          Edit
        </button>
    </div>
    `
    };

    return `
        <div id="${id}" class="tab-content ${id === 'tab1' ? '' : 'hidden'} space-y-4">
          ${tabComponents[id]}
        </div>
      `;
  }
}
customElements.define("tq-admin", TQAdmin);

class NCRAdmin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4">
        <div class="tab-header">
          <button class="tab-button active" onclick="this.closest('ncr-admin').switchTab(event, 'tab1')">NCR Defect Types</button>
          <button class="tab-button" onclick="this.closest('ncr-admin').switchTab(event, 'tab2')">NCR Priorities</button>
        </div>

        ${this.getTabHTML('tab1', 'NCR Defect Types')}
        ${this.getTabHTML('tab2', 'NCR Priorities')}
      </div>
    `;
  }

  switchTab(event, tabId) {
    const tabs = this.querySelectorAll(".tab-content");
    const buttons = this.querySelectorAll(".tab-button");

    tabs.forEach(tab => tab.classList.add("hidden"));
    buttons.forEach(btn => btn.classList.remove("active"));

    this.querySelector(`#${tabId}`).classList.remove("hidden");
    event.currentTarget.classList.add("active");
  }

  getTabHTML(id, label) {
    const tabComponents = {
      'tab1': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
            <button
              class="theme-btn"
              data-route="/project-info/ncr-admin/add"
              data-close
            >
              Add
            </button>
            <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
            <reset-grid-modal></reset-grid-modal>
            <button class="plain-icon" aria-label="Refresh">
              <!-- Refresh Icon -->
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="page-section border-theme">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b border-theme">
                <tr class="table-heading">
                 <th class="table-header">
                <span>Description</span>
              </th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-row-style">
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-footer">
          <p class="font-semibold">Page 1 of 15</p>
          <div class="pagination-wrapper">
            <button class="pagination-btn">&lt;</button>
            <button class="pagination-btn">First</button>
            <button class="pagination-btn pagination-active">1</button>
            <button class="pagination-btn">2</button>
            <span class="w-9 h-9 flex items-center justify-center">...</span>
            <button class="pagination-btn">15</button>
            <button class="pagination-btn">Last</button>
            <button class="pagination-btn">&gt;</button>
          </div>
        </div>
        <div class="footer-container">
        <button class="theme-btn-primary-outline">Show Details</button>
         <button
              class="theme-btn-primary-outline"
              data-route="/project-info/ncr-admin/edit"
              data-close
            >
              Edit
            </button>
          <delete-modal></delete-modal>
        </div>`,
      'tab2': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
            <button
              class="theme-btn"
              data-route="/project-info/ncr-admin/priority/add"
              data-close
            >
              Add
            </button>
            <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
            <reset-grid-modal></reset-grid-modal>
            <button class="plain-icon" aria-label="Refresh">
              <!-- Refresh Icon -->
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="page-section border-theme">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b border-theme">
                <tr class="table-heading">
                 <th class="table-header">
                <span>Description</span>
              </th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-row-style">
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-footer">
          <p class="font-semibold">Page 1 of 15</p>
          <div class="pagination-wrapper">
            <button class="pagination-btn">&lt;</button>
            <button class="pagination-btn">First</button>
            <button class="pagination-btn pagination-active">1</button>
            <button class="pagination-btn">2</button>
            <span class="w-9 h-9 flex items-center justify-center">...</span>
            <button class="pagination-btn">15</button>
            <button class="pagination-btn">Last</button>
            <button class="pagination-btn">&gt;</button>
          </div>
        </div>
        <div class="footer-container">
        <button class="theme-btn-primary-outline">Show Details</button>
         <button
              class="theme-btn-primary-outline"
              data-route="/project-info/ncr-admin/priority/edit"
              data-close
            >
              Edit
            </button>
          <delete-modal></delete-modal>
        </div>`,

    };

    return `
        <div id="${id}" class="tab-content ${id === 'tab1' ? '' : 'hidden'} space-y-4">
          ${tabComponents[id]}
        </div>
      `;
  }
}
customElements.define("ncr-admin", NCRAdmin);

class ShutdownAndIsolation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4">
        <div class="tab-header">
          <button class="tab-button active" onclick="this.closest('shutdown-and-isolation').switchTab(event, 'tab1')">Shutdown</button>
          <button class="tab-button" onclick="this.closest('shutdown-and-isolation').switchTab(event, 'tab2')">Isolation</button>
        </div>

        ${this.getTabHTML('tab1', 'Shutdown')}
        ${this.getTabHTML('tab2', 'Isolation')}
      </div>
    `;
  }

  switchTab(event, tabId) {
    const tabs = this.querySelectorAll(".tab-content");
    const buttons = this.querySelectorAll(".tab-button");

    tabs.forEach(tab => tab.classList.add("hidden"));
    buttons.forEach(btn => btn.classList.remove("active"));

    this.querySelector(`#${tabId}`).classList.remove("hidden");
    event.currentTarget.classList.add("active");
  }

  getTabHTML(id, label) {
    const tabComponents = {
      'tab1': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
            <button
              class="theme-btn"
              data-route="/project-info/si/shutdown/add"
              data-close
            >
              Add
            </button>
            <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
            <reset-grid-modal></reset-grid-modal>
            <button class="plain-icon" aria-label="Refresh">
              <!-- Refresh Icon -->
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="page-section border-theme">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b border-theme">
               <tr class="table-heading">
            <th class="table-header">
              <span>Title</span>
            </th>
            <th class="table-header">
              <span>Start Date</span>
            </th>
            <th class="table-header">
              <span>End Date</span>
            </th>
            <th class="table-header">
              <span>Notes</span>
            </th>
          </tr>
              </thead>
              <tbody>
                <tr class="table-row-style">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                 <tr class="table-row-style">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                 <tr class="table-row-style">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                 <tr class="table-row-style">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-footer">
          <p class="font-semibold">Page 1 of 15</p>
          <div class="pagination-wrapper">
            <button class="pagination-btn">&lt;</button>
            <button class="pagination-btn">First</button>
            <button class="pagination-btn pagination-active">1</button>
            <button class="pagination-btn">2</button>
            <span class="w-9 h-9 flex items-center justify-center">...</span>
            <button class="pagination-btn">15</button>
            <button class="pagination-btn">Last</button>
            <button class="pagination-btn">&gt;</button>
          </div>
        </div>
        <div class="footer-container">
         <button
              class="theme-btn-primary-outline"
              data-route="/project-info/si/shutdown/edit"
              data-close
            >
              Edit
            </button>
          <delete-modal></delete-modal>
        </div>`,
      'tab2': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
            <button
              class="theme-btn"
              data-route="/project-info/si/isolation/add"
              data-close
            >
              Add
            </button>
            <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
            <reset-grid-modal></reset-grid-modal>
            <button class="plain-icon" aria-label="Refresh">
              <!-- Refresh Icon -->
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="page-section border-theme">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b border-theme">
                <tr class="table-heading">
                <th class="table-header"><span>Name</span></th>
                <th class="table-header"><span>Description</span></th>
                <th class="table-header"><span>Planned Date</span></th>
                <th class="table-header"><span>State</span></th>
                <th class="table-header"><span>Last Updated At</span></th>
                <th class="table-header"><span>Last Updated By</span></th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                 <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                 <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                 <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                 <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                 <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                 <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                 <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-footer">
          <p class="font-semibold">Page 1 of 15</p>
          <div class="pagination-wrapper">
            <button class="pagination-btn">&lt;</button>
            <button class="pagination-btn">First</button>
            <button class="pagination-btn pagination-active">1</button>
            <button class="pagination-btn">2</button>
            <span class="w-9 h-9 flex items-center justify-center">...</span>
            <button class="pagination-btn">15</button>
            <button class="pagination-btn">Last</button>
            <button class="pagination-btn">&gt;</button>
          </div>
        </div>
        <div class="footer-container">
         <button
              class="theme-btn-primary-outline"
              data-route="/project-info/si/isolation/edit"
              data-close
            >
              Edit
            </button>
          <delete-modal></delete-modal>
        </div>`,

    };

    return `
        <div id="${id}" class="tab-content ${id === 'tab1' ? '' : 'hidden'} space-y-4">
          ${tabComponents[id]}
        </div>
      `;
  }
}
customElements.define("shutdown-and-isolation", ShutdownAndIsolation);

class WorkpackandCTPAdmin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4">
        <div class="tab-header">
          <button class="tab-button active" onclick="this.closest('workpack-and-ctpadmin').switchTab(event, 'tab1')">Workpack Types</button>
          <button class="tab-button" onclick="this.closest('workpack-and-ctpadmin').switchTab(event, 'tab2')">Procedure Types</button>
          <button class="tab-button" onclick="this.closest('workpack-and-ctpadmin').switchTab(event, 'tab3')">Workflows</button>
        </div>

        ${this.getTabHTML('tab1', 'Workpack Types')}
        ${this.getTabHTML('tab2', 'Procedure Types')}
        ${this.getTabHTML('tab3', 'Workflows')}
      </div>
    `;
  }
  switchTab(event, tabId) {
    const tabs = this.querySelectorAll(".tab-content");
    const buttons = this.querySelectorAll(".tab-button");

    tabs.forEach(tab => tab.classList.add("hidden"));
    buttons.forEach(btn => btn.classList.remove("active"));

    this.querySelector(`#${tabId}`).classList.remove("hidden");
    event.currentTarget.classList.add("active");
  }

  getTabHTML(id, label) {
    const tabComponents = {
      'tab1': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
            <button
              class="theme-btn"
              data-route="/project-info/workpack-ctpadmin/workpack-type/add"
              data-close
            >
              Add
            </button>
            <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
            <button class="plain-icon" aria-label="Refresh">
              <!-- Refresh Icon -->
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="page-section border-theme">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b border-theme">
               <tr class="table-heading">
            <th class="table-header">
              <span>Ref</span>
            </th>
            <th class="table-header">
              <span>Desc</span>
            </th>
            <th class="table-header">
              <span>Category</span>
            </th>
            <th class="table-header">
              <span>Authorisation Required</span>
            </th>
            <th class="table-header">
              <span>Applies To Site Location</span>
            </th>
            <th class="table-header">
              <span>Workflow</span>
            </th>
            <th class="table-header">
              <span>Download Punchists Offline</span>
            </th>
          </tr>
              </thead>
              <tbody>
                <tr class="table-row-style">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                 <tr class="table-row-style">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                 <tr class="table-row-style">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                 <tr class="table-row-style">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-footer">
          <p class="font-semibold">Page 1 of 15</p>
          <div class="pagination-wrapper">
            <button class="pagination-btn">&lt;</button>
            <button class="pagination-btn">First</button>
            <button class="pagination-btn pagination-active">1</button>
            <button class="pagination-btn">2</button>
            <span class="w-9 h-9 flex items-center justify-center">...</span>
            <button class="pagination-btn">15</button>
            <button class="pagination-btn">Last</button>
            <button class="pagination-btn">&gt;</button>
          </div>
        </div>
        <div class="footer-container">
         <button
              class="theme-btn-primary-outline"
              data-route="/project-info/workpack-ctpadmin/workpack-type/edit"
              data-close
            >
              Edit
            </button>
          <delete-modal></delete-modal>
        </div>`,
      'tab2': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
            <button
              class="theme-btn"
              data-route="/project-info/workpack-ctpadmin/procedure-type/add"
              data-close
            >
              Add
            </button>
            <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
            <button class="plain-icon" aria-label="Refresh">
              <!-- Refresh Icon -->
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="page-section border-theme">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b border-theme">
                <tr class="table-heading">
                <th class="table-header"><span>Ref</span></th>
                <th class="table-header"><span>Desc</span></th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                   <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                   <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                   <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                   <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-footer">
          <p class="font-semibold">Page 1 of 15</p>
          <div class="pagination-wrapper">
            <button class="pagination-btn">&lt;</button>
            <button class="pagination-btn">First</button>
            <button class="pagination-btn pagination-active">1</button>
            <button class="pagination-btn">2</button>
            <span class="w-9 h-9 flex items-center justify-center">...</span>
            <button class="pagination-btn">15</button>
            <button class="pagination-btn">Last</button>
            <button class="pagination-btn">&gt;</button>
          </div>
        </div>
        <div class="footer-container">
         <button
              class="theme-btn-primary-outline"
              data-route="/project-info/workpack-ctpadmin/procedure-type/edit"
              data-close
            >
              Edit
            </button>
          <delete-modal></delete-modal>
        </div>`,
      'tab3': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
            <button
              class="theme-btn"
              data-route="/project-info/workpack-ctpadmin/workflow/add"
              data-close
            >
              Add
            </button>
            <span>
            <button class="theme-btn-primary-outline whitespace-nowrap">
              Copy
            </button>
            </span>
            <span>
          <button class="theme-btn-primary-outline whitespace-nowrap">
            Export
          </button>
        </span>
            <button class="plain-icon" aria-label="Refresh">
              <!-- Refresh Icon -->
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="page-section border-theme">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b border-theme">
                <tr class="table-heading">
                <th class="table-header"><span>Ref</span></th>
                <th class="table-header"><span>Desc</span></th>
                <th class="table-header"><span>Added At</span></th>
                <th class="table-header"><span>Added By</span></th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-row-style">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                    <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                    <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                    <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                    <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                    <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                 <tr class="table-row-style">
                    <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="table-row-style even-row">
                    <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-footer">
          <p class="font-semibold">Page 1 of 15</p>
          <div class="pagination-wrapper">
            <button class="pagination-btn">&lt;</button>
            <button class="pagination-btn">First</button>
            <button class="pagination-btn pagination-active">1</button>
            <button class="pagination-btn">2</button>
            <span class="w-9 h-9 flex items-center justify-center">...</span>
            <button class="pagination-btn">15</button>
            <button class="pagination-btn">Last</button>
            <button class="pagination-btn">&gt;</button>
          </div>
        </div>
        <div class="footer-container">
         <button
              class="theme-btn-primary-outline"
              data-route="/project-info/workpack-ctpadmin/workflow/edit"
              data-close
            >
              Edit
            </button>
          <delete-modal></delete-modal>
        </div>`,

    };

    return `
        <div id="${id}" class="tab-content ${id === 'tab1' ? '' : 'hidden'} space-y-4">
          ${tabComponents[id]}
        </div>
      `;
  }
}
customElements.define("workpack-and-ctpadmin", WorkpackandCTPAdmin);

class CheckSheetAdmin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4">
        <div class="tab-header">
          <button class="tab-button active" onclick="this.closest('checksheet-admin').switchTab(event, 'tab1')">Checksheet Types</button>
          <button class="tab-button" onclick="this.closest('checksheet-admin').switchTab(event, 'tab2')">Checksheet Phases</button>
        </div>

        ${this.getTabHTML('tab1', 'Checksheet Types')}
        ${this.getTabHTML('tab2', 'Checksheet Phases')}
      </div>
    `;
  }
  switchTab(event, tabId) {
    const tabs = this.querySelectorAll(".tab-content");
    const buttons = this.querySelectorAll(".tab-button");

    tabs.forEach(tab => tab.classList.add("hidden"));
    buttons.forEach(btn => btn.classList.remove("active"));

    this.querySelector(`#${tabId}`).classList.remove("hidden");
    event.currentTarget.classList.add("active");
  }

  getTabHTML(id, label) {
    const tabComponents = {
      'tab1': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
            <global-settings-filter></global-settings-filter>
            <button
              class="theme-btn"
              data-route="/project-info/checksheet-admin/add"
              data-close
            >
              Add
            </button>
            <button class="plain-icon" aria-label="Refresh">
              <!-- Refresh Icon -->
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 3V8H16L18 5.29168C16.4 3.9 14.3 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C16.3 21 19.9 18 20.8 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
         <!-- Table -->
  <div class="page-section border-theme">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-gray-200">
          <tr class="table-heading">
            <th class="table-header">
              <span>Description</span>
            </th>
            <th class="table-header">
              <span>Chart Line Colour</span>
            </th>
            <th class="table-header">
              <span>Type Dependency</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row-style">
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-style even-row">
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-style">
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-style even-row">
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-style">
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-style even-row">
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-style">
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-style even-row">
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Pagination -->
  <div class="table-footer">
    <div>
      <p class="font-semibold">Page 1 of 15</p>
    </div>
    <!-- Pagination -->
    <div class="pagination-wrapper">
      <button class="pagination-btn">&lt;</button>
      <button class="pagination-btn">First</button>
      <button class="pagination-btn pagination-active">1</button>
      <button class="pagination-btn">2</button>
      <button class="pagination-btn">3</button>
      <span class="w-9 h-9 flex items-center justify-center">...</span>
      <button class="pagination-btn">15</button>
      <button class="pagination-btn">Last</button>
      <button class="pagination-btn">&gt;</button>
    </div>
    </div>
        <div class="footer-container">
         <button
              class="theme-btn-primary-outline"
              data-route="/project-info/checksheet-admin/edit"
              data-close
            >
              Edit
            </button>
          <delete-modal></delete-modal>
        </div>`,
      'tab2': `
      <div></div>`,

    };

    return `
        <div id="${id}" class="tab-content ${id === 'tab1' ? '' : 'hidden'} space-y-4">
          ${tabComponents[id]}
        </div>
      `;
  }
}
customElements.define("checksheet-admin", CheckSheetAdmin);

