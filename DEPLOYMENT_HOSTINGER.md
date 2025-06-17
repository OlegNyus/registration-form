# Deploying React App to Hostinger - Static Deployment Guide

## 🚨 Important Notice
This deployment is configured for **static hosting only**. The following features are **disabled**:
- AI functionality (Claude API)
- File upload capabilities  
- MD file management
- Backend server features

## 📋 Prerequisites
- Hostinger hosting account
- Node.js installed locally
- Git (optional, for version control)

## 🔧 Deployment Steps

### Step 1: Build the Static Application
```bash
# Install dependencies (if not already done)
npm install

# Build for static deployment
npm run build:static
```

This creates a `dist` folder with all static files.

### Step 2: Upload to Hostinger

#### Option A: File Manager (Recommended)
1. Log in to your Hostinger control panel
2. Open **File Manager**
3. Navigate to `public_html` folder
4. Delete any existing files (if this is a fresh deployment)
5. Upload ALL contents from your `dist` folder to `public_html`
   - **Important**: Upload the contents OF the dist folder, not the folder itself
   - Your `public_html` should contain: `index.html`, `assets/` folder, etc.

#### Option B: FTP/SFTP
```bash
# Using FileZilla or any FTP client:
# Host: your-domain.com or IP provided by Hostinger
# Username: your hosting username  
# Password: your hosting password
# Port: 21 (FTP) or 22 (SFTP)

# Upload all contents from /dist/ to /public_html/
```

### Step 3: Configure Hostinger Settings

#### Enable HTTPS (Recommended)
1. In Hostinger control panel, go to **SSL/TLS**
2. Enable "Force HTTPS Redirect"

#### Set Up Custom Error Pages (Optional)
1. Create `.htaccess` file in `public_html` with:
```apache
# Handle React Router (SPA routing)
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## 🎯 Testing Your Deployment

1. Visit your domain: `https://yourdomain.com`
2. Test navigation between pages
3. Verify that all static assets load correctly
4. Check browser console for any errors

## 🔄 Updating Your Site

When you make changes:
```bash
# 1. Make your changes locally
# 2. Test locally with:
npm run dev

# 3. Build updated version:
npm run build:static

# 4. Upload new dist contents to Hostinger
```

## ⚡ Performance Optimization

### Enable Compression
Your `.htaccess` file already includes gzip compression rules.

### Image Optimization
- Use WebP format when possible
- Compress images before uploading
- Consider using a CDN for images

### Monitoring
- Use Google PageSpeed Insights to test performance
- Monitor your site regularly for issues

## 🚨 Limitations of Static Deployment

### Features Marked as "Coming Soon":
- **AI Chat**: Shows friendly "Coming Soon" message with rocket emoji
- **File Management**: MD viewer and upload features display "Coming Soon" badges
- **File Uploads**: Upload buttons are disabled with informative messages

### Still Available:
- ✅ Full React functionality 
- ✅ Client-side routing (hash-based)
- ✅ Local storage features
- ✅ Static content display
- ✅ Form handling (client-side validation)
- ✅ Professional "Coming Soon" messaging for unavailable features

## 🛠️ Troubleshooting

### Common Issues:

**1. Blank page after deployment**
- Check browser console for errors
- Verify all files uploaded correctly
- Ensure `.htaccess` is properly configured

**2. 404 errors on direct URL access**  
- Add the `.htaccess` rewrite rules above
- Make sure `.htaccess` is in the root `public_html` folder

**3. CSS/JS not loading**
- Check file paths in browser dev tools
- Verify `base: './'` is set in `vite.config.js`
- Ensure assets folder uploaded correctly

**4. Slow loading**
- Enable gzip compression via `.htaccess`
- Optimize images and assets
- Consider using Hostinger's CDN if available

## 🔗 Alternative Deployment Options

If you need the full functionality (AI, file uploads), consider:

1. **VPS Hosting**: Upgrade to Hostinger VPS for Node.js support
2. **Vercel/Netlify**: Free tiers with serverless function support  
3. **Railway/Render**: Node.js hosting platforms
4. **AWS/Google Cloud**: Full-featured cloud platforms

## 📞 Support

- **Hostinger Support**: Available 24/7 via chat
- **File Issues**: Check Hostinger File Manager help docs
- **Domain Issues**: Verify DNS settings in Hostinger panel

---

**Last Updated**: $(date)
**Deployment Type**: Static (Frontend Only)
**Compatible Hosting**: Shared/Static hosting plans 