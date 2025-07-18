class TagTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Tag No", "Tag Desc", "Unit", "System Ref", "Sub System Ref", "Location", "Area", "Type", "Sub Type", "Discipline",
      "Tag Is Soft", "Tag Is Loop", "Manufacturer", "PO Number", "Parent Tag", "Loop Tag", "Commodity Code", "From Tag",
      "To Tag", "Cable Length", "Spool Tag", "Tag Group", "Tag is Hazardous", "Serial Number", "Primary Drawing",
      "Tag Import Source", "RFID", "Tag Is Cable", "Tag Is Spool", "Spool Length", "Is Line", "Is Joint", "Haz PO Number",
      "Haz Manufacturer", "Haz ModelNo", "Haz Serial No", "Haz Protection type", "Haz IPR Rating", "Haz ATEX Code",
      "Haz Comments", "Haz Manufacturer type", "Haz Area Classification", "Haz TE Time", "Haz Equipment category and EPL",
      "Haz Equipment IP Rating", "Haz Equipment Ex Technique", "Haz Equipment Gas group", "Haz Equipment Temp Class",
      "Haz Equipment Anbient Temp", "Haz Certifying Authority", "Haz Certifyication No", "Haz Is Circuits Limits And Values",
      "Haz Special Conditions", "Haz Contractor Ex Reg No", "Tag Eng Co", "Tag Barrier Modal", "Tag ATEX Cert No",
      "Tag Building No", "Tag Building No 3", "Tag SubArea", "Tag CWP", "Tag Module", "TagsC1", "TagsC2", "TagsC3", "TagsC4",
      "TagsC5", "TagsC6", "TagsC7", "TagsC8", "TagsC9", "TagsC10", "Tag SubSystem Ref", "Deleted?", "Tag Construction Phase Ref",
      "Tag Status"
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
customElements.define("tag-table", TagTable);

class DatabaseFilter extends HTMLElement {
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
              <!-- Select fields -->
              ${["Tag No", "Tag Desc"]
        .map(
          (label) => `
                <div class="space-y-1">
                  <label class="block">${label}</label>
                  <input type="text" class="input-text border-theme w-full" placeholder="Enter" />
                </div>
              `
        )
        .join("")}
              ${[
        "Unit",
        "System",
        "SubSystem",
        "Discipline",
        "SubSystem Group",
        "Type",
        "SubType",
        "Tag Group",
        "Cable Tag",
        "Spare Field 3",
        "Added Date",
        "Site Location",
        "Module/Area",
        "Area Code",
        "Tag Location",
        "LTP Number",
        "COW",
      ]
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
               ${[
        "Deleted Only",
        "Include Soft Tags",
        "Include Descriptions",
        "Loop Tags Only",
        "Show Custom Data"
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
customElements.define("database-filter", DatabaseFilter);

class TagAdd extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
            ${[
        "Tag Number",
        "Tag Description",
        "Tag Unit",
        "Tag System Ref",
        "Tag SubSystem Ref",
        "Tag Location",
        "Tag Area",
        "Tag Type",
        "Tag Sub Type",
        "Tag Discipline",
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
            ${["Soft Tag", "Loop Tag"]
        .map(
          (label) => `
                <label class="flex items-center gap-2 text-sm">
                <input type="radio" class="w-4 h-4" name="${label.replace(
            /\s+/g,
            ""
          )}" /> ${label}
                </label>
            `
        )
        .join("")}
    ${[
        "Manufacturer",
        "PO Number",
        "Loop Tag",
        "Commodity Code",
        "From Tag",
        "To Tag",
        "Cable Length",
        "Spool Tag",
        "Tag Group",
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
    ${["Hazardous Tag"]
        .map(
          (label) => `
                <label class="flex items-center gap-2 text-sm">
                <input type="radio" class="w-4 h-4" name="${label.replace(
            /\s+/g,
            ""
          )}" /> ${label}
                </label>
            `
        )
        .join("")}
                ${[
        "Serial Number",
        "Primary Drawing",
        "Tag Import Source",
        "RFID",
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
                    ${["Cable Tag", "Spool Tag"]
        .map(
          (label) => `
                <label class="flex items-center gap-2 text-sm">
                <input type="radio" class="w-4 h-4" name="${label.replace(
            /\s+/g,
            ""
          )}" /> ${label}
                </label>
            `
        )
        .join("")}
                
                </div>
    `;
  }
}
customElements.define("tag-add", TagAdd);

class MarkAsVerified extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openMarkOfferedModal" class="theme-btn"  aria-label="markOffered Modal">Mark as Verified</button>
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
              <p class="text-xl font-semibold">Mark as Verified</p>
              <p>This will mark the selected Tag as verified,</p>
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
    const openBtn = this.querySelector("#openMarkOfferedModal");

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
customElements.define("mark-verified", MarkAsVerified);
