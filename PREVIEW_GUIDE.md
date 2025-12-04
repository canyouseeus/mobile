# Preview Deployment Guide

## Option 1: Local Preview (Currently Running)

A local preview server is running. You can access it at:
- **URL**: http://localhost:4173 (or check the terminal output)

This shows you exactly what the built site will look like, but the API routes won't work locally (they need Vercel's serverless functions).

## Option 2: Vercel Preview Deployment (Recommended)

This creates a **preview URL** that doesn't affect your production site. Here's how:

### Step 1: Login to Vercel
```bash
vercel login
```
This will open a browser for authentication.

### Step 2: Create Preview Deployment
```bash
vercel
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account/team
- **Link to existing project?** → **No** (this creates a new preview)
- **Project name?** → You can use a temporary name like `lost-unfounds-preview`
- **Directory?** → Just press Enter (uses current directory)

### Step 3: Set Environment Variable (Important!)

Before the API will work, you need to set the Gemini API key:

```bash
vercel env add GEMINI_API_KEY
```

Select:
- **Environment:** Production, Preview, Development (all)
- **Value:** Paste your Gemini API key

Then redeploy:
```bash
vercel
```

### What You'll Get

- A **unique preview URL** like: `https://lost-unfounds-preview-xyz.vercel.app`
- This URL is **completely separate** from your production site
- You can share it with others
- It won't affect your live website
- You can delete it anytime

## Option 3: Test in Your Existing Vercel Project

If you already have a Vercel project:

1. **Push to a branch** (don't merge to main):
   ```bash
   git checkout -b preview-deployment
   git add .
   git commit -m "Preview: Vercel deployment setup"
   git push origin preview-deployment
   ```

2. Vercel will automatically create a **preview deployment** for this branch
3. You'll get a preview URL in your Vercel dashboard
4. Your production site remains unchanged

## Safety Notes

✅ **Preview deployments are safe:**
- They don't affect production
- They have unique URLs
- You can delete them anytime
- They're perfect for testing

⚠️ **Before going to production:**
- Test the preview thoroughly
- Make sure `GEMINI_API_KEY` is set
- Verify the API route works
- Check all features

## Current Status

- ✅ Build works locally
- ✅ Configuration files ready
- ⏳ Waiting for Vercel authentication to create preview
