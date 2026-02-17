import { useState, useRef, useMemo } from 'react';
import { EditorFile } from '@/types/editor';
import { FileIcon } from '@/components/icons/FileIcons';
import { Plus, Trash2, ChevronDown, ChevronRight, FolderOpen, Upload, Archive, FolderPlus, Folder } from 'lucide-react';
import JSZip from 'jszip';
import { toast } from 'sonner';

interface FileExplorerProps {
  files: EditorFile[];
  activeFileId: string;
  onOpenFile: (id: string) => void;
  onCreateFile: (name: string) => void;
  onDeleteFile: (id: string) => void;
  onUploadFile: (name: string, content: string | Uint8Array) => void;
  onCreateFolder: (name: string) => void;
}

interface TreeItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: TreeItem[];
  file?: EditorFile;
}

export function FileExplorer({ files, activeFileId, onOpenFile, onCreateFile, onDeleteFile, onUploadFile, onCreateFolder }: FileExplorerProps) {
  const [isCreating, setIsCreating] = useState<'file' | 'folder' | null>(null);
  const [newName, setNewName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/']));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  const tree = useMemo(() => {
    const root: TreeItem = { name: 'root', path: '', type: 'folder', children: [] };
    files.forEach(file => {
      const parts = file.name.split('/');
      let current = root;
      let currentPath = '';
      parts.forEach((part, index) => {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        if (index === parts.length - 1) {
          current.children!.push({ name: part, path: currentPath, type: 'file', file });
        } else {
          let folder = current.children!.find(c => c.name === part && c.type === 'folder');
          if (!folder) {
            folder = { name: part, path: currentPath, type: 'folder', children: [] };
            current.children!.push(folder);
          }
          current = folder;
        }
      });
    });
    return root;
  }, [files]);

  const handleCreate = () => {
    const name = newName.trim();
    if (name) {
      if (isCreating === 'file') onCreateFile(name);
      else if (isCreating === 'folder') onCreateFolder(name);
      setNewName('');
      setIsCreating(null);
    }
  };

  const toggleFolder = (path: string) => {
    const next = new Set(expandedFolders);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    setExpandedFolders(next);
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
    e.target.value = '';
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
      toast.success(`Extracted and uploaded ${count} files from ${file.name}`);
    } catch (error) {
      console.error('ZIP extraction failed:', error);
      toast.error('Failed to extract ZIP file');
    }
    e.target.value = '';
  };

  const renderTree = (items: TreeItem[], level = 0) => {
    return items
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
        return a.name.localeCompare(b.name);
      })
      .map(item => {
        if (item.type === 'folder') {
          const isExpanded = expandedFolders.has(item.path);
          return (
            <div key={item.path}>
              <div
                className="group flex items-center gap-2 px-3 py-[6px] cursor-pointer text-xs transition-all sidebar-item-hover"
                style={{ paddingLeft: `${(level * 12) + 12}px` }}
                onClick={() => toggleFolder(item.path)}
              >
                {isExpanded ? <ChevronDown className="w-3 h-3 text-muted-foreground" /> : <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                <Folder className="w-3.5 h-3.5 text-indigo-400/80" />
                <span className="truncate flex-1 font-medium">{item.name}</span>
                <button
                  onClick={e => { e.stopPropagation(); onDeleteFile(item.path); }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-destructive/20 transition-all"
                  title="Delete Folder"
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </button>
              </div>
              {isExpanded && item.children && renderTree(item.children, level + 1)}
            </div>
          );
        }

        const file = item.file!;
        return (
          <div
            key={file.id}
            className={`group flex items-center gap-2 px-3 py-[6px] cursor-pointer text-xs transition-all ${file.id === activeFileId
              ? 'sidebar-item-active'
              : 'sidebar-item-hover'
              }`}
            style={{ paddingLeft: `${(level * 12) + 12 + 15}px` }}
            onClick={() => onOpenFile(file.id)}
          >
            <span className="text-[10px] flex-shrink-0">
              <FileIcon language={file.language} />
            </span>
            <span className="truncate flex-1 font-mono">{item.name}</span>
            <button
              onClick={e => { e.stopPropagation(); onDeleteFile(file.id); }}
              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-destructive/20 transition-all"
              title="Delete File"
            >
              <Trash2 className="w-3 h-3 text-destructive" />
            </button>
          </div>
        );
      });
  };

  return (
    <div className="h-full flex flex-col sidebar-surface">
      {/* Hidden inputs */}
      <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
      <input type="file" accept=".zip" ref={zipInputRef} className="hidden" onChange={handleZipUpload} />

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b sidebar-border-color">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest tab-text-inactive">
          <ChevronDown className="w-3 h-3" />
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Explorer</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setIsCreating('file')}
            className="p-1 rounded-md sidebar-item-hover transition-colors"
            title="New File"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsCreating('folder')}
            className="p-1 rounded-md sidebar-item-hover transition-colors"
            title="New Folder"
          >
            <FolderPlus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1 rounded-md sidebar-item-hover transition-colors"
            title="Upload Files"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => zipInputRef.current?.click()}
            className="p-1 rounded-md sidebar-item-hover transition-colors"
            title="Upload and Extract ZIP"
          >
            <Archive className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* New file/folder input */}
      {isCreating && (
        <div className="px-2 py-2">
          <input
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleCreate();
              if (e.key === 'Escape') { setIsCreating(null); setNewName(''); }
            }}
            onBlur={() => { if (!newName.trim()) setIsCreating(null); }}
            placeholder={isCreating === 'file' ? "filename.ts" : "folder name"}
            className="w-full px-2 py-1.5 text-xs editor-surface border sidebar-border-color rounded-md outline-none focus:ring-1 focus:ring-foreground/20 font-mono"
          />
          <p className="text-[10px] tab-text-inactive mt-1 px-0.5">
            {isCreating === 'file' ? "Supports all extensions." : "Enter folder path (e.g. public/assets)"}
          </p>
        </div>
      )}

      {/* Tree list */}
      <div className="flex-1 overflow-y-auto py-1">
        {renderTree(tree.children!)}
      </div>
    </div>
  );
}
