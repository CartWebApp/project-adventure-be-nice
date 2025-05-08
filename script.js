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
    background: 'url(images/in-car.png)',
    options: [
      { text: "Go back to work.", next: "personal" },
    ]
  },
  crime: {
    text: "As you drive to the crime scene you meet a fellow Android that works with the police department. His name is Harry.",
    background: 'url(images/crime-scene.png)',
    options: [
      { text: "Explore the crime scene by yourself as Harry follows behind and explains the scene.", next: "lead" },
      { text: "Let Harry lead and tell you what he has found so far.", next: "hlead" }
    ]
  },


  lead: {
    text: "You befriend Harry choosing to confide in him about his doubts regarding the system and asking him for more insight into the android perspective.",
    background: 'url(images/crime-scene.png)',
    options: [
      { text: "Learn more about Harry.", next: "more" },
      { text: "Keep harry as a tool and just a tool nothing more.", next: "keep " }
    ]
  },
  hlead: {
    text: "You hesitate but ultimately agree to work closely with Harry, trying to understand his perspective despite his reservations about androids.",
    background: 'url(images/harry-lead.png)',
    options: [
      { text: "Become partners with Harry.", next: "more" },
      { text: "Thank Harry and work by yourself.", next: "keep" }
    ]
  },


  snoop: {
    text: "As you snoop around the station, Harry sneaks up behind you and offers to help search for clues.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Brush him off and ignore him.", next: "brush" },
      { text: "Accept help from Harry and tell him what to find.", next: "hlead" }
    ]
  },

  evidence: {
    text: "As you snoop around the station, Harry sneaks up behind you and offers to help search for clues.",
    background: 'url(images/evid-room.png)',
    options: [
      { text: "Brush him off and ignore him.", next: "brush" },
      { text: "Accept help from Harry and tell him what to find.", next: "hlead" }
    ]
  },

  brush: {
    text: "You are openly hostile toward Harry, questioning whether an android could truly understand the complexities of human emotions and justice.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Refuse help or insight from Harry.", next: "keep" },
      { text: "Consider Harrys' help.", next: "more" }
    ]
  },
 
  keep: {
    text: "As you continue to investigate the crime by yourself, you are forced to confront the truth when you realize that the murder you are investigating was committed by a rogue human, not an android. You must decide whether to protect the truth or continue to fight against the growing android rebellion.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Dexter decides to share his findings with his team, hoping they will back him up, but they dismiss his concerns, leaving him feeling isolated.", next: "haha" },
      { text: "He secretly investigates the rogue human suspect on his own, avoiding official channels out of fear of being compromised by the system.", next: "shh" },
      { text: "Dexter turns to Harry for advice on how to handle the situation, and together they form a plan to expose the truth, despite the risks involved.", next: "intro" }
    ]
  },

  more: {
    text: "As you learn more about Harry and his android point of view you become more open. Though you still have worry over androids. What should you do?",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Become more open towards androids and work with Harry.", next: "intro" },
      { text: "Decide to stay away from Harry for now and work alone.", next: "shh" }
    ]
  },

  shh: {
    text: "Dexter’s loyalty is tested as he is forced to choose between his duty as a detective and his growing understanding of the plight of the androids. He forms an uneasy alliance with Harry though he remains conflicted about the consequences of their actions.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Dexter continues to work alone, taking on the burden of the investigation herself and finding himself more isolated as he starts uncovering deeper truths.", next: "haha" },
      { text: "He finds himself torn between trusting his human allies and forging new alliances with androids who reveal shocking truths.", next: "intro" },
      { text: "Dexter former colleagues begin to suspect him of betraying the human side, making his situation even more precarious.", next: "report" }
    ]
  },

  intro: {
    text: "Harry introduces Dexter to the leader of the rebellions. Dexter faces off against the mastermind behind the conspiracy, confronting his own beliefs about justice and morality.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Dexter chooses to fight for the rebellion, abandoning his role as a law enforcer and embracing his new belief in the cause of android liberation.", next: "fightfr" },
      { text: "He confronts the mastermind and ultimately decides to hand them over to human authorities, choosing to uphold his sense of justice at great personal cost.", next: "handsover" },
      { text: "Dexter sides with neither faction, choosing to take the rebellion down in a way that avoids bloodshed while ensuring neither side gains the upper hand.", next: "backfire" }
    ]
  },

  fightfr: {
    text: "Dexter becomes a key ally in the new world, working to rebuild the system and ensure that androids are treated as equals. He finally finds a sense of purpose, no longer bound by the rigid laws that once defined him.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Dexter decides to become a leader in the new world, actively working to integrate androids into society and promote coexistence.", next: "gov" },
      { text: "He chooses to remain a detective but works tirelessly to reform the legal system from within, seeking to guarantee equality without fully aligning with either side.", next: "remain" }, 
      { text: "Dexter steps away from law enforcement altogether, becoming a mediator between humans and androids, forging a new, balanced future.", next: "awayl" }
    ]
  },
  
  gov: {
    text: "He takes on a government role, becoming a key figure in shaping policies that guarantee equality for androids and humans alike.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Next", next: "robotmurder" }, 
    ]
  },

  remain: {
    text: "Dexter returns to his detective work, but his role has changed. He works to uphold justice in a fractured society, now helping to rebuild the law and order to ensure humans and androids can coexist, despite the growing tension between the two groups.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Dexter returns to the police force, trying to repair the broken system from the inside, but she finds herself constantly at odds with both human and android factions.", next: "know" }, 
      { text: "He becomes a key figure in rebuilding society, advocating for android rights and creating new laws that ensure equality for all, but the struggle remains.", next: "know" }, 
      { text: "Dexter leaves his old life behind and becomes an activist, risking everything to inspire change in a world still divided.", next: "awayl" }
    ]
  },

  awayl: {
    text: "Dexter confronts a former partner who has turned against the androids. He chooses to stop him, leaving behind his old role and embracing a new mission: to seek justice and equality for both humans and androids.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Dexter confronts his former partner and defeats him, but in doing so, he realizes that the cost of peace may be higher than he ever imagined.", next: "gov" }, 
      { text: "Dexter chooses to try to reason with his former partner, believing that even he can be brought to see the truth and change his mind.", next: "gov " }, 
      { text: "He makes the difficult decision to let his former partner win, leaving his role behind and becoming a symbol of the new world, knowing the ultimate battle may not be his to fight", next: "bye" }
    ]
  },

  bye: {
    text: "Dexter leaves the police force entirely and becomes a public voice for justice, using his story to inspire others to see beyond the binary divide between humans and androids.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Next", next: "robotmurder" },
    ]
  },

  know: {
    text: "He brings in the knowledge that true justice isn’t just about following the law but ensuring fairness for both humans and androids. He helps enforce new laws that protect android rights, ensuring that the hard-won peace is upheld. ",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Advocate for Equal Rights", next: "erights" },
      { text: "Strengthen Enforcement", next: "strengthene" }, 
      { text: "Personal Growth and Balance", next: "growth" }
    ]
  },

  erights: {
    text: "He helps shape the universal code of ethics for human-android interactions, and after years of campaigning, it’s passed. The world begins to embrace equality, and he stands hopeful, knowing this is just the beginning.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Next", next: "robotmurder" }, 
    ]
  },

  strengthene: {
    text: "He creates a task force within law enforcement to enforce android protection laws, investigate abuse, and ensure justice. As the team holds offenders accountable, public trust grows, and androids feel safer. His leadership cements his role in the fight for equality and justice.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Next", next: "robotmurder" }, 
    ]
  },

  growth: {
    text: "As he enforces the laws, he questions his own identity and what it truly means to be just in a world shared by humans and androids. The lines blur, and he struggles with whether true justice is possible when both sides see the world so differently. Seeking deeper answers, he realizes that true fairness may require a shift in empathy, not just laws.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Next", next: "robotmurder" }, 
    ]
  },

  handsover: {
    text: "He hands them over and humans win control over robots again.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Next", next: "robotmurder" }, 
    ]
  },
  

  backfire: {
    text: "Plan backfires and ends up causing bloodshed.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Next", next: "robotmurder" }, 
    ]
  },
  
  haha: {
    text: "Dexter faces a moral crossroads as he must decide whether to help the rebellion or stop them. He prepares to take down the leaders of the movement, but a part of you sympathizes with their cause.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Dexter secretly meets with the android rebellion’s leaders to try to understand their motivations and decide if they are right or wrong.", next: "intro" },
      { text: "He plans to sabotage the rebellion, believing that if they succeed, it will lead to chaos and violence, destabilizing everything he holds dear.", next: "sabo" },
      { text: "Dexter tries to make peace by meeting with both the rebellion and human officials, hoping to find common ground and prevent violence.", next: "peace" }
    ]
  },

  peace: {
    text: "He talks to harry to come up with a plan where both sides can agree on.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Next", next: "intro" }, 
    ]
  },

  report: {
    text: "They end up firing him not believing him and finding him sketchy causing him to not be able to anything anymore. He watches from a far.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Next", next: "robotmurder" }, 
    ]
  },

 sabo: {
    text: "He meets up with the police department and discuss the plan to take control on androids again.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Challenge the plan publicly.", next: "challenge" }, 
      { text: "Stay neutral, assess the situation", next: "neutral" }, 
      { text: "Support the plan with conditions", next: "supportp" }, 
    ]
  },

  challenge: {
    text: "He stands up and directly challenges the proposal, arguing that reasserting control over androids could lead to a breakdown in the fragile peace between humans and androids.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Argue that the law should be focused on integration, not control, and propose creating a new system of checks and balances for androids in society.", next: "cplan" }, 
      { text: "Remind the officers of the tragic consequences that happened last time androids were controlled and subjugated, urging them to learn from history.", next: "aplan" }, 
      { text: "Suggest a more diplomatic approach by creating a task force with equal representation of both humans and androids to monitor the transition and ensure justice.", next: "suggb" }, 
    ]
  },

  neutral: {
    text: "He listens to both sides of the debate, taking in all the perspectives before offering his own ideas, trying to find a middle ground that ensures justice for both humans and androids.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Recommend introducing a trial period where androids are closely monitored, but with safeguards in place to prevent abuses.", next: "suggb" }, 
      { text: "Propose a series of community outreach programs to gauge public sentiment on reasserting control, ensuring that the decision is made with human and android input.", next: "aplan" }, 
      { text: "Urge the police department to focus on law enforcement and public safety rather than ideological battles, asking for a focus on pragmatic solutions.", next: "cplan" }, 
    ]
  },

  supportp: {
    text: "He agrees to the need for some form of control over androids but demands safeguards to ensure that android rights are respected. His voice carries weight, and his suggestions could shape the final decision.",
    background: 'url(images/in-police-dep.png)',
    options: [
      { text: "Insist on strict laws that ensure androids have access to due process before any action is taken to restrict their freedoms.", next: "cplan" }, 
      { text: "Advocate for a technological oversight committee to monitor android interactions, ensuring no abuse of power occurs.", next: "aplan" }, 
      { text: "Propose that only androids who pose a clear, demonstrated threat to public safety should face any form of restriction, with the remaining androids being granted full autonomy. ", next: "suggb" }, 
    ]
  },

  cplan: {
    text: "He challenges the plan, creating a heated debate. Some officers are swayed, but others remain firm. The proposal is delayed, and tensions rise, leaving the future of human-android relations uncertain.",
    background: 'url(images/living-room.png)',
    options: [
      { text: "Next", next: "robotmurder" },
    ]
  },

  suggb: {
    text: "He suggests a balanced solution, leading to the creation of community outreach programs. The police agree to delay drastic action, opting for dialogue and a more thoughtful approach to android rights.",
    background: 'url(images/living-room.png)',
    options: [
      { text: "Next", next: "robotmurder" },
    ]
  },

  
  aplan: {
    text: "He agrees to the plan with safeguards, creating an oversight committee to ensure fairness. The new guidelines allow androids to live freely, but under careful monitoring, preserving the peace—though fragile—for now.",
    background: 'url(images/living-room.png)',
    options: [
      { text: "Next", next: "robotmurder" },
    ]
  },

  keepongoin: {
    text: "You continue walking but suddenly stops as you hear mysterious sounds coming from the building.",
    background: 'url(images/living-room.png)',
    options: [
      { text: "You decide to ignore it and go home.", next: "home" },
      {text: "You stop and decide to go back to the abandon building.", next: "investigate"}
    ]
  },

  home: {
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
      { text: "Decide not to go further and leave the building feeling creeped out.", next: "keepongoin" },
      { text: "Get curious and decide to explore the building.", next: "exploreab" },
      { text: "Start freaking out, causing you to trip over robotic parts and land into the pile.", next: "watchyourstep" }
    ]
  },
     
  exploreab: {
    text: "As you explore you hear an old television start to play the news about the uprising robots as well as a cold case of a robot vs its owner.",
    background: 'url(images/a-tv.png)',
    options: [
      { text: "Ignore the news and stay away from the case.", next: "away" },
      { text: "Go back to the police department.", next: "personal" },
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

  // Clear the current content
  storyEl.textContent = '';
  choicesEl.innerHTML = '';

  // Check if this scene is a jumpscare
  if (scene.isJumpscare) {
    triggerJumpscare(scene.background); // Pass image if needed
    return;
  }


  storyEl.textContent = scene.text;

  // Create the choices buttons for the new scene
  scene.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option.text;
    btn.className = 'option-button';
    btn.onclick = () => showScene(option.next);
    choicesEl.appendChild(btn);
  });

  // Update the background for the new scene
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
