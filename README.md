# Production Manager Dashboard

A modern, responsive web application for managing production workflows, companies, and offers with a clean dashboard interface.

## 🚀 Features

- **User Authentication** - Secure login/logout with JWT tokens
- **Dashboard** - Overview of offers, purchase orders, and payments
- **Company Management** - Manage client companies and information
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Clean interface built with Tailwind CSS and Lucide icons
- **State Management** - Redux for predictable state management
- **Type Safety** - Full TypeScript support

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Redux Toolkit
- **Authentication**: JWT tokens with HTTP-only cookies
- **Language**: TypeScript
- **Build Tool**: Vite (if applicable) or Next.js built-in

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sreesankar-p/production-manager.git
   cd production-manager

   ```

2. **Install dependencies**

npm install

#or

yarn install

#or

pnpm install

3. **Environment Variables**

Create a .env.local file in the root directory:

```bash
   NEXT_PUBLIC_API_URL=your_api_url_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**
   npm run dev
   #or
   yarn dev
   #or
   pnpm dev

5. **Open your browser**

```bash
 Navigate to http://localhost:3000
```

## 🏗️ Project Structure

```bash
src/
├── components/          # Reusable UI components
│   ├── AuthForms.tsx   # Login/Signup forms
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── Layout.tsx      # App layout with sidebar
│   ├── Navbar.tsx      # Navigation header
│   └── Sidebar.tsx     # Side navigation
├── features/           # Redux feature slices
│   └── auth/           # Authentication logic
│       ├── authSlice.ts
│       └── authThunk.ts
├── lib/               # Utility libraries
│   └── store.ts       # Redux store configuration
├── pages/             # Next.js pages
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # Dashboard page
│   ├── companies/     # Companies management
│   └── api/           # API routes
└── styles/            # Global styles
```

## 🔐 Authentication

The app uses JWT-based authentication with HTTP-only cookies for security.

**Login Flow:**

1.  User submits credentials via AuthForm
2.  Server validates and returns JWT token
3.  Token stored in HTTP-only cookie
4.  Redux store updates with user data
5.  Protected routes are accessible

**Protected Routes:**

1. Dashboard (/p1/dashboard)
2. Companies (/companies)
3. User profile and settings


