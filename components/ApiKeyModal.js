'use client';

import { useState } from 'react';

export default function ApiKeyModal({ onSave }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) { setError('Please enter your API key'); return; }
    onSave(trimmed);
  };

  return (
    <div className="min-h-screen bg-[#090b10] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111722] p-8 shadow-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L12 17.25l-4.5-4.5L15.5 7.5z"/>
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white">Open Higgsfield AI</h1>
          <p className="text-sm leading-relaxed text-white/45">
            Connect your <a href="https://muapi.ai" target="_blank" rel="noreferrer" className="text-sky-300 hover:underline">Muapi.ai</a> API key to open your creative workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              Muapi API key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => { setKey(e.target.value); setError(''); }}
              placeholder="Paste your API key"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-sky-300/50"
              suppressHydrationWarning
            />
            {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}
          </div>

          <button type="submit" className="w-full rounded-xl bg-sky-300 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-200" suppressHydrationWarning>
            Connect and launch
          </button>

          <p className="pt-1 text-center text-xs text-white/30">
            Don&apos;t have a key?{' '}
            <a href="https://muapi.ai" target="_blank" rel="noreferrer" className="text-sky-300 hover:underline">
              Get one from Muapi.ai →
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
