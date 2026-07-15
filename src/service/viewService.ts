const STORAGE_KEY = "eventsphere_views";

function getAll(): Record<string, number> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function incrementView(eventId: string): void {
  if (typeof window === "undefined") return;
  const views = getAll();
  views[eventId] = (views[eventId] ?? 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
}

export function getTotalViews(): number {
  const views = getAll();
  return Object.values(views).reduce((sum, v) => sum + v, 0);
}

export function getViewsForEvent(eventId: string): number {
  return getAll()[eventId] ?? 0;
}