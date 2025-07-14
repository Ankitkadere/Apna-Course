self.addEventListener("install", function (event) {
  console.log("Service Worker installing.");
});

self.addEventListener("fetch", function (event) {
  // You can handle caching if you want here
});
