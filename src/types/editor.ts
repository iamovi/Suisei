export interface EditorFile {
  id: string;
  name: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'markdown' | 'python' | 'rust' | 'java' | 'cpp' | 'go' | 'php' | 'sql' | 'json' | 'yaml';
  content: string;
}

export type FileLanguage = EditorFile['language'];

export const getFileExtension = (name: string): FileLanguage => {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'html': return 'html';
    case 'css': return 'css';
    case 'js': return 'javascript';
    case 'jsx': return 'javascript';
    case 'ts': return 'typescript';
    case 'tsx': return 'typescript';
    case 'md': return 'markdown';
    case 'py': return 'python';
    case 'rs': return 'rust';
    case 'java': return 'java';
    case 'cpp': return 'cpp';
    case 'cc': return 'cpp';
    case 'h': return 'cpp';
    case 'hpp': return 'cpp';
    case 'go': return 'go';
    case 'php': return 'php';
    case 'sql': return 'sql';
    case 'json': return 'json';
    case 'yaml': return 'yaml';
    case 'yml': return 'yaml';
    case 'xml': return 'html';
    case 'svg': return 'html';
    case 'txt': return 'markdown';
    default: return 'html';
  }
};

export const defaultFiles: EditorFile[] = [
  {
    id: 'readme-md',
    name: 'README.md',
    language: 'markdown',
    content: `# 🚀 Welcome to Suisei Studio

Suisei is a professional-grade, browser-based development environment powered by **WebContainer** technology. It provides a full Node.js runtime, terminal, and live preview—all running entirely in your browser.

## 🛠️ Quick Start

You can start coding immediately. Here are a few ways to get started:

### 1. Simple Web Page
Create an \`index.html\` file in the explorer. The preview will automatically detect it and show your work.

### 2. Node.js Project
Open the **Terminal** (icon in the top-right) and run:
\`\`\`bash
npm init -y
npm install express
\`\`\`
Then create a simple server and run it with \`node index.js\`.

### 3. Modern Frameworks
You can spin up a Vite, Next.js, or React project directly in the terminal:
\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
\`\`\`

## 💎 Features

- **Full Node.js Runtime**: Run npm, node, and any CLI tool.
- **Bi-directional Sync**: Changes in the terminal reflect in the file tree and vice-versa.
- **Live Preview**: Auto-detects static files and running servers.
- **Project Export**: Download your entire workspace as a ZIP file at any time.

---
*Suisei Studio — Built for the modern web.*`
  }
];
