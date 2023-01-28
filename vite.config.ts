import { defineConfig } from 'vite';
import vavite, { VaviteOptions } from 'vavite';
import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'config.env') });

const vaviteOptions: VaviteOptions = {
  serverEntry: 'src/app.ts',
  reloadOn: 'static-deps-change',
  serveClientAssetsInDev: true,
};

export default defineConfig({
  build: {
    ssr: true,
    emptyOutDir: true,
  },
  server: {
    port: Number(process.env.PORT) || 5000,
    strictPort: true,
  },
  plugins: [vavite(vaviteOptions)],
});
