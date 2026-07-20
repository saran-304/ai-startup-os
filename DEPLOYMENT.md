# Deployment Guide

This guide covers deploying AI Startup OS to Firebase Hosting and Vercel.

## Prerequisites

- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created
- Environment variables configured

## Firebase Deployment

### 1. Build the Application

```bash
npm run build
```

This creates a static export in the `out` directory.

### 2. Initialize Firebase

```bash
firebase login
firebase init
```

Select:
- Hosting: Configure files for Firebase Hosting
- Firestore: Configure Firestore Security Rules
- Storage: Configure Cloud Storage

### 3. Configure Firebase

Edit `firebase.json` to match your project settings.

### 4. Deploy

```bash
firebase deploy
```

This deploys:
- Hosting (static site)
- Firestore rules
- Storage rules
- Cloud Functions (if configured)

## Vercel Deployment

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
vercel
```

Follow the prompts to configure your project.

### 4. Environment Variables

Set the following environment variables in Vercel:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_AI_API_KEY
AI_MODEL
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_APP_NAME
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

### Firebase Configuration

Get your Firebase config from the Firebase Console:
1. Go to Project Settings
2. Scroll to "Your apps"
3. Copy the configuration values

### AI Configuration

For Gemini API:
1. Get API key from Google AI Studio
2. Set `AI_MODEL=gemini-pro`

For OpenAI:
1. Get API key from OpenAI platform
2. Set `AI_MODEL=gpt-4`

## Production Checklist

- [ ] Set up production Firebase project
- [ ] Configure Firestore indexes
- [ ] Set up Firestore security rules
- [ ] Configure Storage security rules
- [ ] Add production environment variables
- [ ] Enable Google Analytics (optional)
- [ ] Set up error monitoring (optional)
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificates (automatic on Firebase/Vercel)
- [ ] Test authentication flow
- [ ] Test AI integration
- [ ] Test Ghost Protocol memory storage
- [ ] Test all modules

## Monitoring

### Firebase Console

Monitor:
- Authentication users
- Firestore usage
- Storage usage
- Hosting traffic
- Cloud Functions logs

### Vercel Dashboard

Monitor:
- Deployment status
- Build logs
- Analytics
- Environment variables

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Firebase Deployment Issues

If Firebase deployment fails:

```bash
# Check Firebase status
firebase status

# Re-login
firebase logout
firebase login

# Deploy specific service
firebase deploy --only hosting
```

### Environment Variables Not Loading

Ensure environment variables are:
- Set in `.env.local` for local development
- Set in Vercel project settings for Vercel deployment
- Set in Firebase project settings for Firebase deployment

## Custom Domain

### Firebase Hosting

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow DNS configuration instructions

### Vercel

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records

## Security

- Never commit `.env.local` to version control
- Use Firebase Security Rules to protect data
- Enable App Check for additional security
- Regularly update dependencies
- Monitor usage and costs

## Scaling

### Firebase Free Tier Limits

- Firestore: 50K reads, 20K writes/day
- Storage: 5GB
- Hosting: 10GB/month
- Cloud Functions: 125K invocations/month

### Upgrade to Blaze Plan

For production, upgrade to Firebase Blaze pay-as-you-go:
- No daily limits
- Pay only for what you use
- $0.18/GB for Firestore storage
- $0.026/GB for Storage
- $0.40/million for Cloud Functions invocations

## Backup

### Firestore Backup

Use Firebase CLI to export data:

```bash
firebase firestore:export --backup-path ./backups
```

### Restore Backup

```bash
firebase firestore:import --backup-path ./backups
```

## Rollback

### Firebase Hosting

```bash
firebase hosting:rollback
```

### Vercel

Go to Vercel dashboard → Deployments → Select previous deployment → Rollback

## Support

For issues:
- Firebase: https://firebase.google.com/support
- Vercel: https://vercel.com/support
- Next.js: https://nextjs.org/docs
