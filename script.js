// ----- Variables -----
const house = document.getElementById("house");

const cherryblossom = document.getElementById("cherryblossom");
const cherryblossom2 = document.getElementById("cherryblossom2");
const cherryblossom3 = document.getElementById("cherryblossom3");

const redshrine = document.getElementById("redshrine");
const woodenshrine = document.getElementById("woodenshrine");

const lighthouse = document.getElementById("lighthouse");

const islandcabin = document.getElementById("islandcabin");

// NEW: Skyland islands for Realm of the High Skies
const skyland1 = document.getElementById("skyland1");
const skyland2 = document.getElementById("skyland2");
const skyland3 = document.getElementById("skyland3");
const skyland4 = document.getElementById("skyland4");

const skyhouse = document.getElementById("skyhouse");

const world1bg = document.getElementById("world1bg");
const world3bg = document.getElementById("world3bg");
const world3bg2 = document.getElementById("world3bg2");
const world6bg = document.getElementById("world6bg");
const world5bg = document.getElementById("world5bg");
const world3bg3 = document.getElementById("world3bg3");

// Book
const bookUI = document.getElementById("book-ui");
const bookClose = document.getElementById("book-close");
const bookLeftArrow = document.getElementById("book-left-arrow");
const bookRightArrow = document.getElementById("book-right-arrow");
const bookPagePhoto = document.getElementById("book-page-photo");

// Frames
const frameUI = document.getElementById("frame-ui");
const frameProjected = document.getElementById("frame-projected");
const framePhoto = document.getElementById("frame-photo");
const frameClose = document.getElementById("frame-close");

// NEW: Book page system (Minecraft-style)
const book = document.getElementById("book");

// NEW: Zen Book (World 3)
const zenbook = document.getElementById("zenbook");

// NEW: Bottomless Book (World 5)
const bottomlessbook = document.getElementById("bottomlessbook");

// NEW: Sky Book (World 6)
const skybook = document.getElementById("skybook");

const frame1 = document.getElementById("frame1");
const frame2 = document.getElementById("frame2");
const frameContent = document.getElementById("frame-content");

// NEW: Frame 3 for World 5
const frame3 = document.getElementById("frame3");

const highSkiesFrame4Photo = "bgbimage/skyframephoto1.jpg";   // change to your real image
const highSkiesFrame5Photo = "bgbimage/skyframephoto2.jpg";   // change to your real image

// NEW: Photo for the Bottomless Frame (World 5) - change to your desired image
const bottomlessFramePhoto = "bgbimage/exampleimage3.jpg";   // ← replace with your actual image

// NEW: Two Frame 1 duplicates for World 6
const frame4 = document.getElementById("frame4");
const frame5 = document.getElementById("frame5");

// NEW: Themed Portal Gateways
const gateway1 = document.getElementById("gateway1");
const gateway3 = document.getElementById("gateway3");
const gateway5 = document.getElementById("gateway5");
const gateway6 = document.getElementById("gateway6");

const worlds = document.querySelectorAll(".world");
const fade = document.getElementById("fade-overlay");
const realmScene = document.getElementById("realm-scene");
const player = document.getElementById("player");
const backArrow = document.getElementById("back-arrow");
const yggdrasil = document.getElementById("yggdrasil");
const ground = document.getElementById("ground");

const textbox = document.getElementById("textbox");
const textboxText = document.getElementById("textbox-text");

// NPCs
const polaroid = document.getElementById("polaroid");
const zenguardian = document.getElementById("zenguardian");
const fisherman = document.getElementById("fisherman");

// ===== BACKGROUND MUSIC =====
const homepageMusic = document.getElementById("homepageMusic");
const world1Music = document.getElementById("world1Music");
const world1SnowSound = document.getElementById("world1SnowSound");
const world3Music = document.getElementById("world3Music");
const world5Music1 = document.getElementById("world5Music1");
const world5Music2 = document.getElementById("world5Music2");
const world5WavesSound = document.getElementById("world5WavesSound");
const world6Music = document.getElementById("world6Music");

// Click Sound Effect
const clickSound = document.getElementById("clickSound");

// Typewriter Sound Effect
const typewriterSound = document.getElementById("typewriterSound");

let currentMusic = null;   // tracks which audio is currently playing

const realmMessages = {
    w1: "You step into the Realm of Frost. The air bites with cold.",
    w2: "You arrive at the Realm of the Jade Mountains. The peaks tower endlessly.",
    w3: "You enter the Realm of Zen. A quiet calm surrounds you.",
    w4: "You wander into the Realm of Thinoporo. The winds whisper softly.",
    w5: "You descend into the Realm of the Bottomless. Darkness stretches forever.",
    w6: "You rise into the Realm of the High Skies. The horizon feels infinite."
};


// ================== OPENING SCREEN & ABOUT SIDEBAR ==================

const openingScreen = document.getElementById("opening-screen");
const mainGame = document.getElementById("main-game");
const aboutSidebar = document.getElementById("about-sidebar");
const beginButton = document.getElementById("begin-button");
const aboutButton = document.getElementById("about-button");
const aboutClose = document.getElementById("about-close");

// Begin the Journey
beginButton.addEventListener("click", () => {
    playClickSound();

    // Visual feedback (shrink + slight delay)
    beginButton.style.transform = "scale(0.85)";
    
    setTimeout(() => {
        openingScreen.style.opacity = "0";
        
        setTimeout(() => {
            openingScreen.style.display = "none";
            mainGame.style.display = "flex";
        }, 800);
    }, 180);
});

// Reset scale after click (in case user hovers again later)
beginButton.addEventListener("mouseleave", () => {
    beginButton.style.transform = "scale(1)";
});

