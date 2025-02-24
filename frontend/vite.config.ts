import { fileURLToPath, URL } from 'node:url'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'fs'
import path from 'path'

// Check if enterprise module exists
const isEnterpriseAvailable = (() => {
  try {
    const enterprisePath = path.resolve(process.cwd(), 'src/modules/enterprise')
    const exists = fs.existsSync(enterprisePath)
    console.log('Enterprise module path:', enterprisePath, 'exists:', exists)
    return exists
  } catch (error) {
    console.error('Error checking enterprise module:', error)
    return false
  }
})()

// Plugin to handle enterprise module imports
const enterpriseModulePlugin = () => {
  return {
    name: 'enterprise-module-resolver',
    config(config: UserConfig) {
      // Add enterprise availability as a global constant
      return {
        define: {
          __ENTERPRISE_AVAILABLE__: isEnterpriseAvailable
        }
      }
    },
    resolveId(id: string) {
      // Handle enterprise module imports
      if (id.includes('@/modules/enterprise/') && !isEnterpriseAvailable) {
        return '\0virtual:empty-component'
      }
      return null
    },
    load(id: string) {
      if (id === '\0virtual:empty-component') {
        return `
          import { defineComponent, h } from 'vue'
          export default defineComponent({
            name: 'EmptyEnterpriseComponent',
            render() {
              return h('div', { class: 'empty-enterprise-component' }, 'This feature requires the enterprise version')
            }
          })
        `
      }
      return null
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    enterpriseModulePlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    headers: {
      'Service-Worker-Allowed': '/',
    },
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        'firebase-messaging-sw': './public/firebase-messaging-sw.js',
      },
    },
  },
})
