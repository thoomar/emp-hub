# Employee Portal - Timeshare Help Center

A modern employee portal that provides centralized access to time off requests, live sales tracking, and internal resources.

## 🚀 Features

### External Links
- **Time Off Requests**: Direct link to https://timeoff.timesharehelpcenter.com
- **Live Sales Tracker**: Direct link to https://lst.timesharehelpcenter.com

### Internal Features
- **Call of Fame**: Leaderboard showing top performers
- **Knowledge Base**: Access to documentation, SOPs, and FAQs
- **Calculator**: Financial calculations (coming soon)
- **Commissions**: Track earnings and payout schedules (coming soon)

### Technical Features
- ✅ Zoho CRM OAuth integration
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS
- ✅ Express.js backend API
- ✅ React + Vite frontend

## 📋 Prerequisites

- Node.js 18+ (you're running Node 22)
- npm or yarn
- Access to Zoho CRM API credentials

## 🛠️ Installation

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install Tailwind CSS in frontend
cd my-app
npm install -D tailwindcss postcss autoprefixer
cd ..
```

### 2. Environment Configuration

The `.env` file is already configured with your Zoho credentials. For production deployment:

```env
# Update the redirect URI for production
ZOHO_REDIRECT_URI=https://portal.timesharehelpcenter.com/oauth/callback
```

### 3. Zoho OAuth Setup

1. **First time setup** - Visit the OAuth consent flow:
   ```
   https://portal.timesharehelpcenter.com/oauth/start
   ```

2. **Grant permissions** in the Zoho consent screen

3. **Copy the refresh token** from the callback page

4. **Update .env** with the refresh token:
   ```env
   ZOHO_REFRESH_TOKEN=1000.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

5. **Restart the server** for changes to take effect

## 🏃 Running Locally

### Development Mode (with hot reload)

```bash
# Run both backend and frontend in dev mode
npm run dev
```

This will start:
- Backend API: http://localhost:3000
- Frontend dev server: http://localhost:5173

### Production Mode

```bash
# Build the frontend
npm run build

# Start the server (serves built frontend + API)
npm start
```

The app will be available at http://localhost:3000

## 🌐 Production Deployment on EC2

### 1. Build the Application

```bash
npm run build
```

This compiles the React app into `my-app/dist/`

### 2. Update Environment Variables

On your EC2 server, update `.env`:

```env
PORT=3000
ZOHO_REDIRECT_URI=https://portal.timesharehelpcenter.com/oauth/callback
NODE_ENV=production
```

### 3. Start the Server

**Option A: Using PM2 (Recommended)**
```bash
pm2 start index.js --name "employee-portal"
pm2 save
```

**Option B: Using systemd**
Create `/etc/systemd/system/employee-portal.service`:
```ini
[Unit]
Description=Employee Portal
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/path/to/emp-hub
ExecStart=/usr/bin/node index.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable employee-portal
sudo systemctl start employee-portal
```

### 4. Configure Nginx (Reverse Proxy)

Add to your Nginx configuration:

```nginx
server {
    listen 80;
    server_name portal.timesharehelpcenter.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name portal.timesharehelpcenter.com;

    ssl_certificate /etc/letsencrypt/live/portal.timesharehelpcenter.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/portal.timesharehelpcenter.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL Certificate (if not already configured)

```bash
sudo certbot --nginx -d portal.timesharehelpcenter.com
```

## 🔧 Project Structure

```
emp-hub/
├── index.js                 # Express server + API endpoints
├── lib/                     # Backend utilities (Zoho auth/API)
├── my-app/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── DarkModeToggle.jsx
│   │   │   └── PageLayout.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── CallofFame.jsx
│   │   │   ├── Calculator.jsx
│   │   │   ├── Commissions.jsx
│   │   │   ├── KnowledgeBase.jsx
│   │   │   └── NotFound.jsx
│   │   ├── App.jsx          # Main app routing
│   │   └── main.jsx         # Entry point
│   └── dist/                # Built files (generated)
├── .env                     # Environment variables
└── package.json             # Dependencies
```

## 🎨 Customization

### Adding New External Links

Edit `my-app/src/pages/Home.jsx`:

```javascript
const externalLinks = [
    { 
        url: "https://your-new-site.com", 
        label: "New Feature", 
        emoji: "🎯",
        description: "Description here"
    },
    // ... existing links
];
```

### Adding New Internal Features

1. Create a new page in `my-app/src/pages/YourPage.jsx`
2. Import and add route in `my-app/src/App.jsx`
3. Add to `internalFeatures` array in `Home.jsx`

### Customizing Colors

The app uses Tailwind CSS. Modify `my-app/tailwind.config.js` to customize the theme.

## 🔐 Security Notes

1. **Never commit** `.env` to version control (it's gitignored)
2. **Rotate credentials** if they're ever exposed
3. **Use HTTPS** in production (configured above)
4. **Keep dependencies updated**: Run `npm audit` regularly
5. **Zoho redirect URI** must match exactly in both Zoho Console and `.env`

## 🐛 Troubleshooting

### 404 Error on Production

If you see a 404 error, ensure:
1. Frontend is built: `npm run build`
2. `my-app/dist/` directory exists and has files
3. Server is running and Nginx is properly configured

### Zoho OAuth Not Working

1. Check redirect URI matches in:
   - Zoho Console: https://api-console.zoho.com/
   - `.env` file
2. Ensure scopes are correct
3. Generate a new refresh token: visit `/oauth/start`

### Styles Not Loading

Run in the `my-app` directory:
```bash
npm install -D tailwindcss postcss autoprefixer
```

### CORS Errors

Production domains are already whitelisted in `index.js`. If you add new domains, update the `defaultAllowed` array.

## 📞 Support

For issues related to:
- **Zoho CRM**: Check API console at https://api-console.zoho.com/
- **EC2/Server**: Check server logs and PM2 status
- **DNS**: Verify domain records point to correct EC2 IP

## 📝 API Endpoints

- `GET /api/ping` - Health check
- `GET /api/config` - Get configuration (including auth status)
- `GET /api/leaderboard` - Get leaderboard data
- `GET /api/zoho-test` - Test Zoho API connection
- `GET /oauth/start` - Start Zoho OAuth flow
- `GET /oauth/callback` - OAuth callback handler

## 🎯 Next Steps

After deployment:

1. ✅ Test the portal at https://portal.timesharehelpcenter.com
2. ✅ Complete Zoho OAuth setup
3. ✅ Verify external links work (Time Off, Sales Tracker)
4. ✅ Add content to placeholder pages
5. ✅ Customize branding/colors as needed

---

Built with ❤️ for Timeshare Help Center
