/* =========================================
   SISTEROS — MAIN APPLICATION
========================================= */


/* =========================================
   BOOT SYSTEM
========================================= */

const bootScreen = document.getElementById("boot-screen");
const desktop = document.getElementById("desktop");
const bootProgress = document.getElementById("boot-progress");
const bootStatus = document.getElementById("boot-status");


const bootMessages = [
    "Initializing SisterOS...",
    "Loading Mahi.exe...",
    "Checking Chulbuli module...",
    "Loading Fearless Mode...",
    "Detecting Shinchan dependency...",
    "Installing Birthday Mode...",
    "System ready."
];


let progress = 0;
let messageIndex = 0;


const bootInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 12) + 7;

    if (progress > 100) {
        progress = 100;
    }

    bootProgress.style.width = `${progress}%`;


    if (
        messageIndex < bootMessages.length &&
        progress >=
            ((messageIndex + 1) / bootMessages.length) * 100
    ) {

        bootStatus.textContent =
            bootMessages[messageIndex];

        messageIndex++;

    }


    if (progress >= 100) {

        clearInterval(bootInterval);

        setTimeout(() => {

            bootScreen.classList.add("hidden");

            desktop.classList.add("visible");

        }, 700);

    }

}, 350);


/* =========================================
   CLOCK
========================================= */

const clockElement =
    document.getElementById("clock");

const dateElement =
    document.getElementById("date");


function updateClock() {

    const now = new Date();


    const time = now.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );


    const date = now.toLocaleDateString(
        [],
        {
            day: "2-digit",
            month: "short"
        }
    );


    clockElement.textContent = time;

    dateElement.textContent = date;

}


updateClock();

setInterval(updateClock, 1000);


/* =========================================
   WINDOWS
========================================= */

const desktopIcons =
    document.querySelectorAll(".desktop-icon");

const windows =
    document.querySelectorAll(".app-window");

const closeButtons =
    document.querySelectorAll(".window-close");


function closeAllWindows() {

    windows.forEach(windowElement => {

        windowElement.classList.remove("active");

    });

}


function openWindow(windowId) {

    closeAllWindows();


    const targetWindow =
        document.getElementById(windowId);


    if (!targetWindow) {
        return;
    }


    targetWindow.classList.add("active");

}


desktopIcons.forEach(icon => {

    icon.addEventListener("click", () => {

        const windowId =
            icon.dataset.window;

        openWindow(windowId);

    });

});


closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const window =
            button.closest(".app-window");

        window.classList.remove("active");

    });

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeAllWindows();

        startMenu.classList.remove("active");

    }

});


/* =========================================
   START MENU
========================================= */

const startButton =
    document.getElementById("start-button");

const startMenu =
    document.getElementById("start-menu");


startButton.addEventListener("click", event => {

    event.stopPropagation();

    startMenu.classList.toggle("active");

});


document.addEventListener("click", event => {

    if (
        !startMenu.contains(event.target) &&
        event.target !== startButton
    ) {

        startMenu.classList.remove("active");

    }

});


/* =========================================
   MUSIC BUTTON
========================================= */

const musicButton =
    document.getElementById("music-button");


let musicEnabled = false;


musicButton.addEventListener("click", () => {

    musicEnabled = !musicEnabled;


    musicButton.textContent =
        musicEnabled ? "🔊" : "🔇";


    /*
     * Actual birthday music will be
     * connected in Phase 3.
     */

});


/* =========================================
   INITIALIZATION
========================================= */

console.log(
    "SisterOS initialized successfully."
);

console.log(
    "Welcome, Piku ❤️"
);

/* =========================================
   PHASE 2 — SISTER AI
========================================= */

const aiQuestions = [

    {
        question:
            "Someone insults your brother. What do you do?",

        options: [
            "Ignore them.",
            "Ask what happened.",
            "Defend him immediately.",
            "First ask who gave them permission."
        ]
    },

    {
        question:
            "Someone gives you a beautifully wrapped gift. Your reaction?",

        options: [
            "Thank them politely.",
            "Open it immediately.",
            "Get more excited about the gift than the occasion.",
            "Start planning the gift I'll give them back."
        ]
    },

    {
        question:
            "It's Sunday morning. Household work is waiting.",

        options: [
            "Let's finish it.",
            "Maybe after breakfast.",
            "I'll do it... eventually.",
            "System unavailable. Try again later."
        ]
    },

    {
        question:
            "Someone says you should stop watching cartoons.",

        options: [
            "Fair enough.",
            "Depends on the cartoon.",
            "Absolutely not.",
            "Shinchan is a lifestyle."
        ]
    },

    {
        question:
            "Mom starts another marriage discussion.",

        options: [
            "Listen quietly.",
            "Change the topic.",
            "Laugh it off.",
            "Initiate emergency escape protocol."
        ]
    }

];


