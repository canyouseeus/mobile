# Vercel Deployment Guide

This project is configured for deployment on Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A Gemini API key from Google AI Studio

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Follow the prompts to link your project or create a new one.

5. Set the environment variable:
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   Enter your Gemini API key when prompted.

6. Redeploy to apply the environment variable:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. Push your code to a GitHub repository.

2. Go to https://vercel.com/new

3. Import your GitHub repository.

4. Vercel will automatically detect the Vite framework.

5. Add the environment variable:
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add `GEMINI_API_KEY` with your API key value
   - Select all environments (Production, Preview, Development)

6. Deploy!

## Environment Variables

Make sure to set the following environment variable in Vercel:

- `GEMINI_API_KEY`: Your Google Gemini API key

You can set this in the Vercel dashboard under Project Settings > Environment Variables.

## Project Structure

- `/api/generate-story.ts` - Serverless function for Gemini API calls
- `/services/geminiService.ts` - Client-side service that calls the API route
- `/vercel.json` - Vercel configuration
- `/dist` - Build output (generated during build)

## Build Configuration

The project uses:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

Vercel will automatically detect these settings from `vercel.json` and `package.json`.

## Troubleshooting

- If the API route doesn't work, check that `GEMINI_API_KEY` is set in Vercel environment variables
- Make sure all dependencies are listed in `package.json`
- Check Vercel function logs in the dashboard for API errors
