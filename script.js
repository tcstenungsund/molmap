// biome-ignore lint/security/noSecrets: "DOMContentLoaded" is identified as a secret false positive
document.addEventListener("DOMContentLoaded", () => {
  const fab = document.getElementById("qr-fab-button");
  const overlay = document.getElementById("qr-overlay");

  // We use Html5Qrcode (the class) instead of the Scanner widget
  // to get full control over the UI and remove the broken white bars.
  let scanner = null;
  let is_scanner_active = false;

  const config = {
    fps: 10,
    // Determines the scanning box size relative to the container
    qrbox: (viewfinder_width, viewfinder_height) => {
      const min_edge = Math.min(viewfinder_width, viewfinder_height);
      return {
        width: Math.floor(min_edge * 0.7),
        height: Math.floor(min_edge * 0.7),
      };
    },
    // We removed aspectRatio: 1.0 here.
    // We let CSS handle the square container shape, and let the
    // video fill it naturally to avoid white gaps.
    supportedScanTypes: [0],
  };

  function stopScanner() {
    is_scanner_active = false;

    overlay.classList.remove("is-active");
    fab.classList.remove("is-open");

    if (scanner) {
      scanner
        .stop()
        .then(() => {
          scanner.clear();
        })
        .catch((_err) => {
          // Ignore errors on stop
        });
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
    // Pause scanning on success
    scanner.pause();

    if (isValidHttpUrl(decoded_text)) {
      window.location.href = decoded_text;
    } else {
      alert(`Skannat innehåll:\n${decoded_text}`);
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
      // @ts-ignore
      scanner = new Html5Qrcode("qr-reader");
    }

    // "facingMode: environment" prefers the back camera
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

  fab.addEventListener("click", toggleScanner);
});