let currentQuestion = 0;


const questionNumber =
    document.getElementById("question-number");

const questionText =
    document.getElementById("question-text");

const aiOptions =
    document.getElementById("ai-options");

const aiProgressBar =
    document.getElementById("ai-progress-bar");

const aiQuestionArea =
    document.getElementById("ai-question-area");

const aiResult =
    document.getElementById("ai-result");

const aiRestart =
    document.getElementById("ai-restart");


function renderAIQuestion() {

    const question =
        aiQuestions[currentQuestion];


    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${aiQuestions.length}`;


    questionText.textContent =
        question.question;


    aiOptions.innerHTML = "";


    question.options.forEach(option => {

        const button =
            document.createElement("button");


        button.className =
            "ai-option";


        button.textContent =
            option;


        button.addEventListener(
            "click",
            nextAIQuestion
        );


        aiOptions.appendChild(button);

    });


    const progress =
        ((currentQuestion + 1) /
        aiQuestions.length) * 100;


    aiProgressBar.style.width =
        `${progress}%`;

}


function nextAIQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        aiQuestions.length
    ) {

        showAIResult();

        return;

    }


    renderAIQuestion();

}


function showAIResult() {

    aiQuestionArea.style.display =
        "none";

    aiResult.classList.remove("hidden");

}


function restartAI() {

    currentQuestion = 0;

    aiQuestionArea.style.display =
        "block";

    aiResult.classList.add("hidden");

    renderAIQuestion();

}


aiRestart.addEventListener(
    "click",
    restartAI
);


renderAIQuestion();

/* =========================================================
   PHASE 3 — GIFT BOX
   ========================================================= */

const openGiftBtn = document.getElementById("open-gift-btn");
const giftContainer = document.getElementById("gift-container");
const giftMessage = document.getElementById("gift-message");

if (openGiftBtn) {

    openGiftBtn.addEventListener("click", () => {

        // Prevent opening multiple times
        openGiftBtn.disabled = true;
        playSound(giftSound);

        // Open gift animation
        giftContainer.classList.add("gift-open");

        // Small delay before revealing message
        setTimeout(() => {

            giftMessage.classList.remove("hidden");

            openGiftBtn.style.display = "none";

            launchConfetti();

        }, 700);

    });

}


/* =========================================================
   CONFETTI ENGINE
   ========================================================= */

function launchConfetti() {

    const confettiCount = 90;

    for (let i = 0; i < confettiCount; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.animationDelay =
            Math.random() * 0.5 + "s";

        confetti.style.animationDuration =
            (2 + Math.random() * 2) + "s";

        confetti.style.setProperty(
            "--random-x",
            Math.random()
        );

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4500);
    }
}

/* =========================================================
   PHASE 3 — BIRTHDAY GAME
   ========================================================= */

const startGameBtn =
    document.getElementById("start-game-btn");

const restartGameBtn =
    document.getElementById("restart-game-btn");

const gameIntro =
    document.getElementById("game-intro");

const gameArea =
    document.getElementById("game-area");

const gameResult =
    document.getElementById("game-result");

const gameBoard =
    document.getElementById("game-board");

const gamePlayer =
    document.getElementById("game-player");

const gameScore =
    document.getElementById("game-score");

const gameTime =
    document.getElementById("game-time");

const finalScore =
    document.getElementById("final-score");

const resultEmoji =
    document.getElementById("result-emoji");

const resultTitle =
    document.getElementById("result-title");

const resultMessage =
    document.getElementById("result-message");


let score = 0;
let timeLeft = 30;

let gameTimer = null;
let heartSpawner = null;

let playerPosition = 50;

let gameRunning = false;


/* -------------------------
   START GAME
   ------------------------- */

function startBirthdayGame() {

    score = 0;
    timeLeft = 30;

    playerPosition = 50;

    gameRunning = true;

    gameIntro.classList.add("hidden");

    gameResult.classList.add("hidden");

    gameArea.classList.remove("hidden");

    gameScore.textContent = score;
    gameTime.textContent = timeLeft;

    gamePlayer.style.left =
        playerPosition + "%";


    clearExistingHearts();


    gameTimer = setInterval(() => {

        timeLeft--;

        gameTime.textContent =
            timeLeft;

        if (timeLeft <= 0) {

            endBirthdayGame();

        }

    }, 1000);


    heartSpawner = setInterval(
        spawnHeart,
        700
    );

}


/* -------------------------
   SPAWN HEART
   ------------------------- */

function spawnHeart() {

    if (!gameRunning) {
        return;
    }

    const heart =
        document.createElement("div");

    heart.className =
        "falling-heart";

    heart.textContent =
        Math.random() > 0.2
            ? "❤️"
            : "💖";


    const boardWidth =
        gameBoard.clientWidth;

    const randomX =
        Math.random() *
        (boardWidth - 35);


    heart.style.left =
        randomX + "px";


    const fallDuration =
        2.2 +
        Math.random() * 1.3;


    heart.style.animationDuration =
        fallDuration + "s";


    gameBoard.appendChild(heart);


    const collisionCheck =
        setInterval(() => {

            if (!gameRunning) {

                clearInterval(
                    collisionCheck
                );

                return;
            }


            const heartRect =
                heart.getBoundingClientRect();

            const playerRect =
                gamePlayer.getBoundingClientRect();


            if (
                heartRect.bottom >=
                    playerRect.top + 5 &&

                heartRect.left <
                    playerRect.right &&

                heartRect.right >
                    playerRect.left &&

                heartRect.top <
                    playerRect.bottom
            ) {

                collectHeart(
                    heart,
                    collisionCheck
                );

            }


        }, 30);


    setTimeout(() => {

        clearInterval(
            collisionCheck
        );

        heart.remove();

    }, (fallDuration + 0.5) * 1000);

}


/* -------------------------
   COLLECT HEART
   ------------------------- */

function collectHeart(
    heart,
    collisionCheck
) {

    clearInterval(
        collisionCheck
    );

    if (!heart.parentNode) {
        return;
    }

    heart.remove();
    playSound(heartSound);

    score += 10;

    gameScore.textContent =
        score;


    if (score >= 100) {

        endBirthdayGame(true);

    }

}


/* -------------------------
   MOVE PLAYER
   ------------------------- */

function movePlayer(direction) {

    if (!gameRunning) {
        return;
    }

    playerPosition +=
        direction * 5;

    playerPosition =
        Math.max(
            7,
            Math.min(
                93,
                playerPosition
            )
        );


    gamePlayer.style.left =
        playerPosition + "%";
}


/* -------------------------
   KEYBOARD
   ------------------------- */

document.addEventListener(
    "keydown",
    (event) => {

        if (!gameRunning) {
            return;
        }

        if (
            event.key === "ArrowLeft"
        ) {

            event.preventDefault();

            movePlayer(-1);

        }

        if (
            event.key === "ArrowRight"
        ) {

            event.preventDefault();

            movePlayer(1);

        }

    }
);


/* -------------------------
   TOUCH / MOUSE
   ------------------------- */

gameBoard.addEventListener(
    "pointermove",
    (event) => {

        if (!gameRunning) {
            return;
        }

        const rect =
            gameBoard.getBoundingClientRect();

        const position =
            (
                (event.clientX - rect.left)
                /
                rect.width
            ) * 100;


        playerPosition =
            Math.max(
                7,
                Math.min(
                    93,
                    position
                )
            );


        gamePlayer.style.left =
            playerPosition + "%";

    }
);


/* -------------------------
   END GAME
   ------------------------- */

function endBirthdayGame(
    won = false
) {

    if (!gameRunning) {
        return;
    }

    gameRunning = false;

    clearInterval(gameTimer);
    clearInterval(heartSpawner);

    clearExistingHearts();


    gameArea.classList.add("hidden");

    gameResult.classList.remove("hidden");

    finalScore.textContent =
        score;


    if (won) {

        resultEmoji.textContent =
            "🎉";

        resultTitle.textContent =
            "YOU DID IT, PIKU! ❤️";

        resultMessage.textContent =
            "You collected 100 points of pure sibling love. Mission accomplished!";

        launchConfetti();

        setTimeout(() => {

            activateBirthdayMode();

        }, 1200);

    } else {

        resultEmoji.textContent =
            "🥹";

        resultTitle.textContent =
            "Almost There!";

        resultMessage.textContent =
            "Looks like the hearts were a little faster this time. Try again, Piku!";

    }

}


/* -------------------------
   CLEAR HEARTS
   ------------------------- */

function clearExistingHearts() {

    document
        .querySelectorAll(".falling-heart")
        .forEach(
            heart => heart.remove()
        );
}


/* -------------------------
   BUTTONS
   ------------------------- */

if (startGameBtn) {

    startGameBtn.addEventListener(
        "click",
        startBirthdayGame
    );

}

if (restartGameBtn) {

    restartGameBtn.addEventListener(
        "click",
        startBirthdayGame
    );

}

/* =========================================================
   PHASE 3 — BIRTHDAY MODE
   ========================================================= */

const celebrationOverlay =
    document.getElementById(
        "celebration-overlay"
    );

const closeCelebration =
    document.getElementById(
        "close-celebration"
    );


function activateBirthdayMode() {

    if (!celebrationOverlay) {
        return;
    }

    playSound(celebrationSound);

    celebrationOverlay.classList.add(
        "active"
    );

    launchConfetti();

    // Second wave
    setTimeout(() => {
        launchConfetti();
    }, 900);

    // Third wave
    setTimeout(() => {
        launchConfetti();
    }, 1800);
}


function closeBirthdayMode() {

    if (!celebrationOverlay) {
        return;
    }

    celebrationOverlay.classList.remove(
        "active"
    );

}


/* Close button */

if (closeCelebration) {

    closeCelebration.addEventListener(
        "click",
        closeBirthdayMode
    );

}


/* ESC also closes celebration */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            celebrationOverlay &&
            celebrationOverlay.classList.contains(
                "active"
            )
        ) {

            closeBirthdayMode();

        }

    }
);

/* =========================================================
   SECRET EASTER EGG
   ========================================================= */

let birthdayKeySequence = "";

document.addEventListener(
    "keydown",
    (event) => {

        birthdayKeySequence +=
            event.key.toLowerCase();

        birthdayKeySequence =
            birthdayKeySequence.slice(-6);

        if (
            birthdayKeySequence ===
            "piku08"
        ) {

            birthdayKeySequence = "";

            activateBirthdayMode();

        }

    }
);

/* =========================================================
   PHASE 3 — AUDIO SYSTEM
   ========================================================= */

const bgMusic =
    document.getElementById("bg-music");

const clickSound =
    document.getElementById("click-sound");

const giftSound =
    document.getElementById("gift-sound");

const heartSound =
    document.getElementById("heart-sound");

const celebrationSound =
    document.getElementById("celebration-sound");


let musicPlaying = false;

const MUSIC_VOLUME = 0.35;
const EFFECT_VOLUME = 0.45;


/* -------------------------
   AUDIO INITIALIZATION
   ------------------------- */

if (bgMusic) {
    bgMusic.volume = MUSIC_VOLUME;
}

if (clickSound) {
    clickSound.volume = EFFECT_VOLUME;
}

if (giftSound) {
    giftSound.volume = EFFECT_VOLUME;
}

if (heartSound) {
    heartSound.volume = EFFECT_VOLUME;

}

if (celebrationSound) {
    celebrationSound.volume = 0.6;
}


/* -------------------------
   PLAY SOUND
   ------------------------- */

function playSound(audio) {

    if (!audio) {
        return;
    }

    audio.currentTime = 0;

    audio.play().catch(() => {
        // Browser blocked playback.
        // Nothing to do — user interaction
        // will allow playback later.
    });

}


/* -------------------------
   BACKGROUND MUSIC
   ------------------------- */

async function toggleMusic() {

    if (!bgMusic) {
        return;
    }

    try {

        if (musicPlaying) {

            bgMusic.pause();

            musicPlaying = false;

        } else {

            await bgMusic.play();

            musicPlaying = true;

        }

        updateMusicButton();

    } catch (error) {

        console.log(
            "Music playback waiting for user interaction."
        );

    }

}


/* -------------------------
   UPDATE MUSIC BUTTON
   ------------------------- */

function updateMusicButton() {

    if (!musicButton) {
        return;
    }

    if (musicPlaying) {

        musicButton.textContent =
            "🔊";

        musicButton.title =
            "Turn music off";

    } else {

        musicButton.textContent =
            "🔇";

        musicButton.title =
            "Turn music on";

    }

}


/* -------------------------
   MUSIC BUTTON
   ------------------------- */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        () => {

            toggleMusic();

            playSound(clickSound);

        }
    );

}


/* -------------------------
   UI CLICK SOUND
   ------------------------- */

document.addEventListener(
    "click",
    (event) => {

        const interactive =
            event.target.closest(
                "button, .desktop-icon, .start-button"
            );

        if (!interactive) {
            return;
        }

        // Don't play generic click on
        // special sound buttons.
        if (
            interactive === musicButton ||
            interactive.id === "open-gift-btn" ||
            interactive.id === "start-game-btn" ||
            interactive.id === "restart-game-btn"
        ) {
            return;
        }

        playSound(clickSound);

    }
);

/* =========================================================
   START MUSIC AFTER FIRST USER INTERACTION
   ========================================================= */

let firstInteractionHandled = false;

document.addEventListener(
    "pointerdown",
    () => {

        if (firstInteractionHandled) {
            return;
        }

        firstInteractionHandled = true;

        if (
            bgMusic &&
            !musicPlaying
        ) {

            bgMusic.play()
                .then(() => {

                    musicPlaying = true;

                    updateMusicButton();

                })
                .catch(() => {

                    // User can manually enable music.

                });

        }

    },
    { once: true }
);

/* =========================================================
   MAHI'S UNIVERSE — MEMORY SYSTEM
   ========================================================= */

const memories = [

    {
        title: "The Chaos Begins",
        message:
            "Every great story needs a little chaos. Ours just happened to come with a chulbuli little sister. ❤️",
        image: "assets/images/memory-1.jpg"
    },

    {
        title: "Partners in Crime",
        message:
            "Different personalities. Same family. Unlimited opportunities to annoy each other. 😂",
        image: "assets/images/memory-2.jpg"
    },

    {
        title: "The Good Times",
        message:
            "Some moments don't look special when they happen. Later, they become the memories you never want to lose.",
        image: "assets/images/memory-3.jpg"
    },

    {
        title: "Piku Being Piku",
        message:
            "Fearless. Outspoken. Slightly impossible. Completely irreplaceable. That's you. ❤️",
        image: "assets/images/memory-4.jpg"
    },

    {
        title: "Always Family",
        message:
            "We may fight, tease, irritate and blame each other for everything... but I'll always have your back.",
        image: "assets/images/memory-5.jpg"
    },

    {
        title: "One More Memory",
        message:
            "And hopefully, this universe keeps expanding with hundreds of crazy memories still waiting to happen. 🌌",
        image: "assets/images/memory-6.jpg"
    }

];


let currentMemory = 0;


const memoryImage =
    document.getElementById("memory-image");

const memoryPlaceholder =
    document.getElementById("memory-placeholder");

const memoryTitle =
    document.getElementById("memory-title");

const memoryMessage =
    document.getElementById("memory-message");

const memoryNumber =
    document.getElementById("memory-number");

const memoryCard =
    document.querySelector(".memory-card");

const memoryPrev =
    document.getElementById("memory-prev");

const memoryNext =
    document.getElementById("memory-next");

const memoryDots =
    document.querySelectorAll(".memory-dot");


function showMemory(index) {

    if (!memories.length) {
        return;
    }


    /*
     * Keep index inside the memory range.
     */

    if (index < 0) {
        index = memories.length - 1;
    }

    if (index >= memories.length) {
        index = 0;
    }


    currentMemory = index;

    const memory =
        memories[currentMemory];


    /*
     * Trigger card animation.
     */

    if (memoryCard) {

        memoryCard.classList.remove(
            "memory-changing"
        );

        void memoryCard.offsetWidth;

        memoryCard.classList.add(
            "memory-changing"
        );

    }


    /*
     * Update text.
     */

    if (memoryTitle) {
        memoryTitle.textContent =
            memory.title;
    }

    if (memoryMessage) {
        memoryMessage.textContent =
            memory.message;
    }

    if (memoryNumber) {

        const number =
            String(currentMemory + 1)
                .padStart(2, "0");

        const total =
            String(memories.length)
                .padStart(2, "0");

        memoryNumber.textContent =
            `MEMORY ${number} / ${total}`;
    }


    /*
     * Update image.
     */

    if (memoryImage) {

        memoryImage.src =
            memory.image;

        memoryImage.style.display =
            "block";

        memoryImage.onerror = () => {

            memoryImage.style.display =
                "none";

            if (memoryPlaceholder) {

                memoryPlaceholder.classList.remove(
                    "hidden"
                );

            }

        };

        memoryImage.onload = () => {

            memoryImage.style.display =
                "block";

            if (memoryPlaceholder) {

                memoryPlaceholder.classList.add(
                    "hidden"
                );

            }

        };

    }


    /*
     * Update dots.
     */

    memoryDots.forEach(
        (dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentMemory
            );

        }
    );

}


/* ---------------------------------------------------------
   PREVIOUS
   --------------------------------------------------------- */

if (memoryPrev) {

    memoryPrev.addEventListener(
        "click",
        () => {

            showMemory(
                currentMemory - 1
            );

        }
    );

}


/* ---------------------------------------------------------
   NEXT
   --------------------------------------------------------- */

if (memoryNext) {

    memoryNext.addEventListener(
        "click",
        () => {

            showMemory(
                currentMemory + 1
            );

        }
    );

}


/* ---------------------------------------------------------
   DOT NAVIGATION
   --------------------------------------------------------- */

memoryDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showMemory(index);

            }
        );

    }
);


/* ---------------------------------------------------------
   KEYBOARD NAVIGATION
   --------------------------------------------------------- */

document.addEventListener(
    "keydown",
    (event) => {

        const universeWindow =
            document.getElementById(
                "universe-window"
            );

        if (
            !universeWindow ||
            !universeWindow.classList.contains("active")
        ) {
            return;
        }


        if (event.key === "ArrowLeft") {

            showMemory(
                currentMemory - 1
            );

        }

        if (event.key === "ArrowRight") {

            showMemory(
                currentMemory + 1
            );

        }

    }
);


/* ---------------------------------------------------------
   INITIALIZE
   --------------------------------------------------------- */

showMemory(0);


/* =========================================================
   SECRET FOLDER SYSTEM
   ========================================================= */

const secretLockScreen =
    document.getElementById("secret-lock-screen");

const secretScanScreen =
    document.getElementById("secret-scan-screen");

const secretUnlocked =
    document.getElementById("secret-unlocked");

const secretFinal =
    document.getElementById("secret-final");

const secretPassword =
    document.getElementById("secret-password");

const secretUnlockBtn =
    document.getElementById("secret-unlock-btn");

const secretError =
    document.getElementById("secret-error");

const scanProgressBar =
    document.getElementById("scan-progress-bar");

const scanStatus =
    document.getElementById("scan-status");

const secretFinalBtn =
    document.getElementById("secret-final-btn");

const secretCelebrateBtn =
    document.getElementById("secret-celebrate-btn");


/* ---------------------------------------------------------
   SECRET CODE
   --------------------------------------------------------- */

/*
 * Change this if you want a different password.
 */

const SECRET_CODE = "piku";


/* ---------------------------------------------------------
   UNLOCK
   --------------------------------------------------------- */

function attemptSecretUnlock() {

    if (!secretPassword) {
        return;
    }

    const enteredCode =
        secretPassword.value
            .trim()
            .toLowerCase();


    if (enteredCode !== SECRET_CODE) {

        if (secretError) {

            secretError.classList.remove("show");

            void secretError.offsetWidth;

            secretError.classList.add("show");

        }

        if (typeof playEffect === "function") {
            playEffect(clickSound);
        }

        secretPassword.select();

        return;
    }


    /*
     * Correct password.
     */

    if (secretError) {
        secretError.classList.remove("show");
    }

    if (typeof playImportantEffect === "function") {
        playImportantEffect(
            giftSound,
            1200
        );
    }

    startSecretScan();
}


/* ---------------------------------------------------------
   SECURITY SCAN
   --------------------------------------------------------- */

function startSecretScan() {

    if (!secretLockScreen ||
        !secretScanScreen) {
        return;
    }


    secretLockScreen.style.display =
        "none";

    secretScanScreen.style.display =
        "block";


    let progress = 0;


    const scanMessages = [
        "Connecting to SisterOS security...",
        "Scanning identity...",
        "Checking Piku credentials...",
        "Verifying sibling status...",
        "Confirming chaos levels...",
        "Identity confirmed.",
        "ACCESS GRANTED ❤️"
    ];


    const interval =
        setInterval(() => {

            progress += 10;


            if (scanProgressBar) {

                scanProgressBar.style.width =
                    `${progress}%`;

            }


            const messageIndex =
                Math.min(
                    Math.floor(progress / 15),
                    scanMessages.length - 1
                );


            if (scanStatus) {

                scanStatus.textContent =
                    scanMessages[messageIndex];

            }


            if (progress >= 100) {

                clearInterval(interval);

                setTimeout(() => {

                    revealSecret();

                }, 600);

            }

        }, 220);

}


/* ---------------------------------------------------------
   REVEAL SECRET
   --------------------------------------------------------- */

function revealSecret() {

    if (secretScanScreen) {
        secretScanScreen.style.display =
            "none";
    }

    if (secretUnlocked) {
        secretUnlocked.style.display =
            "block";
    }

}


/* ---------------------------------------------------------
   FINAL SECRET
   --------------------------------------------------------- */

if (secretFinalBtn) {

    secretFinalBtn.addEventListener(
        "click",
        () => {

            if (secretUnlocked) {
                secretUnlocked.style.display =
                    "none";
            }

            if (secretFinal) {
                secretFinal.style.display =
                    "block";
            }

            if (typeof playImportantEffect === "function") {
                playImportantEffect(
                    celebrationSound,
                    2500
                );
            }

        }
    );

}


/* ---------------------------------------------------------
   ACTIVATE BIRTHDAY MODE
   --------------------------------------------------------- */

if (secretCelebrateBtn) {

    secretCelebrateBtn.addEventListener(
        "click",
        () => {

            if (
                typeof activateBirthdayMode ===
                "function"
            ) {

                activateBirthdayMode();

            }

        }
    );

}


/* ---------------------------------------------------------
   BUTTON
   --------------------------------------------------------- */

if (secretUnlockBtn) {

    secretUnlockBtn.addEventListener(
        "click",
        attemptSecretUnlock
    );

}


/* ---------------------------------------------------------
   ENTER KEY
   --------------------------------------------------------- */

if (secretPassword) {

    secretPassword.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                attemptSecretUnlock();

            }

        }
    );

}

/* =========================================================
   RECYCLE BIN SYSTEM
   ========================================================= */

const restoreButtons =
    document.querySelectorAll(".restore-file");

const recycleMessage =
    document.getElementById("recycle-message");

const emptyRecycleBtn =
    document.getElementById("empty-recycle-btn");


restoreButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const file =
                    button.dataset.file;

                const fileRow =
                    button.closest(".deleted-file");


                if (!fileRow) {
                    return;
                }


                /*
                 * Special brother-sister file.
                 */

                if (file === "bond") {

                    if (recycleMessage) {

                        recycleMessage.textContent =
                            "Nice try. This file was never deleted. ❤️";

                    }

                    if (typeof launchConfetti === "function") {
                        launchConfetti();
                    }

                    if (typeof playImportantEffect === "function") {

                        playImportantEffect(
                            celebrationSound,
                            1800
                        );

                    }

                    return;
                }


                /*
                 * Normal files.
                 */

                const messages = {

                    marriage:
                        "Restored: Mom has been notified. 💍😂",

                    work:
                        "Restored: Household work has entered the queue. 🧹",

                    shinchan:
                        "Restored: Shinchan is back. Mission failed. 📺",

                    brain:
                        "Restored: Still no signs of common sense. 🧠"

                };


                if (recycleMessage) {

                    recycleMessage.textContent =
                        messages[file] ||
                        "File successfully restored.";

                }


                fileRow.classList.add(
                    "restored"
                );

                button.textContent =
                    "Restored ✓";

                button.disabled =
                    true;


                if (typeof playEffect === "function") {

                    playEffect(
                        clickSound
                    );

                }

            }
        );

    }
);


/* ---------------------------------------------------------
   EMPTY RECYCLE BIN
   --------------------------------------------------------- */

if (emptyRecycleBtn) {

    emptyRecycleBtn.addEventListener(
        "click",
        () => {

            if (recycleMessage) {

                recycleMessage.textContent =
                    "Nice try, Piku. The important files cannot be deleted. ❤️";

            }


            /*
             * Keep the special bond file.
             */

            const normalFiles =
                document.querySelectorAll(
                    ".deleted-file:not(.secret-deleted-file)"
                );


            normalFiles.forEach(
                (file) => {

                    file.style.opacity =
                        "0.2";

                }
            );


            if (typeof launchConfetti === "function") {

                launchConfetti();

            }

        }
    );

}