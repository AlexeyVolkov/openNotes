if ("serviceWorker" in window.navigator) {
  window.addEventListener("load", function registerServiceWorker() {
    navigator.serviceWorker
      .register("/serviceworker.js")
      .then(function serviceWorkerRegistered(registration) {
        console.log("SW registered: ", registration);
      })
      .catch(function serviceWorkerRegistrationFailed(registrationError) {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
