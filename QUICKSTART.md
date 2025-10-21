# ⚡ Quick Start Guide

## Step 1: Install Tailwind CSS

```bash
cd my-app
npm install -D tailwindcss postcss autoprefixer
cd ..
```

## Step 2: Test Locally

```bash
# Run in development mode (hot reload)
npm run dev
```

Visit: http://localhost:5173

## Step 3: Deploy to Production

### On Your Local Machine:
```bash
# Build the frontend
npm run build
```

### On Your EC2 Server:

1. **Upload/Sync the code** (via Git, SCP, or your preferred method)

2. **Update .env for production:**
   ```bash
   nano .env
   ```
   Change:
   ```
   ZOHO_REDIRECT_URI=https://portal.timesharehelpcenter.com/oauth/callback
   ```

3. **Install dependencies:**
   ```bash
   npm install
   cd my-app && npm install -D tailwindcss postcss autoprefixer && cd ..
   ```

4. **Build frontend:**
   ```bash
   npm run build
   ```

5. **Restart your server:**
   ```bash
   pm2 restart employee-portal
   # OR
   sudo systemctl restart employee-portal
   ```

6. **Setup Zoho OAuth:**
   - Visit: https://portal.timesharehelpcenter.com/oauth/start
   - Grant permissions
   - Copy refresh token
   - Add to `.env`: `ZOHO_REFRESH_TOKEN=1000.xxxxx`
   - Restart server again

## Done! 🎉

Visit: **https://portal.timesharehelpcenter.com**

---

For detailed instructions, see README.md and DEPLOYMENT.md
