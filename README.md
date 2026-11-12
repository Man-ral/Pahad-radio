# 🏔️ Pahadi Radio

A modern ambient music experience inspired by the mountains, culture, and atmosphere of Uttarakhand.

Pahadi Radio combines **Pahadi music**, relaxing ambient sounds, animated mountain-inspired visuals, and a time-based atmosphere into a simple web experience.

## ✨ Features

- 🎵 Pahadi music through YouTube
- 🔀 Random/shuffle song playback
- ⏱️ Custom starting timestamp for each song
- 🌧️ Ambient sounds:
  - Birds
  - Rain
  - Fire
  - Wind
  - Crickets
  - Frogs
- 🌄 Uttarakhand-inspired visual atmosphere
- 🌅 Day/night atmosphere based on the current time
- ✨ Animated 3D environmental effects
- 📱 Responsive design for desktop and mobile
- 🎨 Gen-Z inspired modern UI
- 💡 Floating Uttarakhand facts

## 🛠️ Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Three.js**
- **Framer Motion**
- **Lucide React**
- **YouTube Embed**

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/pahad-radio.git
cd pahad-radio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 📁 Project Structure

```text
pahad-radio/
├── app/
├── public/
│   ├── images/
│   └── sounds/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🎵 Adding Songs

Songs are configured in the application's song list.

Each song can have:

```ts
{
  title: "Song Name",
  artist: "Artist Name",
  youtubeId: "VIDEO_ID",
  start: 85
}
```

`start` represents the starting position in seconds.

## 🔊 Adding Ambient Sounds

Ambient audio files can be placed inside:

```text
public/sounds/
```

and added to the ambient sound configuration.

## 🌄 About

Pahadi Radio is a personal project built to experiment with **Next.js, animation, Three.js, audio, and interactive UI design** while creating a digital atmosphere inspired by Uttarakhand.

## 📌 Status

🚧 **Active development**

More songs, visual effects, and interactive features may be added over time.

## 📄 License

This project is intended for personal and educational use.

Music and other third-party content remain the property of their respective owners.