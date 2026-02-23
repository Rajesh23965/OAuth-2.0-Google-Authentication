OAuth 2.0 Google Authentication with TypeScript
A secure, modern Node.js and Express application demonstrating how to implement Google OAuth 2.0 authentication using Passport.js and TypeScript.
🚀 Features
TypeScript Integration: Full type safety with a strict tsconfig.json configuration.
Google OAuth 2.0: Secure social login using the official Google strategy.
Session Management: Persistent user sessions with express-session.
Security Best Practices: Environment variable protection and GitHub Push Protection compliance.

🛠️ Tech Stack
Backend: Node.js, Express
Language: TypeScript
Auth: Passport.js, passport-google-oauth2
Development: ts, nodemon


📋 Prerequisites
Node.js (v18+ recommended)
A Google Cloud Console Project with OAuth 2.0 credentials.
⚙️ Installation
1) Clone the repository:
git clone https://github.com
cd OAuth-2.0-Google-Authentication

2) Install dependencies:
npm install
3) Set up environment variables:
Create a .env file in the root directory and add your credentials:

PORT=3002
SESSION_SECRET=your_random_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:3002/auth/google/callback


Running the Application
Development Mode
Runs the server with auto-reload on file changes:
npm run dev


Production Build
Compiles TypeScript to JavaScript in the dist/ folder:

npm run build
npm start


├── auth/
│   └── google.ts      # Google Strategy configuration
├── app.ts             # Express application and routes
├── .env               # Environment variables (Ignored by Git)
├── .gitignore         # Folders/files to exclude from Git
├── tsconfig.json      # TypeScript compiler settings
└── package.json       # Dependencies and scripts


🔒 Security Note
This project uses a .gitignore file to prevent sensitive credentials in .env and bulky node_modules from being uploaded to GitHub. Never commit your .env file.


