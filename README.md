# Suisei Studio

**A professional, browser-based code editor and development environment powered by WebContainer.**

Suisei Studio provides a full Node.js runtime entirely within your browser — zero setup, zero installs. Write, preview, and run code instantly.

---

## ✨ Features

- **Full Code Editor** — Powered by CodeMirror 6 with VS Code-like dark/light themes
- **14 Language Support** — HTML, CSS, JS, TS, Python, Rust, Java, C++, Go, PHP, SQL, JSON, YAML, Markdown
- **Integrated Terminal** — Full shell access via WebContainer's `jsh` with ANSI color support
- **Live Preview** — Preview static HTML/CSS/JS files or running Node.js servers
- **Emmet Support** — Expand abbreviations in HTML and CSS with Tab
- **Rich Snippets** — 200+ VS Code-style snippets for JS, CSS, and HTML
- **File Explorer** — Tree-based sidebar with folder support, drag-and-drop upload, and ZIP import/export
- **Customizable Settings** — Font size, font family, tab size, cursor style, word wrap, code folding, and more
- **Dark & Light Themes** — Switch on the fly, settings persist in localStorage
- **Mobile Responsive** — Full editor/preview toggle on small screens
- **Export as ZIP** — Download your entire workspace with one click
- **Bi-directional Filesystem Sync** — Files created in terminal appear in the explorer and vice versa

## 🛠 Tech Stack

| Category       | Technology                                              |
|:--------------:|:------------------------------------------------------:|
| Framework      | React 18 + TypeScript                                   |
| Build          | Vite 5 (SWC)                                            |
| Editor Engine  | CodeMirror 6 (`@uiw/react-codemirror`)                  |
| Terminal       | XTerm.js v6 (`@xterm/xterm`)                            |
| Runtime        | WebContainer API (`@webcontainer/api`)                   |
| UI Components  | Radix UI + shadcn/ui                                    |
| Styling        | Tailwind CSS 3 + custom CSS design tokens               |
| Panels         | `react-resizable-panels`                                |
| Icons          | Lucide React + custom SVG language icons                |

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run
```bash
# Clone the repository
git clone <your-repo-url> suisei-studio
cd suisei-studio

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:8080` in a **Chromium-based browser** (Chrome, Edge, Brave).

> **Important:** WebContainer requires `Cross-Origin-Embedder-Policy: require-corp` and `Cross-Origin-Opener-Policy: same-origin` headers. These are configured automatically in `vite.config.ts` for both dev and preview modes. For production deployment, ensure your hosting provider/reverse proxy sets these headers.

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── editor/          # Core editor components
│   │   ├── CodeEditor   # CodeMirror wrapper
│   │   ├── EditorTabs   # Tab bar
│   │   ├── FileExplorer # Sidebar tree
│   │   ├── Preview      # Live preview iframe
│   │   ├── SettingsPanel # Full-screen settings
│   │   ├── Terminal     # XTerm.js wrapper
│   │   ├── Toolbar      # Top action bar
│   │   └── WelcomeScreen# Landing/splash
│   ├── icons/           # Language file icons
│   ├── ui/              # shadcn/ui components
│   └── ErrorBoundary    # Crash recovery
├── hooks/
│   ├── useEditorState   # File/tab state management
│   ├── useWebContainer  # WebContainer lifecycle
│   ├── useSettings      # Editor preferences (persisted)
│   └── useTheme         # Dark/light toggle
├── pages/
│   ├── Index            # Main editor page
│   └── NotFound         # 404 fallback
└── types/
    └── editor           # EditorFile types & language detection
```

## 🌐 Deployment Notes

WebContainer **requires** these response headers on your hosting:

```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

Platforms that support custom headers include Vercel, Netlify, Cloudflare Pages, and nginx. Without these headers, the WebContainer will fail to boot.

## 📄 License

MIT

---

*Created by [Ovi Ren](https://iamovi.github.io/)*
