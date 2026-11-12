"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import {
  Bird,
  Bug,
  CloudRain,
  Flame,
  Moon,
  Music2,
  Pause,
  Play,
  SkipForward,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
  Wind,
  Waves
} from "lucide-react";


// Replace or extend these with your preferred official YouTube uploads.
// Keep only the video ID (the part after v=), not the full URL.
const SONGS = [
  {
    title: "Bedu Pako",
    artist: "Uttarakhandi Folk · Chandani Enterprises",
    youtubeId: "qJO9LL_KofY",
    start:80
  },
    {
    title: "Teri Rangyali Pichodi",
    artist: "Pappu Karki",
    youtubeId: "PXD_gXBWxRA",
  },
  {
    title: "Ranikhet Ramdhola",
    artist: "Kishan Mahipal",
    youtubeId: "bOlLPbQhJeo",

  },
  {
    title: "Radha",
    artist: "Pandavas",
    youtubeId: "AoCjDPBTLpE",
    start:15
  },
  {
    title: "Rupsa",
    artist: "DigV",
    youtubeId: "hP96o39kBFc",
  },
  {
    title: "Kaile baje muruli",
    artist: "Gopal babu goswami",
    youtubeId: "ztzNYnxZlec",
    start:37
  },
  {
    title: "Phulon main bhoron mai",
    artist: "Pappu Karki",
    youtubeId: "dbYIn3FuASU",
    start:42
  },
  {
    title: "Gori Mukhuri sajili",
    artist: "Rohit chauhan",
    youtubeId: "uTzxjYwdYpY",
  },
  {
    title: "Husn Pahadon ka",
    artist: "Lata Mangeshkar",
    youtubeId: "qzRJoGPeT_Q",
    start:18
  },
  {
    title: "TERO MACHHOI GAD BAGEEGE LE",
    artist: "IDK",
    youtubeId: "VDDz48Slz4A",
    start:30
  },
  {
    title: "Saruli",
    artist: "Preetam bhartwan",
    youtubeId: "tpWtbPFHB1I",
    start:105
  },
  {
    title: "Tu Ae Ja Au Pahad",
    artist: "BK sawant",
    youtubeId: "SlA-hR7AvVQ",
    start:56
  },
  {
    title: "Dev Nagri",
    artist: "Team evo",
    youtubeId: "NTUiVcaksE4",
    start:27
  },
  {
    title: "Pahadi",
    artist: "Nupur Pant",
    youtubeId: "mxnsYbab08U",
    start:45
  },
  {
    title: "Din Bisre",
    artist: "Rakesh Manral",
    youtubeId: "kpdzW1bRl5s",
  },
  {
    title: "Chori Lachima",
    artist: "Anil Rawat",
    youtubeId: "YEhiEZFPEEQ",
    start:15
  },
  
  
];

