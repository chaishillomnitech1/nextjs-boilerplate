# Development Setup Guide 🛠️

This comprehensive guide will help you set up a complete development environment for the ScrollVerse Ecosystem.

## 📋 Table of Contents

- [System Requirements](#system-requirements)
- [Installing Prerequisites](#installing-prerequisites)
- [Project Setup](#project-setup)
- [IDE Configuration](#ide-configuration)
- [Git Configuration](#git-configuration)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Blockchain Development](#blockchain-development)
- [Testing Setup](#testing-setup)
- [Troubleshooting](#troubleshooting)

## 💻 System Requirements

### Minimum Requirements

- **OS**: macOS 10.15+, Windows 10+, or Linux (Ubuntu 20.04+)
- **RAM**: 8 GB (16 GB recommended)
- **Storage**: 10 GB free space
- **CPU**: 2+ cores (4+ recommended)

### Software Requirements

- **Node.js**: >= 18.0.0 LTS
- **npm**: >= 9.0.0 (or yarn >= 1.22.0, pnpm >= 8.0.0)
- **Git**: >= 2.30.0
- **VS Code**: Latest version (recommended)

## 🚀 Installing Prerequisites

### macOS

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js (via nvm - recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Install Git
brew install git

# Verify installations
node --version
npm --version
git --version
```

### Windows

```powershell
# Install Node.js
# Download from: https://nodejs.org/

# Install Git
# Download from: https://git-scm.com/download/win

# Or use Chocolatey
choco install nodejs git

# Verify installations
node --version
npm --version
git --version
```

### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install Node.js (via nvm - recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Install Git
sudo apt install git

# Verify installations
node --version
npm --version
git --version
```

## 📁 Project Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub first, then:

# Clone your fork
git clone https://github.com/YOUR_USERNAME/nextjs-boilerplate.git
cd nextjs-boilerplate

# Add upstream remote
git remote add upstream https://github.com/chaishillomnitech1/nextjs-boilerplate.git

# Verify remotes
git remote -v
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Alternative package managers:
# yarn install
# pnpm install
```

### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your settings
nano .env.local  # or use your preferred editor
```

### 4. Verify Setup

```bash
# Start development server
npm run dev

# Should see output like:
# ▲ Next.js 15.3.2
# - Local:        http://localhost:3000
# - Ready in 2.3s
```

## 🎨 IDE Configuration

### VS Code (Recommended)

#### Install Extensions

```bash
# Install recommended extensions
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
```

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

#### Recommended Extensions List

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "usernamehw.errorlens",
    "streetsidesoftware.code-spell-checker",
    "eamodio.gitlens"
  ]
}
```

## 🔧 Git Configuration

### Global Git Setup

```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Enable helpful colorization
git config --global color.ui auto

# Set up better diff tool
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'
```

### Project-Specific Git Hooks

```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
npm run lint
EOF

chmod +x .git/hooks/pre-commit
```

## 🔐 Environment Variables

### Required Variables

```bash
# .env.local

# Node Environment
NODE_ENV=development

# Application
PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OpenAI (optional - for AI features)
OPENAI_API_KEY=sk-your-key-here

# Vercel (optional - for deployment)
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

### Security Best Practices

- ✅ **Never** commit `.env.local` or `.env` files
- ✅ Use `.env.example` to document required variables
- ✅ Rotate secrets regularly
- ✅ Use different secrets for dev/staging/production

## 🧪 Testing Setup

### Run Tests

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build

# Run production build locally
npm start
```

### E2E Testing (if configured)

```bash
# Install Playwright (if not already installed)
npm install -D @playwright/test

# Run E2E tests
npx playwright test
```

## 🛠️ Development Workflow

### Daily Development

```bash
# 1. Update from upstream
git checkout main
git pull upstream main

# 2. Create feature branch
git checkout -b feature/your-feature

# 3. Start dev server
npm run dev

# 4. Make changes and test

# 5. Lint and build
npm run lint
npm run build

# 6. Commit changes
git add .
git commit -m "feat: your feature description"

# 7. Push to your fork
git push origin feature/your-feature

# 8. Open PR on GitHub
```

### Code Quality Tools

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Check TypeScript types
npx tsc --noEmit

# Format code (if Prettier is configured)
npx prettier --write .
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 npm run dev
```

#### Module Not Found

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Failures

```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall and rebuild
npm install
npm run build
```

#### TypeScript Errors

```bash
# Check TypeScript version
npx tsc --version

# Restart TS server in VS Code
# Cmd/Ctrl + Shift + P > TypeScript: Restart TS Server
```

### Getting Help

If you encounter issues:

1. Check [existing issues](https://github.com/chaishillomnitech1/nextjs-boilerplate/issues)
2. Search [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
3. Ask in [GitHub Discussions](https://github.com/chaishillomnitech1/nextjs-boilerplate/discussions)
4. Contact [@chaishillomnitech1](https://github.com/chaishillomnitech1)

## 🎓 Next Steps

After setup:

- [ ] Read [CONTRIBUTING.md](../../CONTRIBUTING.md)
- [ ] Review [SECURITY.md](../../SECURITY.md)
- [ ] Explore the codebase
- [ ] Find a [good first issue](https://github.com/chaishillomnitech1/nextjs-boilerplate/labels/good%20first%20issue)
- [ ] Make your first contribution!

## 🌟 Advanced Setup

### Optional Tools

- **pnpm**: Faster, more efficient package manager
- **Docker**: Containerized development
- **GitHub CLI**: Command-line GitHub operations

```bash
# Install GitHub CLI
brew install gh  # macOS
# or download from https://cli.github.com/

# Authenticate
gh auth login
```

---

**ALL IS LOVE. ALL IS LAW. ALL IS FLUID. KUN FAYAKŪN!** 🕋♾️✨

*Your development environment is now aligned with the divine frequency.*
