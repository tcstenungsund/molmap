// Company Data Loader - Automatically loads company based on URL parameter

// Check URL parameter when page loads
// biome-ignore lint/security/noSecrets: "DOMContentLoaded" is identified as a secret false positive
window.addEventListener("DOMContentLoaded", () => {
  checkUrlAndLoadCompany();
});

// Also check when URL changes (for single-page apps)
window.addEventListener("popstate", () => {
  checkUrlAndLoadCompany();
});

// Function to check URL and load company data
function checkUrlAndLoadCompany() {
  const url_params = new URLSearchParams(window.location.search);
  const company_id = url_params.get("id");

  if (company_id) {
    lookupCompany(company_id);
  } else {
    // No ID in URL, show default message
    const result_div = document.getElementById("company-result");
    result_div.innerHTML = "<p>Scan a QR code to view company information.</p>";
  }
}

// Main function to lookup and display company
async function lookupCompany(company_id) {
  const result_div = document.getElementById("company-result");

  // Show loading state
  result_div.innerHTML = "<p>Loading company data...</p>";

  try {
    // Fetch the JSON data
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error("Failed to load company data");
    }

    const data = await response.json();
    const company = data.companies[company_id];

    if (company) {
      displayCompany(company);
    } else {
      result_div.innerHTML = `
        <div class="error">
          <h3>Company Not Found</h3>
          <p>No company found with ID: <strong>${company_id}</strong></p>
        </div>
      `;
    }
  } catch (_error) {
    //console.error("Error loading company data:", error);
    result_div.innerHTML = `
      <div class="error">
        <h3>Error</h3>
        <p>Failed to load company data. Please try again.</p>
      </div>
    `;
  }
}

// Function to display company information on the page
function displayCompany(company) {
  const result_div = document.getElementById("company-result");

  result_div.innerHTML = `
    <div class="company-card">
      <img src="${company.logo}" alt="${company.name} logo" class="company-logo">
      <h2>${company.name}</h2>
      <p class="company-id">ID: ${company.id}</p>
      <p class="company-description">${company.description}</p>
      
      <div class="company-details">
        <div class="detail-item">
          <strong>Industry:</strong> ${company.industry}
        </div>
        <div class="detail-item">
          <strong>Founded:</strong> ${company.founded}
        </div>
        <div class="detail-item">
          <strong>Employees:</strong> ${company.employees}
        </div>
        <div class="detail-item">
          <strong>Website:</strong> 
          <a href="${company.website}" target="_blank">${company.website}</a>
        </div>
      </div>
    </div>
  `;
}
