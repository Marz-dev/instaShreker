//Before beginning my God forbidden code,
// I'd like to apologise for the horrors you may encounter

//P.S:The timer is Supposed to be as the way it is,
//In fact i went extra mile just so it could not be reset.

let startTime = null;

chrome.runtime.onInstalled.addListener(() => {
  //Iam Tired of naming things..
  dailyCheckUp();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getTimeSpent") {
    chrome.storage.local.get(['timeSpent'], (result) => {
      updateUsage();
      sendResponse({ timeSpent: result.timeSpent });
    });
    return true; // Keeps the message channel open for sendResponse
  } else if (request.type === "updateShrekLarm") {
    chrome.storage.local.set({ shrekLarm: request.newTime}, () => {
      updateUsage();
      sendResponse({ success: true });
    });
    return true;
  } else if(request.type === "quotaOver"){
    chrome.storage.local.get(['timeSpent', 'shrekLarm', 'currentDate'], function(result) {
      //It's Intentional, Don't worry.
      const pervDate = new Date(result.currentDate);

      //I HAVE A FREE WILL! 
      sendResponse({ quoteOver: !dailyTimerReset(pervDate) && result.shrekLarm && result.shrekLarm == result.timeSpent});
    });
  }
});

// This function tracks tabs? Wow! It tracks!
function startTracking(tab) {
  if (tab.url.includes("instagram.com")) {
    startTime = Date.now();
  } else {
    updateUsage();
    startTime = null;
  }
}

//It don't track
//The startTime is set to null just to avoid counting in some buggy crashes or so
// And I lost track of what i was doing..
function stopTracking() {
  updateUsage();
  startTime = null;
}

//Yea, so this is quite Self-explainatory,
//But here let me jack-off some of my thought processes that went into it.
function updateUsage() {
  chrome.storage.local.get(['timeSpent', 'currentDate', 'shrekLarm'], function(result) {
    //So, the new Date func is not really needed if i just tweak the dailyTimerReset
    //But, I'm kinda lazy so, if you find fit, you can try tweaking.
    const prevDate = new Date(result.currentDate);

    //Yes, The dailyTimerReset is very unIntuitive but trust me,
    //I'm in the same page as you, 
    //You can rename it to "checkQuotaWRT" or whatever seems fit.
    if (result.shrekLarm && dailyTimerReset(prevDate)) {
      shrekTime();
      return;
    }

    if (!dailyTimerReset(prevDate) && startTime) {
      const currentTime = Date.now();
      //So, since we need to count seconds wise, 
      //Here we just convert the milliseconds to secs
      const timeSpent = Math.round((currentTime - startTime) / 1000);

      if (result.shrekLarm) {
        const totalTime = (result.timeSpent || 0) + timeSpent;
        
        const TIME_LIMIT = result.shrekLarm;

        if (totalTime >= TIME_LIMIT) {
          //Saving the lime as timespent as it tends to overshoot,
          //Because of obvious reasons.
          chrome.storage.local.set({timeSpent: TIME_LIMIT});
          shrekTime();
        } else {
          chrome.storage.local.set({ timeSpent: totalTime });
        }
      }
    }
  });
}


//The functions under here runs when the chrome tab finishes loading.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    //This is to check the quota
    dailyCheckUp();
    //This is as stated before for updating timeSpent and the Screen
    updateUsage();
    //This starts tracking if the tab is instagram or not.
    startTracking(tab);
  }
});

//If the now active Tab is Instagram it starts tracking
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    startTracking(tab);
  });
});

//To update the timeSpent and set the startTime to Null
chrome.tabs.onRemoved.addListener(() => {
  stopTracking();
});

//Checking and updating time in regular intervals of 1 min
chrome.alarms.create({ periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(() => {
  dailyCheckUp();
  updateUsage();
});


//This is the dailyTimer or Quota reset Checking function
//It returns false if the "prevDate" is in the same date as today
//otherwise it returns false
function dailyTimerReset(prevDate) {
  const today = new Date();
  prevDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffInMs = today - prevDate;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays !== 0;
}

//ShrekTime baby!!! Convert all tabs of insta to shrek!!
function shrekTime() {
  chrome.tabs.query({ url: "*://www.instagram.com/*" }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("shrek/shrek.html") });
    });
  });
}

//Check if quota is over and if we need to reset quota
function dailyCheckUp() {
  chrome.storage.local.get(['shrekLarm', 'currentDate'], function(result) {
    if (!result.shrekLarm) {
      chrome.storage.local.set({ timeSpent: 0, shrekLarm: null, currentDate: Date.now() });
    } else {
      const prevDate = new Date(result.currentDate);
      if (dailyTimerReset(prevDate)) {
        chrome.storage.local.set({ timeSpent: 0, currentDate: Date.now() });
      }
    }
  });
}