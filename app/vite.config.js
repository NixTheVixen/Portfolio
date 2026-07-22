import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` is applied only for the production build so GitHub Pages serves assets
// from /Portfolio/ (must match the repo name). Local `npm run dev` stays at root.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Portfolio/' : '/',
}))
