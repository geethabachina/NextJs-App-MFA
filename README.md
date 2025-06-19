# Next.js Login with MFA

This project is a simple Next.js application that implements a login flow with multi-factor authentication (MFA). It includes a username and password input, interaction with a mock API, and an MFA step for enhanced security.

## Features

- User authentication with username and password
- Secure word generation for added security
- Multi-factor authentication using a 6-digit code
- Mock API for simulating backend interactions

## Project Structure

```
nextjs-login-mfa-app
├── src
│   ├── pages
│   │   ├── index.tsx         # Landing page
│   │   ├── login.tsx         # Login page
│   │   └── mfa.tsx           # MFA verification page
│   ├── components
│   │   ├── LoginForm.tsx     # Login form component
│   │   └── MfaForm.tsx       # MFA form component
│   ├── lib
│   │   └── mockApi.ts        # Mock API functions
│   └── types
│       └── index.ts          # TypeScript interfaces
├── public                     # Static files
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Setup Instructions

1. Clone the repository:

   ```
   git clone <repository-url>
   cd nextjs-login-mfa-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Navigate to the login page to enter your username and password.
- Upon successful login, you will be prompted to enter a 6-digit MFA code.
- Follow the instructions on the screen to complete the authentication process.
