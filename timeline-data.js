/**
 * TIMELINE DATA — edit captions, dates, and media paths here.
 *
 * Story order (Antonio):
 *   Intro → 01 Our first picture / early days →
 *   02 First house we bought (photos + house video, before the engagement) →
 *   03 First trips → 04 Proposal → 05 Marriage →
 *   06 Graduation → 07 Birth of our first daughter → To be continued
 *
 * Leave `date` as "" to hide the date line.
 * Leave `images` as [] on a chapter to keep a placeholder until you add photos.
 * Drop new photos into media/ using the filenames below, then list them here.
 *
 * Optional `quote` + `quoteSong`: a short, verified Taylor Swift lyric
 * (one line, ~10 words) credited with the song title.
 *
 * Soft date notes from file metadata (not shown unless you fill `date`):
 *   first-picture.jpg: May 2016
 *   lagoon.jpg: May 2024
 *
 * First-house guess: snowman.jpg and living-room-balloons.jpg may belong
 * in chapter 03. Move or remove them if they belong somewhere else.
 *
 * Never include the Zillow listing screenshots.
 */
window.TIMELINE = [
  {
    id: "hero",
    type: "hero",
    kicker: "Para ti",
    title: "Roli",
    subtitle: "Do you remember…",
    quote: "Have I known you twenty seconds or twenty years?",
    date: ""
  },
  {
    id: "the-little-bed",
    type: "text",
    kicker: "The beginning",
    title: "That little bed",
    body: "Do you remember that tiny bed in your room, more like a closet? We barely fit. I still think of those nights as some of the happiest of my life.",
    date: ""
  },
  {
    id: "ice-cream",
    type: "text",
    kicker: "",
    title: "And the ice cream",
    body: "Or the day I dropped all my money buying ice cream on the way to my uncle’s. We still smile about it. I do, every time.",
    date: ""
  },

  /* ——— 01 Our first picture ——— */
  {
    id: "chapter-first-picture",
    type: "chapter",
    num: "01",
    title: "Our first picture",
    body: ""
  },
  {
    id: "first-picture",
    type: "photo",
    kicker: "The first one",
    title: "This is where we begin",
    quote: "All along there was some invisible string",
    body: "Black Xs on our hands, and the whole night ahead of us.",
    date: "",
    image: "media/first-picture.jpg",
    alt: "Our first picture, with Xs drawn on our hands."
  },
  {
    id: "early-days",
    type: "gallery",
    kicker: "Early days",
    title: "The days in between",
    quote: "I was enchanted to meet you",
    body: "Soft evenings, a dock, a lake. I would go back to any of them with you.",
    date: "",
    images: [
      "media/cozy-selfie.jpg",
      "media/early-night.jpg",
      "media/sunny-beanie.jpg",
      "media/dock.jpg"
    ],
    alt: "Early photos of us."
  },
  {
    id: "anniversary-10",
    type: "photo",
    kicker: "Ten years",
    title: "Still us",
    body: "The same faces. Ten years later, I would make this face with you all over again.",
    date: "",
    image: "media/anniversary-10.jpg",
    alt: "A silly selfie of the two of us."
  },
  /* ——— 02 First house we bought (before the engagement) ——— */
  {
    id: "chapter-first-house",
    type: "chapter",
    num: "02",
    title: "The first house we bought",
    body: "The first place that was really ours."
  },
  {
    id: "first-house",
    type: "gallery",
    kicker: "Home",
    title: "The first house we bought",
    quote: "This is our place, we make the rules",
    body: "A yard, a living room, the beginning of a home.",
    date: "",
    // Draft placement: confirm whether these belong in this chapter.
    images: [
      "media/snowman.jpg",
      "media/living-room-balloons.jpg"
    ],
    alt: "Moments from the first house we bought."
  },
  {
    id: "home",
    type: "video",
    kicker: "Home",
    title: "Se ve bonita",
    quote: "We could leave the Christmas lights up ’til January",
    body: "Our house, lit up at night. You said it first, and you were right. It is beautiful. Because you are in it.",
    date: "",
    theme: "night",
    video: "media/home.mp4",
    poster: "media/home-02.jpg",
    orientation: "landscape",
    stills: [],
    alt: "The first house we bought, lit at night."
  },

  /* ——— 03 First trips ——— */
  {
    id: "chapter-first-trips",
    type: "chapter",
    num: "03",
    title: "Our first trips",
    body: "Wherever you were, I wanted to be."
  },
  {
    id: "far-and-away",
    type: "gallery",
    kicker: "Away",
    title: "Places I still dream about",
    quote: "I don’t know how it gets better than this",
    body: "London, with Big Ben behind us. Paris, and that smile with the tower at your back. Water like glass.",
    date: "",
    images: [
      "media/london.jpg",
      "media/paris.jpg",
      "media/lagoon.jpg",
      "media/cabin.jpg"
    ],
    alt: "London, Paris, and the lagoon."
  },
  {
    id: "galapagos",
    type: "gallery",
    kicker: "Galápagos",
    title: "At the edge of the world",
    body: "You in the shallows, the kayak, the two of us in life vests. I can still feel that water.",
    date: "",
    images: [
      "media/galapagos-water.jpg",
      "media/galapagos-tee.jpg",
      "media/galapagos-kayak.jpg"
    ],
    alt: "Galápagos: the water, the beach, the kayak."
  },
  {
    id: "out-in-the-world",
    type: "gallery",
    kicker: "Adventures",
    title: "Always another adventure",
    body: "Spring trees, a waterfall, sunsets, Niagara, another dawn at an airport window.",
    date: "",
    images: [
      "media/spring-tree.jpg",
      "media/waterfall.jpg",
      "media/sunset-cliff.jpg",
      "media/niagara.jpg",
      "media/airport-dawn.jpg",
      "media/hotel-bed.jpg",
      "media/grass-selfie.jpg"
    ],
    alt: "Trips and days out in the world."
  },
  {
    id: "mexico",
    type: "gallery",
    kicker: "Mexico",
    title: "Up at sunrise",
    body: "A balloon over Teotihuacan, the pyramids below us, the morning just starting.",
    date: "",
    images: [
      "media/teotihuacan.jpg",
      "media/courtyard-pool.jpg"
    ],
    alt: "A sunrise balloon over Teotihuacan, and a quiet courtyard."
  },
  {
    id: "cockpit",
    type: "photo",
    kicker: "The sky",
    title: "You trusted me in the sky",
    body: "A small plane, two seats, and you beside me. I have never taken that lightly.",
    date: "",
    image: "media/cockpit.jpg",
    alt: "In the cockpit of a small plane together."
  },

  /* ——— 04 Proposal ——— */
  {
    id: "chapter-proposal",
    type: "chapter",
    num: "04",
    title: "The proposal",
    body: ""
  },
  {
    id: "proposal",
    type: "video",
    kicker: "The question",
    title: "The moment I asked",
    quote: "Can I go where you go?",
    body: "At dusk, by the helicopter, I got down on one knee. And you said yes.",
    date: "",
    theme: "centerpiece",
    video: "media/proposal.mp4",
    poster: "media/proposal-15.jpg",
    orientation: "square",
    stills: [
      "media/proposal-10.jpg",
      "media/proposal-15.jpg",
      "media/proposal-35.jpg"
    ],
    alt: "The proposal at dusk."
  },

  /* ——— 05 Marriage ——— */
  {
    id: "chapter-marriage",
    type: "chapter",
    num: "05",
    title: "Marriage",
    body: "The day we promised forever."
  },
  {
    id: "pre-wedding",
    type: "video",
    kicker: "A dream",
    title: "Dreams come true",
    quote: "Marry me, Juliet, you’ll never have to be alone",
    body: "We used to dream about this day. Then one day it was real.",
    date: "",
    theme: "night",
    video: "media/pre-wedding.mp4",
    poster: "media/pre-wedding.jpg",
    orientation: "landscape",
    stills: [],
    alt: "A night at a Taylor Swift concert, before our wedding."
  },
  {
    id: "marriage",
    type: "gallery",
    kicker: "I do",
    title: "The day we promised forever",
    quote: "I’d marry you with paper rings",
    body: "Under the gazebo, in the green of the trees, I kissed you and the world went quiet.",
    date: "",
    images: [
      "media/wedding-kiss.jpg",
      "media/wedding-dip.jpg",
      "media/wedding-forehead.jpg",
      "media/wedding-arm.jpg"
    ],
    alt: "Our wedding, under the gazebo in the trees."
  },

  /* ——— 06 Graduation (before birth) ——— */
  {
    id: "chapter-graduation",
    type: "chapter",
    num: "06",
    title: "Graduation",
    body: ""
  },
  {
    id: "graduation",
    type: "photo",
    kicker: "Arizona State",
    title: "You did it",
    quote: "Long live all the magic we made",
    body: "Arizona State graduate. I have never been prouder.",
    date: "",
    image: "media/graduation.jpg",
    alt: "Graduation at Arizona State, cap and gown."
  },

  /* ——— 07 Birth of our first daughter ——— */
  {
    id: "chapter-daughter",
    type: "chapter",
    num: "07",
    title: "The birth of our first daughter",
    body: "Our girl."
  },
  {
    id: "beach-pregnant",
    type: "photo",
    kicker: "Waiting",
    title: "Already on the way",
    quote: "Give you my wild, give you a child",
    body: "You, the sea, and her already with us. I could have stood on that sand and watched you forever.",
    date: "",
    image: "media/beach-pregnant.jpg",
    alt: "Pregnant on a quiet beach, under a wide sky."
  },
  {
    id: "maternity",
    type: "gallery",
    kicker: "Christmas",
    title: "Waiting for her",
    body: "The tree, the light, and the first outline of our family.",
    date: "",
    images: [
      "media/maternity-kneel.jpg",
      "media/maternity-profile.jpg",
      "media/maternity-hand.jpg"
    ],
    alt: "Black and white silhouettes by the Christmas tree."
  },
  {
    id: "she-arrived",
    type: "gallery",
    kicker: "Our girl",
    title: "She arrived",
    quote: "Don’t you ever grow up, just stay this little",
    body: "Lauren Sophia. Asleep in her first bed, a kiss on her forehead, one week already, and home in your arms.",
    date: "",
    images: [
      "media/newborn-hospital.jpg",
      "media/newborn-studio.jpg",
      "media/one-week.jpg",
      "media/newborn-home.jpg"
    ],
    alt: "Lauren Sophia, in her first days."
  },
  {
    id: "two-month",
    type: "photo",
    kicker: "Two months",
    title: "Already everything",
    quote: "And now I see daylight",
    body: "A quiet chair, a silver two, her in your arms. I leaned in and kissed you.",
    date: "",
    image: "media/two-month.jpg",
    alt: "Two months old, held in a chair at home."
  },
  {
    id: "new-chapter",
    type: "photo",
    kicker: "In the air",
    title: "New chapter, new state",
    body: "The three of us, on our way. She slept. We were already home, in a way.",
    date: "",
    image: "media/flight.jpg",
    alt: "A family flight, a new chapter."
  },
  {
    id: "with-her",
    type: "gallery",
    kicker: "Just you two",
    title: "Her whole world",
    body: "A kiss by the bench. Then the lake, and her small hand in yours.",
    date: "",
    images: [
      "media/garden-kiss.jpg",
      "media/lake-walk.jpg"
    ],
    alt: "Kissing her by a bench, and holding her by the lake."
  },
  {
    id: "garden",
    type: "gallery",
    kicker: "Us",
    title: "The three of us",
    quote: "I had the best day with you today",
    body: "A walk through the garden, the steps, her cheek against yours. I want to remember us just like this.",
    date: "",
    images: [
      "media/garden-walk.jpg",
      "media/garden-steps.jpg",
      "media/garden-kiss-cheeks.jpg"
    ],
    alt: "Our family in the garden."
  },
  {
    id: "halloween",
    type: "photo",
    kicker: "Halloween",
    title: "Our first Halloween as three",
    quote: "I had the time of my life fighting dragons with you",
    body: "The Lion King, and a very small Simba. I will never forget this one.",
    date: "",
    image: "media/halloween.jpg",
    alt: "Family Halloween costumes: the Lion King."
  },
  {
    id: "lights-night",
    type: "photo",
    kicker: "A night of lights",
    title: "You lifted her up",
    body: "Neon in the dark, and you holding her toward the glow like she was the whole night.",
    date: "",
    image: "media/lights-night.jpg",
    alt: "Lifting our girl beside a neon guitar at a light trail."
  },
  {
    id: "next",
    type: "closing",
    kicker: "And still",
    title: "To be continued…",
    quote: "Can we always be this close?",
    body: "Every chapter is my favorite, because it’s with you. Te amo, Roli.",
    signOff: "Always yours,",
    signature: "Antonio",
    date: ""
  }
];
