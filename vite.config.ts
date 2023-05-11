import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { generateSW } from "workbox-build";

const swDest = "./dist/serviceworker.js";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        {
          name: "generateServiceWorker",
          writeBundle() {
            generateSW({
              swDest,
              globDirectory: "./dist",
              globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg}"],
              cleanupOutdatedCaches: true,
            }).then(({ count, size }) => {
              console.log(
                `Generated ${swDest}, which precaches ${count} assets totaling ${size} bytes.`
              );
            });
          },
        },
      ],
    },
  },
});
