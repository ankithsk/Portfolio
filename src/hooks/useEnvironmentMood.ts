export type TimeOfDay = "morning" | "day" | "evening" | "night";

export interface MoodConfig {
  timeOfDay: TimeOfDay;
  // Lighting
  ambientColor: string;
  ambientIntensity: number;
  directionalColor: string;
  directionalIntensity: number;
  screenEmissiveColor: string;
  bgColor: string;
  // Character energy (timeScale multiplier for idle anims)
  characterEnergy: number;
  // Particle config
  particleSpeed: number;
  particleCount: number; // multiplier: 1 = normal, 0.5 = calmer
  particleOpacity: number;
}

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

const moodPresets: Record<TimeOfDay, MoodConfig> = {
  morning: {
    timeOfDay: "morning",
    ambientColor: "#ffecd2",
    ambientIntensity: 0.7,
    directionalColor: "#ffb347",
    directionalIntensity: 1.1,
    screenEmissiveColor: "#f0a500",
    bgColor: "#0a0818",
    characterEnergy: 1.3,
    particleSpeed: 1.2,
    particleCount: 1.1,
    particleOpacity: 0.8,
  },
  day: {
    timeOfDay: "day",
    ambientColor: "#ffffff",
    ambientIntensity: 0.64,
    directionalColor: "#00ff87",
    directionalIntensity: 1.0,
    screenEmissiveColor: "#a855f7",
    bgColor: "#050510",
    characterEnergy: 1.0,
    particleSpeed: 1.0,
    particleCount: 1.0,
    particleOpacity: 1.0,
  },
  evening: {
    timeOfDay: "evening",
    ambientColor: "#ffd4a8",
    ambientIntensity: 0.55,
    directionalColor: "#ff6b35",
    directionalIntensity: 0.8,
    screenEmissiveColor: "#e07020",
    bgColor: "#0d0815",
    characterEnergy: 0.85,
    particleSpeed: 0.7,
    particleCount: 0.8,
    particleOpacity: 0.7,
  },
  night: {
    timeOfDay: "night",
    ambientColor: "#b8c6ff",
    ambientIntensity: 0.4,
    directionalColor: "#4a6cf7",
    directionalIntensity: 0.6,
    screenEmissiveColor: "#6366f1",
    bgColor: "#020208",
    characterEnergy: 0.65,
    particleSpeed: 0.4,
    particleCount: 0.5,
    particleOpacity: 0.5,
  },
};

let cached: MoodConfig | null = null;

export function getEnvironmentMood(): MoodConfig {
  if (cached) return cached;
  cached = moodPresets[getTimeOfDay()];
  return cached;
}
