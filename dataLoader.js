// biome-ignore lint/security/noSecrets: "DOMContentLoaded" is identified as a secret false positive
document.addEventListener("DOMContentLoaded", () => {
  // biome-ignore lint/security/noSecrets: false positive
  const sheet_id = "1sEhbevUJHgTM-ojRBsu3_Vywg8gUf8Oe382AoYVd-do";
  const url = `https://docs.google.com/spreadsheets/d/${sheet_id}/gviz/tq?tqx=out:json`;

  async function loadData() {
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.substr(47).slice(0, -2));

    const rows = json.table.rows.map((r) => ({
      companyId: r.c[0]?.v,
      name: r.c[1]?.v,
      description: r.c[2]?.v,
      imageUrl: r.c[3]?.v,
    }));

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const company = rows.find((r) => r.companyId === id);

    if (!company) {
      // console.warn("Company not found for ID:", id);
      return;
    }

    document.getElementById("name").textContent = company.name;
    document.getElementById("description").textContent = company.description;
    document.getElementById("image").src = company.imageUrl;
  }

  loadData();
});
