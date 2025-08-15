// pages/auth/login.tsx
import AuthForm from '@/components/AuthForms';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm isLogin={true} />
    </div>
  );
}