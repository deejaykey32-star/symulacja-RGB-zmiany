import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Eye, Info, Sparkles } from 'lucide-react';

export function FlasherSim() {
  const [freq, setFreq] = useState<number>(8); // 1 - 100 Hz
  const [dutyCycle, setDutyCycle] = useState<number>(50); // 10% - 90%
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isLightOn, setIsLightOn] = useState<boolean>(false);
  const [simulateRetina, setSimulateRetina] = useState<boolean>(false);

  const reqRef = useRef<number | null>(null);
  const lastStateRef = useRef<boolean>(false);

  // Optical persistence integration constant (~30-50ms retinal integration window)
  const isHighFreq = freq >= 45;

  useEffect(() => {
    if (!isRunning) {
      setIsLightOn(false);
      return;
    }

    const periodMs = 1000 / freq;
    const onDurationMs = periodMs * (dutyCycle / 100);

    const updateFrame = (now: number) => {
      const cycleTime = now % periodMs;
      const state = cycleTime < onDurationMs;
      if (state !== lastStateRef.current) {
        lastStateRef.current = state;
        setIsLightOn(state);
      }
      reqRef.current = requestAnimationFrame(updateFrame);
    };

    reqRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [freq, dutyCycle, isRunning]);

  // Perceived gray level based on duty cycle (Talbot-Plateau Law)
  // Perceived RGB value = 255 * (dutyCycle / 100)
  const perceivedBrightness = Math.round(255 * (dutyCycle / 100));
  const perceivedColor = `rgb(${perceivedBrightness}, ${perceivedBrightness}, ${perceivedBrightness})`;

  // Display background:
  // If simulated retina is ON or frequency is high and user wants filtered persistence,
  // show the blended perceived color; otherwise show real time flash
  const displayBg = !isRunning
    ? '#000000'
    : simulateRetina || freq > 60
    ? perceivedColor
    : isLightOn
    ? '#ffffff'
    : '#000000';

  // Dynamic status text
  const renderStatus = () => {
    if (!isRunning) {
      return (
        <span className="status-text">
          Symulacja <span className="highlight">zatrzymana</span>. Naciśnij Odtwórz, aby wznowić.
        </span>
      );
    }
    if (freq <= 12) {
      return (
        <span className="status-text">
          Przy <span className="highlight">{freq} Hz</span>: Wyraźne migotanie (stroboskop). Oko bez trudu rejestruje osobno 100% biel i czerń.
        </span>
      );
    }
    if (freq < 45) {
      return (
        <span className="status-text">
          Przy <span className="highlight">{freq} Hz</span>: Szybkie pulsowanie. Mózg zaczyna łączyć błyski, obraz staje się niestabilny.
        </span>
      );
    }
    if (freq <= 65) {
      return (
        <span className="status-text">
          Przy <span className="highlight">{freq} Hz</span>: <span className="highlight">Próg fuzji migotania (CFF)</span>. Błyski zlewają się w jednolitą <span className="highlight">SZAROŚĆ</span>!
        </span>
      );
    }
    return (
      <span className="status-text">
        Przy <span className="highlight">{freq} Hz</span>: Pełna fuzja. Widzisz idealną <span className="highlight">SZAROŚĆ ({dutyCycle}%)</span>, mimo że piksel świeci wyłącznie bielą lub gaśnie!
      </span>
    );
  };

  return (
    <div id="sim-box-flasher" className="sim-box">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3>1. Fuzja Migotania (PWM)</h3>
          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/80 font-mono">
            {freq} Hz
          </span>
        </div>
        <p className="text-xs text-neutral-400 text-left mb-4">
          Czasowe włączanie i wyłączanie 100% bieli.
        </p>

        {/* Visual box as requested in prompt */}
        <div
          id="flasher-element"
          className="flasher"
          style={{
            backgroundColor: displayBg,
            boxShadow:
              displayBg === '#ffffff'
                ? '0 0 35px rgba(255,255,255,0.7)'
                : `0 0 20px rgba(255,255,255,${(dutyCycle / 100) * 0.3})`,
          }}
        >
          {/* Subtle center indicator */}
          <span
            className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded transition-opacity"
            style={{
              backgroundColor: displayBg === '#ffffff' ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.2)',
              color: displayBg === '#ffffff' ? '#ffffff' : '#e0e0e0',
              opacity: isHighFreq ? 0.7 : 0.9,
            }}
          >
            {displayBg === '#ffffff' ? 'ON (100% Biel)' : isRunning && isHighFreq ? 'FUZJA (SZAROŚĆ)' : 'OFF (0%)'}
          </span>
        </div>

        {/* Controls */}
        <div className="text-left mb-3">
          <div className="flex justify-between text-xs text-neutral-300 mb-1">
            <span>Częstotliwość migania:</span>
            <span className="font-semibold text-white font-mono">{freq} Hz</span>
          </div>
          <input
            id="flasher-freq-slider"
            type="range"
            min="1"
            max="80"
            value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
            aria-label="Częstotliwość migotania w Hz"
          />
          <div className="flex justify-between text-[10px] text-neutral-500">
            <span>1 Hz (Błysk)</span>
            <span>30 Hz</span>
            <span>60 Hz (Próg CFF)</span>
            <span>80 Hz</span>
          </div>
        </div>

        <div className="text-left mb-4">
          <div className="flex justify-between text-xs text-neutral-300 mb-1">
            <span>Wypełnienie impulsu (Duty Cycle):</span>
            <span className="font-semibold text-white font-mono">{dutyCycle}%</span>
          </div>
          <input
            id="flasher-duty-slider"
            type="range"
            min="10"
            max="90"
            step="5"
            value={dutyCycle}
            onChange={(e) => setDutyCycle(Number(e.target.value))}
            aria-label="Wypełnienie impulsu PWM w procentach"
          />
          <div className="flex justify-between text-[10px] text-neutral-500">
            <span>10% (Ciemny)</span>
            <span>50% (Średni szary)</span>
            <span>90% (Jasny)</span>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex gap-2 justify-center mb-4">
          <button
            id="flasher-toggle-btn"
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition cursor-pointer"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Zatrzymaj' : 'Uruchom'}
          </button>

          <button
            id="flasher-retina-btn"
            onClick={() => setSimulateRetina(!simulateRetina)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-medium transition cursor-pointer ${
              simulateRetina ? 'bg-indigo-600 text-white' : 'bg-white/10 hover:bg-white/20 text-neutral-300'
            }`}
            title="Pokazuje teoretyczny obraz po uśrednieniu przez siatkówkę oka (Prawo Talbota-Plateau)"
          >
            <Eye className="w-3.5 h-3.5" />
            {simulateRetina ? 'Filtr oka: WŁ.' : 'Filtr oka: WYŁ.'}
          </button>
        </div>

        {/* Color comparison swatch */}
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 mb-4 text-xs text-left">
          <div className="text-[11px] text-neutral-400 mb-2 font-medium flex items-center justify-between">
            <span>Porównanie fotometryczne:</span>
            <span className="font-mono text-neutral-300">RGB({perceivedBrightness}, {perceivedBrightness}, {perceivedBrightness})</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <div
                className="h-8 rounded border border-white/20 mb-1 transition-colors"
                style={{ backgroundColor: perceivedColor }}
              />
              <span className="text-[10px] text-neutral-400">Postrzegana szarość</span>
            </div>
            <div>
              <div className="h-8 rounded bg-white border border-white/20 mb-1" />
              <span className="text-[10px] text-neutral-400">Czysta biel (100%)</span>
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
