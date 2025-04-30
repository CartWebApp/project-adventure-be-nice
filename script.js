// Flag to track if the intro video has been played
let introVideoPlayed = false;

// Enter fullscreen and play intro video
function enterFullscreen() {
  const elem = document.documentElement;
  const video = document.getElementById('myVideo');

  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(err => {
      alert("Please allow fullscreen to play the game.");
    });
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else {
    alert("Your browser doesn't support fullscreen mode.");
  }

  // Play the video only if it hasn't been played yet
  if (video && !introVideoPlayed) {
    video.play().catch(err => {
      console.error("Error playing video:", err);
      alert("There was an error playing the intro video.");
    });
    video.volume = 0.50;
    introVideoPlayed = true;
  }
  

  // Hide the fullscreen overlay when entering fullscreen
  document.getElementById('fullscreenOverlay').style.display = 'none';
}

// Check fullscreen status
function checkFullscreenStatus() {
  const isFullscreen = document.fullscreenElement;
  const overlay = document.getElementById('fullscreenOverlay');
  overlay.style.display = isFullscreen ? 'none' : 'flex';
}

// Handle exiting fullscreen: pause and reset the video
document.addEventListener('fullscreenchange', () => {
  checkFullscreenStatus();

  const isFullscreen = document.fullscreenElement;
  const video = document.getElementById('myVideo');
  const gameStarted = document.getElementById('game').style.display === 'block';

  // If fullscreen is exited and the game hasn't started yet, stop video/audio
  if (!isFullscreen && !gameStarted) {
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  // Show fullscreen prompt if exiting fullscreen
  if (!isFullscreen) {
    const fullscreenOverlay = document.getElementById('fullscreenOverlay');
    fullscreenOverlay.style.display = 'flex';  // Show the fullscreen prompt when leaving fullscreen
  }
});

// Start game function (when user clicks start)
function startGame() {
  const introVideo = document.getElementById('myVideo');
  if (introVideo) {
    introVideo.pause();
    introVideo.currentTime = 0;
  }

  // Apply fade-out effect
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.classList.add('fade-out');

  // Delay hiding the screen after fade-out completes
  setTimeout(() => {
    loadingScreen.style.display = 'none';  // Hide loading screen
    document.getElementById('game').style.display = 'block';  // Show game content
    showScene('start');  // Show initial scene
  }, 2000); // Matches the fade duration (2 seconds)
}

// Run fullscreen check on page load
window.addEventListener('load', checkFullscreenStatus);

// ------------------ GAME LOGIC ------------------ //

const storyEl = document.getElementById('story');
const choicesEl = document.getElementById('choices');

const scenes = {
  start: {
    text: "You wake up in your bed, pitch dark and the bright moon peeking through the windows. You look at your clock which reads 3:00AM and can't seem to get some rest. What do you do?",
    background: 'url(images/dex-bedroom.png)', 
    options: [
      { text: "Decide to go for a late night walk at the nearby park.", next: "walk" },
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
  evidence: {
    text: ".",
    background: 'url(images/evid-room.png)',
    options: [
      { text: "Go to the crime scene.", next: "crime" },
      { text: "Visit the evidence room.", next: "evidence" },
      { text: "Snoop around the station.", next: "scene" }
    ]
  },
  investigate: {
    text: "You decided to go and investigate this abandoned building not knowing what it was. You see 3 entrances and can't decide which one to use to go in.",
    background: 'url(images/abandoned-building.png)',
    options: [
      { text: "Go inside from the right.", next: "insideab" },
      { text: "Head inside through the front door.", next: "insideab" },
      { text: "Try to find a backdoor to enter through.", next: "insideab" }
    ]
  },
  insideab: {
    text: "As you enter the building, you find a pile of robotic parts scattered all around. What will you do?",
    background: 'url(images/inside-ab.png)',
    options: [
      { text: "Decide not to go further and leave the building feeling creeped out.", next: "leavecoward" },
      { text: "Get curious and decide to explore the building.", next: "exploreab" },
      { text: "Start freaking out, causing you to trip over robotic parts and land into the pile.", next: "watchyourstep" }
    ]
  },
  watchyourstep: {
    text: "You trip over robotic parts and land into the pile.",
    background: 'url(images/black.png)',
    options: [
      { text: "Next", next: "robotmurder" }
    ]
  },
  robotmurder: {
    background: 'url(images/robot-murder.png)',
    isJumpscare: true
  },
  anotherEnding: {
    background: 'url(images/another-jumpscare.png)',
    isJumpscare: true
  }  
};


function triggerJumpscare(backgroundImage) {
  const overlay = document.getElementById('jumpscareOverlay');
  const img = document.getElementById('jumpscareImage');
  const gameOverText = document.getElementById('gameOverText');
  const restartButton = document.getElementById('restartButton');

  // Reset overlay
  overlay.style.display = 'flex';
  img.style.display = 'none';
  gameOverText.style.display = 'none';
  restartButton.style.display = 'none';

  // Set the image from the passed backgroundImage
  const imagePath = backgroundImage.replace(/^url\((['"])?(.*?)\1\)$/, '$2');
  img.src = imagePath;

  img.onerror = () => {
    console.error('Jumpscare image failed to load:', backgroundImage);
  };

  const delay = 300; // Delay before showing the jumpscare image and playing sound

  setTimeout(() => {
    img.style.display = 'block';

    // Create the audio object and set the volume
    const screamSound = new Audio('sound/jumpscare.mp3');
    screamSound.volume = 0.1;  // Set volume to 50% (you can adjust this value)

    // Play the audio, ensuring it's loaded and playing correctly
    screamSound.play().catch(err => {
      console.warn('Sound play error:', err);
      // Optional: Provide a fallback sound if primary one fails
      const fallbackSound = new Audio('sound/jumpscare.mp3');
      fallbackSound.volume = .5;  // Same volume for the fallback
      fallbackSound.play();
    });

    // Show game over text and restart button after a brief delay
    setTimeout(() => {
      gameOverText.style.display = 'block';
      restartButton.style.display = 'inline-block';
    }, 500);
  }, delay);

  // When restarting, ensure that fullscreen prompt is visible if not in fullscreen
  restartButton.onclick = () => {
    window.location.reload();
  };
}


// Show scene
function showScene(key) {
  const scene = scenes[key];

  if (!scene) {
    storyEl.textContent = "Scene not found.";
    choicesEl.innerHTML = '';
    return;
  }

  // Check if this scene is a jumpscare
  if (scene.isJumpscare) {
    triggerJumpscare(scene.background); // Pass image if needed
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

  document.body.style.backgroundImage = scene.background || 'url(images/default.jpg)';
}
