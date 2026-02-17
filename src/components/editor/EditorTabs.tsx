import { EditorFile } from '@/types/editor';
import { FileIcon } from '@/components/icons/FileIcons';
import { X } from 'lucide-react';

interface EditorTabsProps {
  files: EditorFile[];
  openFileIds: string[];
  activeFileId: string;
  onSelectFile: (id: string) => void;
  onCloseFile: (id: string) => void;
}

export function EditorTabs({ files, openFileIds, activeFileId, onSelectFile, onCloseFile }: EditorTabsProps) {
  const openFiles = openFileIds.map(id => files.find(f => f.id === id)).filter(Boolean) as EditorFile[];

  return (
    <div className="flex items-center tab-surface overflow-x-auto border-b sidebar-border-color min-h-[37px]">
      {openFiles.map(file => (
        <div
          key={file.id}
          className={`group flex items-center gap-1.5 px-3 py-2 cursor-pointer text-xs font-mono transition-all duration-100 shrink-0 border-r sidebar-border-color ${file.id === activeFileId
              ? 'tab-active-surface border-t-2 border-t-foreground/80'
              : 'tab-text-inactive hover:opacity-80 border-t-2 border-t-transparent'
            }`}
          onClick={() => onSelectFile(file.id)}
        >
          <span className="text-[10px]">
            <FileIcon language={file.language} />
          </span>
          <span>{file.name}</span>
          <button
            onClick={e => { e.stopPropagation(); onCloseFile(file.id); }}
            className="ml-1 p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-foreground/10 transition-all"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
