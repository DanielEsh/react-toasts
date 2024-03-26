import svg from '@neodx/svg/vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'

const DEFAULT_PORT = 5173

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const { PORT } = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      svg({
        root: 'src/assets',
        output: 'public/sprites',
        metadata: 'src/sprite.gen.ts',
      }),
    ],
    server: {
      port: +PORT || DEFAULT_PORT,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
