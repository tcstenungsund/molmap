// biome-ignore lint/security/noSecrets: "DOMContentLoaded" is identified as a secret false positive
document.addEventListener("DOMContentLoaded", () => {
  const fab = document.getElementById("qr-fab-button");
  const overlay = document.getElementById("qr-overlay");

  let scanner = null;
  let is_scanner_active = false;

  const config = {
    fps: 10,
    qrbox: (viewfinder_width, viewfinder_height) => {
      const min_edge = Math.min(viewfinder_width, viewfinder_height);
      return {
        width: Math.floor(min_edge * 0.7),
        height: Math.floor(min_edge * 0.7),
      };
    },
    supportedScanTypes: [0],
  };

  function stopScanner() {
    is_scanner_active = false;

    // Remove the body class so the footer goes back to normal z-index
    document.body.classList.remove("qr-active");

    overlay.classList.remove("is-active");
    fab.classList.remove("is-open");

    if (scanner) {
      scanner
        .stop()
        .then(() => {
          scanner.clear();
        })
        .catch((_err) => {});
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
      alert(`Skannat innehåll:\n${decoded_text}`);
      scanner.resume();
    }
  }

  function onScanFailure(_error) {}

  function startScanner() {
    is_scanner_active = true;

    // Add class to body to elevate footer z-index
    document.body.classList.add("qr-active");

    overlay.classList.add("is-active");
    fab.classList.add("is-open");

    if (!scanner) {
      // @ts-ignore
      scanner = new Html5Qrcode("qr-reader");
    }

    scanner
      .start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanFailure,
      )
      .catch((_err) => {
        alert("Kunde inte starta kameran. Kontrollera behörigheter.");
        stopScanner();
      });
  }

  function toggleScanner() {
    if (is_scanner_active) {
      stopScanner();
    } else {
      startScanner();
    }
  }

  // Toggle via Button
  fab.addEventListener("click", toggleScanner);

  // Close via Overlay Click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      stopScanner();
    }
  });
});
