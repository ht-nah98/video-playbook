import { defineConfig, normalizePath, type Plugin } from 'vite';
import { cpSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
// mascot-mv (the repo studio3d lives in): projects/<p>/scene3d.ts + data3d/ are 3D videos of its projects (?set=<p>)
const mascotRoot = path.resolve(repoRoot, '..');
const assetDirs = ['audio', 'data'];

// Git can check out directory symlinks as plain files on Windows. Serve the
// original assets through Vite and copy them into builds without using symlinks.
function repoAssets(): Plugin {
  return {
    name: 'repo-assets',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (assetDirs.some((dir) => req.url?.startsWith(`/${dir}/`))) {
          req.url = `/@fs/${encodeURI(normalizePath(repoRoot))}${req.url}`;
        } else if (req.url?.startsWith('/projects/') && req.url.includes('/data3d/')) {
          req.url = `/@fs/${encodeURI(normalizePath(mascotRoot))}${req.url}`;
        }
        next();
      });
    },
    writeBundle(options) {
      if (!options.dir) return;
      for (const dir of assetDirs) {
        cpSync(path.join(repoRoot, dir), path.join(options.dir, dir), { recursive: true });
      }
    },
  };
}

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [repoAssets()],
  // PDOOM_NO_HMR=1: no live reload (export renders must not reload mid-run when a file changes)
  server: { port: 5173, strictPort: false, hmr: process.env.PDOOM_NO_HMR ? false : undefined, fs: { allow: [repoRoot, path.join(mascotRoot, 'projects')] } },
  // projects/<p>/scene3d.ts sit outside this app: resolve their 'three' from here (one copy)
  resolve: { alias: { '@root': repoRoot, '@3d': path.join(import.meta.dirname, 'src') }, dedupe: ['three'] },
  build: { target: 'esnext', assetsInlineLimit: 0 },
});
