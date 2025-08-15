// pages/auth/signup.tsx
import AuthForm from '@/components/AuthForms';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm isLogin={false} />
    </div>
  );
}