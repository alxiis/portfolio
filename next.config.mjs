// En production sur GitHub Pages, le site vit sous /portfolio (défini par le workflow).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = { output: 'export', images: { unoptimized: true }, basePath: basePath || undefined };
export default nextConfig;