// Fallback: if music didn't start automatically, start it on first user click anywhere on opening screen
openingScreen.addEventListener("click", () => {
    if (homepageMusic.paused) {
        homepageMusic.play().catch(() => {});
    }
}, { once: true });

// About Button
aboutButton.addEventListener("click", () => {
    playClickSound();

    // Visual feedback
    aboutButton.style.transform = "scale(0.85)";
    
    setTimeout(() => {
        aboutSidebar.classList.add("open");
        aboutButton.style.transform = "scale(1)";   // reset scale
    }, 180);
});

aboutButton.addEventListener("mouseleave", () => {
    aboutButton.style.transform = "scale(1)";
});

// Open About Sidebar
aboutButton.addEventListener("click", () => {
    aboutSidebar.classList.add("open");
});

// Close About Sidebar
aboutClose.addEventListener("click", () => {
    aboutSidebar.classList.remove("open");
});


let currentRealmId = null;   // NEW: tracks which realm we are currently in

textbox.style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
    textbox.style.display = "none";
});

let currentState = "idle";
let walkFrame = 0;
let walkTimer = 0;

let idleFrame = 0;      // NEW for idle animation
let idleTimer = 0;      // NEW timer for idle switching

// Walk cycle (6 frames)
const walkFrames = [
    "bgbimage/updatedplayer/BaronRun1.png",
    "bgbimage/updatedplayer/BaronRun2.png",
    "bgbimage/updatedplayer/BaronRun3.png",
    "bgbimage/updatedplayer/BaronRun4.png",
    "bgbimage/updatedplayer/BaronRun5.png",
    "bgbimage/updatedplayer/BaronRun6.png"
];

// Idle cycle (2 frames, 1 second delay)
const idleFrames = [
    "bgbimage/updatedplayer/BaronIdle1.png",
    "bgbimage/updatedplayer/BaronIdle2.png"
];

const jumpSprite = "bgbimage/updatedplayer/BaronJump.png";   // you can change this to a dedicated jump sprite later


