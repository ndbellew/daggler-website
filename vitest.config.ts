import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { environment: "node", coverage: { reporter: ["text", "html"] } },
  resolve: {
    alias: {
      "@": new URL("./", import.meta.url).pathname,
      "server-only": new URL("./__tests__/server-only.ts", import.meta.url).pathname,
    },
  },
});
