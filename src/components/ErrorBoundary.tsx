import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-background text-foreground">
                    <div className="max-w-md text-center space-y-6">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center">
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                An unexpected error occurred. Your files are safe — try refreshing the component or reloading the page.
                            </p>
                        </div>
                        {this.state.error && (
                            <pre className="text-xs text-left bg-secondary/50 rounded-xl p-4 overflow-auto max-h-32 border border-border/50">
                                <code className="text-destructive">{this.state.error.message}</code>
                            </pre>
                        )}
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={this.handleReset}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
                            >
                                <RotateCw className="w-4 h-4" />
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