const FACTS = [
  "Uttarakhand was formed on 9 November 2000 as the 27th state of India.",
"Originally named Uttaranchal, the state was officially renamed Uttarakhand in January 2007.",
"The state is divided into two distinct administrative and cultural regions: Garhwal and Kumaon.",
"Dehradun serves as the winter capital of Uttarakhand, while Gairsain is its summer capital.",
"Uttarakhand is widely referred to as 'Devbhumi' or the 'Land of the Gods' due to its numerous Hindu temples and pilgrimage centers.",
"It is the only state in India that has Sanskrit as one of its official languages alongside Hindi.",
"Nanda Devi, at 7,816 meters, is the highest peak located entirely within India and the second-highest in the country overall.",
"The Valley of Flowers National Park is a UNESCO World Heritage Site renowned for its endemic alpine flora.",
"Nanda Devi National Park also holds UNESCO World Heritage status and shares a biosphere reserve with the Valley of Flowers.",
"The Chipko movement, an iconic forest conservation protest where villagers hugged trees to prevent logging, began in Uttarakhand in the 1970s.",
"The Gaura Devi-led Chipko protest in Reni village (Chamoli district) in 1974 became a defining moment for grassroots environmentalism in India.",
"Jim Corbett National Park, established in 1936 as Hailey National Park, is the oldest national park in mainland Asia.",
"Project Tiger was officially launched at Jim Corbett National Park in 1973 to protect the Bengal tiger.",
"The Gangotri Glacier in Uttarkashi district is the primary source of the River Ganga, which begins there as the Bhagirathi.",
"The Yamunotri Glacier in the Bandarpunch peaks is the source of the River Yamuna.",
"Devprayag is the sacred confluence where the Alaknanda and Bhagirathi rivers merge to officially take the name Ganga.",
"The Panch Prayag refers to the five sacred river confluences in the Garhwal Himalayas: Vishnuprayag, Nandaprayag, Karnaprayag, Rudraprayag, and Devprayag.",
"The Chota Char Dham pilgrimage circuit in Uttarakhand consists of Yamunotri, Gangotri, Kedarnath, and Badrinath.",
"Kedarnath Temple is one of the twelve sacred Jyotirlingas dedicated to Lord Shiva.",
"Badrinath Temple is one of the 108 Divya Desams dedicated to Lord Vishnu and is part of India's main Char Dham circuit.",
"Hemkund Sahib, located in Chamoli district at over 4,300 meters, is one of the highest Sikh Gurudwaras in the world.",
"Haridwar is one of the four cities in India that host the Kumbh Mela every twelve years.",
"Rishikesh is globally recognized as the 'Yoga Capital of the World' and is famous for the Lakshman Jhula and Ram Jhula suspension bridges.",
"Tehri Dam, built on the Bhagirathi River, is the tallest dam in India at 260.5 meters.",
"Roopkund Lake, situated at an altitude of about 5,029 meters, is famously known as 'Skeleton Lake' due to hundreds of ancient human skeletons found around its edge.",
"Bhimtal Lake in the Kumaon region is larger than Nainital Lake and features a small island with an aquarium at its center.",
"Nainital is built around the pear-shaped Naini Lake and is one of the most popular hill stations in North India.",
"Mussoorie, located near Dehradun, is affectionately known as the 'Queen of the Hills'.",
"Almora is a horseshoe-shaped hill town famous for its cultural heritage, handicrafts, and distinctive sweets like Bal Mithai.",
"Auli in Chamoli district is India's premier skiing destination, offering panoramic views of Nanda Devi and Mana Parvat.",
"The Tungnath Temple in Rudraprayag district, situated at 3,680 meters, is the highest Shiva temple in the world.",
"Panch Kedar comprises five revered Shiva temples in Garhwal: Kedarnath, Tungnath, Rudranath, Madhyamaheshwar, and Kalpeshwar.",
"Jageshwar Dham near Almora is a cluster of over 100 ancient stone temples dating back to the 7th to 12th centuries.",
"Katarmal Sun Temple near Almora is a rare 9th-century temple dedicated to the Sun God, Surya.",
"The Kumaoni and Garhwali languages are the primary regional languages spoken across the hills of Uttarakhand.",
"Aipan is a traditional ritualistic folk art from Kumaon, painted using white rice paste on red-ochre surfaces.",
"Chholiya is a traditional sword dance performed in the Kumaon region during weddings and auspicious processions.",
"The Nanda Devi Raj Jat Yatra is a grand three-week pilgrimage held once every twelve years in honor of Goddess Nanda Devi.",
"The state animal of Uttarakhand is the Alpine Musk Deer, known for its distinctive scent gland.",
"The Himalayan Monal, a brightly colored pheasant, is the state bird of Uttarakhand.",
"Brahma Kamal, a rare high-altitude lotus that blooms at night, is the state flower of Uttarakhand.",
"Buransh (Rhododendron arboreum), famous for its vibrant red flowers and refreshing juice, is the state tree of Uttarakhand.",
"Forests cover more than 45 percent of Uttarakhand's total geographical area.",
"Uttarakhand shares international borders with China (Tibet) to the north and Nepal to the east.",
"Mana village near Badrinath is celebrated as the 'First Indian Village' near the Indo-Tibetan border.",
"The Indian Military Academy (IMA) in Dehradun trains officer cadets for the Indian Army.",
"The Forest Research Institute (FRI) in Dehradun is one of the oldest forestry institutions in the world, housed in a grand Greco-Roman style building.",
"Bachendri Pal, who became the first Indian woman to climb Mount Everest in 1984, hails from Nakuri village in Uttarkashi.",
"Ruskin Bond, one of India's most beloved authors, has lived in Landour near Mussoorie for decades and frequently sets his stories in the Garhwal hills.",
"Kafal (box myrtle) and Buransh squash are iconic seasonal delicacies native to the hills of Uttarakhand.",
"Kafuli, Bhatt ki Churkani, and Aloo ke Gutke are signature dishes of traditional Garhwali and Kumaoni cuisine.",
"The Beatles visited Maharishi Mahesh Yogi's ashram in Rishikesh in 1968, where they wrote dozens of songs including much of 'The White Album'."
];

