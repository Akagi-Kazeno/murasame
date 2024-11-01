import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import tailwindcss from 'tailwindcss';
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [uni(), uniTailwind()],
});
