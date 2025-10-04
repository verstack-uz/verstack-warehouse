// Available app themes defined from FlyonUI framework
export const AppThemes = [
  "light",
  "dark",
  "black",
  "claude",
  "corporate",
  "ghibli",
  "gourmet",
  "luxury",
  "mintlify",
  "pastel",
  "perplexity",
  "shadcn",
  "slack",
  "soft",
  "spotify",
  "valorant",
  "vscode",
] as const;
export type AppTheme = (typeof AppThemes)[number];

// User object type
export const UserRoles = [
  "warehouse manager",
  "foreman",
  "purchasing agent",
  "technical engineer",
  "chief accountant",
  "administrator",
] as const;
export type UserRole = (typeof UserRoles)[number];
export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
}
