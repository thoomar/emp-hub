# 🚀 Deployment Checklist

## Pre-Deployment

### 1. Install Tailwind CSS
```bash
cd my-app
npm install -D tailwindcss postcss autoprefixer
cd ..
```

### 2. Test Locally
```bash
# Test development mode
npm run dev
# Visit http://localhost:5173

# Test production build
npm run build
npm start
# Visit http://localhost:3000
```

### 3. Verify All Features
- [ ] Home page loads with all sections
- [ ] External links open correctly
- [ ] Internal navigation works
- [ ] Dark mode toggle functions
- [ ] Responsive design on mobile/tablet

## Production Deployment

### 1. Update Environment Variables

On your EC2 server, edit `.env`:

```bash
nano /path/to/emp-hub/.env
```

Change:
```env
ZOHO_REDIRECT_URI=https://portal.timesharehelpcenter.com/oauth/callback
PORT=3000
NODE_ENV=production
```

### 2. Update Zoho Console

Go to https://api-console.zoho.com/ and:
- [ ] Add redirect URI: `https://portal.timesharehelpcenter.com/oauth/callback`
- [ ] Verify scopes: `ZohoCRM.modules.deals.READ,ZohoCRM.users.READ`

### 3. Build and Deploy

```bash
# On your EC2 server
cd /path/to/emp-hub

# Pull latest code (if using Git)
git pull origin main

# Install dependencies
npm install
cd my-app
npm install -D tailwindcss postcss autoprefixer
cd ..

# Build frontend
npm run build

# Restart server
pm2 restart employee-portal
# OR
sudo systemctl restart employee-portal
```

### 4. Configure Zoho OAuth

1. Visit: https://portal.timesharehelpcenter.com/oauth/start
2. Grant permissions in Zoho
3. Copy the refresh token from the callback page
4. Update `.env`:
   ```bash
   nano /path/to/emp-hub/.env
   # Add: ZOHO_REFRESH_TOKEN=1000.xxxxxx
   ```
5. Restart server again

### 5. Verify Deployment

- [ ] Visit https://portal.timesharehelpcenter.com
- [ ] Check Zoho status badge shows "Connected"
- [ ] Test external links (Time Off, Sales Tracker)
- [ ] Test internal navigation
- [ ] Check browser console for errors
- [ ] Test on mobile device

## Quick Commands Reference

### On Your EC2 Server

```bash
# View server logs
pm2 logs employee-portal

# Restart server
pm2 restart employee-portal

# Check server status
pm2 status

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Rollback Plan

If something goes wrong:

```bash
# Stop the server
pm2 stop employee-portal

# Revert to previous version (if using Git)
git checkout <previous-commit>

# Rebuild
npm run build

# Start server
pm2 start employee-portal
```

## Post-Deployment

### Monitor for 24 Hours

- [ ] Check server logs for errors
- [ ] Monitor CPU/memory usage
- [ ] Verify Zoho API calls work
- [ ] Get employee feedback

### Optional Improvements

1. **Add Google Analytics** (if needed)
2. **Set up error monitoring** (e.g., Sentry)
3. **Configure backup strategy**
4. **Document additional features** as they're added

## Common Issues & Solutions

### Issue: "Unknown at rule @tailwind" in IDE
**Solution**: This is a CSS linting warning. It won't affect functionality - Tailwind processes these directives during build.

### Issue: 404 on page refresh
**Solution**: The Express server already handles SPA fallback. Check that `my-app/dist` exists.

### Issue: CORS errors
**Solution**: All domains are whitelisted. Check browser console for actual origin being blocked.

### Issue: Styles not applying
**Solution**: 
```bash
cd my-app
npm install -D tailwindcss postcss autoprefixer
npm run build
```

---

Need help? Check the main README.md for detailed documentation.
