function enterFullscreen() {
  const elem = document.documentElement;
  const video = document.getElementById('myVideo');

  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(err => {
      alert("Please allow fullscreen to play the game.");
    });
  } else if (elem.webkitRequestFullscreen) { // Safari
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE11
    elem.msRequestFullscreen();
  } else {
    alert("Your browser doesn't support fullscreen mode.");
  }

  if (video) {
    video.play().catch(err => {
      console.error("Error playing video:", err);
    });
  }

  document.getElementById('fullscreenOverlay').style.display = 'none';
}

// Function to check fullscreen status and toggle overlay visibility
function checkFullscreenStatus() {
  if (document.fullscreenElement) {
    document.getElementById('fullscreenOverlay').style.display = 'none';
  } else {
    document.getElementById('fullscreenOverlay').style.display = 'flex';
  }
}

// Automatically check fullscreen status on page load and fullscreen change
window.addEventListener('load', checkFullscreenStatus);
document.addEventListener('fullscreenchange', checkFullscreenStatus);

// Start game function (called when user clicks the clickable area)
function startGame() {
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
    background: 'url(images/dex-bedroom.png)', 
    options: [
      { text: "Decide to go for a late night walk at the near park.", next: "walk" },
      { text: "Head to the police department and take on a new personal project.", next: "personal" },
      { text: "Wait until the morning and seek some help for your mind, like therapy.", next: "therapy" }
    ]
  },
  walk: {
    text: "You decide to go for a walk hoping to clear your mind from all the recent activity. While on the other side of town where not many people reside, you find an abandoned building in the distance. What should you do?",
    background: 'url(images/park.png)',
    options: [
      { text: "Investigate the abandoned building.", next: "investigate" },
      { text: "Keep it in mind and report it later in the day to your peers at work.", next: "report" },
      { text: "Ignore the abandoned building and keep walking.", next: "keepongoin" }
    ]
  },
  personal: {
    text: "You decided to walk into work at 3:00AM. You greet the police robot Harry who is there to secure the police station. You decide to look into that one growing case going on right now.",
    background: 'url(images/police-dep.png)',
    options: [
      { text: "Go to the crime scene to find anything else that may be helpful.", next: "crime" },
      { text: "Visit the evidence room to examine the evidence gathered.", next: "evidence" },
      { text: "Snoop around the police station.", next: "snoop" }
    ]
  },
  therapy: {
    text: "You call out. Silence... then something howls back.",
    background: 'url(images/therapy-room.png)',
    options: [
      { text: "Run", next: "keep" },
      { text: "Climb a tree", next: "climb" }
    ]
  },
  snoop: {
    text: "As you snoop around the station, Harry sneaks up behind you and offers to help search for clues.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Brush him off and ignore him.", next: "clearing" },
      { text: "Accept help from Harry and tell him what to find.", next: "keepRunning" }
    ]
  },
  keepongoin: {
    text: "You decide to keep on walking, ignoring the abandoned building.",
    background: 'url(images/park.png)',
    options: [
      { text: "Go to the crime scene.", next: "crime" },
      { text: "Visit the evidence room.", next: "evidence" },
      { text: "Snoop around the station.", next: "snoop" }
    ]
  },
  keep: {
    text: ".",
    background: 'url(images/background7.jpg)',
    options: [
      { text: "Go to the crime scene.", next: "crime" },
      { text: "Visit the evidence room.", next: "evidence" },
      { text: "Snoop around the station.", next: "scene" }
    ]
  }
};

// Function to show a scene
function showScene(key) {
  const scene = scenes[key];
  if (!scene) {
    storyEl.textContent = "Scene not found.";
    choicesEl.innerHTML = '';
    return;
  }
  storyEl.textContent = scene.text;
  choicesEl.innerHTML = '';

  scene.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option.text;
    btn.className = 'option-button';
    btn.onclick = () => showScene(option.next);
    choicesEl.appendChild(btn);
  });

  // Change the background image for this scene
  if (scene.background) {
    document.body.style.backgroundImage = scene.background;
  } else {
    document.body.style.backgroundImage = 'url(images/default.jpg)'; // optional: fallback background
  }
}
