import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Plugin para resolver imports figma:asset
    {
      name: 'figma-asset-resolver',
      resolveId(id) {
        if (id.startsWith('figma:asset/')) {
          const assetName = id.replace('figma:asset/', '')
          const resolvedPath = path.resolve(__dirname, './src/assets', assetName)
          // Verificar se o arquivo existe
          if (fs.existsSync(resolvedPath)) {
            return resolvedPath
          }
          // Se não existir, retornar mesmo assim (pode ser processado depois)
          return resolvedPath
        }
        return null
      },
    },
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
})
