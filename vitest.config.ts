import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": `${root}src`,
      "server-only": `${root}src/lib/portfolio/server/__tests__/server-only.ts`,
    },
  },
  test: {
    environment: "node",
    include: ["src/lib/portfolio/**/__tests__/**/*.test.ts"],
    restoreMocks: true,
  },
});
