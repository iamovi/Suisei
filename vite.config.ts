import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    hmr: {
      overlay: false,
    },
  },
  preview: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-codemirror': [
            '@uiw/react-codemirror',
            '@uiw/codemirror-theme-vscode',
            '@codemirror/lang-html',
            '@codemirror/lang-css',
            '@codemirror/lang-javascript',
            '@codemirror/lang-json',
            '@codemirror/lang-markdown',
            '@codemirror/autocomplete',
          ],
          'vendor-codemirror-extra': [
            '@codemirror/lang-python',
            '@codemirror/lang-rust',
            '@codemirror/lang-java',
            '@codemirror/lang-cpp',
            '@codemirror/lang-go',
            '@codemirror/lang-php',
            '@codemirror/lang-sql',
            '@codemirror/lang-yaml',
          ],
          'vendor-terminal': ['@xterm/xterm', '@xterm/addon-fit'],
          'vendor-webcontainer': ['@webcontainer/api'],
          'vendor-ui': ['lucide-react', 'sonner', 'jszip', 'file-saver', 'marked'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
