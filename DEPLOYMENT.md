# Deployment Guide

This document outlines the deployment process for the Next.js Boilerplate project using Vercel.

## Prerequisites

Before deploying, ensure you have:

1. A Vercel account
2. Vercel CLI installed: `npm i -g vercel`
3. All required environment variables configured
4. GitHub repository connected to Vercel

## Environment Variables

The following environment variables must be configured in your Vercel project settings:

### Required for AI PR Bot
- `OPENAI_API_KEY` - OpenAI API key for AI-powered PR analysis

### Required for Vercel Deployment
- `VERCEL_TOKEN` - Vercel authentication token
- `NODE_ENV` - Set to `production` for production builds

### Required for Rewards System (Test Environment)
- `REWARDS_PRIVATE_KEY` - Private key for test wallet
- `ALCHEMY_MUMBAI_URL` - Alchemy API URL for Polygon testnet (e.g., Amoy or Mumbai)
- `REWARDS_API_KEY` - API key for rewards system
- `REWARDS_CONTRACT_ADDRESS` - Smart contract address for rewards
- `PILOT_TEST_WALLET` - Test wallet address for pilot program

### Required for Repo Sync
- `GITHUB_PAT` - GitHub Personal Access Token with repo permissions

## Vercel Setup

### Initial Setup

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Link your project:
   ```bash
   vercel link
   ```

4. Configure environment variables:
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add VERCEL_TOKEN
   # ... add all other required variables
   ```

### Manual Deployment

To deploy manually:

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Automated Deployment

The project uses GitHub Actions for automated deployments:

- **Push to `main` branch**: Automatically deploys to production
- **Pull requests**: Creates preview deployments with unique URLs
- **Manual trigger**: Use the "Run workflow" button in GitHub Actions

## Deployment Workflow

The automated deployment process:

1. Code is pushed to GitHub
2. GitHub Actions triggers the `vercel-deploy.yml` workflow
3. Workflow builds the Next.js application
4. Vercel deploys the build
5. Deployment URL is posted as a comment on the PR (for preview deployments)

## Build Configuration

The build process uses:

- **Node.js**: Version 20.x (LTS)
- **Package Manager**: npm
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

## Vercel Configuration

The `.vercel.json` file configures:

- Build settings
- Environment variables
- Security headers
- Region settings (default: `iad1` - Washington D.C., USA)

## Monitoring and Logs

Access deployment logs and monitoring:

1. **Vercel Dashboard**: https://vercel.com/dashboard
2. **GitHub Actions**: Check workflow runs in the Actions tab
3. **Vercel CLI**: Use `vercel logs` to view deployment logs

## Troubleshooting

### Common Issues

**Build Failures:**
- Check that all dependencies are listed in `package.json`
- Verify Node.js version compatibility
- Review build logs in Vercel dashboard

**Environment Variables:**
- Ensure all required variables are set in Vercel project settings
- Check variable names match exactly (case-sensitive)
- Redeploy after adding/updating environment variables

**Deployment Errors:**
- Verify Vercel token has correct permissions
- Check GitHub Actions secrets are configured
- Review workflow logs for specific error messages

## Security Best Practices

1. **Never commit secrets** to the repository
2. Use Vercel's environment variable encryption
3. Rotate API keys and tokens regularly
4. Use different credentials for development and production
5. Enable Vercel's security features (DDoS protection, etc.)

## Next Steps After Deployment

1. Verify the deployment at the provided URL
2. Test all functionality in the production environment
3. Set up monitoring and alerts
4. Configure custom domain (if applicable)
5. Enable Vercel Analytics for performance monitoring

## Support

For issues with:
- **Vercel Deployment**: https://vercel.com/docs
- **Next.js**: https://nextjs.org/docs
- **GitHub Actions**: https://docs.github.com/actions

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions for Vercel](https://github.com/amondnet/vercel-action)
