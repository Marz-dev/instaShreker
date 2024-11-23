const timeLeft = document.getElementsByClassName('time-left');
const blockDiv = document.getElementsByClassName('block');
let shrekLarm = null;

//Checking if we need to ask the user for the one-time shrekLarm or
//Just a reminder of our motto.
chrome.storage.local.get(['shrekLarm'], function(result) {
  if (result.shrekLarm) {
    shrekLarm = result.shrekLarm;
    blockDiv[0].style.display = 'none';
    timeLeft[0].style.display = 'block';
  } else {
    blockDiv[0].style.display = 'block';
    timeLeft[0].style.display = 'none';
  }
  updateTimeLeft();
});

document.getElementById('blockButton').addEventListener('click', () => {
  const blockDuration = parseInt(document.getElementById('blockDuration').value) * 60; // Convert minutes to seconds

  const MAX_BLOCK_DURATION = 60 * 60; // Maximum 1 hour (in seconds)

  if (blockDuration > 0 && blockDuration <= MAX_BLOCK_DURATION) {
    alert('Instagram will be blocked for the specified duration.');
    shrekLarm = blockDuration; // Duration in seconds
    chrome.storage.local.set({ shrekLarm: shrekLarm, currentDate: Date.now() });
    updateShrekLarm(shrekLarm);
  } else {
    alert('Please enter a positive value for the block duration within a reasonable range (1 minute to 1 hour).');
  }
});

//Updates the amount of time left before shrek
function updateTimeLeft() {
  chrome.runtime.sendMessage({ type: "getTimeSpent" }, (response) => {
    let timeSpent = response.timeSpent || 0;
    if (shrekLarm && timeSpent !== null) {
      const remainingTime = shrekLarm - timeSpent;

      const timeLeftTxt = timeLeft[0];
      if (remainingTime > 0) {
        timeLeftTxt.textContent = `${Math.floor(remainingTime / 60)} minutes and ${remainingTime % 60} seconds remaining`;
      }
    }
  });
}

//Sending a message to background.js to updateShrekLarm
function updateShrekLarm(newTime) {
  chrome.runtime.sendMessage({ type: "updateShrekLarm", newTime: newTime }, (response) => {
    if (response.success) {
      updateTimeLeft();
    }
  });
}
