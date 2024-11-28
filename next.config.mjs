import { createJiti } from "jiti";
import { promises as fs } from "node:fs";
import Icons from "unplugin-icons/webpack";

const jiti = createJiti(import.meta.url);
const loadEnv = (async () => await jiti.import("./src/env.js"))();

const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./imgix-loader.js",
  },
  rewrites: async () => [{ source: "/:rest((?!chamanisme|reiki|reves|tarot).*)", destination: "/traditions-ancestrales/:rest" }],
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
        customCollections: {
          ta: {
            logo: () => fs.readFile("./src/icons/logo.svg", "utf8"),
            stain: () => fs.readFile("./src/icons/stain.svg", "utf8"),
          },
        },
      }),
    );
    return config;
  },
};

export default nextConfig;
