# Tecnico_sample_pro

<div class="content space-y-4">
  <div class="flex flex-wrap justify-between gap-2 items-center">
    <p class="text-xl font-semibold">Engineering Companies</p>

    <div class="flex flex-wrap gap-4 items-center justify-end">
      <span>
        <button
          id="eng-companies-add-btn"
          data-route="/atex/eng-companies/add"
          data-close
          class="theme-btn"
        >
          Add New
        </button>
      </span>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          Export
        </button>
      </span>
      <span>
        <button class="theme-btn-primary-outline whitespace-nowrap">
          Layouts
        </button>
      </span>

      <span>
        <reset-grid-modal></reset-grid-modal>
      </span>

      <button class="btn-theme-primary-outline">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>
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
  <div>
    <search-input></search-input>
  </div>

  <!-- Table -->
  <div class="page-section border-theme">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="border-b border-gray-200">
          <tr class="table-heading">
            <th class="table-header">
              <span>Company Name</span>
            </th>
            <th class="table-header">
              <span>Country</span>
            </th>
            <th class="table-header">
              <span>Tel No</span>
            </th>
            <th class="table-header">
              <span>Fax No</span>
            </th>
            <th class="table-header">
              <span>Contact Name</span>
            </th>
            <th class="table-header">
              <span>Email</span>
            </th>
            <th class="table-header">
              <span>Website</span>
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
    <delete-modal
      title="Delete Company"
      description="This will delete the selected company from the list. Are you sure?"
    ></delete-modal>
    <button class="theme-btn">Show Details</button>
  </div>
</div>
