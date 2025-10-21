// my-app/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // If you ever host under a subpath (e.g. /emp-hub/), change this to '/emp-hub/'
    base: '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true, // helpful for debugging production issues
    },
    server: {
        port: 5173,
        open: true,
        // Proxy API/OAuth calls to your Express server during dev
        proxy: {
            '/api': 'http://localhost:3000',
            '/oauth': 'http://localhost:3000',
        },
    },
    preview: {
        port: 5174,
        open: true,
    },
    // Some libraries still reference process.env in browser — this prevents errors
    define: {
        'process.env': {},
    },
})
