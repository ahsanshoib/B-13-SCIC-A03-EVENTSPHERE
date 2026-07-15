export const ADMIN_EMAIL = "admin@eventsphere.com";

export function isAdmin(email: string | null | undefined): boolean {
  return email === ADMIN_EMAIL;
}