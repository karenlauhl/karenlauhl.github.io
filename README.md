# Karen's Portfolio Website

A modern, interactive React portfolio website featuring a clean minimalist design, dark mode toggle, bouncing DVD animations, and starfall effects.

## 🎨 Features

- **Clean Minimalist Design**: Plain white/dark backgrounds for maximum readability.
- **Dark Mode Toggle**: Toggle between light (white) and dark (solid dark) themes with persistent storage.
- **Interactive Animations**:
    - **Starfield**: Falling stars visible in both light (dark gray stars) and dark (white stars) modes.
    - **DVD Logo**: Bouncing DVD logo animation.
- **Flight Tracking**: Integration with FlightRadar24.
- **Visitor Tracking**: A shared visit counter plus approximate IP-based location lookup.
- **Floating Navigation**: A sleek floating bar for easy access to animations and theme toggles.

## 🛠 Tech Stack

- **React 18** - Component-based UI framework
- **CSS3** - Advanced styling with animations and variables
- **React Hooks** - State management
- **Context API** - Global state management
- **GitHub Pages** - Hosting and deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm
- A modern web browser

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/karenlauhl/karenlauhl.github.io.git
   cd karenlauhl.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```powershell
   .\dev
   ```
   (same as `npm start`)
   Opens automatically at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Put it live:**
   ```powershell
   .\ship "what I changed"
   ```
   Runs a test build, commits everything, and pushes to `main`. GitHub Actions
   then builds and publishes to https://karenlauhl.github.io (about 1–2 min).
   A plain `git commit` + `git push` to `main` deploys the same way.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar/              # Top navigation bar
│   ├── Hero/                # Hero section with title
│   ├── FlightRadar/         # Flight Radar 24 integration
│   ├── FloatingNav/         # Bottom floating navigation & toggles
│   ├── About/               # (Hidden) About me section
│   ├── Contact/             # (Hidden) Contact section
│   └── Animations/          # Animation components
│       ├── DVD/             # Bouncing DVD logo
│       └── StarField/       # Falling stars background
├── hooks/                   # Custom hooks (useDarkMode, etc.)
├── contexts/                # React Contexts (Theme, Animations)
├── App.jsx                  # Main component
└── App.css                  # Global styles and CSS variables
```

## ⚙️ Customization

### Colors (CSS Variables)
Colors are defined in `src/App.css`. The project uses a solid background system:

```css
:root {
  --color-primary: #667eea;
  --color-secondary: #764ba2;
  --color-text: #1f2937;     /* Dark gray for light mode */
  --color-bg: #ffffff;       /* Plain white background */
}

[data-theme="dark"] {
  --color-text: #e2e8f0;     /* Light gray for dark mode */
  --color-bg: #0f172a;       /* Solid dark background */
}
```

### Animations
Control animation visibility from the floating nav bar:
- **Dark Mode**: Click the sun/moon icon.
- **Starfield**: Click the star icon.
- **DVD Animation**: Click the DVD icon.

### Visitor Tracking
The site includes a visit tracker powered by an external counter service and a coarse geolocation lookup.

Optional environment variables:

- `REACT_APP_COUNTAPI_NAMESPACE` - overrides the shared counter namespace.
- `REACT_APP_COUNTAPI_KEY` - overrides the shared counter key.
- `REACT_APP_VISITOR_LOG_ENDPOINT` - your own backend endpoint for storing page-view events.

Important notes:

- Location is approximate and derived from the visitor IP address.
- Exact street-level location is not available from a normal website.
- If the external services are unavailable, the tracker falls back to a browser-local count.

## 🌙 Dark Mode

The dark mode preference is automatically saved to browser localStorage.
- **Light Mode**: Plain white background, dark text, dark gray stars.
- **Dark Mode**: Solid dark background, light text, white stars.

## 👨‍💻 Author

**Karen**
- GitHub: [@karenlauhl](https://github.com/karenlauhl)
- FlightRadar24: [Karen6099](https://my.flightradar24.com/Karen6099)

---

**Last Updated**: Nov 2026