// --- PRELOAD PLAYER SPRITES ---
function preloadImages(imageArray) {
    imageArray.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call the function immediately for all your player sprites
preloadImages(walkFrames);
preloadImages(idleFrames);
preloadImages([jumpSprite]); // Wrapped in brackets since it's a single string


let dropping = false;
let dropTimer = 0;


// ----- NPC HOVER TEXT -----
polaroid.addEventListener("mouseenter", () => {
    if (!isNpcDialogueOpen) textboxText.textContent = "Speak with the Polaroid";
});
polaroid.addEventListener("mouseleave", () => {
    if (!isNpcDialogueOpen && currentRealmId) {
        textboxText.textContent = realmMessages[currentRealmId] || "You have entered a new realm...";
    }
});

zenguardian.addEventListener("mouseenter", () => {
    if (!isNpcDialogueOpen) textboxText.textContent = "Speak with the Zen Guardian";
});
zenguardian.addEventListener("mouseleave", () => {
    if (!isNpcDialogueOpen && currentRealmId) {
        textboxText.textContent = realmMessages[currentRealmId] || "You have entered a new realm...";
    }
});

fisherman.addEventListener("mouseenter", () => {
    if (!isNpcDialogueOpen) textboxText.textContent = "Speak with the Fisherman";
});
fisherman.addEventListener("mouseleave", () => {
    if (!isNpcDialogueOpen && currentRealmId) {
        textboxText.textContent = realmMessages[currentRealmId] || "You have entered a new realm...";
    }
});


// ----- PLATFORMS -----
let platforms = [];

let walls = [];
function addWall(x, y, width, height) {
    walls.push({ x, y, width, height });
}

// ----- DEBUG -----
let debugMode = false;

function addPlatform(x, y, width, height, dropThrough = false) {
    platforms.push({ x, y, width, height, dropThrough });
}

// CAMERA
const camera = document.getElementById("camera");

let zoomLevel = 1.1;
const zoomSpeed = 0.5;
const minZoom = 0.5;
const maxZoom = 5;

// CAMERA SMOOTHING
let camPosX = 0;
let camPosY = 0;
const cameraSmooth = 0.08;


// Player position
let playerX = 100;
let playerY = 100;

const moveSpeed = 3.0;


// Canvas boundaries
const canvasWidth = 1280;
const canvasHeight = 720;
const groundHeight = 100;


// ----- PHYSICS -----
let velocityY = 0;
let gravity = -0.5;
let jumpPower = 9.5;
let isJumping = false;


// ----- INPUT STATE -----
let moveLeft = false;
let moveRight = false;

// ----- GATEWAY HOVER TEXT -----
const gateways = [gateway1, gateway3, gateway5, gateway6];

gateways.forEach(gateway => {
    gateway.addEventListener("mouseenter", () => {
        textboxText.textContent = "Return to the tree.";
    });

    gateway.addEventListener("mouseleave", () => {
        if (currentRealmId) {
            textboxText.textContent = realmMessages[currentRealmId] || "You have entered a new realm...";
        }
    });
});

// ----- CENTRAL CAPTION HOVER (Inside Canvas) -----
const centralCaption = document.getElementById("central-caption");

const w1 = document.getElementById("w1");
const w3 = document.getElementById("w3");
const w5 = document.getElementById("w5");
const w6 = document.getElementById("w6");

// World 1 (Frost)
w1.addEventListener("mouseenter", () => {
    centralCaption.src = "bgbimage/captionworld1.png";
});
w1.addEventListener("mouseleave", () => {
    centralCaption.src = "bgbimage/captionblank.png";
});

// World 3 (Zen)
w3.addEventListener("mouseenter", () => {
    centralCaption.src = "bgbimage/captionworld3.png";
});
w3.addEventListener("mouseleave", () => {
    centralCaption.src = "bgbimage/captionblank.png";
});

// World 5 (Bottomless)
w5.addEventListener("mouseenter", () => {
    centralCaption.src = "bgbimage/captionworld5.png";
});
w5.addEventListener("mouseleave", () => {
    centralCaption.src = "bgbimage/captionblank.png";
});

// World 6 (High Skies)
w6.addEventListener("mouseenter", () => {
    centralCaption.src = "bgbimage/captionworld6.png";
});
w6.addEventListener("mouseleave", () => {
    centralCaption.src = "bgbimage/captionblank.png";
});



// Add as many images as you want here
const bookPages = [
    "bgbimage/officialpics/op1-1.jpg",
    "bgbimage/officialpics/op1-2.jpg",
    "bgbimage/officialpics/op1-3.jpg",
    "bgbimage/officialpics/op1-4.jpg",
    "bgbimage/officialpics/op1-5.jpg"
];

// NEW: Zen book pages (World 3) - add your completely different photos here
const zenBookPages = [
    "bgbimage/officialpics/op3-1.jpg",     // ← replace with your actual new images
    "bgbimage/officialpics/op3-2.jpg",
    "bgbimage/officialpics/op3-3.jpg",
    "bgbimage/officialpics/op3-4.jpg",
    "bgbimage/officialpics/op3-5.jpg",
    "bgbimage/officialpics/op3-6.jpg",
    "bgbimage/officialpics/op3-7.jpg",
    "bgbimage/officialpics/op3-8.jpg",
    "bgbimage/officialpics/op3-9.jpg",
    "bgbimage/officialpics/op3-10.jpg"
    // Add as many new photos as you want
];

// NEW: Bottomless book pages (World 5) - put your completely different photos here
const bottomlessBookPages = [
    "bgbimage/officialpics/op5-1.jpg",   // ← replace with your actual images
    "bgbimage/officialpics/op5-2.jpg",
    // Add more unique photos as needed
];

// NEW: Sky Book pages (World 6) - put your completely different high-skies themed photos here
const skyBookPages = [
    "bgbimage/skyphoto1.jpg",     // ← replace with your actual new images
    "bgbimage/skyphoto2.png",
    "bgbimage/skyphoto3.jpg"
    // Add more unique photos as needed
];


// ----- BOOK HOVER EFFECTS (BookHover.png) -----
book.addEventListener("mouseenter", () => {
    book.src = "bgbimage/BookHover.png";
});
book.addEventListener("mouseleave", () => {
    book.src = "bgbimage/Book.png";
});

zenbook.addEventListener("mouseenter", () => {
    zenbook.src = "bgbimage/BookHover.png";
});
zenbook.addEventListener("mouseleave", () => {
    zenbook.src = "bgbimage/Book.png";
});

bottomlessbook.addEventListener("mouseenter", () => {
    bottomlessbook.src = "bgbimage/BookHover.png";
});
bottomlessbook.addEventListener("mouseleave", () => {
    bottomlessbook.src = "bgbimage/Book.png";
});

skybook.addEventListener("mouseenter", () => {
    skybook.src = "bgbimage/BookHover.png";
});
skybook.addEventListener("mouseleave", () => {
    skybook.src = "bgbimage/Book.png";
});


// ----- BOOK PAGE DISPLAY (works for ALL books) -----
function updateBookPageDisplay() {
    if (currentBookPages.length === 0) return;

    bookPagePhoto.src = currentBookPages[currentBookPage];

    // Show/hide arrows Minecraft-style
    bookLeftArrow.style.visibility = (currentBookPage > 0) ? "visible" : "hidden";
    bookRightArrow.style.visibility = (currentBookPage < currentBookPages.length - 1) ? "visible" : "hidden";
}



// ================== MULTI-BOOK SYSTEM (one UI, four different photo sets) ==================

let currentBookPages = [];   // Holds the active book's photo array
let currentBookPage = 0;



function openBook(pagesArray) {
    currentBookPages = pagesArray;
    currentBookPage = 0;
    updateBookPageDisplay();
    bookUI.style.display = "flex";
}


// ----- BOOK CLICK HANDLERS -----
book.addEventListener("click", () => {
    openBook(bookPages);           // World 1 - Frost
});

zenbook.addEventListener("click", () => {
    openBook(zenBookPages);        // World 3 - Zen
});

bottomlessbook.addEventListener("click", () => {
    openBook(bottomlessBookPages); // World 5 - Bottomless
});

skybook.addEventListener("click", () => {
    openBook(skyBookPages);        // World 6 - High Skies
});

// ====================== FRAME HOVER & CLICK HANDLERS ======================

// ----- FRAME 1 (Realm 1) -----
frame1.addEventListener("mouseenter", () => {
    frame1.src = "bgbimage/PictureFrameHover.png";
});
frame1.addEventListener("mouseleave", () => {
    frame1.src = "bgbimage/PictureFrame1.png";
});

// ----- FRAME 2 (Realm 1) -----
frame2.addEventListener("mouseenter", () => {
    frame2.src = "bgbimage/PictureFrameV2-Hover.png";
});
frame2.addEventListener("mouseleave", () => {
    frame2.src = "bgbimage/PictureFrameV2-1.png";
});

// ----- FRAME 3 (World 5 - Bottomless) -----
frame3.addEventListener("mouseenter", () => {
    frame3.src = "bgbimage/PictureFrameV2-Hover.png";
});
frame3.addEventListener("mouseleave", () => {
    frame3.src = "bgbimage/PictureFrameV2-1.png";
});

// ----- FRAME 4 & 5 (World 6 - High Skies) -----
frame4.addEventListener("mouseenter", () => {
    frame4.src = "bgbimage/PictureFrameHover.png";
});
frame4.addEventListener("mouseleave", () => {
    frame4.src = "bgbimage/PictureFrame1.png";
});

frame5.addEventListener("mouseenter", () => {
    frame5.src = "bgbimage/PictureFrameHover.png";
});
frame5.addEventListener("mouseleave", () => {
    frame5.src = "bgbimage/PictureFrame1.png";
});



// ----- FRAME CLICK HANDLERS -----
frame1.addEventListener("click", () => {
    frameProjected.src = "bgbimage/frame1projected.png";
    framePhoto.src = "bgbimage/officialpics/world1frame1.png";
    frameUI.style.display = "flex";
});

frame2.addEventListener("click", () => {
    frameProjected.src = "bgbimage/frame1projected.png";
    framePhoto.src = "bgbimage/officialpics/world1frame2.png";
    frameUI.style.display = "flex";
});

frame3.addEventListener("click", () => {
    frameProjected.src = "bgbimage/frame2projected.png";
    framePhoto.src = "bgbimage/officialpics/world5frame1.png";
    frameUI.style.display = "flex";
});

frame4.addEventListener("click", () => {
    frameProjected.src = "bgbimage/frame1projected.png";
    framePhoto.src = "bgbimage/officialpics/world6frame1.png";
    frameUI.style.display = "flex";
});

frame5.addEventListener("click", () => {
    frameProjected.src = "bgbimage/frame1projected.png";
    framePhoto.src = "bgbimage/officialpics/world6frame2.png";
    frameUI.style.display = "flex";
});




// ----- CLOSE HANDLERS (Book × and Frame ←) -----
bookClose.addEventListener("click", (e) => {
    e.stopPropagation();
    bookUI.style.display = "none";
});

frameClose.addEventListener("click", (e) => {
    e.stopPropagation();
    frameUI.style.display = "none";
});

// Safety: click on dark background to close
bookUI.addEventListener("click", (e) => {
    if (e.target === bookUI) {
        bookUI.style.display = "none";
    }
});

frameUI.addEventListener("click", (e) => {
    if (e.target === frameUI) {
        frameUI.style.display = "none";
    }
});



// ----- REALM SETTINGS -----
const realmSettings = {
    w1: { 
        bg: "lightblue", 
        groundImage: "bgbimage/pixelatedground_01.png"
    },
    w2: { 
        bg: "white", 
        groundImage: "bgbimage/pixelatedground_02.png"
    },
    w3: { 
        bg: "lightpink", 
        groundImage: "bgbimage/pixelatedground_06.png"
    },
    w4: { 
        bg: "lightblue", 
        groundImage: "bgbimage/pixelatedground_04.png"
    },
    w5: { 
        bg: "darkblue", 
        groundImage: "bgbimage/pixelatedground_05.png"
    },
    w6: { 
        bg: "lightyellow", 
        groundImage: "bgbimage/pixelatedground_02.png"
    }
};

function loadRealmPlatforms(realmId) {

    // Clear old platforms every time you enter a new world
    platforms = [];
    walls = []; // 🔴 IMPORTANT: reset walls too

    if (realmId === "w1") {

        // Main ground
        addPlatform(0, 0, 4000, 100, false);

        // House floor
        addPlatform(600, 100, 700, 24, false);
        addPlatform(578, 100, 20, 10, false);

        addPlatform(600, 276, 700, 10, true);
        addPlatform(650, 265, 310, 20, false);

        // Stairs
        addPlatform(980, 125, 20, 10, false);
        addPlatform(990, 135, 20, 10, false);
        addPlatform(1000, 145, 20, 10, false);
        addPlatform(1010, 155, 20, 10, false);
        addPlatform(1020, 165, 20, 10, false);
        addPlatform(1030, 175, 20, 10, false);
        addPlatform(1040, 185, 20, 10, false);
        addPlatform(1050, 195, 20, 10, false);
        addPlatform(1060, 205, 20, 10, false);
        addPlatform(1070, 215, 20, 10, false);
        addPlatform(1080, 225, 20, 10, false);
        addPlatform(1090, 235, 20, 10, false);
        addPlatform(1100, 245, 20, 10, false);
        addPlatform(1110, 255, 20, 10, false);
        addPlatform(1120, 265, 20, 10, false);
        addPlatform(1130, 275, 20, 10, false);

        addWall(560, 280, 200, 500, false);
        addWall(1160, 280, 200, 500, false);
        addWall(660, 430, 500, 100, false);
    }

    if (realmId === "w2") {
        addPlatform(0, 0, 4000, 100);
    }

    if (realmId === "w3") {
        addPlatform(0, 0, 4000, 100);

        addPlatform(900, 100, 20, 10, false);
        addPlatform(910, 110, 20, 10, false);
        addPlatform(920, 120, 20, 10, false);

        addPlatform(930, 130, 375, 10, false);

    }

    if (realmId === "w4") {
        addPlatform(0, 0, 4000, 100);
    }

    if (realmId === "w5") {
        addPlatform(0, 0, 4000, 100);

        addPlatform(550, 100, 700, 75, false);
        addPlatform(380, 100, 50, 10, false);
        addPlatform(410, 111, 50, 10, false);
        addPlatform(438, 123, 50, 10, false);
        addPlatform(458, 134, 50, 10, false);
        addPlatform(480, 145, 50, 10, false);
        addPlatform(499, 159, 50, 10, false);

        addPlatform(480, 290, 580, 9, true);

        addPlatform(480, 290, 250, 15, true);
        addPlatform(820, 290, 250, 15, true);

        addPlatform(750, 230, 60, 11, true);
        addPlatform(750, 200, 60, 11, true);

        addWall(530, 300, 10, 120, false);
        addWall(1000, 300, 10, 120, false);
        addWall(470, 290, 250, 10, false);
        addWall(850, 290, 250, 10, false);

    }

    if (realmId === "w6") {
        addPlatform(0, 0, 4000, 100);

        addPlatform(650, 100, 650, 32, false);
        addPlatform(650, 360, 650, 30, true);
        addPlatform(600, 90, 700, 20, false);
        addPlatform(600, 90, 700, 30, false);

        addWall(650, 240, 30, 120, false);
        addWall(1200, 240, 30, 120, false);
        
        addPlatform(850, 135, 50, 10, true);
        addPlatform(870, 146, 50, 10, true);
        addPlatform(890, 157, 50, 10, true);
        addPlatform(910, 168, 50, 10, true);
        addPlatform(920, 179, 50, 10, true);
        addPlatform(930, 190, 50, 10, true);
        addPlatform(940, 201, 50, 10, true);
        addPlatform(950, 212, 50, 10, true);
        addPlatform(960, 223, 50, 10, true);
        addPlatform(965, 234, 50, 10, true);

        addPlatform(960, 245, 50, 10, true);
        addPlatform(950, 256, 50, 10, true);
        addPlatform(940, 267, 50, 10, true);
        addPlatform(930, 278, 50, 10, true);
        addPlatform(920, 289, 50, 10, true);
        addPlatform(910, 300, 50, 10, true);
        addPlatform(905, 311, 50, 10, true);
        addPlatform(900, 322, 50, 10, true);
        addPlatform(890, 333, 50, 10, true);
    }

    // 🔴 IMPORTANT: render debug boxes after loading
    renderPlatforms();
    renderWalls();
}

// ----- WORLD CLICK -----
worlds.forEach(world => {

    world.addEventListener("click", () => {

        playClickSound();

        const realmId = world.id;
        currentRealmId = realmId;   // NEW: remember current realm for hover text restoration

        // Hide book by default
        book.style.display = "none";

        // Show book only in specific realm
        if (realmId === "w1") {
            book.style.display = "block";
    }

        // Show house only in Realm 1
        // Load platforms for this realm
    loadRealmPlatforms(realmId);

    // Hide everything first
    house.style.display = "none";
    cherryblossom.style.display = "none";
    cherryblossom2.style.display = "none";
    cherryblossom3.style.display = "none";    
    redshrine.style.display = "none";
    woodenshrine.style.display = "none";
    world1bg.style.display = "none";
    world3bg.style.display = "none";
    world3bg2.style.display = "none";
    world3bg3.style.display = "none";
    world6bg.style.display = "none";
    world5bg.style.display = "none";
    bookUI.style.display = "none";
    zenbook.style.display = "none";
    bottomlessbook.style.display = "none";   // NEW
    skybook.style.display = "none";   // NEW
    frame1.style.display = "none";
    frame2.style.display = "none";
    frame3.style.display = "none";
    frame4.style.display = "none";
    frame5.style.display = "none";
    lighthouse.style.display = "none";
    islandcabin.style.display = "none";

     // NEW: Hide all gateways
    gateway1.style.display = "none";
    gateway3.style.display = "none";
    gateway5.style.display = "none";
    gateway6.style.display = "none";

    // NEW: Hide skylands
    skyland1.style.display = "none";
    skyland2.style.display = "none";
    skyland3.style.display = "none";
    skyland4.style.display = "none";

    skyhouse.style.display = "none";

    polaroid.style.display = "none";
    zenguardian.style.display = "none";
    fisherman.style.display = "none";


    // Show based on realm
    if (realmId === "w1") {
        house.style.display = "block";
        world1bg.style.display = "block";
        frame1.style.display = "block";
        frame2.style.display = "block";
        polaroid.style.display = "block";

        gateway1.style.display = "block";   // NEW

    }

    if (realmId === "w3") {

        cherryblossom.style.display = "block";
        cherryblossom2.style.display = "block";
        cherryblossom3.style.display = "block";

        redshrine.style.display = "block";
        woodenshrine.style.display = "block";
        world3bg.style.display = "block";
        world3bg2.style.display = "block";
        world3bg3.style.display = "block";

        zenguardian.style.display = "block";

        // NEW: Show the Zen book only in Realm 3
        zenbook.style.display = "block";

        gateway3.style.display = "block";   // NEW

    }

    if (realmId === "w5") {

        lighthouse.style.display = "block";

        world5bg.style.display = "block";
        islandcabin.style.display = "block";

        // NEW: Show the Bottomless book only in Realm 5
        bottomlessbook.style.display = "block";

        fisherman.style.display = "block";


        // NEW: Show the duplicate Frame in World 5
        frame3.style.display = "block";

        gateway5.style.display = "block";   // NEW

    }

    if (realmId === "w6") {

        // NEW: Show all skyland islands
        skyland1.style.display = "block";
        skyland2.style.display = "block";
        skyland3.style.display = "block";
        skyland4.style.display = "block";

        skyhouse.style.display = "block";

        // NEW: Show the Sky Book only in Realm 6
        skybook.style.display = "block";

        world6bg.style.display = "block";

        frame4.style.display = "block";
        frame5.style.display = "block";

        gateway6.style.display = "block";   // NEW
    }

        const settings = realmSettings[realmId];

        fade.style.opacity = 1;

        setTimeout(() => {

            // Show Realm
            realmScene.style.display = "block";
            textbox.style.display = "block";

            // Set realm-specific message + start 5-second auto-fade
            const realmMsg = realmMessages[realmId] || "You have entered a new realm...";
            textboxText.textContent = realmMsg;
            startRealmMessageFade();

            // Set background
            realmScene.style.backgroundColor = settings.bg;

            // Hide homepage
            yggdrasil.style.display = "none";
            worlds.forEach(w => w.style.display = "none");

            textbox.style.display = "block";

            // Optional: set default text
            // textboxText.textContent = "You have entered a new realm...";

            // Reset ground
            ground.style.backgroundImage = "";
            ground.style.backgroundColor = "";

            if (settings.groundImage) {

                ground.style.backgroundImage = `url(${settings.groundImage})`;
                ground.style.backgroundRepeat = "repeat-x";
                ground.style.backgroundSize = "auto 100%";

            }

            // Reset player
            playerX = 100;
            playerY = groundHeight;

            velocityY = 0;
            isJumping = false;

            player.style.left = playerX + "px";
            player.style.bottom = playerY + "px";

                        // ===== MUSIC: Stop previous and start realm music =====
            stopAllMusic();

            if (realmId === "w1") {
                playMusic(world1Music);
                if (world1SnowSound) world1SnowSound.play().catch(() => {});
            } else if (realmId === "w3") {
                playMusic(world3Music);
            } else if (realmId === "w5") {
                // Main themes (sequential)
                world5Music1.currentTime = 0;
                world5Music2.currentTime = 0;
                world5Music1.play().catch(() => {});
                world5Music1.onended = () => {
                    world5Music2.play().catch(() => {});
                };

                // Ambient waves layer (loops independently)
                world5WavesSound.currentTime = 0;
                world5WavesSound.volume = 0.45;   // adjust between 0.3 – 0.6
                world5WavesSound.play().catch(() => {});

                currentMusic = world5Music1;
            } else if (realmId === "w6") {
                playMusic(world6Music);
            }

            fade.style.opacity = 0;

        }, 600);

    });

});


// ----- THEMED PORTAL GATEWAY CLICK HANDLERS -----
function returnToHomepage() {
    fade.style.opacity = 1;

    setTimeout(() => {
        // Hide realm
        realmScene.style.display = "none";
        textbox.style.display = "none";

        // Kill all overlays
        bookUI.style.display = "none";
        frameUI.style.display = "none";

        // Stop realm music
        stopAllMusic();

        // Reset fade
        fade.style.opacity = 0;

        // Show homepage
        yggdrasil.style.display = "block";
        worlds.forEach(w => w.style.display = "block");

        // Restart homepage music
        playMusic(homepageMusic);

        // Hide all gateways
        gateway1.style.display = "none";
        gateway3.style.display = "none";
        gateway5.style.display = "none";
        gateway6.style.display = "none";

        typewriterSound.pause();

    }, 600);
}

// Attach click listeners
gateway1.addEventListener("click", returnToHomepage);
gateway3.addEventListener("click", returnToHomepage);
gateway5.addEventListener("click", returnToHomepage);
gateway6.addEventListener("click", returnToHomepage);

// ----- GATEWAY HOVER TEXT (shows "Return to the tree.") -----
gateway1.addEventListener("mouseenter", () => {
    textboxText.textContent = "Return to the tree.";
});

gateway1.addEventListener("mouseleave", () => {
    // Restore the current realm message when mouse leaves
    textboxText.textContent = realmMessages[currentRealmId] || "You have entered a new realm...";
});

gateway3.addEventListener("mouseenter", () => {
    textboxText.textContent = "Return to the tree.";
});

gateway3.addEventListener("mouseleave", () => {
    textboxText.textContent = realmMessages[currentRealmId] || "You have entered a new realm...";
});

gateway5.addEventListener("mouseenter", () => {
    textboxText.textContent = "Return to the tree.";
});

gateway5.addEventListener("mouseleave", () => {
    textboxText.textContent = realmMessages[currentRealmId] || "You have entered a new realm...";
});

gateway6.addEventListener("mouseenter", () => {
    textboxText.textContent = "Return to the tree.";
});

gateway6.addEventListener("mouseleave", () => {
    textboxText.textContent = realmMessages[currentRealmId] || "You have entered a new realm...";
});


// ----- BOOK PAGE-TURN ARROWS (Minecraft style) -----
bookLeftArrow.addEventListener("click", (e) => {
    e.stopPropagation();   // prevent accidentally closing the book
    if (currentBookPage > 0) {
        currentBookPage--;
        updateBookPageDisplay();
    }
});

bookRightArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentBookPage < currentBookPages.length - 1) {
        currentBookPage++;
        updateBookPageDisplay();
    }
});


