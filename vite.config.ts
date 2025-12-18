// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': { // Any request starting with /api will be proxied
                target: 'http://image.tmdb.org/t/p/', // Your backend server's address
                changeOrigin: true, // Changes the origin of the host header to the target URL
                rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove /api prefix from the request path
            },
        },
    },
    define: {
        global: {},
    },
});