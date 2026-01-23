const switch_button = document.getElementById("switch_button");
let lang_mode = "se";

async function switchLang() {
  const result = await getData();
  document.getElementById("title-text").innerText =
    result.lang[lang_mode].title;
  document.getElementById("qr-code-instruction").innerText =
    result.lang[lang_mode].qrCode;
  lang_mode = lang_mode === "se" ? "en" : "se";
}

async function getData() {
  try {
    const response = await fetch("./src/js/lang.json");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    /* console.log(result.lang.se.title, "test"); */
    return result;
  } catch (_error) {
    /* console.error(error.message); */
  }
}

if (switch_button) {
  switch_button.addEventListener("click", switchLang);
}
