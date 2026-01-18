# Railway Deployment Guide

## Step 1: Connect Your GitHub Repository

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** (top right)
3. Select **"Deploy from GitHub"**
4. Authorize Railway to access your GitHub
5. Select your **`todo_list_app`** repository
6. Click **"Deploy"**

---

## Step 2: Configure the Backend Service

Railway should auto-detect the project. If not:

1. **In Railway Dashboard**, look for your project
2. Click on **"Configure"** or the project card
3. You should see a **Service** created automatically

### Set Up Service for Backend

If Railway doesn't auto-detect:

1. Click **"+ New Service"**
2. Select **"GitHub Repo"**
3. Choose your repository again
4. Enter these settings:

   | Setting | Value |
   |---------|-------|
   | **Root Directory** | `backend` |
   | **Build Command** | `composer install && php artisan migrate` |
   | **Start Command** | `php artisan serve --port=$PORT --host=0.0.0.0` |

---

## Step 3: Add Environment Variables

1. In Railway dashboard, go to your **project**
2. Click on the **Service** (backend)
3. Go to **"Variables"** tab
4. Add these variables:

   ```
   APP_NAME=TodoApp
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=base64:...  (generate locally with: php artisan key:generate)
   APP_URL=https://your-railway-url.railway.app
   DB_CONNECTION=mysql
   LOG_CHANNEL=stack
   ```

5. Click **"Add"** for each variable

---

## Step 4: Add MySQL Database

1. In Railway dashboard, go to your **project**
2. Click **"+ New Service"**
3. Select **"MySQL"**
4. Railway auto-generates credentials
5. Copy the credentials and add to your service environment variables:

   ```
   DB_HOST=<Railway MySQL Host>
   DB_PORT=3306
   DB_DATABASE=<Railway Database Name>
   DB_USERNAME=<Railway Username>
   DB_PASSWORD=<Railway Password>
   ```

---

## Step 5: Deploy

1. Railway automatically deploys when you push to GitHub
2. Wait for the deployment to complete
3. Click on your service to see logs
4. Once deployed, Railway shows your **Public URL**

   Example: `https://todoapp-production-abc123.railway.app`

---

## Step 6: Update Frontend with Backend URL

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Open your **frontend project**
3. Go to **Settings** → **Environment Variables**
4. Update `VITE_API_URL`:

   ```
   VITE_API_URL=https://todoapp-production-abc123.railway.app/api
   ```

5. Click **"Save"**
6. Vercel auto-redeploys

---

## Troubleshooting

### "No option to select backend"

**Solution:** Railway auto-imports monorepos, but sometimes doesn't auto-detect the backend.

**Option A: Use railway.json** (we created this for you)
- The `railway.json` in root tells Railway about the backend service
- Push the changes and Railway will re-read it

**Option B: Manually configure**
1. New Service → Add your repo again
2. Manually set Root Directory to `backend`

### Build fails

**Check logs:**
1. In Railway dashboard, click your **Service**
2. Go to **"Logs"** tab
3. Look for error messages
4. Common issues:
   - Missing `APP_KEY` environment variable
   - Database not connected
   - Missing composer dependencies

**Fix:**
```bash
# Make sure you have these in environment variables:
APP_KEY=base64:... (from php artisan key:generate locally)
DB_HOST=<MySQL Host>
DB_DATABASE=<Database Name>
```

### App won't start

**Solution:** Make sure your `Procfile` exists in `backend/` directory:

```
web: php artisan serve --port=$PORT --host=0.0.0.0
```

---

## Quick Summary

| Step | Platform | Action |
|------|----------|--------|
| 1 | Railway | Deploy from GitHub |
| 2 | Railway | Configure backend service |
| 3 | Railway | Add environment variables |
| 4 | Railway | Add MySQL database |
| 5 | Railway | Wait for deployment |
| 6 | Vercel | Update frontend `VITE_API_URL` |

---

## Getting Your Railroad URL

After deployment:

1. In Railway, click your **project**
2. Click your **backend service**
3. On the right sidebar, find **"Public URL"**
4. Copy this URL (example: `https://todoapp-production-abc123.railway.app`)
5. Use this URL in Vercel's `VITE_API_URL` environment variable

---

## Next Push Deploys Automatically

After setup, just push changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Both Railway and Vercel automatically redeploy! 🚀

---

**Need Help?** Check Railway Logs for detailed error messages.
