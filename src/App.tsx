/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FlasherSim } from './components/FlasherSim.tsx';
import { WheelSim } from './components/WheelSim.tsx';
import { TheorySection } from './components/TheorySection.tsx';
import { Activity, Disc3, Info } from 'lucide-react';

export default function App() {
  return (
    <main className="w-full flex flex-col items-center max-w-5xl mx-auto px-4 py-6 md:py-10">
      {/* Primary header matching user specification */}
      <header className="text-center mb-8">
        <h2 id="app-title" className="text-2xl md:text-3xl font-light tracking-wide text-white mb-3">
          Symulacja Światła — Szarość vs Biel
        </h2>
        <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Dlaczego szybkie mruganie białego światła oraz addytywne mieszanie barw podstawowych dają w naszym oku <span className="text-neutral-200 font-semibold underline decoration-neutral-500">szarość</span>, a nie oślepiającą <span className="text-white font-semibold underline decoration-white">biel</span>?
        </p>
      </header>

      {/* Main Simulation Container with both boxes side-by-side */}
      <div className="container sim-container" id="main-sim-container">
        <FlasherSim />
        <WheelSim />
      </div>

      {/* Educational physics & perception breakdown */}
      <TheorySection />

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-neutral-500 border-t border-white/5 pt-6 w-full max-w-[900px]">
        <p>
          Symulacja percepcji wzrokowej: Prawo Talbota-Plateau, modulacja szerokości impulsów (PWM) oraz addytywna synteza barw na tarczy Newtona.
        </p>
      </footer>
    </main>
  );
}
