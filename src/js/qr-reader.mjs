import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.mjs";

// biome-ignore lint/security/noSecrets: "DOMContentLoaded" is identified as a secret false positive
window.addEventListener("DOMContentLoaded", () => {
  checkUrlAndLoadCompany();
});

window.addEventListener("popstate", () => {
  checkUrlAndLoadCompany();
});

function checkUrlAndLoadCompany() {
  const url_params = new URLSearchParams(window.location.search);
  const company_id = url_params.get("id");

  if (company_id) {
    lookupCompany(company_id);
  } else {
    const result_div = document.getElementById("company-result");
    // UPDATED TEXT: Refers to "footer" instead of "bottom right"
    result_div.innerHTML =
      "<p>Scan a QR code to view company information by pressing the button located in the footer.</p>";
  }
}

async function lookupCompany(company_id) {
  const result_div = document.getElementById("company-result");
  result_div.innerHTML = "<p>Loading company data...</p>";

  try {
    const doc_ref = doc(db, "company", company_id);
    const doc_snap = await getDoc(doc_ref);

    if (doc_snap.exists()) {
      displayCompany({
        id: doc_snap.id,
        ...doc_snap.data(),
      });
    } else {
      result_div.innerHTML = `
        <div class="error">
          <h3>Company Not Found</h3>
          <p>No company found with ID: <strong>${company_id}</strong></p>
        </div>
      `;
    }
  } catch {
    result_div.innerHTML = `
      <div class="error">
        <h3>Error</h3>
        <p>Failed to load company data. Please try again.</p>
      </div>
    `;
  }
}

function displayCompany(company) {
  const result_div = document.getElementById("company-result");

  result_div.innerHTML = `
    <div class="company-card">
      <img src="${company.logo}" alt="${company.name} logo" class="company-logo">
      <h2>${company.name}</h2>
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
