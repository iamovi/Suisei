import { useState, useCallback, useEffect } from 'react';
import { EditorFile, defaultFiles, getFileExtension } from '@/types/editor';

export function useEditorState() {
  const [files, setFiles] = useState<EditorFile[]>(defaultFiles);
  const [activeFileId, setActiveFileId] = useState<string>('');
  const [openFileIds, setOpenFileIds] = useState<string[]>([]);

  // Cleanup effect: ensure openFileIds only contain existing files
  useEffect(() => {
    const existingIds = new Set(files.map(f => f.id));
    setOpenFileIds(prev => prev.filter(id => existingIds.has(id)));

    if (activeFileId && !existingIds.has(activeFileId)) {
      setActiveFileId('');
    }
  }, [files]);

  const activeFile = files.find(f => f.id === activeFileId) || files[0] || { id: '', name: '', language: 'html', content: '' };

  const updateFileContent = useCallback((fileId: string, content: string) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, content } : f));
  }, []);

  const openFile = useCallback((fileId: string) => {
    setActiveFileId(fileId);
    setOpenFileIds(prev => prev.includes(fileId) ? prev : [...prev, fileId]);
  }, []);

  const closeFile = useCallback((fileId: string) => {
    setOpenFileIds(prev => {
      const next = prev.filter(id => id !== fileId);
      if (activeFileId === fileId) {
        setActiveFileId(next[next.length - 1] || '');
      }
      return next;
    });
  }, [activeFileId]);

  const createFile = useCallback((name: string) => {
    const language = getFileExtension(name);
    // Use name/path as ID for consistency with filesystem sync
    const id = name;
    const newFile: EditorFile = { id, name, language, content: '' };
    setFiles(prev => {
      // Prevent duplicates
      if (prev.some(f => f.id === id)) return prev;
      return [...prev, newFile];
    });
    openFile(id);
    return newFile;
  }, [openFile]);

  const deleteFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    closeFile(fileId);
  }, [closeFile]);

  const renameFile = useCallback((fileId: string, newName: string) => {
    const language = getFileExtension(newName);
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, name: newName, language } : f));
  }, []);

  return {
    files,
    setFiles,
    activeFile,
    activeFileId,
    openFileIds,
    updateFileContent,
    openFile,
    closeFile,
    createFile,
    deleteFile,
    renameFile,
  };
}
