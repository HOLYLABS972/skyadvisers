# Deployment Guide - Sky Advisers

## 🚀 Safe Git Deployment Checklist

### ✅ Security & Environment Setup

1. **Environment Variables**: Copy `.env.example` to `.env.local` and fill in your actual values:
   ```bash
   cp .env.example .env.local
   ```

2. **Firebase Configuration**: 
   - Set up Firebase project in Firebase Console
   - Generate service account key for admin operations
   - Configure Firestore rules and indexes

3. **Never commit sensitive files**:
   - ✅ `.env*` files (except `.env.example`)
   - ✅ `firebase-debug.log`
   - ✅ `node_modules/`
   - ✅ `dist/` build files
   - ✅ Service account keys (`*-firebase-adminsdk-*.json`)

### 📁 Files Excluded from Git

The `.gitignore` file excludes:
- **Dependencies**: `node_modules/`, package manager files
- **Build artifacts**: `dist/`, `.next/`, `out/`
- **Environment files**: `.env*` (except `.env.example`)
- **Logs**: `*.log`, `firebase-debug.log`
- **Cache files**: `.cache/`, `.parcel-cache/`
- **IDE files**: `.vscode/`, `.idea/`
- **OS files**: `.DS_Store`, `Thumbs.db`
- **Firebase**: `.firebase/`, `firebase-debug.log`
- **Temporary files**: `tmp/`, `temp/`

### 🔧 Pre-Deployment Steps

1. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Test locally**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

### 🌐 Deployment Options

#### Option 1: Vercel (Recommended for Next.js)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Option 2: Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out/` (if using static export)
4. Configure environment variables

#### Option 3: Traditional Hosting
1. Build the project: `npm run build`
2. Upload `out/` or `.next/` directory to your server
3. Configure environment variables on your server

### 🔒 Security Best Practices

1. **Environment Variables**:
   - Never commit `.env` files
   - Use different values for development/staging/production
   - Rotate keys regularly

2. **Firebase Security**:
   - Use Firestore security rules
   - Implement proper authentication
   - Limit admin SDK usage to server-side only

3. **API Keys**:
   - Use environment variables for all API keys
   - Implement rate limiting
   - Monitor API usage

### 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] Firebase project set up
- [ ] Build passes locally (`npm run build`)
- [ ] No sensitive files in git status
- [ ] Firestore rules deployed
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Monitoring/logging set up

### 🚨 Common Issues

1. **Build fails**: Check environment variables are set
2. **Firebase errors**: Verify project ID and service account
3. **Styling issues**: Ensure Tailwind CSS is properly configured
4. **API errors**: Check CORS settings and API endpoints

### 📞 Support

For deployment issues:
1. Check the build logs
2. Verify environment variables
3. Test locally first
4. Check Firebase console for errors

---

**Remember**: Always test in a staging environment before deploying to production!
