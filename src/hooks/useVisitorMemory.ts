const STORAGE_KEY = "portfolio4d";

interface VisitorData {
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
}

interface VisitorMemory {
  isFirstVisit: boolean;
  isReturning: boolean;
  visitCount: number;
}

function readStorage(): VisitorData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStorage(data: VisitorData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or blocked — degrade silently
  }
}

let cached: VisitorMemory | null = null;

export function getVisitorMemory(): VisitorMemory {
  if (cached) return cached;

  const now = new Date().toISOString();
  const existing = readStorage();

  if (!existing) {
    writeStorage({ visitCount: 1, firstVisit: now, lastVisit: now });
    cached = { isFirstVisit: true, isReturning: false, visitCount: 1 };
  } else {
    const updated: VisitorData = {
      ...existing,
      visitCount: existing.visitCount + 1,
      lastVisit: now,
    };
    writeStorage(updated);
    cached = {
      isFirstVisit: false,
      isReturning: true,
      visitCount: updated.visitCount,
    };
  }

  return cached;
}
