import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCw, Sparkles } from 'lucide-react';
import { DISC_PATTERNS } from '../data/patterns.ts';
import { DiscPatternType } from '../types.ts';

export function WheelSim() {
  const [rpm, setRpm] = useState<number>(400); // 0 to 3000 RPM
  const [patternId, setPatternId] = useState<DiscPatternType>('rgb');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [simulatePersistence, setSimulatePersistence] = useState<boolean>(true);

  const angleRef = useRef<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const reqRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const currentPattern = DISC_PATTERNS[patternId] || DISC_PATTERNS.rgb;

  // Animation loop updating rotation angle based on RPM
  useEffect(() => {
    if (!isRunning || rpm === 0) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const deltaSec = (time - lastTimeRef.current) / 1000;
        // Degrees per second: (rpm / 60) * 360 = rpm * 6
        const degDelta = rpm * 6 * deltaSec;
        angleRef.current = (angleRef.current + degDelta) % 360;
        setRotationAngle(angleRef.current);
      }
      lastTimeRef.current = time;
      reqRef.current = requestAnimationFrame(animate);
    };

    reqRef.current = requestAnimationFrame(animate);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [rpm, isRunning]);

  // Motion blur / eye integration factor (0 at 0 RPM, up to ~0.95 at 2000+ RPM)
  const blurFactor = !isRunning ? 0 : Math.min(1, rpm / 1500);
  const blendOpacity = simulatePersistence ? Math.min(0.92, (rpm / 1200) * 0.92) : 0;

  // The calculated blended gray value (e.g. RGB 85,85,85 for standard 3-color RGB wheel)
  const blendedColor =
    patternId === 'rgb'
      ? 'rgb(85, 85, 85)'
      : patternId === 'rainbow'
      ? 'rgb(120, 120, 120)'
      : 'rgb(128, 128, 128)';

  // Status text from prompt
  const renderStatus = () => {
    if (!isRunning || rpm === 0) {
      return (
        <span className="status-text">
          Koło jest <span className="highlight">nieruchome</span>. Widoczne są wyraźne pojedyncze sektory barwne.
        </span>
      );
    }
    if (rpm < 300) {
      return (
        <span className="status-text">
          Przy <span className="highlight">{rpm} RPM</span>: Wolny obrót. Oko śledzi poszczególne kolory, widoczny efekt stroboskopowy.
        </span>
      );
    }
    if (rpm < 1200) {
      return (
        <span className="status-text">
          Przy <span className="highlight">{rpm} RPM</span>: Częściowe rozmycie. Barwy zaczynają nakładać się na siatkówce, tworząc brudny odcień.
        </span>
      );
    }
    return (
      <span className="status-text">
        Przy <span className="highlight">{rpm} RPM</span>: Addytywna fuzja barw! Widzisz <span className="highlight">SZAROŚĆ</span>, a nie biel, bo energia każdego koloru stanowi tylko 1/3 całości.
      </span>
    );
  };

  return (
    <div id="sim-box-wheel" className="sim-box">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3>2. Koło Barw (Synteza Addytywna)</h3>
          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/80 font-mono">
            {isRunning ? rpm : 0} RPM
          </span>
        </div>
        <p className="text-xs text-neutral-400 text-left mb-4">
          Mieszanie barw przez szybki obrót tarczy Newtona.
        </p>

        {/* Visual element as requested in prompt */}
        <div className="relative mx-auto w-[160px] h-[160px] mb-6">
          <div
            id="wheel-element"
            className="wheel !m-0"
            style={{
              background: currentPattern.gradient,
              transform: `rotate(${rotationAngle}deg)`,
              filter: `blur(${blurFactor * 2}px)`,
            }}
          />

          {/* Additive persistence overlay simulating retinal integration */}
          {blendOpacity > 0 && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
              style={{
                backgroundColor: blendedColor,
                opacity: blendOpacity,
                boxShadow: '0 0 20px rgba(255,255,255,0.1)',
              }}
            />
          )}

          {/* Center spindle cap */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#1e1e1e] border-2 border-white/40 shadow-inner flex items-center justify-center pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
          </div>
        </div>

        {/* Controls */}
        <div className="text-left mb-3">
          <div className="flex justify-between text-xs text-neutral-300 mb-1">
            <span>Prędkość obrotowa (RPM):</span>
            <span className="font-semibold text-white font-mono">{rpm} RPM</span>
          </div>
          <input
            id="wheel-rpm-slider"
            type="range"
            min="0"
            max="3000"
            step="50"
            value={rpm}
            onChange={(e) => setRpm(Number(e.target.value))}
            aria-label="Prędkość obrotowa koła w RPM"
          />
          <div className="flex justify-between text-[10px] text-neutral-500">
            <span>0 (Stop)</span>
            <span>600 RPM</span>
            <span>1500 RPM (Fuzja)</span>
            <span>3000 RPM</span>
          </div>
        </div>

        {/* Disc Pattern Selection */}
        <div className="text-left mb-4">
          <label htmlFor="pattern-selector" className="block text-xs text-neutral-300 mb-1.5">
            Wzór tarczy:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['rgb', 'rainbow', 'half'] as DiscPatternType[]).map((pId) => {
              const p = DISC_PATTERNS[pId];
              const isSelected = patternId === pId;
              return (
                <button
                  key={pId}
                  id={`pattern-btn-${pId}`}
                  onClick={() => setPatternId(pId)}
                  className={`px-2 py-1.5 rounded text-[11px] font-medium transition cursor-pointer border truncate ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                  }`}
                  title={p.description}
                >
                  {pId === 'rgb' ? 'RGB (3 Barwy)' : pId === 'rainbow' ? 'Tęcza 7 Barw' : 'Biel/Czerń'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex gap-2 justify-center mb-4">
          <button
            id="wheel-toggle-btn"
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition cursor-pointer"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Zatrzymaj' : 'Uruchom'}
          </button>

          <button
            id="wheel-persistence-btn"
            onClick={() => setSimulatePersistence(!simulatePersistence)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-medium transition cursor-pointer ${
              simulatePersistence ? 'bg-indigo-600 text-white' : 'bg-white/10 hover:bg-white/20 text-neutral-300'
            }`}
            title="Włącza optyczną symulację bezwładności siatkówki oka (zacieranie sektorów)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {simulatePersistence ? 'Fuzja oka: WŁ.' : 'Fuzja oka: WYŁ.'}
          </button>
        </div>

        {/* Color comparison swatch */}
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 mb-4 text-xs text-left">
          <div className="text-[11px] text-neutral-400 mb-2 font-medium flex items-center justify-between">
            <span>Wynik addytywny:</span>
            <span className="font-mono text-neutral-300">{currentPattern.expectedResult}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <div
                className="h-8 rounded border border-white/20 mb-1 transition-colors"
                style={{ backgroundColor: blendedColor }}
              />
              <span className="text-[10px] text-neutral-400">Widziana szarość (fuzja)</span>
            </div>
            <div>
              <div className="h-8 rounded bg-white border border-white/20 mb-1" />
              <span className="text-[10px] text-neutral-400">Oczekiwana biel (100%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status text from prompt */}
      <div className="pt-2 border-t border-white/5">
        {renderStatus()}
      </div>
    </div>
  );
}
