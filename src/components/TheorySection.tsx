import React, { useState } from 'react';
import { BookOpen, HelpCircle, Lightbulb, Zap, CheckCircle2, Sliders } from 'lucide-react';

export function TheorySection() {
  const [activeTab, setActiveTab] = useState<'why-gray' | 'talbot' | 'how-white'>('why-gray');

  return (
    <div id="theory-section" className="mt-12 max-w-[960px] w-full bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-white/10 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <Lightbulb className="w-6 h-6 text-amber-400 shrink-0" />
        <div>
          <h3 className="text-lg md:text-xl font-medium text-white m-0">
            Fizyka Percepcji: Dlaczego widzimy Szarość, a nie Biel?
          </h3>
          <p className="text-xs md:text-sm text-neutral-400 mt-0.5">
            Zrozumienie zjawiska fuzji czasowej oraz różnicy między sumowaniem energii a jej uśrednianiem.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        <button
          id="tab-why-gray"
          onClick={() => setActiveTab('why-gray')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'why-gray'
              ? 'bg-white text-black font-semibold'
              : 'bg-white/5 hover:bg-white/10 text-neutral-300'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Zagadka Szarości
        </button>

        <button
          id="tab-talbot"
          onClick={() => setActiveTab('talbot')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'talbot'
              ? 'bg-white text-black font-semibold'
              : 'bg-white/5 hover:bg-white/10 text-neutral-300'
          }`}
        >
          <Zap className="w-4 h-4" />
          Prawo Talbota-Plateau & PWM
        </button>

        <button
          id="tab-how-white"
          onClick={() => setActiveTab('how-white')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'how-white'
              ? 'bg-white text-black font-semibold'
              : 'bg-white/5 hover:bg-white/10 text-neutral-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Kiedy powstaje Czysta Biel?
        </button>
      </div>

      {/* Tab content */}
      <div className="text-neutral-300 text-sm leading-relaxed">
        {activeTab === 'why-gray' && (
          <div className="space-y-4">
            <p>
              Wielu ludzi intuicyjnie zakłada, że skoro światło białe składa się z barw tęczy (czerwonej, zielonej i niebieskiej),
              to po zakręceniu tarczą z tymi barwami powinniśmy ujrzeć <strong>oślepiającą, czystą biel</strong>.
              W rzeczywistości widzimy <strong>ciemnoszary lub popielaty krążek</strong>. Dlaczego tak się dzieje?
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-4">
              <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                <div className="text-white font-medium mb-1.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  Mieszanie w czasie (Tarcza obrotowa)
                </div>
                <p className="text-xs text-neutral-400">
                  W dowolnym punkcie siatkówki barwa czerwona świeci tylko przez <strong>1/3 obrotu</strong>, zielona przez 1/3, a niebieska przez 1/3.
                  Mózg uśrednia strumień fotonów:
                </p>
                <div className="mt-2 font-mono text-xs text-amber-300 bg-black/60 p-2 rounded">
                  E = (1/3 · R) + (1/3 · G) + (1/3 · B) = 33% energii bieli
                </div>
                <p className="text-[11px] text-neutral-500 mt-2">
                  Rezultat: Równomierne pobudzenie wszystkich trzech rodzajów czopków w oku, ale ze <strong>zmniejszoną intensywnością</strong> — czyli szarość.
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                <div className="text-white font-medium mb-1.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Prawdziwa biel (Równoległa emisja)
                </div>
                <p className="text-xs text-neutral-400">
                  Aby uzyskać 100% jasności bieli, wszystkie trzy składowe muszą docierać do oka <strong>jednocześnie i w 100% mocy</strong>:
                </p>
                <div className="mt-2 font-mono text-xs text-emerald-300 bg-black/60 p-2 rounded">
                  E = (1.0 · R) + (1.0 · G) + (1.0 · B) = 100% energii bieli
                </div>
                <p className="text-[11px] text-neutral-500 mt-2">
                  Tak działają subpiksele monitora: świecą obok siebie w tej samej chwili, dając pełną jasność 100% bieli.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'talbot' && (
          <div className="space-y-4">
            <p>
              <strong>Prawo Talbota-Plateau</strong> (sformułowane przez Williama Henry'ego Foxa Talbota i Josepha Plateau w XIX wieku)
              stwierdza, że gdy okresowo migające światło przekracza <strong>krytyczną częstotliwość fuzji migotania (CFF)</strong>,
              ludzki wzrok postrzega stałą, niemigającą jasność równą <em>średniej arytmetycznej natężenia światła w czasie całego okresu</em>:
            </p>

            <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-xs text-center text-neutral-200">
              I<sub>postrzegane</sub> = I<sub>max</sub> × (t<sub>włączone</sub> / T) = I<sub>max</sub> × Wypełnienie (Duty Cycle)
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-medium text-xs uppercase tracking-wider mb-2">Gdzie to spotykamy w życiu codziennym?</h4>
              <ul className="text-xs text-neutral-300 space-y-2 list-disc list-inside">
                <li>
                  <strong>Ściemnianie ekranów smartfonów i monitorów (PWM):</strong> Wyświetlacze OLED i LED nie zmniejszają napięcia diod,
                  lecz wyłączają je i włączają tysiące razy na sekundę. Przy 50% wypełnieniu widzisz 50% jasności.
                </li>
                <li>
                  <strong>Oświetlenie LED w samochodach:</strong> Reflektory i tylne światła w kamerze wideo zdają się gwałtownie migać,
                  ponieważ ich częstotliwość PWM interferuje z klatkażem kamery, choć dla ludzkiego oka świecą jednostajnie.
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'how-white' && (
          <div className="space-y-4">
            <p>
              Czym różni się szary od białego pod względem chromatycznym (barwnym)?
            </p>
            <div className="p-4 rounded-lg bg-black/40 border border-white/5 text-xs space-y-2">
              <p>
                Z punktu widzenia kolorymetrii: <strong>Biel i Szarość mają dokładnie te same proporcje barwne</strong> (x = 0.333, y = 0.333 w przestrzeni CIE XYZ).
                Jedyną rzeczą, która odróżnia biel od szarości, jest <strong>bezwzględna luminancja (ilość światła na jednostkę powierzchni)</strong> oraz kontrast względem otoczenia!
              </p>
              <p>
                Szarość to po prostu „słabiej oświetlona biel”. Gdybyśmy oświetlili wirujące koło RGB trzykrotnie silniejszym reflektorem
                niż otaczające tło, twoje oko zinterpretowałoby je jako białe!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
