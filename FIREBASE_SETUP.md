# Firebase Setup Guide

## 🔥 Firebase Configuration Required

To fix the compilation errors, you need to set up your Firebase configuration. Here's what you need to do:

### 1. Create Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin Configuration
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_ADMIN_PROJECT_ID=your_project_id
```

### 2. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Click on the web app icon (</>) to add a web app
6. Copy the configuration values to your `.env.local` file

### 3. Get Firebase Admin Service Account

1. In Firebase Console, go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the values and add them to your `.env.local` file:
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`

### 4. Enable Authentication

1. In Firebase Console, go to Authentication > Sign-in method
2. Enable Email/Password authentication
3. Add your admin email to the users list

### 5. Set up Firestore Database

1. In Firebase Console, go to Firestore Database
2. Create a database in production mode
3. Set up the following collections:
   - `blog_posts` - for blog management
   - `contact_forms` - for contact form submissions
   - `site_settings` - for site configuration

### 6. Test the Setup

After setting up the environment variables, run:

```bash
npm run dev
```

The admin panel should now work without compilation errors!

## 🎯 Admin Panel Features

Once configured, you'll have access to:

- **Dashboard**: Real-time statistics and quick actions
- **Blog Management**: Create, edit, and manage blog posts
- **Contact Management**: View and respond to contact form submissions
- **Settings**: Manage business information and social media links

## 🔐 Admin Access

To access the admin panel:
1. Go to `/admin/login`
2. Sign in with your Firebase admin credentials
3. Start managing your website content!

## 📝 Notes

- Make sure to keep your `.env.local` file secure and never commit it to version control
- The admin panel uses Firebase Authentication for secure access
- All data is stored in Firestore for real-time updates
