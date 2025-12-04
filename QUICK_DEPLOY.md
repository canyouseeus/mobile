# Quick Preview Deployment

To create a preview deployment on Vercel, you need to authenticate first. Here are the fastest options:

## Option 1: Browser Login (Easiest - ~30 seconds)

Run this command and follow the prompts:

```bash
vercel login
```

Then immediately deploy:

```bash
vercel
```

When prompted:
- **Set up and deploy?** → **Y** (Yes)
- **Which scope?** → Select your account
- **Link to existing project?** → **N** (No - creates new preview)
- **Project name?** → Press Enter (uses default) or type a name
- **Directory?** → Press Enter (uses current directory)

This creates a **preview URL** that won't affect your production site.

## Option 2: Use a Token (For Automation)

1. Get a token: https://vercel.com/account/tokens
2. Run:
   ```bash
   export VERCEL_TOKEN=your_token_here
   vercel --token "$VERCEL_TOKEN"
   ```

## After Deployment

**Important:** Set the API key so story generation works:

```bash
vercel env add GEMINI_API_KEY
```

Select all environments (Production, Preview, Development) and paste your Gemini API key.

Then the preview will be fully functional!