// ================== NPC DIALOGUE - FIXED (No stacking) ==================

const npcDialogueOverlay = document.getElementById("npc-dialogue-overlay");
const npcAvatar = document.getElementById("npc-avatar");
const npcClose = document.getElementById("npc-close");

let typeTimeout = null;
let isNpcDialogueOpen = false;   // ← NEW GUARD FLAG

// Different introductory text per NPC
const npcIntroText = {
    "Polaroid": "  Hello traveler... the frost bites deep today, even for me. The sun hasn't shone here in years.",
    "Zen Guardian": "  Peace be with you, seeker. The path to enlightenment is quiet... yet filled with wonder. I am the guardian of this realm.",
    "Fisherman": "  Ah, another fellow friend... The waters here are endless... much like our stories. You won't find anyone else here."
};

// Typewriter with sound effect
function typeWriter(text, callback) {
    if (typeTimeout) clearTimeout(typeTimeout);
    
    textboxText.textContent = "";   // clear immediately
    let i = 0;
    
    // Start typewriter sound
    typewriterSound.currentTime = 0;
    typewriterSound.volume = 0.7;     // adjust volume to taste (0.3–0.6 is good)
    typewriterSound.play().catch(() => {});

    function type() {
        if (i < text.length) {
            textboxText.textContent += text.charAt(i);
            i++;
            typeTimeout = setTimeout(type, 35);
        } else {
            // Typing finished → stop sound
            typewriterSound.pause();
            if (callback) callback();
        }
    }
    type();
}

