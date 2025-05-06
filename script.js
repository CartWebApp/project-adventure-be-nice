// Track intro video status
let introVideoPlayed = false;

// Enter fullscreen + play intro video
function enterFullscreen() {
  const elem = document.documentElement;
  const video = document.getElementById('myVideo');

  // Request fullscreen
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(() => alert("Please allow fullscreen to play the game."));
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else {
    alert("Your browser doesn't support fullscreen mode.");
  }

  // Play intro video only once
  if (video && !introVideoPlayed) {
    video.play().catch(err => {
      console.error("Error playing video:", err);
      alert("There was an error playing the intro video.");
    });
    video.volume = 0.5;
    introVideoPlayed = true;
  }

  // Hide fullscreen overlay
  document.getElementById('fullscreenOverlay').style.display = 'none';
}

// Prevent auto-start by pausing/resetting video on load
window.addEventListener('load', () => {
  const video = document.getElementById('myVideo');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
  checkFullscreenStatus();
});

// Check fullscreen status
function checkFullscreenStatus() {
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  const overlay = document.getElementById('fullscreenOverlay');
  overlay.style.display = isFullscreen ? 'none' : 'flex';
}

// Handle fullscreen changes
document.addEventListener('fullscreenchange', () => {
  checkFullscreenStatus();

  const isFullscreen = document.fullscreenElement;
  const video = document.getElementById('myVideo');
  const gameStarted = document.getElementById('game').style.display === 'block';

  if (!isFullscreen && !gameStarted && video) {
    video.pause();
    video.currentTime = 0;
  }
});

// Start game after intro
function startGame() {
  const video = document.getElementById('myVideo');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  // Fade out loading screen
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.classList.add('fade-out');

  setTimeout(() => {
    loadingScreen.style.display = 'none';
    document.getElementById('game').style.display = 'block';
    showScene('start');
  }, 2000);
}

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
    text: "You go back to the police department to research more about the cold case taking on a new personal project in his spare time, perhaps investigating the uprising cold case will help distract yourself from the growing unrest.",
    background: 'url(images/police-dep.png)',
    options: [
      { text: "Investigate the actual crime scene.", next: "crime" },
      { text: "Look through the evidences that they found.", next: "evidence" },
      { text: "Look around the police department and overhear the rumors.", next: "snoop" }
    ]
  },
  therapy: {
    text: "You find your new therapist rather weird thinking the therapist himself needs counseling instead of yourself.",
    background: 'url(images/therapy-room.png)',
    options: [
      { text: "You look deeper into your therapist's background to ease your mind.", next: "research" },
      { text: "You decide therapy is not for you and would like to try another option.", next: "next" },
      { text: "You take time off of work to focus on other things that can make him feel a bit more calm.", next: "walk" }
    ]
  },
  next: {
    text: "Screw everything. You decide to go back to work, you can deal with all the stress and frustrastion",
    background: 'url(images/therapy-room.png)',
    options: [
      { text: "Go back to work.", next: "personal" },
    ]
  },
  
  snoop: {
    text: "As you snoops around you get caught by a fellow android named Harry.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Ignore Harry and continue snooping around for information.", next: "ignore" },
      { text: "Accept help from Harry.", next: "help" }
    ]
  },

  ignore: {
    text: "You're openly hostile toward Harry, questioning whether an android could truly understand the complexities of human emotions and justice.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Refuse help or insight from Harry.", next: "refuse" },
      { text: "Consider Harries help.", next: "consider" }
    ]
  },

  help: {
    text: "You hesitate but ultimately agree to work closely with Harry, trying to understand his perspective despite his reservations about androids.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Become partners with Harry.", next: "partners" },
      { text: "Thank Harry for his help but secretly continue working by yourself.", next: "thank" }
    ]
  },
 

  refuse: {
    text: "As you continue to investigate the crime by yourself, you're forced to confront the truth when you realizes that the murder was committed by a rogue human, not an android. You must decide whether to protect the truth or continue to fight against the growing android rebellion.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "You decide to share your findings with your team.", next: "share" },
      { text: "You secretly investigate the rogue human suspect on your own, avoiding official channels out of fear of being compromised by the system.", next: "yourself" },
      { text: "You turn to Harry for advice on how to handle the situation.", next: "advice" }
    ]
  },

  consider: {
    text: ".",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: ".", next: "refuse" },
      { text: ".", next: "consider" }
    ]
  },

  partners: {
    text: "You're openly hostile toward Harry, questioning whether an android could truly understand the complexities of human emotions and justice.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: ".", next: "refuse" },
      { text: ".", next: "consider" }
    ]
  },
  thank: {
    text: ".",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: ".", next: "refuse" },
      { text: ".", next: "consider" }
    ]
  },

  keepongoin: {
    text: "He makes it home safely and forgets about his discovery.",
    background: 'url(images/living-room.png)',
    options: [
      { text: "He turns on the tv and puts on the news.", next: "tv" },
    ]
  },


  tv: {
    text: "News about the uprising robots start to announce As well as a cold case of a robot vs its owner.",
    background: 'url(images/face-tv.png)',
    options: [
      { text: "Ignore the news and stay away from the case.", next: "away" },
      { text: "Go back to the police department.", next: "personal" },
    ]
  },

  away: {
    text: "He deiced to stay away from the cold case which ended up becoming a war between humans vs robots. He stays out and watches from a far.",
    background: 'url(images/war.png)',
    options: [
      { text: "Next", next: "robotmurder" }
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
  },

  research: {
  text: "You discover your therapist is an android and confront him about it. The android starts to get overwhelm...",
  background: 'url(images/black.png)',
  options: [
    { text: "Next", next: "explosion" }
  ]
},
explosion: {
  background: 'url(images/robot-murder.png)',
  isJumpscare: true
},
anotherEnding: {
  background: 'url(images/another-jumpscare.png)',
  isJumpscare: true
}  
};

