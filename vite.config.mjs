import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': '/src',  // '@'는 'src' 디렉토리를 가리킵니다
        },
    },
    build: {
        sourcemap: true,  // 소스 맵을 활성화합니다
    },
    optimizeDeps: {
        include: ['@ckeditor/ckeditor5-build-classic'],
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8090',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                configure: (proxy, options) => {
                    // http-proxy 디버깅 활성화
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        console.log('Proxying request to:', proxyReq.getHeader('host'), proxyReq.path);
                    });
                    proxy.on('error', (err, req, res) => {
                        console.error('Proxy error:', err);
                    });
                }
            },
            // OAuth 경로는 프록시하지 않음
            '/oauth2/authorization/google': {
                target: 'http://localhost:8090',
                changeOrigin: true,
                ws: false, // WebSocket 관련 설정, 필요시 설정
            },
        },
    },
});