// Open NPC dialogue
function openNpcDialogue(npcName, npcImageSrc) {
    isNpcDialogueOpen = true;                     // ← GUARD ON
    npcDialogueOverlay.style.display = "block";
    npcAvatar.src = npcImageSrc;
    npcAvatar.style.display = "block";

    const introText = npcIntroText[npcName] || "Hello traveler...";
    typeWriter(introText);                        // ← starts clean
}

// Close dialogue
function closeNpcDialogue() {
    npcDialogueOverlay.style.display = "none";
    npcAvatar.style.display = "none";
    if (typeTimeout) clearTimeout(typeTimeout);
    
    // Stop typewriter sound
    typewriterSound.pause();
    
    // Restore realm message
    if (currentRealmId) {
        textboxText.textContent = realmMessages[currentRealmId] || "You have entered a new realm...";
    }
}

// NPC click handlers
polaroid.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    openNpcDialogue("Polaroid", "bgbimage/polarbearnpc.png");
});

zenguardian.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    openNpcDialogue("Zen Guardian", "bgbimage/monknpc.png");
});

fisherman.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    openNpcDialogue("Fisherman", "bgbimage/fishermannpc.png");
});

// Close button
npcClose.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    closeNpcDialogue();
});

// Click on black overlay to close
npcDialogueOverlay.addEventListener("click", (e) => {
    if (e.target === npcDialogueOverlay) {
        closeNpcDialogue();
    }
});




