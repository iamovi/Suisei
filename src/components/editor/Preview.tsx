import { useMemo, useState } from 'react';
import { EditorFile } from '@/types/editor';
import { marked } from 'marked';
import { RotateCw, ExternalLink, Globe, MonitorOff } from 'lucide-react';

interface PreviewProps {
  files: EditorFile[];
  activeFile: EditorFile;
  showPreview: boolean;
  serverUrl?: string | null;
}

export function Preview({ files, activeFile, showPreview, serverUrl }: PreviewProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const htmlContent = useMemo(() => {
    if (!showPreview || serverUrl) return '';

    // If active file is markdown, render it
    if (activeFile.language === 'markdown') {
      return `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<style>
  body { 
    background: #09090b; 
    color: #e4e4e7; 
    font-family: 'Inter', system-ui, -apple-system, sans-serif; 
    padding: 2.5rem; 
    margin: 0; 
    line-height: 1.6;
  }
  .markdown-preview { max-width: 800px; margin: 0 auto; }
  h1, h2, h3 { color: #fff; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 700; }
  h1 { border-bottom: 1px solid #27272a; padding-bottom: 0.3em; font-size: 2.25rem; }
  code { background: #18181b; padding: 0.2em 0.4em; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.9em; color: #a1a1aa; }
  pre { background: #18181b; padding: 1.25rem; border-radius: 8px; overflow-x: auto; border: 1px solid #27272a; }
  pre code { background: none; padding: 0; color: #d4d4d8; }
  a { color: #6366f1; text-decoration: none; }
  a:hover { text-decoration: underline; }
  blockquote { border-left: 4px solid #3f3f46; padding-left: 1rem; color: #a1a1aa; font-style: italic; margin: 1.5rem 0; }
  img { max-width: 100%; border-radius: 8px; border: 1px solid #27272a; }
  table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
  th, td { border: 1px solid #27272a; padding: 0.75rem; text-align: left; }
  th { background: #18181b; }
</style></head>
<body><div class="markdown-preview">${marked.parse(activeFile.content)}</div></body></html>`;
    }

    // Build full page from HTML/CSS/JS files
    const htmlFile = files.find(f => f.language === 'html');
    const cssFiles = files.filter(f => f.language === 'css');
    const jsFiles = files.filter(f => f.language === 'javascript');

    if (!htmlFile) {
      return null;
    }

    let content = htmlFile.content;

    // Inject CSS
    const cssContent = cssFiles.map(f => f.content).join('\n');
    if (cssContent) {
      content = content.replace(
        /<link[^>]*rel=["']stylesheet["'][^>]*>/gi,
        ''
      );
      content = content.replace('</head>', `<style>${cssContent}</style></head>`);
    }

    // Inject JS
    const jsContent = jsFiles.map(f => f.content).join('\n');
    if (jsContent) {
      content = content.replace(
        /<script[^>]*src=["'][^"']*["'][^>]*><\/script>/gi,
        ''
      );
      content = content.replace('</body>', `<script>${jsContent}<\/script></body>`);
    }

    return content;
  }, [files, activeFile, showPreview, serverUrl]);

  if (!showPreview) return null;

  return (
    <div className="h-full w-full flex flex-col bg-background">
      {/* Preview Header / Address Bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b sidebar-border-color bg-secondary/20 h-10">
        <div className="flex-1 flex items-center gap-2 bg-background border sidebar-border-color rounded-md px-2.5 py-1 text-[11px] text-muted-foreground font-mono truncate">
          <Globe className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{serverUrl || 'Local Preview'}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground"
            title="Refresh Preview"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {serverUrl && (
            <a
              href={serverUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground"
              title="Open in New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="flex-1 relative bg-white">
        {serverUrl ? (
          <iframe
            key={refreshKey}
            src={serverUrl}
            title="Live Server Preview"
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-forms allow-popups allow-modals allow-same-origin"
          />
        ) : htmlContent ? (
          <iframe
            key={refreshKey}
            srcDoc={htmlContent}
            title="Static Preview"
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-modals"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center bg-background">
            <MonitorOff className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">No Live Preview Available</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Start a Node.js server in the terminal or create an <code className="bg-secondary px-1.5 py-0.5 rounded">index.html</code> file to see your work come to life.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
