// Checksheet master
class AddCheckSheetMaster extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${["Checksheet Name/Ref", "Description", "Sheet Type"]
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

       ${["Electronic"]
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
        ${["Added By", "Master Path", "Competency Count", "Contractor"]
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
         ${["Requires Two Step Completion"]
        .map(
          (label) => `
                <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
              `
        )
        .join("")}
         ${["Duration", "Man Hours", "Revision"]
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
                ${["Comments Disabled"]
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
customElements.define("add-checksheet-master", AddCheckSheetMaster);

class ChecksheetMasterFilter extends HTMLElement {
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
                ${["Name/Ref", "Description"]
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
                ${["Sheet Type"]
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
                ${["Discipline"]
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
                ${["Electronic"]
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
        "Show Deleted",
        "Show Tag Count",
        "Show Associated Subtypes",
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
customElements.define("doc-checksheet-master-filter", ChecksheetMasterFilter);

// Drawings
class AddDrawing extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${["Drawing Ref", "Description", "Drawing Type", "Discipline", "Status"]
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

       ${["As Build Required"]
        .map(
          (label) => `
                <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
              `
        )
        .join("")}
                 ${["Revision"]
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
                      id="issueDate"
                      name="issueDate"
                      placeholder="Date"
                      class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                  />
                              </div>
                                  `
        )
        .join("")}
        ${["Added By"]
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
                 ${["Modified At"]
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
                ${["Modified By", "Comments"]
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
customElements.define("add-drawing", AddDrawing);

class EditDrawing extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${["Drawing Ref", "Description", "Drawing Type", "Discipline", "Status"]
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

       ${["As Build Required"]
        .map(
          (label) => `
                <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
              `
        )
        .join("")}
                 ${["Revision"]
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
                      id="issueDate"
                      name="issueDate"
                      placeholder="Date"
                      class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                  />
                              </div>
                                  `
        )
        .join("")}
        ${["Added By"]
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
                 ${["Modified At"]
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
                ${["Modified By", "Comments"]
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
customElements.define("edit-drawing", EditDrawing);

class DrawingsFilter extends HTMLElement {
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
                ${["Drawing Ref", "Description"]
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
        "Status",
        "Drawing Type",
        "Unit",
        "System",
        "SubSystem",
        "Discipline",
        "Site Location",
        "Module/Area",
        "Area Code",
        "Workpack Type",
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
                 ${["Show Deleted"]
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
customElements.define("doc-drawings-filter", DrawingsFilter);

class DrawingsTypeFilter extends HTMLElement {
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
                 ${["Show Drawing Count"]
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
customElements.define("doc-drawings-type-filter", DrawingsTypeFilter);

class EditDrawingSaveButton extends HTMLElement {
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
              <p>This will edit the current Drawing,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/doc-reg/drawings" data-close class="theme-btn">Save Changes</button>
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
customElements.define("edit-drawing-save-button", EditDrawingSaveButton);

class UnDeleteModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Trigger Button -->
      <button id="openResetModal" class="theme-btn-primary-outline" aria-label="Undelete Modal">Undelete</button>
      
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
          <p class="text-xl font-semibold">Undelete</p>
            <p >This will Undelete the last deleted record,</p>
            <p >Are you sure?</p>
          </div>
          
          <!-- Footer -->
          <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
            <button data-close class="theme-btn-outline">Cancel</button>
            <button data-close class="theme-warning-btn">Undelete</button>
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
customElements.define("undelete-modal", UnDeleteModal);

class AddDrawingType extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
                ${["Name"]
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
customElements.define("add-drawing-type", AddDrawingType);

class EditDrawingTypeSaveButton extends HTMLElement {
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
              <p>This will edit the current Drawing Type,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/doc-reg/drawings" data-close class="theme-btn">Save Changes</button>
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
customElements.define("edit-drawing-type-save-button", EditDrawingTypeSaveButton);

class AddDrawingStatus extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
                ${["Name"]
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
customElements.define("add-drawing-status", AddDrawingStatus);

class EditDrawingStatusSaveButton extends HTMLElement {
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
              <p>This will edit the current Drawing Status,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/doc-reg/drawings" data-close class="theme-btn">Save Changes</button>
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
customElements.define("edit-drawing-status-save-button", EditDrawingStatusSaveButton);

class Drawings extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4">
        <div class="tab-header">
          <button class="tab-button active" onclick="this.closest('drawings-tab').switchTab(event, 'tab1')">Drawings</button>
          <button class="tab-button" onclick="this.closest('drawings-tab').switchTab(event, 'tab2')">Drawing Types</button>
          <button class="tab-button" onclick="this.closest('drawings-tab').switchTab(event, 'tab3')">Drawing Status</button>
        </div>
        ${this.getTabHTML('tab1', 'Drawings')}
        ${this.getTabHTML('tab2', 'Drawing Types')}
        ${this.getTabHTML('tab3', 'Drawing Status')}
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
            <project-select></project-select>
      <div class="w-px h-8 bg-theme-border"></div>
      <span>
        <button
          id="request-add-btn"
          data-route="/doc-reg/drawings/add"
          data-close
          class="theme-btn"
        >
          Add
        </button>
      </span>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          View
        </button>
      </span>
      <show-layout-modal></show-layout-modal>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          Export
        </button>
      </span>
      <span>
        <reset-grid-modal></reset-grid-modal>
      </span>
      <doc-drawings-filter></doc-drawings-filter>

      <button class="plain-icon" id="RefreshBtn" aria-label="Refresh">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
        >
          <path
            d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
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
   <!-- Table -->
  <div class="page-section border-theme">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-gray-200">
          <tr class="table-heading">
            <th class="table-header">
              <span>Drawing Ref</span>
            </th>
            <th class="table-header">
              <span>Description</span>
            </th>
            <th class="table-header">
              <span>Drawing Type</span>
            </th>
            <th class="table-header">
              <span>Discipline</span>
            </th>
            <th class="table-header">
              <span>Status</span>
            </th>
            <th class="table-header">
              <span>As Build Required</span>
            </th>
            <th class="table-header">
              <span>Revision</span>
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
          </tr>
          <tr class="table-row-style even-row">
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
          </tr>
          <tr class="table-row-style even-row">
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
          </tr>
          <tr class="table-row-style even-row">
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
          </tr>
          <tr class="table-row-style even-row">
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
    <button class="theme-btn-primary-outline">Batch Attach</button>
 <button
      id="request-add-btn"
      data-route="/doc-reg/drawings/edit"
      data-close
      class="theme-btn"
    >
      Edit
    </button>
   <undelete-modal></undelete-modal>
    <delete-modal
      title="Delete"
      description="This will delete the selected row. Are you sure?"
    ></delete-modal>
      
  </div>
    </div>
         
  `,
      'tab2': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
      <span>
        <button
          id="request-add-btn"
          data-route="/doc-reg/drawings-type/add"
          data-close
          class="theme-btn"
        >
          Add
        </button>
      </span>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          Export
        </button>
      </span>
      <doc-drawings-type-filter></doc-drawings-type-filter>
      <button class="plain-icon" id="RefreshBtn" aria-label="Refresh">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
        >
          <path
            d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
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
   <!-- Table -->
  <div class="page-section border-theme">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-gray-200">
          <tr class="table-heading">
            <th class="table-header">
              <span>Name</span>
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
      id="request-add-btn"
      data-route="/doc-reg/drawings-type/edit"
      data-close
      class="theme-btn"
    >
      Edit
    </button>
    <delete-modal
      title="Delete"
      description="This will delete the selected row. Are you sure?"
    ></delete-modal>
      
  </div>
</div>
         
  `,
'tab3': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
      <span>
        <button
          id="request-add-btn"
          data-route="/doc-reg/drawings-status/add"
          data-close
          class="theme-btn"
        >
          Add
        </button>
      </span>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          Export
        </button>
      </span>
      <doc-drawings-type-filter></doc-drawings-type-filter>
      <button class="plain-icon" id="RefreshBtn" aria-label="Refresh">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
        >
          <path
            d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
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
   <!-- Table -->
  <div class="page-section border-theme">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-gray-200">
          <tr class="table-heading">
            <th class="table-header">
              <span>Name</span>
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
      id="request-add-btn"
      data-route="/doc-reg/drawings-status/edit"
      data-close
      class="theme-btn"
    >
      Edit
    </button>
    <delete-modal
      title="Delete"
      description="This will delete the selected row. Are you sure?"
    ></delete-modal>
      
  </div>
</div>
         
  `,
    };

    return `
        <div id="${id}" class="tab-content ${id === 'tab1' ? '' : 'hidden'} space-y-4">
          ${tabComponents[id]}
        </div>
      `;
  }
}
customElements.define("drawings-tab", Drawings);

// Certificate Master
class CertificateMasterFilter extends HTMLElement {
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
                
                 ${["Show Deleted"]
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
customElements.define("doc-certificate-master-filter", CertificateMasterFilter);

class AddCertificateMaster extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Type",
        "Applies To",
        "Description",
        "Discipline",
        "Checksheet Type Ref",
        "Filename",
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

       ${["Workpack Completion Certificate", "Partial", "SMCC", "RFG"]
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
customElements.define("add-certificate-master", AddCertificateMaster);

class EditCertificateMaster extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Type",
        "Applies To",
        "Description",
        "Discipline",
        "Checksheet Type Ref",
        "Filename",
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

       ${["Workpack Completion Certificate", "Partial", "SMCC", "RFG"]
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
customElements.define("edit-certificate-master", EditCertificateMaster);

class EditCertificateMasterSaveButton extends HTMLElement {
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
              <p>This will edit the current Certificate Master,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/doc-reg/certificate-masters" data-close class="theme-btn">Save Changes</button>
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
  "edit-certificate-master-save-button",
  EditCertificateMasterSaveButton
);

// Preservation Master
class PreservationMasterFilter extends HTMLElement {
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
                 ${["Name/Ref", "Description"]
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
                 ${["Show Associated Tags"]
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
customElements.define(
  "doc-preservation-master-filter",
  PreservationMasterFilter
);

class AddPreservationMaster extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${["Checksheet Name/Ref", "Description", "Duration", "Filename"]
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

       ${["Use Single Sheet"]
        .map(
          (label) => `
                <label class="flex items-center gap-2">
                  <input type="radio" class="w-4 h-4" /> ${label}
                </label>
              `
        )
        .join("")}
               ${["Added By"]
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
         ${["Added On"]
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
         ${["Electronic", "Requires Test Equipment"]
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
customElements.define("add-preservation-master", AddPreservationMaster);

// Handover Pack template
class AddHPTMaster extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Name", "Description", "Added By"]
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
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}

  ${["Applies To"]
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
customElements.define("add-hpt", AddHPTMaster);

class EditHPT extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Name", "Description", "Added By"]
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
          class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
        />
      </div>
      <div class="col-span-3"></div>
    `
        )
        .join("")}

  ${["Applies To"]
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
customElements.define("edit-hpt", EditHPT);

class EditHPTSaveButton extends HTMLElement {
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
              <p>This will edit the current Handover Pack Template,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/doc-reg/handover-pack-template" data-close class="theme-btn">Save Changes</button>
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
  "edit-hpt-save-button",
  EditHPTSaveButton
);

// Commisioning Test Template
class CTTFilter extends HTMLElement {
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
                 ${["Ref", "Description"]
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
                 ${["Show Deleted"]
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
customElements.define(
  "doc-ctt-filter",
  CTTFilter
);

class AddCTT extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Commissioning Test Ref", "Description"]
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
customElements.define("add-ctt", AddCTT);

class EditCTT extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Commissioning Test Ref", "Description"]
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
customElements.define("edit-ctt", EditCTT);

class EditCTTSaveButton extends HTMLElement {
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
              <p>This will edit the current Commissioning Test Template,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/doc-reg/commision-test-template" data-close class="theme-btn">Save Changes</button>
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
  "edit-ctt-save-button",
  EditCTTSaveButton
);