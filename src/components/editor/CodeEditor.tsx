import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { EditorView } from '@codemirror/view';
import { keymap } from '@codemirror/view';
import { indentUnit } from '@codemirror/language';
import { Extension } from '@codemirror/state';

// Languages
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { go } from '@codemirror/lang-go';
import { php } from '@codemirror/lang-php';
import { sql } from '@codemirror/lang-sql';
import { json } from '@codemirror/lang-json';
import { yaml } from '@codemirror/lang-yaml';

// Emmet
import { abbreviationTracker, expandAbbreviation } from '@emmetio/codemirror6-plugin';

// Local imports - using relative paths to ensure better IDE support
import { FileLanguage } from '../../types/editor';
import { getCompletionExtensions } from './snippets';
import { useTheme } from '../../hooks/useTheme';
import { useSettings } from '../../hooks/useSettings';

interface CodeEditorProps {
  value: string;
  language: FileLanguage;
  onChange: (value: string) => void;
}

const lightTheme = EditorView.theme({
  '&': { backgroundColor: '#fafafa', color: '#1a1a1a' },
  '.cm-gutters': { backgroundColor: '#f0f0f0', color: '#999', borderRight: '1px solid #e0e0e0' },
  '.cm-activeLineGutter': { backgroundColor: '#e8e8e8' },
  '.cm-activeLine': { backgroundColor: '#f0f0f0' },
  '.cm-selectionBackground': { backgroundColor: '#d0d0d0 !important' },
  '&.cm-focused .cm-selectionBackground': { backgroundColor: '#b8d4ff !important' },
  '.cm-cursor': { borderLeftColor: '#1a1a1a' },
  '.cm-matchingBracket': { backgroundColor: '#c8dfc8', outline: '1px solid #88b888' },
}, { dark: false });

// Cursor blinking CSS
const cursorBlinkingStyles: Record<string, Extension> = {
  blink: EditorView.theme({ '.cm-cursor': { animation: 'cm-blink 1.2s steps(1) infinite' } }),
  smooth: EditorView.theme({ '.cm-cursor': { animation: 'cm-blink 1.2s ease infinite' } }),
  phase: EditorView.theme({ '.cm-cursor': { animation: 'cm-blink 1.2s ease-in-out infinite' } }),
  expand: EditorView.theme({ '.cm-cursor': { animation: 'cm-blink 1.2s ease infinite', transformOrigin: 'left' } }),
  solid: EditorView.theme({ '.cm-cursor': { animation: 'none' } }),
};

// Cursor style
function getCursorStyle(style: string): Extension {
  const cursorColor = 'var(--cm-cursor)';
  switch (style) {
    case 'block':
      return EditorView.theme({
        '.cm-cursor': {
          borderLeft: 'none',
          backgroundColor: cursorColor,
          opacity: '0.5',
          width: '0.6em !important'
        },
      });
    case 'underline':
      return EditorView.theme({
        '.cm-cursor': {
          borderLeft: 'none',
          borderBottom: `2px solid ${cursorColor}`,
          width: '0.6em !important'
        },
      });
    default:
      return EditorView.theme({
        '.cm-cursor': { borderLeft: `2px solid ${cursorColor}` }
      });
  }
}

export function CodeEditor({ value, language, onChange }: CodeEditorProps) {
  const { theme } = useTheme();
  const { settings } = useSettings();
  const isDark = theme === 'dark';

  const extensions = useMemo(() => {
    const base: Extension[] = [];

    // Word wrap
    if (settings.wordWrap) {
      base.push(EditorView.lineWrapping);
    }

    // Light theme
    if (!isDark) {
      base.push(lightTheme);
    }

    // Font
    base.push(EditorView.theme({
      '.cm-content': { fontFamily: settings.fontFamily + ' !important' },
      '.cm-gutters': { fontFamily: settings.fontFamily + ' !important' },
    }));

    // Cursor
    base.push(cursorBlinkingStyles[settings.cursorBlinking] || []);
    base.push(getCursorStyle(settings.cursorStyle));

    // Tab size
    base.push(indentUnit.of(' '.repeat(settings.tabSize)));
    base.push(EditorView.theme({ '.cm-content': { tabSize: settings.tabSize.toString() } }));

    // Emmet for HTML and CSS
    if (language === 'html' || language === 'css') {
      base.push(
        abbreviationTracker(),
        keymap.of([{ key: 'Tab', run: expandAbbreviation }])
      );
    }

    // Language-aware autocompletion
    base.push(...getCompletionExtensions(language));

    // Language mode mapping
    const langMode = (() => {
      switch (language) {
        case 'html': return html();
        case 'css': return css();
        case 'javascript': return javascript({ jsx: true });
        case 'typescript': return javascript({ jsx: true, typescript: true });
        case 'markdown': return markdown();
        case 'python': return python();
        case 'rust': return rust();
        case 'java': return java();
        case 'cpp': return cpp();
        case 'go': return go();
        case 'php': return php();
        case 'sql': return sql();
        case 'json': return json();
        case 'yaml': return yaml();
        default: return null;
      }
    })();

    if (langMode) {
      base.push(langMode);
    }

    return base;
  }, [language, isDark, settings]);

  return (
    <div
      className="h-full w-full overflow-auto editor-surface"
      style={{
        fontSize: `${settings.fontSize}px`,
        fontFamily: settings.fontFamily
      }}
    >
      <CodeMirror
        value={value}
        height="100%"
        theme={isDark ? vscodeDark : undefined}
        extensions={extensions}
        onChange={onChange}
        basicSetup={{
          lineNumbers: settings.lineNumbers,
          highlightActiveLineGutter: settings.highlightActiveLine,
          highlightActiveLine: settings.highlightActiveLine,
          foldGutter: settings.foldGutter,
          autocompletion: false,
          bracketMatching: settings.bracketMatching,
          closeBrackets: settings.autoCloseBrackets,
          indentOnInput: true,
        }}
        style={{
          fontSize: `${settings.fontSize}px`,
        }}
      />
    </div>
  );
}
