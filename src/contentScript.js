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
  const mapElement = document.querySelector('#scene'); // This is usually the element ID for the map in Google Maps

  if (mapElement) {
      mapElement.addEventListener('contextmenu', function(event) {
          console.log('Right-click event detected.');
          setTimeout(addCustomMenuItem, 500); // Modify the context menu after it appears
      });
  } else {
      console.error('Google Maps element not found.');
  }
}

// Initialize the listener once the page loads
window.onload = setupContextMenuListener;
