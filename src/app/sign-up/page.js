"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import SignupPageStep1 from "@/components/forms/signup/SignupPageStep1";
import SignupPageStep2 from "@/components/forms/signup/SignupPageStep2";
import SignupPageStep3 from "@/components/forms/signup/SignupPageStep3";
import { signUp } from "@/services/authService";
import { setAuthData } from "@/lib/features/userSlice";
export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
    console.log('Moving to step:', step + 1, 'Data:', { ...formData, ...data });
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    console.log('Back to step:', step - 1);
  };

  const handleComplete = async () => {
    setLoading(true);

    try {
      const data = await signUp(formData);

      dispatch(setAuthData({
        token: data?.token,
        user: data?.user,
      }));
      localStorage.setItem('profit_connect_token', data?.token);
      console.log('User data after sign up:', localStorage.getItem('profit_connect_token'), data?.user);
      alert("تم إنشاء الحساب بنجاح!");
      console.log('Sign up response:', data);
      router.push('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 1 && <SignupPageStep1 onNext={handleNext} data={formData} />}
      {step === 2 && <SignupPageStep2 onNext={handleNext} onBack={handleBack} data={formData} />}
      {step === 3 && <SignupPageStep3 onBack={handleBack} onComplete={handleComplete} loading={loading} />}
    </div>
  );
}
