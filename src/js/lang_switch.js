const switch_button = document.getElementById("switch_button");

async function getData() {
  const url = "./lang.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const _result = await response.json();
    /* console.log(result.text(), "test"); */
  } catch (_error) {
    /* console.error(error.message); */
  }
}

switch_button.addEventListener("click", getData);
