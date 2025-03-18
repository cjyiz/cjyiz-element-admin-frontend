import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'path';

const pathSrc = path.resolve(__dirname, 'src');
// https://vite.dev/config/
export default defineConfig({
  // 路径别名
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
      dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'), //指定自动导入函数ts类型声明文件路径
    }),
    Components({
      dts: path.resolve(pathSrc, 'types', 'components.d.ts'), //指定自动导入组件TS类型声明文件路径
    }),
  ],
});
