document.addEventListener('DOMContentLoaded', function() {
    const locationsDiv = document.getElementById('locations');
    const clearAllBtn = document.getElementById('clearAll');
    const findPlacesBtn = document.getElementById('findPlaces');

    // Load locations from storage and display them
    chrome.storage.local.get({ locations: [] }, function(result) {
        result.locations.forEach((location, index) => {
            const locationDiv = document.createElement('div');
            locationDiv.className = 'location';
            locationDiv.textContent = `Location ${index + 1}: (${location.lat}, ${location.lng})`;
            locationsDiv.appendChild(locationDiv);
        });
    });

    // Clear all locations from storage and the display
    clearAllBtn.addEventListener('click', function() {
        chrome.storage.local.set({ locations: [] }, function() {
            locationsDiv.innerHTML = '';
        });
    });

    // Calculate the centroid of all locations and open a new Google Maps tab
    findPlacesBtn.addEventListener('click', function() {
        chrome.storage.local.get({ locations: [] }, function(result) {
            const centroid = calculateCentroid(result.locations);
            const searchQuery = 'movie theater';r
            const mapUrl = `https://www.google.com/maps/search/${searchQuery}/@${centroid.lat},${centroid.lng},15z`;
            chrome.tabs.create({ url: mapUrl });
        });
    });
});

function calculateCentroid(locations) {
    // Summ all latitudes and longitudes, then divide by the number of locations
    const latSum = locations.reduce((sum, loc) => sum + loc.lat, 0);
    const lngSum = locations.reduce((sum, loc) => sum + loc.lng, 0);
    return { lat: latSum / locations.length, lng: lngSum / locations.length };
}
