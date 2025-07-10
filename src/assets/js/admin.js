
class AdminSecurity extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4">
        <div class="tab-header">
          <button class="tab-button active" onclick="this.closest('admin-security').switchTab(event, 'tab1')">Users</button>
          <button class="tab-button" onclick="this.closest('admin-security').switchTab(event, 'tab2')">Groups</button>
          <button class="tab-button" onclick="this.closest('admin-security').switchTab(event, 'tab3')">User Levels</button>
        </div>

        ${this.getTabHTML('tab1', 'Users')}
        ${this.getTabHTML('tab2', 'Groups')}
        ${this.getTabHTML('tab3', 'User Levels')}
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
        id="eng-companies-save-btn"
        data-route="/admin/security/user-acc/add"
        data-close
        class="theme-btn"
      >
        Add
      </button>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          Details
        </button>
      </span>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          Export
        </button>
      </span>
      <reset-grid-modal></reset-grid-modal>
      <admin-users-filter></admin-users-filter>
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
  <div class="page-section border-theme">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-gray-200">
          <tr class="table-heading">
            <th class="table-header">
              <span>User Name</span>
            </th>
            <th class="table-header">
              <span>Full Name</span>
            </th>
            <th class="table-header">
              <span>Organisation</span>
            </th>
            <th class="table-header">
              <span>Tel</span>
            </th>
            <th class="table-header">
              <span>Mobile Tel</span>
            </th>
            <th class="table-header">
              <span>User Level</span>
            </th>
            <th class="table-header">
              <span>Email Address</span>
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
  <admin-unlink></admin-unlink>
    <delete-modal
      title="Delete"
      description="This will delete the selected row. Are you sure?"
    ></delete-modal>
    <admin-link></admin-link>
  </div>
              `,
      'tab2': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
      <button
        id="eng-companies-save-btn"
        data-route="/admin/security/user-group/add"
        data-close
        class="theme-btn"
      >
        Add
      </button>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          Details
        </button>
      </span>
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
  <div class="page-section border-theme">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-gray-200">
          <tr class="table-heading">
            <th class="table-header">
              <span>Security Groups</span>
            </th>
            <th class="table-header">
              <span>Group Deletable</span>
            </th>
            <th class="table-header">
              <span>Default Skin</span>
            </th>
            <th class="table-header">
              <span>Startup Form</span>
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
    <delete-modal
      title="Delete"
      description="This will delete the selected row. Are you sure?"
    ></delete-modal>
  </div>
  `,
      'tab3': `
        <div class="flex justify-between">
          <search-input></search-input>
          <div class="flex flex-wrap gap-4 items-center justify-end">
      <button
        id="eng-companies-save-btn"
        data-route="/admin/security/user-level/add"
        data-close
        class="theme-btn"
      >
        Add
      </button>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          Details
        </button>
      </span>
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
  <div class="page-section border-theme">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-gray-200">
          <tr class="table-heading">
            <th class="table-header">
              <span>Security Groups</span>
            </th>
            <th class="table-header">
              <span>Group Deletable</span>
            </th>
            <th class="table-header">
              <span>Default Skin</span>
            </th>
            <th class="table-header">
              <span>Startup Form</span>
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
    <delete-modal
      title="Delete"
      description="This will delete the selected row. Are you sure?"
    ></delete-modal>
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
customElements.define("admin-security", AdminSecurity);

class AdminUsersFilter extends HTMLElement {
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
                 ${["User Name", "Fulll Name", "Job Title"]
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
        "Show Deleted ",
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
customElements.define("admin-users-filter", AdminUsersFilter);

class Link extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openLinkModal" class="theme-btn"  aria-label="markOffered Modal">Link</button>
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
              <p class="text-xl font-semibold">Link</p>
              <p >This will Link the selected User,</p>
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
    const openBtn = this.querySelector("#openLinkModal");

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
customElements.define("admin-link", Link);

class UnLink extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <!-- Trigger Button -->
       
        <button id="openUnLinkModal" class="theme-btn-primary-outline"  aria-label="markOffered Modal">Unlink</button>
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
              <p class="text-xl font-semibold">Unlink</p>
              <p >This will Unlink the Linked User,</p>
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
    const openBtn = this.querySelector("#openUnLinkModal");

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
customElements.define("admin-unlink", UnLink);

class AddUser extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "User Name",
        "Fulll Name",
        "Job Title",
        "Organisation",
        "Tel",
        "Mobile Tel",
        "User Level",
        "Email Address",
        "",
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
            ${["Enabled"]
        .map(
          (label) => `
                    <label class="flex items-center gap-2">
                    <input type="radio" class="w-4 h-4" /> ${label}
                    </label>
                        `
        )
        .join("")}
                ${["Last Login"]
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
        "Num Logins",
        "Back-to-Back"
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
                 ${["Linked", "Tablet Only"]
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
customElements.define("add-user", AddUser);

class AddGroup extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Security Groups",
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
            ${["Group Deletable"]
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
              
                 ${[
        "Default Skin",
        "Startup Form"
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
customElements.define("add-group", AddGroup);

class AddUserLevel extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 gap-4 items-center mt-6">
            <!-- Input fields -->
           
    ${[
        "Description",
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
            ${["Deleted"]
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
customElements.define("add-user-level", AddUserLevel);

class FileUpload extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label");
    const accept = this.getAttribute("accept") || "*/*";
    const placeholder = this.getAttribute("placeholder") || "Choose file";
    const isDisabled = this.hasAttribute("disabled");

    const fileInputId = `file-${Math.random().toString(36).slice(2)}`;

    this.innerHTML = `
      <div class="max-w-2xl w-full">
        <div class="flex items-center space-x-4">

          ${label
        ? `<label for="${fileInputId}" class="text-sm text-gray-700 min-w-32">${label}</label>`
        : ""
      }

          <div class="flex-1 flex items-center border border-theme rounded-md overflow-hidden h-10 bg-theme-surface ${isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }">
            <div 
              id="${fileInputId}-filename"
              class="flex-1 px-3 text-sm leading-10 truncate bg-theme-surface"
            >
              ${placeholder}
            </div>
          </div>

          <label class="relative px-4 h-10 flex items-center justify-center text-sm rounded-md 
            ${isDisabled
        ? "bg-theme cursor-not-allowed"
        : "bg-theme cursor-pointer"}">
        <button class="theme-btn">
            Browse</button>
            <input 
              type="file" 
              id="${fileInputId}" 
              accept="${accept}" 
              ${isDisabled ? "disabled" : ""}
              class="absolute inset-0 w-full h-full opacity-0 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}"
            />
          </label>

        </div>
      </div>
    `;

    if (!isDisabled) {
      const input = this.querySelector(`#${fileInputId}`);
      const filenameDisplay = this.querySelector(`#${fileInputId}-filename`);

      input.addEventListener("change", () => {
        const fileName = input.files?.[0]?.name || placeholder;
        filenameDisplay.textContent = fileName;
      });
    }
  }
}
customElements.define("file-upload", FileUpload);


