export type DiscPatternType = 'rgb' | 'rainbow' | 'half' | 'benham';

export interface DiscPattern {
  id: DiscPatternType;
  name: string;
  gradient: string;
  expectedResult: string;
  rgbFormula: string;
  perceivedLuminance: number; // 0 to 100%
  description: string;
}

export interface FlasherState {
  frequency: number; // Hz (1 to 100)
  dutyCycle: number; // Percentage (10 to 90)
  isRunning: boolean;
  slowMotion: boolean;
  simulateRetina: boolean; // Simulates human eye integration curve
}

export interface WheelState {
  rpm: number; // 0 to 3000
  pattern: DiscPatternType;
  isRunning: boolean;
  simulatePersistence: boolean;
}
