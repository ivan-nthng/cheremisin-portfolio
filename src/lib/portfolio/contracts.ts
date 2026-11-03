export const PORTFOLIO_PROJECT_IDS = [
  "taxi-aggregator-support-workspace",
  "ds-hito",
  "litres",
  "peruse",
  "wrike",
] as const;

export type PortfolioProjectId = (typeof PORTFOLIO_PROJECT_IDS)[number];
