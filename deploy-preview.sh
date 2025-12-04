#!/bin/bash
# Script to deploy preview to Vercel

set -e

echo "🚀 Starting Vercel Preview Deployment..."
echo ""

# Check if token is provided
if [ -z "$VERCEL_TOKEN" ]; then
    echo "⚠️  No VERCEL_TOKEN environment variable found."
    echo ""
    echo "To get a token:"
    echo "1. Go to https://vercel.com/account/tokens"
    echo "2. Create a new token"
    echo "3. Run: export VERCEL_TOKEN=your_token_here"
    echo "4. Then run this script again"
    echo ""
    echo "Or, run 'vercel login' first, then run: vercel"
    exit 1
fi

echo "✅ Using Vercel token for authentication"
echo ""

# Deploy to preview
echo "📦 Deploying to Vercel (preview)..."
vercel --token "$VERCEL_TOKEN" --yes

echo ""
echo "✅ Preview deployment complete!"
echo ""
echo "⚠️  Don't forget to set GEMINI_API_KEY environment variable:"
echo "   vercel env add GEMINI_API_KEY --token $VERCEL_TOKEN"
