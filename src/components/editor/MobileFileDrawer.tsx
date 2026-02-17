import { EditorFile } from '@/types/editor';
import { FileIcon } from '@/components/icons/FileIcons';
import { Plus, X, FolderOpen, Trash2, Upload, Archive, FolderPlus } from 'lucide-react';
import { useState, useRef } from 'react';
import JSZip from 'jszip';
import { toast } from 'sonner';

interface MobileFileDrawerProps {
  files: EditorFile[];
  activeFileId: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenFile: (id: string) => void;
  onCreateFile: (name: string) => void;
  onDeleteFile: (id: string) => void;
  onUploadFile: (name: string, content: string | Uint8Array) => void;
  onCreateFolder: (name: string) => void;
}

export function MobileFileDrawer({
  files,
  activeFileId,
  isOpen,
  onClose,
  onOpenFile,
  onCreateFile,
  onDeleteFile,
  onUploadFile,
  onCreateFolder
}: MobileFileDrawerProps) {
  const [isCreating, setIsCreating] = useState<'file' | 'folder' | null>(null);
  const [newName, setNewName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleCreate = () => {
    const name = newName.trim();
    if (name) {
      if (isCreating === 'file') onCreateFile(name);
      else if (isCreating === 'folder') onCreateFolder(name);
      setNewName('');
      setIsCreating(null);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const textExtensions = new Set([
      'html', 'css', 'js', 'jsx', 'ts', 'tsx', 'md', 'json', 'yaml', 'yml',
      'txt', 'py', 'rs', 'java', 'cpp', 'cc', 'h', 'hpp', 'go', 'php', 'sql',
      'xml', 'svg', 'sh', 'bash', 'toml', 'env', 'gitignore', 'editorconfig',
    ]);

    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const isText = textExtensions.has(ext);

      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result;
        if (content != null) {
          if (isText && typeof content === 'string') {
            onUploadFile(file.name, content);
          } else if (!isText && content instanceof ArrayBuffer) {
            onUploadFile(file.name, new Uint8Array(content));
          }
        }
      };

      if (isText) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    }
    toast.success(`${files.length} file(s) uploaded successfully`);
    onClose();
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);

      let count = 0;
      for (const [relativePath, zipEntry] of Object.entries(loadedZip.files)) {
        if (!zipEntry.dir) {
          const content = await zipEntry.async('uint8array');
          onUploadFile(relativePath, content);
          count++;
        }
      }
      toast.success(`Extracted and uploaded ${count} files`);
      onClose();
    } catch (error) {
      console.error('ZIP extraction failed:', error);
      toast.error('Failed to extract ZIP file');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-72 max-w-[80vw] h-full sidebar-surface flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3.5 border-b sidebar-border-color">
          <div className="flex items-center gap-2 text-sm font-bold tab-text">
            <FolderOpen className="w-4 h-4" />
            Files
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsCreating('file')} className="p-1.5 rounded-md sidebar-item-hover">
              <Plus className="w-4 h-4" />
            </button>
            <button onClick={() => setIsCreating('folder')} className="p-1.5 rounded-md sidebar-item-hover">
              <FolderPlus className="w-4 h-4" />
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="p-1.5 rounded-md sidebar-item-hover">
              <Upload className="w-4 h-4" />
            </button>
            <button onClick={() => zipInputRef.current?.click()} className="p-1.5 rounded-md sidebar-item-hover">
              <Archive className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-md sidebar-item-hover">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
        <input type="file" accept=".zip" ref={zipInputRef} className="hidden" onChange={handleZipUpload} />

        {isCreating && (
          <div className="px-3 py-2.5 border-b sidebar-border-color">
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCreate();
                if (e.key === 'Escape') { setIsCreating(null); setNewName(''); }
              }}
              placeholder={isCreating === 'file' ? "filename.ts" : "folder name"}
              className="w-full px-2.5 py-2 text-sm editor-surface border sidebar-border-color rounded-md outline-none font-mono"
            />
            <p className="text-[10px] tab-text-inactive mt-1 px-0.5">
              {isCreating === 'file' ? "All extensions supported." : "Create nested folders with /"}
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-2">
          {files.map(file => (
            <button
              key={file.id}
              className={`group w-full flex items-center gap-3 px-4 py-3 text-sm transition-all text-left ${file.id === activeFileId
                ? 'sidebar-item-active'
                : 'sidebar-item-hover'
                }`}
              onClick={() => { onOpenFile(file.id); onClose(); }}
            >
              <span className="text-sm">
                <FileIcon language={file.language} />
              </span>
              <span className="font-mono text-xs flex-1">{file.name}</span>
              <span
                onClick={e => { e.stopPropagation(); onDeleteFile(file.id); }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 transition-all"
              >
                <Trash2 className="w-3 h-3 text-destructive" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