const AMBIENCE = [
  { id: "birds", label: "Birds", src: "/sounds/birds.mp3", Icon: Bird },
  { id: "rain", label: "Rain", src: "/sounds/rain.mp3", Icon: CloudRain },
  { id: "fire", label: "Fire", src: "/sounds/fire.mp3", Icon: Flame },
  { id: "wind", label: "Wind", src: "/sounds/wind.mp3", Icon: Wind },
  { id: "crickets", label: "Crickets", src: "/sounds/crickets.mp3", Icon: Bug },
  { id: "frog", label: "Frog", src: "/sounds/frog.mp3", Icon: Waves },
] as const;

type AmbientId = (typeof AMBIENCE)[number]["id"];
type ActiveSounds = Record<AmbientId, boolean>;

function getScene(hour: number | null) {
  if (hour === null) {
    return { name: "Finding the pahad", label: "A little mountain air", kind: "dawn" };
  }
  if (hour >= 5 && hour < 10) {
    return { name: "Mountain morning", label: "First light over the hills", kind: "morning" };
  }
  if (hour >= 10 && hour < 17) {
    return { name: "Pahadi daylight", label: "A bright day in the valley", kind: "day" };
  }
  if (hour >= 17 && hour < 20) {
    return { name: "Golden hour", label: "Sunset settling on the hills", kind: "sunset" };
  }
  return { name: "Pahad after dark", label: "Quiet hills, warm firelight", kind: "night" };
}

const EMPTY_SOUNDS: ActiveSounds = {
  birds: false,
  rain: false,
  fire: false,
  wind: false,
  crickets: false,
  frog: false
};