function showScene(key) {
  const scene = scenes[key];

  if (!scene) {
    storyEl.textContent = "Scene not found.";
    choicesEl.innerHTML = '';
    return;
  }

  if (scene.isJumpscare) {
    triggerJumpscare(scene.background);
    return;
  }

  storyEl.textContent = scene.text;
  choicesEl.innerHTML = '';

  (scene.options || []).forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option.text;
    btn.className = 'option-button';
    btn.onclick = () => showScene(option.next);
    choicesEl.appendChild(btn);
  });

  document.body.style.backgroundImage = scene.background || 'url(images/default.jpg)';
}

// Trigger jumpscare
function triggerJumpscare(backgroundImage) {
  const overlay = document.getElementById('jumpscareOverlay');
  const img = document.getElementById('jumpscareImage');
  const gameOverText = document.getElementById('gameOverText');
  const restartButton = document.getElementById('restartButton');

  overlay.style.display = 'flex';
  img.style.display = 'none';
  gameOverText.style.display = 'none';
  restartButton.style.display = 'none';

  const imagePath = backgroundImage.replace(/^url\((['"])?(.*?)\1\)$/, '$2');
  img.src = imagePath;

  img.onerror = () => console.error('Jumpscare image failed to load:', backgroundImage);

  setTimeout(() => {
    img.style.display = 'block';

    const screamSound = new Audio('sound/jumpscare.mp3');
    screamSound.volume = 0.1;
    screamSound.play().catch(() => {
      const fallbackSound = new Audio('sound/jumpscare.mp3');
      fallbackSound.volume = 0.5;
      fallbackSound.play();
    });

    setTimeout(() => {
      gameOverText.style.display = 'block';
      restartButton.style.display = 'inline-block';
    }, 500);
  }, 300);

  restartButton.onclick = () => window.location.reload();
}
