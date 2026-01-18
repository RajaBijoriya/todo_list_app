# Deployment Guide for Todo List App

This guide helps you deploy the Todo List App to production using Vercel (frontend) and Railway/Heroku (backend).

## Quick Overview

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Railway, Heroku, or similar platform
- **Database:** Cloud MySQL or PostgreSQL

---

## Step 1: Prepare Your Local Project

### 1.1 Create `.env` files (if not exists)

**Backend** (`backend/.env`):
```env
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=mysql
```

**Frontend** (`frontend/.env.production`):
```env
VITE_API_URL=https://your-backend-url.com/api
```

### 1.2 Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## Step 2: Deploy Backend (Railway - Recommended)

### Why Railway?
- Easy GitHub integration
- Auto-deploys on push
- Built-in MySQL database
- Free tier available

### Steps:

1. **Go to [railway.app](https://railway.app)**
   - Sign up with GitHub
   - Create new project
   - Select "Deploy from GitHub"
   - Choose your todo-list-app repository

2. **Configure Root Directory**
   - Set root to: `backend`

3. **Set Environment Variables**
   - Click "Variables"
   - Add these variables:
     ```
     APP_KEY=<generate locally with: php artisan key:generate>
     APP_ENV=production
     APP_DEBUG=false
     DB_CONNECTION=mysql
     ```
   - Railway auto-creates MySQL - use those credentials

4. **Get Your Backend URL**
   - After deployment, Railway gives you a URL
   - Example: `https://todoapp-production-abc123.railway.app`
   - **Copy this URL - you'll need it for the frontend**

---

## Step 3: Deploy Frontend (Vercel)

### Steps:

1. **Go to [vercel.com](https://vercel.com)**
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Select your `todo-list-app` repository

2. **Configure Build Settings**
   - **Framework Preset:** Other
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** Leave blank

3. **Add Environment Variables**
   - Go to "Environment Variables"
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-railway-backend-url/api` (from Step 2.4)
   - Click "Add"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is now live!

---

## Step 4: Link Backend to Frontend

**Important:** Make sure your Vercel frontend's `VITE_API_URL` points to your Railway backend!

If you haven't set it yet:

1. Go to Vercel Project
2. Settings → Environment Variables
3. Add/Update `VITE_API_URL` to your Railway backend URL
4. Redeploy (Vercel will auto-redeploy on next push, or manually trigger)

---

## Step 5: Test Your Deployment

1. Open your Vercel frontend URL
2. Try adding a todo
3. Verify it appears in the list
4. Test edit and delete

If you get errors:
- Check browser console (F12)
- Verify `VITE_API_URL` is correct
- Check Railway backend logs

---

## Troubleshooting

### "404: NOT_FOUND" on Vercel

**Solution:** This means Vercel doesn't know what to serve.

- Verify `vercel.json` exists in frontend folder
- Check build command: `cd frontend && npm install && npm run build`
- Verify output directory: `frontend/dist`

### Backend returns 500 errors

**Solution:**
- Check Railway logs
- Verify database is connected
- Ensure migrations ran: Add to Railway's start command

### CORS errors

**Solution:**
- Verify Laravel CORS config includes Vercel domain
- In `backend/config/cors.php`, add your Vercel URL to `allowed_origins`

---

## Updating Your App

### Push Changes

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Both Vercel and Railway will auto-deploy!

### Update Backend API URL

If you change your backend host:

1. Update Vercel environment variable `VITE_API_URL`
2. Redeploy frontend

---

## Monitoring

### Vercel Dashboard
- Visit [vercel.com/dashboard](https://vercel.com/dashboard)
- View logs and deployments
- Check analytics and errors

### Railway Dashboard
- Visit [railway.app/dashboard](https://railway.app/dashboard)
- View backend logs
- Monitor database usage

---

## Security Tips

1. **Never commit `.env` files** - Use environment variables in deployment
2. **Keep Laravel `APP_DEBUG=false`** in production
3. **Use strong database passwords**
4. **Enable HTTPS** (both platforms do this by default)
5. **Regularly update dependencies:** `composer update` and `npm update`

---

## Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Railway Docs:** [railway.app/docs](https://railway.app/docs)
- **Laravel Docs:** [laravel.com/docs](https://laravel.com/docs)

---

**Happy Deploying!** 🚀