// ================== AUTO FADE REALM MESSAGE AFTER 3 SECONDS ==================

let realmMessageTimeout = null;

function startRealmMessageFade() {
    if (isNpcDialogueOpen) return;   // ← NEW: don't fade while NPC is talking
    // Clear any existing timeout
    if (realmMessageTimeout) clearTimeout(realmMessageTimeout);

    realmMessageTimeout = setTimeout(() => {
        const currentText = textboxText.textContent.trim();
        if (!currentText) return;

        // Backspace deletion animation (starts from the end)
        let text = currentText;
        let i = text.length;

        function deleteChar() {
            if (i > 0) {
                text = text.slice(0, -1);
                textboxText.textContent = text;
                i--;
                realmMessageTimeout = setTimeout(deleteChar, 25); // speed of deletion
            }
        }
        deleteChar();
    }, 3000); // 3 seconds after entering realm
}


// Stop all music
function stopAllMusic() {
    homepageMusic.pause();
    world1Music.pause();
    world3Music.pause();
    world5Music1.pause();
    world5Music2.pause();
    world6Music.pause();
    world1SnowSound.pause();     // if you have this from before
    world5WavesSound.pause();    // ← Add this line

    // Reset times
    homepageMusic.currentTime = 0;
    world1Music.currentTime = 0;
    world3Music.currentTime = 0;
    world5Music1.currentTime = 0;
    world5Music2.currentTime = 0;
    world6Music.currentTime = 0;
    world1SnowSound.currentTime = 0;
    world5WavesSound.currentTime = 0;   // ← Add this line

    currentMusic = null;
}


