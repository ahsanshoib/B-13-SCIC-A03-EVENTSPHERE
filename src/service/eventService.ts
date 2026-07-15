import { EventItem, staticEventsData } from "@/types/event";

const STORAGE_KEY = "eventsphere_events";
const DATA_VERSION_KEY = "eventsphere_data_version";
const CURRENT_DATA_VERSION = "2"; 

function seedIfEmpty(): void {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem(STORAGE_KEY);
  const version = localStorage.getItem(DATA_VERSION_KEY);

  if (!existing || version !== CURRENT_DATA_VERSION) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staticEventsData));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
  }
}

export function getAllEvents(): EventItem[] {
  if (typeof window === "undefined") return staticEventsData;
  seedIfEmpty();
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as EventItem[]) : staticEventsData;
}

export function getEventById(id: string): EventItem | undefined {
  return getAllEvents().find((e) => e.id === id);
}

export function addEvent(event: Omit<EventItem, "id">): EventItem {
  const events = getAllEvents();
  const newEvent: EventItem = {
    ...event,
    id: Date.now().toString(),
  };
  const updated = [newEvent, ...events];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newEvent;
}

export function updateEvent(
  id: string,
  updates: Partial<EventItem>
): EventItem | null {
  const events = getAllEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;
  events[index] = { ...events[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  return events[index];
}

export function deleteEvent(id: string): boolean {
  const events = getAllEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function getRelatedEvents(
  currentId: string,
  category: string,
  limit = 3
): EventItem[] {
  return getAllEvents()
    .filter((e) => e.id !== currentId && e.category === category)
    .slice(0, limit);
}