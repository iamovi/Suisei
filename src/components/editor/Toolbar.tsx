import { Play, Eye, EyeOff, PanelLeft, Code2, Monitor, Sun, Moon, Download, SquareTerminal } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { EditorFile } from '@/types/editor';
import { SettingsPanel } from './SettingsPanel';

interface ToolbarProps {
  showPreview: boolean;
  showExplorer: boolean;
  showTerminal: boolean;
  onTogglePreview: () => void;
  onToggleExplorer: () => void;
  onToggleTerminal: () => void;
  onRun: () => void;
  isMobile: boolean;
  mobileView: 'editor' | 'preview';
  onToggleMobileView: () => void;
  files: EditorFile[];
}

export function Toolbar({
  showPreview,
  showExplorer,
  showTerminal,
  onTogglePreview,
  onToggleExplorer,
  onToggleTerminal,
  onRun,
  isMobile,
  mobileView,
  onToggleMobileView,
  files,
}: ToolbarProps) {
  const { theme, toggleTheme } = useTheme();

  const handleExportZip = async () => {
    const zip = new JSZip();
    files.forEach(file => {
      zip.file(file.name, file.content);
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'suisei-project.zip');
  };

  return (
    <div className="flex items-center justify-between h-11 px-3 toolbar-surface border-b toolbar-border">
      <div className="flex items-center gap-1.5">
        {!isMobile && (
          <button
            onClick={onToggleExplorer}
            className={`toolbar-btn ${showExplorer ? 'toolbar-btn-active' : ''}`}
            title="Toggle Explorer"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
        <div className="flex items-center gap-2 ml-1">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-foreground/90 to-foreground/50 flex items-center justify-center">
            <span className="text-xs font-bold text-background">ス</span>
          </div>
          <span className="text-sm font-bold tracking-tight toolbar-text">Suisei</span>
        </div>

        {/* Mobile view toggle — on the left, away from Run */}
        {isMobile && (
          <button
            onClick={onToggleMobileView}
            className="toolbar-btn flex items-center gap-1.5 px-2.5 ml-2"
          >
            {mobileView === 'editor' ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Preview</span>
              </>
            ) : (
              <>
                <Code2 className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Editor</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={toggleTheme}
          className="toolbar-btn"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          onClick={handleExportZip}
          className="toolbar-btn"
          title="Download as ZIP"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Settings */}
        <SettingsPanel />

        {!isMobile && (
          <>
            <button
              onClick={onToggleTerminal}
              className={`toolbar-btn ${showTerminal ? 'toolbar-btn-active' : ''}`}
              title="Toggle Terminal"
            >
              <SquareTerminal className="w-4 h-4" />
            </button>

            <button
              onClick={onTogglePreview}
              className={`toolbar-btn ${showPreview ? 'toolbar-btn-active' : ''}`}
              title="Toggle Preview"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </>
        )}

        <button
          onClick={onRun}
          className="run-btn"
          title="Run Preview"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Run</span>
        </button>
      </div>
    </div>
  );
}
