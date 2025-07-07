class ModeSelect extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="relative inline-block text-left">
          <button id="dropdownBtn" class="w-48 bg-theme-background border border-theme px-4 py-2 rounded-md text-left cursor-pointer flex justify-between items-center">
            <span>Select Mode</span>
            <svg class="w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

        <div class="dropdown-panel absolute right-0 z-10 mt-2 w-96 theme-modal-bg border border-theme rounded-lg shadow-lg p-4 hidden">
            <h3 class="font-semibold mb-3">Select Mode</h3>
            
            <div class="flex gap-2 mb-4">
              <button class="mode-btn border bg-theme border-theme font-semibold px-4 py-1 rounded-full">Auto</button>
              <button class="mode-btn border bg-theme border-theme font-semibold px-4 py-1 rounded-full">No OCR?</button>
            </div>
            
            <div class="grid grid-cols-2 gap-x-4 gap-y-2">
              ${[
                "Checksheet",
                "FCR",
                "Certificate",
                "Change Request",
                "PCR",
                "Checksheet Punchlist",
                "Preservation",
                "Punchlist",
                "TQ",
              ]
                .map(
                  (label, index) => `
                <label class="flex items-center gap-2">
                  <input type="radio" name="doc-type" value="${label}" class="form-radio" />
                  <span>${label}</span>
                </label>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      `;

    const btn = this.querySelector("#dropdownBtn");
    const panel = this.querySelector(".dropdown-panel");
    const modeButtons = this.querySelectorAll(".mode-btn");

    // Toggle dropdown
    btn.addEventListener("click", () => {
      panel.classList.toggle("hidden");
    });

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!this.contains(e.target)) {
        panel.classList.add("hidden");
      }
    });

    // Mode toggle behavior
    modeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        modeButtons.forEach((b) =>
          b.classList.remove("bg-theme-primary", "active")
        );
        btn.classList.add("bg-theme-primary", "active");
      });
    });
  }
}
customElements.define("mode-select", ModeSelect);

class ScanModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div>
          <button id="openScanBtn" class="theme-btn">Scan</button>
        </div>

        <!-- Modal -->
        <div id="modal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 hidden">
          <div class="bg-theme-background border min-w-6xl rounded-lg shadow-xl overflow-hidden ">
            <!-- Header -->
            <div class="flex items-center justify-between border-b px-5 py-3">
              <h2 class="text-lg font-semibold">Scan Document</h2>
              <div class="flex gap-2">
                <div class="w-px h-8 bg-theme-border"></div>
              <button id="closeModalBtn" >
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

            <!-- Content -->
            <div class="flex px-6 py-5 gap-6">
              <!-- Left Panel -->
              <div class="w-1/3 space-y-4">
                <div class="space-x-3">
                  <p>Status</p>
                  <p class="font-medium text-sm">Idle</p>
                </div>
                <div>
                  <p>Document Name</p>
                  <p class="font-medium text-sm">-</p>
                </div>
                <div>
                  <p>Document Size</p>
                  <p class="font-medium text-sm">-</p>
                </div>
                <div class="space-y-1">
                  <p>Progress</p>
                  <div class="w-full bg-theme h-2 rounded border border-theme">
                    <div class="bg-success h-2 rounded" style="width: 48%"></div>
                  </div>
                  <p class="mt-1">48%</p>
                </div>
              </div>

              <!-- Preview Panel -->
            <div class="w-full flex justify-center scannning-frame bg-no-repeat bg-center bg-cover">
              <div class="w-2/3 relative flex items-center justify-center rounded-md bg-theme-background">
               <div class="text-center space-y-4"> <p class="text-slate-300 text-4xl">Document</p>
                <p class="text-slate-300 text-4xl">Preview</p>
                </div>
                <button class="absolute top-2 right-10">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Undo"> <path id="Vector" d="M10 8H5V3M5.29102 16.3569C6.22284 17.7918 7.59014 18.8902 9.19218 19.4907C10.7942 20.0913 12.547 20.1624 14.1925 19.6937C15.8379 19.225 17.2893 18.2413 18.3344 16.8867C19.3795 15.5321 19.963 13.878 19.9989 12.1675C20.0347 10.4569 19.5211 8.78001 18.5337 7.38281C17.5462 5.98561 16.1366 4.942 14.5122 4.40479C12.8878 3.86757 11.1341 3.86499 9.5083 4.39795C7.88252 4.93091 6.47059 5.97095 5.47949 7.36556" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                </button>
                <button class="absolute top-2 right-2">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Undo"> <path id="Vector" d="M10 8H5V3M5.29102 16.3569C6.22284 17.7918 7.59014 18.8902 9.19218 19.4907C10.7942 20.0913 12.547 20.1624 14.1925 19.6937C15.8379 19.225 17.2893 18.2413 18.3344 16.8867C19.3795 15.5321 19.963 13.878 19.9989 12.1675C20.0347 10.4569 19.5211 8.78001 18.5337 7.38281C17.5462 5.98561 16.1366 4.942 14.5122 4.40479C12.8878 3.86757 11.1341 3.86499 9.5083 4.39795C7.88252 4.93091 6.47059 5.97095 5.47949 7.36556" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                </button>
              </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end gap-3 footer-container px-5 py-3 border-t">
              <scan-again></scan-again>
              <cancel-scan></cancel-scan>
              <button class="theme-btn" id="uploadScan">Upload</button>
            </div>
          </div>
        </div>
      `;

    const modal = this.querySelector("#modal");
    const openBtn = this.querySelector("#openScanBtn");
    const closeBtn = this.querySelector("#closeModalBtn");
    const uploadBtn = this.querySelector("#uploadScan");

    openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    uploadBtn.addEventListener("click", () => modal.classList.add("hidden"));

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }
}
customElements.define("scan-modal", ScanModal);

class ScanAgain extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Trigger Button -->
      <button id="openResetModal" class="theme-btn-primary-outline" aria-label="Reset Grid Modal">Scan Again</button>
      
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
          <p class="text-xl font-semibold" >Scan Again</p>
            <p>This will restart the scanning process,</p>
            <p>Are you sure?</p>
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
customElements.define("scan-again", ScanAgain);

class CancelScan extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Trigger Button -->
      <button id="openResetModal" class="theme-btn-primary-outline" aria-label="Reset Grid Modal">Cancel Scan</button>
      
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
          <p class="text-xl font-semibold" >Cancel Scan</p>
            <p>This will cancel the scanning process,</p>
            <p>Are you sure?</p>
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
customElements.define("cancel-scan", CancelScan);

class SourceSelect extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="relative">
        <select
          class="bg-theme-background select-input border-theme pr-10 appearance-none"
          aria-label="Select Source"
        >
          <option disabled selected hidden value="">Select</option>
          <option disabled class="font-bold">
            Select Source
          </option>
          <option>PDF file</option>
          <option>TIFF file</option>
        </select>
        <span
          class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 "
        >
          <svg
            class="w-4 h-4"
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
        </span>
      </div>
    `;
  }
}
customElements.define("source-select", SourceSelect);

/* Recently Scanned Filter */
class RecentlyScannedFilter extends HTMLElement {
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
      <div class="modal-overlay " id="filterPopup">
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
            <div class="grid grid-cols-2 gap-4 items-center">
              ${["Checksheet Completed With-in", "Doc Type"]
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
customElements.define("recently-scanned", RecentlyScannedFilter);
