import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svg from '@neodx/svg/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svg({
      root: 'src/assets',
      output: 'public/sprites',
      metadata: 'src/sprite.gen.ts',
    }),
  ],
  server: {
    port: 3000,
  },
})
