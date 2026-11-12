'use client';

import { useState, useEffect, useCallback } from 'react';
import { ImageStudio, VideoStudio, LipSyncStudio, CinemaStudio } from 'studio';
import ApiKeyModal from './ApiKeyModal';

const TABS = [
  { id: 'image', label: 'Image', description: 'Create and edit images', icon: 'image' },
  { id: 'video', label: 'Video', description: 'Generate cinematic video', icon: 'video' },
  { id: 'lipsync', label: 'Lip Sync', description: 'Animate portraits and clips', icon: 'audio' },
  { id: 'cinema', label: 'Cinema', description: 'Fine-tune cinematic shots', icon: 'camera' },
];

const STORAGE_KEY = 'kie_key';

function NavIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    image: <><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
    video: <><rect x="3" y="5" width="13" height="14" rx="2" /><path d="m16 10 5-3v10l-5-3" /></>,
    audio: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3m-4 0h8" /></>,
    camera: <><path d="M14 4h-4l-2 3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2-3Z" /><circle cx="12" cy="13" r="3" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.7Z" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export default function StandaloneShell() {
  const [apiKey, setApiKey] = useState(null);
  const [activeTab, setActiveTab] = useState('image');
  const [showSettings, setShowSettings] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setApiKey(stored);
  }, []);

  const handleKeySave = useCallback((key) => {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
  }, []);

  const handleKeyChange = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey(null);
    setShowSettings(false);
  }, []);

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-[#090b10] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-white/10 border-t-sky-400 animate-spin" />
      </div>
    );
  }

  if (!apiKey) return <ApiKeyModal onSave={handleKeySave} />;

  const active = TABS.find((tab) => tab.id === activeTab);

  return (
    <div className="h-screen min-h-[560px] bg-[#090b10] text-white flex overflow-hidden">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0d1017] transition-transform duration-200 md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-[76px] items-center gap-3 border-b border-white/[0.07] px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
            <span className="text-sm font-black tracking-tight">OH</span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold tracking-wide text-white">Open Higgsfield</p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">Creative workspace</p>
          </div>
        </div>

        <div className="px-4 pb-2 pt-7">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Workspace</p>
          <nav className="mt-3 space-y-1" aria-label="Studio navigation">
            {TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  aria-current={selected ? 'page' : undefined}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${selected ? 'border border-sky-300/15 bg-sky-300/[0.09] text-sky-200' : 'border border-transparent text-white/55 hover:bg-white/[0.045] hover:text-white'}`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${selected ? 'bg-sky-300/10 text-sky-200' : 'text-white/45 group-hover:text-white/80'}`}>
                    <NavIcon name={tab.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold">{tab.label}</span>
                    <span className={`mt-0.5 block truncate text-[10px] ${selected ? 'text-sky-100/55' : 'text-white/30'}`}>{tab.description}</span>
                  </span>
                  {selected && <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/[0.07] p-4">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-semibold text-white/75">API connected</span>
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-white/35">Your Muapi key is stored locally in this browser.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <NavIcon name="settings" />
            Settings & API key
          </button>
          <p className="px-3 pt-3 text-[9px] tracking-wide text-white/20">OPEN HIGGSFIELD AI · WORKSPACE</p>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#0b0e14] px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/65 hover:bg-white/5 md:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">Studio / {active?.label}</p>
              <h1 className="mt-1 truncate text-base font-semibold tracking-tight text-white sm:text-lg">{active?.label} Studio</h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-medium text-white/55">Muapi connected</span>
            </div>
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-medium text-white/60 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              <NavIcon name="settings" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </header>

        <section className="min-h-0 flex-1 overflow-y-auto bg-[#090b10]">
          {activeTab === 'image' && <ImageStudio apiKey={apiKey} />}
          {activeTab === 'video' && <VideoStudio apiKey={apiKey} />}
          {activeTab === 'lipsync' && <LipSyncStudio apiKey={apiKey} />}
          {activeTab === 'cinema' && <CinemaStudio apiKey={apiKey} />}
        </section>
      </main>

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setShowSettings(false); }}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111722] p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300/70">Workspace settings</p>
                <h2 className="mt-2 text-xl font-semibold text-white">API connection</h2>
              </div>
              <button type="button" onClick={() => setShowSettings(false)} aria-label="Close settings" className="rounded-lg px-2 py-1 text-white/40 hover:bg-white/5 hover:text-white">✕</button>
            </div>
            <p className="mb-2 text-xs text-white/45">Current Muapi API key</p>
            <div className="mb-6 rounded-lg border border-white/[0.08] bg-black/20 px-4 py-3 font-mono text-sm text-white/75">
              {apiKey.slice(0, 8)}••••••••••••
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <button type="button" onClick={handleKeyChange} className="flex-1 rounded-lg border border-rose-400/20 bg-rose-400/10 px-4 py-2.5 text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-400/15">
                Change API key
              </button>
              <button type="button" onClick={() => setShowSettings(false)} className="flex-1 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-slate-200">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
