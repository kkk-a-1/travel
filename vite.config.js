import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 部署到 GitHub Pages 時，請把 base 改成你的 repo 名稱：
// 例如 repo 叫 travel-itinerary，base 就要 '/travel-itinerary/'
export default defineConfig({
  plugins: [react()],
  base: '/travel/',
})