// Play music helper
function playMusic(audioElement) {
    stopAllMusic();
    audioElement.currentTime = 0;
    audioElement.play().catch(err => console.log("Audio play prevented:", err));
    currentMusic = audioElement;
}

// Play click sound (short and non-blocking)
function playClickSound() {
    clickSound.currentTime = 0;        // restart from beginning every click
    clickSound.volume = 0.75;           // adjust volume (0.3 to 0.7 feels good)
    clickSound.play().catch(() => {}); // ignore autoplay errors
}

// ----- KEY DOWN -----
document.addEventListener("keydown", (e) => {

    const key = e.key.toLowerCase();

    if (["w","a","s","d","arrowup","arrowleft","arrowright"].includes(key)) {
        e.preventDefault();
    }

    if (key === "a" || key === "arrowleft") moveLeft = true;
    if (key === "d" || key === "arrowright") moveRight = true;

    if ((key === "w" || key === "arrowup") && !isJumping) {

        velocityY = jumpPower;
        isJumping = true;

    }

    if (key === "s" || key === "arrowdown") {
    dropping = true;
    dropTimer = 15;

    // 🔥 FORCE player downward so they break contact
    velocityY = -5;
    }

    if (key === "p") {
    debugMode = !debugMode;
    renderPlatforms();
    renderWalls();
    }

});


// ----- KEY UP -----
document.addEventListener("keyup", (e) => {

    const key = e.key.toLowerCase();

    if (key === "a" || key === "arrowleft") moveLeft = false;
    if (key === "d" || key === "arrowright") moveRight = false;

});


