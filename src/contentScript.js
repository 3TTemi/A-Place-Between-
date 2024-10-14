function addCustomMenuItem() {
  // Query the existing Google Maps context menu 
  const contextMenu = document.getElementById('action-menu');

  if (contextMenu) {
      // Check if the custom menu item already exists to prevent duplicates
      if (!document.getElementById('custom-menu-item')) {
          // Create a new menu item
          const newItem = document.createElement('div');
          newItem.id = 'custom-menu-item'; // Set an ID for the custom item
          newItem.setAttribute('role', 'menuitemradio'); // Match the role attribute for consistency
          newItem.className = 'fxNQSd'; // Use the same class for styling

          // Set up the inner content of the new menu item
          newItem.innerHTML = `
              <div aria-checked="false" tabindex="0" data-index="0">
                  <span>Add Location to A Place Between</span>
              </div>
          `;

          // Add the click event for your new menu item
          newItem.addEventListener('click', function() {
            // Retrive current latitude and longitude 
              const latLng = extractLatLngFromContextMenu();
              chrome.storage.local.get({ locations: [] }, function(result) {
                const updatedLocations = [...result.locations, latLng];
                chrome.storage.local.set({ locations: updatedLocations }, function() {
                    console.log('Location added:', latLng);
                });
            });
              alert('Location added to A Place Between');
          });

          // Append the new item to the start of the context menu
          contextMenu.insertBefore(newItem, contextMenu.firstChild);
      }
  } else {
      console.error('Context menu not found');
  }
}


// Set up the event listener on the map element
function setupContextMenuListener() {
  // Element ID for the map in Google Maps
  const mapElement = document.querySelector('#scene'); 

  if (mapElement) {
      mapElement.addEventListener('contextmenu', function(event) {
          setTimeout(addCustomMenuItem, 500); // Modify the context menu after it appears
      });
  } else {
      console.error('Google Maps element not found.');
  }
}

function extractLatLngFromContextMenu() {
  // Query the specific div that contains the latitude and longitude
  const menuItem = document.querySelector('div[role="menuitemradio"][data-index="0"] .mLuXec');

  if (menuItem) {
      const coordinatesText = menuItem.textContent.trim(); 

      // Split the text by comma and convert the parts to floating-point numbers
      const [lat, lng] = coordinatesText.split(',').map(coord => parseFloat(coord));

      return { lat: lat, lng: lng };
  }

  // If the menu item is not found, log an error and return null
  console.error('Could not extract latitude and longitude from the context menu');
  return null;
}

function extractLatLngFromURL() {
  const url = window.location.href;

   // Use a regular expression to search for the latitude and longitude in the URL
  const latLngMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

  // If the pattern is found in the URL, extract the latitude and longitude
  // Pattern: optimal minus sign followed by one or more digits, a decimal point, and one or more digits
  if (latLngMatch) {
      const lat = parseFloat(latLngMatch[1]);
      const lng = parseFloat(latLngMatch[2]);
      return { lat: lat, lng: lng };
  }

  // If the pattern is not found, log an error message and return null
  console.error('Could not extract latitude and longitude from the URL');
  return null; // Return null if extraction fails
}


// Initialize the listener once the page loads
window.onload = setupContextMenuListener;
