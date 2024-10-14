document.addEventListener("DOMContentLoaded", function () {
  const locationsDiv = document.getElementById("locations");
  const clearLocationsBtn = document.getElementById("clearLocations");
  const findCenterBtn = document.getElementById("findCenter");

  // Load locations from storage and display them
  chrome.storage.local.get({ locations: [] }, function (result) {
    result.locations.forEach((location, index) => {
      const locationDiv = document.createElement("div");
      locationDiv.className = "location";
      locationDiv.textContent = `Location ${index + 1}: ${location.address}`;
      locationsDiv.appendChild(locationDiv);
    });
  });

  // Clear all locations from storage and the display
  clearLocationsBtn.addEventListener("click", function () {
    chrome.storage.local.set({ locations: [] }, function () {
      locationsDiv.innerHTML = "";
    });
  });

  //   // Calculate the centroid of all locations and open a new Google Maps tab
  //   findCenterBtn.addEventListener("click", function () {
  //     chrome.storage.local.get({ locations: [] }, function (result) {
  //       const centroid = calculateCentroid(result.locations);
  //       const searchQuery = "movie theater";
  //       const mapUrl = `https://www.google.com/maps/search/${searchQuery}/@${centroid.lat},${centroid.lng},15z`;
  //       chrome.tabs.create({ url: mapUrl });
  //     });
  //   });
  // });

  function calculateCentroid(locations) {
    // Summ all latitudes and longitudes, then divide by the number of locations
    const latSum = locations.reduce((sum, loc) => sum + loc.lat, 0);
    const lngSum = locations.reduce((sum, loc) => sum + loc.lng, 0);
    return { lat: latSum / locations.length, lng: lngSum / locations.length };
  }

  findCenterBtn.addEventListener("click", function () {
    chrome.storage.local.get({ locations: [] }, function (result) {
      // Check if there are at least two locations
      if (result.locations.length < 2) {
        alert("Please add at least two locations before finding the center.");
        return;
      }

      // Calculate the center point (centroid) of all locations

      const centroid = calculateCentroid(result.locations);
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = `Center: ${centroid.lat.toFixed(
        6
      )}, ${centroid.lng.toFixed(6)}`;

      // Get the user's search query from the input field
      const searchQueryInput = document.getElementById("search-query");
      const searchQuery = encodeURIComponent(
        searchQueryInput.value.trim() || "point of interest"
      );
      const mapUrl = `https://www.google.com/maps/search/${searchQuery}/@${centroid.lat},${centroid.lng},15z`;

      // Create a new button to open the map
      const openMapButton = document.createElement("button");
      openMapButton.textContent = "Open in Google Maps";
      openMapButton.addEventListener("click", function () {
        chrome.tabs.create({ url: mapUrl });
      });

      // Add a line break and the new button to the result div
      resultDiv.appendChild(document.createElement("br"));
      resultDiv.appendChild(openMapButton);
    });
  });
});