class ReportAdmin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4">
        <div class="tab-header">
          <button class="tab-button active" onclick="this.closest('report-admin').switchTab(event, 'tab1')">Reports</button>
          <button class="tab-button" onclick="this.closest('report-admin').switchTab(event, 'tab2')">Settings</button>
        </div>

        ${this.getTabHTML('tab1', 'Reports')}
        ${this.getTabHTML('tab2', 'Settings')}
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
        id="admin-add-btn"
        data-route="/admin/report-admin/add"
        data-close
        class="theme-btn"
      >
        Add
      </button>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          Export
        </button>
      </span>
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
  <div class="page-section border-theme">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-gray-200">
          <tr class="table-heading">
            <th class="table-header">
              <span>Friendly Name</span>
            </th>
            <th class="table-header">
              <span>Report Name</span>
            </th>
            <th class="table-header">
              <span>Report Filename</span>
            </th>
            <th class="table-header">
              <span>Is Admin Only</span>
            </th>
            <th class="table-header">
              <span>Sort By</span>
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
      id="admin-edit-btn"
      data-route="/admin/report-admin/edit"
      data-close
      class="theme-btn-primary-outline"
    >
      Edit
    </button>
    <delete-modal
      title="Delete"
      description="This will delete the selected row. Are you sure?"
    ></delete-modal>
    <button class="theme-btn whitespace-nowrap">Update</button>
  </div>
              `,
      'tab2': `
              <div class="space-y-4">
            <div class="border border-theme rounded-md p-4 space-y-2">
  <p class="text-xl font-semibold">Margins</p>
  <div class="grid grid-cols-2 gap-10">
    <div class="flex items-center gap-4">
      <label class="block text-sm font-medium w-16">Top</label>
      <input
        type="text"
        class="input-text bg-theme-background border-theme flex-1 rounded px-3 py-2 text-sm"
        placeholder="Enter"
      />
    </div>
    <div class="flex items-center gap-4">
      <label class="block text-sm font-medium w-16">Bottom</label>
      <input
        type="text"
        class="input-text bg-theme-background border-theme flex-1 rounded px-3 py-2 text-sm"
        placeholder="Enter"
      />
    </div>
    <div class="flex items-center gap-4">
      <label class="block text-sm font-medium w-16">Left</label>
      <input
        type="text"
        class="input-text bg-theme-background border-theme flex-1 rounded px-3 py-2 text-sm"
        placeholder="Enter"
      />
    </div>
    <div class="flex items-center gap-4">
      <label class="block text-sm font-medium w-16">Right</label>
      <input
        type="text"
        class="input-text bg-theme-background border-theme flex-1 rounded px-3 py-2 text-sm"
        placeholder="Enter"
      />
    </div>
  </div>
