
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
            <button data-close class="theme-btn">Apply</button>
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

class WorkPackTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Workpack No", "Title", "Type", "Type Ref", "Type Desc", "Unit", "Unit Ref", "Unit Desc", "System", "System Ref", "System Desc",
      "Sub System", "Sub System Ref", "Sub System Desc", "Site Location Ref", "Module Area Ref", "Sub Module Area Ref", "Added By",
      "Status Ref", "Status", "Workflow", "Owner", "Contractor", "Shutdown", "Shutdown Title", "Engineer 1", "Engineer 2",
      "Engineer 3", "Engineer 4", "ByPass Authorization", "Authorisation 1 Authorisation Given", "Authorisation 2 Authorisation Given",
      "Authorisation 3 Authorisation Given", "Authorisation 4 Authorisation Given", "Cancelled", "Planned WP Created Date",
      "Planned WP Assigned Date", "Planned WP Inspection Date Date", "Planned WP Completed Date", "Issued to IM", "Applies To", "Checksheet",
      "MC RFI No.", "COM RFI No.", "Module_Area", "Week", "Locked", "Locked By", "Locked At", "Locked By Host", "Assigned By", "Checksheets",
      "Punchlists", "Checksheets Executed By", "Checksheets Executed At", "Users Assigned to Execute", "Checksheets Completed By",
      "Checksheets Completed At", "Users Assigned to Complete"
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
customElements.define("workpack-table", WorkPackTable);
