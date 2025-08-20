// pages/auth/signup.tsx
import AuthForm from '@/components/AuthForms';

export default function SignupPage() {
  return (
    <AuthForm isLogin={false} />
  );
}