import { useState, useCallback, useEffect } from 'react';
import { useEditorState } from '@/hooks/useEditorState';
import type { EditorFile } from '@/types/editor';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWebContainer } from '@/hooks/useWebContainer';
import { Toolbar } from '@/components/editor/Toolbar';
import { FileExplorer } from '@/components/editor/FileExplorer';
import { EditorTabs } from '@/components/editor/EditorTabs';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { Preview } from '@/components/editor/Preview';
import { MobileFileDrawer } from '@/components/editor/MobileFileDrawer';
import { WelcomeScreen } from '@/components/editor/WelcomeScreen';
import { Terminal } from '@/components/editor/Terminal';
import { FolderOpen } from 'lucide-react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { toast } from 'sonner';

const Index = () => {
  const isMobile = useIsMobile();
  const editor = useEditorState();
  const [showPreview, setShowPreview] = useState(false);

  // Callback for WebContainer filesystem changes
  const handleFileSystemChange = useCallback((newFiles: EditorFile[]) => {
    editor.setFiles(newFiles);
  }, [editor.setFiles]);

  const wc = useWebContainer(editor.files, handleFileSystemChange);

  const [showExplorer, setShowExplorer] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  // Sync file changes to WebContainer
  const handleFileChange = useCallback(async (id: string, content: string) => {
    editor.updateFileContent(id, content);
    const file = editor.files.find(f => f.id === id);
    if (file && wc.isReady) {
      await wc.writeFile(file.name, content);
    }
  }, [editor, wc.isReady, wc.writeFile]);

  // Alert on refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (wc.isReady && !isMobile) {
      toast.success('Node.js environment is ready!', {
        description: 'You can now use the terminal to run commands and install packages.',
        duration: 3000,
      });
    }
  }, [wc.isReady, isMobile]);

  const handleRun = useCallback(() => {
    if (isMobile) {
      setMobileView('preview');
    } else {
      setShowPreview(true);
    }
    setPreviewKey(k => k + 1);
  }, [isMobile]);

  // Handle physical and UI deletion
  const handleDeleteFile = useCallback(async (id: string) => {
    // The ID in our sync system is the fullPath/name
    if (wc.isReady) {
      await wc.rm(id);
    }
    editor.deleteFile(id);
  }, [wc.isReady, wc.rm, editor.deleteFile]);

  const handleCreateFile = useCallback(async (name: string) => {
    const newFile = editor.createFile(name);
    if (wc.isReady) {
      await wc.writeFile(name, '');
    }
    return newFile;
  }, [editor, wc.isReady, wc.writeFile]);

  const handleCreateFolder = useCallback(async (name: string) => {
    if (wc.isReady) {
      await wc.mkdir(name);
    }
  }, [wc.isReady, wc.mkdir]);

  // Handle file uploads
  const handleUploadFile = useCallback(async (name: string, content: string | Uint8Array) => {
    if (wc.isReady) {
      // Handle nested directories if name contains '/'
      if (name.includes('/')) {
        const parts = name.split('/');
        const fileName = parts.pop();
        const dirPath = parts.join('/');
        if (dirPath) {
          await wc.mkdir(dirPath);
        }
      }

      if (typeof content === 'string') {
        await wc.writeFile(name, content);
      } else {
        await wc.writeBinaryFile(name, content);
      }

      // Auto-open the newly uploaded file (ID is the name/path)
      editor.openFile(name);
    }
  }, [wc.isReady, wc.writeFile, wc.writeBinaryFile, wc.mkdir, editor.openFile]);

  const isPreviewVisible = isMobile ? mobileView === 'preview' : showPreview;

  return (
    <div className="h-[100dvh] w-screen flex flex-col overflow-hidden editor-surface">
      <Toolbar
        showPreview={showPreview}
        showExplorer={showExplorer}
        showTerminal={showTerminal}
        onTogglePreview={() => setShowPreview(p => !p)}
        onToggleExplorer={() => setShowExplorer(p => !p)}
        onToggleTerminal={() => setShowTerminal(p => !p)}
        onRun={handleRun}
        isMobile={isMobile}
        mobileView={mobileView}
        onToggleMobileView={() => setMobileView(v => v === 'editor' ? 'preview' : 'editor')}
        files={editor.files}
      />

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Desktop file explorer */}
        {!isMobile && showExplorer && (
          <div className="w-52 flex-shrink-0 border-r sidebar-border-color">
            <FileExplorer
              files={editor.files}
              activeFileId={editor.activeFileId}
              onOpenFile={editor.openFile}
              onCreateFile={handleCreateFile}
              onDeleteFile={handleDeleteFile}
              onUploadFile={handleUploadFile}
              onCreateFolder={handleCreateFolder}
            />
          </div>
        )}

        {/* Main Content Area: Editor + Preview + Terminal */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <PanelGroup direction="vertical">
            <Panel defaultSize={75} minSize={30}>
              <PanelGroup direction="horizontal">
                {/* Editor Area */}
                {(!isMobile || mobileView === 'editor') && (
                  <Panel defaultSize={isPreviewVisible ? 50 : 100} minSize={20}>
                    <div className="h-full flex flex-col min-w-0 min-h-0">
                      {/* Tabs */}
                      <div className="flex items-center tab-surface border-b sidebar-border-color">
                        {isMobile && (
                          <button
                            onClick={() => setMobileDrawerOpen(true)}
                            className="p-2.5 border-r sidebar-border-color sidebar-item-hover"
                          >
                            <FolderOpen className="w-4 h-4 tab-text-inactive" />
                          </button>
                        )}
                        <div className="flex-1 overflow-x-auto">
                          <EditorTabs
                            files={editor.files}
                            openFileIds={editor.openFileIds}
                            activeFileId={editor.activeFileId}
                            onSelectFile={editor.openFile}
                            onCloseFile={editor.closeFile}
                          />
                        </div>
                      </div>

                      {/* Code editor or Welcome Screen */}
                      <div className="flex-1 min-h-0 overflow-hidden relative">
                        {editor.openFileIds.length > 0 ? (
                          <CodeEditor
                            value={editor.activeFile.content}
                            language={editor.activeFile.language}
                            onChange={(val) => handleFileChange(editor.activeFileId, val)}
                          />
                        ) : (
                          <WelcomeScreen />
                        )}
                      </div>
                    </div>
                  </Panel>
                )}

                {/* Preview Handle */}
                {isPreviewVisible && !isMobile && (
                  <PanelResizeHandle className="w-1.5 bg-border hover:bg-primary/30 transition-colors" />
                )}

                {/* Preview Panel */}
                {isPreviewVisible && (
                  <Panel defaultSize={50} minSize={20}>
                    <div className={`${isMobile ? 'h-full' : 'h-full border-l sidebar-border-color'} min-h-0 overflow-hidden`}>
                      <Preview
                        key={previewKey}
                        files={editor.files}
                        activeFile={editor.activeFile}
                        showPreview={true}
                        serverUrl={wc.serverUrl}
                      />
                    </div>
                  </Panel>
                )}
              </PanelGroup>
            </Panel>

            {/* Terminal Handle */}
            {showTerminal && !isMobile && (
              <PanelResizeHandle className="h-1.5 bg-border hover:bg-primary/30 transition-colors" />
            )}

            {/* Terminal Panel */}
            {showTerminal && !isMobile && (
              <Panel defaultSize={25} minSize={10}>
                <div className="h-full">
                  <Terminal
                    onReady={(term) => wc.spawnShell(term)}
                    onClose={() => setShowTerminal(false)}
                  />
                </div>
              </Panel>
            )}
          </PanelGroup>
        </div>
      </div>

      {/* Mobile file drawer */}
      {isMobile && (
        <MobileFileDrawer
          files={editor.files}
          activeFileId={editor.activeFileId}
          isOpen={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          onOpenFile={editor.openFile}
          onCreateFile={handleCreateFile}
          onDeleteFile={handleDeleteFile}
          onUploadFile={handleUploadFile}
          onCreateFolder={handleCreateFolder}
        />
      )}
    </div>
  );
};

export default Index;
