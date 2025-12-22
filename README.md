# Travel Itinerary (React + Vite + Tailwind)

## 1) 本機開發
```bash
npm install
npm run dev
```

## 2) 上傳到 GitHub
```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/<你的帳號>/<你的repo>.git
git push -u origin main
```

## 3) 部署到 GitHub Pages（gh-pages）
### A. 修改 base
打開 `vite.config.js`：
把 base 改成你的 repo 名稱，例如 repo 叫 `travel-itinerary`：
```js
base: '/travel-itinerary/',
```

### B. 執行 deploy
```bash
npm run deploy
```

完成後網址：
`https://<你的帳號>.github.io/<你的repo>/`
