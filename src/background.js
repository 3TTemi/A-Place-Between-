// Background script to location adds in local storage (recieved fom content script)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addLocation") {
    chrome.storage.local.get({ locations: [] }, function (result) {
      const updatedLocations = [...result.locations, request.location];
      chrome.storage.local.set({ locations: updatedLocations }, function () {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          sendResponse({ success: false });
        } else {
          console.log("Location added:", request.location);
          sendResponse({ success: true });
        }
      });
    });
    return true; // Indicates that the response is sent asynchronously
  }
});
