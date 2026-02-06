# Deployment Guide - Bee Heaven Spa

## 🚀 Vercel Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Enhanced spa website"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `Spa` folder as root directory
   - Click "Deploy"

3. **Configuration**
   - Root Directory: `Spa`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Spa directory**
   ```bash
   cd Spa
   vercel --prod
   ```

## 🔧 Fixing Common Deployment Errors

### Error: "Cannot find module 'webpack'"

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Try building locally first
npm run build
```

### Error: "Module not found"

**Solution:**
Check that all imports in your code match the actual file names (case-sensitive).

### Error: "Build failed"

**Solution:**
1. Make sure all dependencies are in `package.json`
2. Check that there are no TypeScript errors
3. Verify all image imports exist

## 📦 Pre-Deployment Checklist

- [ ] All dependencies installed: `npm install`
- [ ] Local build works: `npm run build`
- [ ] No console errors in development
- [ ] All images are in the correct paths
- [ ] Environment variables set (if any)
- [ ] `.gitignore` includes `node_modules` and `build`

## 🌐 Alternative Deployment Options

### Netlify

1. **Via Netlify Dashboard**
   - Drag and drop the `build` folder
   - Or connect your GitHub repo

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Base directory: `Spa`

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### Traditional Hosting (cPanel, etc.)

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Upload the contents of the `build` folder to your server's public_html directory

3. Configure `.htaccess` for React Router:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## 🐛 Troubleshooting

### Build succeeds locally but fails on Vercel

1. Check Node version compatibility
2. Ensure all dependencies are in `dependencies` not `devDependencies`
3. Check for case-sensitive file name issues

### Images not loading after deployment

1. Verify image paths are relative
2. Check that images are in the `public` or `src/asset` folder
3. Ensure images are committed to git

### Routing not working (404 on refresh)

- The `vercel.json` file should handle this
- For other hosts, configure server to redirect all routes to index.html

## 📊 Performance Optimization

Before deploying, optimize your build:

1. **Optimize Images**
   - Compress images using tools like TinyPNG
   - Convert to WebP format
   - Use appropriate sizes

2. **Code Splitting**
   - Already handled by Create React App
   - Lazy load routes if needed

3. **Environment Variables**
   - Create `.env.production` for production settings
   - Never commit sensitive data

## 🔐 Environment Variables (if needed)

Create `.env.production`:
```
REACT_APP_API_URL=your_api_url
REACT_APP_PHONE=+2348066306125
```

In Vercel:
- Go to Project Settings → Environment Variables
- Add your variables

## ✅ Post-Deployment

1. Test all pages and features
2. Check mobile responsiveness
3. Test all forms and interactions
4. Verify all links work
5. Check console for errors
6. Test on different browsers

## 📞 Support

If deployment issues persist:
1. Check Vercel deployment logs
2. Run `npm run build` locally to see errors
3. Check browser console for runtime errors

---

**Your spa website is ready to go live! 🎉**
