class AddRequest extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
                "Ref",
                "Status",
                "Type",
                "Affected Type",
                "Item Name",
                "Description",
                "Raised At",
                "Raised By",
                "Requested By",
                "Requested Responsible Group",
                "Responsible Approver",
                "Responsible Approver Group",
                "Accepted By",
                "Accepted At",
                "Accepted Responsible Group",
                "Actioned At",
                "Actioned By",
                "Rejection Reason",
                "Rejected At",
                "Rejected By",
                "Scanned By",
                "Scanned At",
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
customElements.define("add-request", AddRequest);


class ChangeReqFilter extends HTMLElement {
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
             
                                    ${["Show Completed/Rejected"]
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
customElements.define("change-req-filter", ChangeReqFilter);
