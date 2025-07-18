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
            <button class="mode-btn border bg-theme border-theme font-semibold px-4 py-1 rounded-full" data-mode="auto">Auto</button>
            <button class="mode-btn border bg-theme border-theme font-semibold px-4 py-1 rounded-full" data-mode="no-ocr">No OCR?</button>
          </div>
          
          <div class="grid grid-cols-2 gap-x-4 gap-y-2">
            ${[
        "Checksheet",
        "Checksheet Punchlist",
        "FCR",
        "Preservation",
        "Certificate",
        "Punchlist",
        "Change Request",
        "TQ",
        "PCR",
      ]
        .map(
          (label) => `
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

    const dropdownBtn = this.querySelector("#dropdownBtn");
    const panel = this.querySelector(".dropdown-panel");
    const modeButtons = this.querySelectorAll(".mode-btn");
    const radioInputs = this.querySelectorAll('input[type="radio"][name="doc-type"]');

    // Toggle dropdown
    dropdownBtn.addEventListener("click", () => {
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
        // Remove active from all
        modeButtons.forEach((b) =>
          b.classList.remove("bg-theme-primary", "active")
        );
        // Add active to selected
        btn.classList.add("bg-theme-primary", "active");

        const mode = btn.getAttribute("data-mode");
        const isAuto = mode === "auto";

        // Enable or disable radio buttons based on mode
        radioInputs.forEach((radio) => {
          radio.disabled = isAuto;
        });
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
              <div class="flex-col w-full  space-y-2">
              <div class="flex justify-between">
              <p class="text-lg font-semibold mb-2">Preview</p>
              <div class="flex space-x-2">
                <div class="border border-theme p-1 rounded">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="w-5 h-6 text-current"
                  >
                    <path d="M10 8H5V3M5.29102 16.3569C6.22284 17.7918 7.59014 18.8902 9.19218 19.4907C10.7942 20.0913 12.547 20.1624 14.1925 19.6937C15.8379 19.225 17.2893 18.2413 18.3344 16.8867C19.3795 15.5321 19.963 13.878 19.9989 12.1675C20.0347 10.4569 19.5211 8.78001 18.5337 7.38281C17.5462 5.98561 16.1366 4.942 14.5122 4.40479C12.8878 3.86757 11.1341 3.86499 9.5083 4.39795C7.88252 4.93091 6.47059 5.97095 5.47949 7.36556" />
                  </svg>
                </div>

                <div class="border border-theme p-1 rounded">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="w-5 h-6 text-current"
                  >
                    <path d="M13.9998 8H18.9998V3M18.7091 16.3569C17.7772 17.7918 16.4099 18.8902 14.8079 19.4907C13.2059 20.0913 11.4534 20.1624 9.80791 19.6937C8.16246 19.225 6.71091 18.2413 5.66582 16.8867C4.62073 15.5321 4.03759 13.878 4.00176 12.1675C3.96593 10.4569 4.47903 8.78001 5.46648 7.38281C6.45392 5.98561 7.86334 4.942 9.48772 4.40479C11.1121 3.86757 12.8661 3.86499 14.4919 4.39795C16.1177 4.93091 17.5298 5.97095 18.5209 7.36556"/>
                  </svg>
                </div>
              </div>


              </div>
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

class ClearModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Trigger Button -->
      <button id="openResetModal" class="theme-btn-primary-outline" aria-label="Clear Modal">Clear</button>
      
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
          <p class="text-xl font-semibold" >Clear</p>
            <p>This will clear the selected scanned document,</p>
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
customElements.define("clear-modal", ClearModal);

class MarkAsAdditionalPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openMarkOfferedModal" class="theme-btn" aria-label="Mark as Additional Page Modal">Mark as Additional Page</button>
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
              <p class="text-xl font-semibold">Mark as Additional Page</p>
              <p>This will mark the selected as Additional Page,</p>
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
customElements.define("mark-as-additional-page", MarkAsAdditionalPage);

class ProcessModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openMarkOfferedModal" class="theme-btn" aria-label="Process Modal">Process</button>
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
              <p class="text-xl font-semibold">Process</p>
              <p>This will Process the selected scanned Documents,</p>
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
customElements.define("process-modal", ProcessModal);

/* Recently Scanned  */
class RecentlyScannedTable extends HTMLElement {
  connectedCallback() {
    const columns = [
      "Tag No","Checksheet Name","Revision","Type","Tag Check Discipline Desc",
      "Phase","Completed","Completed At","Tag Check Completed By","Tag Check Completed Group",
      "Checksheet Description","Attach Added At","Tag Check Attach New Filename","FCR",
      "Contractor","Tag Check Scanned At","Tag Check Scanned By"
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
customElements.define("recently-scanned-table", RecentlyScannedTable);

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
