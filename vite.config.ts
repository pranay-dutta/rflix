// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // ── group by *package root* ───────────────────────────
          const parts = id.split("node_modules/")[1].split("/");
          const pkg = parts[0].startsWith("@")
            ? `${parts[0]}/${parts[1]}` // @scope/name
            : parts[0]; // name

          // keep core React runtime together
          if (["react", "react-dom", "scheduler", "use-sync-external-store"].includes(pkg))
            return "react-vendor";

          // everything else: one chunk per package
          return pkg;
        },
      },
    },
  },
});
