// Function to request fullscreen
function enterFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(err => {
      alert("Please allow fullscreen to play the game.");
    });
  } else {
    alert("Your browser doesn't support fullscreen mode.");
  }
}

// Function to check fullscreen status and toggle overlay visibility
function checkFullscreenStatus() {
  if (document.fullscreenElement) {
    document.getElementById('fullscreenOverlay').style.display = 'none'; // Hide overlay when in fullscreen
  } else {
    document.getElementById('fullscreenOverlay').style.display = 'flex'; // Show overlay when exiting fullscreen
    // Do NOT reset the game content, it stays visible
  }
}

// Automatically check fullscreen status on page load and fullscreen change
window.addEventListener('load', checkFullscreenStatus);
document.addEventListener("fullscreenchange", checkFullscreenStatus);


// Start game function (called when user clicks the clickable area)
function startGame() {

  // Hide the loading screen and show the game content
  document.getElementById('loadingScreen').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  showScene('start');
}


// Get references to game elements
const storyEl = document.getElementById('story');
const choicesEl = document.getElementById('choices');

// Game scenes
const scenes = {
  start: {
    text: "You wake up in your bed, pitch dark and the bright moon peeking through the windows. You look at your clock which reads 3:00AM and can't seem to get some rest. What should you do?",
    options: [
      { text: "Decide to go for a late night walk at the near park.", next: "walk" },
      { text: "Head to the police department and take on a new personal project.", next: "personal" },
      { text: "Wait until the morning and seek some help for your mind, like therapy.", next: "therapy" }
    ]
  },
  walk: {
    text: "You decide to go for a walk hoping to clear your mind from all the recent activity. While on the other side of town where not many people reside, you find an abandoned building in the distance. What should you do?",
    options: [
      { text: "Investigate the abandoned building.", next: "investigate" },
      { text: "Keep it in mind and report it later in the day to your peers at work.", next: "report" },
      { text: "Ignore the abandoned building and keep walking.", next: "keepongoin" }
    ]
  },
  personal: {
    text: "You decided to walk into work at 3:00AM. You greet the police robot Harry who is there to secure the police station. You decide to look into that one growing case going on right now.",
    options: [
      { text: "Go to the crime scene to find anything else that may be helpful.", next: "crime" },
      { text: "Visit the evidence room to examine the evidence gathered.", next: "scene" },
      { text: "Snoop around the police station.", next: "scene" }
    ]
  },
  therapy: {
    text: "You call out. Silence... then something howls back.",
    options: [
      { text: "Run", next: "run" },
      { text: "Climb a tree", next: "climb" }
    ]
  },
  scene: {
    text: "As you snoop around the station, Harry sneaks up behind you and offers to help search for clues.",
    options: [
      { text: "Brush him off and ignore him.", next: "clearing" },
      { text: "Accept help from Harry and tell him what to find.", next: "keepRunning" }
    ]
  },
  keepongoin: {
    text: "You decide to keep on walking, ignoring the abandoned building.",
    options: [
      { text: "Go to the crime scene.", next: "crime" },
      { text: "Visit the evidence room.", next: "scene" },
      { text: "Snoop around the station.", next: "scene" }
    ]
  },
  keep: {
    text: ".",
    options: [
      { text: "Go to the crime scene.", next: "crime" },
      { text: "Visit the evidence room.", next: "scene" },
      { text: "Snoop around the station.", next: "scene" }
    ]
  }
};

// Function to show a scene
function showScene(key) {
  const scene = scenes[key];
  storyEl.textContent = scene.text;
  choicesEl.innerHTML = '';
  scene.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option.text;
    btn.className = 'option-button';
    btn.onclick = () => showScene(option.next);
    choicesEl.appendChild(btn);
  });
}
