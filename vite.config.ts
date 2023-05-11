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
              runtimeCaching: [
                {
                  urlPattern: /^https?.*/,
                  handler: "NetworkFirst",
                  options: {
                    cacheName: "https-calls",
                    networkTimeoutSeconds: 15,
                    expiration: {
                      maxEntries: 150,
                      maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
              ],
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
