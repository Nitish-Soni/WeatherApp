import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env': {
      VITE_API_KEY: JSON.stringify(process.env.VITE_API_KEY),
      VITE_API_URL: JSON.stringify(process.env.VITE_WEATHER_API_URL),
      VITE_SEARCH_API_URL: JSON.stringify(process.env.VITE_SEARCH_API_URL),
    },
  },
});
