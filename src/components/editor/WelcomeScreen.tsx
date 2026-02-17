import React from 'react';
import { Terminal, Code2, Zap, Package, ChevronRight, Globe, Shield } from 'lucide-react';

export function WelcomeScreen() {
    return (
        <div className="h-full w-full flex items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/suisei.jpg"
                    alt="Suisei"
                    className="w-full h-full object-cover opacity-10 grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Hero Text */}
                <div className="flex flex-col items-start text-left animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Zap className="w-3 h-3" />
                        <span>Core Engine v2.0 Ready</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6 leading-[0.9]">
                        Suisei <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">Studio</span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
                        The definitive browser-based development environment for professional Node.js engineers. Zero latency, full filesystem sync, and high-performance execution.
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <StatusBadge icon={<Globe className="w-3 h-3" />} label="Client-Side VM" />
                        <StatusBadge icon={<Shield className="w-3 h-3" />} label="Secure Sandbox" />
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-border to-transparent mb-8" />
                    <div className="flex flex-col gap-1 active:scale-95 transition-transform duration-200">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">Lead Developer</p>
                        <a
                            href="https://iamovi.github.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-muted-foreground hover:text-indigo-400 transition-colors"
                        >
                            Created by Ovi Ren
                        </a>
                    </div>
                </div>

                {/* Right Side: Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-8 duration-1000">
                    <FeatureCard
                        icon={<Terminal className="w-5 h-5 text-indigo-400" />}
                        title="Integrated Shell"
                        desc="Execute npm, npx, and node scripts with real-time I/O piping."
                    />
                    <FeatureCard
                        icon={<Code2 className="w-5 h-5 text-purple-400" />}
                        title="Universal Support"
                        desc="Advanced syntax support for 14+ languages including Rust and Go."
                    />
                    <FeatureCard
                        icon={<Zap className="w-5 h-5 text-yellow-400" />}
                        title="Node.js VM"
                        desc="Native performance via WebContainer API within the browser thread."
                    />
                    <FeatureCard
                        icon={<Package className="w-5 h-5 text-green-400" />}
                        title="Package Sync"
                        desc="Instant node_modules resolution with live sidebar reflection."
                    />
                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/5">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Runtime: WebContainer jsh v1.2</span>
            </div>
        </div>
    );
}

function StatusBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-secondary/50 border border-border/50 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {icon}
            {label}
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string, desc: string }) {
    return (
        <div className="group p-5 rounded-2xl bg-secondary/20 border border-border/40 hover:bg-secondary/40 hover:border-indigo-500/30 transition-all duration-300">
            <div className="mb-4 p-2.5 rounded-xl bg-background/50 border border-border/50 w-fit group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="font-bold text-foreground text-sm mb-2 flex items-center gap-2">
                {title}
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed italic">{desc}</p>
        </div>
    );
}
