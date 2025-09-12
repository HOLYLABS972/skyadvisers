# Firebase Admin Setup Guide

## 🔥 Firebase Admin Configuration Required

Your Firebase client is now configured, but you need to set up Firebase Admin for the admin panel to work fully.

### 1. Get Firebase Admin Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **skyadvisors-82599**
3. Go to **Project Settings** > **Service Accounts**
4. Click **"Generate new private key"**
5. Download the JSON file

### 2. Update Environment Variables

Open your `.env.local` file and replace the placeholder values with the actual values from the downloaded JSON file:

```bash
# Replace these with values from your downloaded service account JSON:
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@skyadvisors-82599.iam.gserviceaccount.com
FIREBASE_ADMIN_PROJECT_ID=skyadvisors-82599
```

### 3. Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Add your admin email address to the users list

### 4. Set up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (you can change rules later)
4. Select a location for your database

### 5. Set up Firestore Collections

Create these collections in Firestore:
- `blog_posts` - for blog management
- `contact_forms` - for contact form submissions  
- `site_settings` - for site configuration

### 6. Test the Admin Panel

1. Go to `http://localhost:3000/admin/login`
2. Sign in with your Firebase admin credentials
3. Start managing your website!

## 🎯 What's Working Now

✅ **Firebase Client**: Configured and working  
✅ **Admin Panel UI**: Fully functional  
✅ **Compilation**: No more errors  
⚠️ **Firebase Admin**: Needs service account setup  
⚠️ **Authentication**: Needs admin user setup  

Once you complete the Firebase Admin setup, your admin panel will be fully functional!