// ----- GAME LOOP -----
function gameLoop() {

    if (moveLeft) {
        player.style.transform = "scaleX(-1)";
    } else if (moveRight) {
        player.style.transform = "scaleX(1)";
    }

    // Horizontal movement
    if (moveLeft) playerX -= moveSpeed;
    if (moveRight) playerX += moveSpeed;

    // Keep player inside canvas bounds
    playerX = Math.max(0, Math.min(playerX, canvasWidth - player.offsetWidth));

    walls.forEach(w => {

    const playerLeft = playerX;
    const playerRight = playerX + player.offsetWidth;
    const playerBottom = playerY;
    const playerTop = playerY + player.offsetHeight;

    const wallLeft = w.x;
    const wallRight = w.x + w.width;
    const wallBottom = w.y;
    const wallTop = w.y + w.height;

    // Check overlap
    if (
        playerRight > wallLeft &&
        playerLeft < wallRight &&
        playerTop > wallBottom &&
        playerBottom < wallTop
    ) {

        // Determine collision direction
        const overlapLeft = playerRight - wallLeft;
        const overlapRight = wallRight - playerLeft;
        const overlapBottom = playerTop - wallBottom;
        const overlapTop = wallTop - playerBottom;

        const minOverlap = Math.min(
            overlapLeft,
            overlapRight,
            overlapBottom,
            overlapTop
        );

        // Resolve collision based on smallest overlap
        if (minOverlap === overlapLeft) {
            playerX -= overlapLeft;
        }
        else if (minOverlap === overlapRight) {
            playerX += overlapRight;
        }
        else if (minOverlap === overlapBottom) {
            playerY -= overlapBottom;
            velocityY = 0;
        }
        else if (minOverlap === overlapTop) {
            playerY += overlapTop;
            velocityY = 0;
            isJumping = false;
        }

    }

});

    // Gravity
    velocityY += gravity;
    playerY += velocityY;

    // Ground collision
   let onPlatform = false;

    platforms.forEach(p => {

        const playerBottom = playerY;
        const playerLeft = playerX;
        const playerRight = playerX + player.offsetWidth;

        const platformTop = p.y + p.height;
        const platformLeft = p.x;
        const platformRight = p.x + p.width;

        // Check landing on platform
        // Check landing ONLY when falling
    if (
    velocityY <= 0 &&

    playerRight > platformLeft &&
    playerLeft < platformRight &&

    playerBottom <= platformTop &&
    playerBottom >= platformTop - 15 &&

    // 👇 NEW: ignore drop-through platforms when dropping
    !(p.dropThrough && dropping)
    ) {
        playerY = platformTop;
        velocityY = 0;
        isJumping = false;
        onPlatform = true;
    }
});

// ----- DETERMINE STATE -----
if (isJumping) {
    currentState = "jump";
} else if (moveLeft || moveRight) {
    currentState = "walk";
} else {
    currentState = "idle";
}

// Reset idle timer when not idle (prevents jumpy idle animation when returning to idle)
if (currentState !== "idle") {
    idleTimer = 0;
    idleFrame = 0;
}

// ----- APPLY SPRITES -----

if (currentState === "idle") {
    idleTimer++;

    // Switch idle frame every 60 frames (~1 second at 60fps)
    if (idleTimer >= 60) {
        idleTimer = 0;
        idleFrame = (idleFrame + 1) % idleFrames.length;
    }

    player.style.backgroundImage = `url(${idleFrames[idleFrame]})`;
}

else if (currentState === "jump") {
    player.style.backgroundImage = `url(${jumpSprite})`;
}

else if (currentState === "walk") {
    walkTimer++;

    // Your original walk speed (adjust if needed)
    if (walkTimer >= 15) {
        walkTimer = 0;
        walkFrame = (walkFrame + 1) % walkFrames.length;
    }

    player.style.backgroundImage = `url(${walkFrames[walkFrame]})`;
}

if (dropTimer > 0) {
    dropTimer--;
} else {
    dropping = false;
}


if (!onPlatform) {
    // apply gravity normally
}

    ground.style.backgroundPositionX = -playerX + "px";

    // Update player position
    player.style.left = playerX + "px";
    player.style.bottom = playerY + "px";

    // Update camera
    updateCamera();

    requestAnimationFrame(gameLoop);

    if (currentState !== "walk") {
    walkFrame = 0;
    walkTimer = 0;
}

}

// ----- CAMERA FOLLOW -----
function updateCamera() {

    const screenCenterX = canvasWidth / 2;
    const screenCenterY = canvasHeight / 2;

    const camX = screenCenterX - playerX - (player.offsetWidth / 2);

    // FIX: invert the Y calculation
    const camY = -(screenCenterY - playerY - (player.offsetHeight / 2));

    camera.style.transform =
        `translate(${camX}px, ${camY}px) scale(${zoomLevel})`;

}

function renderPlatforms() {

    // Remove old debug boxes
    document.querySelectorAll(".platform-debug").forEach(el => el.remove());

    // If debug is off, stop here
    if (!debugMode) return;

    // Draw platforms
    platforms.forEach(p => {

        const div = document.createElement("div");
        div.classList.add("platform-debug");

        div.style.left = p.x + "px";
        div.style.bottom = p.y + "px";
        div.style.width = p.width + "px";
        div.style.height = p.height + "px";

        camera.appendChild(div);

    });

}

function renderWalls() {

    document.querySelectorAll(".wall-debug").forEach(el => el.remove());

    if (!debugMode) return;

    walls.forEach(w => {
        const div = document.createElement("div");
        div.classList.add("wall-debug");

        div.style.left = w.x + "px";
        div.style.bottom = w.y + "px";
        div.style.width = w.width + "px";
        div.style.height = w.height + "px";

        camera.appendChild(div);
    });
}

// ================== START HOMEPAGE MUSIC IMMEDIATELY ON PAGE LOAD ==================

// Wait for the DOM to be fully loaded, then start homepage music
document.addEventListener("DOMContentLoaded", () => {
    // Small delay to ensure audio context is ready (browsers are strict with autoplay)
    setTimeout(() => {
        homepageMusic.volume = 0.65;   // nice starting volume
        homepageMusic.play().catch(err => {
            console.log("Homepage music autoplay prevented (user interaction needed):", err);
        });
    }, 800);   // 800ms gives time for the opening screen to appear
});

// Global click sound for all interactive elements
document.addEventListener("click", (e) => {
    // Only play on elements that are likely interactive
    if (e.target.tagName === "BUTTON" || 
        e.target.classList.contains("portal") || 
        e.target.id.includes("book") || 
        e.target.id.includes("frame") || 
        e.target.id.includes("gateway") || 
        e.target.id.includes("npc") ||
        e.target.id === "npc-close" ||
        e.target.id === "book-close" ||
        e.target.id === "frame-close") {
        
        playClickSound();
    }
});

// Start loop
gameLoop();