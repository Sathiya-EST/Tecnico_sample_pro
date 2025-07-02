class ModeSelect extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="relative inline-block text-left">
          <button id="dropdownBtn" class="w-48 bg-theme-background border border-theme px-4 py-2 rounded-md text-left cursor-pointer flex justify-between items-center">
            <span>Select Mode</span>
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <button id="scanAgainBtn" class="border border-purple-700 text-purple-700 px-4 py-1 rounded">Scan Again</button>
              <button id="cancelScanBtn" class="border border-purple-700 text-purple-700 px-4 py-1 rounded">Cancel Scan</button>
              <button class="bg-purple-700 text-white px-4 py-1 rounded">Upload</button>
            </div>
          </div>
        </div>
      `;

    const modal = this.querySelector("#modal");
    const openBtn = this.querySelector("#openScanBtn");
    const closeBtn = this.querySelector("#closeModalBtn");
    const scanAgainBtn = this.querySelector("#scanAgainBtn");
    const cancelScanBtn = this.querySelector("#cancelScanBtn");

    openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

    scanAgainBtn.addEventListener("click", () => {
      alert("Scan Again initiated.");
    });

    cancelScanBtn.addEventListener("click", () => {
      alert("Scan cancelled.");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }
}

customElements.define("scan-modal", ScanModal);
