const sendMessageToContentScript = (tabId, url) => {
  //every youtube video that is playing has /watch in it
  if (url && url.includes("youtube.com/watch")) {

     //after ? the value in url is unique
    const queryParameters = url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

     //for bookmarking a new video
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
       //watch?v= after = all the value will be grabbed
      videoId: urlParameters.get("v"),
    });
  }}
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      sendMessageToContentScript(tabId, tab.url);
    }
  });
  
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      sendMessageToContentScript(activeInfo.tabId, tab.url);
    });
  });