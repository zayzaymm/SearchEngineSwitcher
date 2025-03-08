chrome.storage.local.get(["searchEngine"], (result) => {
   if (!result.searchEngine) {
      chrome.storage.local.set({"searchEngine": "disable"});
   }
});
chrome.tabs.onCreated.addListener((tab) => {
   if (tab.pendingUrl === "chrome://newtab/") {
      chrome.storage.local.get(["searchEngine"],(result) => {
         if (!(result.searchEngine === "disable")) {
            //chrome.tabs.update(tab.id, {"url": result.searchEngine});
            chrome.tabs.create({"url": result.searchEngine});
            chrome.tabs.remove(tab.id);
         }
      });
  }
});

