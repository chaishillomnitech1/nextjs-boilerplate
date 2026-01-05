# Known Issues

## ESLint Circular Structure Warning

**Status**: Known Issue with Next.js 15.3.2 + eslint-config-next 16.0.3

**Error Message**:
```
Converting circular structure to JSON
Referenced from: .eslintrc.json
```

**Impact**: 
- Build completes successfully ✅
- Application functions correctly ✅
- Only affects `npm run lint` command output
- Does not block CI/CD pipelines

**Workaround**:
- The build process continues despite this warning
- Linting still occurs during the build phase
- No action required from developers

**Resolution**:
- Will be resolved in future Next.js or eslint-config-next updates
- Tracking: https://github.com/vercel/next.js/issues

**Last Updated**: 2025-01-05