export default function Home() {
  const [currentHour, setCurrentHour] = useState<number | null>(null);
  const [time, setTime] = useState("--:--");
  const [songIndex, setSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [activeSounds, setActiveSounds] = useState<ActiveSounds>(EMPTY_SOUNDS);
  const [ambientVolume, setAmbientVolume] = useState(0.4);
  const [nightOverride, setNightOverride] = useState<boolean | null>(null);
  const [audioError, setAudioError] = useState("");
  const audioRefs = useRef<Partial<Record<AmbientId, HTMLAudioElement>>>({});

  // Read the clock after mount. This avoids using new Date() during prerender.
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now)
      );
    };

    updateClock();
    const interval = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFactIndex((previous) => (previous + 1) % FACTS.length);
    }, 12_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) audio.volume = ambientVolume;
    });
  }, [ambientVolume]);

  useEffect(() => {
    const audioElements = audioRefs.current;
    return () => {
      Object.values(audioElements).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  const scene = useMemo(() => getScene(currentHour), [currentHour]);
  const automaticNight = scene.kind === "night";
  const isNight = nightOverride ?? automaticNight;
  const currentSong = SONGS[songIndex];
  const activeCount = Object.values(activeSounds).filter(Boolean).length;

  const toggleAmbient = async (id: AmbientId, src: string) => {
    let audio = audioRefs.current[id];

    if (!audio) {
      audio = new Audio(src);
      audio.loop = true;
      audio.preload = "none";
      audio.volume = ambientVolume;
      audioRefs.current[id] = audio;
    }

    if (!audio.paused) {
  audio.pause();
  audio.load();

  setActiveSounds((previous) => ({
    ...previous,
    [id]: false,
  }));

  setAudioError("");
  return;
}

    try {
      audio.load();
      await audio.play();
      setActiveSounds((previous) => ({ ...previous, [id]: true }));
      setAudioError("");
    } catch {
      setActiveSounds((previous) => ({ ...previous, [id]: false }));
      setAudioError(`Couldn't play ${id}. Check that public/sounds/${id}.mp3 exists.`);
    }
  };

  // const changeSong = (direction: 1 | -1) => {
  //   setSongIndex((previous) => (previous + direction + SONGS.length) % SONGS.length);
  //   setPlaying(true);
  // };
  const playRandomNext = () => {
  if (SONGS.length <= 1) return;

  const availableIndexes = SONGS
    .map((_, index) => index)
    .filter((index) => index !== songIndex);

  const randomIndex =
    availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

  setSongIndex(randomIndex);
  setPlaying(true);
};

  const surpriseMe = () => {
    if (SONGS.length > 1) {
      setSongIndex((previous) => {
        let next = Math.floor(Math.random() * SONGS.length);
        if (next === previous) next = (next + 1) % SONGS.length;
        return next;
      });
      setPlaying(true);
    }
    setFactIndex(Math.floor(Math.random() * FACTS.length));
  };

  const displayScene = isNight ? "night" : scene.kind === "night" ? "dawn" : scene.kind;

  return (
    <div className={`pahadi-shell scene-${displayScene} ${isNight ? "night-mode" : ""}`}>
      <div className="backdrop" aria-hidden="true">
        <div className="sky-glow" />
        <div className="mountain mountain-back" />
        <div className="mountain mountain-front" />
        <div className="stars" />
      </div>

      {/* Real 3D ambient objects; they remain visual-only and do not block controls. */}
      <ThreeAtmosphere activeSounds={activeSounds} isNight={isNight} />
      {(activeSounds.fire || isNight) && <div className="fire-ambience-glow" aria-hidden="true" />}

      <header className="topbar">
        <a className="brand" href="#home" aria-label="Pahadi Radio home">
          <span className="brand-mark"><Music2 size={18} /></span>
          <span>PAHADI <b>RADIO</b></span>
        </a>

        <div className="topbar-right">
          <span className="live-indicator"><i /> listening room</span>
          <span className="clock">{time}</span>
          <button
            className={`icon-button night-button ${isNight ? "selected" : ""}`}
            onClick={() => setNightOverride(!isNight)}
            aria-label={isNight ? "Turn night mode off" : "Turn night mode on"}
            title={isNight ? "Turn night mode off" : "Turn night mode on"}
          >
            {isNight ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </header>

      <main id="home" className="main-grid">
        <section className="hero-column">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="eyebrow"><span /> A little piece of the mountains</div>
            <h1>Find your<br /><em>pahad</em> frequency.</h1>
            <p className="hero-description">
              Folk sounds, mountain air and slow moments. Tune in, close your eyes,
              and let the hills find you.
            </p>
            <div className="scene-caption">
              <span className="scene-icon">{isNight ? <Moon size={15} /> : <Sun size={15} />}</span>
              <span><b>{isNight ? "Night in the hills" : scene.name}</b><small>{isNight ? "A fire is glowing somewhere nearby" : scene.label}</small></span>
            </div>
          </motion.div>

          <motion.section
            className="now-playing-card glass-panel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.65 }}
            aria-label="Music controls"
          >
            <div className="record-art"><Music2 size={26} /><span /></div>
            <div className="track-info">
              <span className="overline">NOW TUNING IN</span>
              <strong>{currentSong.title}</strong>
              <small>{currentSong.artist}</small>
            </div>
            <div className="track-controls">
              <button
                className="play-button"
                onClick={() => setPlaying((previous) => !previous)}
                aria-label={playing ? "Pause YouTube player" : "Play YouTube player"}
              >
                {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
              <button className="skip-button" onClick={playRandomNext} aria-label="Next song">
                <SkipForward size={18} />
              </button>
            </div>
          </motion.section>

          <motion.section
            className="ambient-panel glass-panel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.65 }}
          >
            <div className="panel-heading">
              <div>
                <span className="overline">BUILD YOUR ATMOSPHERE</span>
                <h2>Layer the little things</h2>
              </div>
              <span className="active-count">{activeCount} ON</span>
            </div>

            <div className="ambient-grid">
              {AMBIENCE.map(({ id, label, src, Icon }) => (
                <button
                  key={id}
                  className={`ambient-button ambient-${id} ${activeSounds[id] ? "active" : ""}`}
                  onClick={() => void toggleAmbient(id, src)}
                  aria-pressed={activeSounds[id]}
                >
                  <span className="ambient-icon"><Icon size={19} strokeWidth={1.8} /></span>
                  <span>{label}</span>
                  <i className="ambient-dot" />
                </button>
              ))}
            </div>

            <div className="volume-row">
              <Volume2 size={15} />
              <input
                aria-label="Ambient sound volume"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={ambientVolume}
                onChange={(event) => setAmbientVolume(Number(event.target.value))}
              />
              <span>{Math.round(ambientVolume * 100)}%</span>
            </div>
            {audioError && <p className="audio-error">{audioError}</p>}
          </motion.section>
        </section>

        <aside className="side-column">
          <motion.section
            className="youtube-panel glass-panel"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
          >
            <div className="panel-heading compact-heading">
              <div>
                <span className="overline">THE MUSIC WINDOW</span>
                <h2>Playing from YouTube</h2>
              </div>
              <span className="youtube-label">YOUTUBE</span>
            </div>
            <div className="video-frame">
              <iframe
                key={`${currentSong.youtubeId}-${playing ? "play" : "pause"}`}
                src={`https://www.youtube-nocookie.com/embed/${currentSong.youtubeId}?autoplay=${playing ? 1 : 0}&controls=1&rel=0&playsinline=1&start=${currentSong.start ?? 0}`}
                title={`${currentSong.title} by ${currentSong.artist}`}
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="video-caption">
              <span className="youtube-dot" /> Official YouTube player · compact view
            </div>
          </motion.section>

          <motion.section
            className="fact-panel glass-panel"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 0.7 }}
          >
            <div className="fact-topline"><Sparkles size={15} /> A LITTLE PAHADI FACT</div>
            <AnimatePresence mode="wait">
              <motion.p
                key={factIndex}
                className="fact-text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                “{FACTS[factIndex]}”
              </motion.p>
            </AnimatePresence>
            <div className="fact-footer"><span /> LITTLE STORIES FROM THE HILLS</div>
          </motion.section>

          <motion.button
            className="surprise-button"
            onClick={surpriseMe}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={16} /> Surprise me <span>↗</span>
          </motion.button>

          <div className="side-note"><VolumeX size={13} /> Music and ambience can play together.</div>
        </aside>
      </main>

      <footer className="footer-note">
        <span>MADE WITH A LITTLE MOUNTAIN SOUL</span>
        <span>गढ़वाल · कुमाऊँ · उत्तराखंड</span>
      </footer>
    </div>
  );
}

type ThreeAtmosphereProps = {
  activeSounds: ActiveSounds;
  isNight: boolean;
};

function ThreeAtmosphere({ activeSounds, isNight }: ThreeAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birdsOn = activeSounds.birds;
  const rainOn = activeSounds.rain;
  const fireOn = activeSounds.fire || isNight;
  const windOn = activeSounds.wind;
  const cricketsOn = activeSounds.crickets;
  const frogOn = activeSounds.frog;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || (!birdsOn && !rainOn && !fireOn && !windOn && !cricketsOn && !frogOn)) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      // The rest of the page remains usable if WebGL is unavailable.
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const worldHeight = 14;
    let worldWidth = worldHeight * (window.innerWidth / window.innerHeight);
    const camera = new THREE.OrthographicCamera(
      -worldWidth / 2,
      worldWidth / 2,
      worldHeight / 2,
      -worldHeight / 2,
      0.1,
      100
    );
    camera.position.set(0, 0, 30);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));

    const birdModels: Array<{
      group: THREE.Group;
      leftWing: THREE.Mesh;
      rightWing: THREE.Mesh;
      speed: number;
      start: number;
      baseY: number;
      phase: number;
    }> = [];

    if (birdsOn) {
      const birdColor = isNight ? 0xe7e1d3 : 0x1b302e;
      for (let index = 0; index < 6; index += 1) {
        const group = new THREE.Group();
        const bodyMaterial = new THREE.MeshBasicMaterial({ color: birdColor });
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), bodyMaterial);
        body.scale.set(1.25, 0.66, 0.58);
        group.add(body);

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 8), bodyMaterial);
        head.position.set(0.17, 0.09, 0.015);
        group.add(head);

        const wingMaterial = new THREE.MeshBasicMaterial({ color: birdColor, side: THREE.DoubleSide });
        const wingGeometry = new THREE.SphereGeometry(0.22, 10, 7);
        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.scale.set(1.35, 0.13, 0.45);
        leftWing.position.set(-0.08, 0.06, 0.02);
        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.scale.set(1.35, 0.13, 0.45);
        rightWing.position.set(0.08, 0.06, -0.02);
        group.add(leftWing, rightWing);
        group.scale.setScalar(0.8 + index * 0.13);
        scene.add(group);
        birdModels.push({
          group,
          leftWing,
          rightWing,
          speed: 1.05 + index * 0.22,
          start: index * 4.5,
          baseY: worldHeight * (0.2 - index * 0.055),
          phase: index * 1.7,
        });
      }
    }

    let rainGeometry: THREE.BufferGeometry | null = null;
    let rainPositions: Float32Array | null = null;
    const rainCount = 145;
    if (rainOn) {
      rainPositions = new Float32Array(rainCount * 6);
      for (let index = 0; index < rainCount; index += 1) {
        const offset = index * 6;
        const x = (Math.random() - 0.5) * worldWidth;
        const y = (Math.random() - 0.5) * worldHeight;
        const z = -1 + Math.random() * 2;
        rainPositions[offset] = x;
        rainPositions[offset + 1] = y;
        rainPositions[offset + 2] = z;
        rainPositions[offset + 3] = x + 0.07;
        rainPositions[offset + 4] = y - 0.26;
        rainPositions[offset + 5] = z;
      }
      rainGeometry = new THREE.BufferGeometry();
      rainGeometry.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3));
      const rain = new THREE.LineSegments(
        rainGeometry,
        new THREE.LineBasicMaterial({ color: 0xc8e4f1, transparent: true, opacity: 0.52 })
      );
      scene.add(rain);
    }

    const fireFlames: Array<{ mesh: THREE.Mesh; phase: number; baseY: number }> = [];
    const embers: Array<{ mesh: THREE.Mesh; speed: number; phase: number }> = [];
    let fireGroupRef: THREE.Group | null = null;
    if (fireOn) {
      const fireGroup = new THREE.Group();
      fireGroupRef = fireGroup;
      fireGroup.position.set(worldWidth * 0.34, -worldHeight * 0.37, 0);
      scene.add(fireGroup);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(1.12, 20, 14),
        new THREE.MeshBasicMaterial({ color: 0xff6827, transparent: true, opacity: 0.13, depthWrite: false })
      );
      halo.scale.set(1.75, 0.78, 0.42);
      halo.position.set(0, 0.62, -0.6);
      fireGroup.add(halo);
      scene.add(new THREE.PointLight(0xff6a2d, 2.2, 7));
      const light = scene.children[scene.children.length - 1] as THREE.PointLight;
      light.position.set(fireGroup.position.x, fireGroup.position.y + 0.8, 2);

      const flameSpecs = [
        { x: -0.38, height: 1.25, radius: 0.27, color: 0xff5a1f, opacity: 0.78 },
        { x: 0.02, height: 1.65, radius: 0.34, color: 0xff8a25, opacity: 0.86 },
        { x: 0.37, height: 1.12, radius: 0.25, color: 0xff4a19, opacity: 0.78 },
        { x: 0.08, height: 0.94, radius: 0.18, color: 0xffdf83, opacity: 0.9 },
      ];
      flameSpecs.forEach((spec, index) => {
        const mesh = new THREE.Mesh(
          new THREE.ConeGeometry(spec.radius, spec.height, 10),
          new THREE.MeshBasicMaterial({ color: spec.color, transparent: true, opacity: spec.opacity })
        );
        mesh.position.set(spec.x, spec.height / 2 + 0.08, 0.1 + index * 0.02);
        fireGroup.add(mesh);
        fireFlames.push({ mesh, phase: index * 1.4, baseY: spec.height / 2 + 0.08 });
      });

      const logMaterial = new THREE.MeshBasicMaterial({ color: 0x513326 });
      const logA = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 1.12, 8), logMaterial);
      logA.rotation.z = Math.PI / 2.8;
      logA.position.set(0, 0.05, 0.35);
      const logB = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 1.05, 8), logMaterial);
      logB.rotation.z = -Math.PI / 2.8;
      logB.position.set(0, 0.05, 0.42);
      fireGroup.add(logA, logB);

      const emberGeometry = new THREE.SphereGeometry(0.025, 6, 5);
      for (let index = 0; index < 24; index += 1) {
        const ember = new THREE.Mesh(
          emberGeometry,
          new THREE.MeshBasicMaterial({ color: index % 3 === 0 ? 0xffe0a0 : 0xff7a2b })
        );
        ember.position.set((Math.random() - 0.5) * 0.8, Math.random() * 1.5, 0.5);
        fireGroup.add(ember);
        embers.push({ mesh: ember, speed: 0.25 + Math.random() * 0.55, phase: Math.random() * 6 });
      }
    }

    let windGroup: THREE.Group | null = null;
    if (windOn) {
      windGroup = new THREE.Group();
      for (let lane = 0; lane < 4; lane += 1) {
        const y = (lane - 1.5) * 1.05;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-4.5, y, 0),
          new THREE.Vector3(-2.2, y + 0.35, 0.12),
          new THREE.Vector3(0.2, y - 0.22, 0),
          new THREE.Vector3(2.7, y + 0.28, -0.1),
          new THREE.Vector3(4.8, y, 0),
        ]);
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 32, 0.012 + (lane % 2) * 0.006, 5, false),
          new THREE.MeshBasicMaterial({ color: 0xf0f2e8, transparent: true, opacity: 0.35 - lane * 0.035 })
        );
        windGroup.add(tube);
      }
      scene.add(windGroup);
    }

    const cricketModels: Array<{ group: THREE.Group; phase: number }> = [];
    if (cricketsOn) {
      const shellMaterial = new THREE.MeshStandardMaterial({ color: 0x6d8060, roughness: 0.7, metalness: 0.12 });
      const legMaterial = new THREE.MeshBasicMaterial({ color: 0x8b9b72 });
      for (let index = 0; index < 2; index += 1) {
        const group = new THREE.Group();
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 8), shellMaterial);
        body.scale.set(1.45, 0.65, 0.8);
        group.add(body);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.075, 9, 7), shellMaterial);
        head.position.set(0.2, 0.025, 0);
        group.add(head);
        for (let leg = 0; leg < 6; leg += 1) {
          const side = leg % 2 === 0 ? 1 : -1;
          const segment = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.02, 0.28, 5), legMaterial);
          segment.position.set((Math.floor(leg / 2) - 1) * 0.11, -0.13, side * 0.11);
          segment.rotation.z = side * (0.48 + (leg % 3) * 0.18);
          segment.rotation.x = side * 0.4;
          group.add(segment);
        }
        group.position.set(-worldWidth * 0.28 + index * 0.58, -worldHeight * 0.38, 0.3);
        group.scale.setScalar(index === 0 ? 1 : 0.76);
        scene.add(group);
        cricketModels.push({ group, phase: index * 1.8 });
      }
    }
    const frogModels: Array<{
  group: THREE.Group;
  head: THREE.Mesh;
  baseY: number;
}> = [];

