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
});
