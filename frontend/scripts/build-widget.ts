import { build } from 'vite'
import { resolve } from 'path'

const config = resolve(process.cwd(), 'vite.widget.config.ts')

async function buildWidget() {
  try {
    await build({
      configFile: config,
    })

    console.log('Widget built successfully!')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

buildWidget()
