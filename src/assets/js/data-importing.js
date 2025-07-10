
class DataImportForm extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <div class="grid grid-cols-4 gap-4 items-center">
              ${[
                "1.Units (1 on file)",
                "2.Systems (79 on file)",
                "3.SubSystems (1 on file)",
                "4.Locations (1 on file)",
                "5.Areas (1 on file)",
                "6.SubAreas (1 on file)",
                "7.Types (1 on file)",
                "8.SubTypes (1 on file)",
                "Tag Groups (1 on file)",
                "Tags (1 on file)",
                "Tags Custom Data (1 on file)",
                "Tag Components (1 on file)",
            ]
                .map(
                    (option) => `
                <div class="space-y-1">
                  <div class="relative">
                    <select class="bg-theme-background select-input border-theme pr-10 appearance-none">
                      <option>${option}</option>
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
               
            </div>
    `;
    }
}
customElements.define("data-import-form", DataImportForm);

class ClearDownDB extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openClearDownDB" class="theme-btn-primary-outline"  aria-label="Clear Down DB Modal">Clear Down DB</button>
        <!-- Modal Overlay -->
        <div id="ClearDownDB" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50  hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
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
              <p class="text-xl font-semibold">Clear Down DB</p>
              <p >This will clear the Database,</p>
              <p >Are you sure?</p>
            </div>

            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
             <button data-close class="theme-warning-btn">Clear</button>
            </div>
          </div>
        </div>
      `;

        const modal = this.querySelector("#ClearDownDB");
        const openBtn = this.querySelector("#openClearDownDB");

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
customElements.define("clear-down", ClearDownDB);

class PreventDBClearDown extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <span>
        <!--Get All Import Sheets Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn-primary-outline whitespace-nowrap"> Prevent DB Clear Down</button>
        
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
            <p class="text-xl font-semibold text-center w-full">Prevent DB Clear Down</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will prevent the Database from clearing down,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button data-close class="theme-btn">Yes, Proceed</button>
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
    "prevent-db-clear-down",
    PreventDBClearDown
);

class GetAllImportSheets extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <span>
        <!--Get All Import Sheets Button (triggers modal) -->
        <button id="openEditModal" class="theme-btn-primary-outline whitespace-nowrap">Get All Import Sheets</button>
        
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
            <p class="text-xl font-semibold text-center w-full">Get All Import Sheets</p>
            <!-- Body -->
            <div class="space-y-2 text-center">
              <p>This will get all the import sheets,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button data-close class="theme-btn">Yes, Proceed</button>
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
    "get-all-import-sheets",
    GetAllImportSheets
);

class ClearPreviewGrid extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openClearPreviewGrid" class="theme-btn-primary-outline"  aria-label="Clear Modal">Clear</button>
        <!-- Modal Overlay -->
        <div id="ClearPreviewGrid" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50  hidden">
          <!-- Modal Content -->
          <div class="theme-modal-bg rounded-lg shadow-lg max-w-md w-full relative">
            <!-- Header -->
             <div class="w-full flex items-center justify-center gap-3 p-4">
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
              <p class="text-xl font-semibold">Clear Preview Grid</p>
              <p>This will clear Selected data in the grid,</p>
              <p >Are you sure?</p>
            </div>

            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
             <button data-close class="theme-warning-btn">Clear</button>
            </div>
          </div>
        </div>
      `;

        const modal = this.querySelector("#ClearPreviewGrid");
        const openBtn = this.querySelector("#openClearPreviewGrid");

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
customElements.define("clear-preview-grid", ClearPreviewGrid);
