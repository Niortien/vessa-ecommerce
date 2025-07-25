import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // (optionnel) évite les erreurs eslint au build
  },
  // tu peux ajouter d'autres options ici
};

export default withFlowbiteReact(nextConfig);
