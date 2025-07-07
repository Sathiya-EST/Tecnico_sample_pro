
class ProjectDocumentSelect extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
     <div class="relative max-w-80 min-w-80">
  <!-- Dropdown Trigger -->
  <div
    id="dropdownTrigger"
    class="flex items-center justify-between border px-4 py-2 rounded cursor-pointer bg-theme-header"
  >
    <span id="selectedText">Entire Project</span>
    <svg
      class="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
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
  </div>

  <!-- Dropdown Content -->
  <div
    id="dropdownMenu"
    class="absolute z-10 mt-1 w-full bg-brand-header border rounded shadow hidden"
  >
    <div class="flex justify-between p-2 px-4">
      <p class=" font-semibold">Description</p>
       <div class="flex justify-between space-x-4">
  <!-- Add Icon -->
       <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>  
  <!-- Edit Icon -->
  <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"></path> 
                </g>
              </svg>  
  <!-- Delete Icon -->
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
  <!-- Refresh Icon -->
      <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
        >
          <path
            d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        </div>
    </div>
    <!-- All Groups -->
   <div
  class="accordion-toggle dropdown-item flex items-center px-4 py-2 cursor-pointer"
  data-value="All Groups"
>
      <svg
        width="14"
        height="14"
        class="icon"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
      >
        <path
          d="M5.6 8.4H8.4V7H5.6V8.4ZM5.6 6.3H11.2V4.9H5.6V6.3ZM5.6 4.2H11.2V2.8H5.6V4.2ZM4.2 11.2C3.815 11.2 3.48542 11.0629 3.21125 10.7887C2.93708 10.5146 2.8 10.185 2.8 9.8V1.4C2.8 1.015 2.93708 0.685417 3.21125 0.41125C3.48542 0.137083 3.815 0 4.2 0H12.6C12.985 0 13.3146 0.137083 13.5887 0.41125C13.8629 0.685417 14 1.015 14 1.4V9.8C14 10.185 13.8629 10.5146 13.5887 10.7887C13.3146 11.0629 12.985 11.2 12.6 11.2H4.2ZM4.2 9.8H12.6V1.4H4.2V9.8ZM1.4 14C1.015 14 0.685417 13.8629 0.41125 13.5887C0.137083 13.3146 0 12.985 0 12.6V2.8H1.4V12.6H11.2V14H1.4Z"
          fill="currentColor"
        />
      </svg>
      All Groups
    </div>

    <!-- Folder 1 -->
    <div class="accordion-toggle flex items-center px-4 py-2 cursor-pointer">
      <svg
        class="w-4 h-4 icon"
        xmlns="http://www.w3.org/2000/svg"
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
      Folder 1
    </div>
    <div class="accordion-panel">
      <div
        class="dropdown-item"
        data-value="Folder Contents"
      >
        Folder Contents
      </div>
    </div>
  </div>
</div>
    `;

    const dropdownTrigger = this.querySelector("#dropdownTrigger");
    const dropdownMenu = this.querySelector("#dropdownMenu");
    const selectedText = this.querySelector("#selectedText");

    // Toggle dropdown
    dropdownTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("hidden");
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!this.contains(e.target)) {
        dropdownMenu.classList.add("hidden");
      }
    });

    // Accordion logic
    this.querySelectorAll(".accordion-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const panel = toggle.nextElementSibling;
        panel.classList.toggle("show");
      });
    });

    // Item selection
    this.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        selectedText.textContent = item.dataset.value;
        dropdownMenu.classList.add("hidden");
      });
    });
  }
}
customElements.define("project-documents-select", ProjectDocumentSelect);

class AddProjectDocument extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="space-y-4 mt-6">
        ${["Reference", "Revision", "Description", "Added By"].map(
      (label) => `
          <div class="grid grid-cols-4 gap-4 items-start">
            <div class="col-span-1 space-y-1">
              <label class="block text-sm font-medium">${label}</label>
              <input
                type="text"
                class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
                placeholder="Enter"
              />
            </div>
            <div class="col-span-3"></div>
          </div>
        `
    ).join("")}

        <div class="grid grid-cols-4 gap-4 items-start">
          <div class="col-span-1 space-y-1">
            <label class="block text-sm font-medium">Added At</label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              placeholder="Date"
              class="input-text bg-theme-background border-theme w-full rounded px-3 py-2 text-sm"
            />
          </div>
          <div class="col-span-3"></div>
        </div>
      </div>
    `;
  }
}
customElements.define("add-project-document", AddProjectDocument);

class EditProjectDocumentButton extends HTMLElement {
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
              <p>This will edit the current Document,</p>
              <p>Are you sure?</p>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-center gap-3 bg-theme-surface p-2 rounded-b-lg">
              <button data-close class="theme-btn-outline">Cancel</button>
              <button id="confirmSave" data-route="/project-documents" data-close class="theme-btn">Save Changes</button>
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
  "edit-project-document-save-button",
  EditProjectDocumentButton
);