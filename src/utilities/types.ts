// Define the available themes (from FlyonUI framework) for the application
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
