chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addLocation",
    title: "Add to A Place Between",
    contexts: ["page"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addLocation") {
    console.log("Location added from", tab.url);
  }
});
