import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: 'car-rental-app',
      filename: 'remoteEntry.js',
      
      exposes: {
        './CarSearch': './src/components/CarSearch.tsx',
        './UserDashboard': './src/components/UserDashboard.tsx'
        // Define your local components here
      },
      shared: ['react', 'react-dom','react-router-dom']
    })
  ],
  build: {
    target: 'esnext',
  }
})
