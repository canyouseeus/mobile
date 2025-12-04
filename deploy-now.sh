#!/bin/bash
# One-command preview deployment script

set -e

echo "🚀 Deploying to Vercel Preview..."
echo ""

# Deploy (will prompt for login if not authenticated)
vercel --yes

echo ""
echo "✅ Preview deployment initiated!"
echo ""
echo "📝 Next step: Set the API key"
echo "   Run: vercel env add GEMINI_API_KEY"
echo "   (Select all environments and paste your Gemini API key)"
