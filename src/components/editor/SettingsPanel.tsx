import { Settings, RotateCcw, Sun } from 'lucide-react';
import { useState } from 'react';
import { useSettings, EditorSettings } from '@/hooks/useSettings';

export function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const { settings, updateSetting, resetSettings } = useSettings();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="toolbar-btn"
        title="Editor Settings"
      >
        <Settings className="w-4 h-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] bg-background animate-in fade-in duration-300 overflow-y-auto">
          {/* Main Container */}
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between px-6 py-5 border-b settings-panel-border bg-background z-10">
              <div className="max-w-4xl mx-auto w-full flex items-center justify-between px-4">
                <div>
                  <h2 className="text-2xl font-bold settings-text">Settings</h2>
                  <p className="text-xs settings-text-muted mt-0.5">Customize your editor experience</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={resetSettings}
                    className="toolbar-btn hidden md:flex items-center gap-2 px-4 py-2 text-xs font-semibold border settings-panel-border bg-foreground/[0.03] hover:bg-foreground/[0.08] rounded-xl"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Defaults</span>
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-foreground/[0.05] hover:bg-foreground/[0.1] transition-all text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 md:p-12">
              <div className="max-w-4xl mx-auto space-y-16">
                {/* Appearance Section */}
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sun className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Appearance</h3>
                      <p className="text-xs text-muted-foreground">Customize how Suisei looks and feels</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <SettingRow label="Font Family" description="Choose a typeface for the editor">
                      <select
                        value={settings.fontFamily}
                        onChange={e => updateSetting('fontFamily', e.target.value)}
                        className="settings-select h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace">JetBrains Mono</option>
                        <option value="'Fira Code', 'Cascadia Code', monospace">Fira Code</option>
                        <option value="'Cascadia Code', 'Consolas', monospace">Cascadia Code</option>
                        <option value="'Source Code Pro', monospace">Source Code Pro</option>
                        <option value="'SF Mono', 'Monaco', monospace">SF Mono</option>
                        <option value="'Consolas', monospace">Consolas</option>
                        <option value="monospace">System Mono</option>
                      </select>
                    </SettingRow>

                    <SettingRow label="Font Size" description={`Scaling: ${settings.fontSize}px`}>
                      <div className="flex items-center gap-6 h-12">
                        <input
                          type="range"
                          min={10}
                          max={32}
                          value={settings.fontSize}
                          onChange={e => updateSetting('fontSize', Number(e.target.value))}
                          className="flex-1 accent-primary h-1.5 rounded-full bg-muted appearance-none cursor-pointer"
                        />
                        <span className="text-sm font-mono font-bold w-10 text-right text-foreground">{settings.fontSize}</span>
                      </div>
                    </SettingRow>
                  </div>
                </section>

                <div className="h-px bg-border/50" />

                {/* Editor Behavior Section */}
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Editor Behavior</h3>
                      <p className="text-xs text-muted-foreground">Adjust how the editor interacts with you</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <SettingRow label="Tab Size" description="Indentation width">
                      <select
                        value={settings.tabSize}
                        onChange={e => updateSetting('tabSize', Number(e.target.value))}
                        className="settings-select h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20"
                      >
                        <option value={2}>2 spaces</option>
                        <option value={4}>4 spaces</option>
                        <option value={8}>8 spaces</option>
                      </select>
                    </SettingRow>

                    <SettingRow label="Cursor Style" description="Visual shape">
                      <select
                        value={settings.cursorStyle}
                        onChange={e => updateSetting('cursorStyle', e.target.value as EditorSettings['cursorStyle'])}
                        className="settings-select h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="line">Line</option>
                        <option value="block">Block</option>
                        <option value="underline">Underline</option>
                      </select>
                    </SettingRow>

                    <SettingRow label="Cursor Blinking" description="Animation style">
                      <select
                        value={settings.cursorBlinking}
                        onChange={e => updateSetting('cursorBlinking', e.target.value as EditorSettings['cursorBlinking'])}
                        className="settings-select h-12 rounded-xl bg-muted/50 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="blink">Blink</option>
                        <option value="smooth">Smooth</option>
                        <option value="phase">Phase</option>
                        <option value="expand">Expand</option>
                        <option value="solid">Solid</option>
                      </select>
                    </SettingRow>
                  </div>
                </section>

                <div className="h-px bg-border/50" />

                {/* Features Section */}
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Features</h3>
                      <p className="text-xs text-muted-foreground">Toggle advanced editor functionalities</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 bg-muted/30 p-8 md:p-10 rounded-[2rem] border border-border/50">
                    <ToggleSetting label="Word Wrap" checked={settings.wordWrap} onChange={v => updateSetting('wordWrap', v)} />
                    <ToggleSetting label="Line Numbers" checked={settings.lineNumbers} onChange={v => updateSetting('lineNumbers', v)} />
                    <ToggleSetting label="Bracket Matching" checked={settings.bracketMatching} onChange={v => updateSetting('bracketMatching', v)} />
                    <ToggleSetting label="Auto Close Brackets" checked={settings.autoCloseBrackets} onChange={v => updateSetting('autoCloseBrackets', v)} />
                    <ToggleSetting label="Highlight Active Line" checked={settings.highlightActiveLine} onChange={v => updateSetting('highlightActiveLine', v)} />
                    <ToggleSetting label="Code Folding" checked={settings.foldGutter} onChange={v => updateSetting('foldGutter', v)} />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SettingRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div>
        <p className="text-sm font-medium settings-text">{label}</p>
        <p className="text-xs settings-text-muted">{description}</p>
      </div>
      {children}
    </div>
  );
}

function ToggleSetting({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm settings-text">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-foreground' : 'bg-foreground/20'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-4 bg-background' : 'bg-foreground/60'}`} />
      </button>
    </label>
  );
}
