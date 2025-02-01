import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/webclient/widget.ts'),
      name: 'ChatterMateWidget',
      fileName: 'widget',
      formats: ['es'],
    },
    outDir: 'public/assets',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        format: 'es',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'widget.css'
          }
          return assetInfo.name
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
})