</div>
              </div>
            <div class="border border-theme rounded-md p-4 space-y-4">
  <p class="text-xl font-semibold">Options</p>

  <label class="flex items-center gap-2">
    <input type="radio" class="w-4 h-4" />
    Include Sof Tags (Default)
  </label>

  <label class="flex items-center gap-2">
    <input type="radio" class="w-4 h-4" />
    Hide Search Criteria (Default)
  </label>

  <label class="flex items-center gap-2">
    <input type="radio" class="w-4 h-4" />
    Split Composite Reports by System and Subsystem
  </label>

  <label class="block">Skyline First Day Of Week</label>
  
  <div class="relative max-w-xs">
    <select class="bg-theme-background select-input border-theme w-full pr-10 appearance-none">
      <option>Select</option>
    </select>
    <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </div>
</div>

              <div class="footer-container">
              <button class="theme-btn">Save</button>
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
customElements.define("report-admin", ReportAdmin);

class AddReportAdmin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Friendly Name", "Report Name", "Report Fillename"]
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
       ${["Sort By"]
        .map(
          (label) => `
      <div class="col-span-1 space-y-1">
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
      <div class="col-span-3"></div>
    `
        )
        .join("")}
       ${["Is Admin Only"]
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
customElements.define("add-report-admin", AddReportAdmin);

class EditReportAdminSaveButton extends HTMLElement {
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
              <p>This will edit the current Report Admin,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/admin/report-admin" data-close class="theme-btn">Save Changes</button>
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
  "edit-report-admin-save-button",
  EditReportAdminSaveButton
);

class AuditLogFilter extends HTMLElement {
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
                 ${["User", "Host"]
        .map(
          (label) => `
                <div class="space-y-1">
                  <label class="block">${label}</label>
                  <input type="text" class="input-text border-theme w-full" placeholder="Enter" />
                </div>
              `
        )
        .join("")}
         ${["Action", "Action Detail "]
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
                   ${["Date From", "Date To"]
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
customElements.define("audit-log-filter", AuditLogFilter);

class AddDashboardLayout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="grid grid-cols-4 items-start gap-4 mt-6">

  ${["Description", "Default"]
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
       ${["In Draft", "Enable Filters"]
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
customElements.define("add-dashboard-layout", AddDashboardLayout);

class EditDashboardLayoutSaveButton extends HTMLElement {
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
              <p>This will edit the current Dashboard Layout,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/admin/dashboard-layouts" data-close class="theme-btn">Save Changes</button>
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
  "edit-dashboard-layout-save-button",
  EditDashboardLayoutSaveButton
);