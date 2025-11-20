function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    // biome-ignore lint/security/noSecrets: false positive, DOM event name
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(() => {
  const result_container = document.getElementById("qr-reader-results");
  let last_result,
    count_results = 0;

  const html5_qrcode_scanner = new Html5QrcodeScanner("qr-reader", {
    fps: 10,
    qrbox: 250,
  });

  function onScanSuccess(decoded_text, _decoded_result) {
    if (decoded_text !== last_result) {
      ++count_results;
      last_result = decoded_text;
      // console.log(`Scan result = ${decoded_text}`, decoded_result);

      result_container.innerHTML += `<div>[${count_results}] - ${decoded_text}</div>`;

      // Optional: To close the QR code scannign after the result is found
      html5_qrcode_scanner.clear();
    }
  }

  // Optional callback for error, can be ignored.
  function onScanError(_qr_code_error) {
    // This callback would be called in case of qr code scan error or setup error.
    // You can avoid this callback completely, as it can be very verbose in nature.
  }

  html5_qrcode_scanner.render(onScanSuccess, onScanError);
});

if (navigator.serviceWorker) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      // biome-ignore lint/suspicious/noConsole: We only want to log critical failures
      console.error("SW registration failed:", error);
    });
  });
}
