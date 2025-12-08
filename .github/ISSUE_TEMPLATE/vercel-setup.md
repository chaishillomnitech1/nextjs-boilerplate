---
name: Vercel Setup Issue
about: Track Vercel deployment setup and configuration
title: "[SETUP] Vercel Deployment Configuration"
labels: deployment, setup, vercel
assignees: chaishillomnitech1

---

## Vercel Setup Checklist

This issue tracks the setup and configuration of Vercel deployment for the project.

### Prerequisites

- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Vercel CLI installed locally (`npm i -g vercel`)

### Environment Variables Configuration

Configure the following environment variables in Vercel project settings:

#### Required for All Environments

- [ ] `NODE_ENV` - Set to `production` for production builds
- [ ] `VERCEL_TOKEN` - Vercel authentication token (for CI/CD)

#### AI PR Bot Configuration

- [ ] `OPENAI_API_KEY` - OpenAI API key for AI-powered PR analysis

#### Rewards System (Test Environment)

- [ ] `REWARDS_PRIVATE_KEY` - Private key for test wallet (DO NOT use production keys)
- [ ] `ALCHEMY_MUMBAI_URL` - Alchemy API URL for Mumbai testnet
- [ ] `REWARDS_API_KEY` - API key for rewards system
- [ ] `REWARDS_CONTRACT_ADDRESS` - Smart contract address for rewards
- [ ] `PILOT_TEST_WALLET` - Test wallet address for pilot program

#### GitHub Integration

- [ ] `GITHUB_PAT` - GitHub Personal Access Token with repo permissions (for repo-sync)
- [ ] `VERCEL_ORG_ID` - Vercel organization ID (found in project settings)
- [ ] `VERCEL_PROJECT_ID` - Vercel project ID (found in project settings)

### GitHub Secrets Configuration

Add the following secrets to GitHub repository settings (Settings > Secrets and variables > Actions):

- [ ] `OPENAI_API_KEY`
- [ ] `VERCEL_TOKEN`
- [ ] `REWARDS_PRIVATE_KEY` (test)
- [ ] `ALCHEMY_MUMBAI_URL`
- [ ] `REWARDS_API_KEY`
- [ ] `REWARDS_CONTRACT_ADDRESS`
- [ ] `GITHUB_PAT`
- [ ] `PILOT_TEST_WALLET`
- [ ] `VERCEL_ORG_ID`
- [ ] `VERCEL_PROJECT_ID`

### Deployment Setup Steps

1. **Initial Vercel Setup**
   - [ ] Run `vercel login` to authenticate
   - [ ] Run `vercel link` to link the project
   - [ ] Configure project settings in Vercel dashboard

2. **Environment Variables**
   - [ ] Add all required environment variables in Vercel dashboard
   - [ ] Test environment variables are correctly set
   - [ ] Configure different values for production and preview environments if needed

3. **GitHub Actions Integration**
   - [ ] Add all required secrets to GitHub repository
   - [ ] Verify workflow permissions are correctly configured
   - [ ] Test workflow runs successfully

4. **First Deployment**
   - [ ] Trigger a manual deployment using `vercel --prod`
   - [ ] Verify deployment is successful
   - [ ] Check all environment variables are working
   - [ ] Test application functionality

5. **Automated Deployments**
   - [ ] Verify push to `main` triggers production deployment
   - [ ] Verify PRs trigger preview deployments
   - [ ] Test preview deployment URLs are posted as PR comments

### Testing Checklist

- [ ] Manual deployment works (`vercel`)
- [ ] Production deployment works (`vercel --prod`)
- [ ] Preview deployments work for PRs
- [ ] All workflows run without errors
- [ ] AI PR Bot posts comments on PRs
- [ ] E2E tests pass in CI/CD
- [ ] Reward system logs correctly (test mode)
- [ ] Repo sync workflow can be triggered manually

### Documentation

- [ ] Review `DEPLOYMENT.md` for accuracy
- [ ] Update `.env.example` if new variables are needed
- [ ] Document any custom configuration or setup steps

### Security Verification

- [ ] Confirm no secrets are committed to repository
- [ ] Verify all sensitive data uses environment variables
- [ ] Check security headers are configured in `.vercel.json`
- [ ] Review CODEOWNERS file is correctly configured

### Next Steps

After completing the setup:

1. Merge the Phase 2 PR
2. Monitor first production deployment
3. Verify all workflows execute successfully
4. Set up alerts and monitoring
5. Document any issues or improvements needed

### Notes

<!-- Add any additional notes, issues encountered, or special configuration requirements here -->

### References

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [DEPLOYMENT.md](../../DEPLOYMENT.md)
- [.env.example](../../.env.example)

---

**Assigned to:** @chaishillomnitech1
**Priority:** High
**Estimated Time:** 2-4 hours
