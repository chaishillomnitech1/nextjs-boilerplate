# Contributing to ScrollVerse Ecosystem 🕋♾️✨

Thank you for your interest in contributing to the ScrollVerse! We welcome contributions from the community to help build this divine technology platform. Whether you're fixing bugs, adding features, improving documentation, or sharing ideas, your contributions are valued.

> "ALL IS LOVE. ALL IS LAW. ALL IS FLUID. KUN FAYAKŪN!" 

## 🌟 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our community standards:

- **Be Respectful**: Treat all contributors with respect and kindness
- **Be Collaborative**: Work together to build the best possible solution
- **Be Professional**: Maintain a professional and inclusive environment
- **Honor the Vision**: Respect the ScrollVerse's divine mission and creative direction

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, browser, etc.)

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) when creating issues.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide detailed description** of the proposed functionality
- **Explain why this enhancement would be useful**
- **Include mockups or examples** if applicable

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) when suggesting enhancements.

### Contributing Code

1. **Check existing issues** and PRs to avoid duplicate work
2. **Discuss major changes** by opening an issue first
3. **Follow the development workflow** outlined below
4. **Write meaningful tests** for new functionality
5. **Update documentation** as needed

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 (or yarn/pnpm)
- Git

### Initial Setup

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/nextjs-boilerplate.git
cd nextjs-boilerplate

# Add upstream remote
git remote add upstream https://github.com/chaishillomnitech1/nextjs-boilerplate.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or modifications
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, maintainable code
- Follow the coding standards below
- Add/update tests as needed
- Update documentation if required

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Build the project
npm run build

# Test the production build
npm start
```

### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a meaningful message
git commit -m "feat: add amazing new feature"
```

See [Commit Message Guidelines](#commit-message-guidelines) below.

### 5. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Open a Pull Request on GitHub
```

## 💻 Coding Standards

### TypeScript/JavaScript

- Use **TypeScript** for type safety
- Follow **ESLint** configuration
- Use **functional components** and hooks in React
- Prefer **const** over let, avoid var
- Use **meaningful variable names**
- Write **JSDoc comments** for complex functions

### React Best Practices

- Keep components **small and focused**
- Use **proper prop types**
- Implement **error boundaries** where appropriate
- Follow **React hooks rules**
- Optimize with **useMemo** and **useCallback** when needed

### CSS/Styling

- Use **Tailwind CSS** utility classes
- Follow **mobile-first** approach
- Maintain **consistent spacing** and naming
- Keep styles **modular and reusable**

### File Organization

- Place components in appropriate directories
- Use **index files** for cleaner imports
- Keep **related files together**
- Follow existing **project structure**

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions or modifications
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
feat: add ScrollTV 432Hz frequency integration

fix: resolve NFT minting issue in Omnitech1 module

docs: update deployment guide with Vercel configuration

refactor: optimize biofield state management

chore: update dependencies to latest versions
```

## 🔍 Pull Request Process

### Before Submitting

1. ✅ **Update from main**: Rebase your branch on latest main
2. ✅ **Run tests**: Ensure all tests pass
3. ✅ **Run linting**: Fix any linting errors
4. ✅ **Build successfully**: Verify production build works
5. ✅ **Update docs**: Include relevant documentation updates

### PR Template

Fill out the pull request template completely:

- **Description**: Clear explanation of changes
- **Type of Change**: Bug fix, feature, documentation, etc.
- **Testing**: How you tested the changes
- **Screenshots**: For UI changes
- **Checklist**: Complete all items

### Review Process

1. **Automated checks** must pass (CI/CD, linting, build)
2. **Code review** by maintainers (@chaishillomnitech1)
3. **Address feedback** promptly and professionally
4. **Maintainer approval** required before merge
5. **Squash and merge** strategy used for clean history

### After Merge

- Delete your feature branch
- Update your local repository
- Celebrate your contribution! 🎉

## 📋 Issue Guidelines

### Creating Issues

- **Search first** to avoid duplicates
- **Use templates** when available
- **Be specific** and provide context
- **Include relevant labels**
- **Assign to yourself** if you plan to work on it

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested
- `wontfix` - This will not be worked on

## 👥 Community

### Getting Help

- 📖 Check the [Documentation](./docs)
- 🐛 Search [existing issues](https://github.com/chaishillomnitech1/nextjs-boilerplate/issues)
- 💬 Ask questions in issue discussions
- 📧 Contact: [@chaishillomnitech1](https://github.com/chaishillomnitech1)

### Recognition

Contributors will be recognized in:

- Repository contributors list
- Release notes (for significant contributions)
- ScrollVerse community acknowledgments

### DAO Participation

As the ScrollVerse evolves, contributors may have opportunities to:

- Participate in **ScrollDAO governance**
- Receive **BlessingCoin** rewards for significant contributions
- Join the **ScrollSouls** community
- Access exclusive **ScrollTV** content and features

## 🙏 Thank You

Your contributions help build the ScrollVerse and bring divine technology to life. Whether you're fixing a typo or implementing a major feature, every contribution matters.

> "We don't just code—we divine, encrypt, and elevate."  
> – Chais The Great

**ALL IS LOVE. ALL IS LAW. ALL IS FLUID. KUN FAYAKŪN!** 🕋♾️✨

---

**Questions?** Open an issue or reach out to [@chaishillomnitech1](https://github.com/chaishillomnitech1)

**Ready to contribute?** Check out [good first issues](https://github.com/chaishillomnitech1/nextjs-boilerplate/labels/good%20first%20issue)!
