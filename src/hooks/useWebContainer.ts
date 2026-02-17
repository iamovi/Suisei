import { useEffect, useRef, useState, useCallback } from 'react';
import { WebContainer } from '@webcontainer/api';
import type { Terminal as XTermTerminal } from '@xterm/xterm';
import { EditorFile, getFileExtension } from '@/types/editor';

interface FileSystemTree {
    [key: string]: { file: { contents: string } };
}

export function useWebContainer(files: EditorFile[], onFileChanged?: (files: EditorFile[]) => void) {
    const webcontainerRef = useRef<WebContainer | null>(null);
    const onFileChangedRef = useRef(onFileChanged);
    const filesRef = useRef(files);
    const [isReady, setIsReady] = useState(false);
    const [serverUrl, setServerUrl] = useState<string | null>(null);

    // Keep refs in sync
    useEffect(() => {
        onFileChangedRef.current = onFileChanged;
    }, [onFileChanged]);

    useEffect(() => {
        filesRef.current = files;
    }, [files]);

    useEffect(() => {
        async function init() {
            if (webcontainerRef.current) return;

            try {
                const instance = await WebContainer.boot();
                webcontainerRef.current = instance;

                // Mount initial files using the ref to avoid stale closure
                const initialFiles = filesRef.current;
                const fileSystemTree: FileSystemTree = {};
                initialFiles.forEach(file => {
                    fileSystemTree[file.name] = {
                        file: {
                            contents: file.content,
                        },
                    };
                });

                await instance.mount(fileSystemTree);
                setIsReady(true);
                console.log('WebContainer is ready');

                // Listen for server-ready to provide a preview URL
                instance.on('server-ready', (port, url) => {
                    console.log(`Server ready at port ${port}: ${url}`);
                    setServerUrl(url);
                });

                // Watch for file changes in the virtual filesystem
                let scanTimeout: ReturnType<typeof setTimeout>;
                instance.fs.watch('/', { recursive: true }, async (event, filename) => {
                    const name = typeof filename === 'string' ? filename : new TextDecoder().decode(filename);

                    // Ignore node_modules changes in the UI explorer for performance
                    if (name?.startsWith('node_modules')) return;

                    // Debounce the scan to avoid crashing the UI during npm install
                    clearTimeout(scanTimeout);
                    scanTimeout = setTimeout(async () => {
                        if (onFileChangedRef.current) {
                            try {
                                const newFiles: EditorFile[] = [];

                                async function readDirRecursive(dir: string) {
                                    const entries = await instance.fs.readdir(dir, { withFileTypes: true });
                                    for (const entry of entries) {
                                        const fullPath = dir === '/' ? entry.name : `${dir}/${entry.name}`;
                                        if (fullPath.startsWith('node_modules')) continue;

                                        if (entry.isFile()) {
                                            const content = await instance.fs.readFile(fullPath, 'utf-8');
                                            newFiles.push({
                                                id: fullPath,
                                                name: fullPath,
                                                language: getFileExtension(entry.name),
                                                content
                                            });
                                        } else if (entry.isDirectory()) {
                                            await readDirRecursive(fullPath);
                                        }
                                    }
                                }

                                await readDirRecursive('/');
                                onFileChangedRef.current(newFiles);
                            } catch (e) {
                                console.warn('Silent sync skip:', e);
                            }
                        }
                    }, 500);
                });
            } catch (error) {
                console.error('Failed to boot WebContainer:', error);
            }
        }

        init();
    }, []);

    const writeFile = useCallback(async (name: string, content: string) => {
        if (!webcontainerRef.current) return;
        await webcontainerRef.current.fs.writeFile(name, content);
    }, []);

    const writeBinaryFile = useCallback(async (name: string, data: Uint8Array) => {
        if (!webcontainerRef.current) return;
        await webcontainerRef.current.fs.writeFile(name, data);
    }, []);

    const mkdir = useCallback(async (path: string) => {
        if (!webcontainerRef.current) return;
        await webcontainerRef.current.fs.mkdir(path, { recursive: true });
    }, []);

    const rm = useCallback(async (path: string) => {
        if (!webcontainerRef.current) return;
        await webcontainerRef.current.fs.rm(path, { recursive: true, force: true });
    }, []);

    const spawnShell = useCallback(async (terminal: XTermTerminal) => {
        if (!webcontainerRef.current) return;

        const shellProcess = await webcontainerRef.current.spawn('jsh', {
            terminal: {
                cols: terminal.cols,
                rows: terminal.rows,
            },
        });

        shellProcess.output.pipeTo(
            new WritableStream({
                write(data) {
                    terminal.write(data);
                },
            })
        );

        const input = shellProcess.input.getWriter();
        terminal.onData((data: string) => {
            input.write(data);
        });

        return shellProcess;
    }, []);

    return {
        isReady,
        serverUrl,
        writeFile,
        writeBinaryFile,
        mkdir,
        rm,
        spawnShell,
        instance: webcontainerRef.current,
    };
}
