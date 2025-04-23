const storyEl = document.getElementById('story');
const choicesEl = document.getElementById('choices');
const startScreenEl = document.getElementById('start-screen');
const gameEl = document.getElementById('game');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
  startScreenEl.style.display = 'none';
  gameEl.style.display = 'block';
  showScene('start');
});


const scenes = {
  start: {
    text: "You wake up in your bed, pitch dark and the bright moon peeking through the windows. You look at your clock which reads 3:00AM and can't seem to get some rest. What should you do?",
    options: [
      { text: "Decide to go for a late night walk at the near park.", next: "walk" },
      { text: "Head to the police department and take on a new personal project.", next: "personal" },
      { text: "Wait untill the morning and seek some help for his mind, Like therapy.", next: "theraphy" }
    ]
  },
  walk: {
    text: "You decide to go for a walk hoping to clear your mind from all the recent activity, while on the other side of town where not many people reside you find an abandoned building in the distance. What should you do?",
    options: [
      { text: "Investigate the abandon building.", next: "investigate" },
      { text: "Keep it in mind and report it later in the day to your peers at work.", next: "report" },
      { text: "Ignore the abandonded building and keep walking.", next: "keepongoin" }
    ]
  },
  personal: {
    text: "You decided to walk into work at 3:00AM, You greet the police rebot Harry who is there to secure the police station. You decide to look into that one growing case going on right now.",
    options: [
      { text: "Go to the crime scene to find anything else that maybe helpful to the police station.", next: "crime" },
      { text: "Go vist the evidence room to look at any evidence that was gathered there at the crime scene.", next: "scene" },
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
    text: "As you snoop around the station looking at all types of things, including evidence and private things about your peers, Harry sneeks up behind you and offers to help look for anything you might be searching for.",
    options: [
      { text: "Brush him off and ignore him.", next: "clearing" },
      { text: "Accept help from Harry and tell him to find.", next: "keepRunning" }
    ]
  },
  keepongoin: {
    text: "You decide to keep on walking along ignoring the abandoned building in the distance.",
    options: [
      { text: "Go to the crime scene to find anything else that maybe helpful to the police station.", next: "crime" },
      { text: "Go vist the evidence room to look at any evidence that was gathered there at the crime scene.", next: "scene" },
      { text: "Snoop around the police station.", next: "scene" }
    ]
  },
//   -----: {
//     text: ".",
//     options: [
//       { text: ".", next: "-----" },
//       { text: ".", next: "-----" },
//       { text: ".", next: "-----" }
//     ]
//   },
};

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

// Start the game
showScene('start');