import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { X, SquareTerminal } from 'lucide-react';
import '@xterm/xterm/css/xterm.css';

interface TerminalProps {
    onData?: (data: string) => void;
    onReady?: (terminal: XTerm) => void;
    output?: string;
    onClose?: () => void;
}

export function Terminal({ onData, onReady, output, onClose }: TerminalProps) {
    const terminalRef = useRef<HTMLDivElement>(null);
    const xtermRef = useRef<XTerm | null>(null);
    const fitAddonRef = useRef<FitAddon | null>(null);

    useEffect(() => {
        if (!terminalRef.current) return;

        const term = new XTerm({
            cursorBlink: true,
            theme: {
                background: '#0a0a0a',
                foreground: '#e5e5e5',
                cursor: '#6366f1',
                selectionBackground: 'rgba(255, 255, 255, 0.1)',
                black: '#0a0a0a',
                red: '#ff5555',
                green: '#50fa7b',
                yellow: '#f1fa8c',
                blue: '#bd93f9',
                magenta: '#ff79c6',
                cyan: '#8be9fd',
                white: '#bfbfbf',
            },
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            letterSpacing: 0,
            lineHeight: 1.2,
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.open(terminalRef.current);

        // Initial fit
        setTimeout(() => fitAddon.fit(), 0);

        xtermRef.current = term;
        fitAddonRef.current = fitAddon;

        if (onReady) {
            onReady(term);
        }

        const dataListener = term.onData((data) => {
            onData?.(data);
        });

        // Use ResizeObserver for more reliable fitting when layout changes
        const resizeObserver = new ResizeObserver(() => {
            if (terminalRef.current?.offsetWidth && terminalRef.current?.offsetHeight) {
                fitAddon.fit();
            }
        });

        if (terminalRef.current.parentElement) {
            resizeObserver.observe(terminalRef.current.parentElement);
        }

        return () => {
            dataListener.dispose();
            resizeObserver.disconnect();
            term.dispose();
            xtermRef.current = null;
        };
    }, []);

    // Handle output streaming
    useEffect(() => {
        if (xtermRef.current && output) {
            xtermRef.current.write(output);
        }
    }, [output]);

    return (
        <div className="h-full w-full bg-[#0a0a0a] flex flex-col overflow-hidden border-t sidebar-border-color">
            <div className="h-9 flex-shrink-0 flex items-center justify-between px-3 border-b sidebar-border-color bg-[#121212]">
                <div className="flex items-center gap-2">
                    <SquareTerminal className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Terminal</span>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/10 rounded transition-colors text-muted-foreground hover:text-white"
                        title="Close Terminal"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
            <div className="flex-1 p-2 overflow-hidden">
                <div ref={terminalRef} className="h-full w-full" />
            </div>
        </div>
    );
}
