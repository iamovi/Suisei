import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface EditorSettings {
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
  minimap: boolean;
  cursorBlinking: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
  cursorStyle: 'line' | 'block' | 'underline';
  bracketMatching: boolean;
  autoCloseBrackets: boolean;
  highlightActiveLine: boolean;
  foldGutter: boolean;
  fontFamily: string;
}

const defaultSettings: EditorSettings = {
  fontSize: 14,
  tabSize: 2,
  wordWrap: true,
  lineNumbers: true,
  minimap: false,
  cursorBlinking: 'blink',
  cursorStyle: 'line',
  bracketMatching: true,
  autoCloseBrackets: true,
  highlightActiveLine: true,
  foldGutter: true,
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
};

const STORAGE_KEY = 'suisei-editor-settings';

function loadSettings(): EditorSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
  } catch {
    // Silently fall back to defaults if localStorage is corrupted
  }
  return defaultSettings;
}

interface SettingsContextType {
  settings: EditorSettings;
  updateSetting: <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<EditorSettings>(loadSettings);

  const updateSetting = useCallback(<K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSettings(defaultSettings);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
