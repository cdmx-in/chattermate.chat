import { build } from 'vite'
import { resolve } from 'path'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load development environment variables
dotenv.config({ path: '.env.dev' })

const config = resolve(process.cwd(), 'vite.widget.config.ts')
const assetsDir = resolve(process.cwd(), '../backend/assets')
const filesToKeep = ['widget.js', 'widget.css']

async function buildWidgetDev() {
  try {
    console.log('Building widget with development configuration...')
    
    // Set NODE_ENV to development for the build
    process.env.NODE_ENV = 'development'
    
    // Run the Vite build
    await build({ configFile: config })
    console.log('Vite build completed')

    // Copy CSS file from unused directory to the root assets directory
    const unusedDir = path.join(assetsDir, 'unused')
    if (fs.existsSync(unusedDir)) {
      const files = fs.readdirSync(unusedDir)
      const cssFile = files.find(file => file.endsWith('.css'))
      
      if (cssFile) {
        const sourcePath = path.join(unusedDir, cssFile)
        const destPath = path.join(assetsDir, 'widget.css')
        
        fs.copyFileSync(sourcePath, destPath)
        console.log(`Copied CSS file to ${destPath}`)
      }
      
      // Clean up unused directory
      fs.rmSync(unusedDir, { recursive: true, force: true })
      console.log('Cleaned up unused directory')
    }

    // Clean up the assets directory - keep only widget.js and widget.css
    const entries = fs.readdirSync(assetsDir)
    
    for (const entry of entries) {
      if (!filesToKeep.includes(entry)) {
        const entryPath = path.join(assetsDir, entry)
        
        if (fs.statSync(entryPath).isDirectory()) {
          fs.rmSync(entryPath, { recursive: true, force: true })
        } else {
          fs.unlinkSync(entryPath)
        }
      }
    }
    
    console.log(`Cleaned up assets directory, keeping only: ${filesToKeep.join(', ')}`)
    console.log('Development widget built successfully!')
  } catch (error) {
    console.error('Development build failed:', error)
    process.exit(1)
  }
}

buildWidgetDev()
