import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';
// https://vite.dev/config/
export default defineConfig({
    base: '/peer-match/',
    plugins: [
        vue(),
        Components(
            {resolvers: [VantResolver()]}
        )
    ],
})
