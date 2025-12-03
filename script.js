// biome-ignore lint/security/noSecrets: "DOMContentLoaded" is identified as a secret false positive
document.addEventListener("DOMContentLoaded", () => {
  const fab = document.getElementById("qr-fab-button");
  const overlay = document.getElementById("qr-overlay");

  let scanner = null;
  let is_scanner_active = false;

  const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1.0,
    supportedScanTypes: [0],
  };

  function stopScanner() {
    is_scanner_active = false;

    overlay.classList.remove("is-active");
    fab.classList.remove("is-open");

    if (scanner) {
      scanner.clear().catch(() => {});
    }
  }

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  function onScanSuccess(decoded_text, _decoded_result) {
    scanner.pause();

    if (isValidHttpUrl(decoded_text)) {
      window.location.href = decoded_text;
    } else {
      alert(`Scanned content:\n${decoded_text}`);
      scanner.resume();
    }
  }

  function onScanFailure(_error) {
    // Ignore frame errors
  }

  function startScanner() {
    is_scanner_active = true;

    overlay.classList.add("is-active");
    fab.classList.add("is-open");

    if (!scanner) {
      scanner = new Html5QrcodeScanner(
        "qr-reader",
        config,
        /* verbose= */ false,
      );
    }

    scanner.render(onScanSuccess, onScanFailure);
  }

  function toggleScanner() {
    if (is_scanner_active) {
      stopScanner();
    } else {
      startScanner();
    }
  }

  fab.addEventListener("click", toggleScanner);
});