if (frogOn) {
  const frog = new THREE.Group();

  const green = new THREE.MeshStandardMaterial({ color: 0x78b94e });
  const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const black = new THREE.MeshBasicMaterial({ color: 0x172017 });

  // Body
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 16, 12),
    green
  );
  body.scale.set(1.35, 0.75, 1);
  frog.add(body);

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 12),
    green
  );
  head.position.set(0, 0.15, 0.13);
  frog.add(head);

  // Eyes and legs
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 12, 10),
      white
    );
    eye.position.set(side * 0.11, 0.29, 0.19);
    frog.add(eye);

    const pupil = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 10, 8),
      black
    );
    pupil.position.set(side * 0.11, 0.29, 0.245);
    frog.add(pupil);

    const leg = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 12, 10),
      green
    );
    leg.scale.set(1.3, 0.7, 1);
    leg.position.set(side * 0.22, -0.13, 0.04);
    frog.add(leg);

    const foot = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 10, 8),
      green
    );
    foot.position.set(side * 0.27, -0.19, 0.17);
    frog.add(foot);
  }

  frog.scale.setScalar(0.75);

  const baseY = -worldHeight * 0.37;
  frog.position.set(-worldWidth * 0.18, baseY, 0.5);

  scene.add(frog);
  frogModels.push({ group: frog, head, baseY });
}
    const clock = new THREE.Clock();
    const resize = () => {
      worldWidth = worldHeight * (window.innerWidth / window.innerHeight);
      camera.left = -worldWidth / 2;
      camera.right = worldWidth / 2;
      camera.top = worldHeight / 2;
      camera.bottom = -worldHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      if (fireGroupRef) fireGroupRef.position.x = worldWidth * 0.34;
    };
    window.addEventListener("resize", resize);

    renderer.setAnimationLoop(() => {
      const elapsed = clock.getElapsedTime();
      birdModels.forEach((bird) => {
        const travel = (elapsed * bird.speed + bird.start) % (worldWidth + 4);
        bird.group.position.x = -worldWidth / 2 - 2 + travel;
        bird.group.position.y = bird.baseY + Math.sin(elapsed * 1.4 + bird.phase) * 0.18;
        bird.leftWing.rotation.z = Math.sin(elapsed * 8 + bird.phase) * 0.48;
        bird.rightWing.rotation.z = -Math.sin(elapsed * 8 + bird.phase) * 0.48;
      });

      if (rainPositions && rainGeometry) {
        for (let index = 0; index < rainCount; index += 1) {
          const offset = index * 6;
          let y = rainPositions[offset + 1] - 0.16 - (index % 4) * 0.025;
          if (y < -worldHeight / 2 - 0.4) y = worldHeight / 2 + Math.random() * 1.5;
          rainPositions[offset + 1] = y;
          rainPositions[offset + 4] = y - 0.26;
        }
        const positionAttribute = rainGeometry.getAttribute("position") as THREE.BufferAttribute;
        positionAttribute.needsUpdate = true;
      }

      fireFlames.forEach((flame) => {
        const pulse = Math.sin(elapsed * 5.3 + flame.phase);
        flame.mesh.scale.set(0.9 + pulse * 0.09, 0.86 + Math.abs(pulse) * 0.27, 0.9);
        flame.mesh.rotation.z = Math.sin(elapsed * 3.8 + flame.phase) * 0.08;
        flame.mesh.position.y = flame.baseY + Math.sin(elapsed * 4.5 + flame.phase) * 0.035;
      });
      embers.forEach((ember) => {
        ember.mesh.position.y += ember.speed * 0.018;
        ember.mesh.position.x += Math.sin(elapsed * 2 + ember.phase) * 0.0018;
        if (ember.mesh.position.y > 2.35) {
          ember.mesh.position.y = 0.12;
          ember.mesh.position.x = (Math.random() - 0.5) * 0.8;
        }
      });
      if (windGroup) {
        windGroup.position.x = ((elapsed * 0.75) % (worldWidth + 10)) - worldWidth / 2 - 5;
        windGroup.position.y = Math.sin(elapsed * 0.45) * 0.18;
      }
      cricketModels.forEach((cricket) => {
        cricket.group.position.y = -worldHeight * 0.38 + Math.sin(elapsed * 6 + cricket.phase) * 0.035;
        cricket.group.rotation.z = Math.sin(elapsed * 3 + cricket.phase) * 0.055;
      });
      frogModels.forEach(({ group, head, baseY }) => {
  const hop = Math.max(0, Math.sin(elapsed * 1.8)) * 0.06;

  group.position.y = baseY + hop;
  head.rotation.z = Math.sin(elapsed * 1.5) * 0.04;
});

      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener("resize", resize);
      renderer.setAnimationLoop(null);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, [birdsOn, rainOn, fireOn, windOn, cricketsOn, frogOn,isNight]);

  return <canvas ref={canvasRef} className="three-atmosphere" aria-hidden="true" />;
}
