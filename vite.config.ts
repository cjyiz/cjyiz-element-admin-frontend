import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'path';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

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
      resolvers: [
        // 自动导入Element Plus相关函数
        ElementPlusResolver(),
        // 自动导入图标
        IconsResolver(),
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
      dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'), //指定自动导入函数ts类型声明文件路径
    }),
    Components({
      resolvers: [
        // 自动导入Element Plus相关函数
        ElementPlusResolver(),
        // 自动导入图标
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
      dts: path.resolve(pathSrc, 'types', 'components.d.ts'), //指定自动导入组件TS类型声明文件路径
    }),
    Icons({
      autoInstall: true, //自动安装图标库
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
});
