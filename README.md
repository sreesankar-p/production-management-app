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
   git clone https://github.com/your-username/production-manager.git
   cd production-manager

   ```

2. **Install dependencies**
  
  npm install

   # or

   yarn install
 
  # or
 
   pnpm install

3. **Environment Variables**
 Create a .env.local file in the root directory:
 NEXT_PUBLIC_API_URL=your_api_url_here
 NEXT_PUBLIC_APP_URL=http://localhost:3000
