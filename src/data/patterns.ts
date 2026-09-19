import { DiscPattern } from '../types.ts';

export const DISC_PATTERNS: Record<string, DiscPattern> = {
  rgb: {
    id: 'rgb',
    name: 'Tarcza RGB (3 barwy)',
    gradient: 'conic-gradient(#ff0000 0deg 120deg, #00ff00 120deg 240deg, #0000ff 240deg 360deg)',
    expectedResult: 'Szarość (~33% jasności)',
    rgbFormula: '(R + G + B) / 3 = rgb(85, 85, 85)',
    perceivedLuminance: 33,
    description: 'Każdy kolor zajmuje 1/3 koła. Po wymieszaniu oko otrzymuje 1/3 energii czystej bieli, dając ciemnoszary.',
  },
  rainbow: {
    id: 'rainbow',
    name: 'Tęcza Newtona (7 barw)',
    gradient: 'conic-gradient(#e60000 0deg 51.4deg, #ff7700 51.4deg 102.8deg, #ffdd00 102.8deg 154.2deg, #00cc44 154.2deg 205.7deg, #0099ff 205.7deg 257.1deg, #3300cc 257.1deg 308.5deg, #8800cc 308.5deg 360deg)',
    expectedResult: 'Jasnoszary (~45% jasności)',
    rgbFormula: 'Średnia 7 barw widmowych',
    perceivedLuminance: 45,
    description: 'Klasyczny eksperyment Izaaka Newtona z 1672 r. Dowiódł, że światło białe składa się z kolorów tęczy, ale w odbiciu daje szarość.',
  },
  half: {
    id: 'half',
    name: 'Biel i Czerń (50% / 50%)',
    gradient: 'conic-gradient(#ffffff 0deg 180deg, #000000 180deg 360deg)',
    expectedResult: 'Idealna neutralna szarość (50%)',
    rgbFormula: '(255 + 0) / 2 = rgb(128, 128, 128)',
    perceivedLuminance: 50,
    description: 'Brak barwy, jedynie kontrast jasności. Po wprawieniu w ruch widzimy jednolitą szarość 50%.',
  },
};
