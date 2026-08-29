import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Bind all interfaces (IPv4 + IPv6). Without this the dev server binds
    // IPv6 loopback only, and browsers that resolve `localhost` to 127.0.0.1
    // first get a connection refused.
    host: true,
    port: 5173,
    strictPort: true,
  },
})
