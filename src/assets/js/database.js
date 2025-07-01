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

class AddTagButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
   <span> <button data-route="/database/tags/add" data-close class="theme-btn whitespace-nowrap">Add Tag</button></span>
    `;
  }
}
customElements.define("add-tag-button", AddTagButton);
class TagCancelButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
   <span> <button data-route="/database/tags" data-close class="theme-btn-outline">Cancel</button></span>
    `;
  }
}
customElements.define("tag-cancel-button", TagCancelButton);
class TagSaveButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
   <span> <button data-route="/database/tags" data-close class="theme-btn min-w-[6rem]">Add</button></span>
    `;
  }
}
customElements.define("tag-save-button", TagSaveButton);

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

class DeleteModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openDeleteModal" class="theme-destructive-btn"  aria-label="Delete Modal">Delete</button>
        <!-- Modal Overlay -->
        <div id="deleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50  hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
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
            <div class="space-y-2 text-center">
              <p class="text-xl font-semibold">You are about to delete a tag.</p>
              <p >This will delete the tag from Database.</p>
              <p >Are you sure?</p>
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

customElements.define("delete-modal", DeleteModal);
