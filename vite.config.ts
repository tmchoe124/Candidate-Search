import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
  },
});
